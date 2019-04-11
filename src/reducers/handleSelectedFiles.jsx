import {
	HANDLE_SELECTED_FILES
} from "./../actions/actionTypes.jsx";

const initialState = {
	dataSource: [],
	count: 1
};

export default function(state = initialState, action) {
	switch(action.type) {
		case HANDLE_SELECTED_FILES: {
			let { dataSource, filesCount } = action.payload;
			return {
				...state,
				dataSource: [...dataSource],
				count: filesCount
			};
		}
		default: 
			return state;
	}
}

