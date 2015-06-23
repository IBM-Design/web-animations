/*
Licensed Materials - Property of IBM

© Copyright IBM Corporation 2015. All Rights Reserved.

This licensed material is licensed under the Apache 2.0 license. http://www.apache.org/licenses/LICENSE-2.0.
*/

var utils = utils || {};

(function() {
  // checks if the tab key was pressed
  function tab(e) {
    var key = e.keyCode || e.which;

    return key === 9 || key === '9';
  }

  // checks if the enter key was pressed
  function enter(e) {
    var key = e.keyCode || e.which;

    return key === 13 || key === '13';
  }

  // checks if the escape key was pressed
  function esc(e) {
    var key = e.keyCode || e.which;

    return key === 27 || key === '27';
  }

  // checks if the up key was pressed
  function up(e) {
    var key = e.keyCode || e.which;

    return key === 38 || key === '38';
  }

  // checks if the down key was pressed
  function down(e) {
    var key = e.keyCode || e.which;

    return key === 40 || key === '40';
  }

  var keys = {
    enter: enter,
    tab: tab,
    esc: esc,
    up: up,
    down: down
  };

  utils.keys = keys;
}());
