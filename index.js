const express = require("express");
const app = express();
const dbconnection = require('./dbnet/dbconnection')
const dbops =require('./models/index')
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
io.on("connection", async(socket) => {
     let msgHistory=await dbops.Messages.find({});
     let messagespast = msgHistory.map(item=>item.message)
     io.emit("connection",messagespast)
  socket.on("chat message", async (msg) => {
    io.emit("chat message", msg);
    await dbops.Messages.create({message:msg});
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
