import React, { useState } from "react";

import {
    Tabs,
    Form,
    Input,
    Icon
} from "antd";
const { TabPane } = Tabs;

import LoginContext from "./loginContext";
import {
    USERNAME,
    PASSWORD
} from "@/constants/login";

import LoginTab from "./LoginTab";
import LoginSubmit from "./LoginSubmit";

let Login = props => {

    //登录页面tabs数组
    let [tabsArr, setTabsArr] = useState([]);
    //登录页面非tabs数组
    let [nonTabsArr, setNonTabsArr] = useState([]);

    let {
        getFieldDecorator
    } = props.form;

    console.log("props   --- components/LoginComponent/Login");
    console.log(props);
    console.log(`\n`);

    //submit事件，调用父组件handleSubmit
    let handleSubmit = e => {
        e.preventDefault();

        let {
            form,
            onSubmit
        } = props;

        form.validateField(null, { force: true }, (err, values) => {
            onSubmit(err, values);
        });
    };

    //给子组件传context
    let getContext = () => {
        let { form } = props;

        console.log("props - Login.js");
        console.log(props);
        console.log("\n");

        return {
            //操作（添加，删除）tab方法
            tabUtil: {
                addTab: id => {
                    setTabsArr([...tabsArr, id]);
                },
                removeTab: id => {
                    tabsArr.filter( currentId => currentId !== id );
                }
            },
            //传送form方法
            form
        };

    };

    React.Children.forEach(props.children, item => {
        if(!item) return;

        console.log("item   --- components/LoginComponent/Login");
        console.log(item);
        console.log(`\n`);

        if (item.type.typeName === 'LoginTab') {
            //children为标签tab
            tabsArr.push(item);
        } else {
            //children不是标签tab
            nonTabsArr.push(item);
        }
    });

    return(
        <LoginContext.Provider value={getContext()}>
            {
                <Form
                    onSubmit={ () => handleSubmit() }
                >
                    {
                        tabsArr.length ? (
                            <React.Fragment>
                                {
                                    <Tabs>
                                        { tabsArr }
                                    </Tabs>
                                }

                                { nonTabsArr }
                            </React.Fragment>
                        ) : (
                            <Form.Item>
                                {
                                    getFieldDecorator("userName", {
                                        rules: [{
                                            required: true,
                                            message: `Please input your username!`
                                        }]
                                    })(<Input
                                        prefix={<Icon type="user" style={{ color: "rgba(0, 0, 0, 0.25)" }}/>}
                                        placeholder={USERNAME}
                                    />)
                                }
                            </Form.Item>
                        )
                    }
                </Form>
            }
        </LoginContext.Provider>
    );
};



Login.Tab = LoginTab;
Login.Submit = LoginSubmit;
export default Form.create()(Login);
