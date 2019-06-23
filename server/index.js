const express = require('express'),
 path = require('path'),
 app = express(),
 http = require("http"),
 bodyParser = require("body-parser")

const Server = http.createServer(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('port', process.env.PORT || 3000)


Server.listen(app.get('port'),()=> console.log(`Server listen to connections in port ${app.get('port')}`))