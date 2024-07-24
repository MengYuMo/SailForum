"use strict";

const { globalConfig } = require("../../conf/index");

/**
 * 用户相关路由
 * @type {Router | {}}
 */
const usersRouter = require("./user/userRoute.js");

/**
 * 角色相关路由
 * @type {Router | {}}
 */
const roleRoute = require("./role/roleRoute.js");

/**
 * 系统相关路由
 * @type {{}}
 */
// const systemRoute = require("./system/systemRoute.js");

/**
 * 路由列表
 * @type {[{path: string, component: Router | {}},{path: string, component: Router | {}}]}
 */
const routerList = [
	{
		path: "/users",
		component: usersRouter,
	},
	{
		path: "/role",
		component: roleRoute,
	},
	// {
	// 	path: "/system",
	// 	component: systemRoute,
	// },
];

/**
 * 加载路由
 * @param app
 */
module.exports = function loadRouter(app) {
	/**
	 * 循环路由列表创建路由映射关系
	 */
	routerList.forEach(router => {
		app.use(`${globalConfig.baseURL}${router.path}`, router.component);
	});
};
