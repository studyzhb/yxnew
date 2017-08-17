<template>
  <section style="width: 580px; margin: 0 auto; margin-top: 20px;">
    <el-form :label-position="labelPosition" :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
  	  <el-form-item label="当前密码：" prop="originalPass" style="margin-bottom: 30px;">
  	    <el-input type="password" v-model="ruleForm2.originalPass" auto-complete="off"></el-input>
  	  </el-form-item>
  	  <el-form-item label="新密码：" prop="pass" style="margin-bottom: 30px;">
  	    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
  	  </el-form-item>
  	  <el-form-item label="确认密码：" prop="checkPass" style="margin-bottom: 30px;">
  	    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
  	  </el-form-item>
  	  <el-form-item style="text-align: right;">
  	    <el-button type="primary" @click="submitForm('ruleForm2')" :loading="logining">提交</el-button>
  	    <el-button @click="resetForm('ruleForm2')">重置</el-button>
  	  </el-form-item>
  	</el-form>
  </section>
</template>

<script type="text/ecmascript-6">
	import { passwordUpdate } from 'api/api'
	import NProgress from 'nprogress'

	export default {
		data() {
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
			return {
        labelPosition: 'top',
        listLoading: false,
        logining: false,
				ruleForm2: {
					originalPass: '',
          pass: '',
          checkPass: ''
        },
        rules2: {
        	originalPass: [
            { required: true, message: '请填写当前密码', trigger: 'blur' }
          ],
          pass: [
            { required: true, message: '请填写新密码', trigger: 'blur' }
          ],
          checkPass: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ]
        }
			}
		},
		created() {
			// document.title = '格信商城-修改密码'
		},
		methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.logining = true
            NProgress.start()
            let _this = this
            let params = {
              oldPassword: this.ruleForm2.originalPass,
              newPasswordOne: this.ruleForm2.pass,
              newPasswordTwo: this.ruleForm2.checkPass
            }
            passwordUpdate(params).then((res) => {
              console.log(res)
              if (res.code === 200) {
                this.logining = false
                NProgress.done()
                _this.btnEditText = '提 交'
                _this.$notify({
                  title: '成功',
                  message: '提交成功, 请重新登录',
                  type: 'success'
                })
                localStorage.clear()
                _this.$router.replace('/login')
              } else {
                _this.$notify({
                  title: '错误',
                  message: res.message,
                  type: 'error'
                })
              }
            })

          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
			handleSubmit2(formName) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            this.listLoading = true;
            NProgress.start();
            var loginParams = { 
            	username: this.ruleForm2.originalPass, 
            	username: this.ruleForm2.originalPass, 
            	password: this.ruleForm2.checkPass 
           	}
            requestLogin(loginParams).then(data => {
              _this.listLoading = false
              NProgress.done()
              let { msg, code, user } = data;
              if (code !== 200) {
                this.$notify({
                  title: '错误',
                  message: msg,
                  type: 'error'
                })
              } else {
                localStorage.setItem('user', JSON.stringify(user));
                if (this.$route.query.redirect) {
                  this.$router.push({ path: this.$route.query.redirect });
                } else {
                  this.$router.push({ path: '/table' });
                }
              }
            });
          } else {
            console.log('error submit!!');
            return false
          }
        })
      }
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	
</style>