import {createApp} from "https://unpkg.com/vue@3/dist/vue.esm-browser.js"

const apiUrl ="https://vue3-course-api.hexschool.io/"
const apiPath="susu3131"
let productModal = {};
let delModal = {};


createApp({
  data(){
    return{
      products:[],
      tempProduct:{
        imagesUrl:[],
      },
      isNew:false,
    }
  },
  methods: {
    //取得資料
    getData(){
      const url = `${apiUrl}v2/api/${apiPath}/admin/products/all`
      axios.get(url)
        .then(res => this.products = res.data.products)
        .catch(err => console.log(err.data))
    },
    //驗證登入
    checkLogin(){
      const url = `${apiUrl}v2/api/user/check`
      axios.post(url)
        .then((res)=>this.getData())
        .catch(err=> {
          alert(err.data.message)
          window.location='index.html'
        })
    },
    //開啟 刪除modal視窗
    openDeleteData(product){
      delModal.show(); 
      this.tempProduct = {...product};
    },
    //開啟 新增modal視窗
    openModal(status , product){
      if(status == "create"){
        productModal.show();
        this.isNew = true;
        //初始資料
        this.tempProduct = {
          imagesUrl:[],
        }
      }
      else if(status == 'edit'){
        productModal.show();
        this.isNew = false;
        this.tempProduct = {...product}
      }
    },
    //新增、更新產品
    updateProduct(){
      let url = `${apiUrl}v2/api/${apiPath}/admin/product`
      let method = 'post';

      if(!this.isNew){
        url = `${apiUrl}v2/api/${apiPath}/admin/product/${this.tempProduct.id}`
        method = 'put';
      }
      axios[method](url,{ data:this.tempProduct })
        .then(res => {
          this.getData();
          productModal.hide();
        })
        .catch(err =>console.log(err.data.message))

    },
    deleteProduct(){
      const url = `${apiUrl}v2/api/${apiPath}/admin/product/${this.tempProduct.id}`
      axios.delete(url)
        .then(res => {
          this.getData();
          delModal.hide();          
        })
        .catch(err => console.log(err.data.message))
    }
  },
  mounted() {
    //預設代入token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)restoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;
    //驗證登入
    this.checkLogin();
    // modal初始化
    productModal = new bootstrap.Modal('#productModal');
    delModal = new bootstrap.Modal('#delProductModal');

  }


}).mount('#app')