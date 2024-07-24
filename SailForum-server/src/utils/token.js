"use strict";

const jwt = require("jsonwebtoken");
const { globalConfig } = require("../../conf/index");

/**
 * 创建 token
 * @param type 创建 token 的类型
 * @enum type access | refresh
 * @param data 生成 token 的源数据
 * @returns {*}
 */
const createToken = (type, data) => {
	return jwt.sign(data, globalConfig.token.SECRET_KEY, {
		expiresIn: globalConfig.token[`${type}_expiresIn`],
	});
};

/**
 * 创建 accessToken
 * @param data
 * @returns {*}
 */
const accessToken = data => {
	return createToken("access", data);
};

/**
 * 创建 refreshToken
 * @param data
 * @returns {*}
 */
const refreshToken = data => {
	return createToken("refresh", data);
};

/**
 * 解析 token
 * @param token 需要解析的 token
 * @returns {*}
 */
const decryToken = token => {
	const verToken = token.split(" ")[1];
	return jwt.verify(verToken, globalConfig.token.SECRET_KEY, (err, decoded) => {
		console.log(err);
		if (err) return { code: 400, msg: "无效的token！" };
		return decoded;
	});
};

module.exports = {
	accessToken,
	refreshToken,
	decryToken,
};
