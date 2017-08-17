<template>
	<section style="width:100%">
		<el-form :inline="true" :model="editForm" class="demo-form-inline">
		  <el-form-item label="时间范围选择：" >
			  <el-date-picker style="width: 400px;"
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
		<p style="margin-bottom: 15px;color: rgb(96, 115, 133);"><span class="label">用户余额：</span><span class="value" v-text="curMoney + ' 元'" style="font-weight:bold;font-size:18px!important;"></span></p>
  	<el-table
		    :data="tableData"
		    stripe
		    style="width: 100%">
	    <el-table-column
	      prop="order_sn"
	      label="订单号">
	    </el-table-column>
	    <el-table-column
	      prop="created_at"
	      label="发生时间">
	    </el-table-column>
	    <el-table-column
	      prop="money"
	      label="金额">
	    </el-table-column>
	    <el-table-column
	      prop="note"
	      label="交易内容">
	    </el-table-column>
	  </el-table>
	</section>
</template>

<script type="text/ecmascript-6">
	import NProgress from 'nprogress'
	import { getMemberList, getBalance, getBalanceLog } from 'api/api'
	import { dateFormat } from 'common/js/dateFormat.js'

  export default {
  	data() {
			return {
				dateValue: '',
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
				tableData: [],
        dialogFormVisible: false,
        form: {
        	delivery_code: 1000
        },
        curMoney: '',
        stime: '',
        etime: ''
			}
		},
		created() {
			// document.title = '格信商城-会员流水'
			this.user_id = this.$route.params.id
		},
		mounted() {
			NProgress.start()
			this.getBalanceEnv()
			this.getBalanceLogEnv()
		},
		methods: {
			getBalanceLogEnv(params) {
				if (!params) {
					params = {
						params: {
							user_id: this.user_id,
							s_time: this.stime,
							e_time: this.etime
						}
					}
				}
				let _this = this
				getBalanceLog(params).then((res) => {
					console.log(res)
					if (res.code !== 200) {
						_this.$notify.error({
							title: '提示',
							message: res.message
						})
					} else {
						_this.tableData = res.data.cnt.balance_log
					}
					NProgress.done()
				})
			},
			getBalanceEnv() {
				let _this = this
				let params = {
					params: {
						user_id: this.user_id
					}
				}
				getBalance(params).then((res) => {
					console.log(res)
					if (res.code !== 200) {
						_this.$notify.error({
							title: '提示',
							message: res.message
						})
					} else {
						let data = res.data.cnt
						if (!data) {
							_this.curMoney = 0
							return
						}
						if (!data.balance || data.balance == '') {
							_this.curMoney = 0
							return
						}
						_this.curMoney = data.balance
					}
					
					NProgress.done()
				})
				console.log('确认充值')
			},
			dateChange(val) {
				console.log(val)
				this.stime = val.split(' - ')[0]
				this.etime = val.split(' - ')[1]
			},
			submitForm() {
				let params = {
					params: {
						user_id: this.user_id,
						s_time: this.stime,
	      		e_time: this.etime
					}
				}
      	this.getBalanceLogEnv(params)
      }
		}
  }
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
.tipsWrap
	display: block
	text-align: center
	margin-top: 15px
.tips
	display: inline-block
	margin: 0 auto
	text-align: left
	li
		margin-bottom: 8px
		font-size: 14px
		color: #848282

</style>
