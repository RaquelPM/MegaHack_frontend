<template>
    <div id="comment" class = " mt-2 mx-2 shadow">
        <div class = "d-flex justify-content-start align-items-center">
            <div class="w-50 ml-1 d-flex align-items-center">
                <b-avatar size="3rem" class = "mx-2 my-2"></b-avatar>
                <div class = "d-flex ml-1 flex-column align-items-start">
                    <h6 class="mt-4 font-weight-bold">{{user}}</h6>
                    <div class="d-flex">
                        <p id="loja" >{{loja}} - {{grade}} </p>
                        <b-icon-star-fill id="estrelaaa" variant="warning" class="ml-1"></b-icon-star-fill>
                    </div>
                </div>
            </div>
            <div class="w-50 posistion-fixed d-flex justify-content-end">
                <b-icon-heart class = "mb-3 mr-3 pr-4" ></b-icon-heart>
            </div>
        </div>
        <p class="text-justify mx-3">{{comentario}}</p>
        <div class="w-100 d-flex justify-content-end">
            <b-button v-on:click="ir_pedir" id="pedir" class="mb-3 mr-3 px- font-weight-bold border bg-transparent" size="sm">Fale com {{user}}</b-button>
        </div>

    </div>
</template>

<script>
import router from '@/routes'

import { BIconHeart,
         BIconStarFill,
    } from 'bootstrap-vue'
export default{
    components:{
        BIconHeart,
        BIconStarFill
    },
    props:{
        user:String,
        comentario:String,
        grade:Number,
        loja:Array,
    },
    methods:{
        ir_pedir(){
            router.push({name:'others_perfil'})
            localStorage.setItem('User', this.user)
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