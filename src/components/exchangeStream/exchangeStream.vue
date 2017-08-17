<template>
	<section style="width:100%">
  	<el-table
		    :data="tableData"
		    stripe
		    style="width: 100%">
		   <el-table-column
	      prop="cur_id"
	      label="#"
	      width="100">
	    </el-table-column>
	    <el-table-column
	      prop="order_sn"
	      label="订单号"
	      width="180">
	    </el-table-column>
	    <el-table-column
	      prop="user_mobile"
	      label="手机号"
	      width="180">
	    </el-table-column>
	    <!-- <el-table-column
	      prop="good_name"
	      label="购买商品"
	      width="180">
	    </el-table-column>
	    <el-table-column
	      prop="status"
	      label="商品状态"
	      width="180">
	    </el-table-column> -->
	    <el-table-column
	      prop="money"
	      label="金额">
	    </el-table-column>
	    <el-table-column
	      prop="status"
	      label="订单状态">
	    </el-table-column>
	    <el-table-column
	      prop="created_at"
	      label="创建时间">
	    </el-table-column>
	  </el-table>
	</section>
</template>

<script type="text/ecmascript-6">
	import NProgress from 'nprogress'
	import { shopUserLog } from 'api/api'

  export default {
  	data() {
			return {
				tableData: [{
         	order_sn: '',
          user_mobile: '',
          good_name: '',
          status: '',
          money: '',
          order_status: ''
        }]
			}
		},
		created() {
			// document.title = '格信商城-用户积分明细'
			this.user_id = this.$route.params.id
		},
		mounted() {
			NProgress.start()
			this.shopUserLogEnv()
		},
		methods: {
			shopUserLogEnv() {
				let _this = this
				let params = {
					params: {
						user_id: 1
					}
				}
				shopUserLog(params).then((res) => {
					console.log(res)
					if (res.code !== 200) {
						_this.$notify({
							title: '提示',
							message: res.message,
							type: 'fail'
						})
					} else {
						let data = res.data.cnt.data
						data.forEach((value, index) => {
							if (value.user_mobile == '') {
								value.user_mobile = '空'
							}
							if (value.order_sn == '') {
								value.order_sn = '空'
							}
							value.cur_id = index + 1
							switch(value.status) {
								case 0:
									value.status = '待审核'
									break
								case 1:
									value.status = '审核中'
									break
								case 2:
									value.status = '审核通过'
									break
								case 3:
									value.status = '审核失败'
									break
							}

						})
						_this.tableData = data
					}
					// 接口报错, 模拟数据
					// let arr = ['order_id', 'user_mobile', 'good_name', 'status', 'money', 'order_status']
					// arr.forEach((value, index) => {
					// 	_this.tableData[value] = arr[value]
					// })
					
					NProgress.done()
				})
				// _this.tableData[0].order_id = '23092u409u243'
				// _this.tableData[0].user_mobile = '15800029003'
				// _this.tableData[0].good_name = '大豫竹'
				// _this.tableData[0].status = '未提'
				// _this.tableData[0].money = '299'
				// _this.tableData[0].order_status = '兑换中'
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
