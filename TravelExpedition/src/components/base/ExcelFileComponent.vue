<template>
  <v-container>
    <div
      id="dropzone-external"
      class="flex-box"
      :class="[
        isDropZoneActive
          ? 'dx-theme-accent-as-border-color dropzone-active'
          : 'dx-theme-border-color',
      ]"
    >
      <div class="flex-box">
        <span>Drag & Drop the file </span>
        <span>…or click to browse for a file instead.</span>
      </div>
    </div>
  </v-container>
  <v-container v-if="response != null">
    <v-alert
      v-if="response.responseCode === 'Fail'"
      variant="outlined"
      type="warning"
      color="red"
      prominent
      closable
    >
      <template v-slot:title>
        <p style="color: red" class="textColor">
          Error: &nbsp; <u class="textColor"> {{ uploadFile.name }}</u> &nbsp;
          couldn't uploaded.
        </p>
      </template>
      <div v-if="response != null">
        <h5 class="mt-2" style="color: black !important">
          Message: {{ response.message }}
        </h5>
      </div>
    </v-alert>
  </v-container>
  <v-dialog width="auto" v-model="fileDialog" persistent v-if="fileDialog">
    <v-card>
      <v-toolbar color="white" class="text-center align-center justify-center">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="12">
            <v-chip class="ma-2" color="orange darken-3" label>
              <v-icon start icon="mdi-information"></v-icon>
              FILE INFO
            </v-chip>
          </v-col>
        </v-row>
      </v-toolbar>

      <v-card-text>
        <v-row>
          <v-col cols="12" sm="12">
            <b class="colorText"> File Name: </b>{{ uploadFile.name }}</v-col
          >
        </v-row>

        <v-row>
          <v-col cols="12" sm="12">
            <b class="colorText"> File Size: </b
            >{{ uploadFile.size }} Byte</v-col
          >
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" class="text-center">
            <b> Are you sure upload this file?</b></v-col
          >
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn color="green" variant="tonal" @click="uploadFiles()">
          <v-icon start icon="mdi-check"></v-icon>
          Upload
        </v-btn>
        <v-btn color="red" variant="tonal" @click="cancelFile()">
          <v-icon start icon="mdi-cancel"></v-icon>
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <DxFileUploader
    id="file-uploader"
    :key="FileUploaderKey"
    dialog-trigger="#dropzone-external"
    drop-zone="#dropzone-external"
    @drop-zone-enter="onDropZoneEnter"
    @drop-zone-leave="onDropZoneLeave"
    :accept="acceptFileType"
    :multiple="false"
    :visible="false"
    :uploadMode="uploadMode"
    :onValueChanged="onFileChanged"
  />
</template>

<script>
import { DxFileUploader } from "devextreme-vue/file-uploader";
import general from "@/api/BaseMethods/general.js";
import alertifyService from "@/api/BaseMethods/alertify.js";

export default {
  emits: ["success"],
  components: {
    DxFileUploader,
  },
  props: {
    url: { type: String, required: true },
    fileModelName: { type: String, required: true },
    excelDivObject:{ type: Object, required: true },
  },
  data() {
    return {
      isDropZoneActive: false,
      uploadMode: "useForms",
      FileUploaderKey: 0,
      uploadFile: null,
      acceptFileType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      response: null,
      fileDialog: false,
      errorTitle: "Unexpected Error",
    };
  },
  methods: {
    onDropZoneEnter,
    onDropZoneLeave,
    onFileChanged,
    uploadFiles,
    cancelFile,
    successEmitFunction,
  },
};
async function uploadFiles() {
  this.cancelFile();
  this.response = await general.uploadFiles(
    this.uploadFile,
    this.url,
    this.fileModelName,
    this.excelDivObject,
  );
  console.log(this.response)
  if (this.response.data.ResponseCode === 'Success') {
    alertifyService.success(
      "Success",
      `${this.uploadFile.name} has been uploaded.`
    );
    this.uploadFile = null;
    this.successEmitFunction(); 
  } else {
    console.log(this.response)
    alertifyService.error("Error: " + this.response.data);
    this.uploadFile = null;
  }
}
function onDropZoneEnter(e) {
    
    if (e.dropZoneElement.id === "dropzone-external") {
        this.isDropZoneActive = true;
    }
}
function onDropZoneLeave(e) {
    
    if (e.dropZoneElement.id === "dropzone-external") {
        this.isDropZoneActive = false;
    }
}
function onFileChanged(e) {
    
    this.isDropZoneActive = false;
    this.uploadFile = null;

    if (e.value.length == 1) {
        const type = e.value[0].name.split(".").pop().toLowerCase();
        if (type == "xlsx") {
        this.uploadFile = e.value[0];
        this.fileDialog = true;
        this.response = null;
        } else {
        this.uploadFile = null;
        this.fileDialog = false;
        }
    } else {
        this.uploadFile = null;
    }
    this.FileUploaderKey++;
}
function successEmitFunction() {
    
  this.$emit("success");
}
function cancelFile() {
    
  //  this.uploadFile = null
    this.fileDialog = false;
}
</script>

<style>
#dropzone-external {
  width: auto;
  height: 150px;
  background-color: rgba(183, 183, 183, 0.1);
  border-width: 2px;
  border-style: dashed;
  padding: 10px;
}
#dropzone-external:hover {
  background-color: rgba(97, 90, 90, 0.1);
  border-style: solid;
  border-color: #337ab7 !important;
}
#dropzone-external > * {
  pointer-events: none;
}
#dropzone-external.dropzone-active {
  background-color: rgba(97, 90, 90, 0.1);
  border-style: solid;
  border-color: #337ab7 !important;
}
.widget-container > span {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 16px;
}
.flex-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.dx-theme-accent-as-border-color {
  border-color: #337ab7 !important;
}
.colorText {
  color: chocolate;
}
.textColor {
  color: black;
}
</style>
