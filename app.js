const path = require('path');
const express = require("express");
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 4000;


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })
}

var users = {};

io.on("connection", socket => {

    const leave = (socket) => {
        if (users[socket.id]) {
            const msg = `${users[socket.id]} left`;
            console.log(msg)
            socket.broadcast.emit("message", {
                sender: "server",
                text: msg,
                time: Date.now().valueOf()
            })
            delete users[socket.id];
        }
    }
    console.log("New client connected");
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        leave(socket);
    });
    socket.on("joinchat", (username) => {
        console.log(`${username} joined`);
        socket.broadcast.emit("message", {
            sender: "server",
            text: `${username} joined`,
            time: Date.now().valueOf()
        })
        users[socket.id] = username;
    });

    socket.on("leavechat", () => {
        leave(socket);
    });
    socket.on("message", (text) => {

        const msg = {
            sender: users[socket.id],
            text,
            time: Date.now().valueOf()
        };
        console.log(msg);
        io.emit("message", msg)
    });

});



server.listen(PORT, () => { console.log(`Server running on Port ${PORT}`) });