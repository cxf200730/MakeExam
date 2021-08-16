<template>
    <el-container class="bg">
        <el-header height = 5%></el-header>
        <el-main>
            <div class="content">
                <div class="content-left">
                    <el-collapse v-model="activeNames" @change="handleChange">
                        <el-collapse-item title="考生信息" name="1" >
                            <div style="width: 100%;display: flex;flex-flow: row wrap; justify-content: space-around;height: auto;">
                                <el-button type = "primary" plain round size = "mini" @click="addName"  icon="el-icon-user-solid" >姓名</el-button>
                                <el-button type = "primary" plain round size = "mini"  icon="el-icon-user">基本信息</el-button>
                                <el-button type = "primary" plain round size = "mini" @click="addCode" icon="el-icon-s-cooperation">学号</el-button>
                                <el-button type = "primary" plain round size = "mini"  icon="el-icon-message">其他信息</el-button>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="考试题型" name="2">
                            <div style="width: 100%;display: flex;flex-flow: row wrap; justify-content: space-around;height: auto;">
                                <el-button type = "primary" plain round size = "mini" @click="dialogFormVisible = true"  icon="el-icon-help">考试单选</el-button>
                                <el-button type = "primary" plain round size = "mini" @click="dialogFormVisible = true"  icon="el-icon-finished">考试判断</el-button>
                                <el-button type = "primary" plain round size = "mini" @click="dialogFormVisible = true"  icon="el-icon-s-help">考试多选</el-button>
                                <el-button type = "primary" plain round size = "mini" @click="dialogFormVisible = true"  icon="el-icon-document-remove">单项填空</el-button>
                                <el-button type = "primary" plain round size = "mini" @click="dialogFormVisible = true"  icon="el-icon-tickets">多项填空</el-button>
                                <el-button type = "primary" plain round size = "mini" @click="dialogFormVisible = true"  icon="el-icon-edit">简答题目</el-button>
                                <el-button type = "primary" plain round size = "mini" @click="dialogFormVisible = true" icon="el-icon-chat-line-square">多项简答</el-button>
                                <el-button type = "primary" plain round size = "mini" @click="dialogFormVisible = true"  icon="el-icon-s-order">考试文件</el-button>
                                <el-button type = "primary" plain round size = "mini" @click="dialogFormVisible = true"  icon="el-icon-picture-outline-round">考试绘图</el-button>
                                <el-button type = "primary" plain round size = "mini" @click="dialogFormVisible = true"  icon="el-icon-postcard">完形填空</el-button>
                                <el-button type = "primary" plain round size = "mini" @click="dialogFormVisible = true"  icon="el-icon-s-order">多项文件</el-button>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="分页说明" name="3">
                            <div style="width: 100%;display: flex;flex-flow: row wrap; justify-content: space-around;height: auto;">
                                <el-button type = "primary" plain round size = "mini" @click="dialogFormVisible = true" icon="el-icon-scissors"> 分 页 栏 </el-button>
                                <el-button type = "primary" plain round size = "mini" @click="dialogFormVisible = true" icon="el-icon-notebook-2">一题一页</el-button>
                                <el-button type = "primary" plain round size = "mini" @click="dialogFormVisible = true" icon="el-icon-position">段落说明</el-button>
                            
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="其他题型" name="4">
                            
                        </el-collapse-item>
                    </el-collapse>

                   
                </div>
                <div class="content-right">
                    <div class="content-right-title">
                        <p @click="changeTitleVisible = true">{{examTitle}}</p>
                    </div>
                    <hr />
                    <div class="content-right-exam">
                        <div  class="main" style="display: flex;flex-direction: column;" v-for="(item, index) in stuInfo" :key = "index">
                            <el-input v-model="stuName" :placeholder=stutitle[parseInt(index.toString())] style="margin-top: 30px;width: 300px;margin-left:40px"></el-input>
                            <el-button @click="delstuInfo(index)">删除</el-button>
                        </div>

                        <div class="main" style="display: flex;flex-direction: column;" v-for="(item,index) in allForm" :key = index>
                           <div class="exam-item">
                                <div style="width: 750px;height: auto;margin-top: 30px;display:flex ">
                                    <el-badge  :hidden = !item.ismust  type = "info" value="*" class="item">
                                        {{index + 1}}.
                                    </el-badge>
                                    <img  :src= item.imgsrc  style="width: 600px;margin-left:30px"/>
                                    （{{item.score}}分）
                                </div>
                                <el-radio-group v-model=item.answer style="margin-top: 20px;" v-for = "index2 in parseInt(item.optionnum.toString())" :key = index2>
                                    <el-radio :label=index2 style = "margin-left:40px">{{choose[index2 - 1]}}</el-radio>
                                </el-radio-group>
                                <el-button @click="delexamItem(index)">删除</el-button>
                            </div>
                        </div>
                        <el-button type = "success" style="width: 40%;margin: 30px 30%;" @click="testPost">提交试卷</el-button>
                    </div>
                </div>
            </div>
        </el-main>

       

        <el-dialog title="设置题目" v-model="changeTitleVisible" width="30%" :close-on-click-modal = "false" :close-on-press-escape = "false" :show-close = "false">
            <el-form :model="addForm" style="width: 90%;">
                <el-form-item label="试卷题目">
                    <el-input v-model="examTitle" clearable></el-input>
                </el-form-item>
            </el-form>
            <el-form-item size="large" style="text-align: right;transform: translateX(-10%);">
                <el-button type="primary" @click="changeTitleVisible = false">修改</el-button>
            </el-form-item>
        </el-dialog>

        <el-dialog title="添加单选" v-model="dialogFormVisible">
            <el-form :model="addForm" style="width: 90%;">
                
                <el-form-item label="是否必答" prop="delivery" :label-width="formLabelWidth">
                    <el-switch v-model="addForm.ismust"></el-switch>
                </el-form-item>
                <el-form-item label="题目分数" :label-width="formLabelWidth">
                    <el-select-v2
                        v-model="addForm.score"
                        :options="options"
                        placeholder="请选择"
                        style="width: 200px;"
                    />
                </el-form-item>

                    <el-form-item label="选项个数" :label-width="formLabelWidth">
                    <el-select-v2
                        v-model="addForm.optionnum"
                        :options="options2"
                        placeholder="请选择"
                        style="width: 200px;"
                    />
                </el-form-item>

                <el-form-item label="正确选项" :label-width="formLabelWidth">
                    <el-select v-model="addForm.answer" placeholder="请选择">
                        <el-option
                        v-for="item in options3"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="margin-left: 10%">
                    <div class="upload">
                        <el-upload
                            class="avatar-uploader"
                            :action= domain
                            :http-request = upqiniu
                            :show-file-list="false"
                            :before-upload="beforeUpload">
                            <img v-if="imageUrl" :src="imageUrl" style = "max-width: 70%;">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        </div>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addItem()">确 定</el-button>
                </span>
            </template>
            
        </el-dialog>
        
    </el-container>
</template>
<script lang="ts">
import { user } from "@/utils/login";
import { ref, reactive, getCurrentInstance } from "vue"
import { useStore } from "vuex"
export default{
    name:"Make",
    components:{},
    setup(prop:any){
        // @ts-ignore
        const { ctx } = getCurrentInstance();
        let { proxy }:any = getCurrentInstance();
        const store = useStore()
        
        const imageUrl = ref('')
        const token = ref({})
        // 七牛云的上传地址，根据自己所在地区选择，我这里是华南区
        const domain = ref('https://upload-z2.qiniup.com')
        // 这是七牛云空间的外链默认域名
        const qiniuaddr = ref('qxg2acp58.hn-bkt.clouddn.com')
        var examTitle = ref("点击修改试卷的题目")

                  // 上传文件到七牛云
                function upqiniu (req: any) {
                  console.log(req)
                  const config = ref({
                    headers: {'Content-Type': 'multipart/form-data'}
                  })
                  let filetype = ''
                  if (req.file.type === 'image/png') {
                    filetype = 'png'
                  } else {
                    filetype = 'jpg'
                  }
                  // 重命名要上传的文件
                  const keyname = 'makeexam' + new Date().getTime() + '.' + filetype
                  // 从后端获取上传凭证token
                  proxy.$axios.get('/up/token').then((res: any) => {
                    console.log(res)
                    const formdata = new FormData()
                    formdata.append('file', req.file)
                    formdata.append('token', res.data)
                    formdata.append('key', keyname)
                    // 获取到凭证之后再将文件上传到七牛云空间
                    proxy.$axios.post(domain.value, formdata, config.value).then((res: any) => {
                      imageUrl.value = 'http://' + qiniuaddr.value + '/' + res.data.key
                      // console.log(this.imageUrl)
                    })
                  })
                }
          // 验证文件合法性
        function  beforeUpload (file: any) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isJPG) {
                proxy.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                proxy.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
          }

          interface IAllForm{
                examtitle:string,
                teacher_phone:string,
                examindex:string,
                ismust:boolean,
                imgsrc:string,
                answer:number,
                score:number,
                optionnum:number | string
          }

        const allForm:Array<IAllForm> = reactive([])
        if(store.state.editIndex === 0){

        }else{
            proxy.$axios.post('http://localhost:3000/teacher/getexam',{
                teacher_phone:store.state.UserInfo.phone,
                examindex:store.state.editIndex,
            }).then((res:any) => {
                
                for (let i = 0; i < res.data.message.length; i++) {
                    const test = {
                        examtitle:res.data.message[i].examtitle,
                        teacher_phone:res.data.message[i].teacher_phone,
                        examindex:res.data.message[i].examindex,
                        ismust: res.data.message[i].ismust,
                        imgsrc: res.data.message[i].imgsrc,
                        score: res.data.message[i].score,
                        optionnum:res.data.message[i].optionnum,
                        answer:res.data.message[i].answer ,
                    }
                    allForm.push(test);
                }
                proxy.examTitle = res.data.message[0].examtitle
                console.log(res.data.message[0].examtitle);
            })
        }


        const delexamItem = (index:number)=>{
            allForm.splice(index,1);
        }

    

       
        const dialogFormVisible = ref(false);
        const changeTitleVisible = ref(false);
       
        enum choose  {
           "A",
           "B",
           "C",
           "D",
           "E",
           "F",
           "G"
       }
        const addForm = reactive({
            ismust: true,
            score: 5,
            imgsrc:'',
            answer:2,
            optionnum:4
        })
        const activeNames = reactive(['1', '2']);
        const options = reactive(
            Array.from({ length: 201 }).map((_, idx) => ({
          value: `${idx * 0.5}`,
          label: `${idx * 0.5}`,
        }))
        );
        const options2 = reactive(
            Array.from({ length: 5 }).map((_, idx) => ({
          value: `${idx + 2}`,
          label: `${idx + 2}`,
        }))
        );
       function handleChange(val: any) {
        console.log(val);
      }
        const radio = ref(3)
        const formLabelWidth = ref('120px');
        
        const fileList = ref(
            []
        )



        
      function handleChangeUpload(file: any, fileList: Array<string>){
         console.log(file);
         addForm.imgsrc = file.url
      }

      let stutitle: Array<string> = reactive([])
      const stuInfo:any = reactive([])
      let stuName = ref("")
    const addName = () => {
        stutitle.push("姓名")
        const nameInput = {
            teacher_phone:store.state.UserInfo.phone,
            examindex:store.state.UserInfo.totalexam,
            title:"姓名",
            name:""
        }
        stuInfo.push(nameInput);
    };

    const addCode = () => {
        stutitle.push("学号")
        const codeInput = {
            teacher_phone:store.state.UserInfo.phone,
            examindex:store.state.UserInfo.totalexam,
            title:"学号",
            code:""
        }
        stuInfo.push(codeInput);
    };
    

      function addItem(){
        dialogFormVisible.value = false;
        fileList.value = []
    
        const test = {
            examtitle:'',
            teacher_phone:store.state.UserInfo.phone,
            examindex:store.state.UserInfo.totalexam,
            ismust: addForm.ismust,
            imgsrc: imageUrl.value,
            score: addForm.score,
            optionnum:addForm.optionnum,
            answer:addForm.answer,
        }
        console.log(test);

        allForm.push(test);
        imageUrl.value = ""
      }

const delstuInfo = (index:number) => {
    stuInfo.splice(index,1);
    stutitle.splice(index,1);
}

      const options3 = reactive( [{
          value: 1,
          label: 'A'
        }, {
          value: 2,
          label: 'B'
        }, {
          value: 3,
          label: 'C'
        }, {
          value: 4,
          label: 'D'
        }, {
          value: 5,
          label: 'E'
        }])
        const value = ref(1)


        const test = () => {
            console.log(123)
            // console.log(ctx);
            // proxy.$axios.get('http://localhost:3000/teacher').then((res:any) => {
            // console.log(res.data.message);
            // })
            console.log(store.state.UserInfo);
        }


        const testPost = () => {
            
            for (let i = allForm.length - 1; i >  -1; i--) {
                proxy.$axios.post('http://localhost:3000/teacher/addtopic',{
                    examtitle:examTitle.value,
                    teacher_phone:store.state.UserInfo.phone,
                    examindex:store.state.editIndex,
                    ismust:allForm[i].ismust,
                    imgsrc:allForm[i].imgsrc,
                    score:allForm[i].score,
                    optionnum:allForm[i].optionnum,
                    answer:allForm[i].answer,
                }).then((res:any) => {
                    
                })    
                      
            }
            store.commit('stuInfo',stuInfo)
            const count:string = localStorage.getItem('make_totalexam')!
            localStorage.setItem('make_totalexam', (parseInt(count) + 1).toString())
            proxy.$router.push("http://localhost:8080/exam");
            // let routeData = proxy.$router.resolve({ path: '/exam'});
            // window.open(routeData.href, '_blank');
        }

       

        
        return{dialogFormVisible, 
            changeTitleVisible,
            addName,
            addCode,
            stuName,
            stutitle,
            stuInfo,
            delstuInfo,
            examTitle,
            formLabelWidth, 
            options, 
            options2,
            radio, 
            activeNames, 
            handleChange, 
            handleChangeUpload, 
            fileList, 
            addItem,
            addForm,
            options3,
            value,
            allForm,
            delexamItem,
            test,
            choose,
            testPost,


            imageUrl,
            token,
            domain,
            qiniuaddr,
            upqiniu,
            beforeUpload
        }
    }
};
</script>
<style scoped lang = "less">
.bg{
    height: 100%;
	width: 100%;
    background-color: rgb(245,245,245);
    .el-header{
        background-color: rgb(49,49,49);
        color: #333;
        text-align: center;
        line-height: 42px;
    }
  .el-main {
    background-color: rgb(245,245,245);
    color: #333;
    width: 1138px;
    //overflow-y: hidden;
    padding: 0px;
    padding-top: 10px;
    margin: 0 auto;
    .content{
        background-color: rgb(245,245,245);
        width: 100%;
        height: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .content-left{
            width: 18%;
            background-color: rgb(255, 255, 255);
            box-shadow: 0px 0px 10px 0px #dfdfdf;
            padding: 0px 0 40px;
            margin-right: 8px;
        }

        .content-right{
            width: 80%;
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
    .content-right-title p:hover{
        background-color: #FAFAFA;
        cursor: pointer;
    }
}

// .el-button--mini:hover{background-color: rgb(180, 155, 10);color: white;}
/deep/ .el-collapse-item__header{
    font-weight: bold;
    margin-left: 15px;

}

.el-button--mini{
    margin: 4px;
}
</style>