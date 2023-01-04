const mongoose = require("mongoose")

const RecordSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true,
        unique:true
    },
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