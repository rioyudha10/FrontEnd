import axios from "axios";
import {  GET_EMPLOYEE } from "./types"; //, CREATE_MENU, DELETE_MENU
import ApiConfig from "../configs/api.config.json";

let token = localStorage.getItem(ApiConfig.LS.TOKEN);
export const getAllEmployee = () => dispatch => {
    let options = {
      url: ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.EMPLOYEE,
      method: "get",
      headers: {
        Authorization: token
      }
    };
    axios(options)
      .then(res => {
        dispatch({
          type:  GET_EMPLOYEE,
          payload: res.data.message,
          status: res.data.code
        });
        //alert(JSON.stringify(res.data.message))
      })
      .catch(error => {
        dispatch({
          type:   GET_EMPLOYEE,
          payload: null
        });
      });
  };