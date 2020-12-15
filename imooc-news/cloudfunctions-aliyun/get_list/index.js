'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate//聚合操作符
exports.main = async (event, context) => {
	let {
		name,
		page=1,
		pageSize=10,
		user_id
	} = event
	let matchObj = {}
	if (name !== '全部') {
		matchObj = {
			classify: name,
		}
	}
	let userinfo = await db.collection('user').doc(user_id).get()
	let article_likes_ids = userinfo.data[0].article_likes_ids
	let article = await db.collection('article')
		.aggregate() //获取数据库集合的聚合操作实例 
		.match(matchObj) //根据条件过滤文档，并且把符合条件的文档传递给下一个流水线阶段。
		//追加字段
		.addFields({
			//会返回true 或者 false
			/*
			*$.in表示当前某一个数组中是否包含某个字段。
			* 接收一个数据，
			* 第一项 '$_id' 表示当前这里面的一个id字段，
			* 第二项 要在哪个数组中找这个id是否存在
			*/
			is_like:$.in(['$_id',article_likes_ids])
		})
		.project({
			content: false
		})
		.skip(pageSize*(page-1))
		.limit(pageSize)
		.end()

	// let article = await db.collection('article')
	// .field({
	// 	//默认为true 返回整体内容 false 是不返回
	// 	content:false
	// }).get()
	//返回数据给客户端
	return {
		code: 200,
		msg: 'article数据请求成功',
		data: article.data
	}
};
