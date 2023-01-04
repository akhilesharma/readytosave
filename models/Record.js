const mongoose = require("mongoose")

const RecordSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    salary: {
        type: Number,
        default:0
    },
    dsg: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String,
    }
}) 

const Record =  mongoose.model("Record", RecordSchema)

module.exports=Record