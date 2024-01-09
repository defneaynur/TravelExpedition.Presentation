<template>
  <div class="text-center">
    <v-dialog v-model="dialogVisible" width="auto">

      <v-card class="v-modal">
        <v-card-title class="text-center">
          Edi Mail Attachement
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text v-html="modalBodyContent"></v-card-text>
        <v-divider></v-divider>
        <v-card-text v-html="modalTextContent"></v-card-text>
        <v-card-actions>
          <v-btn color="secondary" block @click="dialogVisible = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>
  
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      modalTextContent: "",
      modalBodyContent: ""
    }
  },
  methods: {
    show(param) {
      this.dialogVisible = param.isShow;
      this.modalTextContent = param.text;
      this.modalBodyContent = param.body;
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