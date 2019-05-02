import React, { useState } from "react";
import LoginContext from "./loginContext";
import LoginTabChildren from "./LoginTabChildren";

import {
    Icon,
    Form,
    Input
} from "antd";
import "antd/dist/antd.css";
const FormItem = Form.Item;

import "./style.scss";

let WrapLoginItem = props => {
    console.log("props --- LoginItem");
    console.log(props);
    console.log("\n");

    let {
        getFieldDecorator
    } = props.form;

    return(
        <React.Fragment>
            <FormItem>
                {
                    getFieldDecorator(props.name, props.options)(
                        <Input
                            { ...props.defaultProps }
                        />
                    )
                }
            </FormItem>
        </React.Fragment>
    );
};

let LoginItem = {};
Object.keys(LoginTabChildren).forEach(curValue => {
    let item = LoginTabChildren[curValue];

    //因为export LoginItem，所以在index.jsx中用<Username />,<Password />等组件时设置属性，可通过props获值
    LoginItem[curValue] = () => {

        return <LoginContext.Consumer>
            {
                //value 值为：Login.js 中的getContext()中的属性，例如tabUtil, form...
                value => {
                    return <WrapLoginItem
                        defaultProps={ item.props }
                        options={ item.options }
                        name={`${item.name}`}
                        type={ curValue }
                        form={ value.form }
                    />;
                }
            }
        </LoginContext.Consumer>;
    };
});




export default LoginItem;
