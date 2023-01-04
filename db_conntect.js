const mongoose=require("mongoose")

mongoose.connect(process.env.dbpassword)
    .then(() => {
    console.log("database is connected");
    })
    .catch(() => {
    console.log("database connection failed");
})
