import {
	BOS_FUNDATION_PREFIX,
	BOS_3D_PREFIX,
	API_SUCCESS_CODE,
	ALIYUN_PREFIX,
	APP_KEY,
	BOS_CENTER_SERVICE,
	BOS_DOCUMENT_SERVICE,
	API_ERROR_NOT_LOGIN_CODE
} from "./../constants/api.js";

import { message } from "antd";
import "antd/dist/antd.css";

import {
	UNAUTHORIZED,
	UNKNOWN_ERROR
} from "./../constants/common.js";

import { createBrowserHistory } from "history";
const history = createBrowserHistory();

import qs from "qs";
import axios from "axios";
import Cookies from "js-cookie";

var userInfo = Cookies.get("userInfo");
if(Cookies.get("userInfo")) {
    userInfo = JSON.parse(userInfo);
}

const METHOD = {
	GET: "get",
	POST: "post",
	PUT: "put",
	DELETE: "delete"
};

const hydrateBOSAPI = url => BOS_FUNDATION_PREFIX + url;
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

const fetchRequest = (url = ``, methods = METHOD.GET, formType = true, authorization = "", data = {}) => {
	return fetch(url,{
		method: methods,
		mode: "cors",
		cache: "no-cache",
		headers: {
			"Content-Type": formType ? "multipart/form-data" : "application/json",
			"Authorization": authorization
		},
		body: data
	})
	.then(res => {
		switch (res.status) {
			case 200: {
				return res.json();
			}
			case 401: {
				return message.error(UNAUTHORIZED);
			}
			case 503: {
				return message.error("503 Error");
			}
			default:
				return message.error(UNKNOWN_ERROR);
		}
	})
	.catch(err => message.error(err));
};

const fetchRequestFile = (url = ``, methods = METHOD.POST, data, jsonType = false, authorization = false) => {
	return fetch(url, {
		method: methods,
		headers: {
			"Authorization": authorization
		},
		body: data
	})
	.then(res => res.json())
	.catch( err => message.error(err) );
};

export default {
	login: params => request(hydrateBOSAPI(`/${BOS_CENTER_SERVICE}/account/login`), params, METHOD.POST, true, true),
	requestTabeData: () => xhrRequest(METHOD.GET, hydrateAliyunAPI("/data"), true),
	//发送验证码
	getValidationCode: data => fetchRequest(hydrateBOSAPI(`/${BOS_CENTER_SERVICE}/account/validateCode`), METHOD.POST, true, data),
	getRandomUser: data => fetchRequest("https://randomuser.me/api/?results=10", METHOD.GET, true, "", data),
	postFetchFile: data => fetchRequest(hydrateAliyunAPI("/upload"), METHOD.POST, true, "", data),
	fetchFoldersDocuments: (params, auth) => fetchRequest(hydrateBOSAPI(`/${BOS_DOCUMENT_SERVICE}/${APP_KEY}/folders/folders&documents`), METHOD.POST, false, auth, params),
	getSubDirectoryTree: key => fetchRequest(hydrateBOSAPI(`/${BOS_DOCUMENT_SERVICE}/${APP_KEY}/folders/` + key + `folders/noRelation=false`), METHOD.GET, true, userInfo.access_token),
	postFile: (appKey, data, autho) => fetchRequestFile(`http://bosapi-demo.rickricks.com/bosdocumentservice/${appKey}/files`, METHOD.POST, data, false, autho),
	//BOS
	createRootDirectory: params => fetchRequest(hydrateBOSAPI(`/${BOS_DOCUMENT_SERVICE}/${APP_KEY}/folders`), METHOD.POST, false, userInfo.access_token, params)
};
