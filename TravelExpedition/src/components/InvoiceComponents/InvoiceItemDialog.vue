<template>
    <div class="text-center">
        <v-dialog v-model="dialogVisible" :width="dialogWidth" :style="{ zIndex: componentIndex }" persistent
            no-click-animation>
            <v-card>
                <v-toolbar color="white" border>
                    <ToolbarChip :getTitle="componentName"></ToolbarChip>
                    <v-spacer></v-spacer>
                    <div v-if="false">
                        <v-menu v-if="this.rowKeeper > 0">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props"> <v-icon>mdi-dots-vertical</v-icon></v-btn>
                            </template>

                            <v-list>
                                <v-list-item v-for="(item, i) in menuItems" :key="i">
                                    <v-btn @click="item.click">{{ item.title }}</v-btn>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>

                    <v-icon size="small" color="red" start icon="mdi-close-octagon-outline" @click="closeDialog"></v-icon>
                </v-toolbar>

                <v-container>
                    <v-chip class="mb-2" size="small">Order Number : {{ chipData.OrderNumber }} - Customer Code : {{
                        chipData.CustomerCode }} - Customer Name : {{ chipData.CustomerName }} </v-chip>

                    <!-- <v-text-field style="display:none" ref="logPKey" id="LogPKey" >{{ PKey }}</v-text-field> -->
                    <DxDataGrid id="grid" :ref="dataGridInvoiceRef" :show-borders="true" :data-source="dataSource"
                        :repaint-changes-only="true" :key="gridInvoiceItemKey" :remote-operations="true"
                        :focused-row-index="-1" :focused-row-enabled="true" :column-hiding-enabled="false"
                        :error-row-enabled="false" :show-column-lines="true" :row-alternation-enabled="true"
                        :allow-column-reordering="true" :allow-column-resizing="true" :column-auto-width="true"
                        @context-menu-preparing="addMenuItems">

                        <DxFilterRow :visible="true" />

                        <DxPaging :page-size="10" :page-index="0" />

                        <dx-pager :show-page-size-selector="true" :show-info="true" />
                        <DxColumn v-for="column in gridColumns" :key="column" :data-field="column.dataField"
                            :visible="column.visible" :caption="column.caption" :allow-filtering="column.filter"
                            :allow-sorting="column.sort" :style="{ width: column.width }" :alignment="column.alignment"
                            :cell-template="column.cellTemplate" :header-cell-template="column.headerCellTemplate"
                            :dataType="column.dataType" :displayFormat="column.displayFormat">
                        </DxColumn>
                    </DxDataGrid>
                </v-container>
            </v-card>
        </v-dialog>

    </div>
    <InvoiceAttachmentDialog :data-source="dataSourceAttachment" :dialogVisibleProp="AttachmentDialogBool"
        @close="closeInvoiceAttachmentDialog" />
    <ConfirmDialog ref="ConfirmDialog" @saveAction="sendSAPInvoiceLog" @changeRemarks="confirmRemarksChange" />

    <!-- Change Remarks/PoNumber Dialog -->
    <v-dialog v-model="remarksChangeBool" persistent no-click-animation max-width="20%" style="z-index: 3;">
        <v-container>
            <v-card>
                <v-toolbar border color="white" density="compact">
                    <ToolbarChip get-title="Edit Remarks" />
                    <v-spacer></v-spacer>
                    <v-icon size="medium" color="red" start icon="mdi-close-octagon-outline"
                        @click="closeClickOfRemarksChange"></v-icon>
                </v-toolbar>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="12">
                            <v-textarea density="compact" variant="outlined" color="teal-darken-2" label="Remarks"
                                :placeholder="invoiceRemarksObjectKeeper.currentRemarks"
                                v-model="invoiceRemarksObjectKeeper.newRemarks"></v-textarea>
                        </v-col>
                    </v-row>
                    <div class="customConfirmButton">
                        <v-btn text color="green" variant="tonal" @click="remarksChangeConfirmOpener">Change</v-btn>
                        <v-btn color="red" variant="tonal" text class="ml-2"
                            @click="closeClickOfRemarksChange">Cancel</v-btn>
                    </div>
                </v-container>
            </v-card>
        </v-container>
    </v-dialog>
</template>

<script>
import ToolbarChip from "@/components/base/ToolBarS.vue"
import DataLibrary from "@/api/DeltaGeneralKargo/CRUD.js"
import InvoiceAttachmentDialog from "@/components/InvoiceComponents/InvoiceAttachmentDialog.vue"
import {
    DxDataGrid,
    DxColumn,
    DxPager,
    DxPaging,
    DxFilterRow,
    DxSelection,
} from "devextreme-vue/data-grid";
import "whatwg-fetch";
import auth from "@/api/auth.js"
import CRUD from "@/api/DeltaGeneralKargo/CRUD.js";
import ConfirmDialog from "@/components/base/ConfirmDialog.vue";

const dataGridInvoiceRef = 'dataGrid'
const dataSourceAttachment = null
export default {
    emits: ["close"],
    components: {
        ToolbarChip,
        DxDataGrid,
        DxColumn,
        DxPager,
        DxPaging,
        DxFilterRow,
        //DxSelection,
        InvoiceAttachmentDialog,
        ConfirmDialog,
    },
    props: {
        dialogVisibleProp: Boolean,
        dataSource: Object,
        chipData: Object,
        ColumnInfos: Array,
        PKey: Number
    },
    data() {
        return {
            dataGridInvoiceRef,
            dataSourceAttachment,
            dialogWidth: "70%",
            dialogVisible: this.dialogVisibleProp,
            componentIndex: 2,
            componentName: "Invoice Log Items",
            invoiceRemarksObjectKeeper: {
                currentRemarks: "",
                newRemarks: "",
                PKey: -1,
            },
            remarksChangeBool: false,
            txtInvoiceLogPKey: this.PKey,
            gridColumns:[
                    {
                        dataField: "PKey",
                        visible: false,
                        filter: false,
                        sort: true,
                        width: "auto",
                        caption: "PKey",
                        alignment: "left",
                        cellTemplate: "",
                        headerCellTemplate: "",
                        dataType: "number",
                        displayFormat: "",
                    },
                    {
                        dataField: "StockCode",
                        visible: true,
                        filter: true,
                        sort: true,
                        width: "auto",
                        caption: "StockCode",
                        alignment: "center",
                        cellTemplate: "",
                        headerCellTemplate: "",
                        dataType: "",
                        displayFormat: "",
                    },
                    {
                        dataField: "StockDescription",
                        visible: true,
                        filter: true,
                        sort: true,
                        width: "auto",
                        caption: "StockDescription",
                        alignment: "left",
                        cellTemplate: "",
                        headerCellTemplate: "",
                        dataType: "string",
                        displayFormat: "",
                    },
                    {
                        dataField: "VatRate",
                        visible: true,
                        filter: true,
                        sort: true,
                        width: "auto",
                        caption: "VatRate",
                        alignment: "left",
                        cellTemplate: "",
                        headerCellTemplate: "",
                        dataType: "string",
                        displayFormat: "",
                    },
                    {
                        dataField: "InvoiceCurrency",
                        visible: true,
                        filter: true,
                        sort: true,
                        width: "auto",
                        caption: "InvoiceCurrency",
                        alignment: "left",
                        cellTemplate: "",
                        headerCellTemplate: "",
                        dataType: "string",
                        displayFormat: "",
                    },
                    {
                        dataField: "Currency",
                        visible: true,
                        filter: true,
                        sort: true,
                        width: "auto",
                        caption: "Currency",
                        alignment: "left",
                        cellTemplate: "",
                        headerCellTemplate: "",
                        dataType: "string",
                        displayFormat: "",
                    },
                    {
                        dataField: "BillOfLadingNumber",
                        visible: true,
                        filter: true,
                        sort: true,
                        width: "auto",
                        caption: "BillOfLadingNumber",
                        alignment: "left",
                        cellTemplate: "",
                        headerCellTemplate: "",
                        dataType: "string",
                        displayFormat: "",
                    },
                    {
                        dataField: "UnitId",
                        visible: true,
                        filter: true,
                        sort: true,
                        width: "auto",
                        caption: "UnitId",
                        alignment: "left",
                        cellTemplate: "",
                        headerCellTemplate: "",
                        dataType: "string",
                        displayFormat: "",
                    },
                    {
                        dataField: "PriceUnit",
                        visible: true,
                        filter: true,
                        sort: true,
                        width: "auto",
                        caption: "PriceUnit",
                        alignment: "left",
                        cellTemplate: "",
                        headerCellTemplate: "",
                        dataType: "string",
                        displayFormat: "",
                    },
                    {
                        dataField: "PriceVat",
                        visible: true,
                        filter: true,
                        sort: true,
                        width: "auto",
                        caption: "PriceVat",
                        alignment: "left",
                        cellTemplate: "",
                        headerCellTemplate: "",
                        dataType: "string",
                        displayFormat: "",
                    },
                    {
                        dataField: "PriceTotal",
                        visible: true,
                        filter: true,
                        sort: true,
                        width: "auto",
                        caption: "PriceTotal",
                        alignment: "left",
                        cellTemplate: "",
                        headerCellTemplate: "",
                        dataType: "",
                        displayFormat: "",
                    },
                    {
                        dataField: "PriceTotalWithVat",
                        visible: true,
                        filter: true,
                        sort: true,
                        width: "auto",
                        caption: "PriceTotalWithVat",
                        alignment: "left",
                        cellTemplate: "",
                        headerCellTemplate: "",
                        dataType: "",
                        displayFormat: "",
                    },
                    {
                        dataField: "InvoiceQuantity",
                        visible: true,
                        filter: true,
                        sort: true,
                        width: "auto",
                        caption: "InvoiceQuantity",
                        alignment: "left",
                        cellTemplate: "",
                        headerCellTemplate: "",
                        dataType: "string",
                        displayFormat: "",
                    },
                    {
                        dataField: "StorageDay",
                        visible: true,
                        filter: true,
                        sort: true,
                        width: "auto",
                        caption: "StorageDay",
                        alignment: "left",
                        cellTemplate: "",
                        headerCellTemplate: "",
                        dataType: "",
                        displayFormat: "",
                    },
                    {
                        dataField: "StoragePeriod",
                        visible: true,
                        filter: true,
                        sort: true,
                        width: "auto",
                        caption: "StoragePeriod",
                        alignment: "left",
                        cellTemplate: "",
                        headerCellTemplate: "",
                        dataType: "string",
                        displayFormat: "",
                    },
                    {
                        dataField: "CurrencyRate",
                        visible: true,
                        filter: true,
                        sort: true,
                        width: "auto",
                        caption: "CurrencyRate",
                        alignment: "left",
                        cellTemplate: "",
                        headerCellTemplate: "",
                        dataType: "",
                        displayFormat: "",
                    },
                    {
                        dataField: "InvoiceCurrencyTotal",
                        visible: true,
                        filter: true,
                        sort: true,
                        width: "auto",
                        caption: "InvoiceCurrencyTotal",
                        alignment: "left",
                        cellTemplate: "",
                        headerCellTemplate: "",
                        dataType: "string",
                        displayFormat: "",
                    },
                    {
                        dataField: "InvoiceCurrencyVat",
                        visible: true,
                        filter: true,
                        sort: true,
                        width: "auto",
                        caption: "InvoiceCurrencyVat",
                        alignment: "left",
                        cellTemplate: "",
                        headerCellTemplate: "",
                        dataType: "string",
                        displayFormat: "",
                    },
                    {
                        dataField: "InvoiceCurrencyGrandTotal",
                        visible: true,
                        filter: true,
                        sort: true,
                        width: "auto",
                        caption: "InvoiceCurrencyGrandTotal",
                        alignment: "left",
                        cellTemplate: "",
                        headerCellTemplate: "",
                        dataType: "string",
                        displayFormat: "",
                    },
                    {
                        dataField: "RequestKey",
                        visible: true,
                        filter: true,
                        sort: true,
                        width: "auto",
                        caption: "RequestKey",
                        alignment: "left",
                        cellTemplate: "",
                        headerCellTemplate: "",
                        dataType: "",
                        displayFormat: "",
                    },
                    {
                        dataField: "Remarks",
                        visible: true,
                        filter: true,
                        sort: true,
                        width: "auto",
                        caption: "Remarks",
                        alignment: "left",
                        cellTemplate: "",
                        headerCellTemplate: "",
                        dataType: "string",
                        displayFormat: "",
                    },
                  
                ],
            onClick: "always",
            gridInvoiceItemKey: 0,
            menuItems: [
                { title: "Invoice Attachments", click: this.menuClick },
            ],
            rowKeeper: -1,
            AttachmentDialogBool: false,
        }

    },
    methods: {
        showGridMenu,
        closeDialog,
        menuClick,
        rowClickAction,
        openDialog,
        closeInvoiceAttachmentDialog,
        addMenuItems,
        changeRemarks,
        controlGridBool,
        closeClickOfRemarksChange,
        remarksChangeConfirmOpener,
        saveProformaDetailsMethod,
        confirmRemarksChange,
        GetDatasOfPKey,
    },
    watch: {
        dialogVisibleProp(newVal) {
            this.dialogVisible = newVal;
        }
    },
    computed: {
        dataGrid: function () {
            return this.$refs[dataGridInvoiceRef].instance;
        }
    },
};

function GetDatasOfPKey(pkey, dt) {
    const url = auth.GetInvoiceLogItems + "?InvoiceLogPKey=" + pkey
    dt.dataSource = CRUD.GetDatas(url)
    dt.refresh()
}
function saveProformaDetailsMethod(dataProp) {
    this.proformaInfoDialog = {
        InvoiceDate: dataProp.InvoiceDate,
        Remarks: dataProp.Remarks,
        PoNumber: dataProp.PoNumber,
    }
}
function remarksChangeConfirmOpener() {
    this.$refs.ConfirmDialog.confirmDialogOpener({
        dialogConfirmBool: true,
        dialogMessage: "Are you sure to change remarks ?",
        ButtonRejectColor: "red",
        ButtonActiveColor: "green",
        ButtonActiveText: "Change",
        ButtonRejectText: "Cancel",
        emitText: "changeRemarks",
    })
}

function closeClickOfRemarksChange() {
    this.invoiceRemarksObjectKeeper = {
        currentRemarks: "",
        newRemarks: "",
        PKey: -1,
    },
        this.remarksChangeBool = false;
    // this.newInvoiceDate = new Date()
}

function controlGridBool(rowData, operation) {
    console.log(rowData)
    if (operation === 'changeRemarks') {
        this.changeRemarks(rowData)
    }
}
async function confirmRemarksChange() {
    var data = {
        PKey: this.invoiceRemarksObjectKeeper.PKey,
        Remarks: this.invoiceRemarksObjectKeeper.newRemarks == "" ? this.invoiceRemarksObjectKeeper.currentRemarks : this.invoiceRemarksObjectKeeper.newRemarks,
    }
    const response = await CRUD.PostData(auth.SetUpdateInvoiceLogItemRemark, data)
    if (response.data.ResponseCode === 'Success') {
        console.log(this.PKey)
        // const logPKeyElement = this.$refs.logPKey;
        // const value = logPKeyElement.$el.innerText;
        var dt = this.$refs[dataGridInvoiceRef].instance

        GetDatasOfPKey(this.PKey, dt)
        this.closeClickOfRemarksChange()
        this.$root.SnackBarS.show({
            successMsg: response.data.Message,
            color: 'green'
        })
    }
}
function changeRemarks(rowData) {
    this.invoiceRemarksObjectKeeper = {
        currentRemarks: "",
        newRemarks: rowData.Remarks,
        PKey: rowData.PKey,
    }
    this.remarksChangeBool = true
}
function addMenuItems(e) {
    if (e.target == 'content' && e.column !== undefined) {
        const rowData = e.row.data
        if (!e.items) e.items = [];

        e.items.push({
            text: "Edit Remarks",
            icon: 'refresh',
            onItemClick: () => {
                this.controlGridBool(rowData, 'changeRemarks')
            }
        });
    }
}

function rowClickAction(e) {
    this.rowKeeper = e.data.PKey
}
function menuClick() {
    this.openDialog()
}
function openDialog() {
    const url = auth.GetInvoiceAttachmentsUrl + "?InvoiceItemID=" + this.rowKeeper
    this.dataSourceAttachment = DataLibrary.GetDatas(url)
    this.AttachmentDialogBool = true
}

function closeInvoiceAttachmentDialog() {
    this.AttachmentDialogBool = false
    this.gridKey++
    this.rowKeeper = -1
}
function showGridMenu(e) {

    e.event.preventDefault();

    if (e.target == 'header') {

        if (!e.items) e.items = [];

        e.items.push({
            text: 'Log',
            onItemClick: () => {
                console.log(e.column.caption);
            }
        });
    }
    if (e.target == 'content') {
        this.rowKeeper = e.row.data.PKey
        if (!e.items) e.items = [];

        e.items.push({
            text: 'Attachments',
            icon: 'alignleft',
            onItemClick: async () => {
                this.openDialog()
            }
        });

        // e.items.push({
        //     text: 'Change Status',
        //     icon: 'sorted',
        //     items: [
        //         {
        //             text: ediStatusEnum.CREATED,
        //             icon: 'plus',
        //             onItemClick: async (e) => {
        //                 changeStatusProcess(e, modelName, refs, selectedItems);
        //             }
        //         },
        //         {
        //             text: ediStatusEnum.CLOSED,
        //             icon: 'remove',
        //             onItemClick: async (e) => {
        //                 changeStatusProcess(e, modelName, refs, selectedItems);
        //             }
        //         },
        //         {
        //             text: ediStatusEnum.COMPLETED,
        //             icon: 'todo',
        //             onItemClick: async (e) => {
        //                 changeStatusProcess(e, modelName, refs, selectedItems);
        //             }
        //         }
        //     ]
        // });
    }
}
function closeDialog() {
    this.$emit("close")
}

</script>


<style></style>@/api/CrudOperation/CRUD.js@/api/CrudOperation/CRUD.js