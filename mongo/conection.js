const mongo = require('mongoose')
mongo.connect('mongodb://localhost:27017/pshpr')

mongo.connection.on('open',() => {
  console.log('conect to database :3')
})