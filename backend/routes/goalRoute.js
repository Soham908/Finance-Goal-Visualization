const express = require('express')
const { createGoal, fetchGoals, fetchGoalById } = require('../controller/goalController')
const router = express.Router()

router.post("/create-goal", createGoal)
router.get("/get-goals", fetchGoals)
router.get("/get-goal/:goalName", fetchGoalById)

module.exports = router