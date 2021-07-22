/*We will have a list of cars with the following mandatory details.
carLicenseNumber = KA01EM7070,
Manufacturer - honda,
Model - city,
base-price (Base price for any KM) - Rs500,
PPH (Price per hour) - Rs150,
security deposit - Rs1000
*/
const moment = require('moment')
const config = require(`${__dirname}/../configs/config.json`)
const user_model = require(`${__dirname}/../models/user.js`)
const car_model = require(`${__dirname}/../models/car.js`)
const Joi = require('@hapi/joi')

/*create table cars (carId bigint(10) primary key auto_increment , carLicenseNumber varchar(50) unique ,
Manufacturer varchar(20) ,
Model varchar(20),
base_price bigint(10) ,
PPH bigint(10),
security_deposit bigint(10)
  );
*/
module.exports.add_car = async(req,res)=>{
	const schema = Joi.object().keys({
		body:{
			carLicenseNumber:Joi.string().required(),
			Manufacturer:Joi.string().required(),
			Model:Joi.string().required(),
			base_price:Joi.number().required(),
			PPH:Joi.number().required(),
			security_deposit:Joi.number().required()
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
		const result = await  car_model.add_car(data)
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


module.exports.get_car = async(req,res)=>{
	const schema = Joi.object().keys({
		query:{
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
		const result = await car_model.get_car(data)
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

module.exports.update_car = async(req,res)=>{
	const schema = Joi.object().keys({
		body:{
			carId:Joi.number().positive().required(),
			carLicenseNumber:Joi.string().required(),
			Manufacturer:Joi.string().required(),
			Model:Joi.string().required(),
			base_price:Joi.number().required(),
			PPH:Joi.number().required(),
			security_deposit:Joi.number().required()
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
		const result = await  car_model.update_car(data)
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




module.exports.delete_car = async(req,res)=>{
	const schema = Joi.object().keys({
		body:{
			carId:Joi.number().positive().required()
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
		const result = await  car_model.delete_car(data)
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
				message:"car not deleted!",
				data:[]
			})

		}
		

	}
	

}


module.exports.search_car = async(req,res)=>{
	const schema = Joi.object().keys({
		body:{
			fromDateTime:Joi.string().required(),
			toDateTime:Joi.string().required(),
			filter:Joi.object().optional(),
			limit:Joi.number().positive().optional(),
			offset:Joi.number().positive().optional()
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
		data.toDateTime = new Date(data.toDateTime)
		data.fromDateTime = new Date(data.fromDateTime)
		data.limit  = data.limit != undefined ? parseInt(data.limit) : 10
		data.offset = data.offset != undefined ? parseInt(data.offset) : 0
		const result = await car_model.search_car(data)
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

module.exports.calculate_price = async(req,res)=>{
	const schema = Joi.object().keys({
		query:{
			fromDateTime:Joi.string().required(),
			toDateTime:Joi.string().required(),
			carId:Joi.number().positive().required()
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
		data.toDateTime = new Date(data.toDateTime)
		data.fromDateTime = new Date(data.fromDateTime)
		const result = await car_model.calculate_price(data)
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

module.exports.car_book = async(req,res)=>{
	const schema = Joi.object().keys({
		body:{
			fromDateTime:Joi.string().required(),
			toDateTime:Joi.string().required(),
			carId:Joi.number().positive().required(),
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
		data.toDateTime = new Date(data.toDateTime)
		data.fromDateTime = new Date(data.fromDateTime)
		const result = await car_model.car_book(data)
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





module.exports.car_bookings = async(req,res)=>{
	const schema = Joi.object().keys({
		query:{
			carId:Joi.number().positive().required(),
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
		const result = await  car_model.car_bookings(data)
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
