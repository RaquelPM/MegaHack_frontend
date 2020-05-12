<template>
<div>
    <Nav :user="self.username" />
    <div id="top_perfil">
        <div class="w-100 mt-3 h-100 d-flex justify-content-star align-items-center">
            <b-avatar class="ml-3" size="9rem"></b-avatar>
            <div class="ml-1 flex-column align-items-start d-flex"> 
                <div class="d-flex">
                    <h1 class="ml-3" >{{user[0].username}}</h1>
                    <b-icon-star-fill v-if="user[0].profile.is_premium" variant="warning" class="ml-2"  id="estrelaa" ></b-icon-star-fill>
                </div>
                <h4 class="text-secondary ml-3" >{{user[0].profile.points}} pontos</h4>
                <div class="d-flex">
                    <h4 class="text-secondary ml-3 mr-2" >{{user[0].profile.score}}</h4>
                    <b-icon-heart-fill id="cora" variant="danger" ></b-icon-heart-fill>
                </div>
            </div>
        </div>
        <div class="w-100 d-flex justify-content-end">
                <b-button v-b-modal.atendimento v-on:mouseover="sim" v-on:mouseout="nao" v-bind:class="{com:mouse, sem:!mouse}" id="botano" class=" mr-4">Solicite um atendimento</b-button>
        </div>
        <div class="w-100 mt-3">
            <div v-for="review in reviews" :key="review" >
                <reviews :Produto="review.product" :comentario="review.description" :grade="review.grade" :likes="review.likes" :loja="review.formated_store[1]" />
            </div>
        </div>
    </div>
    <b-modal id="atendimento" centered :title="title" hide-footer>
            <div v-if="!logado" class="d-flex justify-content-center flex-column">
                <h5 class="text-secondary" >Você so pode solicitar atendimentos enquanto estiver logado</h5>
                <div class="d-flex mt-2 justify-content-end">
                    <b-button @click="$bvModal.hide('atendimento')" id="check" size="sm"><b-icon-check-circle ></b-icon-check-circle></b-button>
                </div>
            </div>
            <div v-if="logado" class="w-100 d-flex flex-column">
                <h4>Em qual produto você precisa de ajuda?</h4>
                <form @submit="solicitar" >
                    <b-input class="mt-2" type="text" required placeholder="Digite o nome do produto" v-model="pro" ></b-input>
                    <div class="d-flex mt-3 justify-content-end">
                        <b-button type="submit" id="check" size="sm" class="mr-2 px-4" >Confirmar</b-button>
                        <b-button @click="$bvModal.hide('atendimento')" id="check" size="sm" class="px-4">Cancelar</b-button>
                    </div>
                </form>
            </div>
        </b-modal>
</div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import reviews from '@/components/reviews.vue'
import {
    BIconStarFill,
    BIconHeartFill,
    BIconCheckCircle,
} from 'bootstrap-vue'
import { get_data } from '@/fetchs.js'

    export default{
        components:{
            BIconStarFill,
            BIconHeartFill,
            Nav,
            reviews,
            BIconCheckCircle,
        },
        data(){
            return{
                self:{},
                user:{},
                reviews:{},
                mouse:undefined,
                logado:localStorage.getItem('Token'),
                pro:'',
                title:"Solicite um atendimento"
            }
        },
        created(){
            get_data("users/?name=" + localStorage.getItem('User'))
            .then(resp=>{
            this.user=resp.results
            })
            .catch(error=>alert(error.message))

            get_data("reviews/?author=" + localStorage.getItem('User'))
            .then(resp=>{
            this.reviews=resp.results
            })
            .catch(error=>alert(error.message))

            if(localStorage.getItem('Token')){
                get_data("users/self/")
                    .then(resp=>{
                    this.self=resp
                    })
                    .catch(error=>alert(error.message))
            }
        },
        methods:{
            sim(){
                this.mouse=true;
            },
            nao(){
                this.mouse=false;
            },
            solicitar(event){
                event.preventDefault();
                fetch(`http://127.0.0.1:8000/attendance/client/`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${this.logado}`
                },
                body:JSON.stringify({
                    "attendant": this.user[0].id,
                    "product": this.pro,
                })
                })
                .then(resp=> resp.json())
                .then(resp=> {
                    console.log(resp);
                    this.title=resp.message
                    setTimeout(()=>{
                    this.$bvModal.hide('atendimento');  
                    }, 800);
                    this.title="Solicite um atendimento";  
                })
                .catch(error => {
                    alert(error.message);
                })
            }
        }
    }
</script>

<style scope>
#estrelaa{
    font-size:35px;
    margin-top:5px;
}
#top_perfil{
    height:150px;
}
#cora{
    font-size:22px;
    margin-top:3px;
}
.sem{
    color: #092060;
    background-color:white;
    border-color:#092060;
}
.com{
    background-color:#1f3e93;
    color: white;
    border:0px;
}
#check{
    font-size:15px;
    border-radius:17px;
    background-color:#092060;
}
</style>