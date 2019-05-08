import React, { useState,useEffect } from "react";

import {
    Modal
} from "antd";

import ModalItem from "./ModalItem";
let {
    Id,
    Priority,
    Content,
    IsCompleted
} = ModalItem;

let WrapModal = props => {


    let {
        sourceData,
        handleModal
    } = props;

    let handleOk = () => {};
    let handleCancel = () => {};

    useEffect(() => {

    	console.log("props");
    	console.log(props);
    	console.log("\n");
    }, []);

    return(
        <Modal
            title={ props.title }
            visible={ props.visible }
            onOk={ () => handleModal.modalUtil.hiddenModal() }
            onCancel={ () => handleModal.modalUtil.hiddenModal() }
        >
            {
                <Id
                    value={ sourceData.id }
                />
            }

            {
                <Priority
                    value={sourceData.priority}
                />
            }

            {
                <Content
                    value={sourceData.content}
                />
            }

            {
                <IsCompleted
                    value={sourceData.isCompleted}
                />
            }
        </Modal>
    );
};

export default WrapModal;
