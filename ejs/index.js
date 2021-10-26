const express = require('express');

const app = express()

const server = require("http").Server(app)

const io = require("socket.io")(server)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const array = [{
    name: "memoria USB",
    price: "$250",
    image: "https://pixabay.com/get/gdfc740647acaabf841fea198957418fbfe2ce6edcc348eb5b23d5fd8b98d516052df2c8187e9a2f0e7f213b71787f2ece9a90235e424ae969f1d4045b004ff82_1920.jpg"
    }
]

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");


//Rutas

app.get("/", (req, res) => {
    res.render("index", {mensaje: "Pagina con Ejs"}, {data:array})
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
})

server.listen(8081, () => {
    console.log("Servidor corriendo")
})