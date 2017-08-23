<template>
	<section style="width:100%">
		<el-form :inline="true" :model="editForm" class="demo-form-inline">
			<el-form-item label="手机号：">
				<el-input v-model="editForm.user_mobile" placeholder="手机号"></el-input>
			</el-form-item>
			<el-form-item label="时间范围选择：">
				<el-date-picker style="width: 400px;" v-model="dateValue" @change="dateChange" type="datetimerange" :picker-options="pickerOptions" placeholder="选择时间范围" align="right">
				</el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="search" @click="submitForm">搜索</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="search" @click="exportExcel">导出</el-button>
			</el-form-item>
		</el-form>
		<el-tabs v-model="activeName2" type="card" @tab-click="handleClick" style="margin-top: 15px;">
			<el-tab-pane label="全部" name="one">
				<el-table :data="tableData" stripe style="width: 100%">
					<el-table-column type="index" label="#" width="80">
					</el-table-column>
					<el-table-column prop="user_mobile" label="手机号" sortable>
					</el-table-column>
					<el-table-column prop="user.real_name" label="用户名" sortable>
					</el-table-column>
					<el-table-column prop="card_tip" sortable label="银行">
					</el-table-column>
					<el-table-column prop="card_num" sortable label="银行卡号">
					</el-table-column>
					<el-table-column prop="status" sortable width="100" label="状态" :formatter="filterStatus">
					</el-table-column>
					<el-table-column prop="money" sortable width="100" label="金额">
					</el-table-column>
					<el-table-column prop="created_at" sortable label="时间">
					</el-table-column>
					<el-table-column prop="operation" label="操作">
						<template scope="scope">
							<el-button v-if="scope.row.status === 0 " type="primary" size="small" @click="toExamine(scope.row)">审核</el-button>
							<el-button v-if="scope.row.status === 1 " type="warning" size="small" @click="refuseEnv(scope.row)">拒绝</el-button>
							<el-button v-if="scope.row.status === 1 " type="success" size="small" @click="examineOkEnv(scope.row)">打款</el-button>
							<router-link class="el-button el-button--primary el-button--small" :to="'/seeFlowWater/' + scope.row.user_id" type="success">明细</router-link>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="未审核" name="first">
				<el-table :data="tableData" stripe style="width: 100%">
					<el-table-column type="index" label="#" width="80">
					</el-table-column>
					<el-table-column prop="user_mobile" label="手机号" sortable>
					</el-table-column>
					<el-table-column prop="user.real_name" label="用户名" sortable>
					</el-table-column>
					<el-table-column prop="card_tip" sortable label="银行">
					</el-table-column>
					<el-table-column prop="card_num" sortable label="银行卡号">
					</el-table-column>
					<el-table-column prop="status" sortable width="100" label="状态" :formatter="filterStatus">
					</el-table-column>
					<el-table-column prop="money" sortable width="100" label="金额">
					</el-table-column>
					<el-table-column prop="created_at" sortable label="时间">
					</el-table-column>
					<el-table-column prop="operation" label="操作">
						<template scope="scope">
							<el-button v-if="scope.row.status === 0 " type="primary" size="small" @click="toExamine(scope.row)">审核</el-button>
							<el-button v-if="scope.row.status === 1 " type="warning" size="small" @click="refuseEnv(scope.row)">拒绝</el-button>
							<el-button v-if="scope.row.status === 1 " type="success" size="small" @click="examineOkEnv(scope.row)">打款</el-button>
							<router-link class="el-button el-button--primary el-button--small" :to="'/seeFlowWater/' + scope.row.user_id" type="success">明细</router-link>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="已审核" name="second">
				<!-- 已审核 -->
				<el-table :data="tableData" stripe style="width: 100%">
					<el-table-column type="index" label="#" width="80">
					</el-table-column>
					<el-table-column prop="user_mobile" label="手机号" sortable>
					</el-table-column>
					<el-table-column prop="card_name" label="用户名" sortable>
					</el-table-column>
					<el-table-column prop="card_tip" sortable label="银行">
					</el-table-column>
					<el-table-column prop="card_num" sortable label="银行卡号">
					</el-table-column>
					<el-table-column prop="status" sortable width="100" label="状态" :formatter="filterStatus">
					</el-table-column>
					<el-table-column prop="money" sortable width="100" label="金额">
					</el-table-column>
					<el-table-column prop="created_at" sortable label="时间">
					</el-table-column>
					<el-table-column prop="operation" label="操作">
						<template scope="scope">
							<el-button v-if="scope.row.status === 0 " type="primary" size="small" @click="toExamine(scope.row)">审核</el-button>
							<el-button v-if="scope.row.status === 1 " type="warning" size="small" @click="refuseEnv(scope.row)">拒绝</el-button>
							<el-button v-if="scope.row.status === 1 " type="success" size="small" @click="examineOkEnv(scope.row)">打款</el-button>
							<router-link class="el-button el-button--primary el-button--small" :to="'/seeFlowWater/' + scope.row.user_id" type="success">明细</router-link>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="已打款" name="third">
				<!-- 已打款 -->
				<el-table :data="tableData" stripe style="width: 100%">
					<el-table-column type="index" label="#" width="80">
					</el-table-column>
					<el-table-column prop="user_mobile" label="手机号" sortable>
					</el-table-column>
					<el-table-column prop="card_name" label="用户名" sortable>
					</el-table-column>
					<el-table-column prop="card_tip" sortable label="银行">
					</el-table-column>
					<el-table-column prop="card_num" sortable label="银行卡号">
					</el-table-column>
					<el-table-column prop="status" sortable width="100" label="状态" :formatter="filterStatus">
					</el-table-column>
					<el-table-column prop="money" sortable width="100" label="金额">
					</el-table-column>
					<el-table-column prop="created_at" sortable label="时间">
					</el-table-column>
					<el-table-column prop="operation" label="操作">
							<template scope="scope">
								<el-button v-if="scope.row.status === 0 " type="primary" size="small" @click="toExamine(scope.row)">审核</el-button>
								<el-button v-if="scope.row.status === 1 " type="warning" size="small" @click="refuseEnv(scope.row)">拒绝</el-button>
								<el-button v-if="scope.row.status === 1 " type="success" size="small" @click="examineOkEnv(scope.row)">打款</el-button>
								<router-link class="el-button el-button--primary el-button--small" :to="'/seeFlowWater/' + scope.row.user_id" type="success">明细</router-link>
							</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="拒绝" name="fourth">
				<!-- 已打款 -->
				<el-table :data="tableData" stripe style="width: 100%">
					<el-table-column type="index" label="#" width="80">
					</el-table-column>
					<el-table-column prop="user_mobile" label="手机号" sortable>
					</el-table-column>
					<el-table-column prop="card_name" label="用户名" sortable>
					</el-table-column>
					<el-table-column prop="card_tip" sortable label="银行">
					</el-table-column>
					<el-table-column prop="card_num" sortable label="银行卡号">
					</el-table-column>
					<el-table-column prop="status" sortable width="100" label="状态" :formatter="filterStatus">
					</el-table-column>
					<el-table-column prop="money" sortable width="100" label="金额">
					</el-table-column>
					<el-table-column prop="created_at" sortable label="时间">
					</el-table-column>
					<el-table-column prop="operation" label="操作">
						<template scope="scope">
							<el-button v-if="scope.row.status === 0 " type="primary" size="small" @click="toExamine(scope.row)">审核</el-button>
							<el-button v-if="scope.row.status === 1 " type="warning" size="small" @click="refuseEnv(scope.row)">拒绝</el-button>
							<el-button v-if="scope.row.status === 1 " type="success" size="small" @click="examineOkEnv(scope.row)">打款</el-button>
							<router-link class="el-button el-button--primary el-button--small" :to="'/seeFlowWater/' + scope.row.user_id" type="success">明细</router-link>
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>
		<el-pagination style="text-align:right; padding: 15px 0 0 0;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
		</el-pagination>
		<!-- 弹窗1 -->
		<el-dialog title="提现审核" :visible.sync="dialogFormVisible">
			<el-form :model="form" class="formBox">
				<p style="font-size:15px;line-height:1.7;">提现:
					<span style="font-size:19px;margin-left:4px;" v-text="form.draw"></span>
				</p>
				<p style="font-size:15px;line-height:1.7;">提现后:
					<span style="font-size:19px;margin-left:4px;" v-text="form.balance"></span>
				</p>
				<p style="font-size:15px;line-height:1.7;">手机号:
					<span style="font-size:19px;margin-left:4px;" v-text="form.user_mobile"></span>
				</p>
				<p style="font-size:15px;line-height:1.7;">姓名:
					<span style="font-size:19px;margin-left:4px;" v-text="form.real_name"></span>
				</p>
				<p style="font-size:15px;line-height:1.7;">身份证号:
					<span style="font-size:19px;margin-left:4px;" v-text="form.id_card"></span>
				</p>
				<p style="font-size:15px;line-height:1.7;">银行:
					<span style="font-size:19px;margin-left:4px;" v-text="form.card_name"></span>
				</p>
				<p style="font-size:15px;line-height:1.7;">银行卡号:
					<span style="font-size:19px;margin-left:4px;" v-text="form.card_num"></span>
				</p>
			</el-form>
			<div style="display:block;text-align:center;margin-top:15px;">
				<ul style="display:inline-block;margin:30px auto;text-align:left;margin-bottom:10px;font-size:12px;color:#99A9BF;line-height:1.5;margin-left:-10%;">
					<li>1、请仔细核对提现金额</li>
					<li>2、确认审核时，请尽量查看用户交易流水是否正常</li>
					<li>3、此操作是不可以逆转的，请谨慎操作</li>
				</ul>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="confirmToExamine">确认审核</el-button>
				<el-button @click="dialogFormVisible = false">取消</el-button>
			</div>
		</el-dialog>
		<!-- 弹窗2 -->
		<el-dialog title="请输入拒绝理由" :visible.sync="dialogFormVisible2">
			<el-form :model="form2" class="formBox">
				<input type="number" class="deliveryInput" v-model="form2.reason" placeholder="请输入拒绝理由">
			</el-form>
			<el-form :model="form2" class="formBox" style="width: 220px;">
				<p class="rechargeItem" style="color: red;font-size: 12px !important; text-align: center;">请输入拒绝理由，字数不可超过12个字</p>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="recharge2">确认</el-button>
				<el-button @click="dialogFormVisible2 = false">取 消</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script type="text/ecmascript-6">
import NProgress from 'nprogress'
import { getDrawList, getUserBalance, checkDraw, drawFalse, examineOk, takeDelivery } from 'api/api'
import { dateFormat } from 'common/js/dateFormat.js'
import querystring from 'querystring'
export default {
	data() {
		return {
			pickerOptions: {
				shortcuts: [{
					text: '最近一周',
					onClick(picker) {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
						picker.$emit('pick', [start, end]);
					}
				}, {
					text: '最近一个月',
					onClick(picker) {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
						picker.$emit('pick', [start, end]);
					}
				}, {
					text: '最近三个月',
					onClick(picker) {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
						picker.$emit('pick', [start, end]);
					}
				}]
			},
			dateValue: '',
			//编辑界面数据
			editForm: {
				user_mobile: ''
			},
			activeName2: 'one',
			tableData: [{
				cur_id: 0,
				user_mobile: '无',
				card_name: '无',
				card_tip: '无',
				card_num: '无',
				status: '无',
				money: '无',
				created_at: '无'
			}],
			dialogFormVisible: false,
			dialogFormVisible2: false,
			form: {
				draw: '',
				balance: '',
				id_card: '',
				real_name: '',
				user_mobile: '',
				card_name: '',
				card_num: ''
			},
			form2: {
				reason: ''
			},
			pageTotal: 0,
			pageSize: 0,
			curPage: 1,
			currentPage: 1,
			curState: '',
			stime: '',
			etime: ''
		}
	},
	created() {
		// document.title = '格信商城-提现审核'
	},
	mounted() {
		NProgress.start()
		this.getDrawListEnv()
	},
	methods: {
		filterStatus(row) {
			switch (row.status) {
				case 0:
					return '未审核'
				case 1:
					return '已审核'
				case 2:
					return '已打款'
				case 3:
					return '拒绝'
			}
		},
		//导出
		exportExcel() {
			let exportUrl = location.protocol + "//" + location.hostname + ':' + location.port + '/api/widthdrawUser/excel?';
			let body = {}
			body.s_time = this.stime;
			body.e_time = this.etime;
			body.tel = this.editForm.user_mobile;
			switch (this.activeName2) {
				case 'one':
					body.status = '';
					break;
				case 'first':
					body.status = '0';
					break;
				case 'second':
					body.status = '1';
					break;
				case 'third':
					body.status = '2';
					break;
				case 'fourth':
					body.status = '3';
					break;
			}
			let params = querystring.stringify(body)
			open(exportUrl + params, '_blank')
		},
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
					s_time: this.stime,
					e_time: this.etime,
					status: this.curState,
					user_mobile: this.editForm.user_mobile
				}
			}
			this.getDrawListEnv(params)
		},
		recharge2() {
			let params = {
				id: this.item.id,
				note: this.form2.reason
			}
			let _this = this
			drawFalse(params).then((res) => {
				console.log(res)
				if (res.code !== 200) {
					_this.$notify({
						title: '提示',
						message: res.message,
						type: 'fail'
					})
				} else {
					_this.item.status = '已拒绝'
					_this.dialogFormVisible2 = false
					_this.$notify({
						title: '提示',
						message: res.message,
						type: 'success'
					})
				}

				NProgress.done()
			})
		},
		delivery() {
			this.dialogFormVisible = false
			let _this = this
			let params = {
				order_id: this.order_id,
				take_no: this.form.delivery_code
			}
			takeDelivery(params).then((res) => {
				console.log(res)
				if (res.code !== 200) {
					this.$notify({
						title: '提示',
						message: res.message,
						type: 'fail'
					})
				} else {
					let data = res
				}
			})
			console.log('确认提货')
		},
		confirmToExamine() {
			console.log('user_id:' + this.id)
			let params = {
				id: this.id
			}
			let _this = this
			checkDraw(params).then((res) => {
				console.log(res)
				if (res.code !== 200) {
					_this.$notify({
						title: '提示',
						message: res.message,
						type: 'fail'
					})
				} else {
					_this.item.status = '已审核'
					_this.dialogFormVisible = false
					_this.$notify({
						title: '提示',
						message: res.message,
						type: 'success'
					})
				}

				NProgress.done()
			})
		},
		examineOkEnv(item) {
			let params = {
				id: item.id
			}
			this.item = item
			let _this = this

			examineOk(params).then((res) => {
				console.log(res)
				if (res.code !== 200) {
					_this.$notify({
						title: '提示',
						message: res.message,
						type: 'fail'
					})
				} else {
					console.log(_this.item)
					_this.item.status = '审核完成'
					_this.dialogFormVisible = false
					_this.$notify({
						title: '提示',
						message: res.message,
						type: 'success'
					})
				}

				NProgress.done()
			})
		},
		refuseEnv(item) {
			this.dialogFormVisible = false
			this.dialogFormVisible2 = true
			this.item = item
		},
		toExamine(item) {
			this.dialogFormVisible = true
			this.item = item
			this.id = item.id

			let _this = this
			let params = {
				params: {
					user_id: this.item.user_id
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
					_this.form.balance = res.data.cnt.balance
					_this.form.draw = item.money
				}
			})

			console.log(this.id)
			this.form.balance = item.user.balance
			this.form.id_card = item.user.id_card
			this.form.user_mobile = item.user.user_mobile
			this.form.real_name = item.user.real_name
			this.form.card_name = item.card_name
			this.form.card_num = item.card_num
		},
		handleClick(tab, event) {
			console.log(tab, event)
			console.log(tab.index)
			this.curState = tab.index - 0 - 1
			this.currentPage = 1
			if (this.curState == 0) {
				this.curState = 0
			}
			if (this.curState == -1) {
				this.curState = ''
			}
			let params = {
				params: {
					page: this.currentPage,
					s_time: this.stime,
					e_time: this.etime,
					status: this.curState,
					user_mobile: this.editForm.user_mobile
				}
			}
			this.getDrawListEnv(params)
		},
		dateChange(val) {
			console.log(val)
			this.stime = val.split(' - ')[0]
			this.etime = val.split(' - ')[1]
		},
		getDrawListEnv(params) {
			if (!params) {
				params = {
					params: {
						page: this.currentPage,
						s_time: this.stime,
						e_time: this.etime,
						status: this.curState,
						user_mobile: this.editForm.user_mobile
					}
				}
			}
			let _this = this
			getDrawList(params).then((res) => {
				console.log(res)
				if (res.code !== 200) {
					this.$notify.error({
						title: '提示',
						message: res.message
					})
				} else {
					_this.pageTotal = res.data.cnt.total - 0
					_this.pageSize = res.data.cnt.per_page - 0
					if (!res.data.cnt.data) {
						_this.tableData = null
						return
					}
					let data = res.data.cnt.data
					// let arrs = ['cur_id', 'user_mobile', 'card_name', 'card_tip', 'card_num', 'money', 'created_at']
					// data.forEach((value, index) => {
					// 	arrs.forEach((val, val_index) => {
					// 		if (value[val] === '') {
					// 			value[val] = '无'
					// 		}
					// 	})
					// 	switch (value.status) {
					// 		case 0:
					// 			value.status = '未审核'
					// 			break
					// 		case 1:
					// 			value.status = '已审核'
					// 			break
					// 		case 2:
					// 			value.status = '已打款'
					// 			break
					// 		case 3:
					// 			value.status = '已拒绝'
					// 			break
					// 	}
					// 	value.cur_id = index + 1

					// })
					_this.tableData = data
				}

				NProgress.done()
			})
		},
		//获取队列资料
		getQueueInfo() {
			let _this = this
			let params = ''
			getQueueList(params).then((res) => {
				NProgress.start()

				console.log(res)
				_this.editLoading = false
				if (res.code !== 200) {
					_this.$notify({
						title: '提示',
						message: res.message,
						type: 'fail'
					})
				} else {
					let data = res.data.cnt
					_this.queueId = data.id
					// 填充数据
					_this.editForm.queueName = data.name
					_this.editForm.minimumForPrelist = data.min_amount
					_this.editForm.highestForPrelist = data.max_amount
					_this.editForm.highestForPreday = data.day_amount
					_this.editForm.spacing = data.spec
					_this.editForm.serviceCharge = data.poundage
					_this.editForm.protocol = data.protocol
					_this.editForm.closeExplain = data.close_reason
					_this.editForm.queueState = data.status
					_this.editForm.remarks = data.desc
				}
				_this.NProgress.start()
				NProgress.done()
			})
		},
		submitForm(formName) {
			let params = {
				params: {
					s_time: this.stime,
					e_time: this.etime,
					status: this.curState,
					user_mobile: this.editForm.user_mobile
				}
			}
			this.getDrawListEnv(params)
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
	.formBox
		width: 260px
		text-align: left
		margin: 0 auto
	.tipsWrap
		display: block
		text-align: center
		margin-top: 15px
	.tips
		display: inline-block
		margin: 0 auto
		text-align: left
		line-height: 1.5
		margin-top: 30px
		li
			margin-bottom: 8px
			font-size: 14px
			color: #848282
  	
</style>
