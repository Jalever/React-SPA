import {
    HANDLE_SELECTED_TREE_NODE
} from "./../actions/actionTypes.jsx";

const initialState = {
    selectedTreeKey: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case HANDLE_SELECTED_TREE_NODE: {
            let { key } = action.payload;
            return Object.assign({}, state, {
                selectedTreeKey: key
            });
        }
        default:
            return state;
    }
}
