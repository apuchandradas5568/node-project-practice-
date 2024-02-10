require('dotenv').config()

const connectDB = require('./db/connect')

const Product = require('./models/product')

const jsonProducts = require('./products.json')

const start = async () =>{
    try {
        await connectDB("mongodb://localhost:27017/test")
        await Product.deleteMany();
        await Product.create(jsonProducts)
        console.log("Success!!!");
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)

    }
}

start()