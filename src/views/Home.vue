<template>
  <div class="home">
    <Header/>
    <md-card class="noServiceContainer" v-if="noService === true">
            Pas de service créé !
            <br><br>
            Nouveau service
            <form class="md-layout" @submit.prevent="submitNewService()">
                <md-field>
                    <label>Nom du service</label>
                    <md-input v-model="serviceToSave.name" />
                </md-field>
                <md-button type="submit" class="md-button md-raised md-primary">
                    Sauvegarder
                </md-button>
            </form>
    </md-card>
    <md-card class="serviceContainer" v-if="noService === false">
        <h1>Votre service</h1>
        <div v-bind:key="ownService._id" v-for="ownService in service.ownService">
            {{ownService.nameService}}

                <md-button @click="seeOwnService(ownService)" class="md-icon-button">
                    <md-icon>remove_red_eye</md-icon>
                </md-button>

            <md-button @click="$router.push('/project/new')" class="md-icon-button">
                <md-icon>add</md-icon>
            </md-button>
        </div>
        <h2>Autre services</h2>
        <div v-bind:key="otherService._id" v-for="otherService in service.services">
            {{otherService.nameService}}
            <md-button @click="seeOtherService(otherService)" class="md-icon-button">
                <md-icon>remove_red_eye</md-icon>
            </md-button>
        </div>
    </md-card>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import consoleLogger from "logger";
import Header from "../components/Header.vue";

export default {
    name: 'home',
    data(){
        return{
            noService : false,
            serviceToSave: {
                name: null
            }
        }
    },
    computed: {
        ...mapState({
            service: state => state.service,
        }),
    },
    components: {
        Header
    },
    created() {
        this.getOwnService()
        .then(
            response => {
                if(response.data.length < 1){
                    this.noService = true
                }
            }, error => {
                consoleLogger.debug(error)
            }
        )
    },
    methods: {
        ...mapActions('service', {
            getAllServices: 'getAllServices',
            getOwnService: 'getOwnService',
            saveNewService: 'saveNewService'
        }),
        seeOtherService(otherService){
            this.service.selected = otherService
            this.service.selected.isOwn = false
            this.$router.push('/ownService/details')
        },
        seeOwnService(ownService){
            this.service.selected = ownService
            this.service.selected.isOwn = true
            this.$router.push('/ownService/details')
        },
        submitNewService(){
            this.saveNewService(this.serviceToSave)
            .then(
                response => {
                    this.$fire({
                        type: 'success',
                        text: response.statusText
                    });
                    this.noService = false
                }, error => {
                        consoleLogger.debug(error)
                }
            )
        }
    }
}
</script>
<style lang="scss">
    .noServiceContainer{
        position: relative;
        margin-right: auto;
        margin-left: auto;
        width: 50%;
        text-align: center;
    }
    .text-center{
        text-align: center;
    }
</style>
