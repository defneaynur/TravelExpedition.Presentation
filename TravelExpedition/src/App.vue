<template>
  <v-app>
      <HomePage />
  </v-app>
  <SnackbarS ref="SnackBarS" />

  <ContentModaL ref="ContentModaL"></ContentModaL>
  <LoadeR ref="LoadeR"></LoadeR>
</template>


<script>

import HomePage from './views/HomePage.vue';
import SnackbarS from './components/base/SnackbarS.vue';
import ContentModaL from './components/base/ContentModal.vue';
import LoadeR from './components/base/LoadeR.vue';
export default {
  name: 'App',
  components: {
    HomePage,
    SnackbarS,
    ContentModaL,
    LoadeR
  },
  mounted() {
    this.$root.SnackBarS = this.$refs.SnackBarS;
    this.$root.ContentModaL = this.$refs.ContentModaL;
    this.$root.LoadeR = this.$refs.LoadeR;
  }
}



</script>