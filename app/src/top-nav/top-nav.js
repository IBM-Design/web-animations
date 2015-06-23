/*
Licensed Materials - Property of IBM

© Copyright IBM Corporation 2015. All Rights Reserved.

This licensed material is licensed under the Apache 2.0 license. http://www.apache.org/licenses/LICENSE-2.0.
*/

var utils = utils || {},
  components = components || {};

(function() {
  document.addEventListener('DOMContentLoaded', function() {
    return new components.Menu(function() {
      var config = {
        $menu: document.getElementById('top-nav')
      };

      return config;
    });
  });
}());
