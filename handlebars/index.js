const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
// const Swal = require('sweetalert2')

const PORT = process.env.PORT || 8082
app.set("views", __dirname + "/views")
app.set("view engine", "hbs")
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Swal.fire({
//     position: 'top-end',
//     icon: 'success',
//     title: 'Producto guardado',
//     showConfirmButton: false,
//     timer: 1500
//   })

app.engine(
    "hbs",
    handlebars({
        extname: "hbs",
        layoutsDir: __dirname + "/views/layout",
        defaultLayout:"main"
    })
)

const array = [{
    name: "memoria USB",
    price: "$250",
    image: "https://pixabay.com/get/g8fccccf10041cf8e5ab20f83ac0e853caa3c48e8e9bf83bc3a70f4d3e19ccb7a27c02c2a78c743704483c3085a2a81da8e6e658236beb287a189feed9d6df8f6_1920.jpg"
    }
]


app.get("/", (req,res)  => {
    res.render("home", {mensaje: "Pagina con Handlebars"})
})

app.get("/productos", (req,res) => {
    res.render("products", {layout:"layoutProducts", data:array})
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
    res.status(201).send("Producto creado")
})



app.listen(PORT, () => {
    console.log("Servidor corriendo por " + PORT);
})