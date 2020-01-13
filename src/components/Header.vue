<template>
    <div>
        <router-link to="/" class="text-center"><md-button class="md-icon-button"><md-icon>home</md-icon></md-button></router-link>
        <md-button @click="clickButton" class="md-icon-button">
            <md-icon>refresh</md-icon>
        </md-button>
    </div>
</template>

<script>
    import consoleLogger from "logger";

    export default {
        name: "Header",
        sockets: {
            connect: function () {
                consoleLogger.info('socket connected')
            },
            update: function (data) {
                consoleLogger.info('La data :', data)
            }
        },
        methods: {
            clickButton() {
                consoleLogger.debug("Envoi du getUpdate")
                // $socket is socket.io-client instance
                this.$socket.emit('getUpdate')
            },
        }
    }
</script>

<style scoped>

</style>
