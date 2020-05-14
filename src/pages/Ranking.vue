<template>
<div>
    <Nav v-if="pesquisou" :user='user.username'/>
    <div v-if="pesquisou" class="flex-column d-flex align-items-center pt-4 mx-3">
        <div id="vi" class="border w-100 mb-3">
            <h1 class="pb-2 font-weight-bold mt-2 text-white" >Ranking</h1>
        </div>
        <div class="w-100" v-for="user in users" :key="user">
            <users :user='user.username' :points="user.profile.points" :score="user.profile.score"/>
        </div>
    </div>
</div>
</template>

<script>
import { get_data_with, get_data } from '@/fetchs'
import Nav from '@/components/Nav'
import users from '@/components/ranusers'

export default{
    components:{
        Nav,
        users,
    },
    data(){
        return{
            user:{},
            users:{},
            pesquisou:false,
        }
    },
    created(){
        get_data_with("users/self/")
        .then(resp=>{
        this.user=resp
        this.pesquisou=true;
        console.log(resp)
        })
        .catch(error=>alert(error.message))

        get_data("users/?order=relevance")
        .then(resp=>{
        this.users=resp.results
        console.log(this.users)
        })
        .catch(error=>alert(error.message))
    }
}
</script>

<style>
#vi{
    border-radius:20px;
    background-color:#1f3e93;
}
</style>