import React,{ useState, useEffect } from "react";

import {
	Input,
	Select,
	Row,
	Col,
	Button
} from "antd";
const InputGroup = Input.Group;
import "antd/dist/antd.css";

import {
	ADD_BUTTON,
	ADD_TODO
} from "@/constants/todolist.jsx";
import {
	addTodo
} from "@/actions/todoList";
import { connect } from "react-redux";
import "./style.scss";
import API from "@/utils/api.js";
import optionArr from "./priorityArr";

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

const AddTodoInput = props => {
	let {
		addTodo,//action - addTodo
	} = props;

	let [inputValue, setValue] = useState("");
	//Todo Item的优先级
	let [priority, setPriority] = useState(`${optionArr[0].value}`);

	//增加todo监听事件
	let handleAddTodo = () => {
		// addTodo(inputValue);
		let params = {
			"status": priority,
			"task": inputValue
		};
		let response = API.createNewTodoItem(JSON.stringify(params));
		response.then(res => {
			let id = res.payload.id;
			addTodo(id, inputValue, priority, false);

			console.log("res");
			console.log(res);
			console.log("\n");
		}).then(() => {

			setValue("");
		});
	};

	useEffect(() => {
		console.log("props - AddTodoInput");
		console.log(props);
		console.log("\n");

	}, []);

    return(
        <div className="addTodo-div">

            <Row
                style={{ padding: "1rem" }}
            >
                <Col
                    span={21}
                >
                    {
                        <InputGroup compact>
                            <Select
                                defaultValue={`${optionArr[0].value}`}
                                style={{ width: 240 }}
                                dropdownStyle={{ textAlign: "center" }}
                                onChange={ val => setPriority(optionArr[`${val-1}`].value) }
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
                                style={{ width: '73%'}}
                                onChange={ e => setValue(e.target.value) }
                                value={inputValue}
                            />
                        </InputGroup>
                    }
                </Col>
                <Col
                    span={3}
                >
                    {
                        <Button
                            type="primary"
                            className="add-todo"
							style={{ marginLeft:"2rem" }}
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


export default connect(
	null,
	{ addTodo }
)(AddTodoInput);
