const express = require('express')
const { reserveFundsResponseFromBankControllerFunc } = require('../controller/bankResponseController')
const router = express.Router()

// base path => /api/bank

router.post("/reserve-fund-response", reserveFundsResponseFromBankControllerFunc)

module.exports = router