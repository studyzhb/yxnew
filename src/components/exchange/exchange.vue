<template>
	<section style="width:100%">
		<el-form :inline="true" :model="editForm" class="demo-form-inline">
		  <el-form-item label="手机号:">
		    <el-input v-model="editForm.user_mobile" placeholder="手机号"></el-input>
		  </el-form-item>
		  <el-form-item label="时间范围选择：" >
			  <el-date-picker style="width: 300px;"
			      v-model="dateValue"
			      @change="dateChange"
			      type="datetimerange"
			      :picker-options="pickerOptions"
			      placeholder="选择时间范围"
			      align="right">
		    </el-date-picker>
	    </el-form-item>
		  <el-form-item>
		    <el-button type="primary" icon="search" @click="submitForm">搜索</el-button>
		  </el-form-item>
		</el-form>
		<el-tabs v-model="activeName2" type="card" @tab-click="handleClick" style="margin-top: 15px;">
	    <el-tab-pane label="全部" name="one">
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
			      prop="order_id"
			      label="订单号"
			      sortable>
			    </el-table-column>
			    <el-table-column
			      prop="user_mobile"
			      label="手机号"
			      width="150"
			      sortable>
			    </el-table-column>
			    <el-table-column
			      prop="good_name"
			      label="商品名"
			      width="180"
			      sortable>
			    </el-table-column>
			    <el-table-column
			      prop="actual"
			      label="实收"
			      width="100"
			      sortable>
			    </el-table-column>
			    <el-table-column
			      prop="poundage"
			      label="手续费"
			      width="100"
			      sortable>
			      <template scope="scope">
			      	<div>
			      		{{scope.row.poundage}} ({{scope.row.percent}})
			      	</div>
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="status"
			      sortable
			      width="110"
			      label="状态">
			    </el-table-column>
			    <el-table-column
			      prop="total"
			      sortable
			      width="100"
			      label="积分">
			    </el-table-column>
			    <el-table-column
			      prop="created_at"
			      sortable
			      label="时间">
			    </el-table-column>
			    <el-table-column
			      prop="operation"
			      label="操作">
			      <template scope="scope">
			        <el-button v-if="scope.row.status === '未审核' " type="primary" size="small" @click="toExamine(scope.row)" >审核</el-button>
			        <el-button v-if="scope.row.status === '未审核' " type="warning" size="small" @click="refuseEnv(scope.row)" >拒绝</el-button>
			        <!-- <el-button v-if="scope.row.status === '已审核' " type="primary" size="small" @click="examineOkEnv(scope.row)" >打款</el-button> -->
			        <!-- <el-button type="primary" size="small" @click="viewDetail(scope.row)" >明细</el-button> -->
			        <router-link class="el-button el-button--primary el-button--small" :to="'/introInfo/' + scope.row.order_id" type="success">明细</router-link>
			      </template>
			    </el-table-column>
			  </el-table>
	    </el-tab-pane>
	    <el-tab-pane label="未审核" name="first">
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
			      prop="order_id"
			      label="订单号"
			      sortable>
			    </el-table-column>
			    <el-table-column
			      prop="user_mobile"
			      label="手机号"
			      sortable>
			    </el-table-column>
			    <el-table-column
			      prop="good_name"
			      label="商品名"
			      width="180"
			      sortable>
			    </el-table-column>
			    <el-table-column
			      prop="actual"
			      label="实收"
			      width="100"
			      sortable>
			    </el-table-column>
			    <el-table-column
			      prop="poundage"
			      label="手续费"
			      width="100"
			      sortable>
			      <template scope="scope">
			      	<div>
			      		{{scope.row.poundage}} ({{scope.row.percent}})
			      	</div>
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="status"
			      sortable
			      width="100"
			      label="状态">
			    </el-table-column>
			    <el-table-column
			      prop="total"
			      sortable
			      width="100"
			      label="积分">
			    </el-table-column>
			    <el-table-column
			      prop="created_at"
			      sortable
			      label="时间">
			    </el-table-column>
			    <el-table-column
			      prop="operation"
			      label="操作">
			      <template scope="scope">
			        <el-button v-if="scope.row.status === '未审核' " type="primary" size="small" @click="toExamine(scope.row)" >审核</el-button>
			        <el-button v-if="scope.row.status === '未审核' " type="warning" size="small" @click="refuseEnv(scope.row)" >拒绝</el-button>
			        <!-- <el-button v-if="scope.row.status === '已审核' " type="primary" size="small" @click="examineOkEnv(scope.row)" >打款</el-button> -->
			        <!-- <el-button type="primary" size="small" @click="viewDetail(scope.row)" >明细</el-button> -->
			        <router-link class="el-button el-button--primary el-button--small" :to="'/introInfo/' + scope.row.order_id" type="success">明细</router-link>
			      </template>
			    </el-table-column>
			  </el-table>
	    </el-tab-pane>
	    <el-tab-pane label="已审核" name="second">
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
			      prop="order_id"
			      label="订单号"
			      sortable>
			    </el-table-column>
			    <el-table-column
			      prop="user_mobile"
			      label="手机号"
			      sortable>
			    </el-table-column>
			    <el-table-column
			      prop="good_name"
			      label="商品名"
			      width="180"
			      sortable>
			    </el-table-column>
			    <el-table-column
			      prop="actual"
			      label="实收"
			      width="100"
			      sortable>
			    </el-table-column>
			    <el-table-column
			      prop="poundage"
			      label="手续费"
			      width="100"
			      sortable>
			      <template scope="scope">
			      	<div>
			      		{{scope.row.poundage}} ({{scope.row.percent}})
			      	</div>
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="status"
			      sortable
			      width="100"
			      label="状态">
			    </el-table-column>
			    <el-table-column
			      prop="total"
			      sortable
			      width="100"
			      label="积分">
			    </el-table-column>
			    <el-table-column
			      prop="created_at"
			      sortable
			      label="时间">
			    </el-table-column>
			    <el-table-column
			      prop="operation"
			      label="操作">
			      <template scope="scope">
			        <el-button v-if="scope.row.status === '未审核' " type="primary" size="small" @click="toExamine(scope.row)" >审核</el-button>
			        <el-button v-if="scope.row.status === '未审核' " type="warning" size="small" @click="refuseEnv(scope.row)" >拒绝</el-button>
			        <!-- <el-button v-if="scope.row.status === '已审核' " type="primary" size="small" @click="examineOkEnv(scope.row)" >打款</el-button> -->
			        <!-- <el-button type="primary" size="small" @click="viewDetail(scope.row)" >明细</el-button> -->
			        <router-link class="el-button el-button--primary el-button--small" :to="'/introInfo/' + scope.row.order_id" type="success">明细</router-link>
			      </template>
			    </el-table-column>
			  </el-table>
	    </el-tab-pane>
	    <el-tab-pane label="已拒绝" name="third">
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
			      prop="order_id"
			      label="订单号"
			      sortable>
			    </el-table-column>
			    <el-table-column
			      prop="user_mobile"
			      label="手机号"
			      sortable>
			    </el-table-column>
			    <el-table-column
			      prop="good_name"
			      label="商品名"
			      width="180"
			      sortable>
			    </el-table-column>
			    <el-table-column
			      prop="actual"
			      label="实收"
			      width="100"
			      sortable>
			    </el-table-column>
			    <el-table-column
			      prop="poundage"
			      label="手续费"
			      width="100"
			      sortable>
			      <template scope="scope">
			      	<div>
			      		{{scope.row.poundage}} ({{scope.row.percent}})
			      	</div>
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="status"
			      sortable
			      width="100"
			      label="状态">
			    </el-table-column>
			    <el-table-column
			      prop="total"
			      sortable
			      width="100"
			      label="积分">
			    </el-table-column>
			    <el-table-column
			      prop="created_at"
			      sortable
			      label="时间">
			    </el-table-column>
			    <el-table-column
			      prop="operation"
			      label="操作">
			      <template scope="scope">
			        <el-button v-if="scope.row.status === '未审核' " type="primary" size="small" @click="toExamine(scope.row)" >审核</el-button>
			        <el-button v-if="scope.row.status === '未审核' " type="warning" size="small" @click="refuseEnv(scope.row)" >拒绝</el-button>
			        <!-- <el-button v-if="scope.row.status === '已审核' " type="primary" size="small" @click="examineOkEnv(scope.row)" >打款</el-button> -->
			        <!-- <el-button type="primary" size="small" @click="viewDetail(scope.row)" >明细</el-button> -->
			        <router-link class="el-button el-button--primary el-button--small" :to="'/introInfo/' + scope.row.order_id" type="success">明细</router-link>
			      </template>
			    </el-table-column>
			  </el-table>
	    </el-tab-pane>
	  </el-tabs>
	  <!-- 弹窗1 -->
	  <el-dialog title="提现审核" :visible.sync="dialogFormVisible">
		  <el-form :model="form" class="formBox">
		  	<p  style="font-size:15px;line-height:1.7;">实际到账: <span style="font-size:18px;margin-left:4px;" v-text="form.actual"></span></p>
		  	<p  style="font-size:15px;line-height:1.7;">兑换积分: <span style="font-size:18px;margin-left:4px;" v-text="form.total"></span></p>
		  	<p  style="font-size:15px;line-height:1.7;">服务费: <span style="font-size:18px;margin-left:4px;" v-text="form.poundage"></span></p>
		  	<p  style="font-size:15px;line-height:1.7;">单号: <span style="font-size:18px;margin-left:4px;" v-text="form.order_id"></span></p>
		  	<p  style="font-size:15px;line-height:1.7;">姓名: <span style="font-size:18px;margin-left:4px;" v-text="form.real_name"></span></p>
		  	<p  style="font-size:15px;line-height:1.7;">身份证号: <span style="font-size:18px;margin-left:4px;" v-text="form.id_card"></span></p>
		  	<p  style="font-size:15px;line-height:1.7;">银行卡号: <span style="font-size:18px;margin-left:4px;" v-text="form.card_num"></span></p>
		  </el-form>
		  <div  style="display:block;text-align:center;margin-top:15px;">
		    <ul style="display:inline-block;margin:30px auto;text-align:left;margin-bottom:10px;font-size:12px;color:#99A9BF;line-height:1.5;margin-left:-10%;">
		    	<li>1、请仔细核对积分</li>
		    	<li>2、确认审核时，请尽量查看用户出局记录是否正常</li>
		    	<li>3、此操作是不可以逆转的，请谨慎操作</li>
		    </ul>
	    </div>
		  <div slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="confirmToExamine">确认审核</el-button>
		    <el-button @click="dialogFormVisible = false">取消</el-button>
		  </div>
		</el-dialog>
		<el-pagination style="text-align:right; padding: 15px 0 0 0;"
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="currentPage"
	      :page-sizes="[50]"
	      :page-size="pageSize"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="pageTotal">
    </el-pagination>
		<!-- 弹窗2 -->
		<el-dialog title="请输入拒绝理由" :visible.sync="dialogFormVisible2">
		  <el-form :model="form2" class="formBox">
		    <el-input class="deliveryInput" v-model="form2.reason" auto-complete="off" placeholder="请输入拒绝理由" style="font-size: 15px;padding: 5px; text-align:left;"></el-input>
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
	import { getEx, getExInfo, exCheck, exRefuse, examineOk, takeDelivery } from 'api/api'
	import { dateFormat } from 'common/js/dateFormat.js'

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
				tableData: [],
        dialogFormVisible: false,
        dialogFormVisible2: false,
        form: {
        	actual: '',
        	total: 0,
        	poundage: '',
        	order_id: '',
        	real_name: '',
        	id_card: '',
        	card_num: '',
        },
        form2: {
        	reason: ''
        },
        curState: '',
        stime: '',
        etime: '',
        pageTotal: 0,
        pageSize: 0,
        curPage: 1,
        currentPage: 1
			}
		},
		created() {
			// document.title = '格信商城-积分兑换'
		},
		mounted() {
			NProgress.start()
			this.getExEnv()
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
						s_time: this.stime,
						e_time: this.etime,
						status: this.curState,
						user_mobile: this.editForm.user_mobile
					}
				}
				this.getExEnv(params)
      },
			recharge2() {
				let params = {
					id: this.item.id,
					note: this.form2.reason
				}
				let _this = this
				exRefuse(params).then((res) => {
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
						this.$notify.error({
							title: '提示',
							message: res.message
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
				exCheck(params).then((res) => {
					console.log(res)
					if (res.code !== 200) {
						_this.$notify.error({
							title: '提示',
							message: res.message
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
						_this.$notify.error({
							title: '提示',
							message: res.message
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
						id: this.item.id
					}
				}
				getExInfo(params).then((res) => {
					console.log(res)
					if (res.code !== 200) {
						this.$notify({
							title: '提示',
							message: res.message,
							type: 'fail'
						})
					} else {
						let data = res.data.cnt
						_this.pageTotal = res.data.cnt.total - 0
						_this.pageSize = res.data.cnt.per_page - 0
						console.log('actual: ' + data.actual)
						_this.form = data
					}
				})
			},
			handleClick(tab, event) {
				console.log(tab.index)
				this.curState = tab.index - 0 - 1
				if (this.curState == -1) {
					this.curState = ''
				}
				console.log(this.curState)
				let params = {
					params: {
						s_time: this.stime,
						e_time: this.etime,
						status: this.curState,
						user_mobile: this.editForm.user_mobile
					}
				}
				this.getExEnv(params)
			},
			dateChange(val) {
				this.stime = val.split(' - ')[0]
				this.etime = val.split(' - ')[1]
				console.log(val)
			},
			getExEnv(params) {
				if (!params) {
					params = {
						params: {
							s_time: this.stime,
							e_time: this.etime,
							status: this.curState,
							user_mobile: this.editForm.user_mobile
						}
					}
				}
				let _this = this
				getEx(params).then((res) => {
					console.log(res)
					if (res.code !== 200) {
						this.$notify.error({
							title: '提示',
							message: res.message
						})
					} else {
						let data = res.data.cnt.ec_info.data
						_this.pageTotal = res.data.cnt.ec_info.total - 0
						_this.pageSize = res.data.cnt.ec_info.per_page - 0
						if (!data) {
							_this.tableData = data
							return
						}
						let arrs = ['cur_id', 'user_mobile', 'card_name', 'card_tip', 'card_num', 'money', 'created_at']
						data.forEach((value, index) => {
							arrs.forEach((val, val_index) => {
								if (value[val] === '') {
									value[val] = '无'
								}
							})
							switch(value.status) {
								case 0:
									value.status = '未审核'
									break
								case 1:
									value.status = '已审核'
									break
								case 2:
									value.status = '已拒绝'
									break
							}
							value.cur_id = index + 1
							// 添加商品名称
							value.good_name = res.data.cnt.q_name
						})
						_this.tableData = data
					}
					NProgress.done()
				})
			},
			submitForm() {
      	let params = {
					params: {
						s_time: this.stime,
						e_time: this.etime,
						status: this.curState,
						user_mobile: this.editForm.user_mobile
					}
				}
      	this.getExEnv(params)
      	console.log(params)
      }
		}
  }
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
  .deliveryInput
  	width: 300px
  	margin: 0 auto
  .rechargeItem
  	margin: 12px 0 !important
  	font-size: 16px !important
  &.add
  	color: red
  	.label
  		width: 100px
  		text-align: right
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
  	
  	li
			margin-bottom: 8px
			font-size: 14px
			color: #848282
  	
</style>
