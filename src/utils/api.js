import {
	BOS_FUNDATION_PREFIX,
	BOS_3D_PREFIX,
	API_SUCCESS_CODE,
	API_ERROR_NOT_LOGIN_CODE
} from "./../constants/api.js";

import { message } from "antd";
import qs from "qs";
import axios from "axios";

const METHOD = {
	GET: "get",
	POST: "post",
	PUT: "put",
	DELETE: "delete"
};

const hydrateAPI = (url) => BOS_FUNDATION_PREFIX + url;

const request = (url, params, method = "post", jsonType = false, formType = false) => {
	let options = {
		headers: {
			"Content-Type": jsonType ? "application/json" : ( formType ? "multipart/form-data" : "application/x-www-form-urlencoded" )
		},
		url: url,
		method: method,
		data: params
	};

	console.log("options");
	console.log(options);

	return axios(options);
};

export default {
	login: params => request(hydrateAPI("/account/login"), params, METHOD.POST, true, true)
};
