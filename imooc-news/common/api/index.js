// import {get_label} from './list.js'

// export default {
// 	get_label
// }


//批量导出文件
const requireAPI = require.context(
	//api 目录的相对路径
	'.',
	// 是否查询子目录
	false,
	// 查询文件的一个后缀
	/.js$/
)

let module = {}
console.log(requireAPI.keys());
requireAPI.keys().forEach((key,index)=>{
	if(key === './index.js') return 
	Object.assign(module,requireAPI(key))
})
export default module
