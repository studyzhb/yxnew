<template>
	<section style="width:50%">
		<el-form :model="editForm" label-width="136px" :rules="editFormRules" ref="editForm" v-loading="listLoading">
			<el-form-item label="队列名称：" prop="queueName">
				<el-input v-model="editForm.queueName" auto-complete="off" class="queueInput"></el-input>
			</el-form-item>
			
			<!--<el-form-item label="每单消费金额：">
		    <el-select v-model="editForm.highestForPrelist" placeholder="请选择消费金额">
		      <el-option label="500" value="500"></el-option>
		      <el-option label="1000" value="1000"></el-option>
		      <el-option label="2000" value="2000"></el-option>
		      <el-option label="3000" value="3000"></el-option>
		    </el-select>
		  </el-form-item>-->
			<el-form-item label="每单最低消费：" prop="minsetForPrelist">
				<el-input v-model="editForm.minsetForPrelist" auto-complete="off" class="queueInput"></el-input>
			</el-form-item>
			<el-form-item label="每单最高消费：" prop="highestForPrelist">
				<el-input v-model="editForm.highestForPrelist" auto-complete="off" class="queueInput"></el-input>
			</el-form-item>
			<el-form-item label="每日最高消费：" prop="highestForPreday" width="200">
				<el-input v-model="editForm.highestForPreday" auto-complete="off" class="queueInput"></el-input>
			</el-form-item>
			<el-form-item label="间隔人数：" prop="spacing" width="200">
				<el-input type="number" v-model="editForm.spacing" auto-complete="off" class="queueInput"></el-input>
			</el-form-item>
			<el-form-item label="手续费：" prop="serviceCharge" placeholder="百分比">
				<el-input v-model="editForm.serviceCharge" auto-complete="off" class="queueInput" width="200"></el-input>
			</el-form-item>
			<el-form-item label="队列状态：">
			  <el-switch style="margin: 0 10px;"
			    v-model="status"
			    on-color="#13ce66"
			    off-color="#ff4949"
			    on-value="1"
			    off-value="2">
			  </el-switch>
			  <span v-text="status === '1' ? '开启队列' : '关闭队列'" style="color:rgba(144, 141, 141, 0.98);font-size:14px;line-height:22px;display:inline-block;"></span>
			</el-form-item>
			<el-form-item v-show="status === '2'" label="关闭说明：" prop="closeExplain">
				<el-input type="textarea" v-model="editForm.closeExplain" auto-complete="off" class="queueInput"></el-input>
			</el-form-item>
			<el-form-item label="备注：" prop="remarks">
				<el-input type="textarea" v-model="editForm.remarks" auto-complete="off" class="queueInput"></el-input>
			</el-form-item>
			<el-form-item label="协议/规则：" prop="protocol">
				<!-- <el-input type="textarea" v-model="editForm.protocol" auto-complete="off" class="queueInput"></el-input> -->
				<!-- <textarea height=200 ref="editor" v-model="content" class='tinymce-textarea' :id="id"></textarea> -->
				<Tinymce :height=200 ref="editor" v-model="editForm.protocol" placeholder="请填写协议内容"></Tinymce>
			</el-form-item>

			<el-form-item style="">
		    <!-- <el-button type="primary" @click="submitForm('editForm')" class="queueBtn">保存</el-button> -->
		    <el-button type="primary" :loading="logining" class="" style="width:100%;" @click.native.prevent="submitForm('editForm')">保存</el-button>
		  </el-form-item>
		</el-form>
	</section>
</template>

<script type="text/ecmascript-6">
	import NProgress from 'nprogress'
	import Tinymce from 'base/tinymce/tinymce'
	import { getQueueList, upqueue,  } from 'api/api';

  export default {
  	components: {
  		Tinymce 
  	},
  	data() {
			return {
				logining: false,
				queueId: null,
				listLoading: false,
				editLoading: false,
				//编辑界面数据
				editForm: {
					queueName: '',
					money: '500',
					minsetForPrelist: '',
					highestForPrelist: '',
					highestForPreday: '',
					spacing: '',
					serviceCharge: '',
					closeExplain: '',
					remarks: '',
					protocol: ''
				},
				status: null,
				editFormRules: {
					queueName: [
						{ required: true, message: '请填写队列名称'}
					],
					minsetForPrelist: [
						{ required: true, message: '请填写每单最低消费金额'}
					],
					highestForPrelist: [
						{ required: true, message: '请填写每单最高消费金额'}
					],
					highestForPreday: [
						{ required: true, message: '请填写每日最高消费金额'}
					],
					spacing: [
						{ required: true, message: '间隔人数'}
					],
					serviceCharge: [
						{ required: true, message: '手续费 %'}
					],
					protocol: [
						{ required: true, message: '请填写协议'}
					],
					closeExplain: [
						{ required: false, message: '请填写关闭原因'}
					]
				}
			}
		},
		created() {
			// document.title = '格信商城-队列资料'
		},
		mounted() {
			NProgress.start()
			this.getQueueInfo()
			console.log('_this.status: ' + this.status)
		},
		watch: {
			// 'editForm.serviceCharge'(val) {
			// 	console.log(this.editForm.serviceCharge + '%')
			// }
		},
		methods: {
			//获取队列资料
			getQueueInfo() {
				let _this = this
				let params = {}
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
						if (data.length == 0) {
							return
						}
						console.log('status: ' + data.status)
						_this.queueId = data.id
						// 填充数据
						_this.editForm.queueName = data.name
						_this.editForm.minsetForPrelist = data.min_amount + ''
						_this.editForm.highestForPrelist = data.max_amount + ''
						_this.editForm.highestForPreday = data.day_amount + ''
						_this.editForm.spacing = data.spec
						_this.editForm.serviceCharge = data.poundage
						_this.editForm.protocol = data.protocol
						_this.editForm.closeExplain = data.close_reason
						_this.status = data.status + ''
						_this.editForm.remarks = data.desc

						console.log('_this.status: ' + _this.status)
					}
					
					NProgress.done()
				})
			},
			submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('submit!')
            if (this.editForm.serviceCharge > 20 || this.editForm.serviceCharge < 0) {
            	this.$notify.error({
								title: '验证失败',
								message: '手续费在0-20%区间'
							})
							return
            }
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.logining = true;
							NProgress.start();
							this.btnEditText = '提交中'

								let _this = this
								let params = {
									id: _this.queueId,
									name: _this.editForm.queueName,
									min_amount: _this.editForm.minsetForPrelist,
									max_amount: _this.editForm.highestForPrelist,
									day_amount: _this.editForm.highestForPreday,
									spec: _this.editForm.spacing,
									poundage: _this.editForm.serviceCharge,
									desc: _this.editForm.remarks,
									close_reason: _this.editForm.closeExplain,
									status: _this.status - 0,
									placeOfOrigin: _this.editForm.placeOfOrigin,
									selectedOptions2: _this.editForm.selectedOptions2,
									addressDetails: _this.editForm.addressDetails
								}
								params.protocol = _this.editForm.protocol
								upqueue(params).then((res) => {
									console.log(res)
									_this.logining = false
									NProgress.done()
									_this.btnEditText = '提 交'
									_this.$notify({
										title: '成功',
										message: '提交成功',
										type: 'success'
									})
								})
						})
          } else {
          	this.$notify.error({
							title: '提示',
							message: '操作失败，请联系管理员'
						})
            return false
          }
        })
      }
		}
  }
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
  .queueInput
  	input
	  	color: #48576a
	.queueBtn
		display: block
		cursor: pointer
		span
			display: block
			cursor: pointer
</style>
