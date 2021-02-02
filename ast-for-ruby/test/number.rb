# -*- coding: UTF-8 -*-

require_relative '../Number';

=begin
    # 测试: 传入一个普通数字
    # 期待返回: << value >>

    # example:
        ast = Number.new(10);
        p ast 
        输出 << 10 >>
=end

ast = Number.new(10);
puts "用例一传入不可规约数字:"
p ast


=begin
    # 测试: 传入的数字又是有数字产生的数字
    # 期待返回: << value >>

    # example:
        ast = Number.new(
            Number.new(20)
        );
        p ast 
        输出 << 20 >>
=end

ast1 = Number.new(
    Number.new(
        20
    )
)

puts "用例二传入一个可规约的数字"
p ast1


=begin
    # 测试: ruby的number转换成js的number
    # 期待返回: “env => value”

    # 注意事项：
        # 因为我们可能在使用的时候这个值可能是从环境env里面来的（如果你知道闭包，那应该很好理解）
        # 所以我们不直接生成 "value" 的形式，而是生成函数形式 “env => value” 
        # env 对应就是传入进来的环境
    
    # 怎么运行：
        # 当我们调用to_js转换为 “env => value” 后, 其实我们是可以直接在js中运行的了
        # 只需要将生成的结果给js中的 eval 执行，并传递一个环境就可以了
        
        # example：eval("e => 10")({}) 

=end

jscode = Number.new(18).to_js
puts "编译为js"
p jscode