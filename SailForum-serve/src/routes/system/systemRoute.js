"use strict";

// const express = require("express");
// const router = express.Router();

/**
 * 字典相关接口
 * @type {Router | {}}
 */
const dictRoutes = require("./dict/dictRoute");

module.exports = {
	...dictRoutes,
};
