const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
require('dotenv').config()
const userRoute = require('./routes/userRoute')
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

app.use("/api/userAuth", userRoute)
app.use("/api", goalRoute)
app.use("/api/bank", bankResponseRoute)

app.listen(process.env.PORT, () => {
    console.log("server started");
})
