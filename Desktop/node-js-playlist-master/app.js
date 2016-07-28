var events = require('events');
var util = require('util');

var Person = function(name){
	this.name = name;
};
//First we put the object constructor (Person)
//that we want to inherit something, then what
//we want it to inherit
util.inherits(Person, events.EventEmitter);
//anyone created using Person constructor will inherit
//this event constructor

//now we will pass in some new objects
var james = new Person ('james');
var mary = new Person ('mary');
var ryu = new Person ('ryu');
//put them in an array
var people = [james, mary, ryu];

//forEach is a js function that cycles through each 
people.forEach(function(person){
	person.on('speak', function(mssg){
		console.log(person.name + ' said: ' + mssg);
	});
});

james.emit('speak', 'hey dudes');
ryu.emit('speak', 'I want a curry');


//person.on speak takes the person and attaches
// the listen event.