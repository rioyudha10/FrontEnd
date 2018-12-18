import {
    GET_COMPANIES,
    DEL_COMPANIES,
    UPDATE_COMPANIES,
    POST_COMPANIES
} from "../actions/types";

const initialState = {
    companies : [],
    statusGET: "",
    statusDEL: "",
    statusADD: "",
    statusPUT: ""
}

export default function (state = initialState, action){
    switch(action.type){
        case GET_COMPANIES:
            return {
                ...state,
                companies:action.payload,
                statusGET: action.status
            }
        case DEL_COMPANIES:
            return {
              ...state,
              companies: state.companies.filter(companies => companies.code !== action.payload),
              statusDEL: action.status
            };
      
        case POST_COMPANIES:
            return {
              ...state,
              //companies: state.companies.concat(action.payload),
              statusADD: action.status
            };
      
        case UPDATE_COMPANIES:
            return {
              ...state,
              //companies: alert('masuk pak eko'),//state.companies.filter(content => content._id === action.payload._id),
              statusPUT: action.status
            };
        default:
        return state
    }
}