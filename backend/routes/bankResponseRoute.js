const express = require('express')
const { reserveFundsResponse } = require('../controller/bankResponseController')
const router = express.Router()

router.post("/reserve-fund-response", reserveFundsResponse)

module.exports = router