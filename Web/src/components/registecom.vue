<template>
    <el-form :model="registerUser" label-width="80px" class="loginForm" :rules = "registerRules" ref = "registerForm">
        <el-form-item label="账号" prop = "account" style="width: 90%;">
            <el-input v-model="registerUser.account" placeholder="Enter Account..."></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop = "email" style="width: 90%;">
            <el-input v-model="registerUser.email" placeholder="Enter Email..."></el-input>
        </el-form-item>
        <el-form-item label="密码" prop = "password" style="width: 90%;">
            <el-input type="password" v-model="registerUser.password" placeholder="Enter Password..."></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop = "password2" style="width: 90%;">
            <el-input type="password" v-model="registerUser.password2" placeholder="Enter Password..."></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="toRegiste('registerForm')">注册</el-button>
        </el-form-item>
    </el-form>
</template>
<script lang="ts">
import { ref, getCurrentInstance } from "vue"
export default{
    props:{
        registerUser:{
            type: Object,
            required: true
        },
        registerRules:{
            type: Object,
            required: true
        }
    },
    setup(){
        // @ts-ignore
        const { ctx } = getCurrentInstance();

        //注册
        function toRegiste (formName: string){
            ctx.$refs[formName].validate((valid: boolean) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
            });
        }
        return { toRegiste }
    }
}
</script>
<style scoped>
.loginForm >>> .el-form-item__label{
    font-weight: bold;
    color: rgb(0 0 0 / 72%);
}
</style>