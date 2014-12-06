function getTests() {
  return [
    {
      desc: 'ensure amd module is loaded correctly',
      run: function (env, test) {
        if (typeof amdMod !== 'undefined') {
          test.assertTypeAnd(amdMod, 'function');
          var amdmod = new amdMod();
          test.assertType(amdmod.addRecord, 'function');
        } else{
          test.done();
        }
      }
    },

    {
      desc: '# getRecordIFExists  - with no params returns undefined',
      run: function (env, test) {
        test.assert(env.mod.getRecord('thingy'), undefined);
      }
    },

    {
      desc: '# addRecord 1',
      run: function (env, test) {
        test.assert(env.mod.addRecord({id:'thingy1'}), true);
      }
    },

    {
      desc: '# getRecordIFExists',
      run: function (env, test) {
        test.assert(env.mod.getRecord('thingy1'), {id:'thingy1'});
      }
    },

    {
      desc: '# addRecord with no identifier',
      run: function (env, test) {
        test.throws(env.mod.addRecord, Error, 'caught thrown exception');
      }
    },

    {
      desc: '# addRecord 2',
      run: function (env, test) {
        test.assert(env.mod.addRecord({id:'thingy2'}), true);
      }
    },

    {
      desc: '# addRecord 3',
      run: function (env, test) {
        test.assert(env.mod.addRecord({id:'thingy3'}), true);
      }
    },

    {
      desc: '# getCount (3)',
      run: function (env, test) {
        test.assert(env.mod.getCount(), 3);
      }
    },

    {
      desc: '# getIndexes',
      run: function (env, test) {
        test.assert(env.mod.getIdentifiers(), ['thingy3', 'thingy2', 'thingy1']);
      }
    },

    {
      desc: '# removeRecord 2',
      run: function (env, test) {
        test.assert(env.mod.removeRecord('thingy2'), true);
      }
    },

    {
      desc: '# getCount (2)',
      run: function (env, test) {
        test.assert(env.mod.getCount(), 2);
      }
    },
  ];
}


if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}
define(['require'], function (require) {
  return [{
    desc: "basic tests",
    setup: function (env, test) {
      var Mod = require('./../array-keys');
      test.assertTypeAnd(Mod, 'function');
      env.mod = new Mod();
      test.assertType(env.mod, 'object');
    },
    tests: getTests(),
  },
  {
    desc: "basic tests (browserify)",
    setup: function (env, test) {
      var Mod = require('./../dist/array-keys.js');
console.log('mod: ', Mod);
      test.assertTypeAnd(Mod, 'function');
      env.mod = new Mod();
      test.assertType(env.mod, 'object');
    },
    tests: getTests(),
  },
  {
    desc: "basic tests (browserify minified)",
    setup: function (env, test) {
      var Mod = require('./../dist/array-keys.min.js');
console.log('mod: ', Mod);
      test.assertTypeAnd(Mod, 'function');
      env.mod = new Mod();
      test.assertType(env.mod, 'object');
    },
    tests: getTests(),
  }];
});
