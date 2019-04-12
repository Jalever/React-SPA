import React from "react";

import ImageComponent from "./../components/ImageComponent/index.jsx";
import TodoContentComponent from "./../components/TodoContent/index.jsx";
import TableComponent from "./../components/TableComponent/index.jsx";
import BOSComponent from "./../components/BOSComponent/index.jsx";
import LoginComponent from "./../components/LoginComponent/index.jsx";
import RegisterComponent from "./../components/RegisterComponent/index.jsx";


const routes = [
	{
		pathname: "/home",
		itemname: "Table"
	},{
		pathname: "/home/images",
		itemname: "Images"
	},{
		pathname: "/home/todolist",
		itemname: "Todo List"
	},{
		pathname: "/home/bos",
		itemname: "BOS"
	},{
		pathname: "/",
		exact: true,
		component: LoginComponent,
	},{
		pathname: "/home",
		exact: true,
		component: LoginComponent,
	},{
		pathname: "/register",
		exact: true,
		component: RegisterComponent,
	}
];

export default routes;