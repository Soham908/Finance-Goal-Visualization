// import { Schema, model } from "mongoose";
const { default: mongoose } = require("mongoose");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
}, {
    collection: "userData"
})

const userModel = mongoose.model("user-model", userSchema)
module.exports = userModel
