var Client = function(name) {   this.name = name;};Client.prototype = {   name: null,   server: null};Client.prototype.connect(location, onConnectHandler) {   var host = document.location.host;	server = io.connect(location);	server.on('connect', function() {		server.emit('set name', this.name, function(result) {			if (!result.error) {				onConnectHandler();			}		});	});};Client.prototype.on(eventName, eventHandler) {	server.on(eventName, eventHandler);};Client.prototype.send(eventName, data) {	server.emit(eventName, data);};