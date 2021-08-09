const teacherModel = require('../model/teacherModel.js')
class teacherServer {
	
	async getAllTeacher( req, res, next){
		const { results } = await teacherModel.findAll()
		res.json({ err_code: 0,  message: results})
	}
	async doExam( req, res, next){
		const query = req.query;
		const { results } = await teacherModel.doExam(query)
		res.json({ err_code: 0,  message: results})
	}

	async getExam( req, res, next){
		const body = req.body;
		const { results } = await teacherModel.getExam(body)
		res.json({ err_code: 0,  message: results})
	}

	async addTeacher( req, res, next){
		const body = req.body;
		const { results } = await teacherModel.addTeacher(body)
		res.json({ err_code: 0,  message: results})
	}

	async addExam( req, res, next){
		const body = req.body;
		const { results } = await teacherModel.addExam(body)
		res.json({ err_code: 0,  message: results})
	}

	async addTopic( req, res, next){
		const body = req.body;
		const { results } = await teacherModel.addTopic(body)
		res.json({ err_code: 0,  message: results})
	}

	async Login( req, res, next){
		const body = req.body;
		const { results } = await teacherModel.Login(body)
		res.json({ err_code: 0,  message: results})
	}

	async getMyExam( req, res, next){
		const body = req.body;
		const { results } = await teacherModel.getMyExam(body)
		res.json({ err_code: 0,  message: results})
	}
	
}

module.exports = new teacherServer()