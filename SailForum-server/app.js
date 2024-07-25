"use strict";

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const loadRouter = require("./src/routes/index.js");
const globalConfig = require("./conf/globalConfig.js");
const { expressjwt } = require("express-jwt");
const Response = require("./src/utils/response.js");
const cors = require("cors");

const secret = globalConfig.token.SECRET_KEY;

const app = express();

const expressSwagger = require("express-swagger-generator")(app);

expressSwagger(globalConfig.swaggerConfig);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
	expressjwt({
		secret,
		algorithms: ["HS256"],
	}).unless({
		path: [
			`${globalConfig.baseURL}/users/login`,
			`${globalConfig.baseURL}/users/register`,
			"/api-docs",
		],
	})
);

loadRouter(app);

app.use((err, req, res, next) => {
	if (err.name === "UnauthorizedError")
		return res.status(401).json(Response.unauthorizedHandler());
	next(err);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use((err, req, res) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
