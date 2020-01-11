import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import {service} from './service.module'
import {ressources} from './ressources.module'
import {task} from './task.module'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        service,
        ressources,
        task
    },
    plugins: [createPersistedState()]
});
