const express = require('express')
const router = express.Router()
const cloudinary = require('cloudinary')
const PhotoHome = require('../model/photoHome')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  })

router.get("/:photo_id", async (req, res) => {
    const { photo_id } = req.params
    try {
      const photo = await PhotoHome.destroy({
        where: { id: photo_id }
      })
      res.redirect("/config")
    } catch (error) {
      console.log(error)
    }
  })
  module.exports = {
    router: router
    }