import axios from "axios";
import auth from "../../api/auth.js";
import alertifyService from "../BaseMethods/alertify.js"
// import ediStatusEnum from "../EdiStatus.js"
import {Buffer} from 'buffer'
import CRUD from "../CrudOperation/CRUD.js";
window.Buffer = Buffer;

function addMenuItems(e) {

    e.event.preventDefault();

    console.log(e);

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

        if (!e.items) e.items = [];

        e.items.push({
            text: 'Bill',
            icon: 'alignleft',
            onItemClick: async () => {
                console.log(e)
                // const data = {
                //     PKey: e.row.data.PKey,
                // };

                // await axios.post(auth.GetEmailContent.replace('-', modelName), data)
                //     .then(response => {
                //         if (response.data.ResponseCode === 'Success') {

                //             console.log(response);

                //             if (response.data.Data.FileAttachementContent != "" || response.data.Data.BodyContent != "") {

                //                 var body = response.data.Data.BodyContent;

                //                 var splittedEdi = response.data.Data.FileAttachementContent.split("'");
                //                 var edi = splittedEdi.join("'<br>");

                //                 root.ContentModaL.show({
                //                     isShow: true,
                //                     text: edi,
                //                     body: body
                //                 });
                //             }
                //             else {
                //                 root.ContentModaL.show({
                //                     isShow: true,
                //                     text: `Mail Content is not found!`,
                //                     body: 'Body is not found!'
                //                 });
                //             }
                //         }
                //         if (response.data.ResponseCode === 'Fail') {
                //             root.ContentModaL.show({
                //                 isShow: true,
                //                 text: "Mail is not contain File Attachment",
                //                 body: "Body is not found"
                //             });
                //         }
                //     }).catch(error => {
                //         console.error(error);
                //     });
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

// function changeStatusProcess(selectedContextItem, modelName, refs, selecteds) {

//     alertifyService.confirm("Warning", 'Are you sure you want to change the status?').then(async (res) => {
//         if (res.isConfirmed) {
//             var data = {
//                 "EdiStatusChange": [],
//                 "NewStatus": selectedContextItem.itemData.text
//             }

//             if (selecteds.length !== 0) {

//                 selecteds.forEach((el) => {
//                     data.EdiStatusChange.push({
//                         "PKey": el.PKey,
//                         "Status": el.Status,
//                     });
//                 });

//                 var response = await httpService.post(auth.API_EDI_URL, auth.SetStatusChange.replace('-', modelName), data);
//                 refs.grid.instance.refresh();

                
//                 if (response.ResponseCode == 'Success') {
//                     alertifyService.success('Success', `${response.Message}`)
//                 }
//                 else {
//                     alertifyService.success('Info', `${response.Message}`)
//                 }
//             }
//             else {
//                 alertifyService.error("Please make a selection before confirming the status change.")
//             }


//         }
//         if (res.dismiss) {
//             console.log('red');
//         }
//     });

// }
function decodeAndDownloadFile(fileByte, fileName) {

    const byteArray = Buffer.from(fileByte, 'base64')

    const file = new Blob([byteArray])

    const fileUrl = URL.createObjectURL(file);

    const link = document.createElement('a');

    link.href = fileUrl;

    link.download = fileName;

    document.body.appendChild(link);

    link.click();

    setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(fileUrl);
    }, 0);
}

async function uploadFiles(file, endpoint, modelName, data) {

    const readAsArrayBuffer = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsArrayBuffer(file);
        });
    };

    try {
        const arrayBuffer = await readAsArrayBuffer(file);
        const byte = Array.from(new Uint8Array(arrayBuffer));
        data[modelName] = byte
        console.log(data)
        return await CRUD.PostData(endpoint, data);

    } catch (error) {
        return error;
    }
}

async function getFilterOfGrid(dataGrid){
    const filter = dataGrid.getCombinedFilter()
    return JSON.stringify(filter)
}
async function getSorterOfGrid(dataGrid){
    var columns = dataGrid.state().columns;
    let bool = undefined;
    let field = '';
    columns.forEach(col=>{
    if(col.sortOrder !== undefined){ 
        col.sortOrder==='asc' ? bool = false : bool = true
        field = col.dataField
        }
    });
    if(bool !== undefined){
        return `[{"selector":"${field}","desc":${bool}}]`
    }
}
function cleanFilterOfGrid(instance){
    instance.clearFilter()
}
function refreshGridAndData(instance){
    instance.deselectAll();
    instance.refresh();
}
function convertFormatDate(date){
    var tarihNesnesi = new Date(date);
    var formatliTarih =  tarihNesnesi.getDate().toString().padStart(2, '0') + '/' + (tarihNesnesi.getMonth() + 1).toString().padStart(2, '0') + '/' + tarihNesnesi.getFullYear();
    
    return formatliTarih;
    }
export default {
    addMenuItems,
    decodeAndDownloadFile,
    uploadFiles,
    getFilterOfGrid,
    getSorterOfGrid,
    cleanFilterOfGrid,
    refreshGridAndData,
    convertFormatDate,
}