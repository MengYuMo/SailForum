"use strict";

const { Response } = require("../../utils");
const Dict = require("../../models/dict/dictModel");

const dictController = {
	getDicts: async (req, res) => {
		try {
			const { dictCode: dict_code } = req.query;
			console.log(dict_code);
			const dictList = await Dict.select({ dict_code });
			console.log(dictList);
			res.json(Response.successHandler(dictList));
		} catch (e) {
			res.json(Response.bizFail(e));
		}
	},
};

module.exports = dictController;
