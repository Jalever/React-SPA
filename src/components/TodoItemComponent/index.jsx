import React from "react";
import { connect } from "react-redux";

import { toggleTodo } from "./../../actions/index.jsx";
import cx from "classnames";
import "./style.scss";


const TodoItem = ({ todoItem, toggleTodo }) => {
	// console.log("TodoItemComponent - todoItem: ");
	// console.log(todoItem);
	return (
		<li
			className="customLi"
			onClick={ () => {
				toggleTodo(todoItem.id)
			} }
		>
			{
				todoItem && todoItem.completed ? "👌" : "👋"
			}

			{ " " }

			{
				<span
					className={cx(
						"todo-item-text",
						todoItem && todoItem.completed && "completed"
					)}
				>
					{ todoItem.content }
				</span>
			}
		</li>
	);
};


export default connect(
	null,
	{ toggleTodo }
)(TodoItem);
