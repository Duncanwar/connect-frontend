
const express = require('express');
const app = express();
const PORT = 5000
const mongoose = require("mongoose")
const {MONGOURI} = require('./keys')

require('./models/user')

app.use()

mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected',()=>{
    console.log("Connected to mongo yeah")
})
mongoose.connection.on('error',(err)=>{
    console.log("err",err)
})
app.listen(PORT,()=>{
    console.log("server is running on,PORT")
})