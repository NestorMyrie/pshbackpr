const express = require("express");
const router = express.Router();
const AuthVerify = require("./authVerification/Authverify");
const Nfts = require("../mongo/nfts");
const verify = require("./authVerification/DomainVerify");

//read

router.get("/", AuthVerify, (req, res) => {
  Nfts.find({ owner: req.user }).then((e) => res.send(e));
});

//create NFTS
router.post("/create", AuthVerify, (req, res) => {
  const { url } = req.body;

  if (!url) return res.json({ error: "url invalido" });
  const create = new Nfts({
    owner: req.user,
    url: url,
  });

  create
    .save()
    .then((e) => res.json({ status: "OK", msg: "NFT SAVE" }))
    .catch((e) => res.json({ error: "SERVER ERROR" }));
});
//delete NFT
router.delete("/delete", verify, AuthVerify, (req, res) => {
  const user = req.user;
  const { id_element } = req.body;

  Nfts.findOne({ _id: id_element })
    .then((element) => {
      if (!element) {
        return res.json({ error: "Forbidden" });
      }
      if (element.owner == user) {
       Nfts.findByIdAndDelete(id_element,(err,docs) => {
         if(err){
          return res.json({error:'Try Again'})
         }else{
return res.json({status:'OK',docs})
         }
         
       })
      } else {
        return res.json({ error: "NOT FOUND" });
      }
    })
    .catch((e) => res.json({ error: "NOT FOUND" }));
});

//update

router.put('/update',AuthVerify,(req,res) => {
  
  const {id_element,newLink}= req.body

  Nfts.findOne({_id:id_element}).then(element=>{

if(element && element.owner == req.user){
  Nfts.findOneAndUpdate({_id:id_element},{$set:{url:newLink}},{returnDocument:true}).then(e=>res.json({Status:'OK'})).catch(e=>res.json({status:'Error',e}))
}else{
  res.status(400).json({error:"Forbidden"})
}

  })
})
module.exports = router;
