// this is requiring something,
// which we need to make available via export
//we set it as a variable, and then we can call the variable
// from the count.js:

var stuff = require ('./stuff');

console.log(stuff.counter(['shaun','crystal', 'ryu']));
console.log(stuff.adder(5,6));

//So at this point, if we go to the console and
//type node app, it willreturn
// "There are 3 elements in this array"
//and also "The sum of the 2 numbers is 11"