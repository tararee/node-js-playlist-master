module.exports.counter = function(arr){
	return 'There are ' + arr.length + ' elements in this array';
};
//Using the `` backtick function makes it so you don't
//have to concatenate!!!! whoa! $makes it a number!
module.exports.adder = function(a,b){
	return `The sum of the 2 numbers is ${a+b}`;
};

module.exports.pi = 3.142;

// We can basically keep adding properties with .exports
module.exports.counter = counter;
module.exports.adder = adder;
module.exports.pi = pi;
// We can cut out the middle man and replace the 
// variables with module.exports.whatever