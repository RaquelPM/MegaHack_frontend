<template>
  <div id="app" class="flex-column">
    <Nav :user="user.username"/>
    <bar/>
    <b-form class="d-flex my-2 justify-content-end w-100">
          <b-input
            class="w-25"
            v-model="nome"
            placeholder="Tem de tuuuuuudo :)"
          ></b-input>
          <b-form-select v-model="a" id="select" class="ml-2" :options="options"></b-form-select>
          <b-button size="sm" id="butun" v-on:click="pesquisar" class=" font-weight-bold border ml-2 mr-5">Buscar</b-button>
      </b-form>
    <div class="d-flex ml-5">
        <card v-if="results[0]" :tipo="results[0].product_type" :name="results[0].name" :img="results[0].url_image"/>
        <card v-if="results[1]" :tipo="results[1].product_type" :name="results[1].name" :img="results[1].url_image"/>
        <card v-if="results[2]" :tipo="results[2].product_type" :name="results[2].name" :img="results[2].url_image"/>
        <card v-if="results[3]" :tipo="results[3].product_type" :name="results[3].name" :img="results[3].url_image"/>

        <card v-if="users[0]" :tipo="users[0].profile.points" :name="users[0].username" user="true"/>
        <card v-if="users[1]" :tipo="users[1].profile.points" :name="users[1].username" user="true"/>
        <card v-if="users[2]" :tipo="users[2].profile.points" :name="users[2].username" user="true"/>
        <card v-if="users[3]" :tipo="users[3].profile.points" :name="users[3].username" user="true"/>
    </div>
    <div class="d-flex ml-5">
      <card v-if="results[4]" :tipo="results[4].product_type" :name="results[4].name" :img="results[4].url_image"/>
      <card v-if="results[5]" :tipo="results[5].product_type" :name="results[5].name" :img="results[5].url_image"/>
      <card v-if="results[6]" :tipo="results[6].product_type" :name="results[6].name" :img="results[6].url_image"/>
      <card v-if="results[7]" :tipo="results[7].product_type" :name="results[7].name" :img="results[7].url_image"/>

      <card v-if="users[4]" :tipo="users[4].profile.points" :name="users[4].username" user="true"/>
      <card v-if="users[5]" :tipo="users[5].profile.points" :name="users[5].username" user="true"/>
      <card v-if="users[6]" :tipo="users[6].profile.points" :name="users[6].username" user="true"/>
      <card v-if="users[7]" :tipo="users[7].profile.points" :name="users[7].username" user="true"/>

    </div>
    <div class="d-flex ml-5">
      <card v-if="results[8]" :tipo="results[8].product_type" :name="results[8].name" :img="results[8].url_image"/>
      <card v-if="results[9]" :tipo="results[0].product_type" :name="results[9].name" :img="results[9].url_image"/>

      <card v-if="users[8]" :tipo="users[8].profile.points" :name="users[8].username" user="true"/>
      <card v-if="users[9]" :tipo="users[9].profile.points" :name="users[9].username" user="true"/>
    </div>
    <h3 v-if="!results[0] && !users[0]" class="text-secondary mt-5"> Nenhum resultado encontrado :(</h3>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import bar from '@/components/bar.vue'
import card from '@/components/card.vue'
import { get_data, get_data_with } from '@/fetchs.js'
export default {
  name: 'App',
  components: {
    Nav,
    bar,
    card,
  },
  data(){
    return{
      results:{},
      users:{},
      a:"produto",
      nome:"",
      options:[
                  {value:'produto', text:'Produtos'},
                  {value:'users', text:'Usuários'}
              ],
      user:{},
    }
  },
  created(){
    const tipo = localStorage.getItem('Tipo')
    if(tipo){
      get_data("products/?product_type=" + localStorage.getItem('Tipo'), true)
      .then(resp=>{
        this.results=resp.results
        console.log(this.results)
      })
      .catch(error=>alert(error.message))
    }
    else{
      get_data("products/", true)
        .then(resp=>{
          this.results=resp.results
          console.log(this.results)
        })
        .catch(error=>alert(error.message))
    }
    if(localStorage.getItem('Token')){
      get_data_with("users/self/")
        .then(resp=>{
        this.user=resp
        console.log(resp)
        })
        .catch(error=>alert(error.message))
    }
  },
  methods:{
    pesquisar(){
      localStorage.removeItem('Type');
      if(this.a == "produto" && !this.nome){
        get_data("products/", true)
        .then(resp=>{
          this.results=resp.results
          this.users=0
          console.log(this.results)
        })
        .catch(error=>alert(error.message))
      }
      else if(this.a == "produto" && this.nome){
        get_data("products/?name=" + this.nome, true)
        .then(resp=>{
          this.results=resp.results
          this.users=0
          console.log(this.results)
        })
        .catch(error=>alert(error.message))
      }
      else if(this.a == "users" && !this.nome){
        get_data("users/", true)
        .then(resp=>{
          this.users=resp.results
          this.results=0
          console.log(resp.results)
        })
        .catch(error=>alert(error.message))
      }
      else if(this.a == "users" && this.nome){
        get_data("users/?name=" + this.nome, true)
        .then(resp=>{
          this.users=resp.results
          this.results=0
          console.log(resp.results)
        })
        .catch(error=>alert(error.message))
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#select{
  width:170px;
}
#butun{
  background-color:#092060;
}
</style>
