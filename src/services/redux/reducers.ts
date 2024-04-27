
import ModalReducer from "./ModalReducer"
import DataSlice from "./GlobalDataReducer"
const combineReducers = {
    modal:ModalReducer,
    globalData:DataSlice,
 
}
export default combineReducers