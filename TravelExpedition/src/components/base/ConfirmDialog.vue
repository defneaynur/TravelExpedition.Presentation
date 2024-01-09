<template>
    <div class="text-center">
        <v-dialog v-model="dialogConfirmBool" max-width="400px">
            <v-container>
                <v-card>
                    <v-card-text class="text--primary" center>
                    <h5>{{ dialogMessage }}</h5>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :color="ButtonActiveColor" text @click="ClickActive()">{{ ButtonActiveText }}</v-btn>
                    <v-btn :color="ButtonRejectColor" text @click="dialogConfirmBool = false">{{ ButtonRejectText }}</v-btn>
                    <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-container>
        </v-dialog>
  
    </div>
  </template>
    
  <script>
  export default {
    data() {
      return {
        dialogConfirmBool: false,
        dialogMessage: "",
        ButtonRejectColor:"",
        ButtonActiveColor:"",
        ButtonActiveText:"",
        ButtonRejectText:"",
        emitText:"",
      }
    },
    methods: {
      confirmDialogOpener(param) {
        this.dialogConfirmBool = param.dialogConfirmBool;
        this.dialogMessage = param.dialogMessage;
        this.ButtonRejectColor = param.ButtonRejectColor;
        this.ButtonActiveColor = param.ButtonActiveColor;
        this.ButtonActiveText = param.ButtonActiveText;
        this.ButtonRejectText = param.ButtonRejectText;
        this.emitText = param.emitText;
      },
      ClickActive(){
        this.dialogConfirmBool=false
        this.$emit(this.emitText)
      }
    }
  };
  </script>
   
  
  <style scoped>
  .v-modal {
    background-color: #363640;
    color: white;
  }
  </style>