import React, { useState } from "react";

import {
	Modal,
	Table,
	Row,
	Upload,
	Button,
	Tooltip,
	Icon,
	Col
} from "antd";
import "antd/dist/antd.css";

import "./../style.scss";

import {
	CLICK_TO_UPLOAD,
	TABLE_NAME,
	TABLE_CODE,
	TABLE_VERSION,
	TABLE_CLASS,
	TABLE_DISC,
	TABLE_FILE_TYPE,
	TABLE_PRIORITY,
	TABLE_PARSER_MODEL,
	TABLE_PROGRESS,
	TABLE_FILE_CODE,
	MANAGEMENT_DOC_CLASS
} from "./../../../constants/common.js";


const ImportDocModal = ({ isShowModal, setShowModal }) => {
	let tableHead = [{
		title: TABLE_NAME,
		align: "center",
		dataIndex: "name",
		className: "cursorDefault"
	},{
		title: TABLE_FILE_CODE,
		align: "center",
		dataIndex: "code",
		className: "cursorDefault"
	},{
		title: TABLE_CLASS,
		align: "center",
		dataIndex: "class_",
		className: "cursorDefault"
	},{
		title: <Tooltip title="仅可使用英文格式字符或特殊符号，不可包含：`~#^&|{}\\[\\]<>/?~·！#￥……&（）——|‘；：”“’。，、？{}【】以及回车换行、Tab缩进">
				{ TABLE_VERSION }<Icon style={{ marginLeft: '0.25em' }} type="exclamation-circle-o" /></Tooltip>,
		align: "center",
		dataIndex: "version",
		className: "cursorPointer"
	},{
		title: TABLE_DISC,
		align: "center",
		dataIndex: "disc",
		className: "cursorDefault"
	},{
		title: TABLE_PARSER_MODEL,
		align: "center",
		dataIndex: "parserModel",
		className: "cursorDefault"
	},{
		title: TABLE_FILE_TYPE,
		align: "center",
		dataIndex: "docClass",
		className: "cursorDefault"
	},{
		title: TABLE_PRIORITY,
		align: "center",
		dataIndex: "priority",
		className: "cursorDefault"
	},{
		title: TABLE_PROGRESS,
		align: "center",
		dataIndex: "progress",
		className: "cursorDefault"
	}];


	let data = [];
	// let isTrue = showModal ? true : false;

	return(
		<React.Fragment>
			<Modal
				visible={true}
				width="95vw"
				onOk={ () => setShowModal(false) }
				onCancel={ () => setShowModal(false) }
			>
				<Row
					style={{ margin: "2rem" }}
				>
					{
						<Col
							span={24}
						>
							<Upload>
								<Button
									style={{ margin: "2px" }}
								>
									<Icon type="upload" />
									{ CLICK_TO_UPLOAD }
								</Button>
							</Upload>
						</Col>
					}

					{
						<Col
							span={24}
							style={{ 
								marginTop: "0.3rem",
								borderRadius: 0
							}}
						>
							<Table 
								columns={tableHead} 
								dataSource={data} 
								bordered
							/>
						</Col>
					}
				</Row>
			</Modal>
		</React.Fragment>
	);
};

export default ImportDocModal;


