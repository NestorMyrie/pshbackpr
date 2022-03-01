const express = require("express");
const Route = express.Router();
const User = require("../mongo/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const AuthVerify = require('./authVerification/Authverify')



//read
Route.get("/", AuthVerify, (req, res) => {
  User.find().then((e) => res.send(e));
});


//create
Route.post("/register", async (req, res) => {
  const { email, password, username, profile, background } = req.body;

  User.findOne({ email }).then((e) => {
    if (e) {
      res.status(500).json({ error: 500, msg: "El correo ya fue usado" });
    } else {
      const salts = bcrypt.genSaltSync(10);
      const encryptPass = bcrypt.hashSync(password, salts);
      const register = new User({
        email,
        username,
        password: encryptPass,
        profile,
        background,
      });

      register
        .save()
        .then(() => res.json({ status: 200, msg: "Register Complete" }))
        .catch(() => res.json({ error: 400, msg: "Error al Registrarte" }));
    }
  });

 
  // const compare = bcrypt.compareSync(req.body.pass,pass)
});

//login

Route.post('/login',(req,res) => {
  const {email,password}= req.body
  User.findOne({email}).then(e=>{
    if(!e){
      return res.json({error:400,msg:'Email o Contraseña incorrecto'})
    }

    const comparePass = bcrypt.compareSync(password,e.password)
  
    if(comparePass){

      const token =jwt.sign({_id:e._id},'secrete',{expiresIn:'24h'})
      return res.json({status:'ok',mgs:token})
   
    }else{
      return res.json({error:400,mgs:"Email o Password Incorrecto"})
      
    }



  })
  
   
});


module.exports = Route;
