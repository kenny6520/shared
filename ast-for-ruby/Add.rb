require_relative './Number';

class Add < Struct.new(:left, :right)
    def inspect
      "<<#{self}>>"
    end

    def to_s
      "#{left} + #{right}"
    end

    def reducible? # 可规约
      true
    end

    def to_js
      "e => (#{left.to_js})(e) + (#{right.to_js})(e)"
    end

    # 规约方法, 需要将左右两边均规约到不可在进行规约, 最后才能进行加法运算
    # example：
        # x = 10
        # y = (x + 1) + 10; 
        # 对应到add中 x+1 为left是可以进行规约, 先将 x + 1 规约到 => 10 + 1 再规约到 => 11
        # 最后计算 y = 10 + 1

    def reduce(environment)
      if left.reducible?
        Add.new(left.reduce(environment), right) # 用规约结果创建新 Add 用于继续规约
      elsif right.reducible?
        Add.new(left, right.reduce(environment)) # 用规约结果创建新 Add 用于继续规约
      else
        Number.new(left.value + right.value) # 当left和right都不可规约后, 进行计算
      end
    end

  end