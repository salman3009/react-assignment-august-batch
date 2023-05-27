const eventEmitter = require('events');

const eventsHandler = new eventEmitter();

//event listener
eventsHandler.on('click',function(){
   console.log('click');
})

eventsHandler.on('sub',function(c,d){
    console.log(c,d);
})

//emitter
eventsHandler.emit('click');
eventsHandler.emit('sub',100,50);
