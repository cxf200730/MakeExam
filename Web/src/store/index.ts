import { createStore } from 'vuex'


export default createStore({
  
  
  state(){
    return{
        UserInfo:{
        id:0,
        name: "",
        phone: "",
        password: "",
        totalexam: "",
      },
      stuInfo:[],
      editIndex:0
    }
     
  },
  mutations: {
    UserLogin(state:any, UserInfo:any){ //设置参数
      state.UserInfo = UserInfo;
    },
    stuInfo(state:any, stuInfo:any){ //设置参数
      state.stuInfo = stuInfo;
    },
    editIndex(state:any, editIndex:any){ //设置参数
      state.editIndex = editIndex;
    }
  },
  actions: {
  },
  modules: {
   
  }
})
