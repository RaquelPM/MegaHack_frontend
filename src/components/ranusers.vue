<template>
<div id="view" class="w-100 mb-2 py-2 d-flex justify-content-start border">
    <b-avatar size="8rem" class="my-1 ml-2"></b-avatar>
    <div class="flex-column justify-content-start d-flex align-items-start">
        <h2 class="mt-3 ml-3 font-weight-bold">{{user}}</h2>
        <div class="d-flex ml-3">
            <h4>{{score}}</h4>
            <b-icon-star-fill id="estri" variant="warning" class=" ml-1" ></b-icon-star-fill>
        </div>
        <h5 class="ml-3 text-secondary">{{points}} pontos</h5>
    </div>
</div>
</template>

<script>
import { BIconStarFill } from 'bootstrap-vue'

export default{
    components:{
        BIconStarFill
    },
    props:{
        user:String,
        points:Number,
        score: Number,
    }
}
</script>

<style>
    #estri{
        font-size:20px;
        margin-top:3px;
    }
</style>