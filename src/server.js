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
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));


// console.log(`connect to http://localhost:${port}`)
const handleListen = () => console.log(`connect to ws://localhost:${port}`)

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

// app.listen
server.listen(port, handleListen)