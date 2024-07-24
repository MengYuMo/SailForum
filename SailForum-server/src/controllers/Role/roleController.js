"use strict";

const { Response } = require("../../utils");
const Role = require("../../models/role/roleModel.js");

const roleController = {
	/**
	 * 获取角色列表
	 * @param req
	 * @param res
	 * @returns {Promise<void>}
	 */
	getRoleList: async (req, res) => {
		try {
			const roleList = await Role.all();
			res.json(Response.successHandler(roleList));
		} catch (e) {
			res.json(Response.bizFail(e));
		}
	},
	/**
	 * 添加角色
	 * @param req
	 * @param res
	 * @returns {Promise<void>}
	 */
	addRole: async (req, res) => {
		try {
			console.log(123);
		} catch (e) {
			res.json(Response.bizFail(e));
		}
	},
};

module.exports = roleController;
