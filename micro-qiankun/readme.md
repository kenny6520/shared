--

基本介绍：

时间：2020年11月06日

主题：微前端\<qiankun>基本实现和原理

等级：源码, 包含`import-entry-html` `single` `qiankun` `umi-plugin-qiankun` `sandbox`等

--



# Qiankun 



### 我们在讨论什么?

1. 我们如何把一段源代码放到另一个页面中来渲染?
2. 为什么不是 iframe?
3. qiankun 加载逻辑是什么样的?
4. qiankun 怎么做样式和JS隔离?
5. 怎么实现主-微应用之间的通信?
6. 如何进行微应用多层嵌套?





### 怎么把源代码放到另一个页面渲染?

- **Iframe:** 原生的资源隔离, 缺点下面介绍.

- **web-components:**没有一个很好的标准, 只支持新版本浏览器, 现在ShadowDOM对一些公用的组件处理非常不好 (会丢失样式和逻辑, 因为被封锁死在影子里了)

- **importHTML(qiankun):** 通过分析HTML节点对相关的资源进行导入, 并在将资源隔离在sandox中;

  ```javascript
  // 实现原理, Fetch可以拿到HTML模板信息
  
  fetch('subAppUrl')
      .then(response => response.text())
  	.then(template => {
      	// 这里拿到的template则是SubApp的HTML节点信息
      	// 这里通过运行时去分析HTML节点中的相对路径/script/style等信息, 进行静态资源的请求
  	})
  ```



### 为什么不是 Iframe?

- URL信息无法进行同步, 没有办法进行前进和后退. 
- 上下文完全隔离, 变量共享困难(同时伴随DOM跨域), 处理起来很困难. 
- 慢,每次加载都会重新构建上下文和重新加载资源.
- DOM结构不共享, 也不确定你自己的UI能不能显示在正确的位置 (还有部分空间被Iframe的边框占据)





### 加载逻辑

参考流程图





### 资源隔离SandBox

1. 沙箱实现原理

   ```javascript
   /*
   * file: qiankun/loader.ts
   * line: 286
   */
   
   let global = window;
   
   if (sandbox) {
       const sandboxInstance = createSandbox(
           appName,
           appWrapperGetter,
           scopedCSS,
           useLooseSandbox,
           excludeAssetFilter
       );
   
       // 用沙箱的代理对象作为接下来使用的全局对象
       global = sandboxInstance.proxy as typeof window;
     }
   ```

2. Proxy可以实现沙箱的原理, `Proxy沙箱`

   - ES6中提供了一个Proxy的类, 让我们可以对 `访问对象前进行拦截`, 可以使用Proxy对window进行代理, 然后这个执行并`不会追溯到全局变量`的访问; **#2-1**

   - 同时在 set/get 时返回true可以欺骗浏览器, 告诉浏览器拥有[本来没有的方法]. **#2-2**

   ```javascript
   /*
   * file: qiankun/sandbox/proxySanbox.ts
   * line: 164
   */
   export default class ProxySandbox implements SandBox {
     	/** window 值变更记录 */
     	private updatedValueSet = new Set<PropertyKey>();
   
     	name: string;
   
     	proxy: WindowProxy;
   
   	constructor(){
           const { updatedValueSet } = this;
           
           /* line: 170 剔除无法处理的属性. 将会被重新 */
           const rawWindow = window;
           const { fakeWindow, propertiesWithGetter } = createFakeWindow(rawWindow);
   
           /* line: 176 代理沙箱实现, #2-1 */
           const proxy = new Proxy(fakeWindow, {
               set(target: FakeWindow, p: PropertyKey, value: any){
                   target[p] = value; /* 设置在代理过后的对象上 */
             		updatedValueSet.add(p); /* 记录下处理过的key, 最后会被还原 */
                   
             		return true; /* 程序欺骗, #2-2 */
               },
               
              // ...
           });
           
           active(){
               // 标记sanbox开启
           }
           inactive(){
               // 卸载sanbox
           }
           
           this.proxy = proxy;
       }
   }
   ```

3. 快照沙箱, `Diff模式`

   快照实现是将每次对真实window的操作的记录缓存起来 `active`,  `inactive`时将更改的操作全部恢复回来.

   ```javascript
   
   /**
    * file: qiankun/sandbox/snapshotSandbox.ts
    * line: 19
    * 基于 diff 方式实现的沙箱，用于不支持 Proxy 的低版本浏览器
    */
   export default class SnapshotSandbox implements SandBox {
     proxy: WindowProxy;
   
     name: string;
   
     private windowSnapshot!: Window; // window快照
   
     private modifyPropsMap: Record<any, any> = {}; // 沙箱运行期间被修改过的window变量
   
     constructor(name: string) {
       this.name = name;
       this.proxy = window;
       
         // line: 38
         // 在激活的时候需要记录下window的快照
         active() {
           // 记录当前快照
           this.windowSnapshot = {} as Window;
           // iter方法用于判断当前属性在window中是否存在,存在返回对应属性
           iter(window, (prop) => {
             this.windowSnapshot[prop] = window[prop];
           });
   
           // 恢复之前的变更
           Object.keys(this.modifyPropsMap).forEach((p: any) => {
             window[p] = this.modifyPropsMap[p];
           });
   
           this.sandboxRunning = true;
         }
         
         // line: 53
         // 取消的时候调用
         inactive() {
           this.modifyPropsMap = {};
   
           iter(window, (prop) => {
             if (window[prop] !== this.windowSnapshot[prop]) {
               // 记录变更，恢复环境
               this.modifyPropsMap[prop] = window[prop];
               window[prop] = this.windowSnapshot[prop];
             }
           });
   
           if (process.env.NODE_ENV === 'development') {
             console.info(`[qiankun:sandbox] ${this.name} origin window restore...`, Object.keys(this.modifyPropsMap));
           }
   
           this.sandboxRunning = false;
         }
     }
   ```

4. 使用 `import-html-entry` 导入资源

   `execScript` 时会使用沙箱环境的 `作用域(proxy/diff)`, 所有的 微应用 操作都会被限制起来.

   ```javascript
   // ref: https://github.com/kuitos/import-html-entry/blob/master/src/index.js#L139
   export function execScripts(entry, scripts, proxy = window, opts = {}) {
       // ...
       try {
           /*
           * Line: 167 
           * Desc: 绑定proxy改变this的指向, 作用域指向到微应用中
           * Fn: getExecutableScript 加载资源
           */
           
   		// bind window.proxy to change `this` reference in script
   		geval(getExecutableScript(scriptSrc, inlineScript, proxy, strictGlobal));
   		const exports = proxy[getGlobalProp(strictGlobal ? proxy : window)] || {};
   		resolve(exports);
   	} catch (e) {
           console.error(
               '[import-html-entry]: error occurs while executing entry script 
               ${scriptSrc}'
           );
       	throw e;
   	}
   }
   
   
   // get the lifecycle hooks from module exports
   // 在申明周期回去调用模块来加载
     const scriptExports: any = await execScripts(global, !useLooseSandbox);
     const {
         bootstrap,
         mount,
         unmount,
         update
     } =getLifecyclesFromExports(scriptExports, appName, global);
   ```

5. 启动引导程序 `bootstrappingFreers`

   当引导程序被启动时,将会启用上面初始化的沙箱环境,并将JS和CSS等限制在沙箱环境进行渲染/执行

   ```javascript
   /*
   * file: qiankun/sandbox/index.ts
   * line: 46
   */
   const bootstrappingFreers = patchAtBootstrapping(
       appName,
       elementGetter,
       sandbox,
       scopedCSS,
       excludeAssetFilter
   );
   
   
   // line 64
   // mount的时候激活sanbox
   async mount(){
       sandbox.active();
       // ...
   }
   
   
   // line: 91
   // unmount时卸载sanbox
   async unmount(){
       sandbox.inactive();
   }
   ```

6. mountRootParcel 组件加载模式在干嘛?

   这由Single-SPA来进行触发,  该方法判断当前该执行什么周期函数, 并将在对应周期的queue一并执行了, 回调到上面的引导程序进行挂载.

   ```javascript
   /*
   * file: single-spa/parcels/mount-parcel.js
   * line: 24
   */
   export function mountRootParcel() {
     return mountParcel.apply(rootParcels, arguments);
   }
   
   export function mountParcel(config, customProps) {
       // line: 84
       const parcel = {
           id, // 挂载的ID
           status: passedConfigLoadingFunction // 主要使用的是这个, 判断是不是注册
             ? LOADING_SOURCE_CODE
             : NOT_BOOTSTRAPPED,
           customProps, // 注册时传下来的自定义的数据
           parentName: toName(owningAppOrParcel), // 需要挂载的父节点
           unmountThisParcel() {/*...*/}, // 卸载自己的方法
     	};
       
       
       // line: 205
       // 将对应的钩子的queue 扁平化出来, 依次挂载到对象上
       parcel.name = name;
       parcel.bootstrap = flattenFnArray(config, "bootstrap"); // 启动时
       parcel.mount = flattenFnArray(config, "mount"); // 挂载时
       parcel.unmount = flattenFnArray(config, "unmount"); // 卸载时
       parcel.timeouts = ensureValidAppTimeouts(config.timeouts);
       
       
       // line: 256
       return toMountPromise(parcel) // 去调用mount加载沙盒
   }
   ```





### 应用通讯?

- Props: 在应用注册时可以自行提供的数据和方法, 并可以在将主应用中具有的数据流管理方案传到子应用中进行使用.

- GlobalState: 本质就是一个发布-订阅模式. 引导子应用加载时默认传入到所有的子应用中, 具有订阅和发布的功能

  ```javascript
  const deps = {};
  let globalState = {};
  
  export function emitGlobal(state, prevState){
      Object.keys(deps).forEach(id => {
          deps[id](cloneDeep(state), cloneDeep(prevState));
      });
  };
  
  export function initGlobalState(state){
      const prevGlobalState = cloneDeep(globalState);
      globalState = cloneDeep(state);
      emitGlobal(globalState, prevGlobalState);
      
      return {
          onGlobalStateChange(callback){
              const cloneState = cloneDeep(globalState);
              callback(cloneState, cloneState);
          },
          setGlobalState(state){
        		const prevGlobalState = cloneDeep(globalState);
              emitGlobal(globalState, prevGlobalState);
          },
      }
  }
  ```

- 浏览器的自定义事件 

  ```javascript
  // 导出自定义事件或者是挂载到全局
  // event.js
  export const event = new CustomEvent('CustomeEventName', {
  	detail: {}, // 这里可以传递任意参数
  });
  
  
  // 导入事件
  // dispatch.js
  import { event } from './event.js';
  document.dispatchEvent(event); // 这里可以触发事件
  
  
  // addeventlistener.js
  window.addeventlistener('CustomeEventName', function (event){
      // 这里的event.detail则为注册时传入的消息
      // 也可以在这里回调传参回去
  })
  ```

  

### 多层嵌套

现在业务中默认使用umi.js, 默认提供了对qiankun的支持, 如果需要在微应用中再次应用微应用,只需要将中间层的微应用同时标记为主应用和微应用即可,

参考`@chengxing`提供的gitlab demo

