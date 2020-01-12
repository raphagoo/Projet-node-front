import api from "../interfaces/apiInterface";
import consoleLogger from "logger";

const state = {all: []};

const actions = {
    addTask({commit}, task){
        console.log(task)
        return new Promise((resolve, reject) => {
            api.post('/task/create', task)
                .then(response => {
                    consoleLogger.debug(response)
                    commit('addTaskSuccess', response)
                    resolve(response)
                }, error => {
                    reject(error)
                })
        })
    },
    getTasks({commit}){
        api.get('/task/list')
            .then(response => {
                consoleLogger.debug(response)
                commit('getTasksSuccess', response)
            })
    }
};

const mutations = {
    addTaskSuccess(state, response){
        state.all.push(response.data)
    },
    getTasksSuccess(state, response){
        state.all = response.data
    }
};
export const task = {
    namespaced: true,
    state,
    actions,
    mutations
};
