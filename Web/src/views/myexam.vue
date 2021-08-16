<template>
<div class="bg">
    <el-button style="position: absolute;right: 10%;top: 30px;"  type="primary" @click="makeExam">创建试卷</el-button>
    <div class="title">
        <p>{{userInfo.name}}的试题列表</p>
    </div>
    <div class="main">
        <el-card shadow="hover" class="main-card" v-for="(item,index) in parseInt(userInfo.totalexam)" :key = "index">
            <template #header>
                <div class="card-header">
                <a class="card-title"   @click="makeExam"> <p>{{totalArray[index]}}</p></a>
                <div style="font-size:12px;">
                    <span style="margin-right: 14px;">ID:126467357</span>
                    <span style="margin-right: 14px;">未发布</span>
                    <span style="margin-right: 14px;">答卷:0</span>
                    <span style="margin-right: 14px;">8月08日 16:11</span>
                </div>
                </div>
            </template>
                <div class="card-content">
                    <a class="el-icon-edit" href="#">编辑考试</a>
                    <a class="el-icon-share" href="#">发送考试</a>
                    <a class="el-icon-data-analysis" href="#">成绩&数据</a>
                </div>
        </el-card>
    </div>
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
        let examInfo;
        let totalArray:any = reactive([])
        proxy.$axios.post('http://localhost:3000/teacher/getmyexam',{
                    phone:userInfo.phone
        }).then((res:any) => {
        //alert("添加新的题目成功")
        console.log(res.data.message)
        examInfo = res.data.message
            for (let j = 1; j < parseInt(userInfo.totalexam) + 1; j++) {
                for (let i = 0; i < res.data.message.length; i++) {
                    if(parseInt(res.data.message[i].examindex) === j){
                        totalArray.push(res.data.message[i].examtitle)
                        j++
                        console.log("111111" + res.data.message[i].examtitle);
                    }
                }
            }
        }) 

        const makeExam = () => {
            proxy.$axios.post('http://localhost:3000/teacher/addexam',{
                phone:userInfo.phone
            }).then((res:any) => {
                
                const teacherObj = {
                    id: userInfo.id,
                    name: userInfo.name,
                    phone: userInfo.phone,
                    password: userInfo.password,
                    totalexam: (parseInt(userInfo.totalexam)+ 1).toString(),
                }
                store.commit('UserLogin',teacherObj)
                userInfo = store.state.UserInfo
                console.log(userInfo);
                proxy.$router.push('make')
            })
        }

        
        return{
            userInfo,
            examInfo,
            totalArray,
            makeExam
        }
    }
}
</script>

<style scoped lang="less">
.bg{
    height: 100%;
    width: 100%;
    background-color: rgb(247,247,247);
    position: absolute;

    .title{
        text-align: center;
        margin: 30px auto;
        font-weight: bold;
        font-size: 20px;
        letter-spacing: 3px;
    }
    .main{
        width: 80%;
        min-height: 70%;
        max-height: 70%;
        background-color: bisque;
        margin: 0 auto;
        padding-top: 40px;
        overflow-y: auto;
        .main-card{
           width: 80%;
           margin: 0 auto;
           margin-bottom: 20px;
           border: 1px solid #E6E6E6;
           background: #fff;
           height: 123px;

            .card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .card-title{
                    font-size: 16px;
                    color: black;
                }
                
            }

       }
    }
}
a:link {color: #7a7a7a;} /* 未被访问的链接 蓝色 */
a:visited {color: #7a7a7a;} /* 已被访问过的链接 蓝色 */
a:hover {color: blue} /* 鼠标悬浮在上的链接 蓝色 */
a:active {color: blue} /* 鼠标点中激活链接 蓝色 */

a{
    font-size: 14px;
    text-decoration: none;
    margin-right: 14px;
    cursor: pointer;

    p:hover{
        color: blue
    }
}
</style>