<template>
	<section style="width:100%">
		<el-row style="font-size: 24px;color: rgba(4, 4, 4, 0.68);padding: 10px; padding-bottom: 25px; border-radius:2px;">
		  <el-col :span="6">
		  	<div class="grid-content bg-purple" style="padding: 11px 0;font-weight:bold;">
		  		<span style="font-size:16px;">账户余额：</span>{{money_all}}<span style="font-size:15px;"> 元</span>
		  		<el-button v-show="this.curState === 1" @click="apply" type="primary" size="small" style="display:inline-block;vertical-align:top;">申请结算</el-button>
		  	</div>
		  </el-col>
		  <el-col :span="4"v-show="this.curState === 1" style="transition:all .3s">
		  	<div class="grid-content bg-purple-light" style="padding: 11px 0;font-weight:bold;"><span style="font-size:16px;">提现中：</span>{{no_finished}}<span style="font-size:16px;"> 元</span></div>
		  </el-col>
		  <el-col :span="4" v-show="this.curState === 1">
		  	<div class="grid-content bg-purple-light" style="padding: 11px 0;"><span style="font-size:16px;">已到账：</span>{{finished}}<span style="font-size:16px;"> 元</span></div>
		  </el-col>
		  <el-col :span="4" style="padding:11px 0;" v-show="this.curState === 1">
		  	<router-link style="display:inline-block;vertical-align:bottom;" class="el-button el-button--primary el-button--small" :to="'/settlementInfo'" type="primary">结算明细</router-link>
		  </el-col>
		</el-row>
		<el-form :inline="true" :model="editForm" class="demo-form-inline">
		  <el-form-item label="时间范围选择:" >
			  <el-date-picker style="width:360px;"
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
	    <el-tab-pane label="分润金" name="first">
	    	<el-table
				    :data="tableData"
				    stripe
				    style="width: 100%">
				  <!-- <el-table-column type="expand">
				  	<template scope="props">
			        <el-form label-position="left" inline class="demo-table-expand" v-for="(good, index) in props.row.good" :key="good">
			          <el-form-item label="商品名称: ">
			            <span>{{ good.good_name }}</span>
			          </el-form-item>
			          <el-form-item label="商品价格: ">
			            <span>{{ good.good_price }}</span>
			          </el-form-item>
			        </el-form>
			      </template>
				  </el-table-column> -->
			    <el-table-column
			      prop="cur_id"
			      label="#"
			      width="80">
		    	</el-table-column>
			    <el-table-column
			      prop="order_sn"
			      label="订单号"
			      sortable>
			    </el-table-column>
			    <el-table-column
			      prop="phone"
			      label="用户"
			      sortable>
			    </el-table-column>
			    <el-table-column
			      prop="good_name"
			      sortable
			      label="商品">
			    </el-table-column>
			    <el-table-column
			      prop="money"
			      sortable
			      label="金额">
			    </el-table-column>
			    <el-table-column
			      prop="other_money"
			      sortable
			      label="分润">
			    </el-table-column>
			    <el-table-column
			      prop="created_at"
			      sortable
			      label="时间">
			    </el-table-column>
			  </el-table>
	    </el-tab-pane>
	    <el-tab-pane label="助推金" name="second">
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
			      prop="order_sn"
			      label="订单号"
			      sortable>
			    </el-table-column>
			    <el-table-column
			      prop="phone"
			      label="用户"
			      sortable>
			    </el-table-column>
			    <el-table-column
			      prop="good_name"
			      sortable
			      label="商品">
			    </el-table-column>
			    <el-table-column
			      prop="money"
			      sortable
			      label="金额">
			    </el-table-column>
			    <el-table-column
			      prop="other_money"
			      sortable
			      label="分润">
			    </el-table-column>
			    <el-table-column
			      prop="created_at"
			      sortable
			      label="时间">
			    </el-table-column>
			  </el-table>
	    </el-tab-pane>
	  </el-tabs>
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
		<el-dialog title="申请结算" :visible.sync="dialogFormVisible2">
		  <!-- <el-input class="deliveryInput" v-model="form2.money" auto-complete="off" placeholder="请输入金额" style="margin: 0 auto;"></el-input> -->
		  <input type="number" class="deliveryInput" v-model="form2.money" placeholder="请输入金额" style="display:block;">
		  <el-form :model="form2" class="formBox" style="width: 220px;">
		    <p class="rechargeItem" style="color: red;font-size: 20px !important; text-align: center; margin: 15px 0">可结算金额{{money_all}}元</p>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="recharge2">确认结算</el-button>
		    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
		  </div>
		</el-dialog>
	  
	</section>
</template>

<script type="text/ecmascript-6">
	import NProgress from 'nprogress'
	import { getExServ, getProfit, getCapital, withdrawal, servInfo } from 'api/api'
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
					tel: ''
				},
				form: {
        	actual: '',
        	total: 0,
        	poundage: '',
        	order_id: '',
        	user_name: '',
        	id_card: '',
        	bank_code: '',
        },
        tableData: [],
        dialogFormVisible2: false,
				activeName2: 'first',
        actionStatus: 1,
        total: 100,
        finished: 0,
        no_finished: 0,
        money_all: 0,
        settled: 0,
        currentPage: 1,
        pageTotal: 0,
        pageSize: 0,
        curState: 1,
        stime: '',
        etime: '',
				form2: {
					money: ''
				}
			}
		},
		created() {
			// document.title = '结算明细'
		},
		mounted() {
			NProgress.start()
			this.getCapitalEnv()
			this.getProfitEnv()
		},
		methods: {
			handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val
      },
      recharge2() {
      	if (this.form2.money == '') {
      		this.$notify({
						title: '提示',
						message: res.message,
						type: 'warning'
					})
      		return
      	}
				let params = {
					money: this.form2.money
				}
				let _this = this
				withdrawal(params).then((res) => {
					console.log(res)
					if (res.code !== 200) {
						_this.$notify({
							title: '提示',
							message: res.message,
							type: 'fail'
						})
					} else {
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
      apply() {
      	this.dialogFormVisible2 = true
      },
      getCapitalEnv() {
      	let _this = this
      	let params = {}
				getCapital(params).then((res) => {
					console.log(res)
					if (res.code !== 200) {
						if (res.message == '未登录') {
							_this.$router.replace('/login')
						}
						_this.$notify({
							title: '提示',
							message: res.message,
							type: 'fail'
						})
					} else {
						let data = res.data.cnt
						console.log(data)
						_this.money_all = data.money_all - 0
						_this.no_finished = data.no_finished - 0
      			_this.finished = data.finished
					}
					NProgress.done()
				})
      },
      getProfitEnv(params) {
      	let _this = this
      	if (!params) {
      		params = {
      			type: this.curState,
      			beginTime: this.stime,
      			endTime: this.etime
      		}
      	}
				getProfit(params).then((res) => {
					console.log(res)
					if (res.code !== 200) {
						_this.tableData = null
						_this.$notify.error({
							title: '提示',
							message: res.message
						})
					} else {
						let data = res.data.cnt.data
						if (!data) return
						_this.pageTotal = res.data.cnt.total - 0
						_this.pageSize = res.data.cnt.per_page - 0
						data.forEach((value, index) => {
							value.cur_id = index - 0 + 1
						})
						_this.tableData = data
					}
					NProgress.done()
				})
      },
			submitForm() {
				let _this = this
      	let params = {
      		params: {
	      		type: this.curState,
	      		beginTime: this.stime,
	      		endTime: this.etime
      		}
      	}
      	this.getProfitEnv(params)
			},
			handleClick(tab, event) {
				this.curState = tab.index - 0 + 1
				let params = {
					params: {
						type: this.curState,
	      		beginTime: this.stime,
	      		endTime: this.etime
					}
				}
				this.getProfitEnv(params)
			},
			dateChange(val) {
				console.log(val)
				this.stime = val.split(' - ')[0]
				this.etime = val.split(' - ')[1]
			}
		}
  }
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
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
		line-height: 1.6
		li
			margin-bottom: 8px
			font-size: 14px
			color: #848282
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
  	
</style>
