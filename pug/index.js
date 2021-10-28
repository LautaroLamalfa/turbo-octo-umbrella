const express = require('express');

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const array = [{
    name: "sofa",
    price: "$250",
    image: "https://res.cloudinary.com/dpr3boqjf/image/upload/v1628120252/rinconero_cjnise_cjytbt.jpg"
    }
]

app.set("views", __dirname + "/views");
app.set("view engine", "pug");


//Rutas

app.get("/", (req, res) => {
    res.render("index", {mensaje: "Pagina con Pug"})
})

app.get("/products", (req, res) => {
    res.render("products", {data:array})
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

app.listen(8083, () => {
    console.log("Servidor corriendo")
})