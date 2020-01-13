import api from "../interfaces/apiInterface";
import consoleLogger from "logger";
const state = {all: [], selected: {}};

const actions = {
    addProject({commit}, project){
        return new Promise((resolve, reject) => {
            api.post('/project/create', {
                name: project.name,
                desc: project.desc,
                daysOff: project.daysOff,
                workingHours: project.workingHours,
                taskLinked: [],
                ressourcesLinked: [],
                groupTaskLinked: [],
                milestoneLinked: []
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
    },
    getProjectById({commit}, id){
        api.get('/project/get/'+id)
            .then(response => {
                consoleLogger.debug(response)
                commit('getProjectByIdSuccess', response)
            })
    },
    updateProject({commit}, updateInfos){
        let property = updateInfos.propertyToUpdate
        return new Promise((resolve, reject) => {
            api.put('/project/update/' + updateInfos.projectId, property)
                .then(response => {
                    consoleLogger.debug(response)
                    commit('updateProjectSuccess')
                    resolve(response)
                }, error => {
                    reject(error)
                })
        })
    },
    deleteProject({commit}, project) {
        api.delete('/project/delete/' + project._id,)
            .then(response => {
                consoleLogger.debug(response)
                commit('service/deleteFromServiceSelected', project, { root: true })
                commit('deleteProjectSuccess', project)
            }, error => {
                consoleLogger.debug(error)
            })
    }
};

const mutations = {
    addProjectSuccess(state, response){
        state.all.push(response.data)
    },
    getProjectsSuccess(state, response){
        state.all = response.data
    },
    getProjectByIdSuccess(state, response){
        state.selected = response.data
    },
    updateProjectSuccess(){

    },
    deleteProjectSuccess(state, project){
        state.all = state.all.filter(projectEach => projectEach._id !== project._id)
    },
    deleteRessourceFromSelected(state, resource){
        state.selected.resources = state.selected.resources.filter(ressource => ressource._id !== resource._id)
    },
    deleteGroupTaskFromSelected(state, groupTask){
        state.selected.groupTask = state.selected.groupTask.filter(groupTaskEach => groupTaskEach._id !== groupTask._id)
    },
    deleteMilestoneFromSelected(state, milestone){
        state.selected.milestones = state.selected.milestones.filter(milestoneEach => milestoneEach._id !== milestone._id)
    },
    deleteTaskFromSelected(state, task){
        state.selected.task = state.selected.task.filter(tasks => tasks._id !== task._id)
    }
};
export const project = {
    namespaced: true,
    state,
    actions,
    mutations
};
