import React, { useState, useEffect } from "react";

import { Tabs } from "antd";
const { TabPane } = Tabs;

import LoginContext from "./loginContext";

let generateID = (() => {
    let i = 0;
    return (prefix = "") => {
        i += 1;
        return `${prefix}${i}`;
    };
})();

let LoginTab = props => {
    let [uniqueId, setUniqueId] = useState(generateID("login-tab-"));

    let {
        tabUtil
    } = props;

    useEffect(() => {
        tabUtil.addTab(uniqueId);
    }, []);

    return(
        <React.Fragment>
            {
                <TabPane {...props}>
                    { props.children }
                </TabPane>
            }
        </React.Fragment>
    );
};

let wrapLoginTab = props => (
    <LoginContext.Consumer>
        {
            value => (<LoginTab
                tabUtil={ value.tabUtil }
                { ...props }
            />)
        }
    </LoginContext.Consumer>
);

wrapLoginTab.typeName = "LoginTab";

export default wrapLoginTab;
