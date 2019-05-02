import React from "react";
import {
    Icon
} from "antd";
import "antd/dist/antd.css";

import {
    ACCOUNT_LOGINTABCHILDREN_USERNAME_NAME,
    ACCOUNT_LOGINTABCHILDREN_PASSWORD_NAME,
    ACCOUNT_LOGINTABCHILDREN_USERNAME_PLACEHOLDER,
    ACCOUNT_LOGINTABCHILDREN_USERNAME_MESSAGE,
    ACCOUNT_LOGINTABCHILDREN_PASSWORD_PLACEHOLDER,
    ACCOUNT_LOGINTABCHILDREN_PASSWORD_MESSAGE
} from "@/constants/login";

import "./style.scss";

export default {
    Username: {
        name: `${ACCOUNT_LOGINTABCHILDREN_USERNAME_NAME}`,
        props: {
            size: "large",
            prefix: <Icon type="user" className="prefixIcon" />,
            placeholder: `${ACCOUNT_LOGINTABCHILDREN_USERNAME_PLACEHOLDER}`
        },
        options: {
            rules: [
                {
                    required: true,
                    message: `${ACCOUNT_LOGINTABCHILDREN_USERNAME_MESSAGE}`
                }
            ]
        }
    },

    Password: {
        name: `${ACCOUNT_LOGINTABCHILDREN_PASSWORD_NAME}`,
        props: {
            size: "large",
            prefix: <Icon type="lock" className="prefixIcon" />,
            placeholder: `${ACCOUNT_LOGINTABCHILDREN_PASSWORD_PLACEHOLDER}`
        },
        options: {
            rules: [
                {
                    required: true,
                    message: `${ACCOUNT_LOGINTABCHILDREN_PASSWORD_MESSAGE}`
                }
            ]
        }
    }
};
