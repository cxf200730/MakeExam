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
      }
    }
     
  },
  mutations: {
    UserLogin(state:any, UserInfo:any){ //设置参数
      state.UserInfo = UserInfo;
    }
  },
  actions: {
  },
  modules: {
   
  }
})
