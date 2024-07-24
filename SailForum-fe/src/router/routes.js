export const routes = [
	{
		path: "/",
		component: () => import("../Layout/layout.vue"),
		redirect: "/behind",
	},
	{
		path: "/login",
		component: () => import("../views/login/login.vue"),
	},
	{
		path: "/behind",
		component: () => import("../Layout/layout.vue"),
		redirect: "/behind/home",
		children: [
			{
				path: "home",
				component: () => import("../views/home/home.vue"),
			},
			{
				path: "role",
				component: () => import("../views/home/home.vue"),
			},
			{
				path: "authority",
				component: () => import("../views/home/home.vue"),
			},
			{
				path: "user",
				component: () => import("../views/home/home.vue"),
			},
		],
	},
	{
		path: "/:catchAll(.*)", // 这里的`:catchAll(.*)`是一个正则表达式，用于匹配所有路径
		component: () => import("../views/404/404.vue"), // 当没有其他路由匹配时，显示 404 页面
	},
];