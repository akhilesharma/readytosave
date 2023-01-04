const express = require("express")
const app = express()
const bodyParser = require("body-parser")
var cors = require('cors')
app.use(cors())
app.use(express.json())

const dotenv=require("dotenv")
dotenv.config()

require("./db_conntect")
const Record = require("./models/Record")

app.post("/record", async (req, res) => {
    try {
        const data = Record(req.body)
        await data.save()
        res.send({ result: "Done", message: "record is created...." })
    }
    catch (error) {

        if (error.keyValue) {
            res.status(400).send({ result: "failed", message: "already exist" })
        }
        else if (error.errors.name) {
            res.status(400).send({ result: "failed", message: error.errors.name.message })
        }
        else
            res.status(500).send({ result: "failed", message: "internal server error" })
    }

})

//get api

app.get("/record", async (req, res) => {
    try {
        const data = await Record.find()
        res.send({ result: "Done", data: data })
    }
    catch (error) {
        res.status(500).send({ result: "failed", message: "internal server error" })
    }

})

// api to get paticuler data

app.get("/record/:_id", async (req, res) => {
    try {
        const data = await Record.findOne({ _id: req.params._id })
        if (data) {
            res.status(200).send({ result: "Done", data: data })
        }
        else
            res.status(500).send({ result: "failed", message: 'invalid id' })
    }
    catch (error) {
        res.status(500).send({ result: "failed", message: "internal server error" })
    }

})

//api to update data

app.put("/record/:_id", async (req, res) => {
    try {
        const data = await Record.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name
            data.dsg = req.body.dsg
            data.salary = req.body.salary
            data.city = req.body.city
            data.state = req.body.state
            await data.save()
            res.send({ result: "done", message: "data is updated" })
        }
        else
            res.status(404).send({ result: "failed", message: "invalid id" })
    }
    catch (error) {
        res.status(500).send({ result: "failed", message: "internal server error" })
    }
})

//api to delete data

app.delete("/record/:_id", async (req, res) => {
    try {
        const data = await Record.findOne({ _id: req.params._id })
        if (data) {

            await data.delete()
            res.send({ result: "done", message: "data is deleted" })
        }
        else
            res.status(404).send({ result: "failed", message: "invalid id" })
    }
    catch (error) {
        res.status(500).send({ result: "failed", message: "internal server error" })
    }
})


app.use(express.static('build'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './build/index.html'));
});
let PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Server is Running at PORT ${PORT}`))


// app.post("/search", encoder, async (req, res) => {
//     try {
//         const data = await Employee.find({
//             $or: [
//                 { name: { $regex: `.*${req.body.search}.*`, $options: "i" } },
//                 { dsg: { $regex: `.*${req.body.search}.*`, $options: "i" } },
//                 { city: { $regex: `.*${req.body.search}.*`, $options: "i" } }
//             ]
//         })
//         res.render("index", { "data": data })
//         console.log(data);
//     }
//     catch (error) {
//         console.log(error);
//         res.redirect("/")
//     }
// })