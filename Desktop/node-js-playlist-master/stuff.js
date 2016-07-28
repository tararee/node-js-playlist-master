var counter = function(arr){
	return 'There are ' + arr.length + ' elements in this array';
};
//Using the `` backtick function makes it so you don't
//have to concatenate!!!! whoa! $makes it a number!
var adder = function(a,b){
	return `The sum of the 2 numbers is ${a+b}`;
};

var pi = 3.142;

// We can basically keep adding properties with .exports
module.exports.counter = counter;
module.exports.adder = adder;
module.exports.pi = pi;
//Now we're exporting all three variables
//We can go to app.js and make it require this stuff file,
//and it will access all of these through that one require();
//"stuff" is essentially module.exports, so it will
//if you run stuff.counter, it will come over here to grab
//module.exports.counter and run the var counter function