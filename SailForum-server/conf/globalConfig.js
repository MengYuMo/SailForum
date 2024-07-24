"use strict";

/**
 * 全局配置信息
 * @type {{baseURL: (string), token: {refresh_expiresIn: string, access_expiresIn: string, SECRET_KEY: string}}}
 */
module.exports = {
	/**
	 * 生成 token 的配置信息
	 */
	token: {
		SECRET_KEY: "sihfgbseuygfyuasevfabisefnbasyefbvre",
		access_expiresIn: "1h",
		refresh_expiresIn: "24h",
	},
	/**
	 * 接口请求基础路径
	 */
	baseURL:
		process.env.NODE_ENV === "prod"
			? "/sailforum-prod/V1/api"
			: "/sailforum-test/V1/api",
};
