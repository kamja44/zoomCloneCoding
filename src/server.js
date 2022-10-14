import express from "express";

const app = express();
const port = 3000;
console.log("Hello");
console.log(`connect to localhost:${port}`)
app.listen(port);
