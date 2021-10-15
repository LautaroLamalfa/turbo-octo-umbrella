const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
// const Swal = require('sweetalert2')

const PORT = process.env.PORT || 8081
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
    image: "https://pixabay.com/get/gdfc740647acaabf841fea198957418fbfe2ce6edcc348eb5b23d5fd8b98d516052df2c8187e9a2f0e7f213b71787f2ece9a90235e424ae969f1d4045b004ff82_1920.jpg"
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