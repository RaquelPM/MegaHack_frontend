<template>
    <div id="review" class = "mx-3 mb-1 py-1" v-on:mouseover="sim" v-on:mouseout="nao" v-bind:class="{shadow:mouse, noshadow:!mouse}">
        <div class = "d-flex justify-content-start align-items-center">
            <div class=" ml-1 d-flex align-items-center">
                <div class = "d-flex ml-3 flex-column align-items-start">
                    <div class="d-flex">
                        <h3 class="mt-3 font-weight-bold">{{Produto}}</h3>
                        <div class="border d-flex ml-2 mt-3 px-1 align-items-center" id="baba">
                            <h6 class=" text-secondary ml-1 mt-2 font-weight-bold">{{grade}}</h6>
                            <b-icon-star id="estrelaaaa" variant="warning" class="ml-1 mt-2 mr-2"></b-icon-star>
                            <h6 class=" text-secondary font-weight-bold mt-2" >{{likes}}</h6>
                            <b-icon-heart id="corara" variant="danger" class="ml-1 mr-2 mt-2 mb-2" ></b-icon-heart>
                        </div>
                    </div>
                    <h6 class="text-secondary font-weight-bold">{{loja}}</h6>
                </div>
            </div>
        </div>
        <p class=" font-weight-bold text-justify mx-3 ml-3 mt-1">{{comentario}}</p>
    </div>
    
</template>

<script>
import { BIconStar, BIconHeart } from 'bootstrap-vue'
export default{
    data(){
        return{
            mouse:undefined,
        }
    },
    components:{
        BIconStar,
        BIconHeart
    },
    props:{
        Produto:String,
        comentario:String,
        likes:Number,
        grade:Number,
        loja:String,
    },
    methods:{
        sim(){
            this.mouse=true
        },
        nao(){
            this.mouse=false
        },
    }
}

</script>

<style>
    #estrelaaaa{
        font-size:15px;
        margin-bottom:10px;
    }
    #corara{
        font-size:15px;
        margin-top:5px

    }
    #baba{
        border-radius:15px;
        height:35px;
    }
    .shadow{
        box-shadow: 2px 2px; 
    }
    .noshadow{
        box-shadow: 0px 0px;
    }      
</style>