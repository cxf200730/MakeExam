const db = require('../config/db.js')

class teacherModel {
	//查找所有
	findAll(){
		return db.query( 'select * from teacher ', [])
	}
	//学生查找指定试卷
	doExam(query){
		const teacher_phone = query.phone
		const examindex = query.index
		const sql = "select * from exam where teacher_phone = '" + teacher_phone + "' and examindex = '" + examindex + "'"
		return db.query( sql, [])
	}
	//查找某份试卷所有题目
	getExam(body){
		const teacher_phone = body.teacher_phone
		const examindex = body.examindex
		const sql = "select * from exam where teacher_phone = '" + teacher_phone + "' and examindex = '" + examindex + "'"
		return db.query( sql, [])
	}
	//统计提交情况
	getResult(body){
		const teacher_phone = body.teacher_phone
		const examindex = body.examindex

		const sql = "select * from student where teacher_phone = '" + teacher_phone + "' and examindex = '" + examindex + "'"
		return db.query( sql, [])
	}
	//添加老师(注册)
	addTeacher(body){
		const sql = 
		"insert into teacher(name,phone,password,totalexam) values ('"
		+ body.name + "','" + body.phone + "','" + body.password + "','" + body.totalexam + "')"
		return db.query( sql, [])
	}

	//添加试卷
	addExam(body){
		const phone = body.phone
		const sql = "UPDATE teacher SET totalexam = totalexam + 1 WHERE phone = '" + phone + "'"
		return db.query( sql, [])
	}

	//添加题目
	addTopic(body){
		var examtitle = body.examtitle;
		var teacher_phone = body.teacher_phone;
		var examindex = body.examindex;
		var ismust = body.ismust;
		var imgsrc = body.imgsrc;
		var score = body.score;
		var optionnum = body.optionnum;
		var answer = body.answer;
		const sql ="insert into exam(examtitle,teacher_phone,examindex,ismust,imgsrc,score,optionnum,answer)VALUES('" + examtitle + "','" + teacher_phone + "','"
		+ examindex + "','"+ ismust + "','"+ imgsrc + "','"+ score + "','"+ optionnum + "','"+ answer + "')"
		console.log(sql)
		return db.query( sql, [body])
	}
	//登录
	Login(body){
		const sql = "select * from teacher where phone = '" + body.phone + "' and password = '" + body.password + "'"
		return db.query( sql, [])
	}

	//获取自己拥有的试卷
	getMyExam(body){
		const sql = "select * from teacher left join exam on teacher.phone = exam.teacher_phone where phone = '" + body.phone + "'"
		
		return db.query( sql, [])
	}

}

module.exports = new teacherModel()