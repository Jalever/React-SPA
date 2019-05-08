import React, { useState, useEffect } from "react";

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
import LoginItem from "./LoginItem";

let Login = props => {

    // console.log("props   --- components/LoginComponent/Login.js");
    // console.log(props);
    // console.log(`\n`);

    //存储context中tabUtil的tabs id集
    let [tabsArr, setTabsArr] = useState([]);

    //登录页面tabs数组
    let [tabsChildrenArr, setTabsChildrenArr] = useState([]);

    //登录页面非tabs数组
    let [nonTabsChildrenArr, setNonTabsChildrenArr] = useState([]);

    //active的tabs中的fieldsnames
    let [activeFields, setActiveFields] = useState({});

    //传参父组件的defaultActiveKey
    let {
        defaultActiveKey,
        handleChangeTab
    } = props;

    let {
        getFieldDecorator
    } = props.form;

    //pseudo-componentDidMount
    useEffect(() => {
            React.Children.forEach(props.children, item => {
                if(!item) return;

                if (item.type.typeName === 'LoginTab') {
                    //children为标签tab
                    tabsChildrenArr.push(item);
                } else {
                    //children不是标签tab
                    nonTabsChildrenArr.push(item);
                }
            });
    }, []);

    //submit事件，调用父组件handleSubmit
    let handleSubmit = e => {
        e.preventDefault();

        // console.log("activeFields --- Login.js");
        // console.log(activeFields);
        // console.log("\n");

        let {
            form,
            onSubmit
        } = props;

        // let val = form.getFieldsValue(activeFields[defaultActiveKey]);

        form.validateFields(activeFields[defaultActiveKey], { force: true }, (err, values) => {
            onSubmit(err, values);
        });
    };

    //给子组件传context
    let getContext = () => {
        let { form } = props;

        return {
            //操作（添加，删除）tab方法
            tabUtil: {
                addTab: id => {
                    setTabsArr([...tabsChildrenArr, id]);
                },
                removeTab: id => {
                    tabsArr.filter( currentId => currentId !== id );
                }
            },

            //传送form方法
            form,

            //tabs变化时包含的fieldnames
            updateActive: name => {
                if(activeFields[defaultActiveKey]) {
                    activeFields[defaultActiveKey].push(name);
                } else {
                    activeFields[defaultActiveKey] = [name];
                }
                // console.log("activeFields");
                // console.log(activeFields);
                // console.log("\n");
            }
        };
    };


    return(
        <LoginContext.Provider value={ getContext() }>
            {
                <Form
                    onSubmit={ e => handleSubmit(e) }
                >
                    {
                        tabsArr.length ? (
                            <React.Fragment>
                                {
                                    <Tabs
                                        animated={ false }
                                        activeKey={ defaultActiveKey }
                                        onChange={ activeKey => handleChangeTab(activeKey) }
                                    >
                                        { tabsChildrenArr }
                                    </Tabs>
                                }

                                { nonTabsChildrenArr }
                            </React.Fragment>
                        ) : (
                            props.children
                        )
                    }
                </Form>
            }
        </LoginContext.Provider>
    );
};



Login.Tab = LoginTab;
Login.Submit = LoginSubmit;
Object.keys(LoginItem).forEach(item => {
    Login[item] = LoginItem[item];
});
export default Form.create()(Login);
