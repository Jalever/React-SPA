let getTodoList = state => state.todoItem;

let getAllIds = state => getTodoList(state) ? getTodoList(state).allIds : [];

let getATaskObj = (state, id) => getTodoList(state) ? {...getTodoList(state).todoList[id], id: id} : {};

let getTodoListArr = state => getAllIds(state) ? getAllIds(state).map(id => getATaskObj(state, id)) : [];

export default getTodoListArr;
