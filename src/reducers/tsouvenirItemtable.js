import { GET_SOUVERNIR_ITEM, CREATE_SOUVENIR_ITEM} from "../actions/types"; //CREATE_MENU, DELETE_MENU

const initialState = {
  it: [], //nilai awal masih kosong (array kosong) bebas variabel
  statusGET: "",
  statusDEL: "",
  statusADD: "",
  statusPUT: ""
};

export default function(state = initialState, action) {
    switch (action.type) {
      case  GET_SOUVERNIR_ITEM:
        return {
          ...state,
          it: action.payload,
          statusGET: action.status
        };

        case CREATE_SOUVENIR_ITEM:
          return {
            ...state,
            // menuan: action.payload,
            statusADD: action.status
          };
      
      default:
        return state;
    }
    
  }