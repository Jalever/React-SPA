import React from "react";
import itemMap from "./itemMap";

import {
    Row,
    Col,
    Input
} from "antd";

let WrapModalItem = props => {
    return(

        <Row>
            <Col span={7}>{ props.title }</Col>
            <Col span={13}>
                <Input
                    value={ props.value }
                />
            </Col>
        </Row>

    );
};


let ModalItem = {};
Object.keys(itemMap).forEach(key => {
    let value = itemMap[key];

    // return <WrapModalItem

    // />;

	// console.log("key");
	// console.log(key);
	// console.log("\n");

    ModalItem[key] = props => {
        return <WrapModalItem
            title={value.title}
            value={ props.value }
        />;
    };
});

export default ModalItem;
