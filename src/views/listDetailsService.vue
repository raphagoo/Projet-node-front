<template>
    <div class="listDetailsContainer">
        <Header /><br>
        <md-table class="tableDetails" :value="ressources.all" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
            <md-table-toolbar>
                <h1 class="md-title">Ressources</h1>
            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Cost" md-sort-by="cost">{{ item.cost }}</md-table-cell>
                <md-table-cell md-label="Type" md-sort-by="type">{{ item.type }}</md-table-cell>
                <md-table-cell><md-button class="md-icon-button"><md-icon>edit</md-icon></md-button></md-table-cell>
            </md-table-row>
        </md-table>

        <md-table class="tableDetails" :value="task.all" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
            <md-table-toolbar>
                <h1 class="md-title">Task</h1>
            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Percentage progress" md-sort-by="percentageProgress">{{ item.percentageProgress }}</md-table-cell>
                <md-table-cell><md-button class="md-icon-button"><md-icon>edit</md-icon></md-button></md-table-cell>
            </md-table-row>
        </md-table>

        <md-table class="tableDetails" :value="project.all" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
            <md-table-toolbar>
                <h1 class="md-title">Project</h1>
            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
                <md-table-cell><md-button class="md-icon-button"><md-icon>edit</md-icon></md-button></md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import Header from "../components/Header.vue";

    export default {
        name: "listDetailsService",
        components: {Header},
        computed: {
            ...mapState({
                ressources: state => state.ressources,
                task: state => state.task,
                project: state => state.project
            }),
        }
    }
</script>

<style lang="scss" scoped>
.tableDetails{
    position: relative;
    display: inline-block;
    width: 33%;
}
</style>
