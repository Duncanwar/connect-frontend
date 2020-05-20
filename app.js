
const express = require('express');
const app = express();
const PORT = 8000
const mongoose = require("mongoose")
const {MONGOURI} = require('./keys')
const bodyParser = require('body-parser');

require('./models/user')
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(require('./routes/auth'))

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