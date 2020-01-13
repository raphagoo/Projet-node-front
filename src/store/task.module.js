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
    },
    updateTask({commit}, task){
        return new Promise((resolve, reject) => {
            api.put('/task/update/'+task._id, task)
                .then(response => {
                    consoleLogger.debug(response)
                    commit('updateTaskSuccess', response)
                    resolve(response)
                }, error => {
                    reject(error)
                })
        })
    },
    deleteTask({commit}, task) {
        api.delete('/task/delete/' + task._id,)
            .then(response => {
                consoleLogger.debug(response)
                commit('deleteTaskSuccess', task)
            }, error => {
                consoleLogger.debug(error)
            })
    }
};

const mutations = {
    addTaskSuccess(state, response){
        state.all.push(response.data)
    },
    getTasksSuccess(state, response){
        state.all = response.data
    },
    updateTaskSuccess(){

    },
    deleteTaskSuccess(state, task){
        state.all = state.all.filter(tasks => tasks._id !== task._id)
    }
};
export const task = {
    namespaced: true,
    state,
    actions,
    mutations
};
