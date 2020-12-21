'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	let {
		user_id,
		article_id
	} = event
	
	//获取user_id user表
	let user = await db.collection('user').doc(user_id).get()
	//获取 user_id这个的thumbs_up_article_ids字段 就是是否点过赞
	let thumbs_up_article_ids = user.data[0].thumbs_up_article_ids
	let thumbs_ids = null
	if(thumbs_up_article_ids.includes(article_id)){
		return {
			code:200,
			msg:'您已经点过赞了'
		}
	}else{
		thumbs_ids = dbCmd.addToSet(article_id)
	}
	await db.collection('user').doc(user_id).update({
		thumbs_up_article_ids:thumbs_ids
	})
	//返回数据给客户端
	return {
		code:200,
		msg:'点赞成功'
	}
};
