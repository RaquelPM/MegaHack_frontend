<template>
  <div class="d-flex flex-column">
    <b-navbar id="navbar" class = "fixed-top">  
      <div v-if="!logado" class = "w-75 d-flex">
        <b-button id="button" v-b-toggle.sidebar-cadastro class="bg-white font-weight-bold px-4 border-0 ml-4" >Cadastre-se</b-button>
        <b-button v-b-toggle.sidebar-login class="bg-transparent text-white font-weight-bold ml-2 border-0 px-4">Login</b-button>
      </div>
      <div v-if="logado" class="d-flex align-items-center mb-1">
        <b-avatar  class="ml-3" size="3rem "></b-avatar>
        <h4 id="nome" v-on:click="ir_perfil" class="text-white mt-2 font-weight-bold ml-2">{{user}}</h4>
      </div>
      <div class="w-100 justify-content-end d-flex">
        <img v-on:click="home" class="mr-3" width="85" src="@/static/Ativo 3.png">
      </div>
    </b-navbar>

    <b-sidebar id="sidebar-login" shadow>
      <h1 class="font-weight-bold justify-content-star d-flex pt-2 pb-1 ml-4 " id="title_login">Login</h1>
      <div class="px-1 py-2 mx-2 border border-primary border-left-0 border-right-0 border-bottom-0">
        <form class="px-2 mt-3" id="login_form" @submit="logar">
          <input
          placeholder="Usuário"
          required
          v-model="log.user"
          type="text"
          class="mb-4 border py-2 pl-2 w-100 font-weight-bold"
          >
          <input
          placeholder="Senha"
          required
          v-model="log.senha"
          type="password"
          class="mb-4 border py-2 pl-2 w-100 font-weight-bold"
          >
          <transition name="fade">
              <div class="d-flex w-100 ml-4 mb-3 text-info" v-if="processo" >
                <b-spinner class="ml-2" variant="contrast-color" label="Spinning"></b-spinner>
                <h4 class="mt-1 ml-3 font-weight-bold text-contrast-color">Carregando</h4>
              </div>
          </transition>
          <b-button
          id="button_1"
          type="submit"
          class="w-100 font-weight-bold"
          >Logar</b-button>
        </form>
      </div>
    </b-sidebar>

    <b-sidebar id="sidebar-cadastro" shadow>
       <h1  class="font-weight-bold pt-2 pb-1 d-flex jusify-content-star ml-2" id="title_login">Cadastre-se </h1>
      <div class="px-2 pb-3 border border-primary mx-2 border-right-0 border-bottom-0 border-left-0">
        <form id="cadastrado" class="px-2 mt-3" v-on:submit="cadastrar" ecytipe = "multipart/form-data">
          <input
            placeholder="Usuário"
            type="text"
            v-model="cas.user"
            required
            class="mb-4 border py-2 pl-2 w-100 font-weight-bold"
          >
          <input
            placeholder="Senha"
            type="password"
            v-model="cas.senha"
            required
            class="mb-4 border py-2 pl-2 w-100 font-weight-bold"
          >
          <input
            placeholder="Email"
            type="email"
            v-model="cas.email"
            required
            class="mb-4 border py-2 pl-2 w-100 font-weight-bold"
          >
          <input
            placeholder="Telefone"
            type="telephone"
            v-model="cas.phone"
            required
            class="mb-4 border py-2 pl-2 w-100 font-weight-bold"
          >
          <b-button
            id="button_2"
            class="w-100 font-weight-bold"
            type="submit"
          >Cadastre-se</b-button>
        </form>
        <p v-if="!autentica" v-on:click="a" class="mt-3 font-weigth-bold text-secondary">Autentique seu cadastro</p>
      </div>
      <div v-if="autentica" class="d-flex flex-column border border-bottom-0 border-left-0 border-right-0 border-primary mx-2 px-3">
        <form v-on:submit="autenticar">
            <input
              required
              v-model="token_auth"
              class="mb-3 mt-3 py-2 pl-2 border font-weight-bold w-100"
              placeholder=" Insira o codigo de autenticação"
            >
            <b-button
                id="button_1"
                class="w-100 font-weight-bold"
                type="submit"
              >Autenticar</b-button>
          </form>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import router from '@/routes'
export default {
  data(){
    return{
      logado:localStorage.getItem('Token'),
      processo:undefined,
      autentica: false,
      token_auth:"",
      erro:"",
      log:{
          user:'',
          senha:''
      },
      cas:{
        user:'',
        senha:'',
        email:'',
        phone:'',
      },
    }
  },
  props:{
    user:String,
    premium:Boolean,
  },
  methods:{
    logar(event){
     event.preventDefault();

     fetch(`http://127.0.0.1:8000/users/token-login/`,{
          method: "POST",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify({
            "username": this.log.user,
            "password": this.log.senha 
          })
        })

        .then(resp=> resp.json())
        .then(resp=> {
            localStorage.setItem('Token', resp.token);
            console.log(localStorage.getItem('Token'))
        })
        .catch(error => {
              console.log(error);
        })
    },
    cadastrar(event){
      event.preventDefault();

       const username = this.cas.user;
       const password = this.cas.senha;
       const phone = this.cas.phone;
       const email = this.cas.email;
    
      fetch(`http://127.0.0.1:8000/users/`,{
            method: "POST",
            headers:{
              "Content-Type":"application/json",
            },
            body:JSON.stringify({
                "username": username,
                "password": password,
                "profile": {
                      "phone": phone,
                      "email": email,
                     }})
            })

          .then(resp=> resp.json())
          .then(resp=> {
              this.erro=resp.error
              console.log(this.erro);

          })
          .catch(error => {
              console.log(error.message)
          })
    },
    a(){
      this.autentica=true;
    },
    autenticar(){
      event.preventDefault();

      const token = this.token_auth;

      fetch(`http://127.0.0.1:8000/users/authenticate-email/`,{
            method: "POST",
            headers:{
              "Content-Type":"application/json",
            },
            body:JSON.stringify({
                "token":token
            })
         })

          .then(resp=> resp.json())
          .then(resp=> {
              console.log(resp);
              //router.replace({name: "inicio"}); 
          })
          .catch(error => {
              console.log(error.message);
          })
    },
    home(){
      router.push({name:'Home'})
    },
    ir_perfil(){
      router.push({name:'meuperfil'})
    }
  }
}
</script>

<style scoped>
#navbar{
  background-color:#092060;
}
#button{
  color:#092060;
}
#title_login{
  color:#092060;
  font-size:50px;
}
#button_1,#button_2{
  background-color:#1f3e93;
}
#nome{
  cursor:pointer;
}
</style>
