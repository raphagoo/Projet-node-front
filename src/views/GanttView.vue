<template>
    <div>
        <gantt-elastic :tasks="project.selected.task" :options="options" :dynamic-style="dynamicStyle">

        </gantt-elastic>
    </div>
</template>

<script>
    import GanttElastic from '../../node_modules/gantt-elastic/src/GanttElastic.vue';
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
        components: {GanttElastic}
    }
</script>

<style scoped>

</style>
