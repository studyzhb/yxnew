<template>
	<section style="width:100%">
		<el-form :inline="true" :model="editForm" class="demo-form-inline">
			<el-form-item label="手机号：">
				<el-input v-model="editForm.tel" placeholder="手机号"></el-input>
			</el-form-item>
			<el-form-item label="订单号：">
				<el-input v-model="editForm.order_id" placeholder="订单号"></el-input>
			</el-form-item>
			<el-form-item label="时间范围选择：">
				<el-date-picker style="width: 300px;" v-model="dateValue" @change="dateChange" type="datetimerange" :picker-options="pickerOptions" placeholder="选择时间范围" align="right">
				</el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="search" @click="submitForm">搜索</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="search" @click="exportExcel">导出</el-button>
			</el-form-item>
		</el-form>
		<el-row style="font-size: 14px;color: rgb(25, 23, 23);background: rgb(123, 191, 241);padding: 10px;border-radius: 2px;">
			<el-col :span="3">
				<div class="grid-content bg-purple">总计：{{reportList.total}}</div>
			</el-col>
			<el-col :span="3">
				<div class="grid-content bg-purple-light">收益中：{{reportList.st_1}}笔</div>
			</el-col>
			<el-col :span="3">
				<div class="grid-content bg-purple">兑换中：{{reportList.st_2}}笔</div>
			</el-col>
			<el-col :span="3">
				<div class="grid-content bg-purple-light">兑换完成：{{reportList.st_3}}笔</div>
			</el-col>
			<el-col :span="3">
				<div class="grid-content bg-purple">已提货：{{reportList.tk_ok}}笔</div>
			</el-col>
			<el-col :span="3">
				<div class="grid-content bg-purple-light">未提货：{{reportList.tk_no}}笔</div>
			</el-col>
			<el-col :span="3">
				<div class="grid-content bg-purple-light">已回购：{{reportList.tk_3}}笔</div>
			</el-col>
		</el-row>
		<el-tabs v-model="activeName2" type="card" @tab-click="handleClick" style="margin-top: 15px;">
			<el-tab-pane label="全部" name="one">
				<el-table :data="tableData" stripe style="width: 100%">
					<el-table-column prop="cur_id" label="#" width="80">
					</el-table-column>
					<el-table-column prop="order_id" label="订单号" sortable>
					</el-table-column>
					<el-table-column prop="username" label="联系人" sortable>
					</el-table-column>
					<el-table-column prop="phone" label="手机号" sortable>
					</el-table-column>
					<!--<el-table-column
				      prop="goods"
				      sortable
				      label="购买商品">
				    </el-table-column>-->
					<el-table-column prop="money" sortable label="金额">
					</el-table-column>
					<el-table-column prop="status" sortable label="订单状态">
					</el-table-column>
					<el-table-column prop="take_delivery" sortable label="货物状态">
						<template scope="scope">
							<span v-if="scope.row.take_delivery === 2">已提货</span>
							<span v-if="scope.row.take_delivery === 3">已回购</span>
							<el-button @click="takeGoods(scope.row)" type="primary" size="small" v-if="scope.row.take_delivery === 1">提货</el-button>
							<!-- <el-button @click="takeGoods(scope.row)" type="text" size="small" v-text="scope.row.status === '已发货' ? '提货' : ''"></el-button> -->
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="收益中" name="first">
				<el-table :data="tableData" stripe style="width: 100%">
					<el-table-column prop="cur_id" label="#" width="80">
					</el-table-column>
					<el-table-column prop="order_id" label="订单号" sortable width="180">
					</el-table-column>
					<el-table-column prop="username" label="联系人" sortable>
					</el-table-column>
					<el-table-column prop="phone" label="手机号" sortable width="180">
					</el-table-column>
					<!--<el-table-column
				      prop="goods"
				      sortable
				      label="购买商品">
				    </el-table-column>-->
					<el-table-column prop="money" sortable label="金额">
					</el-table-column>
					<el-table-column prop="status" sortable label="订单状态">
					</el-table-column>
					<el-table-column prop="take_delivery" sortable label="货物状态">
						<template scope="scope">
							<span v-if="scope.row.take_delivery === 2">已提货</span>
							<span v-if="scope.row.take_delivery === 3">已回购</span>
							<el-button @click="takeGoods(scope.row)" type="primary" size="small" v-if="scope.row.take_delivery === 1">提货</el-button>
							<!-- <el-button @click="takeGoods(scope.row)" type="text" size="small" v-text="scope.row.status === '已发货' ? '提货' : ''"></el-button> -->
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="兑换中" name="second">
				<el-table :data="tableData" stripe style="width: 100%">
					<el-table-column prop="cur_id" label="#" width="80">
					</el-table-column>
					<el-table-column prop="order_id" label="订单号" sortable width="180">
					</el-table-column>
					<el-table-column prop="username" label="联系人" sortable>
					</el-table-column>
					<el-table-column prop="phone" label="手机号" sortable width="180">
					</el-table-column>
					<!--<el-table-column
				      prop="goods"
				      sortable
				      label="购买商品">
				    </el-table-column>-->
					<el-table-column prop="money" sortable label="金额">
					</el-table-column>
					<el-table-column prop="status" sortable label="订单状态">
					</el-table-column>
					<el-table-column prop="take_delivery" sortable label="货物状态">
						<template scope="scope">
							<span v-if="scope.row.take_delivery === 2">已提货</span>
							<span v-if="scope.row.take_delivery === 3">已回购</span>
							<el-button @click="takeGoods(scope.row)" type="text" size="small" v-if="scope.row.take_delivery === 1">提货</el-button>
							<!-- <el-button @click="takeGoods(scope.row)" type="text" size="small" v-text="scope.row.status === '已发货' ? '提货' : ''"></el-button> -->
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="兑换完成" name="third">
				<el-table :data="tableData" stripe style="width: 100%">
					<el-table-column prop="cur_id" label="#" width="80">
					</el-table-column>
					<el-table-column prop="order_id" label="订单号" sortable width="180">
					</el-table-column>
					<el-table-column prop="username" label="联系人" sortable>
					</el-table-column>
					<el-table-column prop="phone" label="手机号" sortable width="180">
					</el-table-column>
					<el-table-column prop="goods" sortable label="购买商品">
					</el-table-column>
					<el-table-column prop="money" sortable label="金额">
					</el-table-column>
					<el-table-column prop="status" sortable label="订单状态">
					</el-table-column>
					<el-table-column prop="take_delivery" sortable label="货物状态">
						<template scope="scope">
							<span v-if="scope.row.take_delivery === 2">已提货</span>
							<span v-if="scope.row.take_delivery === 3">已回购</span>
							<el-button @click="takeGoods(scope.row)" type="text" size="small" v-if="scope.row.take_delivery === 1">提货</el-button>
							<!-- <el-button @click="takeGoods(scope.row)" type="text" size="small" v-text="scope.row.status === '已发货' ? '提货' : ''"></el-button> -->
						</template>
					</el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>
		<el-pagination style="text-align:right; padding: 15px 0 0 0;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
		</el-pagination>
		<el-dialog title="提货" :visible.sync="dialogFormVisible">
			<el-form :model="form" style="text-align:center;">
				<!-- <el-input class="deliveryInput" v-model="form.delivery_code" style="text-align:center;" auto-complete="off" ></el-input> -->
				<input type="text" class="deliveryInput" v-model="form.delivery_code" placeholder="请输入提货码">
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="delivery">确认提货</el-button>
				<el-button @click="cancel">取 消</el-button>
			</div>
			<div class="tipsWrap">
				<ul class="tips">
					<li>1、每笔订单都会生成相应的提货码</li>
					<li>2、请客户出示订单的提货码</li>
					<li>3、输入提货码，确定后提货成功</li>
					<li>4、一旦提货后将不可逆转，请谨慎操作</li>
				</ul>
			</div>
		</el-dialog>
	</section>
</template>

<script type="text/ecmascript-6">
import NProgress from 'nprogress'
import { getOrderLists, getOrderList, getReport, takeDelivery } from 'api/api'
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
				tel: '',
				order_id: ''
			},
			reportList: {
				total: 0,
				st_1: 0,
				st_2: 0,
				st_3: 0,
				tihuo: 0,
				outtihuo: 0
			},
			activeName2: 'one',
			tableData: [],
			dialogFormVisible: false,
			form: {
				delivery_code: ''
			},
			actionStatus: 1,
			currentPage: 1,
			pageTotal: 0,
			pageSize: 0,
			curState: '',
			curPage: 1,
			stime: '',
			etime: ''
		}
	},
	created() {
		// document.title = '格信商城-队列资料'
	},
	mounted() {
		NProgress.start()
		this.getOrderListEnv()
		this.getReportEnv()
	},
	methods: {
		//导出
		exportExcel() {
			let exportUrl = location.protocol + "//" + location.hostname + ':' + location.port + '/api/porder/excel?';
			let body = {}
			body.s_time = this.stime;
			body.e_time = this.etime;
			body.tel = this.editForm.tel;
			body.order_id = this.editForm.order_id;
			switch (this.activeName2) {
				case 'one':
						body.status='';
						break;
				case 'first' :
					body.status='1';
						break;
				case 'second' :
					body.status='2';
						break;
				case 'third' :
					body.status='3';
						break;
			}
			let params = querystring.stringify(body)
			open(exportUrl + params, '_blank')
		},
		cancel() {
			this.dialogFormVisible = false
			this.form.delivery_code = ''
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
					page: this.currentPage
				}
			}
			this.getOrderListEnv(params)
		},
		delivery() {
			if (this.form.delivery_code == '') {
				this.$notify({
					title: '提示',
					message: '还没输入提货码^_^',
					type: 'warning'
				})
				return
			}
			let _this = this
			let params = {
				order_id: this.order_id,
				take_no: this.form.delivery_code
			}
			takeDelivery(params).then((res) => {
				console.log(res)
				if (res.code !== 200) {
					this.$notify.error({
						title: '提示',
						message: res.message
					})
				} else {
					this.dialogFormVisible = false
					this.$notify({
						title: '提示',
						message: res.message,
						type: 'success'
					})
					this.getOrderListEnv()
					this.form.delivery_code = ''
				}
			})
			console.log('确认提货')
		},
		takeGoods(item) {
			this.dialogFormVisible = true
			this.order_id = item.order_id
			console.log(this.order_id)
		},
		handleClick(tab, event) {
			console.log(tab, event)
			this.curState = tab.index - 0
			this.currentPage = 1
			// this.getOrderListEnv(this.curState)
			if (this.curState == 0) {
				this.curState = ''
			}
			let params = {
				params: {
					tel: this.editForm.tel,
					order_id: this.editForm.order_id,
					stime: this.stime,
					etime: this.etime,
					status: this.curState,
					page: this.curPage
				}
			}
			this.getOrderListEnv(params)
		},
		dateChange(val) {
			this.stime = val.split(' - ')[0]
			this.etime = val.split(' - ')[1]
			console.log(val)
		},
		getReportEnv() {
			let _this = this
			getReport().then((res) => {
				console.log(res)
				if (res.code !== 200) {
					this.$notify.error({
						title: '提示',
						message: res.message
					})
				} else {
					let data = res.data.cnt
					_this.reportList.total = data.total
					_this.reportList.st_1 = data.st_1
					_this.reportList.st_2 = data.st_2
					_this.reportList.st_3 = data.st_3
					_this.reportList.tk_ok = data.tk_ok || 0
					_this.reportList.tk_no = data.tk_no || 0
					_this.reportList.tk_3 = data.tk_3 || 0
				}

				NProgress.done()
			})
		},
		getOrderListEnv(params) {
			if (!params) {
				params = {
					params: {
						tel: this.editForm.tel,
						order_id: this.editForm.order_id,
						stime: this.stime,
						etime: this.etime,
						status: this.curState,
						page: this.curPage
					}
				}
			}
			let _this = this
			getOrderList(params).then((res) => {
				console.log(res)
				if (res.code == 2) {
					_this.$router.replace('/login')
				}
				if (res.code !== 200) {
					this.$notify.error({
						title: '提示',
						message: res.message
					})
				} else {
					let data = res.data.cnt.data
					_this.pageTotal = res.data.cnt.total - 0
					_this.pageSize = res.data.cnt.per_page - 0
					data.forEach((value, index) => {
						switch (value.status) {
							case 1:
								value.status = '收益中'
								break
							case 2:
								value.status = '兑换中'
								break
							case 3:
								value.status = '已完成'
								break
							case 4:
								value.status = '已拒绝'
								break
						}
						value.cur_id = index + 1
					})
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

				NProgress.done()
			})
		},
		submitForm(formName) {
			if (this.curState == 0) {
				this.curState = ''
			}
			let params = {
				params: {
					tel: this.editForm.tel,
					order_id: this.editForm.order_id,
					stime: this.stime,
					etime: this.etime,
					status: this.curState,
					page: this.curPage
				}
			}
			this.getOrderListEnv(params)
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
		.tipsWrap
			display: block
			text-align: center
			margin-top: 15px
.el-dialog--small
	width: 40%
	.tips
		display: inline-block
		margin: 0 auto
		text-align: left
		line-height: 1.6
		margin-top: 22px
		font-size: 12px
		li
			margin-bottom: 6px
			font-size: 12px
			color: #848282
  	
</style>
