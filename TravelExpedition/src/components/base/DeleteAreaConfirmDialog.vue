<template>
    <div class="text-center">
        <v-dialog v-model="dialogConfirmBool" max-width="400px">
            <v-container>
                <v-card>
                    <v-container>
                        <v-textarea ref="deleteReasonRef" label="Delete Reason" v-model="DeleteReason" rows="3" placeholder="Please enter delete reason"
                            :rules="areaRules" counter variant="outlined" density="compact" shaped row-height="15" color="indigo" auto-grow>
                        </v-textarea>
                        <p class="text-center"><b>{{ dialogMessage }}</b></p>
                        <!-- <v-card-text class="text--primary" center>
                        <h5>{{ dialogMessage }}</h5>
                        </v-card-text> -->
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn :color="ButtonActiveColor" text @click="ClickActive()">{{ ButtonActiveText }}</v-btn>
                        <v-btn :color="ButtonRejectColor" text @click="dialogConfirmBool = false">{{ ButtonRejectText }}</v-btn>
                        <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-container>
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
        DeleteReason:"",
        deleteReasonBool:false,
        areaRules:[(value)=>{
        if(value.length==0 ) {return "Enter a character"}
        else if(value.length>500)
        {return "Max 500 characters"}
        else{ return true}
      }],
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
        this.DeleteReason = "";
        this.deleteReasonBool = param.deleteReasonBool;
      },
      async ClickActive(){
        const valid = await this.$refs.deleteReasonRef.validate();
        if(valid.length==0 || !this.deleteReasonBool){
            this.dialogConfirmBool=false
            this.$emit(this.emitText,this.DeleteReason)
        }
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