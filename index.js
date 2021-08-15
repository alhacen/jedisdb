"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var myProxy = {
  get: function get(target, key) {
    if (key === 'state') {
      return target.get();
    } else {
      return undefined;
    }
  },
  set: function set(obj, prop, value) {
    if (prop === 'state') {
      obj.set(value);
      return true;
    }
  }
};

var useJedis = function useJedis(key, defaultValue) {
  if (!window.useJedisStateOBJ) //create jedisObject, if not exist
    window.useJedisStateOBJ = {};
  if (!window.useJedisStateOBJ[key]) //create key, if not exist
    window.useJedisStateOBJ[key] = {
      state: defaultValue,
      setters: []
    };
  var jedisObj = window.useJedisStateOBJ[key];

  var _useState = (0, _react.useState)(jedisObj.state),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setKey = _useState2[1]; //create hook instance


  (0, _react.useEffect)(function () {
    //add setKey function in setters when compoent mount
    jedisObj.setters.push(setKey);
    return function () {
      //remove setkey when unmount
      jedisObj.setters.splice(jedisObj.setters.indexOf(setKey), 1);
    };
  }, []); //return jedis object

  return new Proxy({
    get: function get() {
      return value;
    },
    set: function set(value) {
      jedisObj.setters.map(function (setter) {
        return setter(value);
      });
      jedisObj.state = value;
    }
  }, myProxy);
};

var jedis = useJedis;
var _default = jedis;
exports["default"] = _default;
