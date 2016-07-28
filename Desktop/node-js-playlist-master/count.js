var counter = function(arr){
	return 'There are ' + arr.length + ' elements in this array';
};

// module.exports makes what it lists available outside of this module.
// Here, it's the counter function:

module.exports = counter;