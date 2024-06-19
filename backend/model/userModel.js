const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  goalName: { type: String, required: true },
  goalDescription: { type: String },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  goalTags: { type: [String] },
  goalPriority: { type: String },
  bankVerification: { type: String }
});

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    goals: [goalSchema],
  },
  {
    collection: "userData",
  }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
