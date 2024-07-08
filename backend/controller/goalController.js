const userModel = require("../model/userModel");
const axios = require("axios");
const bankBackendURL =
  process.env.BANK_URL + "/api/integrate-app/finance-goal-app";

async function sendReserveFundRequestToBank(data) {
  try {
    const bankResponse = await axios.post(
      bankBackendURL + "/reserve-funds-request",
      {
        goalName: data.goal.goalName,
        goalReserveAmount: data.goal.currentAmount,
        goalBankVerificationStatus: data.bankStatus,
        requestType: "reserve-funds",
        applicationName: "finance-goals",
        username: data.username,
      }
    );
    console.log("the bankResponse is: ", bankResponse.data);
  } catch (error) {
    console.log(error);
  }
}

async function sendUpdateReserveFundRequestToBank(data) {
  try {
    const bankResponse = await axios.post(
      bankBackendURL + "/reserve-funds-amount-updated",
      {
        goalName: data.goal.goalName,
        goalMoreReserveAmount: parseFloat(data.amountToUpdate),
        goalBankVerificationStatus: data.bankStatus,
        requestType: "more funds reserved",
        applicationName: "finance-goals",
        username: data.username,
      }
    );
    console.log("update goal from bank : ", bankResponse.data);
    return bankResponse.data;
  } catch (error) {
    console.log(error);
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
      error,
    });
  }

  // if the checkbox is true when submitting the goal form, then send a request to the bank and wait for approval
  if (data.bankStatus === "pending") {
    sendReserveFundRequestToBank(data);
  }
};

// the route for this function  => /api/goal/update-goal (post)
exports.updateGoalControllerFunc = async (req, res) => {
  try {
    const data = req.body;
    console.log(data.amountToUpdate);
    const updatedGoal = await userModel.findOne({
      username: data.username,
    });
    var goalIndex = updatedGoal.goals.findIndex(
      (goal) => goal.goalName === data.oldGoalName
    );
    data.goal = { ...data.goal, bankVerification: data.bankStatus };
    updatedGoal.goals[goalIndex] = data.goal;
    console.log(data.goal);

    var message = "";
    var success = "";

    if (data.bankStatus === "pending" && data.amountToUpdate >= 0) {
      const bankResponse = await sendUpdateReserveFundRequestToBank({
        ...data,
        amountToUpdate: data.goal.currentAmount,
      });
      if (bankResponse.success) {
        await updatedGoal.save();
        success = true;
      } else {
        success = false;
        message = bankResponse.message;
      }
    } else {
      await updatedGoal.save();
      success = true;
      message = "goal details updated, bank request not needed to be sent";
    }

    if (data.bankStatus === "verified" && data.amountToUpdate >= 0) {
      const bankResponse = await sendUpdateReserveFundRequestToBank(data);
      if (bankResponse.success) {
        await updatedGoal.save();
        success = true;
      } else {
        success = false;
        message = bankResponse.message;
      }
    } else {
      await updatedGoal.save();
      success = true;
      message = "goal details updated, bank request not needed to be sent";
    }

    res.json({
      success,
      message,
      updatedGoal
    })

  } catch (error) {
    console.log(error);
  }
};

// only need incoming = username, goalname, and additionalamount
// the route for this function  => /api/goal/update-current-amount (post)
exports.updateCurrentAmountFromCard = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const updatedGoal = await userModel.findOne({
      username: data.username,
    });

    const goal = updatedGoal.goals.find(
      (goal) => goal.goalName === data.oldGoalName
    );
    console.log(typeof goal.currentAmount, typeof data.amountToUpdate);
    goal.currentAmount += parseFloat(data.amountToUpdate);

    if (goal.bankVerification === "verified") {
      const bankResponse = await sendUpdateReserveFundRequestToBank({
        ...data,
        amountToUpdate: data.amountToUpdate,
      });
      var message = "";
      var success = "";
      if (bankResponse.success) {
        await updatedGoal.save();
        success = true;
        message = bankResponse.message;
      } else {
        message = bankResponse.message;
        success = bankResponse.success;
      }
    } else {
      await updatedGoal.save();
      success = true;
      message = "Goal db updated";
    }
    console.log(updatedGoal);
    res.json({
      success,
      message,
      updatedGoal,
    });
  } catch (error) {
    console.log(error);
  }
};

// the route for this function  => /api/goal/delete-goal (post)
// data coming in => { username, goalName, bankVerification, goalAmount (current) }
exports.deleteGoalControllerFunc = async (req, res) => {
  const data = req.body;
  try {
    const deletegoal = await userModel.findOne({ username: data.username });
    const goalIndex = deletegoal.goals.findIndex(
      (goal) => goal.goalName === data.goalName
    );
    deletegoal.goals.splice(goalIndex, 1);
    const responseGoal = deletegoal.goals;
    await deletegoal.save();
    res.json({
      success: true,
      message: "Goal deleted successfully",
      afterDeleteGoal: responseGoal,
    });
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

  if (
    data.bankVerification === "verified" ||
    data.bankVerification === "pending"
  ) {
    try {
      const bankResponse = await axios.post(
        bankBackendURL + "/release-funds-request",
        {
          username: data.username,
          goalName: data.goalName,
          goalAmount: data.goalAmount,
        }
      );
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
