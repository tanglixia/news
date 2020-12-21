'use strict';
const db = uniCloud.database()
const dbCmd = db.command

exports.main = async (event, context) => {
	let {
		user_id,
		article_id,
		content
	} = event
	let user = await db.collection('user').doc(user_id).get()
	let userinfo  = user.data[0]
	
	let commentObj = {
		comment_id: genID(5), //评论id
		comment_content:content,//评论内容
		create_time:new Date().getTime(),//评论时间
		author:{
			author_id:userinfo._id, //作者id
			author_name:userinfo.author_name,//作者名称
			avator:userinfo.avator,//作者头像
			professional:userinfo.professional //专业
		},
		replays:[]  //回复
	}
	
	await db.collection('article').doc(article_id).update({
		comments:dbCmd.unshift(commentObj)
	})
	
	
	return {
		code:200,
		msg:'数据更新成功'
	}
};

function genID(length) {
	return Number(Math.random().toString().substr(3,length) +Date.now()).toString(36)
}