<template>
    <md-card class="cardAdd">
        <md-card-header>
            <div class="md-title">GroupTask</div>
        </md-card-header>
        <md-card-content>
            GroupTask (Group some tasks together)
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
                    <form @submit.prevent="submitGroupTask()">
                        <md-field>
                            <label>Name</label>
                            <md-input v-model="groupTaskToSend.name" required />
                        </md-field>
                        <md-datepicker v-model="groupTaskToSend.start" required>
                            <label>Date Start</label>
                        </md-datepicker>
                        <md-datepicker v-model="groupTaskToSend.end" required>
                            <label>Date End</label>
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
        name: "CardGroupTask",
        computed: {
            ...mapState({
                project: state => state.project,
                groupTask: state => state.groupTask
            }),
        },
        created() {
            if(this.$route.fullPath.includes('edit') === true){
                this.groupTaskToSend = this.groupTask.selected
                console.log("à savoir",this.groupTask.selected)
            }
            else {
                this.groupTaskToSend = {
                    name: null,
                    start: null,
                    end: null
                }
            }
        },
        data() {
            return {
                groupTaskToSend: {
                    name: null,
                    start: null,
                    end: null
                }
            }
        },
        methods: {
            ...mapActions('groupTask', {
                addGroupTask: 'addGroupTask',
                updateGroupTask: 'updateGroupTask'
            }),
            ...mapActions('project', {
                updateProject: 'updateProject',
            }),
            submitGroupTask() {
                this.groupTaskToSend.start = Date.parse(this.groupTaskToSend.start) / 1000
                this.groupTaskToSend.end = Date.parse(this.groupTaskToSend.end) / 1000
                if (this.$route.fullPath.includes('edit') === false) {
                    this.addGroupTask(this.groupTaskToSend)
                        .then(response => {
                            consoleLogger.debug(this.project.selected)
                            let groupTaskLinked = this.project.selected.groupTask
                            groupTaskLinked.push(response.data._id)
                            let updateInfos = {
                                propertyToUpdate: {
                                    groupTask: groupTaskLinked
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
                    this.updateGroupTask(this.groupTaskToSend)
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

</style>
