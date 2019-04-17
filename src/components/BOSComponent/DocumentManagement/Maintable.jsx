import React,{ useEffect, useState } from "react";

import {
	Table,
	Icon,
	Spin
} from "antd";
import "antd/dist/antd.css";

import Cookies from "js-cookie";

import {
	TABLE_NAME,
	TABLE_CODE,
	TABLE_VERSION,
	TABLE_CLASS,
	TABLE_DISC,
	TABLE_FUNCTION
} from "./../../../constants/common.js";

import API from "./../../../utils/api.js";
import "./../style.scss";

const MainDocManagementTable = () => {
	let resData = [];

	//获取登录后存储的Cookies值
	let userInfo = JSON.parse(Cookies.get("userInfo"));

	//存储bos主表格的数据
	let tbodyData;
	let [mainData, setMainData] = useState(null);
	//是否出现加载效果
	let [showSpin, setShowSpin] = useState(true);


	//页面加载后的actions
	useEffect(() => {
		let params = {
			"entity": "both",
			"page": "1",
			"per_page": "10",
			"sortby": "gtime",
			"order": "asc"
		};

		//bos主界面申请文件夹和文档数据
		let res = API.fetchFoldersDocuments(JSON.stringify(params), userInfo.access_token);
		res.then(res => {
			resData = res.data.data;
		}).then(() => {
			tbodyData = resData.map((curValue, index) => {
				return curValue.parameter;
			});
		}).then( () => {
			setMainData(tbodyData);
		});
	}, []);

	//主页面中点击文件触发的事件，申请该文件下的文件和文档
	let fetchSubFolder = key => {
		let params = {
			"key": key,
			"entity": "both",
			"page": "1",
			"per_page": "10",
			"sortby": "gtime",
			"order": "asc"
		};


		let response = API.fetchFoldersDocuments(JSON.stringify(params), userInfo.access_token);
		response.then(res => {
			resData = res.data.data;
		}).then(() => {
			setMainData(resData);

		});
	};



	const tableHead = [{
		title: TABLE_NAME,
		dataIndex: "name",
		render: (curValue, curRow) => <span
				onClick={ () => fetchSubFolder(curRow.key) }
				style={{ cursor: "pointer",padding: "0.5rem" }}
			>
			<Icon type="folder" />
			{ " " }
			{ curValue }
		</span>

	},{
		title: TABLE_CODE,
		dataIndex: "code"
	},{
		title: TABLE_VERSION,
		dataIndex: "version"
	},{
		title: TABLE_CLASS,
		dataIndex: "class_"
	},{
		title: TABLE_DISC,
		dataIndex: "description"
	},{
		title: TABLE_FUNCTION,
		dataIndex: "func"
	}];

	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(`selectedRowKeys: ${selectedRowKeys}`, `selectedRows: `, selectedRows);
		}
	};

	return(
		<div
			className="mainarea"
		>
			{
				(mainData === null) && <Spin
					tip="Loading..."
					style={{ width: "5rem" }}
				/>
			}

			{/* 主页面主表格 */}
			{
				(mainData !== null) && <Table
					style={{
						width: "100%"
					}}
					rowSelection={rowSelection}
					columns={ tableHead }
					dataSource={ mainData }
					pagination={{ pageSize: 10 }}
				/>
			}
		</div>
	);
};


export default MainDocManagementTable;
