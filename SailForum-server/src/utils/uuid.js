"use strict";

const uuid = require("node-uuid");

/**
 * 创建 UUID
 * @returns {string} uuid
 */
module.exports = function createUUID() {
	return uuid.v1();
};
