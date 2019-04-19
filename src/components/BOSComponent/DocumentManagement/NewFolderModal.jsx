import React, { useEffect } from "react";
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

const NewFolderModal = ({ handleNewFolderModal, addNewFolderModal, form }) => {

    let { getFieldDecorator } = form;

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
        console.log("handleNewFolderModal");
        console.log(handleNewFolderModal);
    }, []);

    return(
        <React.Fragment>
            <Modal
                visible={ handleNewFolderModal.isVisible }
                title={ ADD_NEW_FOLDER_MODAL }
                onOk={ () => { addNewFolderModal(false) } }
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
                                    <Input />
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
                                    <Input />
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
