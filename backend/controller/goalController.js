const userModel = require("../model/userModel")

exports.createGoal = async (req, res) => {
    const data = req.body
    const newGoal = await userModel.findOneAndUpdate(
        { username: req.body.username }, 
        {
        $push: { 
            goals: {
                goalName: data.goalName,
                goalDescription: data.goalDescription,
                targetAmount: data.targetAmount,
                currentAmount: data.currentAmount,
                goalTags: data.goalTags,
                goalPriority: data.goalPriority
        }}
    },
    { new: true }
)

    res.json(newGoal)
    console.log(newGoal);
}

exports.fetchGoals = async (req, res) => {
    const goalList = await userModel.findOne({username: req.params.username}, {goals: 1})
    res.json(goalList)
}

exports.fetchGoalById = (req, res) => {
    
}

