import companyReducer from "./companyReducer";
import modeReducer from "./modeReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  roi: companyReducer,
  mode: modeReducer,
});
export default rootReducer;
