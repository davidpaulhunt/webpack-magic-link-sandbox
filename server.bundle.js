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

	var _bodyParser = __webpack_require__(4);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _cookieParser = __webpack_require__(5);

	var _cookieParser2 = _interopRequireDefault(_cookieParser);

	var _proxy = __webpack_require__(6);

	var _proxy2 = _interopRequireDefault(_proxy);

	var _superagent = __webpack_require__(8);

	var _superagent2 = _interopRequireDefault(_superagent);

	var _react = __webpack_require__(9);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(10);

	var _server2 = _interopRequireDefault(_server);

	var _html = __webpack_require__(11);

	var _html2 = _interopRequireDefault(_html);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = (0, _express2.default)(); /* eslint-disable no-param-reassign */

	var formParser = _bodyParser2.default.urlencoded({ extended: false });

	app.use(formParser);
	app.use((0, _cookieParser2.default)());

	app.use(_express2.default.static(_path2.default.join(__dirname, '..', 'build'))); // Use the build folder first.
	app.use(_express2.default.static(_path2.default.join(__dirname, 'public'))); // Fallback to public.
	app.use(function (req, res, next) {
	  var uid = req.cookies.gouid;
	  var token = req.cookies['gokey-' + uid];
	  req.authentication = {};
	  if (token) {
	    req.authentication.token = token;
	  }
	  req.authentication.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	  next();
	});

	app.use('/api', (0, _proxy2.default)('http://127.0.0.1:4001'));

	app.post('/go/:uid/:token', function (req, res) {
	  _superagent2.default.post('http://127.0.0.1:4001/auth/redeem').send({
	    uid: req.params.uid,
	    token: req.params.token
	  }).set('Accept', 'application/json').end(function (err, authRes) {
	    if (err || !authRes.ok) {
	      res.redirect('/');
	    } else {
	      res.cookie('gouid', authRes.body.user.id);
	      res.cookie('gokey-' + authRes.body.user.id, authRes.body.jwt);
	      res.redirect('/dashboard');
	    }
	  });
	});

	app.get('/signout', function (req, res) {
	  var currentUid = req.cookies.gouid;
	  if (currentUid) {
	    res.clearCookie('gokey-' + currentUid);
	    res.clearCookie('gouid');
	  }
	  res.redirect('/');
	});

	app.use(function (req, res) {
	  res.send('\n    <!doctype html>\n    ' + _server2.default.renderToString(_react2.default.createElement(_html2.default, null)) + '\n  ');
	});

	app.listen(4000, function () {
	  process.stdout.write('\nNow running on port 4000\n');
	});
	/* WEBPACK VAR INJECTION */}.call(exports, "web/src"))

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

	module.exports = require("body-parser");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("cookie-parser");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _httpProxy = __webpack_require__(7);

	var _httpProxy2 = _interopRequireDefault(_httpProxy);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (uri) {
	  var proxy = _httpProxy2.default.createProxyServer({
	    target: uri,
	    prependPath: false,
	    xfwd: true,
	    changeOrigin: true
	  });
	  proxy.on('proxyReq', function (proxyReq, req) {
	    if (req.authentication && req.authentication.token) {
	      proxyReq.setHeader('Authorization', 'Bearer ' + req.authentication.token);
	    }
	  });

	  return function apiProxy(req, res) {
	    proxy.web(req, res);
	  };
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("http-proxy");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("superagent");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(9);

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