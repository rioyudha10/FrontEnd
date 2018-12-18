import axios from 'axios'
import apiconfig from '../configs/api.config.json'


const API = {
    login: async (username, password) => {
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.LOGIN,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                username: username,
                password: password
            }
        }
        try {
            let result = await axios(option)
            return result.data
        } catch (error) {
            return error.response.data

        }
        
    },
    company: async(code, name, created_date, created_by)=>{
        let token=localStorage.getItem(apiconfig.LS.TOKEN)
        let option={
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.COMPANY,
            method: "GET",
            headers: {
                "Authorization": token
            },
            data:{
                code: code,
                name: name,
                created_date: created_date,
                created_by: created_by
            }
        }
        try {
            let result = await axios(option)
            return result.data
        } catch(error){
            return error.response.data
        }
    },

    role: async(code, name, created_date, created_by)=>{
        let token=localStorage.getItem(apiconfig.LS.TOKEN)
        let option={
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.ROLE,
            method: "GET",
            headers: {
                "Authorization": token
            },
            data:{
                code: code,
                name: name,
                created_date: created_date,
                created_by: created_by
            }
        }
        try {
            let result = await axios(option)
            return result.data
        } catch(error){
            return error.response.data
        }
    },
}

export default API