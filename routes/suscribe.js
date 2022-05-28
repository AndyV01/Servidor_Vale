const express = require('express')
const bcrypt = require('bcrypt')

const router = express.Router()
const jwt = require('jsonwebtoken')

const Users = require('../model/user')

//formulario de inscripcion
router.post("/", async function (req, res) {
  const name = req.body.name
  const email = req.body.email
  let password = req.body.password
  password = await bcrypt.hash(req.body.password, 10)
  const newUser = {
      name,
      email,
      password
  }  
  
  if (newUser.name && newUser.email && newUser.password) {
    const user = await Users.create({
        name_u: name,
        email,
        password,
        expiresIn: '30d'
      })
    payload = {
        id: user.id,
        password: user.password,
        email: user.email,
    }
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '10h' })
    res.cookie("token", token, { httpOnly: true })
    res.redirect("/galeria")
    } else {
    const response = {
        "error": "Debes completar los campos name y mail"
    }
    res.status(400)
    res.send(response)
}
})
module.exports = {
    router: router
  }