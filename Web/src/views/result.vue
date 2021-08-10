<template>
<div style="margin: 0 auto;text-align: center;margin-top: 5%;">

    <div v-for="(item,index) in result">
    <p style="margin-bottom: 20px;">学生{{item.name}}提交了试卷，他的答案是{{item.answer}}</p>
    </div>
    <div>共{{result.length}}人提交</div>
</div>
</template>

<script lang = "ts">
import { ref, reactive, getCurrentInstance } from "vue"
import { useStore } from "vuex"
export default{
    setup(){
         // @ts-ignore
         const { ctx } = getCurrentInstance();
        let { proxy }:any = getCurrentInstance();
        const store = useStore()

        let userInfo = store.state.UserInfo

        let result:any = reactive([])
        
        // setInterval(test,1000)
        
        const getResult = () => {
            proxy.$axios.post('http://localhost:3000/teacher/getresult',{
            teacher_phone:userInfo.phone,
            examindex:userInfo.totalexam
            // teacher_phone:"18172642994",
            // examindex:"10"
            }).then((res:any) => {
                for (let i = 0; i < res.data.message.length; i++) {
                    result[i] = res.data.message[i]
                }
            })
        }
       setInterval(getResult,1000)

        return{
            result
        }
    }
}
</script>

<style lang = "less">

</style>