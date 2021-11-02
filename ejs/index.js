const express = require('express');
const app = express()
const router = require("./views/templates/chat");

//Servidor HTTP
const http = require("http");
const server = http.createServer(app);

//Estaticos
app.use(express.static("public"))
app.use("/css", express.static(__dirname + './public/css'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Routes
app.use("/api", router);

//Servidor de Socket
const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("Usuario Conectado!");
  
    socket.emit("message_back", msn);
    socket.on("message_client", (data) => {
      console.log(data);
    });
  
    socket.on("data_client", (data) => {
      console.log(data);
  
      msn.push(data);
  
      console.log(msn);
      // socket.emit("message_back", msn);
      io.sockets.emit("message_back", msn)
  
    });
  });

const array = [{
    name: "sofa",
    price: "$250",
    image: "https://res.cloudinary.com/dpr3boqjf/image/upload/v1628120252/rinconero_cjnise_cjytbt.jpg"
    }
]

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");


//Rutas

app.get("/", (req, res) => {
    res.render("home", {mensaje: "Pagina con Ejs", data:array})
})

app.post("/", (req,res) => {
    const {name, price, image} = req.body
    console.log('Nombre', name);
    console.log('Precio', price);
    console.log('Imagen', image);


    let newArray = {
        name,
        price,
        image,
    }

    array.push(newArray)
    res.json(newArray)

})

app.listen(8081, () => {
    console.log("Servidor corriendo")
})