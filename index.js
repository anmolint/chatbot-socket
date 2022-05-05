const express = require("express");
const app = express();
const dbconnection = require('./dbnet/dbconnection')
const dbops =require('./models/index')
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const console = require("console");
const io = new Server(server);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
io.on("connection", async(socket) => {
    let msgHistory=await dbops.Messages.find({});
      msgHistory = msgHistory.filter(el => el.name)
     let messagespast =  msgHistory.map(item => {
      const messageData = {};
  
      messageData.name = item.name;
      messageData.message = item.message
      return messageData;
  })
 io.emit("connection",messagespast)
  socket.on("chat message", async (msg) => {
    io.emit("chat message", msg);
    await dbops.Messages.create({
      name:msg.namevalue,
      message:msg.messages
    });
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
