<template>
    <md-card class="cardAdd">
        <md-card-header>
            <div class="md-title">Ressource</div>
        </md-card-header>
        <md-card-content>
            Ressource (Physical member of the team)
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
                    <form @submit.prevent="submitRessource()">
                        <md-field>
                            <label>Name</label>
                            <md-input v-model="ressource.name" required />
                        </md-field>
                        <md-field>
                            <label>Cost</label>
                            <md-input type="number" v-model="ressource.cost" required />
                        </md-field>
                        <md-field>
                            <label>Type</label>
                            <md-input v-model="ressource.type" required />
                        </md-field>
                        <md-button type="submit" class="md-button md-raised md-primary">Sauvegarder</md-button>
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
        name: "CardRessource",
        computed: {
            ...mapState({
                project: state => state.project,
                ressources: state => state.ressources
            }),
        },
        created() {
            if(this.$route.fullPath.includes('edit') === true){
                this.ressource = this.ressources.selected
            }
            else {
                this.ressource = {
                    name: null,
                    cost: null,
                    type: null,
                }
            }
        },
        data() {
            return {
                ressource: {
                    name: null,
                    cost: null,
                    type: null,
                },
            }
        },
        methods: {
            ...mapActions('ressources', {
                addRessource: 'addRessource',
                updateRessource: 'updateRessource'
            }),
            ...mapActions('project', {
                updateProject: 'updateProject',
            }),
            submitRessource() {
                if (this.$route.fullPath.includes('edit') === false) {
                    this.addRessource(this.ressource)
                        .then(response => {
                            let ressourcesLinked = this.project.selected.resources
                            ressourcesLinked.push(response.data._id)
                            let updateInfos = {
                                propertyToUpdate: {
                                    resources: ressourcesLinked
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
                    this.updateRessource(this.ressource)
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
