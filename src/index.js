const express = require('express')
const bodyParser = require('body-parser')
const route = require('./route/route.js')
const app = express()
const mongoose = require('mongoose')
const multer=require('multer') 
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',route);
app.use(multer().any())

mongoose.connect("mongodb://localhost:27017",{
    useNewUrlParser:true
})
.then(()=>console.log("MongoDb connected"))
.catch(err=>console.log(err))


app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});