<template>
  <div class="home">
    <Header/>
    <div class="noServiceContainer" v-if="noService === true">
            No service created !
            <br><br>
            New Service
            <form class="md-layout" @submit.prevent="submitNewService()">
                <md-field>
                    <label>Service Name</label>
                    <md-input v-model="service.name" />
                </md-field>
                <md-button type="submit" class="md-button md-raised md-primary">
                    Save
                </md-button>
            </form>
    </div>
    <div class="serviceContainer" v-if="noService === false">
        <div v-bind:key="ownService._id" v-for="ownService in service.ownService">
            {{ownService.nameService}}

                <md-button @click="$router.push('/ownService/details')" class="md-icon-button">
                    <md-icon>remove_red_eye</md-icon>
                </md-button>

            <md-button @click="$router.push('/ownService/edit')" class="md-icon-button">
                <md-icon>add</md-icon>
            </md-button>
        </div>
    </div>
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
