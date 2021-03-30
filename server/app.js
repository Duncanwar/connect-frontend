
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser');
const cors = require('cors')
const {devDb} = require('./config/dbConfig')
const routes = require("./routes/index.route")

devDb();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors())
app.use(routes);
app.get("/",(req,res)=>res.json({message:"done"}))

app.listen(PORT,()=>{
    console.log("server is running on,PORT",PORT)
})
