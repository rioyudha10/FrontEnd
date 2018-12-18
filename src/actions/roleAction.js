import axios from "axios"
import {GET_ROLES, DELETE_ROLE} from "./types"
import Apiconfig from "../configs/api.config.json"

let token = localStorage.getItem(Apiconfig.LS.TOKEN)

export const getRoles = () => dispatch =>{
    let options = {
        url : Apiconfig.BASE_URL + Apiconfig.ENDPOINTS.ROLE,
        method : "get",
        headers : {
            Authorization : token
        }
    }
    axios(options)
        .then(res => {
            dispatch({
                type : GET_ROLES,
                payload : res.data.message
            })
        })
        .catch(error =>{
            dispatch({
                type : GET_ROLES,
                payload : null
            })
        })
        
}

// export const createCompany = () => dispatch =>{
//     let options = {
//         url : Apiconfig.BASE_URL + Apiconfig.ENDPOINTS.COMPANY,
//         method : "post",
//         headers : {
//             Authorization : token
//         }
//     }
//     axios(options)
//         .then(res => {
//             dispatch({
//                 type : CREATE_COMPANIES,
//                 payload : res.data.message
//             })
//         })
//         .catch(error =>{
//             dispatch({
//                 type : CREATE_COMPANIES,
//                 payload : null
//             })
//         })  
// }

export const deleteRole = (params) => dispatch =>{
    let options = {
        url : Apiconfig.BASE_URL + Apiconfig.ENDPOINTS.ROLE +"/"+ params,
        method : "delete",
        headers : {
            Authorization : token
        }
    }
    axios(options)
        .then(res => {
            dispatch({
                type : DELETE_ROLE,
                payload : params
            })
        })
        .catch(error =>{
            dispatch({
                type : DELETE_ROLE,
                payload : null
            })
        })  
}

// export const editCompany = () => dispatch =>{
//     let options = {
//         url : Apiconfig.BASE_URL + Apiconfig.ENDPOINTS.COMPANY,
//         method : "put",
//         headers : {
//             Authorization : token
//         }
//     }
//     axios(options)
//         .then(res => {
//             dispatch({
//                 type : EDIT_COMPANIES,
//                 payload : res.data.message
//             })
//         })
//         .catch(error =>{
//             dispatch({
//                 type : EDIT_COMPANIES,
//                 payload : null
//             })
//         })  
// }