import React from "react";
import { connect } from "react-redux";

import {
	Input,
	Button
} from "antd";
import "antd/dist/antd.css";

import { addTodo } from "./../../actions/index.jsx";
import { ADD_BUTTON } from "./../../constants/todolist.jsx";

import "./style.scss";

class AddTodoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
    this.updateInput = this.updateInput.bind(this);
    this.handleAddTodo = this.handleAddTodo.bind(this);
  }

  updateInput(input) {
    this.setState({ input });
  }

  handleAddTodo() {
    this.props.addTodo(this.state.input);
    this.setState({ input: "" });
  }

  render() {
    return (
      <div
        className="addTodo-div"
      >
        <Input
          style={{width: "500px",margin: "0.5rem 0.5rem"}}
          onChange={e => this.updateInput(e.target.value)}
          value={this.state.input}
        />
        <Button 
          type="primary"
          className="add-todo" 
          onClick={this.handleAddTodo}
        >
          Add Todo
        </Button>
      </div>
    );
  }
}



export default connect(
	null,
	{ addTodo }
)(AddTodoComponent);

