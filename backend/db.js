
const mongoose = require("mongoose")
const dotenv = require('dotenv');

dotenv.config();


const url = "mongodb+srv://ns8830603789:04vIYvNICWBHnxoE@cluster0.3hie6uy.mongodb.net/?retryWrites=true&w=majority"

const connectToMongoDb =()=> {
    mongoose.connect(url, { useNewUrlParser: true }).then(() => console.log("connection successfull...."))
.catch((err) => console.log(err));
}

//exporting mongose
module.exports = connectToMongoDb;