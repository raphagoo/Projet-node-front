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
                        <md-button type="submit" class="md-button md-raised md-primary">Ajouter</md-button>
                    </form>
                </md-card-content>
            </md-card-expand-content>
        </md-card-expand>
    </md-card>
</template>

<script>
    import {mapActions} from "vuex";
    import consoleLogger from "logger";

    export default {
        name: "CardRessource",

        data() {
            return {
                ressource: {
                    name: null,
                    cost: null,
                    type: null
                }
            }
        },
        methods: {
            ...mapActions('ressources', {
                addRessource: 'addRessource',
            }),
            submitRessource(){
                this.addRessource(this.ressource)
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
