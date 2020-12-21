'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	let {
		user_id
	} = event
	
	let userinfo = await db.collection('user').doc(user_id).get()
	userinfo = userinfo.data[0]
	
	let lists = await db.collection('article')
	.aggregate()
	.addFields({
		is_like:$.in(['$_id',userinfo.article_likes_ids])
	})
	.project({
		content:0
	})
	.match({
		is_like:true
	})
	.end()
	//返回数据给客户端
	return {
		code:200,
		msg:'更新数据成功',
		data:lists.data
	}
};
