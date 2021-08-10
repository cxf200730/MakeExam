const studentModel = require('../model/studentModel.js')
class studentServer {
	
	async getStudent( req, res, next){
		const { results } = await studentModel.findAll()
		res.json({ err_code: 0,  message: results})
	}
	
	async upAnswer( req, res, next){
		const body = req.body;
		const { results } = await studentModel.upAnswer(body)
		res.json({ err_code: 0,  message: results})
	}

	
}

module.exports = new studentServer()