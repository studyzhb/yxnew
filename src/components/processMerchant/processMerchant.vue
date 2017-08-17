<template>
	<section style="width:100%">
		暂无
	</section>
</template>

<script type="text/ecmascript-6">
	import NProgress from 'nprogress'
	import { getShopUserLog, getMerchantProcess } from 'api/api'
	import { dateFormat } from 'common/js/dateFormat.js'

  export default {
  	data() {
			return {}
		},
		created() {
			// document.title = '格信商城-商户收入流水'
		},
		mounted() {
			NProgress.start()
			this.getShopUserLogEnv()
		},
		methods: {}
  }
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
  // .deliveryInput
  // 	width: 300px
  // 	margin: 0 auto
	.tipsWrap
		display: block
		text-align: center
		margin-top: 15px
  .tips
  	display: inline-block
  	margin: 0 auto
  	text-align: left
  	line-height: 1.6
  	li
			margin-bottom: 8px
			font-size: 14px
			color: #848282
  	
</style>
