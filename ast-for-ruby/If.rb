require_relative './Boolean';

class If < Struct.new(:true_or_false, :if_true, :if_false)
    def inspect
        "<<#{self}>>"
    end

    def to_s
        "if (#{true_or_false}) { #{if_true} } else { #{if_false} }"
    end

    def reducible?
        true
    end

    def reduce(environment)
      if true_or_false.reducible? 
        [If.new(true_or_false.reduce(environment), if_true, if_false), environment] 
      else
        case true_or_false
          when Boolean.new(true) 
            [if_true, environment] 
          when Boolean.new(false)
            [if_false, environment]
        end
      end
    end

    def to_js
      <<~EOS
        e => {
          if ( (#{true_or_false.to_js})(e) ){
            return (#{if_true.to_js})(e)
          }else{
            return (#{if_false.to_js})(e)
          }
        }
      EOS
    end
  end