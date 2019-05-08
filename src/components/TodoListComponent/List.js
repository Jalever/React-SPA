import React,{ useState, useEffect } from "react";

import {
    toggleTodo
} from "@/actions/todoList";
import { connect } from "react-redux";
import TodoItem from "./Item";
import "./style.scss";
import getTodoListArr from "@/selector/getTodoListArr";

const TodoList = props => {

    let {
        formattedTodoLit,
        data //parent component - index
    } = props;

    let [todoListArr, setTodoListArr] = useState([]);

    return(
        <ul
            className="customUl"
        >
            {
                formattedTodoLit && formattedTodoLit.length ?
                (
                    formattedTodoLit.map((curValue, index) => <TodoItem
                            key={ curValue.id }
                            itemData={ curValue }
                        />
                    )
                ) : "No Todos, Yay!"
            }
        </ul>
    );
};

const mapStateToProps = state => {
    let formattedTodoLit = getTodoListArr(state);
    return {
        formattedTodoLit
    };
};

export default connect(
    mapStateToProps,
    { toggleTodo }
)(TodoList);
