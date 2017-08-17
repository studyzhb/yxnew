<template>
	<section style="width:100%">
		<el-tabs v-model="activeName2" type="card" @tab-click="handleClick" style="margin-top: 15px;">
		  <el-tab-pane label="队列助推" name="first">
	    	<el-table
				    :data="tableData"
				    stripe
				    style="width: 100%">
			    <el-table-column
			      prop="cur_id"
			      label="#"
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="help_order"
			      label="订单号"
			      width="180">
			    </el-table-column>
			    <el-table-column
			      prop="phone"
			      label="手机号">
			    </el-table-column>
			    <el-table-column
			      prop="help_money"
			      label="助推金额">
			    </el-table-column>
			    <el-table-column
			      prop="good_name"
			      label="购买商品">
			    </el-table-column>
			    <el-table-column
			      prop="created_at"
			      label="购买时间">
			    </el-table-column>
			    <el-table-column
			      prop="status"
			      label="商品状态">
			    </el-table-column>
			    <el-table-column
			      prop="money"
			      label="金额">
			    </el-table-column>
			    <el-table-column
			      prop="take_delivery"
			      label="提货状态">
			    </el-table-column>
			  </el-table>
		  </el-tab-pane>
		  <el-tab-pane label="下级利润助推" name="second">
	    	<el-table
				    :data="tableData"
				    stripe
				    style="width: 100%">
			    <el-table-column
			      prop="cur_id"
			      label="#">
			    </el-table-column>
			    <el-table-column
			      prop="help_order"
			      label="订单号">
			    </el-table-column>
			    <el-table-column
			      prop="tel"
			      label="手机号">
			    </el-table-column>
			    <el-table-column
			      prop="goods"
			      label="购买商品">
			    </el-table-column>
			    <el-table-column
			      prop="created_at"
			      label="购买时间">
			    </el-table-column>
			    <!-- <el-table-column
			      prop="status"
			      label="商品状态"
			      width="180">
			    </el-table-column> -->
			    <el-table-column
			      prop="help_money"
			      label="助推金额">
			    </el-table-column>
			    <el-table-column
			      prop="total_amount"
			      label="订单金额">
			    </el-table-column>
			    <el-table-column
			      prop="status"
			      label="订单状态">
			    </el-table-column>
			  </el-table>
		  </el-tab-pane>
		</el-tabs>
  	
	</section>
</template>

<script type="text/ecmascript-6">
	import NProgress from 'nprogress'
	import { getDlzt, getFrzt } from 'api/api'

  export default {
  	data() {
			return {
				curState: 1,
				activeName2: 'first',
				tableData: [{
          order_id: '',
          user_mobile: '',
          good_name: '',
          create_time: '',
          status: '',
          money: '',
          order_status: ''
        }]
			}
		},
		created() {
			// document.title = '格信商城-队列助推'
			this.user_id = this.$route.params.id
		},
		mounted() {
			NProgress.start()
			this.getDlztEnv()
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event)
				console.log(tab.index - 0 + 1)
				this.curState = tab.index - 0 + 1
				// 队列助推
				if (this.curState == 1) {
					this.getDlztEnv()
				}
				// 下级利润助推
				if (this.curState == 2) {
					this.getFrztEnv()
				}
			},
			getProfit() {
				console.log('获取利润')
			},
			getDlztEnv() {
				console.log('获取队列')
				let _this = this
				let params = {
					params: {
						order_id: this.user_id
					}
				}
				getDlzt(params).then((res) => {
					console.log(res)
					if (res.code !== 200) {
						_this.$notify({
							title: '提示',
							message: res.message,
							type: 'fail'
						})
					} else {
						let data = res.data.cnt
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
							switch(value.take_delivery) {
								case 1:
									value.take_delivery = '待提货'
									break
								case 2:
									value.take_delivery = '已提货'
									break
							}
						})
						_this.tableData = data
					}
					NProgress.done()

				})
			},
			getFrztEnv() {
				console.log('获取利润')
				let _this = this
				let params = {
					params: {
						order_id: this.user_id
					}
				}
				getFrzt(params).then((res) => {
					console.log(res)
					if (res.code !== 200) {
						_this.$notify({
							title: '提示',
							message: res.message,
							type: 'fail'
						})
					} else {
						let data = res.data.cnt
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
									value.status = '已发货'
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
