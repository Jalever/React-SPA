import {
	COMPARE_HEIGHT
} from "./../actions/actionTypes.jsx";

const initialState = {
	clientHeight: null,
	scrollHeight: null
};

export default function(state = initialState, action) {
	switch(action.type) {
		case COMPARE_HEIGHT: {
			let { cHeight, sHeight } = action.payload;
			return {
				...state,
				clientHeight: cHeight,
				scrollHeight: sHeight
			};
		}
		default: 
			return state;
	}
}








