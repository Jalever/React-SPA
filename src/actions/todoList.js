import {
    ADD_TODO,
    RESET_TODO,
    REMOVE_TODO
} from "./actionTypes.jsx";

let nextId = 0;

export const addTodo = (id, content, priority, isCompleted = false) => ({
    type: ADD_TODO,
    payload: {
        id,
        content,
        priority,
        isCompleted
    }
});

export const removeTodo = id => ({
    type: REMOVE_TODO,
    payload: {
        id
    }
});

export const resetTodo = () => ({
    type: RESET_TODO,
    payload: {

    }
});

export const toggleTodo = id => ({
    type: ADD_TODO,
    payload: {
        id
    }
});
