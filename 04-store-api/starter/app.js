require("dotenv").config()
require('express-async-errors')

// async error



const express = require("express")
const app = express()

const connectDB = require("./db/connect")

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')
const productsRouter = require("./routes/products")

// middleware
app.use(express.json())

// routes
app.get("/", (req,res)=>{
    res.send("<h1> Store Api </h1> <a href ='/api/vi/products'> products route </a>")
})

app.use("/api/v1/products", productsRouter)

// products route

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 5000

const start  = async () =>{
    try {
        // connect DB
        await connectDB("mongodb://localhost:27017/test")
        app.listen(port, console.log(`Server is listening port ${port}....`))
    } catch (error) {
        console.log(error);
    }
}

start()