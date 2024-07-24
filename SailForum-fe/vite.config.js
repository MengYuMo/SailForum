import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-vue-components/vite";
import IconsResolver from "unplugin-vue-components/vite";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		open: "/",
	},
	plugins: [
		vue(),
		AutoImport({
			resolvers: [
				// 这个是组件自动导入
				ElementPlusResolver(),
			],
		}),
		Components({
			resolvers: [
				// 自动注册图标组件
				IconsResolver({
					// 修改Icon组件前缀，不设置则默认为i,禁用则设置为false
					prefix: "icon",
					// 指定collection，即指定为elementplus图标集ep
					enabledCollections: ["ep"],
				}),
				// 这个是组件自动导入
				ElementPlusResolver(),
			],
		}),
		// Icons图标自动下载
		Icons({
			autoInstall: true,
		}),
		createHtmlPlugin({
			inject: {
				data: {
					// 定义了一个title 变量，可以被html中进行引用
					title: "轻帆 | 让每一种声音被听见",
				},
			},
		}),
	],
	resolve: { // 配置别名
		alias: {
			"@": "/src", // @表示src目录
		},
	},
});
