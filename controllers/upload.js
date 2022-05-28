const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }      
})
   console.log(storage)
const upload = multer({ storage: storage,
    limits: { fileSize: 100000000 },
})

 
exports.upload = upload.single('file'); 