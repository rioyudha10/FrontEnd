import { GET_TSOUVERNIR, CREATE_TSOUVERNIR, UPDATE_TSOUVENIR} from "../actions/types"; //CREATE_MENU, DELETE_MENU

const initialState = {
  ts: [], //nilai awal masih kosong (array kosong) bebas variabel
  statusGET: "",
  statusDEL: "",
  statusADD: "",
  statusPUT: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case  GET_TSOUVERNIR:
      return {
        ...state,
        ts: action.payload,
        statusGET: action.status
      };
    

    // case DEL_PRODUCT:
    //   return {
    //     ...state,
    //     ts: state.ts.filter(p => production._id !== action.payload.id),
    //     statusDEL: action.status
    //   };

    case CREATE_TSOUVERNIR:
      return {
        ...state,
        // menuan: action.payload,
        statusADD: action.status
      };

      case UPDATE_TSOUVENIR:
      return {
        ...state,
        //companies: alert('masuk pak eko'),//state.companies.filter(content => content._id === action.payload._id),
        statusPUT: action.status
      };

    default:
      return state;
  }
  
}

