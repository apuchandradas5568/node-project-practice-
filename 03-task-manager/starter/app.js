const express = require("express")
const app = express()
const tasks = require("./routes/tasks")
const connectDB = require("./db/connect")
const notFound = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")
require("dotenv").config()
// middleware
app.use(express.static("./public"))
app.use(express.json())

// routes
app.use("/api/v1/tasks", tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)
/*
// getting all the tasks
app.get('/api/v1/tasks', (req,res) =>{
    
})
// creating a new tasks
app.post('/api/v1/tasks', (req,res) =>{

})
// get single tasks
app.get('/api/v1/tasks/:id', (req,res) =>{

})
// update tasks
app.patch('/api/v1/tasks/:id', (req,res) =>{

})
// delete tasks
app.delete('/api/v1/tasks/:id', (req,res) =>{

})
*/



const port  = process.env.PORT || 5000;
const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`server is listening on ${port}......`))

    }
    catch (error){
        console.log(error);
    }
}

start()