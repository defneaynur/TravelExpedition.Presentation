<template>
    <div class="text-center">
    <v-snackbar
            :timeout="4000"
            v-model="successAlert" 
            :multi-line="multiLine" 
            :color="color" 
            shaped top>
            {{ successMsg }}
          </v-snackbar>
    </div>
    </template>
    
    <script>
      export default {
        data: () => ({
          successAlert: false,
          successMsg: "",
          multiLine:true,
          color:"",
        }),
    
        methods: {
          show(data) {
            this.successMsg = data.successMsg;
            this.color = data.color;
            this.successAlert = true;
          },
        },
      };
    </script>