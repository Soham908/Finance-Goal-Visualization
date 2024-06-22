const userModel = require("../model/userModel");
const axios = require("axios");
const bankBackendURL = process.env.BANK_URL + "/api/integrate-app/finance-goal-app";

async function sendReserveFundRequestToBank(data){
  if(data.bankStatus === 'pending'){
    try {
      const bankResponse = await axios.post(bankBackendURL + "/reserve-funds-request", {
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
}

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
  sendReserveFundRequestToBank(data)
};

// the route for this function  => /api/goal/update-goal (post)
exports.updateGoalControllerFunc = async (req, res) => {
  
  try {
    const data = req.body
    const updatedGoal = await userModel.findOne({
      username: data.username,
    });
    var goalIndex = updatedGoal.goals.findIndex(
      (goal) => goal.goalName === data.oldGoalName
    );
    data.goal = { ...data.goal, bankVerification: data.bankStatus };
    updatedGoal.goals[goalIndex] = data.goal;
    console.log(data.goal);
    if(data.bankStatus === 'pending')
      await sendReserveFundRequestToBank(data)
    await updatedGoal.save();
    res.json({
      success: true,
      updatedGoal
    });
  } catch (error) {
    console.log(error);
  }

  // only need to call the bank notification stuff first if the bankVerification is pending, or verified
  // if the user changes the goalName, update the currentAmount, 

};

// the route for this function  => /api/goal/delete-goal (post)
// data coming in => { username, goalName, bankVerification }
exports.deleteGoalControllerFunc = async (req, res) => {
  const data = req.body
  try {
    const deletegoal = await userModel.findOne({ username: data.username });
    const goalIndex = deletegoal.goals.findIndex(
      (goal) => goal.goalName === data.goalName
    );
    deletegoal.goals.splice(goalIndex, 1);

    await deletegoal.save();
    res.json({ success: true, message: "Goal deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, error });
  }

  // i have to release the reserved funds once the goal is deleted right
  // how to apporach it, already deleting the goal func is done, now just need to make a call to the bank backend
  // and handle it there, send the goalname and username and tell it to release the funds, 
  // no need to delete the notification, just find the notification and then have the status show goal deleted
  // and send the amount that was reserved, or just take the amount that is present in that database 
  // obj.reservedFunds - noti.notiAmount, boom
  
  if ( data.bankVerification === 'verified' || data.bankVerification === 'pending' ){
    try {
      const bankResponse = await axios.post(bankBackendURL + "/release-funds-request", {
        username: data.username,
        goalName: data.goalName
      })
      console.log(bankResponse);
    } catch (error) {
      console.log(error);
    }
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