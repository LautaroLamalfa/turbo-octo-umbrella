const express = require("express");
const Contenedor = require("../contendor");

const { Router } = express;
const router = new Router();

let chat = new Contenedor("messages.txt");


router.get("/", (req, res) => {
  async function getTodos(){
    try{
      let aux = await chat.getAll();
      res.send(aux);
    }
    catch(error){
      throw Error("Error en todos los mensajes")
    }  
  }    
  getTodos();

});

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
      
    } catch (error) {
      throw Error("Error en post Chat");
    }
  }
  saveChat();
});


module.exports = router;