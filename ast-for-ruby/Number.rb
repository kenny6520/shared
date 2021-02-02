class Number < Struct.new(:value)
    def inspect
      "<<#{self}>>"
    end

    def to_s
      "#{value}"
    end

    def reducible? # 是否可规约
      false
    end

    def to_js # 转换为js
      "e => #{value}"
    end
  end