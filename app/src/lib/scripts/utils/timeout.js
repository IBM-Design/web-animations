/*
Licensed Materials - Property of IBM

© Copyright IBM Corporation 2015. All Rights Reserved.

This licensed material is licensed under the Apache 2.0 license. http://www.apache.org/licenses/LICENSE-2.0.
*/

var utils = utils || {};

(function() {
  // based on http://codereview.stackexchange.com/questions/47889/alternative-to-setinterval-and-settimeout
  var timeout = function(callback, delay) {
    var dateNow = Date.now,
      requestAnimation = window.requestAnimationFrame,
      start = dateNow(),
      stop,
      timeoutFn = function() {
        return dateNow() - start < delay ? stop || requestAnimation(timeoutFn) : callback();
      };

    requestAnimation(timeoutFn);

    return {
      clear: function(){
        stop = 1;
      }
    };
  };

  utils.timeout = timeout;
}());
