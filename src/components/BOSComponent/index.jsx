import React from "react";
import DOC from "./DocumentManagement/doc_management.jsx";

import {
	Tabs
} from "antd";

const TabPane = Tabs.TabPane;

import "antd/dist/antd.css";

import {
	MANAGEMENT_PROGRESS,
	MANAGEMENT_DOC,
	MANAGEMENT_SPACE_TREE
} from "./../../constants/common.js";

// const style = require("./style.scss");
import "./style.scss";

const BOSComponent = () => {
	return(
		<div
			className="content"
		>
			<Tabs
				style={{ width:"100%" }}
			>
				{
					<TabPane 
						tab={ MANAGEMENT_DOC }
						key = { MANAGEMENT_DOC }
					>
						<DOC />
					</TabPane>
				}

				{
					<TabPane 
						tab={ MANAGEMENT_SPACE_TREE }
						key = { MANAGEMENT_SPACE_TREE }
					>
						{
							"Content of Tab Pane 2"
						}
					</TabPane>
				}

				{
					<TabPane 
						tab={ MANAGEMENT_PROGRESS }
						key = { MANAGEMENT_PROGRESS }
					>
						{
							"Content of Tab Pane 3"
						}
					</TabPane>
				}
			</Tabs>
		</div>
	);
};


export default BOSComponent;

