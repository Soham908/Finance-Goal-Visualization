const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
require('dotenv').config()
const userRoute = require('./routes/authRoute')
const goalRoute = require('./routes/goalRoute')
const bankResponseRoute = require('./routes/bankResponseRoute')

mongoose.connect(process.env.MONGO_URL, {
    dbName: "finance-goals"
})
.then(() => {
    console.log("database connected successfully !");
})
.catch((error) => {
    console.log(error);
})

app.use(cors())
app.use(express.json())

app.use("/api/auth", userRoute)
app.use("/api/goal", goalRoute)
app.use("/api/bank", bankResponseRoute)

app.use("/", (req, res) => {
    res.json({
        message: "You have reached the backend of the Finance Goal application",
        anotherMessage: "In some time i will post the API documentation over here, about all the routes"
    })
})

app.listen(process.env.PORT, () => {
    console.log("server started");
})
