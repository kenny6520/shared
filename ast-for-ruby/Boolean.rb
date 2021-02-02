class Boolean < Struct.new(:value)
    def inspect
        "<<#{self}>>"
    end

    def to_s
      value.to_s
    end

    def reducible?
      false
    end
    
    def to_js
      "e => #{value}"
    end
end