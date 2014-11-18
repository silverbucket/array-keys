/*!
 * array-keys
 *   version 1.0.0
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


(function () {

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

  if (typeof window === 'object') {
    window.ArrayKeys = ArrayKeys;
  } else if (typeof (define) === 'function' && define.amd) {
    define([], function () { return ArrayKeys; });
  } else {
    try {
      module.exports = ArrayKeys;
    } catch (e) {}
  }

})();
