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
                            <md-input v-model="task.name" required />
                        </md-field>
                        <md-field>
                            <label>Description</label>
                            <md-input type="textarea" v-model="task.desc" required />
                        </md-field>
                        <md-datepicker v-model="task.start" required>
                            <label>Date Start</label>
                        </md-datepicker>
                        <md-datepicker v-model="task.end" required>
                            <label>Date End</label>
                        </md-datepicker>
                        <md-field>
                            <label>Percentage progress (%)</label>
                            <md-input type="number" v-model="task.percentageProgress" required />
                        </md-field>
                        <ColorPicker :width="300" :height="300" :disabled="false" startColor="#ff0000" v-model="task.color"></ColorPicker>
                        <md-field>
                            <label>Color</label>
                            <md-input v-model="task.color" required />
                        </md-field>
                        <md-field>
                            <label>Linked Tasks</label>
                            <md-select v-model="task.linkedTask" multiple>
                                <md-option v-bind:key="taskToLink.id" v-for="taskToLink in tasks" :value="taskToLink.id">{{taskToLink.name}}</md-option>
                            </md-select>
                        </md-field>
                        <div class="hidden"> {{ressourcesFiltered}} </div>
                        <md-field>
                            <label>Ressources</label>
                            <md-select v-model="task.ressources" multiple>
                                <md-option v-bind:key="ressourcesToLink.id" v-for="ressourcesToLink in ressourcesFiltered" :value="ressourcesToLink._id">{{ressourcesToLink.name}}</md-option>
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
        computed: {
            ...mapState({
                ressources: state => state.ressources,
                tasks: state => state.tasks
            }),
            ressourcesFiltered(){
                return this.$store.state.ressources.all
            }
        },
        data(){
            return{
                task: {
                    name: null,
                    desc: null,
                    start: null,
                    end: null,
                    percentageProgress: null,
                    color: null,
                    linkedTask: [],
                    ressources: []
                }
            }
        },
        methods: {
                ...mapActions('task', {
                    addTask: 'addTask',
                }),
                submitTask(){
                    this.task.start =  Date.parse(this.task.start)
                    this.task.end =  Date.parse(this.task.end)
                    this.addTask(this.task)
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
    .hidden{
        display: none;
    }
</style>
