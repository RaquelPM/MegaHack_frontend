import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './pages/Home.vue'
import Produto from './pages/Produto.vue'
import Others_perfil from './pages/Others'
import MeuPerfil from '@/pages/Perfil'
import Ranking from '@/pages/Ranking'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '*',
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
            meta:{
                requeresAuth: true
            }
        },
        {
            path:'/ranking',
            name: 'Ranking',
            component: Ranking
        }
    ]    
})

router.beforeEach((to,from,next) => {
    const token = localStorage.getItem('Token');
    const requeresAuth = to.matched.some(record => record.meta.requeresAuth);

    if (requeresAuth){
        if (!token){
            next('*');
        }
        else{
            next();
        }
    }
    else{
        next();
    }
})

export default router