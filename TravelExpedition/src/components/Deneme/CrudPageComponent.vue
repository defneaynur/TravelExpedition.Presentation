<template>
  <v-container>
    <v-card>
      <v-toolbar density="compact" color="white">
        <ToolbarChip :getTitle="pageName"></ToolbarChip>
        <v-spacer></v-spacer>

        <v-tooltip :text="filterCleanText" location="bottom">
          <template v-slot:activator="{ props }">
            <v-icon color="red" v-bind="props" @click="cleanFilterOfGrid()">mdi-filter-off</v-icon>
          </template>
        </v-tooltip>
        <v-tooltip :text="editTooltipText" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn v-if="selectedRowIndex != -1" icon="mdi-pencil" color="pink" size="small" v-bind="props"
              @click="dialogEditDataShow()"></v-btn>
          </template>
        </v-tooltip>
        <v-tooltip :text="deleteTooltipText" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn v-if="selectedRowIndex != -1" icon="mdi-delete-empty" color="brown" size="small" v-bind="props"
              @click="dialogDeleteDataShow()"></v-btn>
          </template>
        </v-tooltip>
        <div v-if="importExcelBool">
          <v-tooltip :text="excelImportText" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn color="purple-darken-3" size="small" v-bind="props"
                @click="excelFileDivBool = !excelFileDivBool"><v-icon>mdi-microsoft-excel</v-icon>
                IMPORT</v-btn>
            </template>
          </v-tooltip>
        </div>

        <div v-if="exportExcelBool">
          <v-tooltip :text="excelExportText" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn color="purple" size="small" v-bind="props"
                @click="getSummaryReport()"><v-icon>mdi-microsoft-excel</v-icon>
                EXPORT</v-btn>
            </template>
          </v-tooltip>
        </div>
        <v-tooltip :text="createTooltipText" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn rounded="lg" color="green" @click="dialogNewDataShow()" v-bind="props">
              <v-icon start icon="mdi-plus-box"></v-icon>
              {{ addButtonText }}
            </v-btn>
          </template>
        </v-tooltip>

      </v-toolbar>
    </v-card>
  </v-container>
  <ExcelFileComponent
      v-if="excelFileDivBool"
      :url="CreateDataFromExcelUrl"
      :excelDivObject="excelDivObject"
      :fileModelName="CreateDataFromExcelModelName"
      @success="SuccessUpload"
    ></ExcelFileComponent>

  <v-container>
    <DxDataGrid class="gridCrud" id="grid" :ref="dataGridRef" :show-borders="true" :data-source="dataSource"
      :repaint-changes-only="true" :key="gridKey" :remote-operations="true" :focused-row-index="0"
      :column-hiding-enabled="false" :selection="{ mode: 'single' }" :column-auto-width="true"
      :allow-column-resizing="true" :error-row-enabled="false" :show-column-lines="true" :row-alternation-enabled="true"
       @selection-changed="selectedChanged" @rowDblClick="dialogEditDataShow()" >
      <DxFilterRow :visible="true" />

      <DxPaging :page-size="10" :page-index="0" />

      <dx-pager :show-page-size-selector="true" :show-info="true" />

      <DxColumn v-for="column in ColumnInfos" :key="column" :data-field="column.dataField" :visible="column.visible"
        :caption="column.caption" :allow-filtering="column.filter" :allow-sorting="column.sort" :style="{width: column.width }"
        :alignment="column.alignment" :cell-template="column.cellTemplate"
        :header-cell-template="column.headerCellTemplate" :dataType="column.dataType"
        :displayFormat="column.displayFormat">
      </DxColumn>
    </DxDataGrid>
  </v-container>

  <CrudDialog ref="CrudDialog" :saveAsBool="saveAsBool" :CreateUrl="CreateUrl" :UpdateUrl="UpdateUrl"
    :DeleteUrl="DeleteUrl" :SaveAsUrl="SaveAsUrl" :insertModelName="insertModelName" :updateModelName="updateModelName"
    :deleteModelName="deleteModelName" :saveAsModelName="saveAsModelName" @success="successResponse"
    @error="errorResponse" />
  <v-dialog v-model="dialogConfirm" max-width="400px">
    <v-container>
      <v-card>
        <v-card-text class="text--primary" center>
          <h5>Are you sure you want to delete this data?</h5>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialogConfirm = false">CANCEL</v-btn>
          <v-btn color="green" text @click="SetDeleteData()">DELETE</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-dialog>
</template>

<script>
import ToolbarChip from "@/components/base/ToolBarS.vue";
import ExcelFileComponent from "@/components/base/ExcelFileComponent.vue";
import CrudDialog from "@/components/Deneme/CrudDialog.vue";
import {
  DxDataGrid,
  DxColumn,
  DxPager,
  DxPaging,
  DxFilterRow,
} from "devextreme-vue/data-grid";

import general from "@/api/BaseMethods/general.js";
import CRUD from "@/api/DeltaGeneralKargo/CRUD.js";

const dataSource = null;
const dataGridRef = "dataGrid";

export default {
  components: {
    ToolbarChip,
    DxDataGrid,
    DxColumn,
    DxPager,
    DxPaging,
    DxFilterRow,
    ExcelFileComponent,
    CrudDialog,
  },
  data() {
    return {
      dataSource,
      dataGridRef,
      dialogConfirm: false,
      selectedRowIndex: -1,
      isSaveBool: false,
      gridKey: 0,
      selectedDialogDataIndex: -1,
      excelImportText: "Import Excel File",
      excelFileDivBool: false,
      excelExportText: "Export Excel Report",
      dataProp: null,
      filterCleanText: "Clean Filters",
    };
  },
  props: {
    getsUrl: String,
    CreateUrl: String,
    UpdateUrl: String,
    DeleteUrl: String,
    SaveAsUrl: String,
    CreateDataFromExcelUrl: String,
    reportUrl: String,
    insertModelName: String,
    updateModelName: String,
    deleteModelName: String,
    saveAsModelName: String,
    CreateDataFromExcelModelName: String,
    pageName: String,
    editTooltipText: String,
    deleteTooltipText: String,
    createTooltipText: String,
    addButtonText: String,
    dialogTitle: String,
    ColumnInfos: Array,
    exportExcelBool: Boolean,
    importExcelBool: Boolean,
    saveAsBool: Boolean,
    comboComponents: Array,
    excelDivObject:Object,
  },
  methods: {
    GetDatas,
    SetDeleteData,
    dialogDeleteDataShow,
    dialogEditDataShow,
    dialogNewDataShow,
    selectedChanged,
    SuccessUpload,
    getSummaryReport,
    getColumnsForInsertDialog,
    getColumnsForUpdateDialog,
    successResponse,
    errorResponse,
    getComboForUpdateDialog,
    cleanFilterOfGrid,
  },
  created() {
    this.GetDatas();
  },
  computed: {
    dataGrid: function () {
      return this.$refs[dataGridRef].instance;
    },
  },
};

//#region OTHER METHODS
function successResponse(successMessage) {
  this.GetDatas();
  this.selectedRowIndex=-1
  
  this.dataGrid.clearSelection();
  this.$root.SnackBarS.show({
    successMsg: successMessage,
    color: "green",
  });
}
function errorResponse(errorMessage) {
  this.$root.SnackBarS.show({
    successMsg: errorMessage,
    color: "red",
  });
}
function getColumnsForInsertDialog() {
  let columnArray = [];
  let columns = this.dataGrid.getVisibleColumns();
  for (var col of columns) {
    if (col.key.columnBool) {
      if (
        col.key.dataType == "string" ||
        col.key.dataType == "number" ||
        col.key.dataType == ""
      ) {
        col.key.value = "";
      } else if (col.key.dataType == "date") {
        col.key.value = new Date();
      } else if (col.key.dataType == "boolean") {
        col.key.value = false;
      }
      columnArray.push(col.key);
    }
  }
  return columnArray;
}
function getColumnsForUpdateDialog() {
  let columnArray = [];
  let columns = this.dataGrid.getVisibleColumns();
  for (var col of columns) {
    if (col.key.columnBool) {
      if (col.key.dataField in this.dataProp) {
        col.key.value = this.dataProp[col.key.dataField];
      }
      columnArray.push(col.key);
    }
  }
  columnArray.push({
    PKey: this.dataProp.PKey,
    ComplexCode: this.dataProp.ComplexCode,
    Creator: this.dataProp.Creator,
    Created: this.dataProp.Created,
  });
  return columnArray;
}
function getComboForUpdateDialog() {
  const updateCombos = structuredClone(this.comboComponents)

  for (var combo of updateCombos) {
    combo.modelObject.value = this.dataProp[combo.gridColumnValue]
    combo.modelObject.title = this.dataProp[combo.gridColumnTitle]
  }
  return updateCombos
}
function dialogEditDataShow() {

  this.$refs.CrudDialog.crudDialogOpener({
    isShow: true,
    fields: this.getColumnsForUpdateDialog(),
    header: this.editTooltipText,
    mode: "Update",
    isSaveBool: true,
    comboComponents: this.getComboForUpdateDialog(),
  });
}
function dialogNewDataShow() {
  this.$refs.CrudDialog.crudDialogOpener({
    isShow: true,
    fields: this.getColumnsForInsertDialog(),
    header: this.dialogTitle,
    mode: "Insert",
    isSaveBool: false,
    comboComponents: structuredClone(this.comboComponents),
  });
}
async function getSummaryReport() {
  const filter = await general.getFilterOfGrid(this.dataGrid);
  const sorter = await general.getSorterOfGrid(this.dataGrid);
  const columns = [];
  this.dataGrid.state().columns.forEach(element => {
    if (element.visible) {
      columns.push(element.dataField)
    }
  });

  var params = {
    ActiveColumns: JSON.stringify(columns),
    filter: filter,
    sort: sorter,
  };

  const response = await CRUD.GetDataWithAxios(this.reportUrl, params);
  if (response.data.ResponseCode === "Success") {
    general.decodeAndDownloadFile(
      response.data.Data.DocumentFile,
      response.data.Data.Name
    );
  }
}
function SuccessUpload() {
  this.excelFileDivBool = false;
  this.GetDatas();
}
//#endregion

//#region DIALOG OPERATIONS METHODS
function dialogDeleteDataShow() {
  this.dialogConfirm = true;
}

function selectedChanged(e) {
  this.selectedRowIndex = e.selectedRowKeys[0];
  this.dataProp = structuredClone(e.selectedRowsData[0]);
}
function cleanFilterOfGrid() {
  general.cleanFilterOfGrid(this.dataGrid)
}

//#endregion

//#region CRUD OPERATIONS
function GetDatas() {
  this.dataSource = CRUD.GetDatas(this.getsUrl);
}
async function SetDeleteData() {
  let result = await CRUD.SetDeleteData(
    this.DeleteUrl,
    this.selectedRowIndex,
    this.deleteModelName
  );
  if (result != "ERR") {
    this.dialogConfirm = false;
    this.GetDatas();
  }
}

//#endregion
</script>
<style scoped>
.columnCss {
  background-color: yellow;
  color: #ff5722;
  /* Diğer stil tanımlamaları */
}

.custom-datebox {
  background-color: #f2f2f2;
  color: #f2f2f2;
  border: 1px solid #ccc;
}

.gridCrud {
  max-width: 100%;
  width: 100%;
  min-width: auto;
}

:deep(input::-webkit-outer-spin-button),
:deep(input::-webkit-inner-spin-button) {
  -webkit-appearance: none;
  margin: 0;
}
</style>
@/api/CrudOperation/CRUD.js