import {
    HANDLE_SELECTED_DIRECTORY
} from "./../actions/actionTypes.jsx";

let selectedDirState = "";

export let selectedDirectory = (state = selectedDirState, action) => {
    switch (action.type) {
        case HANDLE_SELECTED_DIRECTORY: {
            let { key } = action.payload;
            return {
                key
            };
        }
        default:
            return state;
    }
};
