import Vue from 'vue'
import VueRouter from 'vue-router'

import index from "@/views/recommend/recommend.vue";
import playList from "@/components/playlist/playList.vue"
import sheet from "@/views/sheet/sheet.vue"
import ranking from "@/views/ranking/ranking.vue"
import myPlayList from "@/views/myPlayList/myPlayList.vue"
import search from "@/views/search/search.vue"
import discover from "@/views/discover/discover.vue"
import djList from '@/components/djList/djList.vue'
import djShow from '@/components/djShow/djShow.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: index,
    },
    {
        path: '/playlist/:id',
        props: true,
        component: playList,
    },
    {
        path: '/sheet',
        component: sheet,
    },
    {
        path: '/ranking',
        component: ranking,
    },
    {
        path: '/myplaylist',
        component: myPlayList,
    },
    {
        path: '/search',
        props: true,
        component: search,
    },
    {
        path: '/discover',
        component: discover,
    },
    {
        path: '/djlist/:id',
        props: true,
        component: djList,
    },
    {
        path: '/djshow/:id',
        props: true,
        component: djShow,
    }

]




const router = new VueRouter({
        routes
    })
    //路由守卫
router.beforeEach((to, from, next) => {

    if (to.path == '/myplaylist') {
        if (localStorage.getItem('userName')) {
            next()
        } else {
            next({ path: '/' })
        }
    } else {
        next() //放行
    }
})




export default router