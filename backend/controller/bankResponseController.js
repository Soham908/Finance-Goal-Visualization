const userModel = require("../model/userModel");

exports.reserveFundsResponseFromBankControllerFunc = async (req, res) => {
    try {
        const { username, goalName, bankStatus } = req.body;
        const reserveFunds = await userModel.findOne({ username })

        const goal = reserveFunds.goals.find(goal => goal.goalName === goalName);
        goal.bankVerification = bankStatus

        await reserveFunds.save()
        res.json({
            success: true,
            message: "the response from the bank, status: " + bankStatus
        })
    } catch (error) {
        console.log(error);
    }

};
