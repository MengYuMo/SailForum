<script setup>
import {toRef} from "vue";
import { useRoute, useRouter } from "vue-router";

const $route = useRoute();
const $router = useRouter();

// 接收到的参数
const props = defineProps({
	/**
	 * 菜单列表，分为一级菜单和二级菜单
	 */
	menuList: {
		type: Array,
		required: true,
	},
});

// 根据当前路径，判断需要激活的菜单
const activePath = toRef($route, 'path')

/**
 * 切换菜单触发的方法
 * @param path 激活菜单的路径
 */
const handleChange = (path) => {
	$router.push(path);
};
</script>

<template>
	<div class="s_menu">
		<div class="s_menu_item" :class="item.children ? '' : 'end-level-menu'" v-for="(item, index) in menuList"
				 :key="index">
			<h3 class="menu_title">{{ item.title }}</h3>
			<div class="s_submenu">
				<div class="s_submenu_item" :class="activePath === sItem.path ? 'active' : ''"
						 v-for="(sItem, sIndex) in item.children" :key="sIndex" @click="handleChange(sItem.path)">
					<p>{{ sItem.title }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
.s_menu {
	&_item {
		margin-bottom: 12px;

		.s_submenu {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			margin-top: 12px;
			padding: 0 8px;

			&_item {
				border: 1px solid #dcdfe6;
				border-radius: 8px;
				padding: 6px 8px;
				margin-top: 8px;
				cursor: pointer;
				font-size: 13px;
			}

			.active {
				border-color: #00b7ff;
				color: #00b7ff;
			}
		}

		.menu_title {
			font-size: 16px;
			letter-spacing: 6px;
			font-weight: bold;
		}
	}

	.end-level-menu {
		cursor: pointer;
	}
}
</style>