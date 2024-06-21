const userModel = require("../model/userModel");
const axios = require("axios");
const url = process.env.BANK_URL + "/integration/fin-goal/reserve-funds";

exports.createGoal = async (req, res) => {
  var data = req.body;
  try {
    if (data.bankStatus === "pending") {
      axios.post(url, {
        ...data.goal,
        requestType: "reserve-funds",
        appName: "finance-goals",
        username: data.username
      });
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
    res.json(error);
  }
};

exports.updateGoal = async (req, res) => {
  const updateUserGoal = await userModel.findOne({
    username: req.body.username,
  });
  var goalIndex = updateUserGoal.goals.findIndex(
    (goal) => goal.goalName === req.body.oldGoalName
  );
  req.body.goal = { ...req.body.goal, bankVerification: req.body.bankStatus };
  updateUserGoal.goals[goalIndex] = req.body.goal;
  console.log(req.body.goal);
  await updateUserGoal.save();
  res.json({
    success: true,
  });
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

exports.deleteGoal = async (req, res) => {
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
