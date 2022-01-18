function say_hello(str){
    console.log(`Hello, ${str}`);
}

function sum(param1, param2){
    return param1 + param2;
}

const multiply = (param1, param2) => {
    return param1 * param2;
}
// module.exports = say_hello; //Syntaxe seul ES5 
module.exports = { say_hello, sum, multiply }; //Syntaxe multiple ES5 