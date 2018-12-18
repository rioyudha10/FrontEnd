import axios from "axios"
import {
    GET_COMPANIES,
    DEL_COMPANIES,
    POST_COMPANIES,
    UPDATE_COMPANIES
} from "./types"
import apiconfig from "../configs/api.config.json"

let token = localStorage.getItem(apiconfig.LS.TOKEN)

export const getCompanies = () => dispatch => {
    let options = {
        url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.COMPANY,
        method : "get",
        headers : {
            Authorization : token
        }
    }
    axios(options)
        .then(res => {
            dispatch({
                type : GET_COMPANIES,
                payload : res.data.message
            })
        })
        .catch(err =>{
            dispatch({
                type : GET_COMPANIES,
                payload : null
            })
        })
        
} 

export const deleteCompanies = (params) => dispatch => {
    let options = {
        url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.COMPANY + "/" + params,
        method : "delete",
        headers : {
            Authorization : token
        }
    }
    axios(options)
        .then(res => {
            dispatch({
                type : DEL_COMPANIES,
                payload : params,
                status: res.data.code
            })
        })
        .catch(err =>{
            dispatch({
                type : DEL_COMPANIES,
                payload : null
            })
        })
        
} 

export const createCompanies = body => dispatch => {
    let token = localStorage.getItem(apiconfig.LS.TOKEN);
    let option = {
      url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.COMPANY,
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
          type: POST_COMPANIES,
          payload: body,
          status: res.data.code
        });
      })
      .catch(error => {
        dispatch({
          type: POST_COMPANIES,
          payload: null
        });
      });
  };

export const updateCompanies = (theData)=>dispatch=>{
    let token = localStorage.getItem(apiconfig.LS.TOKEN);
    let option = {
      url:
        apiconfig.BASE_URL +
        apiconfig.ENDPOINTS.COMPANY +
        "/" +
        theData.formdata._id,
      method: "put",
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      },
      data: theData.formdata
    };
    //alert(JSON.stringify(theData.formdata));
    axios(option)
      .then(res => {
            dispatch({
                type : UPDATE_COMPANIES,
                payload :  theData,
                //status: res.data.code
            })
      })
      .catch(error => {
          dispatch({
              type : UPDATE_COMPANIES,
              payload : null
          })
      });
  }
