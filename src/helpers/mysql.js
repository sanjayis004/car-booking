const config = require(`${__dirname}/../configs/config.json`)['db_config']
const mysql = require(`mysql`)
const conPool  = mysql.createPool(config)
let independent_connection = ''
conPool.getConnection(function(error,connection){
	if(error){
		console.log("Error",error)
	}
	independent_connection = connection
})
const self = module.exports = {
	/*connection: async() => {
		return new Promise((resolve, reject)=>{
			conPool.getConnection(function(error,connection){
				if(error){
					logger.error(error)
				}
				return resolve(connection)
			})
		})
	},
	*/
	execquery: async(query,params=[],single=false)=>{
		return new Promise(async (resolve, reject) => {
			let response = {}
			conPool.query(query,params, function (error, result, fields) {
				if (error){
					console.log("error",error)
					if(error.code == 'ER_DUP_ENTRY'){
						response.success = 0
						response.error = "duplicate error!"
					}else{
						response.success = 0
						response.error = "query or syntax error!"
					}
				}else{

					response.success = 1
					response.res = (single && Boolean(result[0]))?result[0]:result
				}
				return resolve(response)
			})
		})
	}
}