import {
	ADD_USER_INFO
} from "./../actions/actionTypes.jsx";

const initialState = {
	access_token: null,
	expires: null,
	user: {},
	modelDb: []
};

export default function(state = initialState, action) {
	switch(action.type) {
		case ADD_USER_INFO: {
			let { content } = action.payload;

			return {
				...content,
				user: {
					...content.user
				},
				modelDb: [...content.modelDb]
			};
		}
		default: 
			return state;
	}
}











