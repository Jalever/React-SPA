import {
	ADD_TODO,
	REMOVE_TODO,
	RESET_TODO,
	TOGGLE_TODO
} from "./../actions/actionTypes.jsx";

// const initialState = {
// 	allIds: [],
// 	byIds: {}
// };

const initialState = {
	allIds: [],
	todoList: {}
};

export default function(state = initialState, action) {
	switch(action.type) {
		case ADD_TODO: {
			let { id, content, priority, isCompleted } = action.payload;
			return{
				...state,
				allIds: [ ...state.allIds, id ],
				todoList: {
					...state.todoList,
					[id]: {
						content: content,
						priority: priority,
						isCompleted: isCompleted
					}
				}
			};
		}

		case REMOVE_TODO: {
			let { id } = action.payload;
			let newObj = Object.keys(state.todoList)
				.filter(key => key !== id)
				.reduce((acc, curValue) => {
					acc[curValue] = state.todoList[curValue];
					return acc;
				}, {})
			let newArr = state.allIds.filter(val => val !== id);

			return {
				allIds: [...newArr],
				todoList: newObj
			};
		}

		case RESET_TODO: {
			return {
				allIds: [],
				todoList: {}
			}
		}
		default:
			return state;
	}
};

// export default function(state = initialState, action) {
// 	switch(action.type) {
// 		case ADD_TODO: {
// 			let { id, content } = action.payload;
// 			return {
// 				...state,
// 				allIds: [...state.allIds, id],
// 				byIds: {
// 					...state.byIds,
// 					[id]: {
// 						content,
// 						completed: false
// 					}
// 				}
// 			}
// 		}
// 		case TOGGLE_TODO: {
// 			let { id } = action.payload;
//
// 			return {
// 				...state,
// 				byIds: {
// 					...state.byIds,
// 					[id]: {
// 						...state.byIds[id],
// 						completed: !state.byIds[id].completed
// 					}
// 				}
// 			};
// 		}
// 		default:
// 			return state;
// 	}
// }
