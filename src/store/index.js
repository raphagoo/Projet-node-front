import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import {service} from './service.module'
import {ressources} from './ressources.module'
import {task} from './task.module'
import {groupTask} from './groupTask.module'
import {project} from './project.module'
import {milestone} from './milestone.module'
Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        service,
        project,
        ressources,
        milestone,
        groupTask,
        task
    },
    plugins: [createPersistedState()]
});
