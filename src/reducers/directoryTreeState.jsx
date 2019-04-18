import {
    HAVE_LOADED_DIRECTORY_TREE
} from "./../actions/actionTypes.jsx";

const initialState = {
    isLoaded: false
};


export default function(state = initialState, action) {
    switch (action.type) {
        case HAVE_LOADED_DIRECTORY_TREE: {
            let { haveLoaded } = action.payload;
            return {
                ...state,
                isLoaded: haveLoaded
            };
        }
        default:
            return state;
    }
};
