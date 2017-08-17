<template>
	<div class="menusWrap">
	  <el-menu router class="el-menu-vertical-demo" theme="dark"  v-for="(item, index) in menus"
	  		:default-active="$route.path" 
	  		:unique-opened=true
	  		:key="index">
			<el-menu-item v-if="typeof item.child === 'undefined'"
					:index="item.path+''">
	   		<i class="icon" :class="item.icon"style="padding-right: 6px;"></i>
	      {{ item.title }}
	    </el-menu-item>
	    <el-submenu v-else 
	    		:index="item.path+''">
	      <template slot="title">
	      	<i class="icon" :class="item.icon" style="padding-right: 6px;"></i>
	      	{{ item.title }}
	      </template>
	      <el-menu-item v-for="(child_item, child_index) in item.child" 
	      		:index="child_item.path+''"
	      		:key="child_index">
	      	<i class="icon" :class="child_item.icon"></i>
	      	{{ child_item.title }}
	      </el-menu-item>
	    </el-submenu>
	  </el-menu>
  </div>
</template>

<script type="text/ecmascript-6">
	export default {
		data() {
			return {
				menus: [
					{
						title: '店铺资料',
						path: '/storeInfo',
						icon: 'el-icon-date'
					},
					{
						title: '修改密码',
						path: '/modifyPassword',
						icon: 'el-icon-setting'
					},
					// {
					// 	title: '广告图',
					// 	path: '/advertisingMap',
					// 	icon: 'el-icon-menu'
					// },
					{
						title: '队列管理',
						icon: 'el-icon-menu',
						child: [
							{
								title: '队列资料',
								path: '/queueData'
							},
							{
								title: '产品管理',
								path: '/productManageQueue'
							},
							{
								title: '订单管理',
								path: '/orderManage'
							},
							{
								title: '积分兑换',
								path: '/exchange'
							}
						]
					},
					{
						title: '积分管理',
						icon: 'el-icon-menu',
						child: [
							{
								title: '订单管理',
								path: '/scoreOrderManage'
							}
						]
					},
					{
						title: '会员管理',
						icon: 'el-icon-star-on',
						child: [
							{
								title: '会员列表',
								path: '/memberManage'
							},
							{
								title: '绑定会员',
								path: '/bindUser'
							}
						]
					},
					{
						title: '资金中心',
						icon: 'el-icon-time',
						child: [
							{
								title: '提现审核',
								path: '/cashCheck'
							},
							// {
							// 	title: '退出明细',
							// 	path: '/introInfo'
							// },
							// {
							// 	title: '助推明细',
							// 	path: '/boostInfo'
							// },
							{
								title: '用户交易流水',
								path: '/processUsr'
							},
							// {
							// 	title: '商户收入流水',
							// 	path: '/processMerchant'
							// }
						]
					},
					{
						title: '分润／助推',
						path: '/service',
						icon: 'el-icon-menu'
					},
					{
						title: '订单管理',
						path: '/productManage',
						icon: 'el-icon-document'
					},
					{
						title: '帮助',
						path: '/help',
						icon: 'el-icon-star-off'
					}
				],
				isShowChild: false
			}
		},
		created() {
			// this.$router.push('/employeemanage')
		},
		methods: {
			toggleChild() {
				this.isShowChild = true
			},
      handleClose(key, keyPath) {
				console.log('handleClose')
        console.log(key, keyPath)
      },
      handleSelect(key, keyPath) {
      	console.log('handleSelect')
      	console.log(key, keyPath)
      }
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.menusWrap
		width: 230px
</style>