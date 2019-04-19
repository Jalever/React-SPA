import {
    HANDLE_NEW_FOLDER_MODAL
} from "./../actions/actionTypes.jsx";


const initialState = {
    isVisible: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case HANDLE_NEW_FOLDER_MODAL: {
            let { isVisible } = action.payload;
            return Object.assign({}, state, {
                isVisible: isVisible
            });
        }
        default:
            return state;
    }
};
