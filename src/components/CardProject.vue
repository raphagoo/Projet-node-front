<template>
    <md-card class="cardAdd">
        <md-card-header>
            <div class="md-title">Project</div>
        </md-card-header>
        <md-card-content>
            Create a Project (Complete Gantt Project details)
        </md-card-content>
        <md-card-expand>
            <md-card-actions md-alignment="right">
                <md-card-expand-trigger>
                    <md-button class="md-icon-button">
                        <md-icon>add</md-icon>
                    </md-button>
                </md-card-expand-trigger>
            </md-card-actions>

            <md-card-expand-content>
                <md-card-content>
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
                            <label>Tasks</label>
                            <md-select v-model="project.task" multiple>
                                <md-option v-bind:key="taskToLink.id" v-for="taskToLink in task.all" :value="taskToLink.id">{{taskToLink.name}}</md-option>
                            </md-select>
                        </md-field>
                        <span class="md-title">Group task</span>
                        <md-field>
                            <label>Name</label>
                            <md-input v-model="project.groupTask.name" required />
                        </md-field>
                        <md-datepicker v-model="project.groupTask.start" required>
                            <label>Date Start</label>
                        </md-datepicker>
                        <md-datepicker v-model="project.groupTask.end" required>
                            <label>Date End</label>
                        </md-datepicker>
                        <md-field>
                            <label>Ressources</label>
                            <md-select v-model="project.ressourcesLinked" multiple>
                                <md-option v-bind:key="ressourcesToLink.id" v-for="ressourcesToLink in ressources.all" :value="ressourcesToLink.id">{{ressourcesToLink.name}} - {{ressourcesToLink.type}}</md-option>
                            </md-select>
                        </md-field>
                        <span class="md-title">Milestone</span>
                        <md-field>
                            <label>Name</label>
                            <md-input v-model="project.milestone.name" required />
                        </md-field>
                        <md-datepicker v-model="project.milestone.date" required>
                            <label>Date</label>
                        </md-datepicker>
                        <md-button type="submit" class="md-button md-raised md-primary">Ajouter</md-button>
                    </form>
                </md-card-content>
            </md-card-expand-content>
        </md-card-expand>
    </md-card>
</template>

<script>
    import {mapActions, mapState} from "vuex";
    import consoleLogger from "logger";

    export default {
        name: "CardProject",
        computed: {
            ...mapState({
                ressources: state => state.ressources,
                task: state => state.task
            }),
        },
        data(){
            return{
                project: {
                    name: null,
                    desc: null,
                    daysOff: {
                        mo: false,
                        tu: false,
                        we: false,
                        th: false,
                        fr: false,
                        sa: true,
                        su: true
                    },
                    taskLinked: [],
                    groupTask: {
                        name: null,
                        start: null,
                        end: null
                    },
                    ressourcesLinked: [],
                    milestone : {
                        name: null,
                        date: null
                    }
                },
            }
        },
        methods: {
            ...mapActions('project', {
                addProject: 'addProject',
            }),
            submitProject(){
                this.project.groupTask.start =  Date.parse(this.project.groupTask.start)
                this.project.groupTask.end =  Date.parse(this.project.groupTask.end)
                this.project.milestone.date = Date.parse(this.project.milestone.date)
                this.addProject(this.project)
                    .then(response => {
                        this.$fire({
                            type: 'success',
                            text: response.statusText
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
