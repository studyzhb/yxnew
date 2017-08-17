<template>
	<section style="width:100%">
	<el-tabs v-model="activeName2" type="card" @tab-click="handleClick" style="margin-top: 15px;">
	  <el-tab-pane label="队列助推" name="first">
    	<el-table
			    :data="tableData"
			    stripe
			    style="width: 100%">
		    <el-table-column
		      prop="order_id"
		      label="订单号"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="user_mobile"
		      label="手机号"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="good_name"
		      label="购买商品"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="create_time"
		      label="购买时间"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="status"
		      label="商品状态"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="boots_money"
		      label="助推金额">
		    </el-table-column>
		    <el-table-column
		      prop="money"
		      label="金额">
		    </el-table-column>
		    <el-table-column
		      prop="other"
		      label="其他">
		    </el-table-column>
		  </el-table>
	  </el-tab-pane>
	  <el-tab-pane label="下级利润助推" name="second">
    	<el-table
			    :data="tableData"
			    stripe
			    style="width: 100%">
		    <el-table-column
		      prop="order_id"
		      label="订单号"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="user_mobile"
		      label="手机号"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="good_name"
		      label="购买商品"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="create_time"
		      label="购买时间"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="status"
		      label="商品状态"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="boots_money"
		      label="助推金额">
		    </el-table-column>
		    <el-table-column
		      prop="money"
		      label="金额">
		    </el-table-column>
		    <el-table-column
		      prop="other"
		      label="其他">
		    </el-table-column>
		  </el-table>
	  </el-tab-pane>
	</el-tabs>
  	
	</section>
</template>

<script type="text/ecmascript-6">
	import NProgress from 'nprogress'
	import { getBootsInfo } from 'api/api'

  export default {
  	data() {
			return {
				activeName2: 'first',
				tableData: [{
          order_id: '',
          user_mobile: '',
          good_name: '',
          create_time: '',
          status: '',
          money: '',
          boots_money: '',
          other: ''
        }]
			}
		},
		created() {
			// document.title = '格信商城-助推明细'
			this.user_id = this.$route.params.id
		},
		mounted() {
			NProgress.start()
			this.getBootsInfoEnv()
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event)
			},
			getBootsInfoEnv() {
				let _this = this
				let params = {}
				let data = [
					{
						order_id: '23092u409u243',
	          user_mobile: '15800029003',
	          good_name: '大豫竹',
	          create_time: '2017-06-06 23:00:02',
	          status: '未提',
	          money: '299',
	          boots_money: '100',
	          order_status: '收益中',
	          other: '溢出30，下次助推'
					},
					{
						order_id: '23092u409u243',
	          user_mobile: '15800029003',
	          good_name: '大豫竹',
	          create_time: '2017-06-06 23:00:02',
	          status: '未提',
	          money: '299',
	          boots_money: '100',
	          order_status: '收益中',
	          other: '溢出30，下次助推'
					},
					{
						order_id: '23092u409u243',
	          user_mobile: '15800029003',
	          good_name: '大豫竹',
	          create_time: '2017-06-06 23:00:02',
	          status: '未提',
	          money: '299',
	          boots_money: '100',
	          order_status: '收益中',
	          other: '溢出30，下次助推'
					},
					{
						order_id: '23092u409u243',
	          user_mobile: '15800029003',
	          good_name: '大豫竹',
	          create_time: '2017-06-06 23:00:02',
	          status: '未提',
	          money: '299',
	          boots_money: '100',
	          order_status: '收益中',
	          other: '溢出30，下次助推'
					},
					{
						order_id: '23092u409u243',
	          user_mobile: '15800029003',
	          good_name: '大豫竹',
	          create_time: '2017-06-06 23:00:02',
	          status: '未提',
	          money: '299',
	          boots_money: '100',
	          order_status: '收益中',
	          other: '溢出30，下次助推'
					}
				]
				// _this.tableData.length = 10
				// _this.tableData.forEach((value, index) => {
				// 	value.order_id = '23092u409u243'
				// 	value.user_mobile = '15800029003'
				// 	value.good_name = '大豫竹'
				// 	value.create_time = '2017-06-06 23:00:02'
				// 	value.status = '未提'
				// 	value.money = '299'
				// 	value.order_status = '收益中'
				// })
				_this.tableData = data
				console.log(_this.tableData)
				// getBootsInfo(params).then((res) => {
				// 	console.log('bal: ' + res)
				// 	if (res.code !== 200) {
				// 		_this.$notify({
				// 			title: '提示',
				// 			message: res.message,
				// 			type: 'fail'
				// 		})
				// 	} else {
				// 		let data = res.data.cnt.data
				// 		_this.tableData = data
				// 	}
				// 	// 接口报错, 模拟数据
					
				// 	NProgress.done()
				// })

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
