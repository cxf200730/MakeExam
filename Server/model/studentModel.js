const db = require('../config/db.js')

class studentModel {
	//查找所有
	findAll(){
		return db.query( 'select * from student order by id ASC', [])
	}

    //提交做的试卷
    upAnswer(body){
        const name = body.name
        const code = body.code
        const phone = body.phone
        const index = body.index
        const answer = body.answer
        const sql = 
        "insert into student(name,code,teacher_phone,examindex,answer) values ('"
		+ name + "','" + code + "','" + phone + "','" + index +  "','" + answer +"')"
        return db.query( sql, [])
    }

	
}

module.exports = new studentModel()