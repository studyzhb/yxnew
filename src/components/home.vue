<template>
  <el-row class="panel">

  	<!-- topbar -->
  	<el-col :span="24" class="panel-top">
  		<el-col :span="20" style="font-size:26px;">
				<span class="logo" style="font-size:17px;">
					<img src="../common/image/logo.png">
					<!-- 优享 -->
					<span style="color:#20a0ff;font-family:'微软雅黑'">商户平台</span>
				</span>
			</el-col>
			<el-col :span="4" class="rightbar" style=" padding-right:25px;text-align:right !important;">
				<el-dropdown trigger="click">
				  <span class="el-dropdown-link" style="color:#c0ccda;cursor: pointer;">
				  	<img src="../common/image/head.jpg" class="head">
						<!-- <img :src="avatar"> -->
				    {{manage_name}}<i class="el-icon-caret-bottom el-icon--right"></i>
				  </span>
				  <el-dropdown-menu slot="dropdown">
				    <el-dropdown-item @click.native.prevent="logout">退出登录</el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
			</el-col>
  	</el-col>

  	<el-col :span="24" class="panel-center">
  		<!-- menus -->
  		<aside style="width:230px;">
  			<menus></menus>
  		</aside>

	  	<!-- content -->
			<section class="panel-c-c">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" style="margin-bottom:15px;">
						<strong style="width:200px;float:left;color: #475669;">{{currentPathName}}</strong>
						<el-breadcrumb separator="/" style="float:right;">
						<el-breadcrumb-item :to="{ path: '/storeInfo' }">首页</el-breadcrumb-item>
						<!-- <el-breadcrumb-item v-if="currentPathNameParent!=''">{{currentPathNameParent}}</el-breadcrumb-item> -->
						<el-breadcrumb-item v-if="currentPathName!=''">{{currentPathName}}</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col class="subRouter" :span="24" style="background-color:#fff;box-sizing: border-box;padding: 40px 50px">
						<transition name="fadeLeft">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
  	</el-col>
  </el-row>
</template>

<script type="text/ecmascript-6">
	import { logout } from 'api/api'
	import NProgress from 'nprogress'
	import Menus from 'base/menus/menus'

  export default {
  	data() {
  		return {
  			currentPathName: '店铺资料',
  			currentPathNameParent: '导航',
  			manage_name: '管理员名称',
  			avatar: ''
  		}
  	},
  	created() {
  		console.log('home')
  		this.manage_name = localStorage.__shop_name__
  		this.avatar = JSON.parse(localStorage.__avatar__)
  	},
  	methods: {
  		logout() {
  			let _this = this
  			let params = {}
  			logout(params).then(res => {
          _this.logining = false
          if (res.code !== 200) {
            _this.$notify({
              title: '错误',
              message: res.message,
              type: 'error'
            })
          } else {
            window.localStorage.clear()
            _this.$router.replace('/login')
          }
        })
  			console.log('退出')
  		}
  	},
  	watch: {
			'$route'(to, from) {
				//监听路由改变
				this.currentPath = to.path;
				this.currentPathName = to.name;
				this.currentPathNameParent = to.matched[0].name;
				document.title = `格信商城-${this.currentPathName}`
			}
		},
  	components: {
  		Menus
  	}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.panel
		position: absolute
		top: 0px
		bottom: 0px
		width: 100%
		.panel-top
			height: 60px
			line-height: 60px
			background: #1F2D3D
			color: #c0ccda
		.logo
			img
				height: 64px
				float: left
		.rightbar
			.head
				width: 30px
				height: 30px
				border-radius: 100%
				display: inline-block
				vertical-align: top
				margin-right: 6px
				margin-top: 15px
		.panel-center
			background: #324057
			position: absolute
			top: 60px
			bottom: 0px
			overflow: hidden
			.panel-c-c
				background: #f1f2f7
				position: absolute
				right: 0px
				top: 0px
				bottom: 0px
				left: 230px
				overflow-y: scroll
				padding: 20px
			.subRouter
				.fadeLeft-enter-active
					transition: all .5s
				.fadeLeft-enter
					opacity: 0
					transform: translate3d(30px, 0, 0)
</style>
