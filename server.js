const express = require('express');
const app = express();
const PORT = 9000;
const {Server} = require("socket.io");



// to use sockets we need http
// so we are importing http
const http = require('http');

// we are integrating http and express server
// to get a server that supports http requests aka websocket protocol
const server = http.createServer(app);

const io = new Server(server);

// establishing connection to frontend
io.on("connection",(socket)=>{
    //IO is a single unique connected to server
    // nd sockets are multiple and are associated with frontend


    // we are catching the event of emitting
    socket.on("emit-msg",(data)=>{
        io.emit("emit-msg",data)

    });

});


// this is just running middleware
//by passing the public folder to browser

app.use(express.static('public'));
// express.static is a internal method of express
// used to send static html files to browser
// just like how live server works


server.listen(PORT,()=>{
    console.log(`your server is up and running on http://localhost:${PORT}/`);

});