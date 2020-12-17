'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate

exports.main = async (event, context) => {
	let {
		user_id,
		type
	} = event
	let matchObj = {}
	if(type !== 'all'){
		matchObj = {
			current:true
		}
	}
	//获取用户表
	let user = await db.collection('user').doc(user_id).get()
	//获取到user_id对应的对象
	let userinfo = user.data[0] 
	// let label = await db.collection('label').get()
	let label = await db.collection('label')
	.aggregate()
	.addFields({
		current:$.in(['$_id',$.ifNull([userinfo.label_ids,[]])])
	})
	.match(matchObj)
	.end()
	//返回数据给客户端
	return {
		code:200,
		msg:'获取数据成功',
		data:label.data
	}
};
