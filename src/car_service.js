
const express = require('express')
const app  = express()
const routes = require(`./routes/index.js`)
const config = require('./configs/config.json')
const bodyParser = require('body-parser')
const db = require('./helpers/mysql.js')
global.DB = db

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/',routes)

app.listen(config.port,()=>{
	console.log("User service running at  port :  ",config.port)
})
