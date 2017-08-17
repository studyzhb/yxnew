<template>
  <div id="app">
  	<transition name="fadeIn">
			<router-view></router-view>
		</transition>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
  	created() {
  		if (window.localStorage.__loginState__) {
  			this.$router.replace('/storeInfo')
  			return
  		}
  		this.$router.replace('/login')
  	}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#app 
  position: absolute
  top: 0px;
  bottom: 0px;
  width: 100%;
  background: #1F2D3D
&.fadeIn-enter-active
  transition: all .36s
&.fadeIn-enter
  transform: translate3d(0, -30px, 0)
  opacity: 0
</style>
