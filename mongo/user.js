const conection= require('./conection')
const {Schema,model} = require('mongoose')

const usuario = new Schema({
    
    username:String,
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true

    },
    profile:String,
    background:String,




})
module.exports = model('users',usuario)