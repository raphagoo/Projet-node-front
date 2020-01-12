<template>
    <div>
        <router-link to="/" class="text-center">Projet Node</router-link>
        <md-button @click="clickButton" class="md-icon-button">
            <md-icon>refresh</md-icon>
        </md-button>
    </div>
</template>

<script>
    export default {
        name: "Header",
        sockets: {
            connect: function () {
                console.log('socket connected')
            },
            update: function (data) {
                console.log('La data :', data)
            }
        },
        methods: {
            clickButton() {
                // $socket is socket.io-client instance
                this.$socket.emit('getUpdate')
            },
        }
    }
</script>

<style scoped>

</style>
