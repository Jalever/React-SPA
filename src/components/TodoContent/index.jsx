import React from "react";
import AddTodoComponent from "./../AddTodoComponent/index.jsx";
import TodoListComponent from "./../TodoListComponent/index.jsx";
import VisibilityFilterBar from "./../VisibilityFilterBar/index.jsx";

import "./style.scss";

const TodoContent = () => {
	return(
		<div
			className="todoContent"
		>
			<AddTodoComponent />
			<VisibilityFilterBar />
			<TodoListComponent />
		</div>
	);
};

export default TodoContent;