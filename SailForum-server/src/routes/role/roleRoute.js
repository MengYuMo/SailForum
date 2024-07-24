"use strict";

const express = require("express");
const router = express.Router();

const roleController = require("../../controllers/Role/roleController");

/**
 * /role/list
 * 获取角色列表
 */
router.get("/list", roleController.getRoleList);

/**
 * /role/add
 * 添加角色
 */
router.post("/add", roleController.addRole);

module.exports = router;
