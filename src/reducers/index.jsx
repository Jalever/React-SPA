import { combineReducers } from "redux";

import todoItem from "./todo.jsx";
import visibilityFilter from "./visibilityFilter.jsx";
import userInfo from "./userInfo.jsx";
import compareHeight from "./compareHeight.jsx";
import handleSelectedFiles from "./handleSelectedFiles.jsx";
import determineItem from "./determineItem.jsx";
import directoryTreeReducers from "./addDirectoryTree.jsx";
import directoryTreeState from "./directoryTreeState.jsx";
import handleNewFolderModal from "./handleNewFolderModal.jsx";
import documentaryTableData from "./documentaryTableData.jsx";
import {
	selectedDirectory
} from "./directoryTree.jsx";

export default combineReducers({
	todoItem,
	selectedDirectory,
	documentaryTableData,
	visibilityFilter,
	directoryTreeState,
	userInfo,
	handleNewFolderModal,
	handleSelectedFiles,
	compareHeight,
	directoryTreeReducers,
	determineItem
});
