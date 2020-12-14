'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let {
		name
	}=event
	let matchObj = {}
	if(name == '全部'){
		
	}else{
		matchObj = {
			
			classify:name,
		}
	}
	let article = await db.collection('article')
	.aggregate()//获取数据库集合的聚合操作实例 
	.match(matchObj) //根据条件过滤文档，并且把符合条件的文档传递给下一个流水线阶段。
	 .project({
		 content:false
	 })
	 .end()
	 
	// let article = await db.collection('article')
	// .field({
	// 	//默认为true 返回整体内容 false 是不返回
	// 	content:false
	// }).get()
	//返回数据给客户端
	return {
		code:200,
		msg:'article数据请求成功',
		data:article.data
	}
};
