import Vue from 'vue'
import VueRouter from 'vue-router'
import Config from './components/Config.vue'
import Questions from './components/Questions.vue'

Vue.use(VueRouter) // Add the Router features to the Vue Object

const routes = [
    {
        path: '/Config',
        alias: '/',
        component: Config
    },
    {
        path: '/Questions',
        component: Questions
    }
    // TODO: Lazy loading
]

export default new VueRouter({ routes })