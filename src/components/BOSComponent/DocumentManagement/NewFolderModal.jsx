import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import {
    Modal,
    Input,
    Form
} from "antd";

import {
    ADD_NEW_FOLDER_MODAL,
    TABLE_DISC,
    ADD_NEW_FOLDER_MODAL_NAME
} from "./../../../constants/common.js";

import {
    addNewFolderModal
} from "./../../../actions/index.jsx";

import API from "./../../../utils/api.js";

const NewFolderModal = ({ handleNewFolderModal, addNewFolderModal, form }) => {

    let { getFieldDecorator } = form;

    let [dirName, setDirName] = useState("");
    let [discription, setDiscription] = useState("");

    let formItemLayout = {
        labelCol: {
            span: 4,
            offset: 2
        },
        wrapperCol: {
            span: 14,
            offset: 1
        }
    };

    useEffect(() => {
        // console.log("handleNewFolderModal");
        // console.log(handleNewFolderModal);
    }, []);

    //控制
    let handleCreateDirectory = () => {
        let params = [
            {
            	"bosclass": "folders",
            	"code": new Date().getTime(),
            	"description": discription,
            	"isRoot": true,
            	"parent": "",
            	"name": dirName
            }
        ];

        params = JSON.stringify(params);

        let response = API.createRootDirectory(params);
        console.log(response);
        console.log(response);

        response.then(() => {
            //Modal消失
            addNewFolderModal(false)
        });


    };

    return(
        <React.Fragment>
            <Modal
                visible={ handleNewFolderModal.isVisible }
                title={ ADD_NEW_FOLDER_MODAL }
                onOk={ () => { handleCreateDirectory() } }
                onCancel={ () => { addNewFolderModal(false) } }
            >
                <Form>
                    {/* 名称输入框 */}
                    {
                        <Form.Item
                            { ...formItemLayout }
                            label={ ADD_NEW_FOLDER_MODAL_NAME }
                        >
                            {
                                getFieldDecorator("newFolderName", {
                                    rules: [{
                                        required: true,
                                        message: "Please input your Folder Name!"
                                    }]
                                })(
                                    <Input
                                        onChange={ e => setDirName(e.target.value) }
                                    />
                                )
                            }
                        </Form.Item>
                    }

                    {/* 描述输入框 */}
                    {
                        <Form.Item
                            { ...formItemLayout }
                            label={ TABLE_DISC }
                        >
                            {
                                getFieldDecorator("disc", {
                                    rules: [{
                                        required: false,
                                        message: "Please input your Folder Name!"
                                    }]
                                })(
                                    <Input 
                                        onChange={ e => setDiscription(e.target.value) }
                                    />
                                )
                            }
                        </Form.Item>
                    }
                </Form>
            </Modal>
        </React.Fragment>

    );
};

const WrapperNewFolderModal = Form.create({
    name: "New Folder Modal"
})(NewFolderModal);

const mapStateToProps = state => {
    let { handleNewFolderModal } = state;
    return {
        handleNewFolderModal
    };
};

export default connect(
    mapStateToProps,
    {
        addNewFolderModal
    }
)(WrapperNewFolderModal);
