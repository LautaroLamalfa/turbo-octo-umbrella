const express = require("express");

const {Router} = express

const router = new Router();


router.get('/', (req,res) => {
    res.sendFile("./home.ejs", {root:"."});
})

module.exports = router;