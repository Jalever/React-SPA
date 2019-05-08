import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./style.scss";
import {
    Icon,
    Input,
    Button
} from "antd";
import "antd/dist/antd.css";
import cx from "classnames";
import {
    EDIT_BUTTON,
    DELETE_BUTTON
} from "@/constants/todolist.jsx";
import TodoListContext from "./todolistContext";
import {
    removeTodo
} from "@/actions/todoList";

const TodoItem = props => {
    let {
        toggleTodo,
        removeTodo,
        itemData
    } = props;

    // let [showModal, setShowModal] = useState(false);

    // let handleVisibleModal = () => {
        // setShowModal(true);
    // };

    let handleEdit = (value, data) => {
        value.modalUtil.showModal();
        value.modalUtil.fetchLiData(data);
    };

    let handleDelete = (value, id) => {
        removeTodo(id);
        value.deleteTask(itemData.id);
    };

    return(
        <TodoListContext.Consumer>
            {
                value => <li
                    className={cx("customLi",
                    {
                        "li-imcompleted": itemData.isCompleted
                    })}
                >

                    { itemData && (itemData.isCompleted) ?
                        (<Icon type="check" />) : (<Icon type="dash" />) }

                    { " " }

                    {
                        <span
                            style={{
                                border:"1px solid #000",
                                paddingLeft: "1rem",
                                paddingRight: "1rem"
                            }}
                        >
                            { itemData.id }
                        </span>
                    }

                    {
                        <span
                            style={{
                                border:"1px solid #ff0000",
                                paddingLeft: "1rem",
                                paddingRight: "1rem"
                        }}
                        >
                            { itemData.priority }
                        </span>
                    }

                    { " " }

                    {
                        <Input
                            className="item-content"
                            value={ itemData.content }
                            disabled={itemData.isCompleted}
                        />
                    }

                    { " " }

                    {/* Edit Button */}
                    {
                        <Button
                            disabled={itemData.isCompleted}
                            onClick={ () => handleEdit(value, itemData) }
                        >{ EDIT_BUTTON }</Button>
                    }

                    { " " }

                    {/* Delete Button */}
                    {
                        <Button
                            type="danger"
                            onClick={ () => handleDelete(value, itemData.id) }
                        >{ DELETE_BUTTON }</Button>
                    }
                </li>
            }
        </TodoListContext.Consumer>
    );
};

export default connect(
    null,
    { removeTodo }
)(TodoItem);
