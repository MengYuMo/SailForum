"use strict";

const mysql = require("./mysql/mysql.js");
const globalConfig = require("./globalConfig");

/**
 * 配置信息
 * @type {{globalConfig: {baseURL: string, token: {refresh_expiresIn: string, access_expiresIn: string, SECRET_KEY: string}}|{token?: {refresh_expiresIn: string, access_expiresIn: string, SECRET_KEY: string}, baseURL?: string}, log: {error(*): void}, mysql: ({password: string, database: string, port: string, host: string, user: string}|{password: string, database: string, port: string, host: string, user: string}|*|{password: string, database: string, port: string, host: string, user: string})}}
 */
module.exports = {
	/**
	 * 全局配置信息
	 */
	globalConfig,
	/**
	 * MySql 配置信息
	 */
	mysql: process.env.NODE_ENV === "production" ? mysql.prod : mysql.dev,
	/**
	 * 打印配置信息
	 */
	log: {
		error(message) {
			console.error(message);
		},
	},
};
