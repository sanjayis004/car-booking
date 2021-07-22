const moment = require('moment')
//var startDate = moment('2013-5-11 8:73:18', 'YYYY-M-DD HH:mm:ss')
//var endDate = moment('2013-5-11 10:73:18', 'YYYY-M-DD HH:mm:ss')
//var secondsDiff = endDate.diff(startDate, 'seconds')
//console.log(secondsDiff)

const config = require(`${__dirname}/../configs/config.json`)
const user_model = require(`${__dirname}/../models/user.js`)


module.exports.add_car = async(data)=>{
	return new Promise(async(resolve, reject)=>{
		try{
			let query = `insert into cars (carLicenseNumber,Manufacturer,Model,base_price,PPH,security_deposit) values(?,?,?,?,?,?) `
			let params = [data.carLicenseNumber,data.Manufacturer,data.Model,data.base_price,data.PPH,data.security_deposit]
			let result = await DB.execquery(query,params)
			console.log("result",result)
			if(result && result.success){
				resolve({
					success:true,
					error:"",
					message:"car Added!",
					data:[]
				})
			}else if(result && !result.success){
				resolve({
					success:false,
					error:result.error,
					message:"car not added",
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


module.exports.get_car = async(data)=>{
	return new Promise(async(resolve, reject)=>{
		try{
			let query = 'select * from cars '
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
					message:"cars found!",
					data:result.res
				})
			}else if(result && !result.success){
				resolve({
					success:false,
					error:result.error,
					message:"cars not found due to error!",
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


module.exports.delete_car = async(data)=>{
	return new Promise(async(resolve, reject)=>{
		try{
			let query = 'delete from cars where carId = ? '
			let params = [data.carId]
			let result = await DB.execquery(query,params)
			console.log("result",result)
			if(result && result.success){
				resolve({
					success:true,
					error:"",
					message:"car deleted!",
					data:[]
				})
			}else if(result && !result.success){
				resolve({
					success:false,
					error:result.error,
					message:"car not deleted",
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

module.exports.update_car = async(data)=>{
	return new Promise(async(resolve, reject)=>{
		try{
			let query = 'update cars set carLicenseNumber = ? , Manufacturer = ? , Model = ?,base_price =? , PPH = ?, security_deposit = ?  where carId = ? '
			let params = [data.carLicenseNumber,data.Manufacturer,data.Model,data.base_price,data.PPH,data.security_deposit,data.carId] 
			let result = await DB.execquery(query,params)
			if(result && result.success){
				resolve({
					success:true,
					error:"",
					message:"Car Updated!",
					data:[]
				})
			}else if(result && !result.success){
				resolve({
					success:false,
					error:result.error,
					message:"car not Updated",
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


module.exports.car_book = async(data)=>{
	// step 1 check if userId is valid
	// step 2 if carId is valid and available
	return new Promise(async(resolve, reject)=>{
		try{
			let check_query = 'select * from cars where carId = ? '
			let check_param  = [data.carId]
			let check_result = await DB.execquery(check_query,check_param)
			if(check_result && check_result.success && check_result.res.length){
				let free_query  = 'select * from bookings where ( fromDateTime between  ? and ?  OR toDateTime between  ? and ? or  ( ? between fromDateTime and toDateTime  and ? between fromDateTime and toDateTime ) ) and carId = ? '
				let free_param = [data.fromDateTime,data.toDateTime,data.fromDateTime,data.toDateTime,data.fromDateTime,data.toDateTime,data.carId]
				let free_result = await DB.execquery(free_query,free_param)
				console.log("free_result",free_result)
				if(free_result && free_result.success && !free_result.res.length){
					let query = `insert into bookings (userId,carId,toDateTime,fromDateTime) values(?,?,?,?) `
					let params = [data.userId,data.carId,data.toDateTime,data.fromDateTime]
					let result = await DB.execquery(query,params)
					console.log("result",result)
					if(result && result.success){
						resolve({
							success:true,
							error:"",
							message:"car booked!",
							data:[]
						})
					}else if(result && !result.success){
						resolve({
							success:false,
							error:result.error,
							message:"car not booked",
							data:[]
						})
					}

				}else{
					resolve({
						success:false,
						error:"",
						data:[],
						message:"car is not available this duration!"
					})
				}

				


			}else {
				resolve({
					success:false,
					error:"no car found",
					data:[],
					message:""
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


module.exports.calculate_price = async(data)=>{
	// step 1 check if userId is valid
	// step 2 if carId is valid and available
	return new Promise(async(resolve, reject)=>{
		try{
			console.log("data",data)
			let query = `select security_deposit,base_price,PPH,(timediff(?,?)/10000) as total_hour, (security_deposit + base_price + (timediff(?,?)/10000) * PPH) as total_price  from cars where carId = ? `
			let params = [data.fromDateTime,data.toDateTime,data.fromDateTime,data.toDateTime,data.carId]
			let result = await DB.execquery(query,params)
			console.log("result",result)
			if(result && result.success){
					resolve({
						success:true,
						error:"",
						message:"price calculated!",
						data:result.res
					})
				
			}else if(result && !result.success){
				resolve({
					success:false,
					error:result.error,
					message:"calculation failed!",
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



module.exports.search_car = async(data)=>{
	// step 1 check if userId is valid
	// step 2 if carId is valid and available
	return new Promise(async(resolve, reject)=>{
		try{
			
				let free_query  = 'select * from cars where carId not in (select carId from bookings where fromDateTime between  ? and ?  OR toDateTime between  ? and ? or  ( ? between fromDateTime and toDateTime  and ? between fromDateTime and toDateTime ) ) '
				let free_param = [data.fromDateTime,data.toDateTime,data.fromDateTime,data.toDateTime,data.fromDateTime,data.toDateTime]
				let free_result = await DB.execquery(free_query,free_param)
				console.log("free_result",free_result)
				if(free_result && free_result.success && free_result.res.length){
						resolve({
							success:true,
							error:"",
							message:"car found!",
							data:free_result.res
						})
					
				}else{
					resolve({
						success:false,
						error:"",
						data:[],
						message:"car is not available this duration!"
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


module.exports.car_bookings = async(data)=>{
	return new Promise(async(resolve, reject)=>{
		try{
			let query = 'select c.carId, b.userId , c.security_deposit,c.base_price,c.PPH,(timediff(b.toDateTime,b.fromDateTime)/10000) as duration, (security_deposit + base_price + (timediff(b.toDateTime,b.fromDateTime)/10000) * PPH) as total_price from bookings b  inner join cars c on b.carId = c.carId where c.carId = ?   '
			query += ' limit ? offset ? '
			let params = [data.carId]
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
