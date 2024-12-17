"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _toArray(r) { return _arrayWithHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function isObject(val) {
  return val != null && _typeof(val) === "object" && Array.isArray(val) === false;
}
var State = /*#__PURE__*/function () {
  function State(initState) {
    _classCallCheck(this, State);
    _defineProperty(this, "state", null);
    _defineProperty(this, "handlers", []);
    _defineProperty(this, "toHandlers", {});
    this.state = initState;
    this.getSnapshot = this.getSnapshot.bind(this);
    this.setState = this.setState.bind(this);
    this.getState = this.getState.bind(this);
    this.setValue = this.setValue.bind(this);
    this.getValue = this.getValue.bind(this);
    this.set = this.set.bind(this);
    this.get = this.get.bind(this);
    this._set = this._set.bind(this);
    this.on = this.on.bind(this);
    this.off = this.off.bind(this);
    this._getValue = this._getValue.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.subscribeTo = this.subscribeTo.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.unsubscribeFrom = this.unsubscribeFrom.bind(this);
    this.notify = this.notify.bind(this);
  }
  return _createClass(State, [{
    key: "subscribe",
    value: function subscribe(handlerOrPath, handler) {
      if (typeof handlerOrPath === "string") {
        this.subscribeTo(handlerOrPath, handler);
      } else {
        this.handlers.push(handlerOrPath);
      }
    }
  }, {
    key: "_getValue",
    value: function _getValue(path, state) {
      var keyPath = path.split(".");
      var value = state;
      for (var i = 0; i < keyPath.length; ++i) {
        var key = keyPath[i];
        if (value === null || value === undefined || Array.isArray(value)) {
          return undefined;
        }
        value = value[key];
      }
      return value;
    }
  }, {
    key: "getValue",
    value: function getValue(path) {
      return this._getValue(path, this.getSnapshot());
    }

    /*
     * @desc Set a value to the state (by mutation).
     * @param {Array<string>} keys
     * @param {any} value
     * @param {object} state
     * */
  }, {
    key: "_set",
    value: function _set(keys, value, obj) {
      var _keys = _toArray(keys),
        key = _keys[0],
        keyRest = _keys.slice(1);
      var hasMoreKeys = keyRest.length > 0;
      if (hasMoreKeys) {
        // is a value
        if (!isObject(obj[key])) {
          return _objectSpread(_objectSpread({}, obj), {}, _defineProperty({}, key, this._set(keyRest, value, {})));
        }
        if (isObject(obj[key])) {
          return _objectSpread(_objectSpread({}, obj), {}, _defineProperty({}, key, this._set(keyRest, value, obj[key])));
        }
      }
      if (!hasMoreKeys) {
        obj[key] = value;
        return obj;
      }
    }
  }, {
    key: "set",
    value: function set(pathOrValue, value) {
      return this.setState(pathOrValue, value);
    }

    /*
     * @param {string | undefined} path
     * */
  }, {
    key: "get",
    value: function get(path) {
      if (typeof path === "string") {
        return this.getValue(path);
      }
      return this.getState();
    }

    /*
     * @param {string} path
     * @param {any} value
     * */
  }, {
    key: "setValue",
    value: function setValue(path, value) {
      return this._set(path.split("."), value, this.getState());
    }
  }, {
    key: "subscribeTo",
    value: function subscribeTo(path, handler) {
      if (path in this.toHandlers) {
        this.toHandlers[path].push(handler);
      } else {
        this.toHandlers[path] = [handler];
      }
    }
  }, {
    key: "on",
    value: function on(path, handler) {
      this.subscribeTo(path, handler);
    }
  }, {
    key: "off",
    value: function off(path, handler) {
      this.unsubscribeFrom(path, handler);
    }
  }, {
    key: "unsubscribeFrom",
    value: function unsubscribeFrom(path, handler) {
      if (path in this.toHandlers) {
        this.toHandlers[path] = this.toHandlers[path].filter(function (h) {
          return h !== handler;
        });
        if (this.toHandlers[path].length === 0) {
          delete this.toHandlers[path];
        }
      }
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(handlerOrPath, handler) {
      if (typeof handlerOrPath === "string") {
        return this.unsubscribeFrom(handlerOrPath, handler);
      }
      if (typeof handlerOrPath === "function") {
        this.handlers = this.handlers.filter(function (h) {
          return h !== handlerOrPath;
        });
      }
    }
  }, {
    key: "getSnapshot",
    value: function getSnapshot() {
      return JSON.parse(JSON.stringify(this.state));
    }
  }, {
    key: "getState",
    value: function getState(path) {
      if (typeof path === "string") {
        return this.getValue(path);
      }
      return this.getSnapshot();
    }
  }, {
    key: "notify",
    value: function notify(newState, oldState) {
      var _this = this;
      this.handlers.forEach(function (h) {
        if (!(typeof h === "function")) {
          return;
        }
        h(newState);
      });
      Object.entries(this.toHandlers).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          path = _ref2[0],
          handlers = _ref2[1];
        var oldValue = _this._getValue(path, oldState);
        var newValue = _this._getValue(path, newState);
        if (newValue !== oldValue) {
          handlers.forEach(function (h) {
            return h(newValue, newState);
          });
        }
      });
    }
  }, {
    key: "setState",
    value: function setState(valueOrFunctionOrPath, value) {
      var newState = null;
      var oldState = this.getSnapshot();
      if (typeof valueOrFunctionOrPath === "function") {
        newState = valueOrFunctionOrPath(oldState);
      } else if (typeof valueOrFunctionOrPath === "string") {
        newState = this.setValue(valueOrFunctionOrPath, value);
      } else {
        newState = valueOrFunctionOrPath;
      }
      this.state = newState;
      this.notify(newState, oldState);
    }
  }]);
}();
var _default = exports["default"] = State;
