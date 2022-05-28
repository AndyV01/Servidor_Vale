const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const moment = require('moment');
const Users = require('./model/user');
const { Op } = require('sequelize');
const Photo = require('./model/photos');
const Banner = require('./model/banner')
const PhotoHome = require('./model/photoHome')

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.set("view engine", "ejs")

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,POST");
    next();
});
app.post('/api/status', function (req, res, next) {
});

module.exports = app;
const { sequelize } = require("./db")
require('dotenv').config()

const { router: suscribeRouter } = require('./routes/suscribe')
const { router: loginRouter } = require('./routes/login')
const { router: pagoRouter } = require('./routes/pagoMp')
const { router: upRouter } = require('./routes/up')
const { router: deleterRouter } = require('./routes/deleter')
const { router: deleterBannerRouter } = require('./routes/deleterBanner')
const { router: deleterPhotoRouter } = require('./routes/deleterPhoto')
const { router: upBannerRouter } = require('./routes/upBanner')
const { router: upPhotoHomeRouter } = require('./routes/upPHome')

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", async function (req, res){
    const banner = await Banner.findAll()
    const photoHome = await PhotoHome.findAll()
    res.render('index',{banner, photoHome } )
} )
app.get("/conthxxxenido00", function (req, res) {
  res.render("contenido")
})
app.get("/galeria", authenticate, async function (req, res) {  
  const photos = await Photo.findAll()
  res.render("galeria", { photos })
})
app.get("/config", authenticateAdmin, async function (req, res) {
  const photoHome = await PhotoHome.findAll()
  const banner = await Banner.findAll()
  const photos = await Photo.findAll()
  res.render("archivos", { photos, banner, photoHome })
})

function authenticateAdmin(req, res, next) { 
  const token = req.cookies.token 
  if (token) {
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (decoded.email === "valentina@valentinaxxx.com" ) {  // if the user is admin
          next()
        } else {
          res.redirect('/')
        }
      })
}}
//  Middleware de autenticacion de usuarios
function authenticate(req, res, next) {
  const access_token = req.cookies.token
  console.log(access_token)
  if (!access_token) {
    return res.send("no tine acceso");
  }
  jwt.verify(access_token, process.env.SECRET, (err, user) => {
    if (err) {
      res.send("no tine acceso");
    } else {
      next();
    }
  })
}

app.use('/suscribe', suscribeRouter)
app.use('/login', loginRouter)
app.use('/pago', pagoRouter)
app.use('/up', upRouter )
app.use('/upBanner', upBannerRouter)
app.use('/upPHome', upPhotoHomeRouter)
app.use('/config/delete', deleterRouter)
app.use('/config/deleterBanner', deleterBannerRouter)
app.use('/config/deleterPHome', deleterPhotoRouter)

const PORT = 3000

// Test DB connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch((error) => {
    console.log('Error connecting Sequelize:', error);
  });
app.listen ( process.env.PORT || PORT , async () => {
  console.log(`Server listening at port ${PORT}`);
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});