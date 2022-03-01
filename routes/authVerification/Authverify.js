const jwt = require('jsonwebtoken')

const AuthVerify = (req, res, next) => {
  const token = req.get("authorization");
  if (token) {
  
    return jwt.verify(token,'secrete',(err,repl)=>{
      if(err){
        return res.json({error:'Invalid Token'})
      }

     req.user = repl._id
     next()
    })
  } else [res.status(400).json({ error: "No hay token" })];
};

module.exports=AuthVerify