//const say_hello = require("./utils/hello"); //Syntaxe seul ES5

const { say_hello , sum, multiply} = require("./utils/hello"); //Syntaxe multiple ES5

const Robot = require("./classes/Robot");

say_hello("World");

const total = sum(1, 1);
console.log(total);

console.log(multiply(2,3))

const nono = new Robot("red")
console.log(nono.who_am_i())



