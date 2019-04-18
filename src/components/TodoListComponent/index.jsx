import React from "react";
import { connect } from "react-redux";

import TodoItem from "./../TodoItemComponent/index.jsx";

import "./style.scss";

import { VISIBILITY_FILTER } from "./../../constants/todolist.jsx";

const getTodoExist = item => {
	return item.todoItem;
};

const getTodoAllIds = item => {
	return getTodoExist(item) ? getTodoExist(item).allIds : [];
};

const getAItemAction = (item, id) => {
	return getTodoExist(item) ? {...getTodoExist(item).byIds[id], id} : {};
};

const getTodoList = item => {
	return getTodoAllIds(item).map( curValue => {
		return getAItemAction(item, curValue);
	} );
};

const getFilteringTodoList = (item, visibilityFilter) => {
	let allTodos = getTodoList(item);

	switch(visibilityFilter) {
		case VISIBILITY_FILTER.COMPLETED: {
			return allTodos.filter((ele, index) => {
				return ele.completed;
			});
		}

		case VISIBILITY_FILTER.INCOMPLETED: {
			return allTodos.filter((ele, index) => {
				return !ele.completed;
			});
		}

		case VISIBILITY_FILTER.ALL:
		default:
			return allTodos;
	}
};


const TodoListComponent = ({ todoItem }) => {
	// console.log("TodoListComponent - todoItem: ");
	// console.log(todoItem);
	return(
		<ul
			className="customUl"
		>
			{
				todoItem && todoItem.length
				? (todoItem.map( (curValue, index) => {
					return <TodoItem key={index} todoItem={curValue} />
				} )) : "No Todos, yay!"
			}
		</ul>
	);
};

const mapStateToProps = state => {
	let { visibilityFilter } = state;
	let todoItem = getFilteringTodoList(state, visibilityFilter);


	// console.log("{ visibilityFilter } = state");
	// console.log(state);
	// console.log("todoItem");
	// console.log(todoItem);

	return {
		todoItem
	};
};

export default connect(mapStateToProps)(TodoListComponent);
