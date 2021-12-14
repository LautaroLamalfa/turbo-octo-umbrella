const express = require("express");
const Contenedor = require("../contendor");

const { Router } = express;
const router = new Router();

let productos = new Contenedor("products.txt");


//GET TODOS LOS PRODUCTOS
router.get("/", (req, res) => {

  async function getTodos(){
    try{
      let aux = await productos.getAll();
      res.send(aux);
    }
    catch(error){
      throw Error("Error en todos los productos")
    }  
  }    
  getTodos();

});

router.get("/:id", (req, res) =>{
  async function getxId(){
    try{
      let ptoId = await productos.getById(parseInt(req.params.id));
      if (Object.keys(ptoId).length === 0) {
        res.send({ error : 'producto no encontrado' });
      }
      else{
        res.send(ptoId);
      }
    }
    catch(error){
      throw Error("Error en pto random");
    }
    
  };
  getxId();
});

router.post("/", (req, res) => {
  /* console.log(req.body); */
  let { nombre, precio, thumbnail } = req.body;
  let newObj = {
    nombre,
    precio,
    thumbnail,
  };

  async function savePto(){
    try {
      await productos.save(newObj);
      res.statusCode = 301;
      res.setHeader("Location", "http://localhost:8080/");
      res.end();
      
    } catch (error) {
      throw Error("Error en post productos");
    }
  }
  savePto();
});

router.put("/:id", (req, res) =>{
  let { nombre, precio, thumbnail } = req.body;

  async function modfPto(){
    try {
      let ptoMod = await productos.getById(parseInt(req.params.id));
      if (Object.keys(ptoMod).length === 0) {
        res.send({ error : 'producto no encontrado' });
      }
      else{
        ptoMod = {
        nombre,
        precio,
        thumbnail,
        id : parseInt(req.params.id)
      }
        let todosPtos = await productos.read();
        todosPtos = (JSON.parse(todosPtos, null, 2));
        let auxId = parseInt(req.params.id) - 1;
        todosPtos.splice(auxId, 1, ptoMod);
        await productos.write(todosPtos, "Producto modificado correctamente");
        res.send(todosPtos);
      }
    } catch (error) {
      throw Error("Error en put modificacion productos");
    }
  }
  modfPto();

})

router.delete("/:id", (req,res) =>{
  async function deletexId(){
    try {
      let flag = await productos.getById(parseInt(req.params.id));
      if (Object.keys(flag).length === 0) {
        res.send({ error : 'producto no encontrado' });
      }
      else{
        await productos.deleteById(parseInt(req.params.id));
        res.send(await productos.getAll());
      }
    } catch (error) {
      throw Error ("Error en el delete por id");
    }
  }
  deletexId();
})

module.exports = router;