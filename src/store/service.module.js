import api from '../interfaces/apiInterface'
import consoleLogger from "logger";
const state = {ownService: {}};

const actions = {
    getOwnService({commit}){
        return new Promise((resolve, reject) => {
            api.get("/service/list")
                .then(response => {
                    consoleLogger.debug(response);
                    resolve(response)
                    commit('getOwnServiceSuccess', response)
                }, error => {
                    reject(error)
                })
        })
    },
    saveNewService({commit}, service){
        return new Promise((resolve, reject) => {
            api.post("/service/create", {
                nameService: service.name
            })
                .then(response => {
                    consoleLogger.debug(response)
                    resolve(response)
                    commit('saveNewServiceSuccess', response)
                }, error => {
                    reject(error)
                })
        })
    }
};

const mutations = {
    getOwnServiceSuccess(state, response){
        state.ownService = response.data
    },
    saveNewServiceSuccess(state, response){
        state.ownService = response.data
    }
};
export const service = {
    namespaced: true,
    state,
    actions,
    mutations
};
