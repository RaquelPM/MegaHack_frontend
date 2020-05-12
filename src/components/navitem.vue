<template>

    <b-button class="text-left mx-1 pb-1 text-white pt-2  bg-transparent border-0" v-on:mouseover="sim" v-on:mouseout="nao" v-on:click="armazenar" v-bind:class="{d:cima, c:!cima, b:ta}">
        <slot/>
        <span>{{tipo}}</span>
        <span>{{name}}</span>
    </b-button>

</template>

<script>
export default{
    name:'NavItem',
    props:{
        tipo:String,
        name:String,
    },
    data(){
        return{
            cima:undefined,
            ta:undefined,
        }
    },
    methods:{
        sim(){
            this.cima=true;
        },
        nao(){
            this.cima=false;
        },
        armazenar(){
            localStorage.setItem('Tipo', this.tipo);
            window.location.reload();
        }
    },
    created(){
        if(localStorage.getItem('Tipo')==this.tipo){this.ta=true}
    }
}

</script>

<style>
    .b{
        font-weight: bold;
        background-color: #100c7c !important;
        border: 1px solid var(--contrast_color);
        transition: all .2s;
        color: var(--background-color);
    }
    .e{
        font-weight: bold;
        background-color: #100c7c !important;
        border: 1px solid var(--contrast_color);
        transition: all .2s;
        color: var(--background-color);
    }
    .c{
        background-color: transparent;
        color: gray;
        transition: all .1s;
        border: 0;
    }
    .d{
        font-weight: bold;
    }
</style>