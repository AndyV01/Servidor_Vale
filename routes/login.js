const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const router = express.Router()

const Users = require('../model/user')

//Inicio de Secion 
router.post("/", async function (req, res) {
    const { email, password } = req.body
    let resultado = false
    const usuarioObj = await Users.findOne({ where: { email: email } })

    if (usuarioObj !== null) {
        resultado = await bcrypt.compare(password, usuarioObj.password)
    }
    if (resultado) {
        payload = {
            id: usuarioObj.id,
            password: usuarioObj.password,
            email: usuarioObj.email,
        }
        const token = jwt.sign(payload, secret, { expiresIn: '10h' })
        res.cookie("token", token, { httpOnly: true })   
        res.redirect("/galeria")
    }
    else {
        res.send(`
        <style>
        body {
            background-image: url(../pics/fondo.jpg);
            background-size: cover;
            font-family: sans-serif;
            text-align: center;
        }
        button {
            background-color: #EDCF8E;
            
            color: white;
            margin: 5px;
            padding: 5px;
            width: 50vw;
            text-align: center;
            border-radius: 5px;
            border: none;
            font-size: 30px;
            box-shadow: 0 0 5px #EDCF8E, 0 0 25px #EDCF8E, 0 0 50px #EDCF8E,
    0 0 200px #EDCF8E
             }
        h1 {
            margin-top: 150px;
            font-size: 70px;
             }
        h3 {
            font-size: 35px;
        }

        </style>
        <section class="container">
        <h1>No se pudo iniciar sesion</h1>
        <h3>Por favor, suscribete para acceder al contenido</h3>
        <button onclick="window.location.href='/'">Volver</button>
        <div>
        </div>
        </section>
    `) }
})

module.exports = {
    router: router
}