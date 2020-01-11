import api from "../interfaces/apiInterface";
import consoleLogger from "logger";
const state = {all: []};

const actions = {
    addProject({commit}, project){
        return new Promise((resolve, reject) => {
            api.post('/project/create', {
                name: project.name,
                desc: project.desc,
                daysOff: project.daysOff,
                workingHours: project.workingHours,
                task: project.taskLinked,
                groupTask: project.groupTask,
                resources: project.ressourcesLinked,
                milestones: project.milestones
            })
                .then(response => {
                    consoleLogger.debug(response)
                    commit('addProjectSuccess', response)
                    resolve(response)
                }, error => {
                    reject(error)
                })
        })
    },

    getProjects({commit}){
        api.get('/project/list')
            .then(response => {
                consoleLogger.debug(response)
                commit('getProjectsSuccess', response)
            })
    }
};

const mutations = {
    addProjectSuccess(state, response){
        state.all.push(response.data)
    },
    getProjectsSuccess(state, response){
        state.all = response.data
    }
};
export const project = {
    namespaced: true,
    state,
    actions,
    mutations
};
