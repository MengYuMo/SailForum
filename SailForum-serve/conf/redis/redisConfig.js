"use strict";

/**
 * 连接 Redis 的公共配置
 * @type {{detect_buffer: boolean, retry_strategy: ((function(*): (Error))|*)}}
 */
const commonConfig = {
	detect_buffer: true,
	retry_strategy: config => {
		if (config.error && config.error.code === "ECONNREFUSED") {
			return new Error("The server refused the connection.");
		}
		if (config.total_retry_time > 1000 * 60 * 60) {
			return new Error("Retry time exhausted");
		}
		if (config.attempt > 10) {
			return undefined;
		}
		return Math.min(config.attempt * 100, 3000);
	},
};

/**
 * Redis 环境配置信息
 * @type {{prod: {port: number, detect_buffer: boolean, host: string, retry_strategy: function(*): (Error)}, dev: {port: number, detect_buffer: boolean, host: string, retry_strategy: function(*): (Error)}}}
 */
module.exports = {
	dev: {
		host: "127.0.0.1",
		port: 6379,
		...commonConfig,
	},
	prod: {
		host: "127.0.0.1",
		port: 6379,
		...commonConfig,
	},
};
