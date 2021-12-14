const express = require('express');
const router = require("./routes/index")
const chatRoute = require("./routes/chat")
const produtosRoute = require("./routes/productos");

const app = express();

// Middlewares
app.use(express.json())
app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({ extended: true }))
app.use("/api", router);
app.use("/api/chat", chatRoute);
app.use("/api/products", produtosRoute);

// EJS
app.set("views", "./views")
app.set("view engine", "ejs")

//Servidor HTTP
const http = require("http");
const server = http.createServer(app);

//Servidor de Socket
const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket)=> {
    console.log("Usuario conectado");
    
    socket.emit("render", "Hola Cliente")
    socket.on("actualizacion", ()=>{
        io.sockets.emit("render", "Actualizacion")
    })
})


//Routes
app.get("/", (req, res)=>{
  res.send("Hola estas en index.js");
})
server.listen(8081,() => {
    console.log("servidor 👍 por 8081");
})
