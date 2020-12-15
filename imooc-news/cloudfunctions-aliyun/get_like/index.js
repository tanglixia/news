'use strict';
const db = uniCloud.database()
const dbFun = db.command
exports.main = async (event, context) => {
	let {
		user_id,
		article_id 
	} = event
	//获取user表中指定_id的数据
	let likeList = await db.collection('user').doc(user_id).get()
	//获取到指定_id中的article_likes_ids并用一个变量将其保存
	let article_id_ids = likeList.data[0].article_likes_ids
	
	let dbFunId = null
	//判断article_likes_ids数组中是否有article_id，article_id是否存在 存在则删除，不存在则添加
	if(article_id_ids.includes(article_id)){
		dbFunId = dbFun.pull(article_id)
	}else{
		dbFunId = dbFun.addToSet(article_id)
	}
	//更新user表中指定id的article_likes_ids字段
	await db.collection('user').doc(user_id).update({
		article_likes_ids:dbFunId
	})
	//返回数据给客户端
	return {
		code:200,
		msg:'请求数据成功'
	}
};
