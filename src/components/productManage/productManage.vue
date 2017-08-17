<template>
	<section style="width:100%">
		<el-form :inline="true" :model="editForm" class="demo-form-inline">
		  <el-form-item label="手机号:">
		    <el-input v-model="editForm.tel" placeholder="手机号"></el-input>
		  </el-form-item>
		  <el-form-item label="订单号:">
		    <el-input v-model="editForm.order_id" placeholder="订单号"></el-input>
		  </el-form-item>
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
			      sortable
			      width="80">
			    </el-table-column>
			    <el-table-column 
			      prop="order_sn"
			      label="订单号"
			      sortable
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="tel"
			      label="手机号"
			      sortable
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="created_at"
			      sortable
			      label="时间">
			    </el-table-column>
			    <el-table-column
			      prop="total_amount"
			      sortable
			      label="金额">
			    </el-table-column>
			    <el-table-column
			      prop="good_status"
			      sortable
			      label="商品状态">
			    </el-table-column>
			    <el-table-column
			      prop="status"
			      sortable
			      label="订单状态">
			    </el-table-column>
			    <el-table-column
			      prop="operation"
			      label="操作">
			      <template scope="scope">
			        <el-button @click="takeGoods(scope.row)" type="primary" size="small" v-if="scope.row.status === '待提货'" v-text="">提货</el-button>
			      </template>
			      <!-- <template scope="scope">
			        <el-button @click="takeGoods(scope.row)" type="primary" size="small" v-if="scope.row.status === '已支付'" v-text="">发货</el-button>
			      </template> -->
			    </el-table-column>
			  </el-table>
	    </el-tab-pane>
	    <el-tab-pane label="未支付" name="two">
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
			      sortable
			      width="80">
			    </el-table-column>
			    <el-table-column 
			      prop="order_sn"
			      label="订单号"
			      sortable
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="tel"
			      label="手机号"
			      sortable
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="created_at"
			      sortable
			      label="时间">
			    </el-table-column>
			    <el-table-column
			      prop="total_amount"
			      sortable
			      label="金额">
			    </el-table-column>
			    <el-table-column
			      prop="good_status"
			      sortable
			      label="商品状态">
			    </el-table-column>
			    <el-table-column
			      prop="status"
			      sortable
			      label="订单状态">
			    </el-table-column>
			    <el-table-column
			      prop="operation"
			      label="操作">
			      <template scope="scope">
			        <el-button @click="takeGoods(scope.row)" type="primary" size="small" v-if="scope.row.status === '待提货'" v-text="">提货</el-button>
			      </template>
			      <!-- <template scope="scope">
			        <el-button @click="takeGoods(scope.row)" type="primary" size="small" v-if="scope.row.status === '已支付'" v-text="">发货</el-button>
			      </template> -->
			    </el-table-column>
			  </el-table>
	    </el-tab-pane>
	    <el-tab-pane label="已支付" name="three">
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
				      sortable
				      width="80">
				    </el-table-column>
				    <el-table-column 
				      prop="order_sn"
				      label="订单号"
				      sortable
				      width="180">
				    </el-table-column>
				    <el-table-column
				      prop="tel"
				      label="手机号"
				      sortable
				      width="180">
				    </el-table-column>
				    <el-table-column
				      prop="created_at"
				      sortable
				      label="时间">
				    </el-table-column>
				    <el-table-column
				      prop="total_amount"
				      sortable
				      label="金额">
				    </el-table-column>
				    <el-table-column
				      prop="good_status"
				      sortable
				      label="商品状态">
				    </el-table-column>
				    <el-table-column
				      prop="status"
				      sortable
				      label="订单状态">
				    </el-table-column>
				    <el-table-column
				      prop="operation"
				      label="操作">
				      <template scope="scope">
				        <el-button @click="takeGoods(scope.row)" type="primary" size="small" v-if="scope.row.status === '待提货'" v-text="">提货</el-button>
				      </template>
				      <!-- <template scope="scope">
				        <el-button @click="takeGoods(scope.row)" type="primary" size="small" v-if="scope.row.status === '已支付'" v-text="">发货</el-button>
				      </template> -->
				    </el-table-column>
				  </el-table>
	    </el-tab-pane>
	    <el-tab-pane label="待提货" name="four">
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
			      sortable
			      width="80">
			    </el-table-column>
			    <el-table-column 
			      prop="order_sn"
			      label="订单号"
			      sortable
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="tel"
			      label="手机号"
			      sortable
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="created_at"
			      sortable
			      label="时间">
			    </el-table-column>
			    <el-table-column
			      prop="total_amount"
			      sortable
			      label="金额">
			    </el-table-column>
			    <el-table-column
			      prop="good_status"
			      sortable
			      label="商品状态">
			    </el-table-column>
			    <el-table-column
			      prop="status"
			      sortable
			      label="订单状态">
			    </el-table-column>
			    <el-table-column
			      prop="operation"
			      label="操作">
			      <template scope="scope">
			        <el-button @click="takeGoods(scope.row)" type="primary" size="small" v-if="scope.row.status === '待提货'">提货</el-button>
			      </template>
			      <!-- <template scope="scope">
			        <el-button @click="takeGoods(scope.row)" type="primary" size="small" v-if="scope.row.status === '已支付'" v-text="">发货</el-button>
			      </template> -->
			    </el-table-column>
			  </el-table>
	    </el-tab-pane>
	    <el-tab-pane label="已提货" name="five">
	    	<el-table
				    :data="tableData"
				    stripe
				    style="width: 100%">
			    <el-table-column 
			      prop="cur_id"
			      label="#"
			      sortable
			      width="80">
			    </el-table-column>
			    <el-table-column 
			      prop="order_sn"
			      label="订单号"
			      sortable
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="tel"
			      label="手机号"
			      sortable
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="created_at"
			      sortable
			      label="时间">
			    </el-table-column>
			    <el-table-column
			      prop="total_amount"
			      sortable
			      label="金额">
			    </el-table-column>
			    <el-table-column
			      prop="good_status"
			      sortable
			      label="商品状态">
			    </el-table-column>
			    <el-table-column
			      prop="status"
			      sortable
			      label="订单状态">
			    </el-table-column>
			    <el-table-column
			      prop="operation"
			      label="操作">
			      <template scope="scope">
			        <el-button @click="takeGoods(scope.row)" type="primary" size="small" v-if="scope.row.status === '待提货'" v-text="">提货</el-button>
			      </template>
			      <!-- <template scope="scope">
			        <el-button @click="takeGoods(scope.row)" type="primary" size="small" v-if="scope.row.status === '已支付'" v-text="">发货</el-button>
			      </template> -->
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
	  <el-dialog title="提货" :visible.sync="dialogFormVisible">
		  <el-form :model="form" style="text-align:center;">
		    <!-- <el-input style="" class="deliveryInput" v-model="form.delivery_code" auto-complete="off" placeholder="请输入提货码"></el-input> -->
		    <input type="number" class="deliveryInput" v-model="form.delivery_code" placeholder="请输入提货码">
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
		</el-dialog>
	</section>
</template>

<script type="text/ecmascript-6">
	import NProgress from 'nprogress'
	import { getOrderLists, takeDelivery, orderEdit } from 'api/api'
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
				// dateValue: [new Date(2017, 8, 6, 10, 10), new Date(2017, 8, 9, 10, 10)],
				dateValue: '',
				//编辑界面数据
				editForm: {
					tel: '',
					order_id: ''
				},
				activeName2: 'first',
				tableData: null,
        dialogFormVisible: false,
        form: {
        	delivery_code: ''
        },
        actionStatus: 1,
        currentPage: 1,
        pageTotal: 0,
        pageSize: 0,
        curState: '',
        stime: '',
        etime: ''
			}
		},
		created() {
			// document.title = '格信商城-队列资料'
		},
		mounted() {
			NProgress.start()
			this.getOrderListsEnv()
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
						status: this.curState,
	      		tel: this.editForm.tel,
	      		order_sn: this.editForm.order_id,
	      		start_time: this.stime,
	      		end_time: this.etime
					}
				}
        this.getOrderListsEnv(params)
      },
			delivery() {
				this.dialogFormVisible = false
				let _this = this
				let params = {
					id: this.item.id,
					code: this.form.delivery_code
				}
				orderEdit(params).then((res) => {
					console.log(res)
					if (res.code !== 200) {
						_this.$notify.error({
							title: '提示',
							message: res.message
						})
					} else {
						let data = res
						_this.$notify({
							title: '提示',
							message: res.message,
							type: 'success'
						})
						_this.item.status = '已提货'
					}
				})
			},
			takeGoods(item) {
				this.item = item
				this.dialogFormVisible = true
				this.order_sn = item.order_sn
			},
			handleClick(tab, event) {
				this.curState = tab.index - 0 - 1
				if (this.curState == -1) {
					this.curState = ''
				}
				let params = {
					params: {
						status: this.curState,
	      		tel: this.editForm.tel,
	      		order_sn: this.editForm.order_id,
	      		start_time: this.stime,
	      		end_time: this.etime
					}
				}
				this.getOrderListsEnv(params)
			},
			dateChange(val) {
				this.stime = val.split(' - ')[0]
				this.etime = val.split(' - ')[1]
				console.log(val)
			},
			getOrderListsEnv(params) {
				let _this = this
				if (!params) {
					params = {
						params: {
							status: this.curState,
		      		tel: this.editForm.tel,
		      		order_sn: this.editForm.order_id,
		      		start_time: this.stime,
		      		end_time: this.etime
						}
					}
				}
				getOrderLists(params).then((res) => {
					console.log(res)
					if (res.code !== 200) {
						this.$notify({
							title: '提示',
							message: res.message,
							type: 'fail'
						})
					} else {
						let data = res.data.cnt.data
						_this.pageTotal = res.data.cnt.total - 0
						_this.pageSize = res.data.cnt.per_page - 0
						data.forEach((value, index) => {
							value.cur_id = index - 0 + 1
							switch(value.status) {
								case 0:
									value.status = '未支付'
									break
								case 1:
									value.status = '已支付'
									break
								case 2:
									value.status = '待提货'
									break
								case 3:
									value.status = '已提货'
									break
							}
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
						_this.pageTotal = res.data.cnt.total - 0
						_this.pageSize = res.data.cnt.per_page - 0
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
      	let params = {
      		params: {
      			status: this.curState,
	      		tel: this.editForm.tel,
	      		order_sn: this.editForm.order_id,
	      		start_time: this.stime,
	      		end_time: this.etime
      		}
      	}
      	this.getOrderListsEnv(params)
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
