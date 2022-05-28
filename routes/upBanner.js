const express = require('express')
const Banner = require('../model/banner')

const controller = require('../controllers/upload')
const router = express.Router()
const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
const fs = require('fs-extra')

router.post('/', controller.upload,
    async (req, res) => {
  try {
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
           public_id: req.file.originalname,
             overwrite: true
     }) 
     const newPhoto = new Banner({
         imageURL: result.url,
         public_id: result.public_id,
         name: req.file.filename,
         estado: req.body.estado
     })
     console.log(newPhoto)
     await newPhoto.save()
     await fs.unlink(req.file.path)
     res.redirect('/config')
 }
 catch (err) {
     console.log(err)
 }
})

module.exports = {
 router: router
}