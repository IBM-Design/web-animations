/*
Licensed Materials - Property of IBM

© Copyright IBM Corporation 2015. All Rights Reserved.

This licensed material is licensed under the Apache 2.0 license. http://www.apache.org/licenses/LICENSE-2.0.
*/

var utils = utils || {};

(function() {
  var $ = utils.$,
    addMultipleListeners = utils.addMultipleListeners,
    $popout = $('#random-info'),
    $title = $($popout, 'h1')[0],
    $infoContainer = $('.information-container')[0],
    $show = $('[data-show]')[0],
    $hide = $('[data-hide]')[0];

  function show(e) {
    if(e.type === 'mouseup' || utils.keys.enter(e)) {
      $infoContainer.classList.remove('closed');
      $infoContainer.focus();
      $title.setAttribute('aria-expanded', true);
      tabbable(true);
    }
  }

  function hide(e) {
    if(e.type === 'mouseup' || utils.keys.esc(e) || utils.keys.enter(e)) {
      $infoContainer.classList.add('closed');
      $title.setAttribute('aria-expanded', false);
      $title.focus();

      tabbable(false);
    }
  }

  function tabbable(_bool) {
    var bool = _bool === true ? 0 : -1;

    $infoContainer.setAttribute('tabindex', bool);
    $($infoContainer, 'button')[0].setAttribute('tabindex', bool);
  }

  var popout = {
    show: show,
    hide: hide
  };

  $title.setAttribute('tabindex', 0);
  tabbable(true);

  $infoContainer.addEventListener('keyup', popout.hide);
  addMultipleListeners($show, ['mouseup', 'keyup'], popout.show);
  addMultipleListeners($hide, ['mouseup', 'keyup'], popout.hide);
}());
