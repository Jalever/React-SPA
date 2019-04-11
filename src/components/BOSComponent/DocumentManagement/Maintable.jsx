import React from "react";

import {
	Table
} from "antd";
import "antd/dist/antd.css";

import {
	TABLE_NAME,
	TABLE_CODE,
	TABLE_VERSION,
	TABLE_CLASS,
	TABLE_DISC,
	TABLE_FUNCTION
} from "./../../../constants/common.js";

const MainDocManagementTable = () => {
	const tableHead = [{
		title: TABLE_NAME,
		dataIndex: "name"
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
		dataIndex: "disc"
	},{
		title: TABLE_FUNCTION,
		dataIndex: "func"
	}];

	const data = [{
		key: 1,
		name: "John Brown",
		code: 32,
		version: "New York No.1 Lake Park",
		class_: 32,
		disc: 32,
		func: 32
	},{
		key: 2,
		name: "John Brown",
		code: 2,
		version: "New York No.1 Lake Park",
		class_: 32,
		disc: 32,
		func: 32
	},{
		key: 3,
		name: "John Brown",
		code: 3,
		version: "New York No.1 Lake Park",
		class_: 32,
		disc: 32,
		func: 32
	},{
		key: 4,
		name: "John Brown",
		code: 4,
		version: "New York No.1 Lake Park",
		class_: 32,
		disc: 32,
		func: 32
	},{
		key: 5,
		name: "John Brown",
		code: 5,
		version: "New York No.1 Lake Park",
		class_: 32,
		disc: 32,
		func: 32
	},{
		key: 6,
		name: "John Brown",
		code: 6,
		version: "New York No.1 Lake Park",
		class_: 32,
		disc: 32,
		func: 32
	}];

	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(`selectedRowKeys: ${selectedRowKeys}`, `selectedRows: `, selectedRows);
		}
	};


	return(
		<Table 
			rowSelection={rowSelection}
			columns={tableHead} 
			dataSource={data} 
			pagination={{ pageSize: 3 }}
		/>
	);
};


export default MainDocManagementTable;
