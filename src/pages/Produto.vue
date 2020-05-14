<template>
<div>
    <Nav :user="self.username" />
    <div class="d-flex w-100">
        <div class=" border-bottom-0 w-50 border">
            <img class="mt-3" height="350" width="500" :src="results.url_image"/>
            <div class="w-100 mt-3 border border-bottom-0 border-left-0 border-right-0 flex-column align-items-start justify-content-start d-flex">
                <h1 class="font-weight-bold mt-2 ml-3">{{results.name}}</h1>
                <h4 class="font-weight-bold ml-3 text-secondary mr-3" >{{results.product_type}}</h4>
                <h4 class="font-weight-bold ml-3 text-secondary mr-3">{{results.reviews.length}} reviews</h4>
            </div>
            <div class="d-flex justify-content-end w-100">
                <b-button v-b-modal.avaliar v-on:mouseover="sim" v-on:mouseout="nao" v-bind:class="{com:mouse, sem:!mouse}" id="botano" class="mt-3 mr-4" size="lg"  >Adicione seu comentário</b-button>
            </div>
        </div>
        <div class ="flex-column w-50">
            <div v-for="review in results.reviews" :key="review">
                <comment :atual="self.username" :id="review.id" :user="review.author.username" :comentario="review.description" :grade="review.grade" :loja="review.formated_store[1]"/>
            </div>
            <div v-if="!results.reviews[0]">
                <h4 class="mt-4 text-secondary">Não há nenhuma avaliação ainda, seja o primeiro :)</h4>
            </div>
        </div>
    </div>
    <b-modal id="avaliar" centered :title="title" hide-footer>
            <div v-if="!logado" class="d-flex justify-content-center flex-column">
                <h5 class="text-secondary" >Você so pode fazer comentários quando estiver logado</h5>
                <div class="d-flex mt-2 justify-content-end">
                    <b-button @click="$bvModal.hide('avaliar')" id="check" size="sm"><b-icon-check-circle ></b-icon-check-circle></b-button>
                </div>
            </div>
            <div v-if="logado" class="w-100 d-flex flex-column">
                <b-form @submit="add_comment" >
                    <div class="d-flex">
                    <b-select v-model="loja" class="mr-2 mb-2 mt-1" required :options="lojas"></b-select>
                    <v-rating color="#FFD700" half-increments hover v-model="grade" size="30px" class="ml-2"></v-rating>
                    </div>
                    <b-input v-model="description" type="text" class="py-4" id="comen" placeholder="Faça um comentário"></b-input>
                    <div class="d-flex mt-2 justify-content-end">
                        <b-button id="check" type="submit" size="sm"><b-icon-check-circle ></b-icon-check-circle></b-button>
                    </div>
                </b-form>
            </div>
        </b-modal>
</div>
</template>

<script>
import { get_data, get_data_with } from "@/fetchs"
import Nav from '@/components/Nav'
import { BIconCheckCircle } from 'bootstrap-vue'
import comment from '@/components/comments'

export default{
    components:{
        Nav,
        BIconCheckCircle,
        comment,
    },
    data(){
        return{
            self:{},
            title:'Faça uma avaliação',
            results:{},
            mouse:undefined,
            logado:localStorage.getItem('Token'),
            lojas:[
                    {value:'AMER', text: 'Lojas americanas'},
                    {value:'SUBM', text: 'Submarino'},
                    {value:'MAGA', text: 'Magazine Luiza'},
                    {value:'CASA', text: 'Casas Bahia'},
                    {value:'KABO', text: 'Kaboom'},
                    {value:'PICH', text: 'PICHAU'},
                ],
            loja:'AMER',
            description:'',
            grade:'',
        }
    },
    methods:{
        sim(){
            this.mouse=true;
        },
        nao(){
            this.mouse=false;
        },
        add_comment(event){
                event.preventDefault();
                fetch('http://127.0.0.1:8000/reviews/',{
                    method: "POST",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization": `Token ${this.logado}`
                    },
                    body:JSON.stringify({
                        "store": this.loja,
                        "description": this.description,
                        "grade": this.grade,
                        "product": this.results.name
                    })
                })
                .then(resp=> resp.json())
                .then(resp=> {
                   this.title=resp.message;
                   setTimeout(()=>{
                    this.$bvModal.hide('avaliar');  
                    }, 500);  
                   console.log(resp);
                })
                .catch(error => {
                    alert(error.message);
                })
        }
    },
    created(){
        get_data("products/detail/?product=" + localStorage.getItem('Produto'))
        .then(resp=>{
          this.results=resp
          console.log(this.results)
        })
        .catch(error=>alert(error.message))

        if(localStorage.getItem('Token')){
                get_data_with("users/self/")
                    .then(resp=>{
                    this.self=resp
                    })
                    .catch(error=>alert(error.message))
        }
    }
}
</script>

<style>
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
    font-size:20px;
    border-radius:17px;
    background-color:#092060;
}
</style>