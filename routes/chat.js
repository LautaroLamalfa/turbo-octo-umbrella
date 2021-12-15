const express = require("express");
const Contenedor = require("../contenedor");

const { Router } = express;
const router = new Router();

let chat = new Contenedor("chat.txt");


//GET TODO EL CHAT
router.get("/", (req, res) => {
  async function getTodos(){
    try{
      let aux = await chat.getAll();
      res.send(aux);
    }
    catch(error){
      throw Error("Error en todos los chats")
    }  
  }    
  getTodos();

});

//POST CON CHAT
router.post("/", (req, res) => {
  const fecha = new Date();
  let fechaOK = fecha.getDate() + '/' + (fecha.getMonth()+1) + ' - ' + fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds()
  
  let {name, msg } = req.body;
  let newObj = {
    date : fechaOK,
    user: name,
    message: msg,
  };

  async function saveChat(){
    try {
      await chat.save(newObj);
      res.send('chat agregado');
      /* res.render("products", {data:aux}); */
      
    } catch (error) {
      throw Error("Error en post Chat");
    }
  }
  saveChat();
});


//EXPORT MODULO ROUTER
module.exports = router;