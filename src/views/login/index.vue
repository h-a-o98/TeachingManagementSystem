<template>
   <div class="login">
    <div class="content">
   <div class="input"><span>用户名</span><el-input  v-model="input" ></el-input></div>
   <div class="input"><span>密码</span><el-input  v-model="password" show-password></el-input></div>
   <el-button  class="btn" type="primary" size="medium" @click="denglu">登录</el-button>
  </div>
  </div>
</template>
<script>
  export default {
    name:"LoginView",
      data(){
    return{
      input:'',
      password:''
    }
  },
  methods:{
    async denglu(){
      console.log(this.input,this.password);
      const res = await this.$axios("login/postlogin",{
        password:this.password,user:this.input
      }
      );
      if (res.status == 200) {
        alert("登陆成功");
        sessionStorage.setItem("login", true);
        this.$router.replace({ name: "zhoukao" });
      } else {
        alert('账号密码输入错误,请联系超级管理员');
      }
    }
  }
  }
</script>
<style lang="less" scoped>
.login{  
  .content{
    margin: 200px auto;
    width: 40%;
    .input{
    &>span{
      margin-right: 5px;
    }
    .el-input{
    margin: 10px;
    width: 80%;
  }
  }
  .input:nth-of-type(2){
    &>span{
      margin-right: 20px;
    }
  }
  .btn{
    margin-left: 60px;
    margin-top: 10px;
  }
  } 
}  
</style>