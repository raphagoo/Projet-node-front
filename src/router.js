import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import listDetailsService from "./views/listDetailsService.vue";
import NewProject from "./views/NewProject.vue";
import EditProject from "./views/EditProject.vue";
import CardRessource from "./components/CardRessource.vue";
import CardGroupTask from "./components/CardGroupTask.vue";
import CardMilestone from "./components/CardMilestone.vue";
import CardTask from "./components/CardTask.vue";
import GanttView from "./views/GanttView.vue";

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
            path: '/project/new',
            name: 'newProject',
            component: NewProject
        },
        {
            name: 'projectEdit',
            path: '/project/:id',
            component: EditProject
        },
        {
            path: '/project/:id/resource/new',
            name: 'newResource',
            component: CardRessource
        },
        {
            path: '/project/:id/resource/edit',
            name: 'editResource',
            component: CardRessource
        },
        {
            path: '/project/:id/groupTask/new',
            name: 'newGroupTask',
            component: CardGroupTask
        },
        {
            path: '/project/:id/groupTask/edit',
            name: 'editGroupTask',
            component: CardGroupTask
        },
        {
            path: '/project/:id/milestone/new',
            name: 'newMilestone',
            component: CardMilestone
        },
        {
            path: '/project/:id/milestone/edit',
            name: 'editMilestone',
            component: CardMilestone
        },
        {
            path: '/project/:id/task/new',
            name: 'newTask',
            component: CardTask
        },
        {
            path: '/project/:id/task/edit',
            name: 'editTask',
            component: CardTask
        },
        {
            path: '/ownService/details',
            name: 'details',
            component: listDetailsService
        },
        {
            path: '/gantt',
            name: 'gantt',
            component: GanttView
        },
        {
            path: '*',
            redirect: '/',
        },
    ]
})
