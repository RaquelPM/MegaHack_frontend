<template>
<div id="view" v-on:mouseover="sim" v-on:mouseout="nao" v-bind:class="{shadow:mouse, noshadow:!mouse}" class="mx-2 ">
    <div class="flex-column">
        <h3 v-if="cliente" class="pt-3 font-weight-bold" >Atendimento com {{pessoa}}</h3>
        <h3 v-if="!cliente" class="pt-3 font-weight-bold" >Solicitação de {{pessoa}}</h3>
        <div class="d-flex ml-3">
            <h5 class="font-weight-bold" >Produto:</h5>
            <h5 class=" ml-1" >{{produto}}</h5>
        </div>
        <div class="font-weight-bold w-100 ml-3 text-secondary d-flex justify-content-start">
            <h6 class="font-weight-bold" >Pedido {{tempo}}</h6>
        </div>
         <div class="w-100 text-secondary d-flex justify-content-end">
            <b-button v-b-modal.avaliar id="pedir" class="mb-3 mr-4 px- font-weight-bold border bg-transparent" size="sm" >Avalie {{pessoa}}</b-button>
        </div>
    </div>
    <b-modal id="avaliar" centered title="Dê sua nota" hide-footer>
            <div v-if="!pode" class="d-flex justify-content-center flex-column">
                <h5 class="text-secondary" >Você não pode avaliar {{pessoa}}</h5>
                <div class="d-flex mt-2 justify-content-end">
                    <b-button @click="$bvModal.hide('avaliar')" id="check" size="sm"><b-icon-check-circle ></b-icon-check-circle></b-button>
                </div>
            </div>
            <div v-if="pode" class="w-100 d-flex flex-column">
                <b-form @submit="avaliar">
                    <b-input v-model="grade" required type="number" placeholder="Nota"></b-input> 
                    <div class="d-flex mt-2 justify-content-end">
                        <b-button id="check" type="submit" size="sm"><b-icon-check-circle ></b-icon-check-circle></b-button>
                    </div>
                </b-form>
            </div>
        </b-modal>
</div>
</template>

<script>
import Momento from 'moment'
import 'moment/locale/pt-br'
import { BIconCheckCircle } from 'bootstrap-vue'

export default{
    components:{
        BIconCheckCircle,
    },
    props:{
        cliente:Boolean,
        pessoa:String,
        produto:String,
        quando:String,
        pode:Boolean,
        id:Number,
    },
    data(){
        return{
            mouse:undefined,
            tempo:Momento(this.quando).locale('pt-br').startOf(this.quando).fromNow(),
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
        avaliar(event){
            if(this.cliente){
                event.preventDefault();
                fetch('http://127.0.0.1:8000/attendance/' + this.id + '/client-avaliate/',{
                    method: "PUT",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization": `Token ${localStorage.getItem('Token')}`
                    },
                    body:JSON.stringify({
                        "score": this.grade
                    })
                })
                .then(resp=> resp.json())
                .then(resp=> {
                   setTimeout(()=>{
                    this.$bvModal.hide('avaliar');  
                    }, 500);  
                   console.log(resp);
                })
                .catch(error => {
                    alert(error.message);
                })
            }
            else{
                 event.preventDefault();
                fetch('http://127.0.0.1:8000/attendance/' + this.id + '/attendant-avaliate/',{
                    method: "PUT",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization": `Token ${localStorage.getItem('Token')}`
                    },
                    body:JSON.stringify({
                        "score": this.grade
                    })
                })
                .then(resp=> resp.json())
                .then(resp=> {
                   setTimeout(()=>{
                    this.$bvModal.hide('avaliar');  
                    }, 500);  
                   console.log(resp);
                })
                .catch(error => {
                    alert(error.message);
                })
            }
        }
     },
}
</script>

<style>
#view{
    border-radius:20px;
}
.shadow{
    box-shadow: 2px 2px; 
}
.noshadow{
    box-shadow: 0px 0px;
}
</style>