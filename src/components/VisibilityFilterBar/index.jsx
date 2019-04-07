import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { setFilter } from "./../../actions/index.jsx";
import { VISIBILITY_FILTER } from "./../../constants/todolist.jsx";

import "./style.scss";

const VisibilityFilterBar = ({ activeFilter, setFilter }) => {

	return(
		<div
			className="visibilit-bar-div"
		>
			{
				Object.keys(VISIBILITY_FILTER).map( (filterKey, index) => {
					let curFilterPart = VISIBILITY_FILTER[filterKey];
					// console.log("curFilterPart: ");
					// console.log(curFilterPart);
					return(
						<span
							key={`visibility-filter-${curFilterPart}`}
							className={cx("filter", curFilterPart === activeFilter && "active-filter")}
							onClick={ () => {
								setFilter(curFilterPart)
							} }
						> 
							{ curFilterPart } 
						</span>
					);
				} )
			}
		</div>
	);

};

const mapStateToProps = state => {
	// console.log("VisibilityFilterBar - state: ");
	// console.log(state);
	return { activeFilter: state.visibilityFilter};
};

export default connect(
	mapStateToProps,
	{ setFilter }
)(VisibilityFilterBar);



