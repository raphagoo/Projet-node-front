<template>
    <div>
        <gantt-elastic :tasks="formattedTasks" :options="options" :dynamic-style="dynamicStyle">
            <gantt-header slot="header"></gantt-header>
        </gantt-elastic>
    </div>
</template>

<script>
    import GanttElastic from '../../node_modules/gantt-elastic/src/GanttElastic.vue';
    import Header from '../../node_modules/gantt-elastic-header/src/Header.vue';
    import {mapState} from "vuex";
    export default {
        computed: {
            ...mapState({
                service: state => state.service,
                ressources: state => state.ressources,
                project: state => state.project,
                task: state => state.task,
                groupTask: state => state.groupTask,
                milestone: state => state.milestone
            }),
            formattedTasks(){
                let taskFormatted = [];
                this.project.selected.task.forEach(taskSelected => {
                    taskSelected.start = new Date(taskSelected.start * 1000)
                    taskSelected.end = new Date(taskSelected.end * 1000)
                    taskSelected.label = taskSelected.name
                    taskSelected.progress = taskSelected.percentageProgress
                    taskSelected.user = taskSelected.resources
                    taskSelected.type = 'task'
                    taskSelected.style = {
                        base: {
                            fill: taskSelected.color,
                            stroke: taskSelected.color
                        }
                    }
                    console.log(taskSelected)
                    taskFormatted.push(taskSelected)
                })
                return taskFormatted
            }
        },
        data(){
            return {
                options: {
                    maxRows: 100,
                    maxHeight: 300,
                    title: {
                        label: 'Your project title as html (link or whatever...)',
                        html: false
                    },
                    row: {
                        height: 24
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
                    }
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
