"use strict";

const crypto = require("crypto");

/**
 * MD5 加密方法
 * @param data 需要加密的数据
 * @returns {string} 加密后的数据
 */
const encrypt = data => {
	const hash = crypto.createHash("md5");
	return hash.update(data).digest("hex");
};

module.exports = {
	encrypt,
};
