import React from "react";

import {
    Form,
    Button
} from "antd";

const FormItem = Form.Item;

let LoginSubmit = props => {
    return(
        <FormItem>
            <Button
                size="large"
                type="primary"
                htmlType="submit"
            >
                { props.children }
            </Button>
        </FormItem>
    );
};


export default LoginSubmit;
