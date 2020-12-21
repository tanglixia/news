'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	let {
		user_id,
		article_id
	} = event

	//获取用户表
	let user = await db.collection('user').doc(user_id).get()
		user = user.data[0]
	let list = await db.collection('article')
		.aggregate()
		.addFields({
			// article_likes_ids: userinfo.article_likes_ids,
			// author_likes_ids: userinfo.author_likes_ids,
			// thumbs_up_article_ids: userinfo.thumbs_up_article_ids
			is_author_like:$.in(['$author.id',user.author_likes_ids]),
			is_like:$.in(['$_id',user.article_likes_ids]),
			is_thumbs_up:$.in(['$_id',user.thumbs_up_article_ids])
		})
		.match({
			_id:article_id
		})
		.project({
			commit:0
		})
		.end()

	//返回数据给客户端
	return {
		code:200,
		msg:'详情文章内容请求成功',
		data:list.data[0]
	}
};
