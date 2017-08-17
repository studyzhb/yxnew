<template>
	<section style="width:50%">
		<el-form :model="editForm" label-width="100px" style="text-align:left !important;" ref="editForm" v-loading="listLoading">
			<el-form-item label="商户号：" prop="login" style="margin-bottom:10px;color:#555;">
				<div class="el-form-item__content" v-text="editForm.login"></div>
			</el-form-item>
			<el-form-item label="商户推荐码：" style="margin-bottom:10px;color:#555;">
				<div class="el-form-item__content">SX{{editForm.id}}</div>
			</el-form-item>
			<el-form-item label="名称：" prop="shopname" style="margin-bottom:10px;color:#555;">
				<div class="el-form-item__content" v-text="editForm.shopname"></div>
			</el-form-item>
			<el-form-item label="微信：" prop="wx" style="margin-bottom:10px;color:#555;">
				<div class="el-form-item__content" v-text="editForm.wx"></div>
			</el-form-item>
			<el-form-item label="邮箱：" prop="email" style="margin-bottom:10px;color:#555;">
				<div class="el-form-item__content" v-text="editForm.email"></div>
			</el-form-item>
			<el-form-item label="QQ：" prop="qq" style="margin-bottom:10px;color:#555;">
				<div class="el-form-item__content" v-text="editForm.qq"></div>
			</el-form-item>
			<el-form-item label="店铺电话：" prop="phone" style="margin-bottom:10px;color:#555;">
				<div class="el-form-item__content" v-text="editForm.phone"></div>
			</el-form-item>
			<el-form-item label="姓名：" prop="shopuser" style="margin-bottom:10px;color:#555;">
				<div class="el-form-item__content" v-text="editForm.shopuser"></div>
			</el-form-item>
			<el-form-item label="联系人电话：" prop="tel" style="margin-bottom:10px;color:#555;">
				<div class="el-form-item__content" v-text="editForm.tel"></div>
			</el-form-item>
			<el-form-item label="身份证：" prop="card" style="margin-bottom:10px;color:#555;">
				<div class="el-form-item__content" v-text="editForm.card"></div>
			</el-form-item>
			<el-form-item label="籍贯：" prop="place" style="margin-bottom:10px;color:#555;">
				<div class="el-form-item__content" v-text="editForm.place"></div>
			</el-form-item>
			<el-form-item label="地址：" style="margin-bottom:10px;color:#555;">
				<div class="el-form-item__content" v-text="">
					<span v-text="editForm.province"></span>
					<span v-text="editForm.city"></span>
					<span v-text="editForm.area"></span>
				</div>
			</el-form-item>
			<el-form-item label="详细地址：" prop="address" style="margin-bottom:10px;color:#555;">
				<div class="el-form-item__content" v-text="editForm.address"></div>
				<!-- <el-input type="textarea" v-model="editForm.address"></el-input> -->
			</el-form-item>
			<!-- <el-form-item>
		    <el-button type="primary" @click="submitForm('editForm')">提交</el-button>
		  </el-form-item> -->
		</el-form>
	</section>
</template>

<script type="text/ecmascript-6">
	import NProgress from 'nprogress'
	import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'common/js/area.js'
	import { getShopDetail } from 'api/api'

  export default {
  	data() {
			return {
				listLoading: false,
				CodeToText: CodeToText,
				TextToCode: TextToCode,
				regionData: regionData,
				//编辑界面数据
				editForm: {
					id: 0,
					login: '',
					shopname: '',
					wx: '',
					email: '',
					qq: '',
					phone: '',
					shopuser: '',
					contactPhone: '',
					tel: '',
					card: '',
					place: '',
					province: '',
					city: '',
					area: '',
					address: ''
				},
				editLoading: false,
			}
		},
		created() {
			// document.title = '店铺资料'
		},
		mounted() {
			this.getShopDetailEnv()
		},
		methods: {
			//获取店铺资料
			getShopDetailEnv() {
				let _this = this
				let params = {
					storeId: 1
				}
				getShopDetail(params).then((res) => {
					_this.listLoading = true
					NProgress.start()
					console.log(res)
					if (res.code !== 200) {
            _this.$notify({
              title: '错误',
              message: res.message,
              type: 'error'
            })
            window.localStorage.clear()
            _this.$router.replace('/login')
          } else {
          	if (typeof res.data.cnt === 'object') {
          		_this.editForm = res.data.cnt
							_this.listLoading = false
							NProgress.done()
          	} else {
          		_this.$router.replace('/login')
          		_this.$notify({
	              title: '错误',
	              message: '请重新登录',
	              type: 'error'
	            })
          	}
          	if (res.data.cnt.length = 0) {
          		_this.$router.replace('/login')
          	}
          	NProgress.done()
          }
				})
			}
		}
  }
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
  
</style>
