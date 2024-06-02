import express from "express";
import { Server } from "socket.io";
import SocketIO from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import http from "http";

const app = express();
const port = 3000;

// view engine을 pug로 설정
app.set("view engine", "pug");

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);
// views 폴더 위치 설정
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));
/**
 * WebSocket
const wss = new WebSocket.Server({ server });
function onSocketClose() {
  console.log("Disconnected from the Browser ❌");
}
const sockets = [];
wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickname"] = "Anon";
  console.log("Connected to Browser ✅");
  socket.on("close", onSocketClose);
  socket.on("message", (msg) => {
    msg = msg.toString("utf-8");
    const message = JSON.parse(msg);
    switch (message.type) {
      case "new_message":
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}: ${message.payload}`)
        );
      case "nickname":
        socket["nickname"] = message.payload;
    }
  });
});
*/

wsServer.on("connection", (socket) => {
  socket.on("join_room", (roomName) => {
    socket.join(roomName);
    socket.to(roomName).emit("welcome");
  });
  socket.on("offer", (offer, roomName) => {
    socket.to(roomName).emit("offer", offer);
  });
  socket.on("answer", (answer, roomName) => {
    socket.to(roomName).emit("answer", answer);
  });
  socket.on("ice", (ice, roomName) => {
    socket.to(roomName).emit("ice", ice);
  });
});

const handleListen = () => console.log(`connect to http://localhost:${port}`);
httpServer.listen(port, handleListen);
