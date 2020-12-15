export default function $http(options){
	const {
		url,
		data
	} = options
	const dataObj = {
		user_id : '5fd4734f974b69000122157b',
		...data
	}
	return new Promise((reslove,reject)=>{
		uniCloud.callFunction({
			name:url,
			data:dataObj
		}).then((res) =>{
			// console.log('resaa',res)
			if(res.result.code === 200){
				reslove(res.result)
			}else{
				reject(res.result)
			}
		}).catch((err)=>{
			reject(err)
		})
	})
}