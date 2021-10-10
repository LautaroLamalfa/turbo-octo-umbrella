const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const Swal = require('sweetalert2')

const PORT = process.env.PORT || 8081
app.use(express.json())
app.use(express.urlencoded({extended: true}))

Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Producto guardado',
    showConfirmButton: false,
    timer: 1500
  })

app.engine(
    "hbs",
    handlebars({
        extname: "hbs",
        layoutsDir: __dirname + "/views/layout",
        defaultLayout:"main"
    })
)

const array = [
    {
        name:"Papel Higienico",
        price:"250",
        image: "https://pixabay.com/get/g16496af27917e6a60c3a6a87bdf2462573ba47b8c1aed302d3498d7585c19e66a828bddf9e2194cb0e21cbb5e53d561f4e356bd7c13dfcad73c362822893ee4c_1920.jpg"
    },
    {
        name:"Auriculares",
        price:"750",
        image:"https://pixabay.com/get/g66e9f2865fc1afb4cba837bb24488b3a0a374ef912fb430e27ab025897ccb50dcf4a5e4cd07b4c26745d04125a8d2b9a1d3f413dda2220c9e14c85c575757f82_1920.jpg"
    },
    {
        name:"Rollos de Cocina",
        price:"200",
        image:"https://pixabay.com/get/g964ee766ef3017b2f5f318b7c2eb2c6ef3d965019359dd56544070627cd6ad57fc86a6bace0b32791c51581abbb828652bffc856845b08e795b881fdc1ae46bc_1920.jpg"
    },
    {
        name:"lapicera",
        price:"75",
        image:"https://pixabay.com/get/g8890f5564c3a3cafc84e9b9a8bd256ee746f677ac48b3fff4a11e1d9a93ab69c3227bd3aa9c0cc8e1240e805a3c9ec54_1920.jpg"
    }
]

app.set("views", __dirname + "/views")
app.set("view engine", "hbs")

app.get("/", (req,res)  => {
    res.render("home", {mensaje: "Pagina con Handlebars"})
})

app.post("/", (req,res) => {
    const {name, price, image} = req.body;

    let newArray = {
        name,
        price,
        image,
    }

    array.push(newArray)
    res.status(201)
    
})

app.get("/productos", (req,res) => {
    res.render("products", {layout:"layoutProducts", data:array})
})



app.listen(PORT, () => {
    console.log("Servidor corriendo por " + PORT);
})