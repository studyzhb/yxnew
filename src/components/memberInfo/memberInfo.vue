<template>
	<section style="width:50%">
		<el-form :model="editForm" label-width="112px" :rules="editFormRules" ref="editForm" v-loading="listLoading">
			<el-form-item label="手机号：" prop="user_mobile">
				<el-input :disabled="true" v-model="editForm.user_mobile" auto-complete="off" placeholder="提交后不可更改"></el-input>
			</el-form-item>
			<el-form-item label="昵称：" prop="user_nickname">
				<el-input v-model="editForm.user_nickname" auto-complete="off" placeholder="提交后不可更改"></el-input>
			</el-form-item>
			<el-form-item label="队列资格：">
			  <el-switch
			    v-model="editForm.into_queque"
			    @change="switchChanges"
			    on-color="#13ce66"
			    off-color="#ff4949"
			    on-value="1"
			    off-value="2">
			  </el-switch>
			  <span v-text="editForm.into_queque === '1' ? ' 可以进' : ' 不可以进'" style="color:rgba(144, 141, 141, 0.98);font-size:14px;"></span>
			</el-form-item>
			<el-form-item label="姓名：" prop="real_name">
				<el-input type="text" v-model="editForm.real_name" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="身份证：" prop="id_card">
				<el-input v-model="editForm.id_card" auto-complete="off"></el-input>
			</el-form-item>
			<!-- <el-form-item label="籍贯" prop="qq">
				<el-input type="number" v-model="editForm.qq" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="开户行" prop="shopPhone">
				<el-input type="number" v-model="editForm.shopPhone" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="银行卡号" prop="fullName">
				<el-input type="text" v-model="editForm.fullName" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="备注" prop="addressDetails">
				<el-input type="textarea" v-model="editForm.addressDetails"></el-input>
			</el-form-item> -->
			<el-form-item>
		    <el-button type="primary" @click="submitForm('editForm')" :loading="loading">提交</el-button>
		    <el-button @click="resetForm('editForm')">重置</el-button>
		  </el-form-item>
		</el-form>
	</section>
</template>

<script type="text/ecmascript-6">
	import NProgress from 'nprogress'
	import { getUserInfo, setUserUpdate } from 'api/api'

  export default {
  	data() {
			return {
				loading: false,
				listLoading: false,
				//编辑界面数据
				editForm: {
					user_mobile: '',
					user_nickname: '',
					real_name: '',
					id_card: ''
				},
				editFormRules: {
					user_mobile: [
						{ required: true, message: '请输入手机号', trigger: 'blur' }
					],
					user_nickname: [
						{ required: true, message: '请输入昵称', trigger: 'blur' }
					],
					real_name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					],
					id_card: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				editLoading: false,
			}
		},
		created() {
			// document.title = '格信商城-会员信息更新'
			this.user_id = this.$route.params.id
		},
		mounted() {
			this.getUserInfoEnv()
		},
		methods: {
			//获取店铺资料
			getUserInfoEnv() {
				let _this = this
				let params = {
					params: {
						user_id: this.user_id
					}
				}
				NProgress.start();
				getUserInfo(params).then((res) => {
					if (res.code !== 200) {
						_this.$notify({
							title: '提示',
							message: res.message,
							type: 'fail'
						})
					} else {
						let data = res.data.cnt
						_this.editForm = data
						_this.editForm.into_queque = data.into_queque + ''
					}
					
					NProgress.done()
				})
			},
      switchChanges(index) {
				console.log(index)
				this.editForm.into_queque = index
			},
			submitForm(formName) {
				let _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.$confirm('确认提交吗？', '提示', {}).then(() => {
	          	_this.loading = false
	          	NProgress.start()
							_this.btnEditText = '提交中'
								let params = {
									userId: _this.user_id,
									user_nickname: _this.editForm.user_nickname,
									real_name: _this.editForm.real_name,
									id_card: _this.editForm.id_card,
									into_queque: _this.editForm.into_queque
								}
								setUserUpdate(params).then((res) => {
			          	_this.loading = false
			          	NProgress.start()
									_this.btnEditText = '提 交'
									_this.$notify({
										title: '成功',
										message: '提交成功',
										type: 'success'
									})
									_this.$router.replace('/memberManage')
								})
						})
          } else {
            console.log('验证失败')
            return false
          }
        })
      },
			resetForm(formName) {
        this.$refs[formName].resetFields()
      }
		}
  }
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
  
</style>
