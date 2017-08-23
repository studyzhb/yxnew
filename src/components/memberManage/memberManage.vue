<template>
	<section style="width:100%">
		<el-form :inline="true" :model="editForm" class="demo-form-inline">
		  <el-form-item label="手机号:">
		    <el-input v-model="editForm.tel" type="number" placeholder="手机号"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" icon="search" @click="submitForm">搜索</el-button>
		  </el-form-item>
		</el-form>
  	<el-table
		    :data="tableData"
		    stripe
		    style="width: 100%">
	    <el-table-column
	      prop="cur_id"
	      label="#"
	      width="80">
		  </el-table-column>
	    <el-table-column
	      prop="user_mobile"
	      label="手机号"
	      sortable>
	    </el-table-column>
	    <el-table-column
	      prop="real_name"
	      label="姓名"
	      sortable>
	    </el-table-column>
	    <el-table-column
	      prop="user_nickname"
	      sortable
	      label="昵称">
	    </el-table-column>
	    <el-table-column
	      prop="id_card"
	      sortable
	      label="身份证号">
	    </el-table-column>
	    <el-table-column
	      prop="created_at"
	      sortable
	      label="注册时间">
	    </el-table-column>
	    <el-table-column
	      prop="operation"
	      label="操作"
	      width="200">
	      <template scope="scope">
	        <el-button @click="recharge(scope.row.id, scope.row)" type="primary" size="small" >充值</el-button>
	        <router-link class="el-button el-button--primary el-button--small" :to="'/seeFlowWater/' + scope.row.id" type="primary">流水</router-link>
	        <router-link class="el-button el-button--primary el-button--small" :to="'/memberInfo/' + scope.row.id" type="primary" >编辑</router-link>
	        <!-- <el-button @click="bind(scope.row.id, scope.row)" type="primary" size="small" >绑定</el-button> -->
	        <!-- <el-button @click="bindShop(scope.row.id, scope.row)" type="primary" size="small" v-text="">绑定</el-button> -->
	      </template>
	    </el-table-column>
	  </el-table>
	  <el-pagination style="text-align:right; padding: 15px 0 0 0;"
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="currentPage"
	      :page-sizes="[50]"
	      :page-size="pageSize"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="pageTotal">
    </el-pagination>
	  <!-- 弹窗1 -->
	  <el-dialog title="充值" :visible.sync="dialogFormVisible">
		  <el-form :model="form" style="text-align:center;">
		  	<p class="rechargeItem" style="margin-bottom: 30px!important;">当前余额：<span v-text="form.balance" style="color: #FF4949;font-weight:bold;font-size:30px;"></span></p>
		    <!-- <el-input class="deliveryInput" v-model="form.rechargeAmount" auto-complete="off" placeholder="请输入充值金额"></el-input> -->
		    <input type="number" class="deliveryInput" v-model="form.rechargeAmount" placeholder="请输入充值金额">
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="confirmRecharge">确认充值</el-button>
		    <el-button @click="cancel">取 消</el-button>
		  </div>
		</el-dialog>
		<!-- 弹窗2 -->
		<el-dialog title="充值确认" :visible.sync="dialogFormVisible2">
		  <el-form :model="form2" style="width:260px;text-align:left;margin:0 auto;">
		    <p style="font-size: 20px!important;margin-bottom:15px;"><span class="label">当前: </span><span v-text="form2.curAmount" style="margin-left:10px;font-size:24px;"></span></p>
		    <p style="font-size: 20px!important;margin-bottom:15px;"><span class="label">充值: </span><span v-text="form2.recharge" style="margin-left:10px;font-size:24px;"></span></p>
		    <p style="font-size: 20px!important;margin-bottom:15px;color:#FF4949"><span class="label">充值后: </span><span v-text="form2.afterRecharge" style="margin-left:10px;font-size:24px;"></span></p>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="recharge2">确认充值</el-button>
		    <el-button @click="cancel2">取 消</el-button>
		  </div>
		</el-dialog>
	</section>
</template>

<script type="text/ecmascript-6">
	import NProgress from 'nprogress'
	import { getMemberList, pay, getUserBalance } from 'api/api'
	import { dateFormat } from 'common/js/dateFormat.js'

  export default {
  	data() {
			return {
				editForm: {
					tel: ''
				},
				tableData: [
					{
						cur_id: '',
						user_mobile: '',
						real_name: '',
						user_nickname: '',
						id_card: '',
						created_at: ''
					}
				],
				dialogFormVisible: false,
				dialogFormVisible2: false,
				form: {
					rechargeAmount: '',
					balance: 0
				},
				form2: {
					recharge: '',
					curAmount: '',
					afterRecharge: ''
				},
				currentPage: 1,
        pageTotal: 0,
        pageSize: 0
			}
		},
		created() {
			// document.title = '格信商城-会员列表'
		},
		mounted() {
			NProgress.start()
			this.getMemberListEnv()
		},
		methods: {
			handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
				if (this.currentPage == val) {
					return
				}
        this.currentPage = val
        let params = {
					params: {
						page: this.currentPage,
						tel: this.editForm.tel
					}
				}
        this.getMemberListEnv(params)
      },
			bindShop(id, item) {
				console.log(id, item)
			},
			seeFlowWater(id, item) {
				console.log(id, item)
			},
			cancel() {
				this.dialogFormVisible = false
				this.form.rechargeAmount = ''
			},
			cancel2() {
				this.dialogFormVisible2 = false
			},
			recharge2() {
				let params = {
					user_id: this.user_id,
					money: this.form.rechargeAmount
				}
				let _this = this
				pay(params).then((res) => {
					console.log(res)
					if (res.code !== 200) {
						_this.$notify.error({
							title: '提示',
							message: res.message
						})
					} else if (res.code == 400) {
						_this.$notify.error({
							title: '提示',
							message: '操作失败，请联系管理员'
						})
					} else {
						_this.dialogFormVisible2 = false
						_this.form.rechargeAmount = ''
						_this.$notify({
							title: '提示',
							message: res.message,
							type: 'success'
						})
					}
					NProgress.done()
				})
			},
			recharge(id, item) {
				console.log(id, item)
				this.dialogFormVisible = true
				this.item = item
				this.user_id = id
				// this.form.balance = item.balance
				let _this = this
				let params = {
					params: {
						user_id: this.user_id
					}
				}
				getUserBalance(params).then((res) => {
					console.log(res)
					if (res.code !== 200) {
						_this.$notify.error({
							title: '提示',
							message: res.message
						})
					} else {
						console.log(res)
						if (res.data.cnt.balance == '' || !res.data.cnt.balance) {
							_this.form.balance = 0
							return
						}
						_this.form.balance = res.data.cnt.balance
					}
					
					NProgress.done()
				})

			},
			confirmRecharge() {
				if (this.form.rechargeAmount == '') {
					this.$notify({
						title: '提示',
						message: '请输入充值金额^_^',
						type: 'warning'
					})
					return
				}
				this.dialogFormVisible = false
				this.dialogFormVisible2 = true

				this.form2.recharge = this.form.rechargeAmount
				this.form2.curAmount = this.form.balance
				this.form2.afterRecharge = (this.form2.recharge * 100 + this.form2.curAmount * 100) / 100
				
			},
			getMemberListEnv(params) {
				if (!params) {
					params = {
						params: {
							tel: this.editForm.tel
						}
					}
				}
				let _this = this
				getMemberList(params).then((res) => {
					console.log(res)
					if (res.code !== 200) {
						this.$notify.error({
							title: '提示',
							message: res.message
						})
					} else {
						let data = res.data.cnt.data
						_this.pageTotal = res.data.cnt.total - 0
						_this.pageSize = res.data.cnt.per_page - 0
						if (data == null) {
							_this.tableData = data
							return
						}
						data.forEach((value, index) => {
							value.cur_id = index + 1
						})
						_this.tableData = data
					}
					NProgress.done()
				})
			},
			submitForm(formName) {
      	let params = {
      		params: {
	      		tel: this.editForm.tel
      		}
      	}
      	this.getMemberListEnv(params)
      	console.log(params)
      }
		}
  }
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
	.deliveryInput
		width: 400px
		margin: 0 auto
		text-align: center
		border: 1px solid #ccc
		border-radius: 4px
		text-align: center !important
		padding: 7px 0
		font-size: 45px
		height: auto
.el-dialog--small
	width: 40%
</style>
