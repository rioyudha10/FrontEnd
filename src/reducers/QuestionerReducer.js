import {
    GET_QUESTIONER,
    CREATE_QUESTIONER,
    UPDATE_QUESTIONER
} from "../actions/types";

const initialState = {
    quest : [],
    statusGET: "",
    statusDEL: "",
    statusADD: "",
    statusPUT: ""
}

export default function (state = initialState, action){
    switch(action.type){
        case GET_QUESTIONER:
            return {
                ...state,
                companies:action.payload,
                statusGET: action.status
            }
            case CREATE_QUESTIONER:
            return {
              ...state,
              // menuan: action.payload,
              statusADD: action.status
            };
            case UPDATE_QUESTIONER:
                return {
                    ...state,
                    //companies: alert('masuk pak eko'),//state.companies.filter(content => content._id === action.payload._id),
                    statusPUT: action.status
                };
        default:
        return state
    }
}