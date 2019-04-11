import { combineReducers } from "redux";

import todoItem from "./todo.jsx";
import visibilityFilter from "./visibilityFilter.jsx";
import userInfo from "./userInfo.jsx";
import compareHeight from "./compareHeight.jsx";
import handleSelectedFiles from "./handleSelectedFiles.jsx";

export default combineReducers({ 
	todoItem, 
	visibilityFilter,
	userInfo,
	handleSelectedFiles,
	compareHeight
});

