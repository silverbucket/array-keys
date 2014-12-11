/*!
 * array-keys
 *   version 1.2.2
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
  this.store = [];
  this.idx = []; // array of identifier strings for quick lookup
}

ArrayKeys.prototype.getIdentifiers = function () {
  var ids = [];
  for (var i = this.store.length - 1; i >= 0; i = i - 1) {
    ids[ids.length] = this.store[i][this.identifier];
  }
  return ids;
};

ArrayKeys.prototype.getRecord = function (id) {
  for (var i = this.store.length - 1; i >= 0; i = i - 1) {
    if (this.store[i][this.identifier] === id) {
      return this.store[i];
    }
  }
  return undefined;
};

ArrayKeys.prototype.exists = function (id) {
  if (this.getIndex(id) >= 0) {
    return true;
  } else {
    return false;
  }
};

// faster than using indexOf
ArrayKeys.prototype.getIndex = function (id) {
  for (var i = this.idx.length - 1; i >= 0; i = i - 1) {
    if (this.idx[i] === id) {
      return i;
    }
  }
  return -1;
};

ArrayKeys.prototype.addRecord = function (record) {
  if (typeof record !== 'object') {
    throw new Error('cannot add non-object records.');
  } else if (!record[this.identifier]) {
    throw new Error('cannot add a record with no `' + this.identifier +
                    '` property specified.');
  }

  this.removeRecord(record[this.identifier]);
  this.idx[this.idx.length] = record[this.identifier];
  this.store[this.store.length] = record;
  return true;
};

ArrayKeys.prototype.removeRecord = function (id) {
  var idx  = this.getIndex(id);
  if (idx < 0) {
    return false;
  }

  var i;
  // start looking for the record at the same point as the idx entry
  for (i = idx; i !== 0; i = i - 1) {
    if (this.store[i][this.identifier] === id) {
      this.store.splice(i, 1);
      this.idx.splice(idx, 1);
      return true;
    }
  }

  // if it was not found, start at the end and break at the idx number
  for (i = this.store.length - 1; i !== idx; i = i - 1) {
    if (this.store[i][this.identifier] === id) {
      this.store.splice(i, 1);
      this.idx.splice(idx, 1);
      return true;
    }
  }
  return false;
};

ArrayKeys.prototype.forEachRecord = function (cb) {
  var count = 0;
  var self = this;
  var finished = function () {};

  setTimeout(function () {
    for (var i = self.store.length - 1; i >= 0; i = i - 1) {
      count += 1;
      cb(self.store[i]);
    }
    finished(count);
  }, 0);

  return {
    finally: function (func) {
      finished = func;
    }
  };
};

ArrayKeys.prototype.getCount = function () {
  return this.store.length;
};

module.exports = ArrayKeys;
