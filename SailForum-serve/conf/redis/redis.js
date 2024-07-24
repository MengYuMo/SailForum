"use strict";

const redis = require("redis");
const redisConnect = require("./redisConfig.js");

/**
 * 创建 Redis 实例
 * @type {RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts>}
 */
const client = redis.createClient(
	process.env.NODE_CNV === "prod" ? redisConnect.prod : redisConnect.dev
);

/**
 * 连接 Redis
 */
client.connect();

/**
 * 在 Redis 中插入值
 * @param key
 * @param value
 * @param timeUnit
 * @param expire
 * @returns {Promise<void>}
 */
const setValue = async (key, value, timeUnit, expire) => {
	if (typeof value === "string") {
		await client.set(key, value, timeUnit, expire, err => {
			if (err) {
				console.error("Error setting expiring value:", err);
			} else {
				console.log("Expiring value set successfully");
			}
		});
	} else if (typeof value === "object") {
		for (let item in value) {
			client.set(key, value[item], timeUnit, expire);
		}
	}
};

const incrValue = async (key, value) => {
	await client.incr(key, value);
};

/**
 * 根据 key 获取 Redis 中的值
 * @param key
 * @returns {Promise<unknown>}
 */
const getValue = key => {
	return new Promise((resolve, reject) => {
		client
			.get(key)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

const getHValue = key => {
	return new Promise((resolve, reject) => {
		client
			.hgetall(key)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

/**
 * 根据 key 移除 Redis 中的值
 * @param key
 * @returns {Promise<unknown>}
 */
const removeValue = key => {
	return new Promise((resolve, reject) => {
		client
			.del(key)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				reject(e);
			});
	});
};

module.exports = {
	setValue,
	incrValue,
	getValue,
	getHValue,
	removeValue,
};
