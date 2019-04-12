import React, { useState } from "react";
import { connect } from "react-redux";

import {
	handleSelectedFiles
} from "./../../../actions/index.jsx";

import {
	Modal,
	Table,
	Row,
	Upload,
	Button,
	message,
	Checkbox,
	Progress,
	Select,
	Tooltip,
	Input,
	Icon,
	Col
} from "antd";
import "antd/dist/antd.css";

const Option = Select.Option;

import "./../style.scss";

import {
	CLICK_TO_UPLOAD,
	IS_PARSER_MODEL,
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


const ImportDocModal = ({ isShowModal, setShowModal, handleSelectedFiles, dataSource, count }) => {
	
	//是否解析模型
	let [isParserModel, setIsParserModel] = useState(false);
	
	//是否优先解析
	let [isPriorityParser, setIsPriorityParser] = useState(false);
	let [handleCheckedVal, setHandleCheckedVal] = useState("ifc");

	let supportedFileTyped = ["ifc","imodel","revit","obj"];

	let tableHead = [{
		title: TABLE_NAME,
		align: "center",
		dataIndex: "name",
		width: "15%",
		className: "cursorDefault",
		render: (val, file, index) => {
			return <Input 
						className="regulateInputBorder"
						value={val}
					/>;
		}
	},{
		title: TABLE_FILE_CODE,
		align: "center",
		dataIndex: "code",
		width: "10%",
		className: "cursorDefault",
		render: (val, file, index) => {
			return <Input 
						className="regulateInputBorder"
						value={val}
					/>;
		}
	},{
		title: TABLE_CLASS,
		align: "center",
		dataIndex: "class_",
		width: "8%",
		className: "cursorDefault",
		render: (val, file, index) => {
			return <Input 
						className="regulateInputBorder"
						value={val}
					/>;
		}
	},{
		title: <Tooltip title="仅可使用英文格式字符或特殊符号，不可包含：`~#^&|{}\\[\\]<>/?~·！#￥……&（）——|‘；：”“’。，、？{}【】以及回车换行、Tab缩进">
				{ TABLE_VERSION }<Icon style={{ marginLeft: '0.25em' }} type="exclamation-circle-o" /></Tooltip>,
		align: "center",
		dataIndex: "version",
		width: "12%",
		className: "cursorPointer",
		render: (val, file, index) => {
			return <Input 
						className="regulateInputBorder"
						value={val}
					/>;
		}
	},{
		title: TABLE_DISC,
		align: "center",
		dataIndex: "disc",
		className: "cursorDefault",
		render: (val, file, index) => {
			return <Input 
						className="regulateInputBorder"
						value={val}
					/>;
		}
	},{
		title: TABLE_PARSER_MODEL,
		align: "center",
		dataIndex: "parserModel",
		className: "cursorDefault",
		render: (val, file, index) => {
			return <Checkbox
						checked={isParserModel}
						onChange={ () => {
							let isTrue = !isParserModel;
							console.log("isTrue: " + isTrue);
							setIsParserModel(isTrue)
						} }
					>
				{ IS_PARSER_MODEL }
			</Checkbox>
		}
	},{
		title: TABLE_FILE_TYPE,
		align: "center",
		dataIndex: "docClass",
		className: "cursorDefault",
		render: (val, file, index) => {
			return <Select
						style={{ width: "100px" }}
						defaultValue={ file.docClass }
						onChange={ val => {
							dataSource[index].docClass = val;
							console.log("dataSource: ");
							console.log(dataSource);
						} }
					>
						{
							supportedFileTyped.map( (curVal, index) => <Option
											key={curVal}
											value={curVal}
											style={{ width: "100px" }}
										>{ curVal }</Option>)
						}
					</Select>;
		}
	},{
		title: TABLE_PRIORITY,
		align: "center",
		dataIndex: "priority",
		className: "cursorDefault",
		render: (val, file, index) => {
			return <Checkbox
						checked={isPriorityParser}
						onChange={ () => {
							let isTrue = !isPriorityParser;
							console.log("isTrue: " + isTrue);
							setIsPriorityParser(isTrue)
						} }
					>
				{ IS_PARSER_MODEL }
			</Checkbox>
		}
	},{
		title: TABLE_PROGRESS,
		align: "center",
		dataIndex: "progress",
		className: "cursorDefault",
		render: (val, file, index) => {
			return <Progress 
						type="circle"
						width="40px"
					/>
		}
	}];

	let handleSeletedFile = e => {
		console.log("\n");
		console.log("e.file");
		console.log(e.file);
		console.log("e");
		console.log(e);
		console.log("\n");

		let selectedFile = e.file;
		let fileList = e.fileList;

		//提醒用户文件是否超过限定大小
		if(selectedFile.size > 1073741824) {
			message.warning(`${selectedFile.name}大小超过1G!`);
		}

		//检测用户先前是否已经选择了相同文件
		let isSameFile = false;

		for(let i = 0; i < fileList.length; i++) {

			for(let j = 0; j < fileList.length-1; j++) {
				if(fileList[j].name === selectedFile.name) {
					isSameFile = true;
					break;
				}
			}

			if(isSameFile) {
				message.warning(`您先前已经选择了<${selectedFile.name}>哦！`);
				break;
			} 
		}


		if(!isSameFile) {
			let postFiledata = {
				file: selectedFile,
				name: selectedFile.name,
				uid : 'uploadFile-' + new Date().getTime() +'-'+ count,	
				version: 0,
				code:'',
				disc:'',
				class_:'',
				parserModel:false,
				docClass:'ifc',
				priority:false
			};

			dataSource = [...dataSource, postFiledata];
			count += 1;
		}


		handleSelectedFiles(dataSource, count);
	};

	let customRequestFn = () => {
		//override default request
	};


	// let isTrue = showModal ? true : false;
	// visible={isShowModal.showModal}

	return(
		<React.Fragment>
			<Modal
				visible={isShowModal.showModal}
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
							<Upload
								showUploadList={false}
								customRequest={ () => customRequestFn() }
								onChange={ e => handleSeletedFile(e) }
							
							>
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
								dataSource={dataSource} 
								bordered
								rowKey={ record => record.uid }
								pagination={{ pageSize: 3 }}
							/>
						</Col>
					}
				</Row>
			</Modal>
		</React.Fragment>
	);
};

const mapStateToProps = state => {
	let { dataSource, count } = state.handleSelectedFiles;
	return {
		dataSource,
		count
	};
};

export default connect(mapStateToProps,
	{ handleSelectedFiles }
)(ImportDocModal);


