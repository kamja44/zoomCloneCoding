import express from "express";
import SocketIO from "socket.io";
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


const handleListen = () => console.log(`connect to http://localhost:${port}`);

const httpserver = http.createServer(app);
const wsServer=SocketIO(httpserver);
wsServer.on("connection", (socket) => {
    console.log(socket);
})

httpserver.listen(port, handleListen)