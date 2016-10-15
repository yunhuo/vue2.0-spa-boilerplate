<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <router-view class="view"></router-view>
        </transition>

        <alert ref="alert"></alert>
        <confirm ref="confirm"></confirm>
    </div>
</template>

<script type="text/ecmascript-6">
    import Alert from './widgets/Alert.vue';
    import Confirm from './widgets/Confirm.vue';

    export default {
        components: {
            Alert,
            Confirm
        },

        mounted() {
            window.$refs.alert = this.$refs.alert;
            window.$refs.confirm = this.$refs.confirm;
        }
    };
</script>

<style lang="stylus">
    @import "../styles/app.styl";
</style>
