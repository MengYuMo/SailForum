"use strict";

const { cloneDeep } = require("lodash");
const { createUUID, Response, encrypt, formatTime } = require("../../utils");
const User = require("../../models/user/userModel.js");
const { accessToken, refreshToken, decryToken } = require("../../utils/token");
const { setValue, removeValue } = require("../../../conf/redis/redis");
const { globalConfig } = require("../../../conf");
const UserInfo = require("../../entity/user/userInfoEntity");

/**
 * 校验用户是否存在
 * @param user_name
 * @returns {Promise<boolean>}
 */
async function checkedUser(user_name) {
	const userData = await User.select({ user_name }, UserInfo.getEntity());
	return Array.isArray(userData) ? !userData.length : false;
}

const userController = {
	/**
	 * 用户注册处理方法
	 * @param req
	 * @param res
	 * @returns {Promise<*>}
	 */
	register: async (req, res) => {
		try {
			const { userName: user_name, password } = req.body;
			if (user_name && password) {
				await this.addUser(req, res);
			} else {
				if (!user_name) return res.json(Response.validateFailed("user_name"));
				if (!password) return res.json(Response.validateFailed("password"));
			}
		} catch (e) {
			res.json(Response.bizFail(e));
		}
	},
	/**
	 * 用户登陆处理方法
	 * @param req
	 * @param res
	 * @returns {Promise<*>}
	 */
	login: async (req, res) => {
		try {
			const { userName: user_name, password } = req.body;
			const userDataList = await User.select({ user_name });
			if (!Array.isArray(userDataList)) return res.json(Response.bizFail());
			if (!userDataList.length)
				return res.json(Response.failHandler({}, "该用户不存在！"));
			if (encrypt(password) !== userDataList[0].password)
				return res.json(Response.failHandler(null, "密码不正确！"));
			const tokenData = {
				user_id: userDataList[0].id,
				user_name: userDataList[0].username,
			};
			const access_token = `Bearer ${accessToken(tokenData)}`;
			const refresh_token = `Bearer ${refreshToken(tokenData)}`;
			await setValue(
				userDataList[0].id,
				refresh_token,
				"EX",
				globalConfig.token.refresh_expiresIn
			);
			res.json(
				Response.successHandler({ access_token, refresh_token }, "登录成功")
			);
		} catch (e) {
			res.json(Response.bizFail(e));
		}
	},
	/**
	 * 用户退出登录处理方法
	 * @param req
	 * @param res
	 * @returns {Promise<*>}
	 */
	logout: async (req, res) => {
		try {
			if (!req.headers["authorization"])
				return res.json(Response.unauthorizedHandler());
			const userToken = req.headers["authorization"];
			const decryRes = decryToken(userToken);
			await removeValue(decryRes["user_id"]);
			res.json(Response.successHandler(null, "退出登录成功"));
		} catch (e) {
			res.json(Response.bizFail(e));
		}
	},
	/**
	 * 获取用户列表方法
	 * @param req
	 * @param res
	 * @returns {Promise<void>}
	 */
	list: async (req, res) => {
		try {
			const userList = await User.all(UserInfo.getEntity());
			if (!Array.isArray(userList)) return res.json(Response.bizFail());
			res.json(Response.successHandler(userList));
		} catch (e) {
			res.json(Response.bizFail(e));
		}
	},
	/**
	 * 获取当前登陆用户信息方法
	 * @param req
	 * @param res
	 * @returns {Promise<void>}
	 */
	getUserInfo: async (req, res) => {
		try {
			const { authorization } = req.headers;
			const decryRes = decryToken(authorization);
			const userInfoList = await User.select(
				{
					user_id: decryRes["user_id"],
				},
				UserInfo.getEntity()
			);
			if (!Array.isArray(userInfoList)) return res.json(Response.bizFail());
			if (!userInfoList.length)
				return res.json(Response.failHandler({}, "未找到该用户！"));
			res.json(Response.successHandler(userInfoList[0]));
		} catch (e) {
			res.json(Response.bizFail(e));
		}
	},
	/**
	 * 根据 user_id 获取用户信息方法
	 * @param req
	 * @param res
	 * @returns {Promise<*>}
	 */
	getUserInfoById: async (req, res) => {
		try {
			const { id: user_id } = req.params;
			if (!user_id) return res.json(Response.validateFailed("user_id"));
			const userInfoList = await User.select({ user_id }, UserInfo.getEntity());
			if (!Array.isArray(userInfoList)) return res.json(Response.bizFail());
			if (!userInfoList.length)
				return res.json(Response.failHandler(null, "未找到该用户"));
			res.json(Response.successHandler(userInfoList[0]));
		} catch (e) {
			res.json(Response.bizFail(e));
		}
	},
	/**
	 * 添加用户方法
	 * @param req
	 * @param res
	 * @returns {Promise<void>}
	 */
	addUser: async (req, res) => {
		try {
			const { userName: user_name } = req.body;
			if (!user_name) return res.json(Response.validateFailed("user_name"));
			if (!(await checkedUser(user_name)))
				return res.json(
					Response.failHandler(null, "用户名已被占用，请重新输入！")
				);
			let insertParams = cloneDeep(req.body);
			insertParams.id = createUUID();
			insertParams.password = encrypt(insertParams.password);
			insertParams.create_time = formatTime(Date.now());
			insertParams.update_time = formatTime(Date.now());
			await User.insert(insertParams);
			res.json(Response.successHandler({ user_name }));
		} catch (e) {
			res.json(Response.bizFail(e));
		}
	},
	/**
	 * 根据 user_id 修改用户信息方法
	 * @param req
	 * @param res
	 * @returns {Promise<*>}
	 */
	updateById: async (req, res) => {
		try {
			const { id: user_id } = req.params;
			if (!user_id) return res.json(Response.validateFailed("userId"));
			await User.updateById(user_id, req.body);
			res.json(Response.successHandler({ user_id }));
		} catch (e) {
			res.json(Response.bizFail(e));
		}
	},
	/**
	 * 根据 user_id 删除用户方法
	 * @param req
	 * @param res
	 * @returns {Promise<*>}
	 */
	deleteById: async (req, res) => {
		try {
			const { id: user_id } = req.params;
			if (!user_id) return res.json(Response.validateFailed("userId"));
			const { userId } = req.params;
			const userData = await User.select({ id: userId });
			if (!Array.isArray(userData)) return res.json(Response.bizFail());
			if (!userData.length)
				return res.json(Response.failHandler(null, "该用户不存在！"));
			await User.deleteById(userId);
			res.json(Response.successHandler(null));
		} catch (e) {
			res.json(Response.bizFail(e));
		}
	},
};

module.exports = userController;
