<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.$api.get_user({
				user_id:'5fd4734f974b69000122157b'
			}).then((res)=>{
				console.log('app',res);
				let data = res.data[0]
				this.$store.dispatch('set_userinfo',data)
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("/components/gaoyia-parse/parse.css");
</style>
