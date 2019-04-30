import React, { useState, useEffect } from "react";

import { Tabs } from "antd";
const { TabPane } = Tabs;

import LoginContext from "./loginContext";

// let generateID = (() => {
//     let i = 0;
//     return (prefix = "") => {
//         return `${prefix}${i}`;
//     };
// })();

let LoginTab = props => {

    console.log("props - LoginTab - LoginContextConsumer --- LoginTab");
    console.log(props);
    console.log(`\n`);

    // //unique ID
    // let [uniqueID, setUniqueID] = useState(() => {
    //     return
    // });

    // useEffect(() => {
    //     const {
    //         tabUtil
    //     } = props;
    //
    //     tabUtil.addTab(uniqueID);
    // }, []);

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
