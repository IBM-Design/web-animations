/*
Licensed Materials - Property of IBM

© Copyright IBM Corporation 2015. All Rights Reserved.

This licensed material is licensed under the Apache 2.0 license. http://www.apache.org/licenses/LICENSE-2.0.
*/

var utils = utils || {};

(function() {
  /**
   *	Selects element based on Element.prototype.querySelectorAll
   *  @param {String} selector
   *  @param {Element} parent
   *	@return {NodeList} {Element} nodeList
   */
  var $ = function() {
    var len = arguments.length,
      isLoneId,
      selector,
      parent,
      nodeList;

    // checks if only a selector is passed in
    if(len === 1 && typeof arguments[0] === 'string') {
      selector = arguments[0].trim();
      isLoneId = selector.indexOf('#') === 0 && selector.indexOf(' ') === -1;
      // use querySelector if a single ID string is passed in, e.g. '#some-id', but not '#some-id .some-class'
      // BUG: $('#some-id #some-other-id') will give a NodeList, but you shouldn't select that way anyway
      nodeList = isLoneId ? document.querySelector(selector) : document.querySelectorAll(selector);

      return nodeList;
    // checks if both a selector and parent are passed in
    } else if (len === 2 && typeof arguments[0] !== 'string') {
      selector = arguments[1];
      parent = arguments[0];
      // if parent is a NodeList, select the first element only
      parent = parent.length > 0 ? parent[0] : parent;
      nodeList = Element.prototype.querySelectorAll.call(parent,selector);

      if (selector.indexOf('#') === 0 ) {
        return nodeList[0];
      } else {
        return nodeList;
      }
    }
  };

  // binds this helper function to the global 'utils'
  utils.$ = $;
}());
