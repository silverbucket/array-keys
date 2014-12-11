# array-keys

[![Build Status](http://img.shields.io/travis/silverbucket/array-keys.svg?style=flat)](http://travis-ci.org/silverbucket/array-keys)
[![Code Climate](http://img.shields.io/codeclimate/github/silverbucket/array-keys.svg?style=flat)](https://codeclimate.com/github/silverbucket/array-keys)
[![license](https://img.shields.io/npm/l/array-keys.svg?style=flat)](https://npmjs.org/package/array-keys)
[![downloads](http://img.shields.io/npm/dm/array-keys.svg?style=flat)](https://npmjs.org/package/array-keys)
[![release](http://img.shields.io/github/release/silverbucket/array-keys.svg?style=flat)](https://github.com/silverbucket/array-keys/releases)

Very simple library to manage array elements using a key instead of array index position. When dealing with very large sets of data all organized in an object reference, if the object structure is changing a lot you can end up with memory leaks and slow performance. In these cases it's better to keep an array of objects instead of and object of objects. The cost of iterating through the array is cheaper than the lack of garbage collection which can occur in large, changing, object hashes.

## environments

Should run in both node.js and browser environments.

## basic usage example

```javascript
var ak = new ArrayKeys({
    identifier: 'key' // defaults to `id`
});

ak.getRecord('myInvalidKey'}); // returns undefined

ak.addRecord({
    key: 'myKey1',
    value: 'hello world!'
}); // returns true

ak.getRecord('myKey1'); // returns { key: 'myKey1', value: 'hello world!' }

ak.addRecord({
    key: 'myKey2',
    value: 'hello space!'
}); // returns true


ak.forEachRecord(function (record) {
    // this function is called once for each record
}).finally(function (count) {
    // function called after the above callback is called for each record
    // count is the total number of records processed
});

ak.getIdentifiers(); // returns ['myKey1', 'myKey2']
```


## credits

Project developed and maintained by [Nick Jennings](http://github.com/silverbucket)

