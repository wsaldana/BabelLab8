"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUrlVars = getUrlVars;
exports.getUrlParam = getUrlParam;

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.array.index-of.js");

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars;
}

function getUrlParam(parameter, defaultvalue) {
  var urlparameter = defaultvalue;

  if (window.location.href.indexOf(parameter) > -1) {
    urlparameter = getUrlVars()[parameter];
  }

  return urlparameter;
}