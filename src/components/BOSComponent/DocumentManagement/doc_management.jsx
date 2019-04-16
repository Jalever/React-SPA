import React, { useState } from "react";
import { connect } from "react-redux";

import "./../style.scss";

import {
	Row,
	Col,
	Button,
	Table,
	Modal,
	Input
} from "antd";

import {
	MANAGEMENT_DOC_FOLDER_NAME,
	MANAGEMENT_DOC_CODE,
	MANAGEMENT_DOC_CLASS,
	BUTTON_SEARCH,
	BUTTON_RESET,
	BUTTON_LOAD_FOLDER,
	BUTTON_ADD_FOLDER,
	BUTTON_DELETE,
	BUTTON_DOWNLOAD
} from "./../../../constants/common.js";

import MainDocManagementTable from "./Maintable.jsx";
import ImportDocModal from "./ImportDocModal.jsx";

const DOC = ({ dataSource, count }) => {

	let [showModal, setShowModal] = useState(false);
	console.log("showModal");
	console.log(showModal);

	let handleDeleteClick = () => {
		console.log("dataSource");
		console.log(dataSource);
	};

	return(
		<div
			className="doc_management"
		>

			<div
				className="doc_management_tree"
			>
				"doc_management_tree"
			</div>

			<div
				className="doc_management_main"
			>
				{
					<Row
					>
						<Col span={6}>
							{
								<Input
									className="input_border"
									placeholder={MANAGEMENT_DOC_FOLDER_NAME}
								/>
							}
						</Col>
						<Col span={6}>
							{
								<Input
									className="input_border"
									placeholder={MANAGEMENT_DOC_CODE}
								/>
							}
						</Col>
						<Col span={6}>
							{
								<Input
									className="input_border"
									placeholder={MANAGEMENT_DOC_CLASS}
								/>
							}
						</Col>
						<Col
							span={6}
						>
								{" "}

								{
									<Button
										style={{marginLeft: "2rem"}}
									>
										{BUTTON_SEARCH}
									</Button>
								}

								{" "}

								{
									<Button
										style={{marginLeft: "2rem"}}
									>
										{BUTTON_RESET}
									</Button>
								}
						</Col>
					</Row>
				}
				{
					<Row
						style={{
							marginTop:"1rem",
							marginBottom:"1rem"
						}}
					>
						{
							<Col span={24}>
								{
									<Button
										onClick={ () => setShowModal({showModal: true}) }
									>
										{BUTTON_LOAD_FOLDER}
									</Button>
								}

								{" "}

								{
									<Button
									>
										{BUTTON_ADD_FOLDER}
									</Button>
								}

								{" "}

								{
									<Button
										onClick={ () => handleDeleteClick() }
									>
										{BUTTON_DELETE}
									</Button>
								}

								{" "}
								{
									<Button
									>
										{BUTTON_DOWNLOAD}
									</Button>
								}
							</Col>
						}
					</Row>
				}
				{
					<Row
						style={{  }}
					>
						<Col span={24}>
							{
								<MainDocManagementTable />
							}
						</Col>
					</Row>
				}

			</div>

			{
				<ImportDocModal
					isShowModal={showModal}
					setShowModal={setShowModal}
				/>
			}
		</div>
	);
};

const mapStateToProps = state => {
	let { dataSource, count } = state.handleSelectedFiles;
	return {
		dataSource,
		count
	};
};

export default connect(mapStateToProps)(DOC);
