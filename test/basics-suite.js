if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}
define(['require', './../array-keys.js'], function (require, ArrayKeysAMD) {
  var suites = [];

  suites.push({
    desc: "basic tests",
    setup: function (env, test) {
      env.ArrayKeys = require('./../array-keys.js');
      test.assertTypeAnd(env.ArrayKeys, 'function');
      env.ak = new env.ArrayKeys();
      test.assertType(env.ak.addRecord, 'function');
    },
    tests: [
      {
        desc: 'ensure amd module is loaded correctly',
        run: function (env, test) {
          test.assertTypeAnd(ArrayKeysAMD, 'function');
          var amdak = new ArrayKeysAMD();
          test.assertType(amdak.addRecord, 'function');
        }
      },

      {
        desc: '# getRecordIFExists  - with no params returns undefined',
        run: function (env, test) {
          test.assert(env.ak.getRecord('thingy'), undefined);
        }
      },

      {
        desc: '# addRecord',
        run: function (env, test) {
          test.assert(env.ak.addRecord({id:'thingy'}), true);
        }
      },

      {
        desc: '# getRecordIFExists',
        run: function (env, test) {
          test.assert(env.ak.getRecord('thingy'), {id:'thingy'});
        }
      },

      {
        desc: '# addRecord with no identifier',
        run: function (env, test) {
          test.throws(env.ak.addRecord, Error, 'caught thrown exception');
        }
      }
    ]
  });

  return suites;
});
