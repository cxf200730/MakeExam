import { ref } from "vue"


interface IUser{
    account: string;
    email: string;
    password: string;
    password2: string;
}


export const registerUser = ref<IUser>({
    account:"",
    email:"",
    password:"",
    password2:""
})

const validatePass2 = (rule: any, value: string, callback: any) => {
    if (value === '') {
      callback(new Error('请再次输入密码'));
    } else if (value !== registerUser.value.password) {
      callback(new Error('两次输入密码不一致!'));
    } else {
      callback();
    }
  };
  
export const registerRules = ref({
    account:[{
        required: true,
        trigger: "blur",
        message:"account can not be empty",
    }
    ],
    email:[{
        type:"email",
        message:"Email is incorrect",
        required: true,
        trigger: "blur"
    }
    ],
    password:[
        {
            required: true,
            message: "Password could not be empty...",
            trigger: "blur"
        },
        {
            min: 3,
            max: 20,
            message: "Password's length has to be 3 to 20 characters...",
            trigger: "blur"
        }
    ],
    password2:[
        {
            required: true,
            message: "Password2 could not be empty...",
            trigger: "blur"
        },
        {
            min: 3,
            max: 20,
            message: "Password's length has to be 3 to 20 characters...",
            trigger: "blur"
        },
        {validator: validatePass2, trigger: 'blur'}
    ]
})

