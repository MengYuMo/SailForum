<script setup>
import { reactive, ref, getCurrentInstance, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";

// 表单数据
const form = reactive({
	userName: "",
	password: "",
	isRemember: false,
});
// 表单校验规则
const formRules = reactive({
	userName: [
		{
			required: true,
			message: "请输入用户名",
			trigger: "blur",
		},
	],
	password: [
		{
			required: true,
			message: "请输入密码",
			trigger: "blur",
		},
	],
});
// 必填校验错误对象
const errors = ref({});
// 路由对象
const $router = useRouter();

/**
 * 通过 getCurrentInstance() 方法获取当前实例，返回当前实例对象
 * 实例对象中的 proxy 类似于 Vue2 中的 this，所以这里用解构赋值将 proxy 取出，并命名为 _this
 * 只要是需要使用 axios 发送请求的，我们都推荐使用这个
 */
const { proxy: _this } = getCurrentInstance();

/**
 * 记住密码改变执行方法
 */
const changeIsRemember = () => {
	form.isRemember = !form.isRemember;
};

/**
 * 登陆方法，登陆成功后存储 token，并跳转到首页
 */
const login = () => {
	validate(valid => {
		if (valid) {
			_this.$http({
				url: "/users/login",
				method: "post",
				data: form,
			}).then(res => {
				localStorage.setItem("access_token", res.data.access_token);
				localStorage.setItem("refresh_token", res.data.refresh_token);
				$router.replace("/").then(() => {
					ElNotification({
						title: "欢迎您！",
						message: "",
						type: "success",
					});
				});
			});
		}
	});
};

/**
 * 校验表单的方法
 */
const validate = (callback) => {
	let valid = true;
	for (const key in formRules) {
		if ((typeof callback !== "function" && key === callback.target.dataset.prop) || typeof callback === "function") {
			try {
				formRules[key].forEach((item) => {
					if (item.required) {
						let errMsg = {
							message: "",
							argument: "",
						};
						if (!form[key]) {
							errMsg.argument = key;
							errMsg.message = item.message;
							valid = false;
							if (typeof callback !== "function") {
								errors.value[key] = errMsg.message;
								throw new Error(errMsg.message);
							} else {
								errors.value[key] = errMsg.message;
								console.warn("必填参数校验失败", errMsg);
							}
						} else {
							delete errors.value[key];
						}
					}
				});
			} catch (e) {
				break;
			}
		}
	}
	typeof callback === "function" && callback(valid);
};
</script>

<template>
	<div class="login">
		<div class="box">
			<h4>
				<span>登陆</span>
			</h4>
			<h5>
				<span>轻帆后台管理系统</span>
			</h5>
			<form action="" class="form">
				<div class="form_item">
					<input type="text" placeholder="用户名" v-model="form.userName" data-prop="userName"
								 :class="{'is-invalid': errors.userName}" @blur="validate" />
					<p class="err_msg" v-if="errors.userName">{{ errors.userName }}</p>
				</div>
				<div class="form_item">
					<input type="password" placeholder="密码" v-model="form.password" data-prop="password" @blur="validate"
								 :class="{'is-invalid': errors.password}" autocomplete />
					<p class="err_msg" v-if="errors.password">{{ errors.password }}</p>
				</div>
				<label for="">
					<span @click="changeIsRemember">
						<input type="checkbox" v-model="form.isRemember">
						<span datatype="checkbox" :class="[form.isRemember ? 'checkbox' : '']"></span>
						<span class="rmb">记住密码</span>
					</span>
					<el-link :underline="false">忘记密码？</el-link>
				</label>
				<span class="other_login">其他登陆方式</span>
				<div class="other_login_container">
					<img
						style="border-radius: 50%" width="40" height="40"
						src="https://img.ixintu.com/download/jpg/20200825/ea4839ad9642ff6c1f4e4cd55c6f24cf_512_512.jpg!bg"
						alt=""
					>
					<img
						style="border-radius: 50%" width="40" height="40"
						src="https://img.tukuppt.com/ad_preview/00/52/51/7FIhaCbKOa.jpg!/fw/260"
						alt=""
					>
					<img
						style="border-radius: 50%" width="40" height="40"
						src="https://img.ixintu.com/download/jpg/20200928/a7d4611dcb249b293bfc7da6a490ff5a_512_512.jpg!con"
						alt=""
					>
				</div>
				<el-button type="primary" class="login_btn" @click="login">登陆</el-button>
			</form>
			<p class="cs">
				Copyright © 2024
				<br />
				轻帆开源团队
			</p>
		</div>
	</div>
</template>

<style lang="less" scoped>
.login {
	width: 100vw;
	height: 100vh;
	min-height: 900px;
	background: #1d243d;
	position: relative;
	text-align: center;

	.box {
		width: 1000px;
		height: 700px;
		position: absolute;
		top: 20%;
		left: 50%;
		transform: translate(-50%, 0);
		border-top: 10px solid #79a6fe;
		border-bottom: 10px solid #8BD17C;
		border-radius: 9px;
		background-color: #f3f3f3;
		box-shadow: 1px 1px 109px 19px #191f35;

		h4 {
			font-family: 'Source Sans Pro', sans-serif;
			color: var(--el-color-primary);
			font-size: 32px;
			margin-top: 94px;

			span {
				letter-spacing: 1em;
				padding-left: 1em;
			}
		}

		h5 {
			font-family: 'Source Sans Pro', sans-serif;
			color: #1a1a1a;
			font-size: 20px;
			margin-top: 12px;
			margin-bottom: 50px;

			span {
				letter-spacing: 2px;
				padding-left: 2px;
			}
		}

		.form {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			box-sizing: border-box;

			.form_item {
				width: 100%;
				position: relative;

				input[type='text'], input[type='password'] {
					width: 60%;
					margin: 20px auto;
					background: #dadfe9;
					border-radius: 5px;
					padding: 14px 10px;
					outline: 0;
					box-sizing: border-box;
					border: 1px solid #f3f3f3;

					&:focus {
						border: 1px solid #79A6FE;
					}
				}

				.is-invalid {
					border: 1px solid var(--el-color-danger) !important;
				}

				.err_msg {
					color: var(--el-color-danger);
					font-size: 12px;
					line-height: 1;
					padding-top: 2px;
					position: absolute;
					left: 20%;
					top: 70px;
				}
			}

			label {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 60%;
				margin: 10px auto 0;

				span {
					display: flex;
					align-items: center;

					input[type='checkbox'] {
						display: none;
					}

					[datatype="checkbox"] {
						width: 13px;
						height: 13px;
						border: 2px solid #464d64;
						border-radius: 2px;
						display: inline-block;
						cursor: pointer;
					}

					.rmb {
						margin-left: 8px;
						margin-top: 0;
						font-size: 13px;
					}

					.checkbox {
						position: relative;

						&:before {
							content: '\2714';
							color: #79A6FE;
							font-size: 16px;
							position: absolute;
							font-weight: 900;
							top: -4px;
							left: -1px;
							width: 13px;
						}
					}
				}

				:deep(.el-link) {
					font-size: 13px;
				}
			}

			.login_btn {
				border: 0;
				border-radius: 100px;
				width: 60%;
				height: 49px;
				font-size: 16px;
				position: absolute;
				top: 85%;
				left: 50%;
				transform: translate(-50%, -50%);
				transition: .3s;
				cursor: pointer;
				letter-spacing: 24px;
			}

			.other_login {
				width: 100%;
				text-align: center;
				font-size: 13px;
				margin: 30px 0;
				letter-spacing: 2px;

				&:before {
					content: '—';
				}

				&:after {
					content: '—';
				}
			}

			.other_login_container {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;

				img {
					margin: 0 8px;
				}
			}
		}

		.cs {
			font-size: 13px;
			position: absolute;
			bottom: 20px;
			left: 50%;
			transform: translateX(-50%);
			letter-spacing: 1px;
			line-height: 18px;
		}
	}
}
</style>