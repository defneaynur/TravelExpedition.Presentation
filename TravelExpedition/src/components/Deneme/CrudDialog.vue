<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024" style="z-index: 200" no-animation-click>
      <v-card>
        <v-toolbar color="white" border>
          <ToolbarChip :get-title="header" />
          <v-spacer></v-spacer>
          <v-btn class="ma-2" tile outlined color="green" v-if="dataArray.length != 0 || isSaveBool"
            @click="isSaveBool ? SetUpdateData() : SetInsertData()">
            <v-icon left>mdi-content-save</v-icon>{{ getButtonText() }}
          </v-btn>
          <v-btn v-if="isSaveBool && saveAsBool" class="ma-2" tile outlined color="orange" @click="SetSaveAsData()">
            <v-icon left>mdi-content-save-all</v-icon>SAVE AS
          </v-btn>
          <v-icon size="small" color="red" start icon="mdi-close-octagon-outline" @click="onCloseClick"></v-icon>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" :key="i" :sm="item.columnPart" v-for="(item, i) in fields">
                <v-text-field :label="item.caption" required :type="item.dataType" density="compact" variant="outlined"
                  v-if="item.dataType == 'string' ||
                    item.dataType == 'number' ||
                    item.dataType == ''
                    " v-model="item.value" :rules="item.rules" :ref="item.ref">
                </v-text-field>
                <v-checkbox v-else-if="item.dataType == 'boolean'" :label="item.caption" density="compact"
                  variant="outlined" v-model="item.value" :ref="item.ref"></v-checkbox>
                <DxDateBox v-else-if="item.dataType == 'date'" v-model="item.value" style="height: 42px"
                  :hoverStateEnabled="false" stylingMode="outlined" type="date" :displayFormat="item.displayFormat"
                  :ref="item.ref"></DxDateBox>
              </v-col>

              <v-col cols="12" :sm="item.columnPart" :key="i" v-for="(item, i) in comboComponents">
                <div v-if="comboComponents.length > 0">
                  <v-combobox :label="item.label" v-model="item.modelObject" :placeholder="item.placeholder"
                    :items="item.items" item-title="title" item-value="value" :ref="item.ref" persistent-hint
                    variant="solo" density="compact" :color="item.color" :rules="item.rules" />
                </div>
              </v-col>
            </v-row>
            <v-row justify="center" align="center">
              <v-card-actions>
                <v-chip v-if="transactionMode == 'Insert'" color="cyan-darken-3" label class="ma-2"
                  @click="addToInsertGrid()">
                  <v-icon start icon="mdi-plus-box"></v-icon>
                  {{ btnAddListName }}
                </v-chip>
                <v-chip v-if="selectedDataIndex != -1" color="red-darken-3" label class="ma-2"
                  @click="RemoveRecordFromGrid()">
                  <v-icon start icon="mdi-delete"></v-icon>
                  {{ btnRemoveListName }}
                </v-chip>
              </v-card-actions>
            </v-row>
            <v-row >
              <DxDataGrid v-if="!isSaveBool && dataArray.length != 0" id="grid" ref="grid" :show-borders="true"
                :data-source="dataSource" :repaint-changes-only="true" :remote-operations="true" :focused-row-index="0"
                :column-hiding-enabled="false" :selection="{ mode: 'single' }" :hover-state-enabled="true"
                @selection-changed="selectedChanged" :column-auto-width="true" :allow-column-resizing="true" style="overflow: auto;">
                <DxPaging :page-size="10" :page-index="0" />

                <dx-pager :show-page-size-selector="true" :show-info="true" />

                <DxColumn v-for="column in fields" :key="column" :data-field="column.dataField" :visible="column.visible"
                  :caption="column.caption" :allow-filtering="column.filter" :allow-sorting="column.sort"
                  :alignment="column.alignment" :cell-template="column.cellTemplate"
                  :header-cell-template="column.headerCellTemplate" :dataType="column.dataType"
                  :displayFormat="column.displayFormat" :style="{ width: column.width }">
                </DxColumn>
                <!--jsondaki colon adına denk getşr burayı-->
                <DxColumn v-for="column in comboComponents" :key="column" :data-field="column.gridColumnTitle"
                  :caption="column.gridColumnTitle" :style="{ width: column.width }" />
              </DxDataGrid>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {
  DxDataGrid,
  DxPager,
  DxPaging,
  DxColumn,
} from "devextreme-vue/data-grid";
import ToolbarChip from "@/components/base/ToolBarS.vue";
import DxDateBox from "devextreme-vue/date-box";
import CRUD from "@/api/DeltaGeneralKargo/CRUD.js";

const dataSource = null;
export default {
  props: {
    saveAsBool: Boolean,
    CreateUrl: String,
    UpdateUrl: String,
    DeleteUrl: String,
    SaveAsUrl: String,
    insertModelName: String,
    updateModelName: String,
    deleteModelName: String,
    saveAsModelName: String,
  },

  components: {
    DxDataGrid,
    DxColumn,
    DxPager,
    DxPaging,
    DxDateBox,
    ToolbarChip,
  },
  data: () => ({
    dataSource,
    dialog: false,
    fields: [],
    updateToRow: {},
    isSaveBool: false,
    btnAddListName: "ADD LIST",
    btnRemoveListName: "REMOVE SELECTED",
    selectedDataIndex: -1,
    dataArray: [],
    comboComponents: [],
  }),
  methods: {
    crudDialogOpener(param) {
      this.dataSource = null;
      this.dialog = param.isShow;
      this.fields = param.fields;
      this.header = param.header;
      this.isSaveBool = param.isSaveBool;
      this.transactionMode = param.mode;
      this.comboComponents = param.comboComponents;
    },
    async SetInsertData() {
      try {
        const result = await CRUD.SetInsertData(
          this.CreateUrl,
          this.dataArray,
          this.insertModelName
        );
        if (result.data.ResponseCode == "Success") {
          this.$emit("success", "Operation is successfull");
        } else {
          this.$emit("error", result.data.Message);
        }
        this.onCloseClick();
      } catch {
        this.$emit("error", "Unexpected Error.");
        this.onCloseClick();
      }
    },
    async SetSaveAsData() {
      try {
        const object = this.objectHandlerWithPKey();
        delete object.PKey
        const result = await CRUD.SetSaveAsData(this.SaveAsUrl, object, this.saveAsModelName);

        if (result.data.ResponseCode == "Success") {
          this.$emit("success", "Save As operation successful.");
        } else {
          this.$emit("error", result.data.Message);
        }
        this.onCloseClick();
      } catch (error) {
        this.$emit("error", "Unexpected Error.");
        this.onCloseClick();
      }
    },
    async SetUpdateData() {
      const object = this.objectHandlerWithPKey();
      try {
        const result = await CRUD.SetUpdateData(
          this.UpdateUrl,
          this.fields[this.fields.length - 1].PKey,
          object,
          this.updateModelName
        );
        if (result.data.ResponseCode == "Success") {
          this.$emit("success", result.data.Message);
        } else {
          this.$emit("error", result.data.Message);
        }
        this.onCloseClick();
      } catch (error) {
        this.$emit("error", "Unexpected Error.");
        this.onCloseClick();
      }
    },
    async addToInsertGrid() {
      //await this.ValidateDialog()
      var json = {};
      this.fields.forEach((item) => {
        json[item.dataField] = item.value;
        json.OrderNumber = this.dataArray.length;
        json.Creator = "";
        json.Created = null;
        item.value = "";
      });
      if (this.comboComponents.length > 0) {
        for (var combo of this.comboComponents) {
          json[combo.gridColumnTitle] = combo.modelObject.title;
          json[combo.gridColumnValue] = combo.modelObject.value; // bu obje send edilen prop olucak ondan gridColumnValue dbdeki alan olmalı
        }
      }
      var data = structuredClone(json);

      this.dataArray.push(data);
      let datasourceList = structuredClone(this.dataArray);
      this.dataSource = datasourceList;
    },
    objectHandlerWithPKey() {
      var json = {};
      this.fields.forEach((item) => {
        if (item.dataType !== undefined) json[item.dataField] = item.value;
      });
      if (this.comboComponents.length > 0) {
        for (var combo of this.comboComponents) {
          json[combo.gridColumnValue] = combo.modelObject.value; // bu obje send edilen prop olucak ondan gridColumnValue dbdeki alan olmalı
        }
      }
      json.Created = this.fields[this.fields.length - 1].Created;
      json.Creator = this.fields[this.fields.length - 1].Creator;
      json.ComplexCode = this.fields[this.fields.length - 1].ComplexCode;
      return json;
    },
    onCloseClick() {
      this.dataArray = [];
      this.isSaveBool = false;
      this.dataSource = null;
      this.dialog = false;
      this.selectedDataIndex = -1;
    },
    getButtonText() {
      if (this.isSaveBool) {
        return "Update";
      } else {
        return "Add";
      }
    },
    selectedChanged(e) {
      this.selectedDataIndex = structuredClone(
        e.selectedRowsData[0].OrderNumber
      );
    },
    RemoveRecordFromGrid() {
      const index = this.dataArray.findIndex(
        (obj) => obj.OrderNumber == this.selectedDataIndex
      );
      if (index !== -1) {
        this.dataArray.splice(index, 1);
      }
      let datasourceList = structuredClone(this.dataArray);
      this.dataSource = datasourceList;
      this.selectedDataIndex = -1;
    },
    async ValidateDialog() {
      let validArray = []

      for (var item of this.fields) {
        if (item.ref !== undefined) {
          // console.log(item.ref)
          const Ref = item.ref
          const validResult = await this.$refs[Ref][0].validate();
          console.log(this.$refs)
          if (validResult.length > 0) {
            validArray.push(Ref)
          }
          // const response =await this.$refs.Ref.validate()
          // validArray.push(response)
        }
      }
      for (var cItem of this.comboComponents) {
        if (cItem.ref !== undefined) {
          const Ref = cItem.ref
          const validResult = await this.$refs[Ref][0].validate();
          console.log(validResult)
        }
      }
      console.log(validArray)

    }
  },
};
</script>
<style scoped>
:deep(input::-webkit-outer-spin-button),
:deep(input::-webkit-inner-spin-button) {
  -webkit-appearance: none;
  margin: 0;
}
</style>
@/api/CrudOperation/CRUD.js