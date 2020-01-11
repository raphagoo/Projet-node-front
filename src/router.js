import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import EditService from "./views/EditService.vue";
import listDetailsService from "./views/listDetailsService.vue";

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/ownService/edit',
            name: 'edit',
            component: EditService
        },
        {
            path: '/ownService/details',
            name: 'details',
            component: listDetailsService
        },
        {
            path: '*',
            redirect: '/',
        },
    ]
})
