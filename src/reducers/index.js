import {combineReducers} from "redux";
import companyReducer from "./companyReducer"
import roleReducer from "./roleReducer"
import menuReducer from "./menuReducers"
import menuAccessReducer from "./menuaccessReducer"
import productReducer from "./productReducers"
import tsouvernirReducer from "./tsouvernirReducer"
import tsouvernirItemnReducer from "./tsouvenirItemReducer"
import tsouvernirItemnTable from "./tsouvenirItemtable"
import employeeidReducer from "./employeeReducer"
import qustionerReducer from "./QuestionerReducer"
import detailReducer from "./DetailReducer"


export default combineReducers({
    company : companyReducer,
    product : productReducer,
    role : roleReducer,
    menu : menuReducer,
    menuaccess : menuAccessReducer,
    tsouvernir : tsouvernirReducer,
    tsouverniritem : tsouvernirItemnReducer,
    itemTable : tsouvernirItemnTable,
    employeeid :  employeeidReducer,
    questHeader :  qustionerReducer,
    questDetail :  detailReducer
});