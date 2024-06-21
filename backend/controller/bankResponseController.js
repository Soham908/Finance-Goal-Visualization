const userModel = require("../model/userModel");

exports.reserveFundsResponse = async (req, res) => {
    try {
        const { username, goalName, bankStatus } = req.body;
        const reserveFunds = await userModel.findOne({username: req.body.username})

        const goal = reserveFunds.goals.find(goal => goal.goalName === goalName);
        goal.bankVerification = bankStatus

        await reserveFunds.save()
        res.json({
            success: true
        })
    } catch (error) {
        console.log(error);
    }

};
