<template>
 	<section style="width: 100%">
 		<el-button type="primary" @click="addGood" style="margin-bottom: 15px;"><i class="el-icon-upload el-icon--right" style="margin-right:5px"></i>添加商品</el-button>

		<el-table
		    :data="goodsList"
		    style="width: 100%">
		  <el-table-column
		    prop="cur_id"
		    label="#"
		    width="60">
			</el-table-column>
		  <el-table-column style="text-align:center;"
		    prop="logo"
		    label="商品logo"
		    sortable
		    >
		    <template scope="scope">
		    	<img style="width: 80px;padding:10px 0;" :src="scope.row.logo" alt="">
		    </template>
		  </el-table-column>
		  <el-table-column
		    prop="name"
		    label="商品名字"
		    sortable>
		  </el-table-column>
		  <el-table-column
		    prop="price"
		    sortable
		    label="价格">
		  </el-table-column>
		  <el-table-column
		    prop="market_price"
		    sortable
		    label="市场价">
		  </el-table-column>
		  <el-table-column
		    prop="displayorder"
		    sortable
		    label="排序">
		    <template scope="scope">
		    	<input @blur="goodChsort(scope.row, scope.row.displayorder)" type="number" v-model="scope.row.displayorder" style="padding:4px 6px;;font-size:15px;width:80px;">
		    </template>
		  </el-table-column>
		  <el-table-column
		    prop="unit"
		    sortable
		    width="180"
		    label="状态">
		    <template scope="scope">
		    	<el-switch class="toggleBtn"
							v-model="switchValue[scope.row.cur_id - 0 -1]"
							@change="switchChanges(scope.row.status + '', scope.row.id)"
							on-text="上架"
							off-text="下架"
							on-value="1"
							off-value="2"
							on-color="#13ce66"
							off-color="#ff4949">
					</el-switch>
		    </template>
		  </el-table-column>
		  <el-table-column
		    prop="operation"
		    label="操作">
		    <template scope="scope">
		      <el-button type="primary" icon="edit" @click="dialogOpen(scope.row)"></el-button>
				  <el-button type="danger" icon="delete" @click="deleteGood(scope.row)"></el-button>
		    </template>
		  </el-table-column>
		</el-table>

		<el-pagination style="text-align:right; padding: 15px 0 0 0;"
		    @size-change="handleSizeChange"
		    @current-change="handleCurrentChange"
		    :current-page="currentPage"
		    :page-sizes="[10, 15, 20, 25]"
		    :page-size="pageSize"
		    layout="total, sizes, prev, pager, next, jumper"
		    :total="pageTotal">
		</el-pagination>

		<!-- 弹窗1 -->
		<el-dialog :title="actionState" :visible.sync="dialogFormVisible">
		  <el-form :model="editForm" label-width="112px" :rules="editFormRules" ref="editForm" class="editForm">
		    <el-form-item label="商品名称：" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<!-- <el-form-item label="商品编码：" prop="good_code">
					<el-input v-model="editForm.good_code" auto-complete="off"></el-input>
				</el-form-item> -->
				<el-form-item label="价格" prop="price">
					<el-input v-model="editForm.price" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="市场价" prop="market_price">
					<el-input v-model="editForm.market_price" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="商品图片：" prop="pics">
					<el-upload
					  action=""
					  :http-request="uploadFile"
					  list-type="picture-card"
						:file-list="editForm.pics"
					  :auto-upload="true"
					  :multiple="false"
					  :on-preview="handlePictureCardPreview"
					  :on-remove="handleRemove"
					  :on-change="handleChange"
					  :on-progress="handleProgress"
					  :on-success="handleSuccess"
					  :on-error="handleError">
					  <i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog v-model="dialogVisible" size="tiny">
					  <img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
				</el-form-item>
				<el-form-item label="产品详情：" prop="goodsDetails">
					<el-upload
					  action=""
					  :http-request="uploadFileForDetails"
					  list-type="picture-card"
						:file-list="editForm.goodsDetails"
					  :auto-upload="true"
					  :multiple="false"
					  :on-preview="handlePictureCardPreviewForDetails"
					  :on-remove="handleRemoveForDetails"
					  :on-change="handleChangeForDetails"
					  :on-progress="handleProgressForDetails"
					  :on-success="handleSuccessForDetails"
					  :on-error="handleError">
					  <i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog v-model="dialogVisible" size="tiny">
					  <img width="100%" :src="dialogImageUrlForDetails" alt="">
					</el-dialog>
				</el-form-item>

				<!-- <el-form-item label="产品详情：" prop="introduce">
					<el-input type="textarea" v-model="editForm.introduce" auto-complete="off" class="queueTextarea"></el-input>
				</el-form-item> -->

		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="submit('editForm')">确 定</el-button>
		  </div>
		</el-dialog>

		<el-dialog style="z-index:99999;"
			  title="提示"
			  :visible.sync="dialogVisible"
			  size="tiny">
		  <span>{{dislog_cont}}</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="deleteEnv">确 定</el-button>
		  </span>
		</el-dialog>
 	</section>
</template>

<script type="text/ecmascript-6">
	import NProgress from 'nprogress'
	import { getScoreGoodslist, submitScoreGood, deleteScoreWare, addScoreWare, getKey, goodScoreOnOff, waresScoreChsort } from 'api/api'

  export default {
  	data() {
  		return {
  			imgHTML: '',
  			listLoading: false,
  			file: null,
  			switchValue: [],
  			// 图片上传
  			dialogImageUrl: '',
  			dialogImageUrlForDetails: '',
  			dialogVisible: false,
  			goodsPics: [],
  			goodsDetails: [],
  			logoForGoodsPics: '',
  			goodsList: null,
  			actionState: '添加商品',
  			dialogFormVisible: false,
  			arr: ['name', 'pics', 'price', 'market_price'],
  			good_id: null,
  			displayorder: null,
  			editForm: {
          name: '',
          logo: '',
					pics: [],
					price:'',
					market_price:'',
          goodsDetails: []
        },
        editFormRules: {
					name: [
						{ required: false, message: '请填写商品名称'}
					],
					good_code: [
						{ required: false, message: '请填写商品编码'}
					],
					bar_code: [
						{ required: false, message: '请填写国际条形码'}
					],
					spec: [
						{ required: true, message: '请填写规格'}
					],
					unit: [
						{ required: true, message: '请填写零售单位'}
					],
					cost_price: [
						{ required: true, message: '请填写进货价'}
					],
					sell_price: [
						{ required: true, message: '请输入零售价，零售价必须要和队列入单价格一致'}
					],
					pics: [
						{ required: true, message: '请填加商品图片'}
					],
					goodsDetails: [
						{ required: false, message: '请添加商品详情'}
					]
				},
				item: null,
        formLabelWidth: '120px',
        dislog_cont: '标题',
        dialogVisible: false,
        // 1: 编辑  2: 添加
        actionStatus: 1,
        currentPage: 1,
        pageTotal: 0,
        pageSize: 0,
        curState: 0,
        positions: [],
        isUploadDetails: false,
        isDelete: false
  		}
  	},
  	created() {
			// document.title = '格信商城-商品管理'
		},
		mounted() {
			this.listLoading = true
			NProgress.start()
			let params = {}
			this.getList()
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
					}
				}
        this.getList(params)
      },
      goodChsort(good, oldPostion) {
      	// console.log(good, good.cur_id, this.positions[good.cur_id-0-1], oldPostion)
      	let _this = this
      	let params = {
      		id: good.id,
      		newPostion: good.displayorder,
      		oldPostion: this.positions[good.cur_id-0-1]
      	}
      	waresScoreChsort(params).then((res) => {
					console.log(res)
					if (res.code !== 200) {
						_this.$notify.error({
							title: '提示',
							message: res.message
						})
					} else {
						_this.$notify({
              title: '成功',
              message: res.message,
              type: 'success'
            })
            _this.getList()
					}
				})
      },
			switchChanges(index, id) {
				console.log(index)
				console.log('id: ' + id)

				switch(index) {
					case '1':
						index = '2'
						break
					case '2':
						index = '1'
						break
				}

				let _this = this
				let params = {
					id: id,
					status: index
				}
				goodScoreOnOff(params).then((res) => {
					console.log(res)
					if (res.code !== 200) {
						_this.$notify.error({
							title: '提示',
							message: res.message
						})
					} else {
						_this.$notify({
              title: '成功',
              message: res.message,
              type: 'success'
            })
            _this.getList()
					}
					NProgress.done()
				})
			},
			deleteEnv() {
				this.dialogVisible = true
				this.listLoading = false
				NProgress.start()

				let _this = this
				let params = {
					id: this.good_id,
					delete: 2
				}
				console.log('shanchu')
				deleteScoreWare(params).then((res) => {
					console.log(res)
					if (res.code !== 200) {
						_this.$notify.error({
							title: '提示',
							message: res.message
						})
					} else {
						_this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            })
            _this.getList()
            _this.dialogVisible = false
					}
					this.listLoading = false
					NProgress.done()
				})
			},
			deleteGood(good) {
				this.item = good
				this.good_id = good.id
				this.dislog_cont = '确定删除吗'
				this.dialogVisible = true
			},
			submit(formName) {
				let _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	this.dialogFormVisible = false
						let _this = this
						let params = {}
						this.arr.forEach((value, index) => {
							params[value] = this.editForm[value]
						})

						// 如果是编辑
						if (this.actionStatus === 1) {
							params.id = this.good_id
							params.logo = this.editForm.logo
							params.pics = JSON.stringify(this.editForm.pics)
							params.introduce = _this.imgHTML
							params.market_price = _this.editForm.market_price
							params.price = _this.editForm.price

							// 如果改变了商品详情图
							// if (this.isUploadDetails === true) {
							// 	if (_this.editForm.goodsDetails !== '') {
							// 		_this.editForm.goodsDetails.forEach((value, index) => {
							// 			let imgUrl = value.url
							// 			_this.imgHTML +=`<div class="img-single" style="width:100%;"><div class="deleteAvata" style="display: none;">删除</div><img src="${imgUrl}" width="100%"></div>`
							// 		})
							// 	}
							// }

							submitScoreGood(params).then((res) => {
								console.log(res)
								if (res.code !== 200) {
									_this.getList()
									_this.$notify.error({
										title: '提示',
										message: res.message
									})
								} else {
									_this.$notify({
										title: '提示',
										message: res.message,
										type: 'success'
									})
									_this.getList()
								}
								NProgress.done()
							})
						}

						// 如果是添加
						if (this.actionStatus === 2) {
							// let newGood = {}
							// newGood.pics = _this.editForm.pics
							params.logo = _this.editForm.logo
							params.pics = JSON.stringify(_this.editForm.pics)
							params.introduce = _this.imgHTML
							params.price = _this.editForm.price
							params.market_price = _this.editForm.market_price
							addScoreWare(params).then((res) => {
								console.log(res)
								if (res.code !== 200) {
									_this.$notify.error({
										title: '提示',
										message: res.message
									})
								} else {
									_this.$notify({
										title: '提示',
										message: res.message,
										type: 'success'
									})
									_this.getList()
								}
								NProgress.done()
							})
						}
          } else {
          	_this.$notify.error({
							title: '提示',
							message: '验证失败'
						})
            console.log('验证失败')
            return false
          }
        })
			},
			addGood() {
				this.actionStatus = 2
				this.dialogFormVisible = true
				this.arr.forEach((value, index) => {
					this.editForm[value] = ''
				})
				this.editForm.pics = []
				this.editForm.goodsDetails = []
				this.imgHTML = ''
			},
			// 弹窗
			dialogOpen(good) {
				// 编辑
				console.log('编辑')
				console.log(good)
				this.good_id = good.id
				this.actionStatus = 1
				this.dialogFormVisible = true
				this.isUploadDetails = false
				// 获取当前商品信息
				this.editForm = {}
				this.imgHTML = ''
				this.arr.forEach((value, index) => {
					if (good[value]) {
						this.editForm[value] = good[value]
					}
				})
				// 处理获取到的图片
				// 商品图片
				if (good.pics === "") {
					this.editForm.pics = []
				} else {
					this.editForm.pics = JSON.parse(good.pics)
				}
				// 商品详情图片
				if (good.introduce == "" || good.introduce == null) {
					this.editForm.goodsDetails = []
				} else {
					console.log(good.introduce)
					this.imgHTML = good.introduce
					console.log('html: ' + this.imgHTML)
					// 匹配img的src
					let arr = this.imgHTML.match(/src=\"([^\"]*?)\"/gi)
					let arr2 = []
					for (var i in arr) {
						let obj = {}
						obj.name = 'img'
						obj.url = arr[i].split('"')[1]
						arr2.push(obj)
					}
					console.log(arr2)
					this.editForm.goodsDetails = arr2
				}
			},
			//获取商品列表
			getList(params) {
				this.listLoading = true
				NProgress.start()
				if (!params) {
					params = {
						params: {}
					}
				}
				let _this = this
				getScoreGoodslist(params).then((res) => {
					console.log(res)
					if (res.code !== 200) {
						if (res.message == '未登录') {
							_this.$router.replace('/login')
						}
						_this.$notify.error({
							title: '提示',
							message: res.message
						})
					} else {
						_this.positions.length = 0
						let data = res.data.cnt.data
						console.log(data)
						_this.pageTotal = res.data.cnt.total - 0
						_this.pageSize = res.data.cnt.per_page - 0
						data.forEach((value, index) => {
							value.cur_id = index - 0 + 1 + ''
							value.status = value.status.toString()
							_this.switchValue.push(value.status)
							_this.positions.push(value.displayorder)
						})
						_this.goodsList = data
						_this.listLoading = false
						NProgress.done()
					}
				})
			},
			// 商品banner图片上传
			uploadFile(files) {
				this.file = files.file
				console.log(files)
				let _this = this
				let params = {}

				// OSS上传
				getKey(params).then(res => {
	        let { code, data } = res;
	        if (code == 200) {
            return new OSS.Wrapper({
                // region: 'oss-cn-qingdao',
								endpoint: 'http://public.gexinec.com/',
                accessKeyId: data.cnt.AccessKeyId,
                accessKeySecret: data.cnt.AccessKeySecret,
                stsToken: data.cnt.SecurityToken,
                bucket: 'accessorygx',
                cname: true
            })
	        } else {
	        	this.$notify({
							title: '提示',
							message: '1: 上传失败，请重新上传',
							type: 'fail'
						})
	        }
		    })
		    .then((client) => {
		    	client.multipartUpload('/pic/' + Math.ceil(Math.random() * 100000000), this.file)
            .then((res) => {
            	_this.$notify({
								title: '提示',
								message: '上传成功',
								type: 'success'
							})
							console.log('返回商品的图片：')
							console.log(res)
              let newPic = {
              	name: 'editpic',
              	// url: res.res.requestUrls[0]
              	url: `http://accessorygx.oss-cn-qingdao.aliyuncs.com${res.name}`
              }
              _this.editForm.pics.push(newPic)
              _this.editForm.logo = _this.editForm.pics[0].url
              _this.good.logo = _this.editForm.pics[0].url
              console.log('商品图片列表：')
              console.log(this.editForm.pics)
            }).catch(err => {
            	console.log('上传失败，请重新上传')
            })
		    }) 
			},
			// 商品详情上传
			uploadFileForDetails(files) {
				this.file = files.file
				console.log(files)
				let _this = this
				let params = {}

				// OSS上传
				getKey(params).then(res => {
	        let { code, data } = res;
	        if (code == 200) {
            return new OSS.Wrapper({
                endpoint: 'http://public.gexinec.com/',
                accessKeyId: data.cnt.AccessKeyId,
                accessKeySecret: data.cnt.AccessKeySecret,
                stsToken: data.cnt.SecurityToken,
                bucket: 'accessorygx',
                cname: true
            })
	        } else {
	        	this.$notify({
							title: '提示',
							message: '1: 上传失败，请重新上传',
							type: 'fail'
						})
	        }
		    })
		    .then((client) => {
		    	client.multipartUpload('/pic/' + Math.ceil(Math.random() * 100000000), this.file)
            .then((res) => {
            	_this.$notify({
								title: '提示',
								message: '上传成功',
								type: 'success'
							})
							console.log('返回商品详情的图片：')
							console.log(res)
							_this.isUploadDetails = true
              // let newPic = {
              // 	name: 'editpic',
              // 	// url: res.res.requestUrls[0]
              // 	url: `http://accessorygx.oss-cn-qingdao.aliyuncs.com${res.name}`
              // }
              let imgUrl = `http://accessorygx.oss-cn-qingdao.aliyuncs.com${res.name}`
              _this.imgHTML +=`<div class="img-single" style="width:100%;"><div class="deleteAvata" style="display: none;">删除</div><img src="${imgUrl}" width="100%"></div>`
              // _this.editForm.logo = newPic.ur[]
              // _this.good.logo = newPic.url
              // console.log('商品详情图片上传时的状态：')
              // console.log(this.editForm.goodsDetails)
            }).catch(err => {
            	console.log('上传失败，请重新上传')
            })
		    }) 
			},
			removeByValue(arr, url) {
				arr.forEach((value, index) => {
					if (value.url === url) {
						arr.splice(index, 1)
						return
					}
				})
				console.log('最终获取的图片' + arr)
				return arr
			},
			handleRemove(file, fileList) {
				console.log('文件移除')
        console.log(file)
        console.log(this.editForm.goodsPics)
        this.editForm.goodsPics = this.removeByValue(this.editForm.goodsPics, file.url)
        this.$notify({
					title: '提示',
					message: '删除成功',
					type: 'success'
				})
      },
      handleRemoveForDetails(file, fileList) {
        console.log(this.editForm.goodsDetails)
				console.log('文件移除')
        console.log(file)
        this.editForm.goodsDetails = this.removeByValue(this.editForm.goodsDetails, file.url)
        console.log(this.editForm.goodsDetails)
        this.imgHTML = ''
        this.isDelete = true
        if (this.editForm.goodsDetails !== '' || this.editForm.goodsDetails.length > 0) {
					this.editForm.goodsDetails.forEach((value, index) => {
						let imgUrl = value.url
						this.imgHTML += `<div class="img-single" style="width:100%;"><div class="deleteAvata" style="display: none;">删除</div><img src="${imgUrl}" width="100%"></div>`
					})
					console.log('this.imgHTML: ' + this.imgHTML)
				} else {
					this.imgHTML = ''
				}
        this.$notify({
					title: '提示',
					message: '删除成功',
					type: 'success'
				})
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        console.log('文件预览')
        console.log(file.response)
      },
      handlePictureCardPreviewForDetails(file) {
        this.dialogImageUrlForDetails = file.url
        console.log('文件预览')
        console.log(file.response)
      },
      handleChange(file, fileList) {
      	console.log(file)
      },
      handleChangeForDetails(file, fileList) {
      	console.log(file)
      },
      handleProgress(event, file, fileList) {
      	console.log('文件上传中……')
      	console.log(event, file, fileList)
      },
      handleProgressForDetails(event, file, fileList) {
      	console.log('文件上传中……')
      	console.log(event, file, fileList)
      },
      handleSuccess(response, file, fileList) {
      	console.log('上传成功')
      	console.log(response, file, fileList)
      	// 获取返回的图片链接
      	this.goodsPics.length = 0
      	fileList.forEach((value, index) => {
      		this.goodsPics.push(value.url)
      	})
      	// 数组合并
      	this.editForm.goodsPics.concat(this.goodsPics)
      	// // 获取数组第一个图片
      	// this.logoForGoodsPics = this.editForm.goodsPics[0]
      	// console.log(this.goodsPics)
      	// console.log(this.logoForGoodsPics)
      },
      handleSuccessForDetails(response, file, fileList) {
      	console.log('上传成功')
      	console.log(response, file, fileList)
      	// 获取返回的图片链接
      	this.goodsDetails.length = 0
      	fileList.forEach((value, index) => {
      		this.goodsDetails.push(value.url)
      	})
      	// 数组合并
      	this.editForm.goodsDetails.concat(this.goodsDetails)
      	// 获取数组第一个图片
      	console.log(this.goodsPics)
      },
      handleError(err, file, fileList) {
      	console.log('上传失败')
      	console.log(err, file, fileList)
      }
		}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.itemContent
		margin: 20px 0
		color: #555
		.displayorder
			position: absolute
			top: 0
			left: 0
			border: 1px solid #ccc
			border-top: 0
			border-left: 0
			width: auto
			font-size: 0
			span
				padding: 10px
				display: inline-block
				background: rgba(12, 12, 12, 0.27)
				font-size: 14px
			input
				width: 28px
				display: inline-block
				padding: 3px 10px
				font-size: 17px
				color: #716f6f
		.item
			border: 1px solid #ccc
			overflow:hidden
			margin-bottom: 15px
			position: relative
			.imgWrap
				height: 100px
				overflow:hidden
				img
					width: 100%
			.goodName
				overflow:hidden
				display: -webkit-box
				display: box
				-webkit-line-clamp: 2
				line-clamp: 2
				-webkit-box-orient: vertical
				box-orient: vertical
				font-size: 14px
				line-height: 1.2
				margin-top: 10px
			.em
				padding: 15px
			.line
				padding: 5px 0
			.btnWrap
				margin-top: 20px
				text-align: right
				.toggleBtn
					margin-right: 10px
					vertical-align: bottom
	.editForm
		height: 500px
		overflow-y: auto
</style>
