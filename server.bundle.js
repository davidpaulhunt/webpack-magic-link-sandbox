/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _path = __webpack_require__(2);

	var _path2 = _interopRequireDefault(_path);

	var _express = __webpack_require__(3);

	var _express2 = _interopRequireDefault(_express);

	var _cookieParser = __webpack_require__(4);

	var _cookieParser2 = _interopRequireDefault(_cookieParser);

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(6);

	var _server2 = _interopRequireDefault(_server);

	var _html = __webpack_require__(7);

	var _html2 = _interopRequireDefault(_html);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint-disable no-param-reassign */

	var app = (0, _express2.default)();

	app.use((0, _cookieParser2.default)());

	app.use(_express2.default.static(_path2.default.join(__dirname, '..', 'build'))); // Use the build folder first.
	app.use(_express2.default.static(_path2.default.join(__dirname, 'public'))); // Fallback to public.

	app.use(function (req, res, next) {
	  var uid = req.cookies.gouid;
	  var token = req.cookies['wt-' + uid];
	  req.authentication = {};
	  if (token) {
	    req.authentication.token = token;
	  }
	  req.authentication.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	  next();
	});

	app.post('/go/:uid/:token', function (req, res) {
	  res.cookie('gouid', req.params.uid);
	  res.cookie('wt-' + req.params.uid, req.params.token);
	  res.redirect('/');
	});

	app.use(function (req, res) {
	  res.send('\n    <!doctype html>\n    ' + _server2.default.renderToString(_react2.default.createElement(_html2.default, null)) + '\n  ');
	});

	app.listen(4000, function () {
	  process.stdout.write('\nNow running on port 4000\n');
	});
	/* WEBPACK VAR INJECTION */}.call(exports, "src"))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("cookie-parser");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Html = function (_React$Component) {
	  _inherits(Html, _React$Component);

	  function Html() {
	    _classCallCheck(this, Html);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Html).apply(this, arguments));
	  }

	  _createClass(Html, [{
	    key: "render",
	    value: function render() {
	      return _react2.default.createElement(
	        "html",
	        { lang: "en-us" },
	        _react2.default.createElement(
	          "head",
	          null,
	          _react2.default.createElement("meta", { content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no", name: "viewport" }),
	          _react2.default.createElement("meta", { name: "apple-mobile-web-app-capable", content: "yes" }),
	          _react2.default.createElement("meta", { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" }),
	          _react2.default.createElement("link", { rel: "stylesheet", href: "/css/main.css", media: "screen", charSet: "utf-8" }),
	          _react2.default.createElement("script", { src: "/js/vendor.bundle.js", charSet: "utf-8" })
	        ),
	        _react2.default.createElement(
	          "body",
	          null,
	          _react2.default.createElement("div", { id: "root" }),
	          _react2.default.createElement("script", { src: "/js/bundle.js", charSet: "utf-8" })
	        )
	      );
	    }
	  }]);

	  return Html;
	}(_react2.default.Component);

	exports.default = Html;

/***/ }
/******/ ]);