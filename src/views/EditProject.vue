<template>
    <div>
        <md-table class="tableDetails" :value="project.selected.resources" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
            <md-table-toolbar>
                <h1 class="md-title">Ressources</h1>
                <md-button @click="$router.push('/project/'+project.selected._id+'/resource/new')" class="md-icon-button"><md-icon>add</md-icon></md-button>
            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Cost" md-sort-by="cost">{{ item.cost }}</md-table-cell>
                <md-table-cell md-label="Type" md-sort-by="type">{{ item.type }}</md-table-cell>
                <md-table-cell><md-button @click="editResource(item)" class="md-icon-button"><md-icon>edit</md-icon></md-button></md-table-cell>
            </md-table-row>
        </md-table>

        <md-table class="tableDetails" :value="project.selected.groupTask" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
            <md-table-toolbar>
                <h1 class="md-title">Group Tasks</h1>
                <md-button @click="$router.push('/project/'+project.selected._id+'/groupTask/new')" class="md-icon-button"><md-icon>add</md-icon></md-button>
            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
                <md-table-cell><md-button @click="editGroupTask(item, item.start, item.end)" class="md-icon-button"><md-icon>edit</md-icon></md-button></md-table-cell>
            </md-table-row>
        </md-table>

        <md-table class="tableDetails" :value="project.selected.milestones" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
            <md-table-toolbar>
                <h1 class="md-title">Milestones</h1>
                <md-button @click="$router.push('/project/'+project.selected._id+'/milestone/new')" class="md-icon-button"><md-icon>add</md-icon></md-button>
            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
                <md-table-cell><md-button class="md-icon-button"><md-icon>edit</md-icon></md-button></md-table-cell>
            </md-table-row>
        </md-table>

        <md-table class="tableDetails" :value="project.selected.task" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
            <md-table-toolbar>
                <h1 class="md-title">Task</h1>
                <md-button @click="$router.push('/project/'+project.selected._id+'/task/new')" class="md-icon-button"><md-icon>add</md-icon></md-button>
            </md-table-toolbar>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Percentage progress" md-sort-by="percentageProgress">{{ item.percentageProgress }}</md-table-cell>
                <md-table-cell><md-button class="md-icon-button"><md-icon>edit</md-icon></md-button></md-table-cell>
            </md-table-row>
        </md-table>
        <md-card class="projectInfos">
            <h1>
                {{project.selected.name}}
            </h1>
            <p>{{project.selected.desc}}</p>
        </md-card>
    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";
    export default {
        name: "EditProject",
        computed: {
            ...mapState({
                project: state => state.project,
                ressources: state => state.ressources,
                groupTask: state => state.groupTask
            }),
        },
            methods: {
                ...mapActions('project', {
                    getProjectById: 'getProjectById'
                }),
                editResource(resource){
                    this.ressources.selected = resource
                    this.$router.push('/project/'+this.project.selected._id+'/resource/edit')
                },
                editGroupTask(groupTask, dateStart, dateEnd){
                    this.groupTask.selected = groupTask
                    this.groupTask.selected.start = dateStart
                    this.groupTask.selected.end = dateEnd
                    this.$router.push('/project/'+this.project.selected._id+'/groupTask/edit')
                }
            },
        beforeMount() {
            this.getProjectById(this.$route.params.id)
        },
    }
</script>

<style scoped>
    .tableDetails{
        position: relative;
        display: inline-block;
        width: 33%;
    }
    .projectInfos{
        display: inline-block;
        position: relative;
        height: 100%;
    }
</style>
