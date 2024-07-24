"use strict";

const express = require("express");
const router = express.Router();

const dictController = require("../../../controllers/Dict/dictController");

/**
 * /system/dicts
 * 通过字典编码获取字典
 */
router.get("/dicts", dictController.getDicts);

/**
 * /role/add
 * 添加角色
 */
// router.post("/add", roleController.addRole);

module.exports = router;
