/**
 * 实体类基类，创建业务实体类时必须基于实体类基类
 */
class BaseEntity {
	getEntity() {
		const excludeProperty = ["length", "prototype", "name"];
		const propertyList = Object.getOwnPropertyNames(this.constructor).filter(
			item => !excludeProperty.includes(item)
		);
		return propertyList.map(property => {
			return property.replace(/[A-Z]/g, match => {
				return "_" + match.toLowerCase();
			});
		});
	}
}

module.exports = BaseEntity;
