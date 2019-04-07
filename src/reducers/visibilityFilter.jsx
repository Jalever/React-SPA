import {
	SET_FILTER
} from "./../actions/actionTypes.jsx";

import { VISIBILITY_FILTER } from "./../constants/todolist.jsx";

const initialState = VISIBILITY_FILTER.ALL;

export default (state = initialState, action) => {
	switch(action.type) {
		case SET_FILTER: {
			let { filter } = action.payload;
			return filter;
		}
		default: 
			return state;
	}
};
