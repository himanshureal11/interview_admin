require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
const { mongoConnect } = require('./mongo_config')
const routes = require('./router/router')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(express.json())


app.use('*', async (req,res,next)=>{
    const request = `${req.method}|${req.originalUrl}|${JSON.stringify(req.body)}`
    console.log(JSON.stringify(request));
    next()
})


app.use('/', routes)

let errorMiddle = (error,req,res,next)=>{
 console.log("error in app",error);
 res.status(400).json({error: {name: 'error', message: error.message}});
}

app.use(errorMiddle);

app.listen(process.env.SERVER_PORT,()=>{
    console.log(`app listening at http://localhost:${process.env.SERVER_PORT}`)
})