module.exports = function (data, argList) {
	let resObj = {};
	argList.forEach(item => {
		resObj[item] = data[item];
	});
	return resObj;
};
