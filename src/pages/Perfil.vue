<template>
 <div>
    <Nav :user="self.username"/>
    <div id="top_perfil" class="d-flex mt-4">
        <b-avatar class="ml-3" size="9rem"></b-avatar>
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
    <div class="w-100 d-flex justify-content-end">
        <b-button v-on:mouseover="sim" v-on:mouseout="nao" v-bind:class="{com:mouse, sem:!mouse}" id="botano" class=" mr-4">Histórico</b-button>
    </div>
    <div class="w-100 mt-3">
            <div v-for="review in reviews" :key="review" >
                <reviews :Produto="review.product" :comentario="review.description" :grade="review.grade" :likes="review.likes" :loja="review.formated_store[1]" />
            </div>
        </div>
</div>
</template>

<script>
import Nav from '@/components/Nav'
import { get_data } from '@/fetchs'
import {
    BIconStarFill,
    BIconHeartFill,
   // BIconCheckCircle,
} from 'bootstrap-vue'
import reviews from '@/components/reviews'

export default{
    components:{
        Nav,
        BIconStarFill,
        BIconHeartFill,
        reviews,
    },
    data(){
        return{
            self:{},
            reviews:{},
        }
    },
    created(){
        get_data("users/self/")
            .then(resp=>{
            this.self=resp
            this.reviews=resp.reviews
            console.log(resp)
            })
            .catch(error=>alert(error.message))
    },
    methods:{
        sim(){
                this.mouse=true;
        },
        nao(){
                this.mouse=false;
        },
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