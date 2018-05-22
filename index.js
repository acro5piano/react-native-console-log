#!/usr/bin/env node

var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });
});

client.on('message', function(message) {
    console.log(message)
})

client.connect('ws://localhost:8081/debugger-proxy?role=debugger&name=Chrome');
// client.connect('ws://localhost:8081/debugger-proxy?role=debugger&name=Chrome', 'echo-protocol');
