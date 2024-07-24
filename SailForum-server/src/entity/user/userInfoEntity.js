const BaseEntity = require("../baseEntity");

/**
 * 用户信息实体类
 */
class UserInfoEntity extends BaseEntity {
	static id;

	// 用户名
	static userName;

	// 角色ID
	static roleId;

	// 用户头像
	static avatar;

	// 创建时间
	static createTime;

	// 最后一次修改时间
	static updateTime;
}

module.exports = new UserInfoEntity();
