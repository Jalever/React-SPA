import { combineReducers } from "redux";

import todoItem from "./todo.jsx";
import visibilityFilter from "./visibilityFilter.jsx";
import userInfo from "./userInfo.jsx";
import compareHeight from "./compareHeight.jsx";
import handleSelectedFiles from "./handleSelectedFiles.jsx";
import determineItem from "./determineItem.jsx";
import directoryTreeReducers from "./addDirectoryTree.jsx";
import directoryTreeState from "./directoryTreeState.jsx";

export default combineReducers({
	todoItem,
	visibilityFilter,
	directoryTreeState,
	userInfo,
	handleSelectedFiles,
	compareHeight,
	directoryTreeReducers,
	determineItem
});
