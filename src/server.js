import express from "express";
import WebSocket from "ws";
import http from "http";

const app = express();
const port = 3000;
// view engine을 pug로 설정
app.set("view engine","pug");
// views 폴더 위치 설정
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname+"/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));


// const handleListen = () => console.log(`connect to ws://localhost:${port}`);
const handleListen = () => console.log(`connect to http://localhost:${port}`);

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

const sockets = [];

wss.on("connection", (socket) => {
    sockets.push(socket);
    console.log("Connected to Browser");
    socket.on("close", () => {
        console.log("DisConnected from Browser");
    });
    socket.on("message", (message) => {
        sockets.forEach(aSocket => {
            aSocket.send(message.toString());
        });
    });
});

// app.listen
server.listen(port, handleListen)