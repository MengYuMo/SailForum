"use strict";

const { mysql, log } = require("../../conf/index");

/**
 * 连接数据库
 * @type {*|Knex<any, unknown[]>}
 */
module.exports = require("knex")({
	/**
	 * 数据库类型
	 */
	client: "mysql",
	/**
	 * 数据库连接参数
	 */
	connection: {
		// 数据库主机地址
		host: mysql.host,
		// 数据库端口号
		port: mysql.port,
		// 数据库登录用户
		user: mysql.user,
		// 数据库登录用户密码
		password: mysql.password,
		// 数据库名
		database: mysql.database,
	},
	/**
	 * 打印
	 */
	log,
});
