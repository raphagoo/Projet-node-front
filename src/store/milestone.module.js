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
    },
    updateMilestone({commit}, milestone){
        return new Promise((resolve, reject) => {
            api.put('/milestones/update/'+milestone._id, milestone)
                .then(response => {
                    consoleLogger.debug(response)
                    commit('updateMilestoneSuccess', response)
                    resolve(response)
                }, error => {
                    reject(error)
                })
        })
    },
    deleteMilestone({commit}, milestone) {
        api.delete('/milestones/delete/' + milestone._id,)
            .then(response => {
                consoleLogger.debug(response)
                commit('project/deleteMilestoneFromSelected', milestone, {root: true })
                commit('deleteMilestoneSuccess', milestone)
            }, error => {
                consoleLogger.debug(error)
            })
    }
};

const mutations = {
    addMilestoneSuccess(state, response){
        state.all.push(response.data)
    },
    getMilestonesSuccess(state, response){
        state.all = response.data
    },
    updateMilestoneSuccess(){

    },
    deleteMilestoneSuccess(state, milestone){
        state.all = state.all.filter(milestones => milestones._id !== milestone._id)
    }
};
export const milestone = {
    namespaced: true,
    state,
    actions,
    mutations
};
