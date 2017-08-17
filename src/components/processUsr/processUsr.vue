<template>
	<section style="width:100%">
		<el-form :inline="true" :model="editForm" class="demo-form-inline">
		  <!--<el-form-item label="时间范围选择:" >
			  <el-date-picker style="width: 360px;"
			      v-model="dateValue"
			      @change="dateChange"
			      type="datetimerange"
			      :picker-options="pickerOptions"
			      placeholder="选择时间范围"
			      align="right">
		    </el-date-picker>
	    </el-form-item>-->
        <el-form-item>
            <el-input v-model="tel" placeholder="手机号"></el-input>
          </el-form-item>
		  <el-form-item>
		    <el-button type="primary" icon="search" @click="submitForm">搜索</el-button>
		  </el-form-item>
		</el-form>
		<el-table
		    :data="tableData"
		    style="width: 100%; margin: 15px;">
	    <el-table-column 
	      prop="cur_id"
	      label="#"
	      sortable
	      width="80">
	    </el-table-column>
	    <el-table-column 
	      prop="order_sn"
	      label="订单号"
	      sortable>
	    </el-table-column>
	    <el-table-column 
	      prop="created_at"
	      label="发生时间"
	      sortable>
	    </el-table-column>
	    <el-table-column
	      prop="user_mobile"
	      label="手机号"
	      sortable>
	    </el-table-column>
	    <el-table-column
	      prop="money"
	      sortable
	      label="金额">
	    </el-table-column>
	    <el-table-column
	      prop="note"
	      sortable
	      label="内容">
	    </el-table-column>
	    <el-table-column
	      prop="user_name"
	      sortable
	      label="用户">
	    </el-table-column>
	    <el-table-column
	      prop="action_usr"
	      sortable
	      label="操作人">
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
	  <!-- <el-dialog title="提货" :visible.sync="dialogFormVisible">
		  <el-form :model="form" style="text-align:center;">
		    <el-input class="deliveryInput" v-model="form.delivery_code" auto-complete="off" placeholder="请输入提货码"></el-input>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="delivery">确认提货</el-button>
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		  </div>
	    <div class="tipsWrap">
		    <ul class="tips">
		    	<li>1.每笔订单都会生成相应的提货码</li>
		    	<li>2.请客户出示订单的提货码</li>
		    	<li>3.输入提货码，确定后提货成功</li>
		    	<li>4.一旦提货后将不可逆转，请谨慎操作</li>
		    </ul>
	    </div>
		</el-dialog> -->
	</section>
</template>

<script type="text/ecmascript-6">
	import NProgress from 'nprogress'
	import { getShopUserLog, getMerchantProcess } from 'api/api'
	import { dateFormat } from 'common/js/dateFormat.js'

  export default {
  	data() {
			return {
            tel:'',
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
        editForm: {},
				tableData: null,
        dialogFormVisible: false,
        form: {
        	delivery_code: ''
        },
        actionStatus: 1,
        currentPage: 1,
        pageTotal: 0,
        pageSize: 0
			}
		},
		created() {
			// document.title = '格信商城-商户收入流水'
		},
		mounted() {
			NProgress.start()
			this.getShopUserLogEnv()
		},
		methods: {
			delivery() {

			},
			submitForm() {
                this.currentPage=1;
				this.getShopUserLogEnv()
			},
			handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val
        this.getShopUserLogEnv()
        // ajax
        
      },
			handleClick(tab, event) {
				console.log(tab, event)
			},
			dateChange(val) {
				this.stime = val.split(' - ')[0]
				this.etime = val.split(' - ')[1]
				console.log(val)
			},
			getShopUserLogEnv() {
                let page=this.currentPage;
                let s_time=this.stime||'';
                let e_time=this.etime||'';
                let tel=this.tel;				
				let	params = {
						params: {
                            page:page,
                            s_time:s_time,
                            e_time:e_time,
                            tel:tel
                        }
					}
				
				let _this = this
				getShopUserLog(params).then((res) => {
					console.log(res)
					if (res.code !== 200) {
						this.$notify({
							title: '提示',
							message: res.message,
							type: 'fail'
						})
					} else {
						if (!res.data.cnt.data) {
							_this.tableData = null
							return
						}
						let data = res.data.cnt.data
						_this.pageTotal = res.data.cnt.total - 0
						_this.pageSize = res.data.cnt.per_page - 0
						data.forEach((value, index) => {
							value.cur_id = index - 0 + 1
							switch(value.status) {
								case 0:
									value.status = '待付款'
									break
								case 1:
									value.status = '收益中'
									break
								case 2:
									value.status = '兑换中'
									break
								case 3:
									value.status = '已兑换'
									break
							}
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
  // .deliveryInput
  // 	width: 300px
  // 	margin: 0 auto
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
  	
</style>
