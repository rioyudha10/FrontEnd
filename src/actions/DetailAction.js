import axios from "axios"
import {
    CREATE_DETAIL
} from "./types"
import apiconfig from "../configs/api.config.json"

export const createHandler = body => dispatch => {
    let token = localStorage.getItem(apiconfig.LS.TOKEN);
    let option = {
      url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.DETAIL,
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
          type: CREATE_DETAIL,
          payload: body,
          status: res.data.code
        });
      })
      .catch(error => {
        dispatch({
          type: CREATE_DETAIL,
          payload: null
        });
      });
  };
  
