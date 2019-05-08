import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import {
	Input,
	Select,
	Row,
	Col,
	Button
} from "antd";
const InputGroup = Input.Group;
import "antd/dist/antd.css";
import { addTodo } from "./../../actions/index.jsx";
import {
	ADD_BUTTON,
	ADD_TODO
} from "./../../constants/todolist.jsx";
import "./style.scss";
import API from "@/utils/api.js";
import optionArr from "./priority";

// let optionArr = [
// 	{
// 		key: 1,
// 		priority: 1,
// 		value: "Urgent"
// 	},
// 	{
// 		key: 2,
// 		priority: 2,
// 		value: "Urgent but Not Important"
// 	},
// 	{
// 		key: 3,
// 		priority: 3,
// 		value: "Important"
// 	},
// 	{
// 		key: 4,
// 		priority: 4,
// 		value: "Not Urgent And Not Important"
// 	}
// ];

let AddTodoComponent = ({ addTodo }) => {

	let [inputValue, setValue] = useState("");
	//Todo Item的优先级
	let [priority, setPriority] = useState(1);

	//增加todo监听事件
	let handleAddTodo = () => {
		addTodo(inputValue);
		let params = {
			"status": priority,
			"task": inputValue
		};
		let response = API.createNewTodoItem(JSON.stringify(params));
		response.then(res => {
			setValue("");
		});
	};

	return(
		<div className="addTodo-div">
			{ /*
				<Input
					value={ value }
					onChange={ e => setValue(e.target.value) }
					style={{ width: "500px", margin: "0.5rem 0.5rem" }}
				/>
			*/ }

			<Row
				style={{ padding: "1rem" }}
			>
				<Col
					span={20}
				>
					{
						<InputGroup compact>
							<Select
								defaultValue={`${optionArr[0].value}`}
								style={{ width: 240 }}
								dropdownStyle={{ textAlign: "center" }}
								onChange={ val => setPriority(val) }
							>
								{
									optionArr.map(curValue => {
										return <Option
											key={curValue.key}
										>{ curValue.value }</Option>;
									})
								}
							</Select>
							<Input
								style={{ width: '60%' }}
								onChange={ e => setValue(e.target.value) }
								value={inputValue}
							/>
						</InputGroup>
					}
				</Col>
				<Col
					span={4}
				>
					{
						<Button
							type="primary"
							className="add-todo"
							onClick={() => handleAddTodo()}
						>
							{ ADD_TODO }
						</Button>
					}
				</Col>
			</Row>

		</div>
	);
};

// class AddTodoComponent extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = { input: "" };
// 		this.updateInput = this.updateInput.bind(this);
// 		this.handleAddTodo = this.handleAddTodo.bind(this);
// 	}
//
//   updateInput(input) {
//     this.setState({ input });
//   }
//
//   handleAddTodo() {
//     this.props.addTodo(this.state.input);
//     this.setState({ input: "" });
//   }
//
//   render() {
//     return (
//       <div
//         className="addTodo-div"
//       >
//         <Input
//           style={{width: "500px",margin: "0.5rem 0.5rem"}}
//           onChange={e => this.updateInput(e.target.value)}
//           value={this.state.input}
//         />
//         <Button
//           type="primary"
//           className="add-todo"
//           onClick={this.handleAddTodo}
//         >
//           Add Todo
//         </Button>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
// 	console.log("state");
// 	console.log(state);
// 	console.log("\n");
// 	return state;
// };

export default connect(
	null,
	{ addTodo }
)(AddTodoComponent);
