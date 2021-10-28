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
    name: "sofa",
    price: "$250",
    image: "https://res.cloudinary.com/dpr3boqjf/image/upload/v1628120252/rinconero_cjnise_cjytbt.jpg"
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
    res.json(newArray)

})



app.listen(PORT, () => {
    console.log("Servidor corriendo por " + PORT);
})