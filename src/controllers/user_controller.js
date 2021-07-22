
const config = require(`${__dirname}/../configs/config.json`)
const user_model = require(`${__dirname}/../models/user.js`)
const Joi = require('@hapi/joi')



module.exports.create_user = async(req,res)=>{
	const schema = Joi.object().keys({
		body:{
			name:Joi.string().required(),
			mobile:Joi.string().required()
		}
	})
	let request = {body:req.body}
	let joi_result = schema.validate(request)
	let error = joi_result.error
	if(error){
		res.status(400).send({
			success:false,
			error:error.details[0].message,
			message:"Invalid request",
			data:[]
		})

	}else{
		let data = req.body
		const result = await  user_model.create_user(data)
		if(result != undefined){
			res.json({
				success:result.success,
				error:result.error,
				message:result.message,
				data:result.data
			})
		}else if(result == undefined){
			res.json({
				success:false,
				error:"",
				message:"",
				data:[]
			})

		}
		

	}
	
	

}


module.exports.get_user = async(req,res)=>{
	const schema = Joi.object().keys({
		query:{
			status:Joi.number().positive().optional(),
			limit:Joi.number().positive().optional(),
			offset:Joi.number().positive().optional()
		}
	})
	let request = {query:req.query}
	let joi_result = schema.validate(request)
	let error = joi_result.error
	if(error){
		res.status(400).send({
			success:false,
			error:error.details[0].message,
			message:"Invalid request",
			data:[]
		})

	}else{
		let data = req.query
		data.limit  = data.limit != undefined ? parseInt(data.limit) : 10
		data.offset = data.offset != undefined ? parseInt(data.offset) : 0
		const result = await  user_model.get_user(data)
		if(result != undefined){
			res.json({
				success:result.success,
				error:result.error,
				message:result.message,
				data:result.data
			})
		}else if(result == undefined){
			res.json({
				success:false,
				error:"",
				message:"",
				data:[]
			})

		}
		

	}


}

module.exports.update_user = async(req,res)=>{
	const schema = Joi.object().keys({
		body:{
			userId:Joi.number().positive().required(),
			name:Joi.string().required(),
			mobile:Joi.string().required()
		}
	})
	let request = {body:req.body}
	let joi_result = schema.validate(request)
	let error = joi_result.error
	if(error){
		res.status(400).send({
			success:false,
			error:error.details[0].message,
			message:"Invalid request",
			data:[]
		})

	}else{
		let data = req.body
		const result = await  user_model.update_user(data)
		if(result != undefined){
			res.json({
				success:result.success,
				error:result.error,
				message:result.message,
				data:result.data
			})
		}else if(result == undefined){
			res.json({
				success:false,
				error:"",
				message:"",
				data:[]
			})

		}
		

	}
	
	

}




module.exports.delete_user = async(req,res)=>{
	const schema = Joi.object().keys({
		body:{
			userId:Joi.number().positive().required()
		}
	})
	let request = {body:req.body}
	let joi_result = schema.validate(request)
	let error = joi_result.error
	if(error){
		res.status(400).send({
			success:false,
			error:error.details[0].message,
			message:"Invalid request",
			data:[]
		})

	}else{
		let data = req.body
		const result = await  user_model.delete_user(data)
		if(result != undefined){
			res.json({
				success:result.success,
				error:result.error,
				message:result.message,
				data:result.data
			})
		}else if(result == undefined){
			res.json({
				success:false,
				error:"error",
				message:"user not deleted!",
				data:[]
			})

		}
		
	}
	
}


module.exports.user_bookings = async(req,res)=>{
	const schema = Joi.object().keys({
		query:{
			userId:Joi.number().positive().required(),
			limit:Joi.number().positive().optional(),
			offset:Joi.number().positive().optional()
		}
	})
	let request = {query:req.query}
	let joi_result = schema.validate(request)
	let error = joi_result.error
	if(error){
		res.status(400).send({
			success:false,
			error:error.details[0].message,
			message:"Invalid request",
			data:[]
		})

	}else{
		let data = req.query
		data.limit  = data.limit != undefined ? parseInt(data.limit) : 100
		data.offset = data.offset != undefined ? parseInt(data.offset) : 0
		const result = await  user_model.user_bookings(data)
		if(result != undefined){
			res.json({
				success:result.success,
				error:result.error,
				message:result.message,
				data:result.data
			})
		}else if(result == undefined){
			res.json({
				success:false,
				error:"",
				message:"",
				data:[]
			})

		}
		

	}


}
