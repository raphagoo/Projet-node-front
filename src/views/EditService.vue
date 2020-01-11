<template>
    <div>
        <Header/>
        <div class="editServiceContainer">
            <CardTask />
            <CardRessource />
            <CardProject />
        </div>
    </div>
</template>

<script>
    import Header from "../components/Header.vue";
    import CardTask from "../components/CardTask.vue";
    import CardRessource from "../components/CardRessource.vue";
    import CardProject from "../components/CardProject.vue";
    import {mapActions} from "vuex";

    export default {
        name: "EditService",

        created() {
            this.getRessources()
            this.getTasks()
        },

        components: { Header, CardTask, CardRessource, CardProject },

        methods: {
            ...mapActions('ressources', {
                getRessources: 'getRessources',
            }),
            ...mapActions('task', {
                getTasks: 'getTasks',
            }),
        }
    }
</script>

<style lang="scss" scoped>
    .cardAdd{
        position: relative;
        width: 33%;
        display: inline-block;
    }
</style>
