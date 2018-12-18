import axios from "axios"
import {GET_MENUACCESS, CREATE_MENUACCESS, EDIT_MENUACCESS, DELETE_MENUACCESS} from "./types"
import Apiconfig from "../configs/api.config.json"

let token = localStorage.getItem(Apiconfig.LS.TOKEN)

export const getMenuaccess = () => dispatch =>{
    let options = {
        url : Apiconfig.BASE_URL + Apiconfig.ENDPOINTS.ACCESS,
        method : "get",
        headers : {
            Authorization : token
        }
    }
    axios(options)
        .then(res => {
            dispatch({
                type : GET_MENUACCESS,
                payload : res.data.message
            })
        })
        .catch(error =>{
            dispatch({
                type : GET_MENUACCESS,
                payload : null
            })
        })
        
}

// export const createMenuaccess = () => dispatch =>{
//     let options = {
//         url : Apiconfig.BASE_URL + Apiconfig.ENDPOINTS.MENUACCESS,
//         method : "post",
//         headers : {
//             Authorization : token
//         }
//     }
//     axios(options)
//         .then(res => {
//             dispatch({
//                 type : CREATE_MENUACCESS,
//                 payload : res.data.message
//             })
//         })
//         .catch(error =>{
//             dispatch({
//                 type : CREATE_MENUACCESS,
//                 payload : null
//             })
//         })  
// }

export const deleteMenuaccess = (params) => dispatch =>{
    let options = {
        url : Apiconfig.BASE_URL + Apiconfig.ENDPOINTS.ACCESS +"/"+ params,
        method : "delete",
        headers : {
            Authorization : token
        }
    }
    axios(options)
        .then(res => {
            dispatch({
                type : DELETE_MENUACCESS,
                payload : params
            })
        })
        .catch(error =>{
            dispatch({
                type : DELETE_MENUACCESS,
                payload : null
            })
        })  
}

// export const editMenuaccess = () => dispatch =>{
//     let options = {
//         url : Apiconfig.BASE_URL + Apiconfig.ENDPOINTS.MENUACCESS,
//         method : "put",
//         headers : {
//             Authorization : token
//         }
//     }
//     axios(options)
//         .then(res => {
//             dispatch({
//                 type : EDIT_MENUACCESS,
//                 payload : res.data.message
//             })
//         })
//         .catch(error =>{
//             dispatch({
//                 type : EDIT_MENUACCESS,
//                 payload : null
//             })
//         })  
// }