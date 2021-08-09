import { ref } from "vue"


interface IUser{
    phone: string;
    password: string;
}


export const user  = ref<IUser>({
    phone:"",
    password:""
})

export const rules = ref({
    phone:[{
        required: true,
        trigger: "blur",
        message: "手机号不能为空",
    },
    {
        min: 11,
        max: 11,
        message: "手机号的长度是11位",
        trigger: "blur"
    }
    ],
    password:[
        {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
        },
        {
            min: 3,
            max: 20,
            message: "密码的长度在3-20位",
            trigger: "blur"
        }
    ]
})