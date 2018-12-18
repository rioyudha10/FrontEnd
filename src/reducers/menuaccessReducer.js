import {GET_MENUACCESS} from "../actions/types";

const initialState = {
    menuaccessreducer : []
}

export default function (state = initialState, action){
    switch(action.type){
        case GET_MENUACCESS:
            return {
                ...state,
                menuaccessreducer:action.payload
            }
            default:
                return state
    }
}