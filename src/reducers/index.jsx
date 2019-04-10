import { combineReducers } from "redux";

import todoItem from "./todo.jsx";
import visibilityFilter from "./visibilityFilter.jsx";
import userInfo from "./userInfo.jsx";

export default combineReducers({ 
	todoItem, 
	visibilityFilter,
	userInfo
});

