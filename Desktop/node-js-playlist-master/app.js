var events = require('events');
//node has a built-in module called events

//we can create custom events that do what we want

var myEmitter = new events.EventEmitter();
myEmitter.on('someEvent', function(mssg){
	console.log(mssg);
});

myEmitter.emit('someEvent', 'the event was emitted');