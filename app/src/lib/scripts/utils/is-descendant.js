/*
Licensed Materials - Property of IBM

© Copyright IBM Corporation 2015. All Rights Reserved.

This licensed material is licensed under the Apache 2.0 license. http://www.apache.org/licenses/LICENSE-2.0.
*/

var Window = Window || {},
  utils = utils || {};

(function() {
  var isDescendant = function(parent, child) {
    var node;

    if(!validType(parent)) {
      throw new TypeError(err('Parent', parent));
    }

    if(!validType(child)) {
      throw new TypeError(err('Child', child));
    }

    node = child.parentNode;

    while (node !== null) {
      if (node === parent) {
        return true;
      }

      node = node.parentNode;
    }

    return false;
  };

  utils.isDescendant = isDescendant;

  /////////////////////////////////////////////////////////////////////

  function validType(element) {
    return element instanceof HTMLElement || element instanceof Window;
  }

  function err(stringName, element) {
    return stringName + ' must be an HTMLElement or Window. It is currently a(n) ' + typeof element;
  }
}());
