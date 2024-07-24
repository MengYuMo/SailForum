import axios from "axios";
import { common } from "./public.js";

/**
 * 创建 axios 实例
 * 配置基本参数
 * @type {axios.AxiosInstance}
 */
const instance = axios.create({
	baseURL: "http://localhost:3199/sailforum-test/V1/api",
	timeout: 5000,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

/**
 * 请求拦截器
 */
instance.interceptors.request.use(config => {
	// 放行白名单
	const excludedUrls = [
		"/users/login",
		"/users/register",
	];
	if (config.url && !excludedUrls.includes(config.url) && common.getToken()) {
		config.headers["Authorization"] = common.getToken();
	}
	return config;
});

/**
 * 响应拦截器
 */
instance.interceptors.response.use(res => {
	return res;
});

/**
 * 请求分发
 * @param config 请求配置
 * @returns {Promise<unknown>}
 */
export const request = async (config) => {
	if (config.method.toLowerCase() === "get") {
		return await getRequest(config);
	} else if (config.method.toLowerCase() === "post") {
		return await postRequest(config);
	} else if (config.method.toLowerCase() === "put") {
		return await putRequest(config);
	} else if (config.method.toLowerCase() === "delete") {
		return await deleteRequest(config);
	} else {
		throw new Error("Method Not Found");
	}
};

/**
 * get 请求方法
 * @param config 请求配置
 * @returns {Promise<unknown>}
 */
const getRequest = (config) => {
	return new Promise((resolve, reject) => {
		instance({
			url: config.url,
			method: "get",
			params: config.params,
		}).then((res) => {
			resolve(res.data);
		});
	});
};

/**
 * post 请求方法
 * @param config 请求配置
 * @returns {Promise<unknown>}
 */
const postRequest = (config) => {
	return new Promise((resolve, reject) => {
		instance({
			url: config.url,
			method: "post",
			data: config.data,
		}).then(res => {
			resolve(res.data);
		});
	});
};

/**
 * put 请求方法
 * @param config 请求配置
 */
const putRequest = (config) => {
	return new Promise((resolve, reject) => {
		instance({
			url: config.url,
			method: "put",
			data: config.data,
		}).then(res => {
			resolve(res.data);
		});
	});
};

/**
 * delete 请求方法
 * @param config 请求配置
 */
const deleteRequest = (config) => {
	return new Promise((resolve, reject) => {
		instance({
			url: config.url,
			method: "delete",
			params: config.params,
		}).then(res => {
			resolve(res.data);
		});
	});
};
