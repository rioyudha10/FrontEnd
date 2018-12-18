import axios from "axios";
import {  GET_SOUVERNIR_ITEM, CREATE_SOUVENIR_ITEM } from "./types"; //, CREATE_MENU, DELETE_MENU
import ApiConfig from "../configs/api.config.json";

let token = localStorage.getItem(ApiConfig.LS.TOKEN);
export const  getListItem = () => dispatch => {
    let options = {
      url: ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.SOUV,
      method: "get",
      headers: {
        Authorization: token
      }
    };
    axios(options)
      .then(res => {
        dispatch({
          type:  GET_SOUVERNIR_ITEM,
          payload: res.data.message,
          status: res.data.code
        });
        //alert(JSON.stringify(res.data.message))
      })
      .catch(error => {
        dispatch({
          type:   GET_SOUVERNIR_ITEM,
          payload: null
        });
      });
  };

  export const createTsouveniritem = body => dispatch => {
    //alert(ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.TSOUVENIRITEM)
    let token = localStorage.getItem(ApiConfig.LS.TOKEN);
    let option = {
      url: ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.SOUV,
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
          type: CREATE_SOUVENIR_ITEM,
          payload: body,
          status: res.data.code
        });
      })
      .catch(error => {
        dispatch({
          type: CREATE_SOUVENIR_ITEM,
          payload: null
        });
      });
  };