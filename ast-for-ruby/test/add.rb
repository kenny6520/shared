# -*- coding: UTF-8 -*-

require_relative '../Number';
require_relative '../Add';

ast = Add.new(
    Number.new(10),
    Number.new(20)
)

p ast

ast2 = Add.new(
    Add.new(
        Number.new(10),
        Number.new(20)
    ),
    Number.new(30)
)
p ast2

ast3 = Add.new(
    Add.new(
        Number.new(x),
        Number.new(20)
    ),
    Add.new(
        Number.new(30),
        Number.new(40)
    )
)
p ast3
