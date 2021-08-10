<template>
    <div class="bg">
        <el-main>
                <div class="content">
        <div class="content-right">
                        <div class="content-right-title">
                            <p>{{examtitle}}</p>
                        </div>
                        <p style="position: absolute;right: 15%;margin-top: -10px;">
                            <div style="height: 30px;width:100%;margin-left: 10px;" v-if = "scoreShow">得分：{{studentAllScore}} / {{AllScore}}</div>
                        </p>
                        <hr />
                        <div class="content-right-exam">
                            <div  class="main" style="display: flex;flex-direction: column;" v-for="(item, index) in parseInt(stu.toString())">
                                <el-input :disabled=stucanin v-model="stuNameCode[parseInt(index.toString())]" :placeholder=stuInfo[parseInt(index.toString())] style="margin-top: 30px;width: 300px;margin-left:40px"></el-input>
                            </div>

                            <div class="main" style="display: flex;flex-direction: column;" v-for="(item,index) in allForm" :key = index>
                               <div class="exam-item">
                                    <div style="width: 95%;height: auto;margin-top: 30px;display:flex ">
                                        <el-badge  :hidden = !item.ismust  type = "info" value="*" class="item">
                                            {{index + 1}}.
                                        </el-badge>
                                        <img  :src= item.imgsrc  style="width: 70%;margin-left:30px"/>
                                        <div>
                                            （{{item.score}}分）
                                            <div style="height: 30px;width:100%;background-color: aqua;margin-left: 10px;" v-if = "scoreShow">得分：{{studentScore[index]}}/{{item.score}}</div>
                                            <Close style="width: 5em; height: 5em; margin-right: 8px;" color="red"  v-if="panduan[index] == false"/>
                                        </div>
                                            
                                    </div>
                                    
                                    <el-radio-group v-model="studentAnswer[index]" style="margin-top: 20px;" v-for = "(item2,index2) in parseInt(item.optionnum.toString())" :key = index2>
                                        <el-radio id="cho"  :disabled = canchoose :label=answerItem[index2] style = "margin-left:40px">{{choose[index2]}}</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                            <el-button type = "success" style="width: 40%;margin: 30px 30%;" @click="upexam">提交试卷</el-button>
                        </div>
                    </div>
                </div>
            </el-main>
    </div>
    </template>
    
    <script lang = "ts">
    import { Edit ,Close} from '@element-plus/icons'
    import {ref, reactive, onBeforeMount, getCurrentInstance} from "vue"
    import { useStore } from "vuex"
    export default{
        components: {
       
        // 或者以缩写的方式,
        Edit,
        Close
      },
        setup(){
            let { proxy }:any = getCurrentInstance();
            const store = useStore()
            let userInfo = store.state.UserInfo
            let stuInfo = ref(["姓名","学号"])
            let stuNameCode = ref([])
            
            type obj = {
                ismust: any;
                imgsrc: any;
                answer: any;
                score: any;
                optionnum: any;
            }
    
            let form:Array<obj> = [
              
            ];
    
            
                const allForm:Array<obj> = reactive([
                    
                ])
                let examtitle = ref('')

                let phone = proxy.$route.query.phone;
                let index = proxy.$route.query.index;
                let stu = reactive(proxy.$route.query.stu);

                console.log(phone + " + " + index + " + " + stu);
                
            proxy.$axios.get("http://localhost:3000/teacher/doexam?index=" + index + "&phone=" + phone).then((res:any) => {
                console.log(res.data);
                
                form = res.data.message;
                console.log(form);
                if(res.data.message[0] !== 0){
                examtitle.value =  res.data.message[0].examtitle
    
                for (let i = 0; i < form.length; i++) {
                    const form3:obj = {
                            ismust:form[i].ismust,
                            imgsrc:form[i].imgsrc,
                            answer:form[i].answer,
                            score:form[i].score,
                            optionnum:form[i].optionnum
                        }
                    trueAnswer[i] = form[i].answer
                    AllScore.value += parseInt(form[i].score.toString())
                    allForm.push(form3)
                }
            }else{
                console.log("没有题目");
                
            }
            })
    
          
         
          
            enum choose  {
               "A",
               "B",
               "C",
               "D",
               "E",
               "F",
               "G"
           }
           let canchoose = ref(false)
           let stucanin = ref(false)
           let panduan:Array<boolean>= reactive([]);
           const upexam = () => {

            //    console.log("学生的答案" + studentAnswer + typeof(studentAnswer))
            //    console.log(JSON.stringify(studentAnswer).toString()  + typeof(studentAnswer));
            // console.log(studentAnswer);
            
               
               console.log("学生的姓名：" + stuNameCode.value[0])
               console.log("学生的学号：" + stuNameCode.value[1])
               console.log("正确答案" + trueAnswer)
            for (let i = 0; i < trueAnswer.length; i++) {
                if(trueAnswer[i] == studentAnswer[i]){
                    panduan[i] = true
                    studentScore[i] = allForm[i].score
                    studentAllScore.value += parseInt(allForm[i].score.toString())
                }else{
                    panduan[i] = false
                    studentScore[i] = 0
                }
            }
            console.log("学生得分" + studentScore)
            canchoose.value = true
            scoreShow.value = true
            stucanin.value = true
            proxy.$axios.post('http://localhost:3000/student/up',{
                 name:stuNameCode.value[0],
                 code:stuNameCode.value[1],
                 phone:phone,
                 index:index,
                 answer:studentAnswer + ""
            }).then((res:any) => {
                console.log(res.data);
                
            })
           }
           let studentAnswer = reactive([
               
           ]
           )
    
           const scoreShow = ref(false)
           const studentAllScore = ref<number>(0)
           const AllScore = ref<number>(0)
    
            let trueAnswer:Array<number> = [];
            let studentScore:Array<number | string> = reactive([]);
    
           let answerItem = reactive([
               1,2,3,4,5,6,7
           ]
           )
            const saveTestok = () =>{
                var FileSaver = require('file-saver');
                const strobj = 
                    {
                        "url":"http://localhost:3000/teacher/doexam?index=" + store.state.UserInfo.totalexam + "&phone=" +  store.state.UserInfo.phone,
                        "uid":true,
                        "nickname":true,
                        "identity":true,
                        "size":"800x600,610x396",
                        "classin_authority":false
                    }
                let str = JSON.stringify(strobj)
    
                var blob = new Blob([str], {type: "text/plain;charset=utf-8"});
                FileSaver.saveAs(blob, "test.edu");
                
            }
            const saveTest = () =>{
                proxy.$axios.get('http://localhost:3000/teacher/doexam?index=8&phone=18172642994').then((res:any) => {
                    console.log(res.data);
                    
                })
            }
            
           return {
            stucanin,
            stu,
            stuInfo,
            stuNameCode,
            form,
            allForm,
            choose,
            upexam,
            answerItem,
            studentAnswer,
            panduan,
            canchoose,
            studentScore,
            scoreShow,
            studentAllScore,
            AllScore,
            examtitle,
            saveTest
           }
    
        }
    }
    </script>
    
    <style scoped lang = "less">
    .bg{
        height: 100%;
        width: 100%;
        background-color: rgb(245,245,245);
      
      .el-main {
        background-color: rgb(245,245,245);
        color: #333;
        width: 100%;
        padding: 0px;
        padding-top: 10px;
        margin: 0 auto;
        .content{
            background-color: rgb(245,245,245);
            width: 95%;
            height: 100%;
            margin: 0 auto;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
    
            .content-right{
                width: 100%;
                background-color: rgb(255, 255, 255);
                overflow-y: auto;
                box-shadow: 0px 5px 10px 0px #d9d9d9;
                border: 1px solid rgba(217,217,217,1);
                border-radius: 2px;
                .content-right-title{
                    height: 150px;
                    width: 100%;
                    background-color: rgb(255, 255, 255);
                    text-align: center;
                    font-size: 30px;
                    font-weight: bold;
                    line-height: 150px;
                }
                .content-right-exam{
                    .main{
                        height: auto;
                        background-color: rgb(255, 255, 255);
                        padding-left: 20px;
                        letter-spacing: 2px;
                        line-height: 25px;
    
                        /deep/ .el-badge__content{
                            color:red
                        }
    
                        /deep/ .el-badge__content--info, .el-timeline-item__node{
                            background-color:#FFF
                        }
                        /deep/ .el-badge__content{
                            font-size: 20px;
                        }
                    }
                }
            }
        }
      }
    
      .exam-item{
        border: none;
        border-bottom: 1px solid #E0E0E0;
        margin: 0;
        padding:0;
        padding-bottom: 20px;
      }
      /deep/ .el-upload-list--picture .el-upload-list__item{
          height: auto;
      }
    
      .exam-item:hover{background-color: #FAFAFA;}
    }
    
    /deep/ .el-collapse-item__header{
        font-weight: bold;
        margin-left: 15px;
    
    }
    
    .el-button--mini{
        margin: 4px;
    }
    </style>