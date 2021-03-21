## GIT 自定义


我们在安装完成✅git之后是可以通过修改、增加配置文件来定制化git环境的，最典型的定制就如我们在初次使用时候的 user.name 和 user.email
```bash
git config --global user.name "xxx"
git config --global user.email "xxx@xxx.xxx"
```

可以看到我们使用 git config 命令来配置git，但其实这个命令也是在修改git后面的配置文件; 它首先会查找系统级的 `/etc/gitconfig` 文件，该文件含有系统里每位用户及他们所拥有的仓库的配置值。 如果你传递 --system 选项给 git config，它就会读写该文件;

你可以试着在终端运行以下命令

```bash
git config --system
```
你将会看到这样的一个输出，😯哦看来我们刚刚是把用户名和邮箱配置到来全局环境哈
![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1614476770668/GE75AHG8I.png)


接下来 Git 会查找每个用户的 `~/.gitconfig` 文件（或者 `~/.config/git/config` 文件）。 你可以传递 --global 选项让 Git 读写该文件;


最后 Git 会查找你正在操作的仓库所对应的 Git 目录下的配置文件（`.git/config`）。 这个文件中的值只对该仓库有效，它对应于向 git config 传递 --local 选项;

 [阅读地址](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-%E9%85%8D%E7%BD%AE-Git) 


<br />


**增加自定义命令常见的方式**

- 通过 git 提供的alias（别名）进行注册

    我们通常见到的别名配置方式如，全局配置
    ```bash
   git config --global alias.ck checkout   # git ck
    ```
   你也可以自行修改上面👆提到的配置文件，可以通过以下命令查询到已经有的命令以及对应配置文件的地址，可以选择编辑他来完成git配置

    ```bash
git config --list --show-origin
```

 这是我现在有的一些配置
 ![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1614477652005/zJV2xaGtD.png)

 如果你是mac或者linux，你可以运行 open 去打开他, window用户可以使用 start 命令
 ![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1614477814811/WjYmTMy8r.png)

 在这个文件中可以看到一个 [alias] 的属性，你可以像它一样新增一个自己的别名和命令；格式为 `命令 = 执行什么操作`
 ![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1614477970568/nTyErOQwf.png)
 比如我添加了一句
 ```bash
lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
```
 试着用一下 
 ```bash
git lg
```
![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1614478379127/AC3h21Q6-.png)

- 通过 Git 遵循命名约定  git-<subcmd> 自动解析PATH中可执行文件中的子命令, 就可以同 git <subcmd> 执行，这是很多git扩展的真实实现方式

- 在自己项目下使用

 你可以像第一种那样操作，只需要把对应的 --global、--system 去除即可，这将会把别名添加到项目种 `.git/config下`, 但是一帮情况下.git文件是隐藏的，我们还可以使用另一种指定自定义文件+脚本的方式来实现

 我们在项目根目录下添加一个 `.gitconfig`的文件（文件其实不太重要，不过建议使用.git开头）
 ![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1614478983802/oJRLNeM10.png)
 像是编写git其他配置文件一样编写别名命令，如我增加一个 `git say`的命令我可以这样做
 ![image.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1614479703810/-mES-Alep.png)
 可以看出来后面是 git 命令或者是 shell 脚本
