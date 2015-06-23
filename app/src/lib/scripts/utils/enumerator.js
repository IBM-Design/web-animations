/*
Licensed Materials - Property of IBM

© Copyright IBM Corporation 2015. All Rights Reserved.

This licensed material is licensed under the Apache 2.0 license. http://www.apache.org/licenses/LICENSE-2.0.
*/

var utils = utils || {};

(function() {
  /**
   *  Distillation of [].forEach.call for iterating over NodeLists, etc.
   *  @param {Array-like Object} array
   *  @param {Function} fn
   */
  function each(array, fn) {
    return [].forEach.call(array, fn);
  }

  function filter(array, fn) {
    return [].filter.call(array, fn);
  }

  var enumerator = {
    each: each,
    filter: filter
  };

  // binds this helper function to the global 'utils'
  utils.enumerator = enumerator;
}());
