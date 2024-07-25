"use strict";

const { Response } = require("../../utils");
const Role = require("../../models/role/roleModel.js");

const roleController = {
	/**
	 * 获取角色列表
	 * @route POST /sailforum-test/V1/api/role/list
	 * @group Role - Operations about role
	 * @returns {object} 200 - 获取角色列表成功
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
	 * @route POST /sailforum-test/V1/api/role/list
	 * @group Role - Operations about role
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
