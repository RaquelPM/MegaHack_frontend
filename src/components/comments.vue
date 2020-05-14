<template>
    <div id="comment" class = " mt-2 mx-2 shadow">
        <div class = "d-flex justify-content-start align-items-center">
            <div class="w-50 ml-2 d-flex align-items-center">
                <b-avatar size="4rem" class = "my-2"></b-avatar>
                <div class = "d-flex ml-3 flex-column align-items-start">
                    <h4 class="mt-4 font-weight-bold">{{user}}</h4>
                    <p id="loja" class="mr-2">{{loja}}</p>
                </div>
            </div>
            <div class="w-50 posistion-fixed d-flex justify-content-end">
                <b-icon-heart v-on:click="like" class = "mb-3 mr-3 pr-4" ></b-icon-heart>
            </div>
        </div>
        <div class="justify-content-start d-flex">
            <v-rating color="#FFD700" empty-icon="" half-increments v-model="rating" size="18px" id="a" class="ml-2" readonly="true" ></v-rating>
        </div>
        <p class="text-justify mx-3 pb-2">{{comentario}}</p>
        <div v-if="user!=atual" class="w-100 d-flex justify-content-end">
            <b-button v-on:click="ir_pedir" id="pedir" class="mb-3 mr-3 px- font-weight-bold border bg-transparent" size="sm">Fale com {{user}}</b-button>
        </div>

    </div>
</template>

<script>
import router from '@/routes'
import { BIconHeart,
    } from 'bootstrap-vue'

export default{
    components:{
        BIconHeart,
    },
    props:{
        user:String,
        comentario:String,
        grade:Number,
        loja:Array,
        id:Number,
        atual:String,
    },
    data(){
        return{
            rating:3.3,
        }
    },
    methods:{
        ir_pedir(){
            router.push({name:'others_perfil'})
            localStorage.setItem('User', this.user)
        },
        like(event){
            event.preventDefault();
                fetch('http://127.0.0.1:8000/reviews/'+ this.id +'/like/',{
                    method: "POST",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization": `Token ${localStorage.getItem('Token')}`
                    },
                })
                .then(resp=> resp.json())
                .then(resp=> {
                   console.log(resp);
                })
                .catch(error => {
                    alert(error.message);
                })
        }
    }
}

</script>

<style>
    #comment{
        border-radius:20px;
    }
    #loja{
        font-size:12px;
    }
    #estrelaaa{
        font-size:12px;
        margin-top:2px;
    }
    #pedir{
        border-radius:20px;
        color:#041543;
    }
</style>