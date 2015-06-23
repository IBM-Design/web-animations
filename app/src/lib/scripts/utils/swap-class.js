/*
Licensed Materials - Property of IBM

© Copyright IBM Corporation 2015. All Rights Reserved.

This licensed material is licensed under the Apache 2.0 license. http://www.apache.org/licenses/LICENSE-2.0.
*/

var utils = utils || [];

(function() {
  /**
   *  Flip-flops two classes
   *  @param {HTMLElement} $el
   *  @param {String} _class
   *  @return {Object}
   *
   *	Usage:
   *	utils.swapClass(document.getElementById('some-element'), 'class1').forClass('class2');
   */
  var swapClass = function($el, _class) {
    $el.classList.remove(_class);

    // chain this method
    return {
      forClass: function(__class) {
        return forClass.call(this, $el, __class);
      }
    };
  };

  /////////////////////////////////////////////////////////////////////

  function forClass($el, _class) {
    $el.classList.add(_class);
  }

  utils.swapClass = swapClass;

}());
