import axios from "axios"
import {
    GET_QUESTIONER,
    CREATE_QUESTIONER,
    UPDATE_QUESTIONER
} from "./types"
import apiconfig from "../configs/api.config.json"

let token = localStorage.getItem(apiconfig.LS.TOKEN)

export const getQuestioner = () => dispatch => {
    let options = {
        url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.QUEST,
        method : "get",
        headers : {
            Authorization : token
        }
    }
    axios(options)
        .then(res => {
            dispatch({
                type : GET_QUESTIONER,
                payload : res.data.message
            })
        })
        .catch(err =>{
            dispatch({
                type : GET_QUESTIONER,
                payload : null
            })
        })
        
} 

export const createHandler = body => dispatch => {
    let token = localStorage.getItem(apiconfig.LS.TOKEN);
    let option = {
      url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.QUEST,
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
          type: CREATE_QUESTIONER,
          payload: body,
          status: res.data.code
        });
      })
      .catch(error => {
        dispatch({
          type: CREATE_QUESTIONER,
          payload: null
        });
      });
  };
  
  export const updateQuestioner = (theData)=>dispatch=>{
    //alert(JSON.stringify(theData))
    let token = localStorage.getItem(apiconfig.LS.TOKEN);
    let option = {
      url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.QUEST + "/" + theData.q_code,
      method: "put",
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      },
      data: theData
    };
    //alert(JSON.stringify(theData.formdata));
    axios(option)
      .then(res => {
            dispatch({
                type : UPDATE_QUESTIONER,
                payload :  theData,
                //status: res.data.code
            })
      })
      .catch(error => {
          dispatch({
              type : UPDATE_QUESTIONER,
              payload : null
          })
      });
  }

