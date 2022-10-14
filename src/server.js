import express from "express";

const app = express();
const port = 3000;
// view engine을 pug로 설정
app.set("view engine","pug");
// views 폴더 위치 설정
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname+"/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));


console.log(`connect to http://localhost:${port}`)
app.listen(port);