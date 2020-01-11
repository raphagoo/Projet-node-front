<template>
    <div>
        <span class="md-title">Group task</span>
        <md-field>
            <label>Name</label>
            <md-input v-model="groupTask.name" required />
        </md-field>
        <md-datepicker v-model="groupTask.start" required>
            <label>Date Start</label>
        </md-datepicker>
        <md-datepicker v-model="groupTask.end" required>
            <label>Date End</label>
        </md-datepicker>
    </div>
</template>

<script>
    export default {
        name: "GroupTaskForm",
        data(){
            return{
                groupTask: {
                    name: null,
                    start: null,
                    end: null
                }
            }
        }
    }
</script>

<style scoped>

</style>
