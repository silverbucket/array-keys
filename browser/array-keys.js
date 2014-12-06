!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.ArrayKeys=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/*!
 * array-keys
 *   version 1.1.1
 *   http://github.com/silverbucket/array-keys
 *
 * Developed and Maintained by:
 *   Nick Jennings <nick@silverbucket.net> copyright 2014
 *
 * array-keys is released under the LGPL (see LICENSE).
 *
 * You don't have to do anything special to choose one license or the other
 * and you don't have to notify anyone which license you are using.
 * Please see the corresponding license file for details of these licenses.
 * You are free to use, modify and distribute this software, but all copyright
 * information must remain.
 *
 */

function ArrayKeys(p) {
  if (typeof p !== 'object') { p = {}; }
  this.identifier = p.identifier || 'id';
  this.idx = [];
}

ArrayKeys.prototype.getIdentifiers = function () {
  var ids = [];
  for (var i = this.idx.length - 1; i >= 0; i--) {
    ids.push(this.idx[i][this.identifier]);
  }
  return ids;
};

ArrayKeys.prototype.getRecord = function (id) {
  for (var i = this.idx.length - 1; i >= 0; i--) {
    if ('' + this.idx[i][this.identifier] === '' + id) {
      return this.idx[i];
    }
  }
  return undefined;
};

ArrayKeys.prototype.addRecord = function (record) {
  if (typeof record !== 'object') {
    throw new Error('cannot add non-object records.');
  } else if (!record[this.identifier]) {
    throw new Error('cannot add a record with no `' + this.identifier +
                    '` property specified.');
  }
  this.removeRecord(record[this.identifier]);
  this.idx.push(record);
  return true;
};

ArrayKeys.prototype.removeRecord = function (id) {
  for (var i = this.idx.length - 1; i >= 0; i--) {
    if ('' + this.idx[i][this.identifier] === '' + id) {
      this.idx.splice(i, 1);
      return true;
    }
  }
  return false;
};

ArrayKeys.prototype.forEachRecord = function (cb) {
  for (var i = this.idx.length - 1; i >= 0; i--) {
    cb(this.idx[i]);
  }
};

ArrayKeys.prototype.getCount = function () {
  return this.idx.length;
};

module.exports = ArrayKeys;

},{}]},{},[1])
(1)
});