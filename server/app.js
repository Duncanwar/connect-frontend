
const express = require('express');
const app = express();
const PORT = 5000
const mongoose = require("mongoose")
const {MONGOURI} = require('./config/keys')
const bodyParser = require('body-parser');

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

require('./models/user')
require('./models/post')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

app.listen(PORT,()=>{
    console.log("server is running on,PORT",PORT)
})