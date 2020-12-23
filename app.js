
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000
const mongoose = require("mongoose")
const {MONGOURI} = require('./config/keys')
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config()

mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
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
app.use(cors())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

if(process.env.NODE_ENV === "production"){
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname+'client/build/index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("server is running on,PORT",PORT)
})
