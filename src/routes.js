import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './pages/Home.vue'
import Produto from './pages/Produto.vue'
import Others_perfil from './pages/Others'
import MeuPerfil from '@/pages/Perfil'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/home',
            name: 'Home',
            component: Home,
        },
        {
            path: '/verproduto',
            name:'Produto',
            component: Produto,
        },
        {
            path:'/perfil',
            name:'others_perfil',
            component: Others_perfil,
        },
        {
            path:'/meuperfil',
            name: 'meuperfil',
            component: MeuPerfil,
        }
    ]    
})

export default router