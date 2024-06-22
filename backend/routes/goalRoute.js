const express = require('express')
const { createGoalControllerFunc, updateGoalControllerFunc, deleteGoalControllerFunc, fetchGoalsControllerFunc, fetchGoalById } = require('../controller/goalController')
const router = express.Router()

// base path => /api/goal

router.post("/create-goal", createGoalControllerFunc)
router.post("/update-goal", updateGoalControllerFunc)
router.post("/delete-goal", deleteGoalControllerFunc)

router.get("/fetch-goals/:username", fetchGoalsControllerFunc)
router.get("/get-goal/:goalName", fetchGoalById)

module.exports = router