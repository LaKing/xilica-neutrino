#!/bin/node

var net = require('net');

// this is your xilica processor
var HOST = '192.168.88.42';
var PORT = 10007;

// in the neuConsole or in the Solaro Console application you must name the unit you want to query or controll.
// The Third Party Controll names have to be used - and assigned seperatly
var comm = "GET IN1";

// this is your local connection, make sure your firewall is open on that port
var local_port = 2000;
var local_ip = "192.168.88.26";

var client = new net.Socket();
client.setEncoding('ascii');

client.on('data', function(data) {
    console.log('Received1: ' + data);
    client.destroy();
});

client.on('close', function() {
    console.log('Connection closed');
});

client.connect({port:PORT,host:HOST,localAddress: local_ip, localPort:local_port}, function() {
    console.log('Connected', client.remoteAddress, client.remotePort );

    client.write(comm + "\r", 'ascii', function() {
        console.log("sent: " + comm);
    });
});

console.log("Xilica Neutrino connection test Test started");
