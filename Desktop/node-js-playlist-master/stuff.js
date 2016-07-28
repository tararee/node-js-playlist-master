var counter = function(arr){
	return 'There are ' + arr.length + ' elements in this array';
};
//Using the `` backtick function makes it so you don't
//have to concatenate!!!! whoa! $makes it a number!
var adder = function(a,b){
	return `The sum of the 2 numbers is ${a+b}`;
};

module.exports = counter;