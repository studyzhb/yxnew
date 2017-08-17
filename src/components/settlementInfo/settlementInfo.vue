<template>
	<section style="width:100%">
		<el-form :inline="true" :model="editForm" class="demo-form-inline">
		  <el-form-item label="时间范围选择:" >
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
	    <el-tab-pane label="全部" name="first">
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
			      prop="shopname"
			      label="姓名"
			      sortable
			      width="120">
			    </el-table-column>
			    <el-table-column
			      prop="bank"
			      label="开户行"
			      sortable
			      width="120">
			    </el-table-column>
			    <el-table-column
			      prop="bank_card"
			      label="卡号"
			      sortable
			      width="100">
			    </el-table-column>
			    <el-table-column
			      prop="status"
			      sortable
			      label="状态">
			    </el-table-column>
			    <el-table-column
			      prop="money"
			      sortable
			      label="金额">
			    </el-table-column>
			    <el-table-column
			      prop="created_at"
			      sortable
			      label="时间">
			    </el-table-column>
			  </el-table>
	    </el-tab-pane>
	    <el-tab-pane label="未审核" name="second">
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
			      prop="shopname"
			      label="姓名"
			      sortable
			      width="120">
			    </el-table-column>
			    <el-table-column
			      prop="bank"
			      label="开户行"
			      sortable
			      width="120">
			    </el-table-column>
			    <el-table-column
			      prop="bank_card"
			      label="卡号"
			      sortable
			      width="100">
			    </el-table-column>
			    <el-table-column
			      prop="status"
			      sortable
			      label="状态">
			    </el-table-column>
			    <el-table-column
			      prop="money"
			      sortable
			      label="金额">
			    </el-table-column>
			    <el-table-column
			      prop="created_at"
			      sortable
			      label="时间">
			    </el-table-column>
			  </el-table>
	    </el-tab-pane>
	    <el-tab-pane label="已审核" name="third">
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
			      prop="shopname"
			      label="姓名"
			      sortable
			      width="120">
			    </el-table-column>
			    <el-table-column
			      prop="bank"
			      label="开户行"
			      sortable
			      width="120">
			    </el-table-column>
			    <el-table-column
			      prop="bank_card"
			      label="卡号"
			      sortable
			      width="100">
			    </el-table-column>
			    <el-table-column
			      prop="status"
			      sortable
			      label="状态">
			    </el-table-column>
			    <el-table-column
			      prop="money"
			      sortable
			      label="金额">
			    </el-table-column>
			    <el-table-column
			      prop="created_at"
			      sortable
			      label="时间">
			    </el-table-column>
			  </el-table>
	    </el-tab-pane>
	    <el-tab-pane label="拒绝" name="four">
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
			      prop="shopname"
			      label="姓名"
			      sortable
			      width="120">
			    </el-table-column>
			    <el-table-column
			      prop="bank"
			      label="开户行"
			      sortable
			      width="120">
			    </el-table-column>
			    <el-table-column
			      prop="bank_card"
			      label="卡号"
			      sortable
			      width="100">
			    </el-table-column>
			    <el-table-column
			      prop="status"
			      sortable
			      label="状态">
			    </el-table-column>
			    <el-table-column
			      prop="money"
			      sortable
			      label="金额">
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
	  <!-- 弹窗1 -->
	  <!-- <el-dialog title="提现审核" :visible.sync="dialogFormVisible">
		  <el-form :model="form" class="formBox">
		  	<p class="rechargeItem">时间到账: <span v-text="form.actual"></span></p>
		  	<p class="rechargeItem">兑换积分: <span v-text="form.total"></span></p>
		  	<p class="rechargeItem">服务费: <span v-text="form.poundage"></span></p>
		  	<p class="rechargeItem">单号: <span v-text="form.order_id"></span></p>
		  	<p class="rechargeItem">姓名: <span v-text="form.user_name"></span></p>
		  	<p class="rechargeItem">身份证号: <span v-text="form.id_card"></span></p>
		  	<p class="rechargeItem">银行卡号: <span v-text="form.bank_code"></span></p>
		  </el-form>
		  <div class="tipsWrap">
		    <ul class="tips">
		    	<li>1.请仔细核对积分</li>
		    	<li>2.确认审核时，请尽量查看用户出局记录是否正常</li>
		    	<li>3.此操作是不可以逆转的，请谨慎操作</li>
		    </ul>
	    </div>
		  <div slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="confirmToExamine">确认审核</el-button>
		    <el-button @click="dialogFormVisible = false">取消</el-button>
		  </div>
		</el-dialog> -->
		<!-- 弹窗2 -->
		<!-- <el-dialog title="请输入拒绝理由" :visible.sync="dialogFormVisible2">
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
		</el-dialog> -->
	</section>
</template>

<script type="text/ecmascript-6">
	import NProgress from 'nprogress'
	import { getWithdrawInfo } from 'api/api'
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
        editForm: {},
				dateValue: '',
				activeName2: 'first',
				tableData: null,
        dialogFormVisible: false,
        dialogFormVisible2: false,
        stime: '',
        etime: '',
        curState: '',
        form: {
        	actual: '',
        	total: 0,
        	poundage: '',
        	order_id: '',
        	user_name: '',
        	id_card: '',
        	bank_code: '',
        },
        form2: {
        	reason: ''
        },
        currentPage: 1,
        pageTotal: 0,
        pageSize: 0
			}
		},
		created() {
			// document.title = '结算明细'
		},
		mounted() {
			NProgress.start()
			this.getWithdrawInfoEnv()
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
				let params = {
					params: {
						page: this.currentPage,
						beginTime: this.stime,
						endTime: this.etime,
						status: this.curState
					}
				}
        this.currentPage = val
        this.getWithdrawInfoEnv(params)
      },
			handleClick(tab, event) {
				this.curState = tab.index - 0
				if (this.curState == 0) {
					this.curState = ''
				}
				let params = {
					params: {
						status: this.curState,
	      		beginTime: this.stime,
	      		endTime: this.etime
					}
				}
				this.getWithdrawInfoEnv(params)
			},
			confirmToExamine() {
				
			},
			dateChange(val) {
				console.log(val)
				this.stime = val.split(' - ')[0]
				this.etime = val.split(' - ')[1]
			},
			submitForm() {
				let _this = this
      	let params = {
      		params: {
	      		beginTime: this.stime,
						endTime: this.etime,
						status: this.curState
      		}
      	}
      	this.getWithdrawInfoEnv(params)
			},
			getWithdrawInfoEnv(params) {
				if (!params) {
					params = {
						params: {
							beginTime: this.stime,
							endTime: this.etime,
							status: this.curState
						}
					}
				}
				let _this = this
				getWithdrawInfo(params).then((res) => {
					console.log(res)
					if (res.code !== 200) {
						if (res.message == '未登录') {
							_this.$router.replace('/login')
						}
						this.$notify.error({
							title: '提示',
							message: res.message
						})
					} else {
						let data = res.data.cnt.data
						_this.pageTotal = res.data.cnt.total - 0
						_this.pageSize = res.data.cnt.per_page - 0
						data.forEach((value, index) => {
							value.cur_id = index + 1
						})
						_this.tableData = data
					}
					
					NProgress.done()
				})
			}
		}
  }
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
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
