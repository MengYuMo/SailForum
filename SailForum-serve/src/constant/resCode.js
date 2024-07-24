class resCode {
	constructor(code, desc) {
		this.code = code;
		this.desc = desc;
	}

	/**
	 * 成功响应参数
	 * @type {resCode}
	 */
	static SUCCESS = new resCode(200, "成功");

	/**
	 * 失败响应参数
	 * @type {resCode}
	 */
	static FAILED = new resCode(500, "失败");

	/**
	 * 参数校验失败响应参数
	 * @type {resCode}
	 */
	static VALIDATE_FAILED = new resCode(400, "参数校验失败");

	/**
	 * token 校验失败响应参数
	 * @type {resCode}
	 */
	static UNAUTHORIZED = new resCode(401, "访问令牌缺失，请提供有效的Token");

	/**
	 * 接口不存在响应参数
	 * @type {resCode}
	 */
	static API_NOT_FOUNT = new resCode(404, "接口不存在");

	/**
	 * 操作过于频繁响应参数
	 * @type {resCode}
	 */
	static API_BUSY = new resCode(700, "操作过于频繁");
}

module.exports = resCode;
