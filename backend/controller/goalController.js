const userModel = require("../model/userModel");
const axios = require("axios");
const url = process.env.BANK_URL + "/integration/fin-goal/reserve-funds";

exports.createGoal = async (req, res) => {
  var data = req.body;
  var bankStatus = "required";
  try {
    if (data.checked) {
      bankStatus = "pending";
      data = {...data, requestType: "reserve-funds", appName: 'finance-goals'}
      axios.post(url, data);
    }
  } catch (error) {
    console.log(error);
  }

  try {
    const newGoal = await userModel.findOneAndUpdate(
      { username: req.body.username },
      {
        $push: {
          goals: {
            goalName: data.goalName,
            goalDescription: data.goalDescription,
            targetAmount: data.targetAmount,
            currentAmount: data.currentAmount,
            goalTags: data.goalTag,
            goalPriority: data.goalPriority,
            bankVerification: bankStatus,
          },
        },
      },
      { new: true }
    );

    res.json({
        success: true,
        newGoal
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

exports.fetchGoals = async (req, res) => {
  try {
    const goalList = await userModel.findOne(
      { username: req.params.username },
      { goals: 1 }
    );
    res.json({
      success: true,
      goalList,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error,
    });
  }
};

exports.fetchGoalById = (req, res) => {};
