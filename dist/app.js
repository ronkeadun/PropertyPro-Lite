'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _propertyRouters = require('./server/routers/propertyRouters.js');

var _propertyRouters2 = _interopRequireDefault(_propertyRouters);

var _propertyControllers = require('./server/controllers/propertyControllers.js');

var _propertyControllers2 = _interopRequireDefault(_propertyControllers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// load express module/library(import express from node modules)
var app = (0, _express2.default)(); // create an instance of express for use

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use("/api/v1/properties", _propertyRouters2.default);

var port = process.env.PORT || 3000;

//start up application server
app.listen(port, function () {
	console.log('Server is up and listening on port ' + port);
});

exports.default = app;
//# sourceMappingURL=app.js.map