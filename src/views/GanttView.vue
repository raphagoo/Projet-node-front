<template>
    <div>
        <router-link to="/" class="text-center"><md-button class="md-icon-button"><md-icon>home</md-icon></md-button></router-link>
        <h1>{{project.selected.name}}</h1>
        <gantt-elastic :tasks="taskFormatted" :options="options" :dynamic-style="dynamicStyle">
            <gantt-header slot="header"></gantt-header>
        </gantt-elastic>
    </div>
</template>

<script>
    import GanttElastic from '../../node_modules/gantt-elastic/src/GanttElastic.vue';
    import Header from '../../node_modules/gantt-elastic-header/src/Header.vue';
    import {mapState} from "vuex";
    export default {
        created() {
            this.project.selected.task.forEach(taskSelected => {
                taskSelected.start = new Date(taskSelected.start * 1000)
                taskSelected.end = new Date(taskSelected.end * 1000)
                taskSelected.label = taskSelected.name
                taskSelected.progress = taskSelected.percentageProgress
                if(taskSelected.linkedTask[0]) {
                    let taskDependent = []
                    taskSelected.linkedTask.forEach(task => {
                        taskDependent.push(task.id)
                    })
                    taskSelected.dependentOn = taskDependent
                }
                if(taskSelected.ressources[0])
                {
                    let ressourcesDependent = ""
                    taskSelected.ressources.forEach(ressource => {
                        ressourcesDependent = ressourcesDependent+" - "+ressource.name
                    })
                    taskSelected.user = ressourcesDependent
                }
                else{
                    taskSelected.user = "Inconnu"
                }
                taskSelected.type = 'task';
                taskSelected.style = {
                    base: {
                        fill: taskSelected.color,
                        stroke: taskSelected.color
                    }
                }
                console.log(taskSelected)
                this.taskFormatted.push(taskSelected)
            })
        },
        computed: {
            ...mapState({
                service: state => state.service,
                ressources: state => state.ressources,
                project: state => state.project,
                task: state => state.task,
                groupTask: state => state.groupTask,
                milestone: state => state.milestone
            })
        },
        data(){
            return {
                taskFormatted:[],
                options: {
                    maxRows: 100,
                    maxHeight: 500,
                    title: {
                        label: 'Mon gantt',
                        html: false
                    },
                    row: {
                        height: 100
                    },
                    calendar: {
                        hour: {
                            display: false
                        }
                    },
                    chart: {
                        progress: {
                            bar: false
                        },
                        expander: {
                            display: true
                        }
                    },
                    taskList: {
                        expander: {
                            straight: false
                        },
                        columns: [
                            {
                                id: 1,
                                label: "ID",
                                value: "id",
                                width: 40
                            },
                            {
                                id: 2,
                                label: "Description",
                                value: "label",
                                width: 200,
                                expander: true,
                                html: true,
                            },
                            {
                                id: 3,
                                label: "Assigné à",
                                value: "user",
                                width: 130,
                                html: true
                            },
                            {
                                id: 4,
                                label: "Type",
                                value: "type",
                                width: 68
                            },
                            {
                                id: 5,
                                label: "Pourcentage réalisé",
                                value: "progress",
                                width: 150,
                                style: {
                                    "task-list-header-label": {
                                        "text-align": "center",
                                        width: "100%"
                                    },
                                    "task-list-item-value-container": {
                                        "text-align": "center",
                                        width: "100%"
                                    }
                                }
                            }
                        ]
                    },
                },
                dynamicStyle: {
                    'task-list-header-label': {
                        'font-weight': 'bold'
                    }
                }
            }
        },
        name: "GanttView",
        components: {GanttElastic,  ganttHeader: Header}
    }
</script>

<style scoped>

</style>
