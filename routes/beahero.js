const express= require('express')
const router = express.Router();
const multer = require('multer')

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
      cb(null,'./uploads')
    },
    filename:(req,file,cb) => {
        const ext= file.originalname.split('.').pop()
        cb(null,`${Date.now()}.${ext}`)
      
    }
})
const upload= multer({storage})
router.post('/',upload.single('file'),(req,res) => {
  res.send({status:'ok'})
})
module.exports=router