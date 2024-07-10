const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')


const dbConnect = require('./src/db')
const {userRouter} = require('./src/routers/userRouter')
const postRouter = require('./src/routers/postRouter') 

const app = express()

app.use(express.json())
app.use(cors())
app.use('/',userRouter)
app.use('/',postRouter)

dbConnect()

app.get('/',(req,res)=>{
    res.send("Hello Backend API")
}) 

const port = process.env.PORT

app.listen(port,()=>{
    console.log(`Server started in http://localhost:${port}`);
})