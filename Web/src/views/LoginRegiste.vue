<template>
  <div class="container">
    <!-- form表单容器 -->
    <div class="form-container">
          <el-button type = "danger" @click="islogin = !islogin;" style="position: absolute;right: 50px;top:20px" >
            <div v-if="islogin">去注册</div>
            <div v-else>去登陆</div>
          </el-button>
          <!-- 切换按钮 -->
          <el-button type = "warning" @click="islogin = !islogin;" class="btn" >
              <div v-if="islogin">去注册</div>
              <div v-else>去登陆</div>
          </el-button>
          <div class="signin-signup">
              <!-- 登陆 --> 
          <transition name="el-zoom-in-center">
              <logincom :user = "user" :rules = "rules" v-if="islogin"/>
          </transition>
              <!-- 注册 -->
          <transition name="el-zoom-in-bottom">
              <registecom :registerUser = "registerUser" :registerRules = "registerRules" v-if="!islogin"/>
          </transition>
          </div>
      </div>
  </div>
</template>
<script lang="ts">
import { ref } from "vue"
import {user, rules} from "@/utils/login";
import {registerUser, registerRules} from "@/utils/registe"

import logincom from "@/components/logincom.vue";
import registecom from "@/components/registecom.vue";
export default{
  name:"LoginRegister",
  components:{
      logincom, registecom
  },
  setup(){
      const islogin = ref(true);
     
      return { user, rules, registerUser, registerRules, islogin};
  }
};
</script>
<style scoped>
.container{
  position: relative;
  width: 100%;
  background-color: rgb(255, 255, 255);
  min-height: 100vh;
  overflow: hidden;
}

.form-container{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: url("../assets/img/bg.jpg");
  background-repeat:no-repeat;
  background-size:cover;
}

.signin-signup{
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 76%;
  width: 35%;
  text-align: center;
  padding-top: 20px;
  background-color: rgba(38, 113, 211, 0.685);
 
}

.btn{
  position: absolute;
  left: 40%;
  top: 60%;
  transform:rotate(-52deg);
  letter-spacing: 4px;
}
</style>