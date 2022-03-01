const  conection = require('./conection')
const {Schema,model}= require('mongoose');



const nfsts= new Schema({
    owner:{
        type:String,
        required:true
    } ,
    url:{
        type:String,
        required:true
    }

})

const Modelo = model('nft',nfsts)
module.exports= Modelo
