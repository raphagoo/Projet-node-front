<template>
    <div>
        <Header/>
        <div class="editServiceContainer">
            <CardProject />
        </div>
    </div>
</template>

<script>
    import Header from "../components/Header.vue";
    import CardProject from "../components/CardProject.vue";

    export default {
        name: "EditService",
        components: { Header, CardProject },
    }
</script>

<style lang="scss" scoped>
    .cardAdd{
        position: relative;
        width: 33%;
        display: inline-block;
    }
</style>
