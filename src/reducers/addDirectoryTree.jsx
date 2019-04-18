import {
    ADD_DIRECTORY_TREE,
    IS_LOADED_DIRECTORY_TREE
} from "./../actions/actionTypes.jsx";

const initialState = [];

export default function(state = initialState, action) {
    switch(action.type) {
        case ADD_DIRECTORY_TREE: {
            let { item } = action.payload;
            return {
                ...state,
                [item.key]: {
                    ...item
                }
            };
        }
        default:
            return state;
    }
};
