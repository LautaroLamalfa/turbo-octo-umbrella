const express = require('express');
const app = express()

const server = require("http").Server(app)
const io = require("socket.io")(server)

app.use(express.static("public"))
app.use("/css", express.static(__dirname + './public/css'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

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

server.listen(8081, () => {
    console.log("Servidor corriendo")
})