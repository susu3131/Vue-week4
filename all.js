import {createApp} from "https://unpkg.com/vue@3/dist/vue.esm-browser.js"

const apiUrl ="https://vue3-course-api.hexschool.io/"
const apiPath="susu3131"

createApp({
  data(){
    return{
      user:{
        username:'',
        password:'',
      }
    }
  },
  methods:{
    login(){
      const loginApiUrl = `${apiUrl}/v2/admin/signin`
      axios.post(loginApiUrl,this.user)
        .then((res)=>{
          const {token,expired} = res.data  
          document.cookie =`restoken=${token};expires=${new Date(expired)}; path=/`
          alert(res.data.message)
          window.location ='product.html'
        })
        .catch((error)=>alert(error.data.message))
    }
  },
  mounted() {
    console.log('test');
  },
}).mount("#app")

