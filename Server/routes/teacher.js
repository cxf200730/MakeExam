const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const { getAllTeacher, addTeacher,Login, getMyExam, addExam, addTopic, getExam, doExam, getResult } = require('../service/teacherServer.js')

// 获得所有老师信息
router.get('/', getAllTeacher)

// 获取自己已制作的试卷
router.post('/getmyexam', getMyExam)

// 添加一份空白试卷
router.post('/addexam', addExam)

// 给exam表中添加题目数据
router.post('/addtopic', addTopic)

// 获取某份试卷所有题目
router.post('/getexam', getExam)

// 学生获得某份试卷的所有题目
router.get('/doexam', doExam)

// 查看学生完成情况
router.post('/getresult', getResult)

// 添加老师（注册功能）
router.post('/add', addTeacher)

// 登录功能
router.post('/login', Login)

module.exports = router 