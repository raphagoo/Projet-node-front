<template>
    <md-card class="cardAdd">
        <md-card-header>
            <div class="md-title">Task</div>
        </md-card-header>
        <md-card-content>
            Task being part of the project (You have to create ressources in order to add a task!)
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
                    <form @submit.prevent="submitTask()">
                        <md-field>
                            <label>Name</label>
                            <md-input v-model="taskToSend.name" required />
                        </md-field>
                        <md-field>
                            <label>Description</label>
                            <md-input type="textarea" v-model="taskToSend.desc" required />
                        </md-field>
                        <md-datepicker v-model="taskToSend.start" required>
                            <label>Date Start</label>
                        </md-datepicker>
                        <md-datepicker v-model="taskToSend.end" required>
                            <label>Date End</label>
                        </md-datepicker>
                        <md-field>
                            <label>Percentage progress (%)</label>
                            <md-input type="number" max="100" min="0" v-model="taskToSend.percentageProgress" required />
                        </md-field>
                        <ColorPicker :width="300" :height="300" :disabled="false" startColor="#ff0000" v-model="taskToSend.color"></ColorPicker>
                        <md-field>
                            <label>Color</label>
                            <md-input v-model="taskToSend.color" required />
                        </md-field>
                        <md-field>
                            <label>Linked Tasks</label>
                            <md-select v-model="taskToSend.linkedTask" multiple>
                                <md-option v-bind:key="taskToLink.id" v-for="taskToLink in project.selected.task" :value="taskToLink._id">{{taskToLink.name}}</md-option>
                            </md-select>
                        </md-field>
                        <div class="hidden"> {{ressourcesFiltered}} </div>
                        <md-field>
                            <label>Ressources</label>
                            <md-select v-model="taskToSend.ressources" multiple>
                                <md-option v-bind:key="ressourcesToLink.id" v-for="ressourcesToLink in project.selected.resources" :value="ressourcesToLink._id">{{ressourcesToLink.name}}</md-option>
                            </md-select>
                        </md-field>
                        <md-button type="submit" class="md-button md-raised md-primary">Ajouter</md-button>
                    </form>
                </md-card-content>
            </md-card-expand-content>
        </md-card-expand>
    </md-card>
</template>

<script>
    import ColorPicker from 'vue-color-picker-wheel';
    import {mapActions, mapState} from "vuex";
    import consoleLogger from "logger";
    export default {
        name: "CardTask",
        components: {ColorPicker},
        created() {
            if(this.$route.fullPath.includes('edit') === true){
                this.taskToSend = this.task.selected
            }
            else {
                this.taskToSend = {
                    name: null,
                    desc: null,
                    start: null,
                    end: null,
                    percentageProgress: null,
                    color: null,
                    linkedTask: [],
                    ressources: [],
                }
            }
        },
        computed: {
            ...mapState({
                ressources: state => state.ressources,
                task: state => state.task,
                project: state => state.project
            }),
            ressourcesFiltered(){
                return this.$store.state.ressources.all
            }
        },
        data(){
            return{
                taskToSend: {
                    name: null,
                    desc: null,
                    start: null,
                    end: null,
                    percentageProgress: null,
                    color: null,
                    linkedTask: [],
                    ressources: [],
                }
            }
        },
        methods: {
            ...mapActions('task', {
                addTask: 'addTask',
                updateTask: 'updateTask'
            }),
            ...mapActions('project', {
                updateProject: 'updateProject',
            }),
            submitTask(){
                this.taskToSend.start = Date.parse(this.taskToSend.start) / 1000
                this.taskToSend.end = Date.parse(this.taskToSend.end) / 1000
                if (this.$route.fullPath.includes('edit') === false) {
                    this.addTask(this.taskToSend)
                        .then(response => {
                            consoleLogger.debug(this.project.selected)
                            let taskLinked = this.project.selected.task
                            taskLinked.push(response.data)
                            let updateInfos = {
                                propertyToUpdate: {
                                    task: taskLinked
                                },
                                projectId: this.project.selected._id
                            }
                            this.updateProject(updateInfos)
                                .then(response => {
                                    this.$fire({
                                        type: 'success',
                                        text: response.statusText
                                    })
                                    this.$router.push('/project/' + this.project.selected._id)
                                })
                        }, error => {
                            consoleLogger.debug(error)
                        })
                }
                else{
                    this.updateTask(this.taskToSend)
                        .then(response => {
                            this.$fire({
                                type: 'success',
                                text: response.statusText
                            })
                            this.$router.push('/project/' + this.project.selected._id)
                        }, error => {
                            consoleLogger.debug(error)
                        })
                }
            }
        }
    }
</script>

<style scoped>
    .hidden{
        display: none;
    }
</style>
