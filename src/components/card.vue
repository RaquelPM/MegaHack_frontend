<template>
    <div v-on:click="Visualizar" v-if="this.tipo" id="card" class="mt-2 mx-1" v-on:mouseover="sim" v-on:mouseout="nao" v-bind:class="{shadow:mouse, noshadow:!mouse}" >
        <img v-if="!user" class="mt-2" width="165" height="185" :src ="img" />
        <b-avatar variant="info" class="mt-3" size="9rem" v-if="user" ></b-avatar>
        <h6 class="text-justify font-weight-bold mx-3 mb-2 mt-3">{{name}}</h6>
        <div class="w-100 d-flex justify-content-star">
            <p id="loja" class="font-weight-bold text-secondary ml-3">{{tipo}}</p>
        </div>
        <div class ="w-100 d-flex justify-content-end">
            <b-icon-info-circle v-on:click="Visualizar" id="info_icon" class="mb-3 mr-3"></b-icon-info-circle>
        </div>
    </div>
</template>

<script>
import { BIconInfoCircle } from 'bootstrap-vue'
import routes from '@/routes'

export default{
    components:{
        BIconInfoCircle,
    },
    props:{
        tipo:String,
        name:String,
        img:String,
        user:Boolean,
    },
    data(){
        return{
            mouse:false
        }
    },
    methods:{
        sim(){
            this.mouse=true
        },
        nao(){
            this.mouse=false
        },
        Visualizar(){
                if(!this.user){
                    routes.push({name:'Produto'})
                    localStorage.setItem('Produto', this.name)
                }
                else if(this.user){
                    routes.push({name:'others_perfil'})
                    localStorage.setItem('User', this.name)
                }
            }
    }
}
</script>

<style>
#card{
    height:305px;
    width:300px;
    cursor:pointer;
}
#estrela,#info_icon{
    font-size:20px
}
.shadow{
    box-shadow: 2px 2px; 
}
.noshadow{
    box-shadow: 0px 0px;
}
</style>