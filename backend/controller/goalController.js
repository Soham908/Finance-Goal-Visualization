const userModel = require("../model/userModel");
const axios = require("axios");
const bankBackendURL = process.env.BANK_URL + "/api/integrate-app/finance-goal-app/reserve-funds-request";


// the route for this function  => /api/goal/create-goal (post)
exports.createGoalControllerFunc = async (req, res) => {
  var data = req.body;
  console.log(data);
  try {
    const newGoal = await userModel.findOneAndUpdate(
      { username: req.body.username },
      {
        $push: {
          goals: {
            ...data.goal,
            bankVerification: data.bankStatus,
          },
        },
      },
      { new: true }
    );

    res.json({
      success: true,
      newGoal,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error
    });
  }

  // if the checkbox is true when submitting the goal form, then send a request to the bank and wait for approval
  if(data.bankStatus === 'pending'){
    try {
      const bankResponse = await axios.post(bankBackendURL, {
        goalName: data.goal.goalName,
        goalReserveAmount: data.goal.currentAmount,
        goalBankVerificationStatus: data.bankStatus,
        requestType: "reserve-funds",
        applicationName: "finance-goals",
        username: data.username
      })
      console.log("the bankResponse is: ", bankResponse.data);
    } catch (error) {
      console.log(error);
    }
  }
};

// the route for this function  => /api/goal/update-goal (post)
exports.updateGoalControllerFunc = async (req, res) => {
  try {
    const updatedGoal = await userModel.findOne({
      username: req.body.username,
    });
    var goalIndex = updatedGoal.goals.findIndex(
      (goal) => goal.goalName === req.body.oldGoalName
    );
    req.body.goal = { ...req.body.goal, bankVerification: req.body.bankStatus };
    updatedGoal.goals[goalIndex] = req.body.goal;
    console.log(req.body.goal);
    await updatedGoal.save();
    res.json({
      success: true,
      updatedGoal
    });
  } catch (error) {
    console.log(error);
  }

};

// the route for this function  => /api/goal/delete-goal (post)
exports.deleteGoalControllerFunc = async (req, res) => {
  try {
    const deletegoal = await userModel.findOne({ username: req.body.username });
    const goalIndex = deletegoal.goals.findIndex(
      (goal) => goal.goalName === req.body.goalName
    );
    deletegoal.goals.splice(goalIndex, 1);

    await deletegoal.save();
    res.json({ success: true, message: "Goal deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, error });
  }
};

// the route for this function  => /api/goal/fetch-goals (post)
exports.fetchGoalsControllerFunc = async (req, res) => {
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