<template>
    <div class="dashboard">
        <MenuCpanel />
        <main class="col-right">
            <router-view />
        </main>        
    </div>
</template>

<script>
    import MenuCpanel from '../MenuCpanel.vue'
    export default {
        name: 'app',

        components: {
            MenuCpanel
        }
    }
</script>

