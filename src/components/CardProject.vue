<template>
    <md-card class="md-card">
        <div class="md-title">Project</div>
           <form @submit.prevent="submitProject()">
               <md-field>
                   <label>Name</label>
                   <md-input v-model="project.name" required />
               </md-field>
               <md-field>
                   <label>Description</label>
                   <md-input type="textarea" v-model="project.desc" required />
               </md-field>
                <label>Days off</label><br>
                <md-checkbox v-model="project.daysOff.mo">Monday</md-checkbox>
                <md-checkbox v-model="project.daysOff.tu">Tuesday</md-checkbox>
                <md-checkbox v-model="project.daysOff.we">Wednesday</md-checkbox>
                <md-checkbox v-model="project.daysOff.th">Thursday</md-checkbox><br>
                <md-checkbox v-model="project.daysOff.fr">Friday</md-checkbox>
                <md-checkbox v-model="project.daysOff.sa">Saturday</md-checkbox>
                <md-checkbox v-model="project.daysOff.su">Sunday</md-checkbox>
               <md-field>
                   <label>Working Hours : Start</label>
                   <md-input type="number" step="0.5" min="0" max="23" v-model="project.workingHours.start" required />
               </md-field>
               <md-field>
                   <label>Working Hours : End</label>
                   <md-input type="number" step="0.5" min="0" max="23" v-model="project.workingHours.end" required />
               </md-field>
               <md-button type="submit" class="md-button md-raised md-primary">Ajouter</md-button>
           </form>
    </md-card>
</template>

<script>
    import {mapActions, mapState} from "vuex";
    import consoleLogger from "logger";

    export default {
        name: "CardProject",
        computed: {
            ...mapState({
                service: state => state.service,
                ressources: state => state.ressources,
                task: state => state.task,
                groupTask: state => state.groupTask,
                milestone: state => state.milestone
            }),
        },
        data(){
            return{
                project: {
                    name: null,
                    desc: null,
                    daysOff: {
                        Mo: false,
                        Tu: false,
                        We: false,
                        Th: false,
                        Fr: false,
                        Sa: true,
                        Su: true
                    },
                    workingHours: {
                        start: null,
                        end: null
                    },
                    taskLinked: [],
                    ressourcesLinked: [],
                    groupTaskLinked: [],
                    milestoneLinked: [],
                },
            }
        },
        methods: {
            ...mapActions('project', {
                addProject: 'addProject',
            }),
            ...mapActions('service', {
                updateService: 'updateService',
            }),
            submitProject(){
                this.addProject(this.project)
                    .then(response => {
                        consoleLogger.debug(this.service.ownService[0].projects)
                        let projectLinked = this.service.ownService[0].projects
                        projectLinked.push(response.data._id)
                        let updateInfos = {
                            propertyToUpdate: {
                                projects: projectLinked
                            },
                            serviceId: this.service.ownService[0]._id}
                        this.updateService(updateInfos)
                            .then(response => {
                                this.$fire({
                                    type: 'success',
                                    text: response.statusText
                                })
                                this.$router.push('/')
                            })
                    }, error => {
                        consoleLogger.debug(error)
                    })
            }
        }
    }
</script>

<style scoped>

</style>
