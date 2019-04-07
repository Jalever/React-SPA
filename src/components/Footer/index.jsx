import React from "react";

import {
	Layout
} from "antd";
import "antd/dist/antd.css";

const {
	Footer
} = Layout;



class FooterComponent extends React.Component {
	render() {
		return(
			<React.Fragment>
				<Footer style={{ textAlign: "center", cursor: "default" }}>
					React Single Page Application
				</Footer>
			</React.Fragment>
		);
	}
}

export default FooterComponent;




