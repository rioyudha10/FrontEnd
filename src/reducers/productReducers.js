import { GET_PRODUCT, DEL_PRODUCT,CREATE_PRODUCT, UPDATE_PRODUCT } from "../actions/types"; //CREATE_MENU, DELETE_MENU

const initialState = {
  production: [], //nilai awal masih kosong (array kosong) bebas variabel
  statusGET: "",
  statusDEL: "",
  statusADD: "",
  statusPUT: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return {
        ...state,
        production: action.payload,
        statusGET: action.status
      };

    case DEL_PRODUCT:
      return {
        ...state,
        production: state.production.filter(production => production._id !== action.payload.id),
        statusDEL: action.status
      };

    case CREATE_PRODUCT:
      return {
        ...state,
        // menuan: action.payload,
        statusADD: action.status
      };

      case UPDATE_PRODUCT:
      return {
        ...state,
        //companies: alert('masuk pak eko'),//state.companies.filter(content => content._id === action.payload._id),
        statusPUT: action.status
      };

    default:
      return state;
  }
}
