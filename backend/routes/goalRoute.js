const express = require('express')
const { createGoal, fetchGoals, fetchGoalById, deleteGoal, updateGoal } = require('../controller/goalController')
const router = express.Router()

router.post("/create-goal", createGoal)
router.get("/get-goals/:username", fetchGoals)
router.get("/get-goal/:goalName", fetchGoalById)
router.post("/delete-goal", deleteGoal)
router.post("/update-goal", updateGoal)

module.exports = router