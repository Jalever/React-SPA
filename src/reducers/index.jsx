import { combineReducers } from "redux";

import todoItem from "./todo.jsx";
import visibilityFilter from "./visibilityFilter.jsx";

export default combineReducers({todoItem, visibilityFilter});

