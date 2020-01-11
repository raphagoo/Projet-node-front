import api from "../interfaces/apiInterface";
import consoleLogger from "logger";
const state = {all: []};

const actions = {
    addRessource({commit}, ressource){
        return new Promise((resolve, reject) => {
        api.post('/resource/create', {
            name: ressource.name,
            cost: ressource.cost,
            type: ressource.type
        })
            .then(response => {
                consoleLogger.debug(response)
                commit('addRessourceSuccess', response)
                resolve(response)
            }, error => {
                reject(error)
            })
    })
    },

    getRessources({commit}){
        api.get('/resource/list')
            .then(response => {
                consoleLogger.debug(response)
                commit('getRessourcesSuccess', response)
            })
    }
};

const mutations = {
    addRessourceSuccess(state, response){
        state.all.push(response.data)
    },
    getRessourcesSuccess(state, response){
        state.all = response.data
    }
};
export const ressources = {
    namespaced: true,
    state,
    actions,
    mutations
};