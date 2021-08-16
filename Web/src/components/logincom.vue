<template>
    <el-form :model="user" label-width="80px" class="loginForm" :rules = "rules" ref = "loginForm">
        <el-form-item label="手机" prop = "phone" style="width: 90%;">
            <el-input v-model="user.phone" placeholder="Enter Phone..."></el-input>
        </el-form-item>
        <el-form-item label="密码" prop = "password" style="width: 90%;">
            <el-input type="password" v-model="user.password" placeholder="Enter Password..."></el-input>
        </el-form-item>
        <el-form-item >
            <el-button type="primary" @click="toLogin('loginForm')" style="letter-spacing: 6px;">登陆</el-button>
            <el-button type="primary" @click="toLogin('loginForm')" style="letter-spacing: 6px;">清空</el-button>
        </el-form-item>
    </el-form>
</template>
<script lang="ts">
import store from "@/store";
import { ref, getCurrentInstance, toRefs, computed } from "vue"
import { useStore } from "vuex"
export default{
    props:{
        user:{
            type: Object,
            required: true
        },
        rules:{
            type: Object,
            required: true
        }
    },
    setup(props:any){
        // @ts-ignore
        const { ctx } = getCurrentInstance();
        let { proxy }:any = getCurrentInstance();
        const { user } = toRefs(props)
        const store = useStore()
        //触发登陆方法
        function toLogin (formName: string){
            ctx.$refs[formName].validate((valid: boolean) => {
          if (valid) {
            console.log(user.value.phone);
            proxy.$axios.post('http://localhost:3000/teacher/login',{
                phone:user.value.phone,
                password:user.value.password
            }).then((res: any) => {
                if(res.status === 200 && res.data.message.length === 1){
                    proxy.$message({
                        message: '登陆成功！',
                        type: 'success'
                    });
                console.log(res.data.message[0])
                console.log(1111)
                const teacherObj = {
                    id: res.data.message[0].id,
                    name: res.data.message[0].name,
                    phone: res.data.message[0].phone,
                    password: res.data.message[0].password,
                    totalexam: res.data.message[0].totalexam,
                }
                store.commit('UserLogin',teacherObj)
                // console.log(store.state.UserInfo);
                localStorage.setItem('make_id', teacherObj.id)
                localStorage.setItem('make_name', teacherObj.name)
                localStorage.setItem('make_phone', teacherObj.phone)
                localStorage.setItem('make_password', teacherObj.password)
                localStorage.setItem('make_totalexam', teacherObj.totalexam)
                proxy.$router.push('myexam')
                
                }else{
                    proxy.$message({
                        message: '密码错误',
                        type: 'error'
                    });
                }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
            });
        }
        return { toLogin }
    }
}
</script>
<style scoped lang="less">


/deep/ .el-form-item__label{
    font-weight: bold;
    color: rgb(0 0 0 / 72%);
    margin-top: 20px;
}

/deep/ .el-form-item__content{
    display: flex;
    justify-content: space-evenly;
    margin-top: 20px;
} 
</style>