import axios from 'axios'
import "whatwg-fetch";
// import CustomStore from 'devextreme/data/custom_store';
import { createStore } from "devextreme-aspnet-data-nojquery";

export default {
  GetDatas: GetDatas,
  GetData: GetData,
  SetDeleteData: SetDeleteData,
  SetInsertData: SetInsertData,
  SetUpdateData: SetUpdateData,
  SetSaveAsData: SetSaveAsData,
  GetDataWithAxios: GetDataWithAxios,
  PostData: PostData,

  data() {
    return {
      response: null,
      error: null,
    }
  },
}
//#region CRUD OPERATIONS
function GetDatas(url) {
  const dataSource = createStore({
    key: "PKey",
    loadUrl: url,
    onBeforeSend: function (method, options) {
      options.headers =
        getComplexHeader();
    },
    // errorHandler:function(error){
    //   console.log(error)
    //   auth.LogOut()
    // },
  });
  return dataSource
}
async function GetDataWithAxios(url, params) {
  try {
    const response = await axios.get(url, { params: params, headers: getComplexHeader() });
    return response;
  } catch (error) {
    return 'ERR';
  }
}

async function SetDeleteData(url, pkey, modelName) {
  var params = {
    [modelName]: pkey,
  };
  try {
    const response = await axios.post(url, params, { headers: getComplexHeader() });
    return response;
  } catch (error) {
    return 'ERR';
  }
}

async function SetInsertData(url, dataArray, modelName) {
  var data = {
    [modelName]: dataArray
  }
  try {
    const response = await axios.post(url, data, { headers: getComplexHeader() });
    return response;
  }
  catch (error) {
    console.log(error)
  }
}

async function SetSaveAsData(url, dataProp, modelName) {
  var data = {
    [modelName]: dataProp
  }
  try {
    const response = await axios.post(url, data, { headers: getComplexHeader() });
    return response;
  }
  catch (error) {
    console.log(error)
  }
}

async function SetUpdateData(url, pKey, dataProp, modelName) {
  dataProp.PKey = pKey
  var data = {
    [modelName]: dataProp
  }
  try {
    const response = await axios.post(url, data, { headers: getComplexHeader() });
    return response;
  }
  catch (error) {
    console.log(error)
  }
}

async function GetData(url, paramName, paramValue) {
  var params = {
    [paramName]: paramValue
  }
  const response = await axios.get(url, params, { headers: getComplexHeader() })
  return response
}
async function PostData(url, data) {
  let response = null
  try {
    response = await axios.post(url, data, { /*headers: getComplexHeader()*/ })
  }
  catch (error) {
    console.log(error)
    response = error
  }
  return response
}
function getComplexHeader() {
  const complexData = JSON.parse(localStorage.getItem('complex'))
  let complex;
  if (complexData === null) {
    complex = ""
  }
  else {
    complex = complexData.id
  }
  return {
    "X-YPH-COMPLEX": complex,
    //"Authorization":"Bearer "+ localStorage.getItem('token')
  }
}
//#endregion
