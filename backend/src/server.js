const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors'); 

const routes = require('./routes');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server); 


// store socket ids by user id { userId: socketId }
const connectedUsers = {};

io.on('connection', socket => {
    const { user } = socket.handshake.query;
    connectedUsers[user] = socket.id;
});

mongoose.connect(
    'mongodb+srv://tindev-react-web:tindev-react-web@cluster0-tblk3.mongodb.net/tindev?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true}
);

app.use( (req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);