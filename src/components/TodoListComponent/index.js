import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

// import TodoItem from "./../TodoItemComponent/index.jsx";
import List from "./List";
import AddTodoInput from "./AddTodoInput";
import API from "@/utils/api.js";
import "./style.scss";
import {
	addTodo,
	resetTodo
} from "@/actions/todoList";
import TodoListContext from "./todolistContext";
import WrapModal from "./WrapModal";

const TodoList = props => {
	let {
		addTodo,
		resetTodo
	} = props;

	// console.log("props - AddTodoInput");
	// console.log(props);
	// console.log("\n");

	//current TodoList Item Data
	let [liData, setLiData] = useState({});
	let [showModal, setShowModal] = useState(false);

	useEffect(() => {
		let response = API.getAllTasks();
		response.then(res => {
			res.payload.map(curValue => {
				let isCompleted = parseInt(curValue.isCompleted) === 1 ? true : false;
				addTodo(curValue.id, curValue.task, curValue.status, isCompleted);
			});
		});

		// console.log("load TodoList Component - AddTodoInput");
		// console.log("\n");

		return () => resetTodo();
	}, []);

	let getContext = () => {
		return {
			modalUtil: {
				showModal: () => setShowModal(true),
				hiddenModal: () => setShowModal(false),
				fetchLiData: val => setLiData(val)
			},
			deleteTask: id => API.removeATask(id)
		};
	};

	return(
		<div
			className="todolist"
		>
			<WrapModal
				title="Edit & Delete Modal"
				visible={ showModal }
				sourceData={ liData }
				handleModal={ getContext() }
			/>
			<TodoListContext.Provider value={ getContext() }>
				<AddTodoInput />
				<List />
			</TodoListContext.Provider>
		</div>
	);
};

export default connect(
	null,
	{ addTodo, resetTodo }
)(TodoList);
