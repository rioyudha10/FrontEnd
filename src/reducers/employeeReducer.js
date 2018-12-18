import { GET_EMPLOYEE} from "../actions/types"; //CREATE_MENU, DELETE_MENU

const initialState = {
  employee: [], //nilai awal masih kosong (array kosong) bebas variabel
  statusGET: "",
  statusDEL: "",
  statusADD: "",
  statusPUT: ""
};

export default function(state = initialState, action) {
    switch (action.type) {
      case  GET_EMPLOYEE:
        return {
          ...state,
          employee: action.payload,
          statusGET: action.status
        };
      default:
        return state;
    }
    
  }