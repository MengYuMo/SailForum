"use strict";

/**
 * MySql 配置环境信息
 * @type {{prod: {password: string, database: string, port: string, host: string, user: string}, dev: {password: string, database: string, port: string, host: string, user: string}}}
 */
module.exports = {
	dev: {
		host: "127.0.0.1",
		port: "3306",
		user: "root",
		password: "root123456",
		database: "bbs-db",
	},
	prod: {
		host: "127.0.0.1",
		port: "3306",
		user: "root",
		password: "root123456",
		database: "bbs-db",
	},
};
