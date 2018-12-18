import { GET_TSOUVERNIR_ITEM} from "../actions/types"; //CREATE_MENU, DELETE_MENU

const initialState = {
  tsI: [], //nilai awal masih kosong (array kosong) bebas variabel
  statusGET: "",
  statusDEL: "",
  statusADD: "",
  statusPUT: ""
};

export default function(state = initialState, action) {
    switch (action.type) {
      case  GET_TSOUVERNIR_ITEM:
        return {
          ...state,
          tsI: action.payload,
          statusGET: action.status
        };
      default:
        return state;
    }
    
  }