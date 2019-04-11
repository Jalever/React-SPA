import {
	ADD_TODO,
	TOGGLE_TODO,
	ADD_USER_INFO,
	COMPARE_HEIGHT,
	HANDLE_SELECTED_FILES,
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
