const express = require('express')
const { createGoalControllerFunc, updateGoalControllerFunc, deleteGoalControllerFunc, fetchGoalsControllerFunc, fetchGoalById, updateCurrentAmountFromCard } = require('../controller/goalController')
const router = express.Router()

// base path => /api/goal

router.post("/create-goal", createGoalControllerFunc)
router.post("/update-goal", updateGoalControllerFunc)
router.post("/update-current-amount", updateCurrentAmountFromCard)
router.post("/delete-goal", deleteGoalControllerFunc)

router.get("/fetch-goals/:username", fetchGoalsControllerFunc)
router.get("/get-goal/:goalName", fetchGoalById)

module.exports = router