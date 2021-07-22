
const config = require(`${__dirname}/../configs/config.json`)
const user_model = require(`${__dirname}/../models/user.js`)
const Joi = require('@hapi/joi')

module.exports.create_user = async(data)=>{
	return new Promise(async(resolve, reject)=>{
		try{
			let query = 'insert into users (name,mobile) values(?,?) '
			let params = [data.name,data.mobile]
			let result = await DB.execquery(query,params)
			console.log("result",result)
			if(result && result.success){
				resolve({
					success:true,
					error:"",
					message:"User Added!",
					data:[]
				})
			}else if(result && !result.success){
				resolve({
					success:false,
					error:result.error,
					message:"user not added",
					data:[]
				})
			}

		}catch(e){
			resolve({
				success:false,
				error:"exception",
				message:"",
				data:[]
			})

		}

	})
}


module.exports.get_user = async(data)=>{
	return new Promise(async(resolve, reject)=>{
		try{
			let query = 'select * from users '
			query += ' limit ? offset ? '
			let params = []
			params.push(data.limit)
			params.push(data.offset)
			console.log("query",query)
			console.log("params",params)
			let result = await DB.execquery(query,params)
			console.log("result",result)
			if(result && result.success){
				resolve({
					success:true,
					error:"",
					message:"Users found!",
					data:result.res
				})
			}else if(result && !result.success){
				resolve({
					success:false,
					error:result.error,
					message:"users not found due to error!",
					data:[]
				})
			}

		}catch(e){
			resolve({
				success:false,
				error:"exception",
				message:"",
				data:[]
			})

		}

	})


}


module.exports.delete_user = async(data)=>{
	return new Promise(async(resolve, reject)=>{
		try{
			let query = 'delete from users where userId = ? '
			let params = [data.userId]
			let result = await DB.execquery(query,params)
			console.log("result",result)
			if(result && result.success){
				resolve({
					success:true,
					error:"",
					message:"User deleted!",
					data:[]
				})
			}else if(result && !result.success){
				resolve({
					success:false,
					error:result.error,
					message:"user not deleted",
					data:[]
				})
			}

		}catch(e){
			resolve({
				success:false,
				error:"exception",
				message:"",
				data:[]
			})

		}

	})

}

module.exports.update_user = async(data)=>{
	return new Promise(async(resolve, reject)=>{
		try{
			let query = 'update users set name = ? , mobile = ?  where userId = ?  '
			let params = [data.name,data.mobile,data.userId]
			let result = await DB.execquery(query,params)
			if(result && result.success){
				resolve({
					success:true,
					error:"",
					message:"User Updated!",
					data:[]
				})
			}else if(result && !result.success){
				resolve({
					success:false,
					error:result.error,
					message:"user not Updated",
					data:[]
				})
			}

		}catch(e){
			resolve({
				success:false,
				error:"exception",
				message:"",
				data:[]
			})

		}

	})
}


module.exports.user_bookings = async(data)=>{
	return new Promise(async(resolve, reject)=>{
		try{
			let query = 'select b.userId , c.security_deposit,c.base_price,c.PPH,(timediff(b.toDateTime,b.fromDateTime)/10000) as duration, (security_deposit + base_price + (timediff(b.toDateTime,b.fromDateTime)/10000) * PPH) as total_price from bookings b  inner join cars c on b.carId = c.carId where b.userId = ?   '
			query += ' limit ? offset ? '
			let params = [data.userId]
			params.push(data.limit)
			params.push(data.offset)
			console.log("query",query)
			console.log("params",params)
			let result = await DB.execquery(query,params)
			console.log("result",result)
			if(result && result.success){
				resolve({
					success:true,
					error:"",
					message:"list found!",
					data:result.res
				})
			}else if(result && !result.success){
				resolve({
					success:false,
					error:result.error,
					message:"list not found due to error!",
					data:[]
				})
			}

		}catch(e){
			resolve({
				success:false,
				error:"exception",
				message:"",
				data:[]
			})

		}

	})

}