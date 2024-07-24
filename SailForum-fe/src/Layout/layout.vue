<script setup>
import {
	Search,
	FullScreen,
	Setting,
	Refresh,
	SwitchButton,
	Avatar,
	Message,
} from "@element-plus/icons-vue";
import { ref, onMounted, onUnmounted, reactive, getCurrentInstance, markRaw } from "vue";
import { useRouter } from "vue-router";

/**
 * 通过 getCurrentInstance() 方法获取当前实例，返回当前实例对象
 * 实例对象中的 proxy 类似于 Vue2 中的 this，所以这里用解构赋值将 proxy 取出，并命名为 _this
 * 只要是需要使用 axios 发送请求的，我们都推荐使用这个
 */
const { proxy: _this } = getCurrentInstance();
// 路由对象
const $router = useRouter();

// 水印字体样式
const font = reactive({
	// 字体颜色
	color: "rgba(0, 0, 0, .15)",
});
// 水印内容
const content = reactive(["SailForum", "轻帆"]);
// 用户头像地址
const circleUrl = ref("https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png");
// 抽屉控制参数
let drawer = ref(false);
// 菜单列表
const menuList = reactive([
	{
		title: "仪表盘",
		icon: "home",
		path: "/behind",
		children: [
			{
				title: "首页",
				icon: "home",
				path: "/behind/home",
			},
		],
	},
	{
		title: "系统管理",
		icon: "home",
		path: "home",
		children: [
			{
				title: "角色管理",
				icon: "home",
				path: "/behind/role",
			},
			{
				title: "权限管理",
				icon: "home",
				path: "/behind/authority",
			},
			{
				title: "用户管理",
				icon: "home",
				path: "/behind/user",
			},
		],
	},
]);

/**
 * 打开设置抽屉
 */
const openSetting = () => {
	drawer.value = true;
};

/**
 * 关闭弹窗
 */
const drawerClose = () => {
	drawer.value = false;
};

/**
 * 点击抽屉内取消按钮
 */
const handleCancel = () => {
	drawer.value = false;
};

/**
 * 点击抽屉内确认按钮
 */
const handleConfirm = () => {
	drawer.value = false;
};

/**
 * 点击搜索触发方法
 */
const dialogVisible = ref(false);
const openSearch = () => {
	dialogVisible.value = true;
};

/**
 * 关闭搜索弹窗
 */
const dialogClose = () => {
	dialogVisible.value = false;
};

/**
 * 进入全屏方法
 */
const isFullScreen = ref(false);
const element = document.documentElement;
const fullScreen = (e) => {
	btnList.forEach(item => {
		console.log(item);
		if (item.title === "全屏") {
			item.isShow = false;
		}
		if (item.title === "退出全屏") {
			item.isShow = true;
		}
		console.log(item);
	});
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
		element.webkitRequestFullscreen();
	} else if (element.msRequestFullscreen) { // IE/Edge
		element.msRequestFullscreen();
	}
};

/**
 * 退出全屏方法
 */
const exitFullScreen = () => {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
		document.webkitExitFullscreen();
	} else if (document.msExitFullscreen) { // IE/Edge
		document.msExitFullscreen();
	}
};

/**
 * 点击下拉菜单触发对应的命令
 * @param command 命令标识
 */
const executeCommand = (command) => {
	switch (command) {
		case "person_center":
			break;
		case "message_center":
			break;
		case "logout":
			logout();
			break;
	}
};

/**
 * 退出登陆方法
 */
const logout = () => {
	_this.$http({
		url: "/users/logout",
		method: "POST",
	}).then(() => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		$router.replace("/login");
	});
};

/**
 * 事件监听处理方法
 * @param type 可选参数：['add', 'remove']
 */
const fullScreenListener = (type) => {
	const listenerList = [
		"fullscreenchange",
		"webkitfullscreenchange",
		"mozfullscreenchange",
		"MSFullscreenChange",
	];
	listenerList.forEach(listener => {
		if (type === "add") {
			document.addEventListener(listener, handleFullScreenChange);
		} else {
			document.removeEventListener(listener, handleFullScreenChange);
		}
	});
};

/**
 * 监听到全屏变化时的处理函数
 */
const handleFullScreenChange = () => {
	isFullScreen.value = !isFullScreen.value;
};

/**
 * 右侧操作按钮数组
 */
const btnList = reactive([
	markRaw({
		title: "搜索",
		icon: Search,
		isShow: true,
		clickMethod: openSearch,
	}),
	markRaw({
		title: "刷新",
		icon: Refresh,
		isShow: true,
		clickMethod: "",
	}),
	markRaw({
		title: "全屏",
		icon: FullScreen,
		isShow: true,
		clickMethod: fullScreen,
	}),
	markRaw({
		title: "退出全屏",
		icon: SwitchButton,
		isShow: false,
		clickMethod: exitFullScreen,
	}),
	markRaw({
		title: "设置",
		icon: Setting,
		isShow: true,
		clickMethod: openSetting,
	}),
]);

onMounted(() => {
	// 组件挂载时，添加事件监听器
	fullScreenListener("add");
});

onUnmounted(() => {
	// 组件卸载时，移除事件监听器
	fullScreenListener("remove");
});
</script>

<template>
	<el-watermark :font="font" :content="content" :width="130">
		<div class="common-layout">
			<el-container>
				<el-header>
					<div class="header">
						<div class="logo_container">
							<img class="logo" src="../assets/logo.png" alt="SailForumLogo">
							<p>轻帆</p>
						</div>
						<div class="header_right">
							<div class="btn_group">
								<div class="btn" v-for="(item,index) in btnList" :key="index" v-show="item.isShow">
									<el-tooltip
										effect="dark"
										:content="item.title"
										placement="bottom"
									>
										<el-button :icon="item.icon" circle @click="item.clickMethod" />
									</el-tooltip>
								</div>
							</div>
							<el-dropdown trigger="hover" @command="executeCommand">
								<el-avatar :size="40" :src="circleUrl" />
								<template #dropdown>
									<el-dropdown-menu>
										<el-dropdown-item command="person_center">
											<el-icon>
												<Avatar />
											</el-icon>
											<span>个人中心</span>
										</el-dropdown-item>
										<el-dropdown-item command="message_center">
											<el-icon>
												<Message />
											</el-icon>
											<span>消息</span>
										</el-dropdown-item>
										<el-dropdown-item command="logout" divided>退出登陆</el-dropdown-item>
									</el-dropdown-menu>
								</template>
							</el-dropdown>
						</div>
					</div>
				</el-header>
				<el-container>
					<el-aside width="200px">
						<div class="aside">
							<s-menu :menu-list="menuList"></s-menu>
						</div>
					</el-aside>
					<el-main>
						<router-view></router-view>
					</el-main>
				</el-container>
			</el-container>
			<el-dialog
				v-model="dialogVisible"
				title="搜索"
				width="500"
				:before-close="dialogClose"
			>
				<span>This is a message</span>
				<template #footer>
					<div class="dialog-footer">
						<el-button @click="dialogVisible = false">取消</el-button>
						<el-button type="primary" @click="dialogVisible = false">
							搜索
						</el-button>
					</div>
				</template>
			</el-dialog>
			<el-drawer
				v-model="drawer"
				title="全局设置"
				direction="rtl"
				:before-close="drawerClose"
				size="40%"
			>
				<span>Hi, there!</span>
				<template #footer>
					<div style="flex: auto">
						<el-button @click="handleCancel">取消</el-button>
						<el-button type="primary" @click="handleConfirm">保存</el-button>
					</div>
				</template>
			</el-drawer>
		</div>
	</el-watermark>
</template>

<style lang="less" scoped>
.common-layout {
	width: 100vw;
	height: 100vh;

	:deep(.el-container) {
		width: 100%;
		height: 100%;

		.el-aside {
			border-right: 1px solid #f9f9f9;
		}

		.el-header {
			border-bottom: 1px solid #dcdfe6;
		}
	}

	.header {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.logo_container {
			height: 100%;
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.logo {
				width: 52px;
				height: 52px;
			}

			p {
				font-size: 20px;
				letter-spacing: 12px;
			}
		}

		&_right {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.btn_group {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.btn {
					margin-right: 12px;
				}
			}
		}
	}

	.aside {
		width: 100%;
		height: 100%;
		padding: 16px;
		box-sizing: border-box;
	}
}
</style>