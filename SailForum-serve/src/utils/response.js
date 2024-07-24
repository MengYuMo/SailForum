const resCode = require("../constant/resCode");
const formatTime = require("./time");

class Response {
	code;
	msg;
	data;
	time;

	constructor(code, msg, data) {
		this.code = code;
		this.msg = msg;
		this.data = data;
		this.time = formatTime(Date.now());
	}

	/**
	 * 失败的返回参数封装方法
	 * @param data 接口请求失败时返回的数据
	 * @param msg 接口请求失败时返回的错误信息
	 * @returns {Response}
	 */
	static failHandler(data, msg = resCode.FAILED.desc) {
		return new Response(resCode.FAILED.code, msg, data);
	}

	/**
	 * 成功的返回参数封装方法
	 * @param data 接口请求成功时返回的数据
	 * @param msg 接口请求成功时返回的成功信息
	 * @returns {Response}
	 */
	static successHandler(data, msg = resCode.SUCCESS.desc) {
		return new Response(resCode.SUCCESS.code, msg, data);
	}

	/**
	 * 必填参数校验失败的返回参数封装方法
	 * @param param 未传入的必填参数名称
	 * @returns {Response}
	 */
	static validateFailed(param) {
		let resStr = `The parameter '${param}' is required.`;
		return new Response(
			resCode.VALIDATE_FAILED.code,
			resCode.VALIDATE_FAILED.desc,
			resStr
		);
	}

	/**
	 * 身份信息校验失败的返回参数封装方法
	 * @returns {Response}
	 */
	static unauthorizedHandler() {
		return new Response(resCode.UNAUTHORIZED.code, resCode.UNAUTHORIZED.desc);
	}

	/**
	 * 系统异常的返回参数封装方法
	 * @param bizException 捕获到的错误信息
	 * @returns {Response}
	 */
	static bizFail(bizException = {}) {
		console.log("系统错误", bizException);
		return new Response(resCode.FAILED.code, "系统错误", null);
	}
}

module.exports = Response;
