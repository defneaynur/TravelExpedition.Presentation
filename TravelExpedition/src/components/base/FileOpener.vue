<template>
    <div class="text-center">
        <v-dialog v-model="FileOpenerBool" persistent no-click-animation>
            <v-container>
                <v-card>
                    <v-toolbar border>
                        <ToolBarChip :get-title="dialogMessage"/>
                    <v-spacer></v-spacer>
                    <v-icon size="small" color="red" start icon="mdi-close-octagon-outline" @click="closeClick"></v-icon>
                </v-toolbar>
                    <iframe :src="byteFile"  style="width: 100%; height: 1000px;"></iframe>
                </v-card>
            </v-container>
        </v-dialog>
 
    </div>
  </template>
    
  <script>
  import ToolBarChip from './ToolBarS.vue';
  export default {
    components:{
        ToolBarChip
    },
    data() {
      return {
        FileOpenerBool: false,
        dialogMessage: "",
        byteFile:"",
      }
    },
    methods: {
      showFile(param) {
        this.dialogMessage = param.dialogMessage;
        this.FileOpenerBool = param.FileOpenerBool;
        this.byteFile = this.excelOrPDF(param.type,param.byteFile)
      },
      excelOrPDF(type,byteDoc){
        let file =""
        if(type==='pdf'){
            file = 'data:application/pdf;base64,'+byteDoc
        }
        else if(type==='excel'){
           file = 'data:application/vnd.ms-excel;base64,'+byteDoc
        }
        return file
      },
      closeClick(){
        this.dialogMessage =""
        this.FileOpenerBool=false
        this.byteFile=""
      }
    }
  };
  </script>
   
  
  <style scoped>

  </style>