import axios from "axios";
import {  GET_TSOUVERNIR, CREATE_TSOUVERNIR, UPDATE_TSOUVENIR } from "./types"; //, CREATE_MENU, DELETE_MENU
import ApiConfig from "../configs/api.config.json";

let token = localStorage.getItem(ApiConfig.LS.TOKEN);

export const getAllTsouvernir = () => dispatch => {
  let options = {
    url: ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.TSOUVERNIR,
    method: "get",
    headers: {
      Authorization: token
    }
  };
  axios(options)
    .then(res => {
      dispatch({
        type: GET_TSOUVERNIR,
        payload: res.data.message,
        status: res.data.code
      });
      //alert(JSON.stringify(res.data.message))
    })
    .catch(error => {
      dispatch({
        type:  GET_TSOUVERNIR,
        payload: null
      });
    });
};

// export const delProduct = param => dispatch => {
//   let options = {
//     url: ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.PRODUCT + "/" + param,
//     method: "delete",
//     headers: {
//       Authorization: token
//     }
//   };
//   axios(options)
//     .then(res => {
//       dispatch({
//         type: DEL_PRODUCT,
//         payload: param,
//         status: res.data.code
//       });
//     })
//     .catch(error =>
//       dispatch({
//         type: DEL_PRODUCT,
//         payload: null
//         // type: GET_ERRORS,
//         // payload: err.response.data
//       })
//     );
// };

export const createTsouvernir = body => dispatch => {
  let token = localStorage.getItem(ApiConfig.LS.TOKEN);
  let option = {
    url: ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.TSOUVERNIR,
    method: "post",
    headers: {
      Authorization: token,
      "Content-Type": "application/json"
    },
    data: body
  };
  axios(option)
    .then(res => {
      dispatch({
        type: CREATE_TSOUVERNIR,
        payload: body,
        status: res.data.code
      });
    })
    .catch(error => {
      dispatch({
        type: CREATE_TSOUVERNIR,
        payload: null
      });
    });
};

export const updateTsouvenir = (theData)=>dispatch=>{
  console.log("ini data dari action", theData)
  let token = localStorage.getItem(ApiConfig.LS.TOKEN);
  let option = {
    url:
      ApiConfig.BASE_URL +
      ApiConfig.ENDPOINTS.TSOUVERNIR +
      "/" +
      theData.souv.code,
    method: "put",
    headers: {
      Authorization: token,
      "Content-Type": "application/json"
    },
    data: theData
  };
  //console.log("ini data dari action", theData.formdata)
  //alert(JSON.stringify(theData.formdata));
  axios(option)
    .then(res => {
          dispatch({
              type : UPDATE_TSOUVENIR,
              payload :  theData,
              //status: res.data.code
          })
    })
    .catch(error => {
        dispatch({
            type : UPDATE_TSOUVENIR,
            payload : null
        })
    });
}

