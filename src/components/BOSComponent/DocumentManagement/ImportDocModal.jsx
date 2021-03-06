import React, { useState } from "react";
import { connect } from "react-redux";

import axios from "axios";
import API from "./../../../utils/api.js";

import {
	handleSelectedFiles
} from "./../../../actions/index.jsx";

import Cookies from "js-cookie";

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
	BUTTON_DELETE,
	APP_KEY,
	SUCCESS,
	UPLOAD_FILE,
	BAD_PARAMETER,
	UNKNOWN_ERROR,
	BAD_FILE_TYPE,
	MANAGEMENT_DOC_CLASS
} from "./../../../constants/common.js";


const ImportDocModal = ({ isShowModal, setShowModal, handleSelectedFiles, dataSource, count }) => {

	//是否解析模型
	let [isParserModel, setIsParserModel] = useState(false);

	//是否优先解析
	let [isPriorityParser, setIsPriorityParser] = useState(false);

	//上传文件下拉框选择
	let [handleCheckedVal, setHandleCheckedVal] = useState("ifc");

	//进度值
	let [progress, setProgress] = useState(0);

	// 上传文件支持的类型
	let supportedFileTyped = ["ifc","imodel","revit","obj"];

	//上传文件中的“删除”功能
	let handleDeleteItem = index => {
		// console.log("index");
		// console.log(index);
		// console.log("dataSource");
		// console.log(dataSource);
		// console.log("count");
		// console.log(count);

		let data = [];
		for(let i = 0; i < dataSource.length; i++) {
			if(index !== i) {
				data.push(dataSource[i]);
			}
		}

		handleSelectedFiles(data, count);

		// console.log("after");
		// console.log(data);
	};

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
		width: "6%",
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
							// console.log("isTrue: " + isTrue);
							// console.log("dataSource");
							// console.log(dataSource);
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
						disabled={ !isParserModel }
						onChange={ val => {
							dataSource[index].docClass = val;
							// console.log("dataSource: ");
							// console.log(dataSource);
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
						disabled={ !isParserModel }
						onChange={ () => {
							let isTrue = !isPriorityParser;
							// console.log("isTrue: " + isTrue);
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
						width={40}
						percent={progress}
					/>
		}
	},{
		title: "",
		align: "center",
		dataIndex: "delete",
		className: "cursorDefault",
		render: (val, file, index) => {
			return <Button
				style={{ border: "none",color: "#ff0000" }}
				onClick={ () => handleDeleteItem(index) }
				disabled={progress === 100 ? true : false}
			>{ BUTTON_DELETE }</Button>;
		}
	}];

	//监控被选中上传文件的事件
	let handleSeletedFile = e => {
		// console.log("e.file");
		// console.log(e.file);
		// console.log("e");
		// console.log(e);
		// console.log("\n");
		// console.log("\n");

		let userInfoParse = JSON.parse(Cookies.get("userInfo"));
		// console.log("JSON.parse Cookies");
		// console.log(userInfoParse);

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

		//传新添加的文件信息给store
		handleSelectedFiles(dataSource, count);
	};

	//override Modal默认的actions
	let customRequestFn = () => {
		//override default request
	};

	//点击`上传文件`按钮事件
	let handleUpload = () => {

		// console.log("dataSource - handleUpload");
		// console.log(dataSource);

		//如果上传列表为空，则不执行Axios
		if(dataSource !== []) {
					let gpriority = dataSource[0].priority ? 1 : 0;

					let userInfo = JSON.parse(Cookies.get("userInfo")),
							gmodelDB = userInfo.modelDb[0];

						// console.log("gpriority");
						// console.log(gpriority);
						// console.log("gmodelDB");
						// console.log(gmodelDB);
						// console.log("dataSource[0].docClass");
						// console.log(dataSource[0].docClass);
						// console.log("dataSource[0].file.originFileObj");
						// console.log(dataSource[0].file.originFileObj);
						// console.log("userInfo.access_token");
						// console.log(userInfo.access_token);


					//创建上传文件的格式
					let formData = new FormData();
					formData.set("gmodelType", dataSource[0].docClass);
					formData.set("gpriority", gpriority);
					formData.set("gmodelDB", gmodelDB);
					formData.set("file", dataSource[0].file.originFileObj);

					//可行方法一： fetch上传，因为获取不到上传进度，姑且放弃
					// let resData = API.postFile(APP_KEY, formData, userInfo.access_token);
					// resData.then(res => {
					// 	console.log("post file response: ");
					// 	console.log(res);
					// });

					//可行方法二：
					axios.post("http://bosapi-demo.rickricks.com/bosdocumentservice/l77318a9442c41b8a167903441d8f884/files", formData, {
						headers: {
							'Authorization': userInfo.access_token
						},
						onUploadProgress: function(progressEvent) {
							let percent = Math.round(progressEvent.loaded * 100 / progressEvent.total);

							(function(per) {
							console.log("per");
							console.log(per);
								setProgress(per);
							})(percent);
						}
					}).then(res => {

						console.log("res - axios: ");
						console.log(res);

						console.log("dataSource");
						console.log(dataSource);

						switch(res.data.code) {
							case BAD_PARAMETER: {
								return message.error(BAD_FILE_TYPE);
							}

							case SUCCESS: {

								//清除上传文件列表
								handleSelectedFiles([], count);

								return message.success(SUCCESS);
							}

							default:
								return message.error(UNKNOWN_ERROR);
						}
					}).then(() => {
						console.log("dataSource - after upload file");
						console.log(dataSource);

						//上传文件之后，关闭Modal
						setShowModal(false);
						setProgress(0);
					}).catch( err => {
						//出错之后，百分比清零，如access_token过期之后，发送不了AJAX，Fetch，Axios
						setProgress(0);

						message.error(err.message);
						console.log("err");
						console.log(err);

						let userInfoParse = JSON.parse(Cookies.get("userInfo"));
						console.log("userInfoParse");
						console.log(userInfoParse);
					});
		}

	};


	// let isTrue = showModal ? true : false;
	// visible={isShowModal.showModal}

	return(
		<React.Fragment>
			<Modal
				visible={isShowModal.showModal}
				width="95vw"
				onOk={ () => handleUpload() }
				okText={ UPLOAD_FILE }
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

					{/* 上传文件的表格 */}
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
