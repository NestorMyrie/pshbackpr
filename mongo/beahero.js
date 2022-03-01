const conection= require('./conection')
const {Schema,model}= require('mongoose')


const infoHero= new Schema({
    owner:{
        type:String,
        required:true
    },
    direction:{
        type:String,
        required:true
    },
    date:String,
    active:{
        type:Boolean,
        default:true
    }
})