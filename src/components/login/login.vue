<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm card-box loginform">
    <h3 class="title">优享商户系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>

    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>

    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining" ref="loginBtn">登录</el-button>
    <!-- <el-button @click.native.prevent="handleReset2">重置</el-button> -->
    </el-form-item>
</el-form>
</template>

<script>
  import { login } from 'api/api'
  import NProgress from 'nprogress'

  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        checked: true
      };
    },
    mounted() {
      let _this = this
      window.addEventListener('keydown', function(event) {
        if (event.keyCode == 13) {
          _this.handleSubmit2()
        }
      })
      console.log(window)
    },
    methods: {
      handleReset2() {
        // this.$refs.ruleForm2.resetFields()
      },
      handleSubmit2() {
        var _this = this
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.logining = true
            NProgress.start()
            let params = {
              login: this.ruleForm2.account,
              password: this.ruleForm2.checkPass
            }
            login(params).then(res => {
              _this.logining = false
              NProgress.done()
              if (res.code !== 200) {
                _this.$notify({
                  title: '错误',
                  message: res.message,
                  type: 'error'
                })
              } else {
                window.localStorage.__loginState__ = true
                window.localStorage.__avatar__ = res.data.cnt.avatar
                window.localStorage.__shop_name__ = res.data.cnt.shop_name
                window.localStorage.__user_id__ = res.data.cnt.id
                _this.$router.replace('/storeInfo')
              }
            })
            
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>
	body{
		margin: 0px;
    padding: 0px;
    background: #1F2D3D;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    /* font-weight: 400; */
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
	}
  .card-box {
    padding: 20px;
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin-bottom: 20px;
    background-color: #F9FAFC;
    margin: 180px auto;
    width: 400px;
    border: 2px solid #8492A6;
  }
  
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  
  .loginform {
    width: 350px;
    padding: 35px 35px 15px 35px;
  }
</style>