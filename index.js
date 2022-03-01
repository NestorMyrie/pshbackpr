const express = require('express')
const app = express()
const cors = require('cors')
const conection = require('./mongo/conection')
const auth = require('./routes/auth')
const nfts = require('./routes/nfts')
const upload= require('./routes/beahero')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use('/auth',auth)
app.use('/nfts',nfts)
express.static(__dirname +'/public')
app.use('/upload',upload)
app.get('/',(req,res) => {
  res.send('hi')
})

app.listen(9090,() => {
  console.log('open in port 9090')
})