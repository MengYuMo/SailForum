"use strict";

const moment = require("moment");

/**
 * 格式化时间
 * @param time 需要格式化的时间戳
 * @returns {string} 返回 YYYY-MM-DD HH:mm:ss 格式的时间
 */
module.exports = function (time) {
	return moment(time).format("YYYY-MM-DD HH:mm:ss");
};
