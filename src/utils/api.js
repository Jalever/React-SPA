import {
	BOS_FUNDATION_PREFIX,
	BOS_3D_PREFIX,
	API_SUCCESS_CODE,
	ALIYUN_PREFIX,
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

const hydrateBOSAPI = (url) => BOS_FUNDATION_PREFIX + url;
const hydrateAliyunAPI = url => ALIYUN_PREFIX + url;

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

const xhrRequest = (method, url, isAsync) => {
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();
		xhr.open(method, url, isAsync);
		xhr.send();

		xhr.onreadystatechange = function() {
			if(xhr.readyState === 4) {
				if(xhr.status === 200) {
					resolve(JSON.parse(xhr.responseText));
				} else {
					reject("There were something wrong in xhrRequest!");
				}
			} 
		};
	});

};

export default {
	login: params => request(hydrateBOSAPI("/account/login"), params, METHOD.POST, true, true),
	requestTabeData: () => xhrRequest(METHOD.GET, hydrateAliyunAPI("/data"), true)
};
