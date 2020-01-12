import api from "../interfaces/apiInterface";
import consoleLogger from "logger";
const state = {all: []};

const actions = {
    addMilestone({commit}, milestone){
        return new Promise((resolve, reject) => {
            api.post('/milestones/create', {
                name: milestone.name,
                date: milestone.date,
            })
                .then(response => {
                    consoleLogger.debug(response)
                    commit('addMilestoneSuccess', response)
                    resolve(response)
                }, error => {
                    reject(error)
                })
        })
    },

    getMilestones({commit}){
        api.get('/milestones/list')
            .then(response => {
                consoleLogger.debug(response)
                commit('getMilestonesSuccess', response)
            })
    }
};

const mutations = {
    addMilestoneSuccess(state, response){
        state.all.push(response.data)
    },
    getMilestonesSuccess(state, response){
        state.all = response.data
    }
};
export const milestone = {
    namespaced: true,
    state,
    actions,
    mutations
};
