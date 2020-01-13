<template>
    <md-card class="cardAdd">
        <md-card-header>
            <div class="md-title">Milestone</div>
        </md-card-header>
        <md-card-content>
            Milestone
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
                    <form @submit.prevent="submitMilestone()">
                        <md-field>
                            <label>Name</label>
                            <md-input v-model="milestoneToSend.name" required />
                        </md-field>
                        <md-datepicker v-model="milestoneToSend.date" required>
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
        name: "CardMilestone",
        computed: {
            ...mapState({
                project: state => state.project,
                milestone: state => state.milestone
            }),
        },
        created() {
            if(this.$route.fullPath.includes('edit') === true){
                this.milestoneToSend = this.milestone.selected
                console.log(this.milestoneToSend)
            }
            else {
                this.milestoneToSend = {
                    name: null,
                    date: null,
                }
            }
        },
        data() {
            return {
                milestoneToSend: {
                    name: null,
                    date: null,
                }
            }
        },
        methods: {
            ...mapActions('milestone', {
                addMilestone: 'addMilestone',
                updateMilestone: 'updateMilestone'
            }),
            ...mapActions('project', {
                updateProject: 'updateProject',
            }),
            submitMilestone() {
                this.milestoneToSend.date = Date.parse(this.milestoneToSend.date) / 1000
                if (this.$route.fullPath.includes('edit') === false) {
                    this.addMilestone(this.milestoneToSend)
                        .then(response => {
                            consoleLogger.debug(this.project.selected)
                            let milestoneLinked = this.project.selected.milestones
                            milestoneLinked.push(response.data._id)
                            let updateInfos = {
                                propertyToUpdate: {
                                    milestones: milestoneLinked
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
                    this.updateMilestone(this.milestoneToSend)
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
