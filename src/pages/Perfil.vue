<template>
 <div>
    <Nav :user="self.username"/>
    <div id="top_perfil" class="d-flex mt-4">
        <div class="flex-column d-flex">
            <b-avatar class="ml-3 py-5" size="9rem"></b-avatar>
            <b-button v-on:click="Deslogar" id="pedir" class=" bg-transparent font-weight-bold mt-2 ml-5 mr-4" size="sm" >Logout</b-button>
        </div>
        <div class="ml-1 flex-column align-items-start d-flex"> 
                <div class="d-flex">
                    <h1 class="ml-3" >{{self.username}}</h1>
                    <b-icon-star-fill v-if="self.profile.is_premium" variant="warning" class="ml-2" id="estrelaa" ></b-icon-star-fill>
                </div>
                <h4 class="text-secondary ml-3" >{{self.profile.points}} pontos</h4>
                <div class="d-flex">
                    <h4 class="text-secondary ml-3 mr-2" >{{self.profile.score}}</h4>
                    <b-icon-heart-fill id="cora" variant="danger" ></b-icon-heart-fill>
                </div>
        </div>
    </div>
    <div class="w-100 d-flex mt-2 d-flex justify-content-end">
        <b-select v-model="valor" :options="options" class=" mr-4 mb-2 w-25">Histórico</b-select>
    </div>
    <div v-if="histviews || histviewsA" class="w-100 d-flex mt-2 d-flex justify-content-start">
        <b-button id="pedir" v-on:click="Solicitation" class=" ml-4 mr-2 bg-transparent font-weight-bold mb-2 ">Solicitações</b-button>
        <b-button id="pedir" v-on:click="Atendimentos" class="mb-2 bg-transparent font-weight-bold mb-2 ">Atendimentos</b-button>
    </div>
    <div class="w-100 mt-3">
            <div v-for="review in reviews" :key="review" >
                <reviews :Produto="review.product" :comentario="review.description" :grade="review.grade" :likes="review.likes" :loja="review.formated_store[1]" />
            </div>
            <div v-for="hist in histviews" :key="hist">
                <histviews :id="hist.id" :pode="hist.client_can_evaluate" :cliente="true" :produto="hist.product" :pessoa="hist.attendant.username" :quando="hist.created_at" />
            </div>
            <div v-for="hist in histviewsA" :key="hist">
                <histviews :id="hist.id" :pode="hist.attendant_can_evaluate" :produto="hist.product" :pessoa="hist.client.username" :quando="hist.created_at" />
            </div>
        </div>
</div>
</template>

<script>
import Nav from '@/components/Nav'
import { get_data_with } from '@/fetchs'
import {
    BIconStarFill,
    BIconHeartFill,
   // BIconCheckCircle,
} from 'bootstrap-vue'
import reviews from '@/components/reviews'
import histviews from '@/components/histview'

export default{
    components:{
        Nav,
        BIconStarFill,
        BIconHeartFill,
        reviews,
        histviews,
    },
    data(){
        return{
            self:{},
            reviews:{},
            histviews:{},
            histviewsA:{},
            valor:'comentario',
            options:[
                {value:'historico', text:'Histórico'},
                {value:'comentario', text:'Comentários'}
            ],
            que:undefined,
        }
    },
    methods:{
        Solicitation(){
            this.que=true;
        },
        Atendimentos(){
            this.que=false;
        },
        Deslogar(){
            localStorage.removeItem('Token');
            window.location.reload();
        }
    },
    created(){
        this.histviews=0;
        this.histviewsA=0;
        get_data_with("users/self/")
            .then(resp=>{
            this.self=resp
            this.reviews=resp.reviews
            this.histviews=0;
            })
            .catch(error=>alert(error.message))
    },
    watch:{
        valor: function(){
            if(this.valor=="historico"){
                this.reviews=0;
                this.histviewsA=0;
                get_data_with("attendance/client/")
                .then(resp=>{
                    this.histviews=resp.results;
                    console.log(resp);
                })
                .catch(error=>alert(error.message))
            }
            else{
                this.histviews=0;
                this.histviewsA=0;
                get_data_with("users/self/")
                .then(resp=>{
                this.reviews=resp.reviews
                })
                .catch(error=>alert(error.message))
            }
        },
        que: function(){
            if(!this.que){
                this.reviews=0;
                this.histviewsA=0;
                get_data_with("attendance/client/")
                .then(resp=>{
                    this.histviews=resp.results;
                    console.log(resp);
                })
                .catch(error=>alert(error.message))
            }
            else{
                this.reviews=0;
                this.histviews=0;
                get_data_with("attendance/attendant/")
                .then(resp=>{
                    this.histviewsA=resp.results;
                    console.log(resp);
                })
                .catch(error=>alert(error.message))
            }
        }
    }
}
</script>

<style>
#top_perfil{
    height:150px;
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
</style>