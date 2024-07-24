"use strict";

const express = require("express");
const router = express.Router();

const userController = require("../../controllers/User/userController.js");

/**
 * /users/register
 * 用户注册
 */
router.post("/register", userController.register);

/**
 * /users/login
 * 用户登陆
 */
router.post("/login", userController.login);

/**
 * /users/logout
 * 用户退出登录
 */
router.post("/logout", userController.logout);

/**
 * /users/list
 * 用户列表
 */
router.get("/list", userController.list);

/**
 * /users/:id
 * 根据 user_id 获取用户信息
 */
router.get("/:id", userController.getUserInfoById);

/**
 * /users/get
 * 获取当前登录信息的用户信息
 */
router.get("/get", userController.getUserInfo);

/**
 * /users/add
 * 添加用户
 */
router.post("/add", userController.addUser);

/**
 * /users/update/:userId
 * 根据 user_id 修改用户信息
 */
router.put("/update/:userId", userController.updateById);

/**
 * /users/del/:userId
 * 根据 user_id 删除用户
 */
router.delete("/del/:userId", userController.deleteById);

module.exports = router;
