import api from "../interfaces/apiInterface";
import consoleLogger from "logger";
const state = {all: []};

const actions = {
    addGroupTask({commit}, groupTask){
        return new Promise((resolve, reject) => {
            api.post('/groupTask/create', {
                name: groupTask.name,
                start: groupTask.start,
                end: groupTask.end
            })
                .then(response => {
                    consoleLogger.debug(response)
                    commit('addGroupTaskSuccess', response)
                    resolve(response)
                }, error => {
                    reject(error)
                })
        })
    },

    getGroupTasks({commit}){
        api.get('/groupTask/list')
            .then(response => {
                consoleLogger.debug(response)
                commit('getGroupTasksSuccess', response)
            })
    },
    updateGroupTask({commit}, groupTask){
        return new Promise((resolve, reject) => {
            api.put('/groupTask/update/'+groupTask._id, groupTask)
                .then(response => {
                    consoleLogger.debug(response)
                    commit('updateGroupTaskSuccess', response)
                    resolve(response)
                }, error => {
                    reject(error)
                })
        })
    }
};

const mutations = {
    addGroupTaskSuccess(state, response){
        state.all.push(response.data)
    },
    getGroupTasksSuccess(state, response){
        state.all = response.data
    },
    updateGroupTaskSuccess(){
    }
};
export const groupTask = {
    namespaced: true,
    state,
    actions,
    mutations
};