"use strict";

const knex = require("./connect.js");

class Base {
	constructor(props) {
		this.table = props;
	}

	/**
	 * 获取数据库所有数据
	 * @param fieldList 返回字段列表，可选
	 * @returns {*}
	 */
	all(fieldList) {
		if (!fieldList) return knex(this.table).select();
		return knex(this.table)
			.column(...fieldList)
			.select();
	}

	/**
	 * 根据条件查询数据库数据
	 * @param params 查询条件
	 * @param fieldList 返回字段列表，可选
	 * @returns {*}
	 */
	select(params, fieldList) {
		if (!fieldList) return knex(this.table).where(params).select();
		return knex(this.table)
			.column(...fieldList)
			.where(params)
			.select();
	}

	/**
	 * 分页查询数据库数据
	 * @param params 查询参数
	 * @param currentPage 当前页
	 * @param pageSize 每页的数据容量
	 * @returns {*}
	 */
	page(params, currentPage, pageSize) {
		return knex(this.table)
			.select()
			.where(params)
			.offset((currentPage - 1) * pageSize)
			.limit(pageSize);
	}

	/**
	 * 在数据库中插入数据
	 * @param params 插入到数据库的数据
	 * @returns {*}
	 */
	insert(params) {
		return knex(this.table).insert(params);
	}

	/**
	 * 根据 id 更新数据库数据
	 * @param id 需要修改数据的 id
	 * @param params 更新后的数据
	 * @returns {*}
	 */
	updateById(id, params) {
		return knex(this.table).where("id", "=", id).update(params);
	}

	/**
	 * 根据 id 删除数据库数据
	 * @param id 需要删除数据的 id
	 * @returns {*}
	 */
	deleteById(id) {
		return knex(this.table).where("id", "=", id).del();
	}
}

module.exports = Base;
