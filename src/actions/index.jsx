import {
	ADD_TODO,
	TOGGLE_TODO,
	ADD_USER_INFO,
	COMPARE_HEIGHT,
	DETERMINE_ITEM,
	HANDLE_SELECTED_FILES,
	ADD_DIRECTORY_TREE,
	HAVE_LOADED_DIRECTORY_TREE,
	HANDLE_NEW_FOLDER_MODAL,
	HANDLE_SELECTED_TREE_NODE,
	SET_FILTER
} from "./actionTypes.jsx";

let nextId = 0;

export const addTodo = content => ({
	type: ADD_TODO,
	payload: {
		id: ++nextId,
		content
	}
});

export const toggleTodo = id => ({
	type: TOGGLE_TODO,
	payload: {
		id
	}
});

export const setFilter = filter => ({
	type: SET_FILTER,
	payload: {
		filter
	}
});


export const addUserInfo = content => ({
	type: ADD_USER_INFO,
	payload: {
		content
	}
});

export const compareHeight = (cHeight, sHeight) => ({
	type: COMPARE_HEIGHT,
	payload: {
		cHeight,
		sHeight
	}
});

//BOS导入文档中上传文件的数据list
export const handleSelectedFiles = (dataSource, filesCount) => ({
	type: HANDLE_SELECTED_FILES,
	payload: {
		dataSource,
		filesCount
	}
});

export const determineItem = item => ({
	type: DETERMINE_ITEM,
	payload: {
		item
	}
});

//BOS - 存储文档树数据 - 因为reducers中[]结构会有重复，所以后面选择索引object结构避免重复冲突
export const addDirectoryTree = item => ({
	type: ADD_DIRECTORY_TREE,
	payload: {
		item
	}
});

//文档树是否获取到数据
export const haveLoadedDirectoryTree = haveLoaded => ({
	type: HAVE_LOADED_DIRECTORY_TREE,
	payload: {
		haveLoaded
	}
});

//新增文件夹Modal是否可见
export const addNewFolderModal = isVisible => ({
	type: HANDLE_NEW_FOLDER_MODAL,
	payload: {
		isVisible
	}
});

export const handleSelectedTreeNode = key => ({
	type: HANDLE_SELECTED_TREE_NODE,
	payload: {
		key
	}
});
