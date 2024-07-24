"use strict";

const Base = require("../base.js");

class User extends Base {
	constructor(props = "sail_forum_user") {
		super(props);
	}
}

module.exports = new User();
