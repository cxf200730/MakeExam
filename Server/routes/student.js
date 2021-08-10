const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const { getStudent, upAnswer } = require('../service/studentServer.js')

router.get('/', getStudent)

router.post('/up', upAnswer)

module.exports = router 