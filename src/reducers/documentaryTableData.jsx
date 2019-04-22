import {
    HANDLE_DOCUMENT_TABLE_DATA
} from "./../actions/actionTypes.jsx";

const initialState = [];

export default function(state = initialState, action) {
    switch(action.type) {
        case HANDLE_DOCUMENT_TABLE_DATA: {
            let { data } = action.payload;
            return data;
        }
        default:
            return state;
    }
};
