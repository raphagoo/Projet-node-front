<template>
    <div class="listDetailsContainer">
        <Header /><br>


        <md-table class="tableDetails" :value="project.all" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
            <md-table-toolbar>
                <h1 class="md-title">Project</h1>
            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
                <md-table-cell>
                    <router-link :to="{ name: 'projectEdit', params: { id: item._id } }"><md-button class="md-icon-button"><md-icon>edit</md-icon></md-button></router-link>
                    <router-link :to="{ name: 'gantt', params: { id: item._id } }"><md-button class="md-icon-button"><md-icon>bar_chart</md-icon></md-button></router-link>
                </md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";
    import Header from "../components/Header.vue";
    export default {
        name: "listDetailsService",
        components: {Header},
        created() {
            this.getProjects()
        },
        methods: {
            ...mapActions('project', {
                getProjects: 'getProjects'
            })
        },
        computed: {
            ...mapState({
                ressources: state => state.ressources,
                task: state => state.task,
                project: state => state.project,
                groupTask: state => state.groupTask,
                milestone: state => state.milestone
            }),
        }
    }
</script>

<style lang="scss" scoped>
</style>
