/*
Licensed Materials - Property of IBM

© Copyright IBM Corporation 2015. All Rights Reserved.

This licensed material is licensed under the Apache 2.0 license. http://www.apache.org/licenses/LICENSE-2.0.
*/

var utils = utils || {},
  Window = Window || {};

(function() {
  var addMultipleListeners = function(_element, _eventsArray, _handler, _useCapture, _handlerArgs) {
    var element,
      eventsArray,
      handler,
      handlerArgs = [],
      useCapture,
      errors = {
        element: 'First arguments must be an HTMLElement or Window object',
        eventsArray: 'Second argument must be an array of strings',
        handler: 'Third argument must be a function',
        useCapture: 'Fourth argument must be a boolean value',
        handlerArgs: 'Fifth argument must be an Array of arguments'
      };

      if(_element instanceof HTMLElement || _element instanceof Window) {
        element = _element;
      } else {
        throw new TypeError(errors.element);
      }

      if(_eventsArray instanceof Array) {
        eventsArray = _eventsArray;
      } else {
        throw new TypeError(errors.eventsArray);
      }

      if(_handlerArgs instanceof Array) {
        handlerArgs = _handlerArgs;
      } else if(typeof _handlerArgs !== 'undefined') {
        throw new TypeError(errors.handlerArgs);
      }

      if(_handler instanceof Function) {
        handler = function(e) {
          _handler.apply(this, [e].concat(handlerArgs));
        };
      } else {
        throw new TypeError(errors.handler);
      }

      if(typeof _useCapture === 'boolean') {
        useCapture = _useCapture;
      } else if(typeof _useCapture !== 'undefined') {
        throw new TypeError(errors.useCapture);
      }

      eventsArray.forEach(function(event) {
        element.addEventListener(event, handler, useCapture);
      });
  };

  utils.addMultipleListeners = addMultipleListeners;
}());
