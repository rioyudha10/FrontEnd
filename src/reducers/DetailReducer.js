import {
    CREATE_DETAIL
} from "../actions/types";

const initialState = {
    detail : [],
    statusGET: "",
    statusDEL: "",
    statusADD: "",
    statusPUT: ""
}

export default function (state = initialState, action){
    switch(action.type){
            case CREATE_DETAIL:
            return {
              ...state,
              // menuan: action.payload,
              statusADD: action.status
            };
        default:
        return state
    }
}