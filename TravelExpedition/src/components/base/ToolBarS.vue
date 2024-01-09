<template>
    <v-chip class="ma-2" color="teal-darken-4" label>
        <v-icon start icon="mdi-bookmark"></v-icon>
          {{UpperCase(getTitle)}}
      </v-chip>
 </template>
 
 <script>
 
 export default {
     data() {
         return {
         };
     },
     props:{
         getTitle: String
     },
     methods:{
         UpperCase(title){
             title=title.toUpperCase()
             return title
         }
     }
 }
 </script>