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
      desc: '# exists 2',
      run: function (env, test) {
        test.assert(env.mod.exists('thingy2'), true);
      }
    },

    {
      desc: '# getCount (3)',
      run: function (env, test) {
        test.assert(env.mod.getCount(), 3);
      }
    },

    {
      desc: '# forEachRecord',
      run: function (env, test) {
        var processed = 0;
        env.mod.forEachRecord(function (obj) {
          processed += 1;
        }).finally(function (count) {
          test.assert(count, processed);
        });
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

    {
      desc: '# addRecord (30000) + getCount',
      run: function (env, test) {
        var currentCount = env.mod.getCount();
        var recordCount = 30000;
        var start = new Date().getTime();
        var _pre  = new Date().getTime();
        for (var i = 0, len = recordCount; i < len; i += 1) {
          env.mod.addRecord({id: 'test' + i});
          if ((i % 1000) === 0) {
            var _post = new Date().getTime();
            test.write('added ' + i + ' records in ' + (_post - _pre) + 'ms');
            _pre  = new Date().getTime();
          }
        }
        var end = new Date().getTime();
        test.write('finished adding ' + recordCount + ' records in ' + (end - start) + 'ms');
        test.write('getCount: ' + env.mod.getCount());
        test.assert(env.mod.getCount(), recordCount + currentCount);
      }
    },

    {
      desc: '# removeRecord (20000)',
      run: function (env, test) {
        var currentCount = env.mod.getCount();
        var recordCount = 20000;
        var start = new Date().getTime();
        var _pre  = new Date().getTime();
        for (var i = 0, len = recordCount; i < len; i += 1) {
          env.mod.removeRecord('test' + (i + 10000));
          if ((i % 1000) === 0) {
            var _post = new Date().getTime();
            test.write('removed ' + i + ' records in ' + (_post - _pre) + 'ms');
            _pre  = new Date().getTime();
          }
        }
        var end = new Date().getTime();
        test.write('finished removing ' + recordCount + ' records in ' + (end - start) + 'ms');
        test.write('getCount: ' + env.mod.getCount());
        test.assert(env.mod.getCount(), currentCount - recordCount);
      }
    },

    {
      desc: '# addRecord (10000) + getCount',
      run: function (env, test) {
        var currentCount = env.mod.getCount();
        var recordCount = 10000;
        var start = new Date().getTime();
        var _pre  = new Date().getTime();
        for (var i = 0, len = recordCount; i < len; i += 1) {
          var result = env.mod.addRecord({id: 'test' + i+9999999});
          if (!result) {
            test.fail('failed added record: ', {id: 'test' + i});
          }
          if ((i % 1000) === 0) {
            var _post = new Date().getTime();
            test.write('added ' + i + ' records in ' + (_post - _pre) + 'ms');
            _pre  = new Date().getTime();
          }
        }
        var end = new Date().getTime();
        test.write('finished adding ' + recordCount + ' records in ' + (end - start) + 'ms');
        test.write('getCount: ' + env.mod.getCount());
        test.assert(env.mod.getCount(), currentCount + recordCount);
      }
    },

    {
      desc: '# forEachRecord',
      run: function (env, test) {
        var processed = 0;
        env.mod.forEachRecord(function (obj) {
          processed += 1;
        }).finally(function (count) {
          test.write('count: ' + count + ' processed: ' + processed);
          test.assert(count, processed);
        });
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
      var Mod = require('./../browser/array-keys.js');
      test.assertTypeAnd(Mod, 'function');
      env.mod = new Mod();
      test.assertType(env.mod, 'object');
    },
    tests: getTests(),
  },
  {
    desc: "basic tests (browserify minified)",
    setup: function (env, test) {
      var Mod = require('./../browser/array-keys.min.js');
      test.assertTypeAnd(Mod, 'function');
      env.mod = new Mod();
      test.assertType(env.mod, 'object');
    },
    tests: getTests(),
  }];
});
