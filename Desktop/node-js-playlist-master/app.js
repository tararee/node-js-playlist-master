// this is requiring something,
// which we need to make available via export
//we set it as a variable, and then we can call the variable
// from the count.js:

var counter = require ('./count');

console.log(counter(['shaun','crystal', 'ryu']));

//So at this point, if we go to the console and
//type node app, it will return "There are 3 elements in this array"