<template>
    <v-container>
        <v-card>
            <v-toolbar density="compact" color="white">
                <ToolBarS getTitle="HOMEPAGE"></ToolBarS>
            </v-toolbar>
        </v-card>
    </v-container>
</template>


<script>
import ToolBarS from '../components/base/ToolBarS.vue'

export default {
    components: {
        ToolBarS,
    },
    data: () => ({
    }),
    methods: {
        goToClickedPage,
    }
}
function goToClickedPage(name) {
    this.$router.push({ name: name });
}



</script>