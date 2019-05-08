import React from "react";

import {
    Form,
    Button
} from "antd";

const FormItem = Form.Item;
import "./style.scss";

let LoginSubmit = props => {

    // console.log("props --- LoginSubmit");
    // console.log(props);
    // console.log("\n");

    return(
        <FormItem>
            <Button
                size="large"
                type="primary"
                htmlType="submit"
                className="submit"
                disabled={false}
            >
                { props.children }
            </Button>
        </FormItem>
    );
};


export default LoginSubmit;
