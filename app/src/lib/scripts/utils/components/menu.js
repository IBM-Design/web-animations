/*
Licensed Materials - Property of IBM

© Copyright IBM Corporation 2015. All Rights Reserved.

This licensed material is licensed under the Apache 2.0 license. http://www.apache.org/licenses/LICENSE-2.0.
*/

var components = components || {},
  utils = utils || {};

(function(win) {
  var $ = utils.$,
    each = utils.enumerator.each,
    filter = utils.enumerator.filter,
    timeout = utils.timeout,
    isDescendant = utils.isDescendant,
    activeBarClearTimeout;

  /*
   * Filters out $activeBar from the list
   */
  function notActiveBar(li) {
    return !li.classList.contains('active-bar-horizontal') && !li.classList.contains('active-bar-vertical');
  }

  /**
   *  Hides the $activeBar so that it doesn't slide down on mouseleave
   */
  function stopAnimations() {
    if(this.$activeBar.classList.contains('move')) {
      this.$activeBar.classList.remove('move');
    }

    /**
     * The if-statement is critical, or else when hovering
     * over the navigation menu (but not an item), activeBarClearTimeout
     * is never defined
     */
    if(typeof activeBarClearTimeout !== 'undefined') {
      activeBarClearTimeout.clear();
    }
  }

  /**
   *  Changes the X or Y position of the $activeBar
   */
  function slide(i, $el) {
    /**
     * if-statement is for IE10 so that when hovering
     * over an element [data-active-bar="false"], and then
     * going back to one without that attribute, the bar
     * behaves correctly
     */
    if($el.getAttribute('data-active-bar') !== 'false' && this.turnedOn) {
      // in all browsers, provides X movement
      this.$menu.className = this.direction + ' directional-nav pos-' + i;

      /**
       * The if-statement is critical, or else when moving quickly
       * from one item to another, the class 'move' may stay on
       * even when hovering off of $topNav
       */
      if(this.$activeBar.classList.contains('move') === false) {
        activeBarClearTimeout = timeout(function() {
          this.$activeBar.classList.add('move');
        }.bind(this), 200);
        // this delay is the same as the CSS transition speed
      }
    }
  }

  /**
   *  Selects a link clicked (provides state through CSS class)
   *  Fades in a new title
   */
  function changePage(i, $el) {
    var $parentLi = $el.tagName === 'LI' ? $el : $el.parentNode,
      doesNotLinkToPage = $parentLi.getAttribute('data-page') !== 'false';

    if(doesNotLinkToPage && this.turnedOn) {
      // set some of the aria attributes for accessibility purposes
      $(this.$menu, '[aria-selected="true"]')[0].setAttribute('aria-selected', false);
      $parentLi.setAttribute('aria-selected', true);

      // remove any existing .active classes
      $(this.$menu, '.active')[0].classList.remove('active');

      // make the parent li be .active
      $parentLi.classList.add('active');
    }
  }

  var Menu = function(_config) {
    var config = _config();

    this.direction = config.direction || 'horizontal';
    this.$menu = config.$menu;
    this.turnedOn = this.$menu.getAttribute('data-on') !== 'false';
    this.$menuContainer = $(this.$menu, 'ul')[0];
    this.$menuItems = filter($(this.$menu, 'li'), notActiveBar);
    this.$links = $(this.$menu, 'a');
    this.$activeBar = $('.active-bar-'+this.direction)[0];

    this.$activeBar.setAttribute('tabindex', -1);
    // event listeners

    /**
     * If anywhere outside the navigation menu is clicked,
     * we want to remove all transitions/animations. This is
     * important because when using tab and enter to select a
     * menu item, and then we click outside of the menu, and then
     * tab or click back into the menu, the $activeBar will slide over from
     * its last position (it shouldn't do that; it should 'reset' and then
     * animate up into view, but not slide from its last position).
     *
     * Also, document.activeElement will always be the body or whatever element
     * has a tabindex set on it, so we want to check if the current active element
     * (the one we click on) is a menu item, and if it IS NOT a menu item, then
     * we'll stop animations.
     */
    win.addEventListener('mouseup', function() {
      if(isDescendant(this.$menu, document.activeElement) === false) {
        return this.stopAnimations();
      }
    }.bind(this));

    this.$menu.addEventListener('mouseleave', this.stopAnimations.bind(this));

    /**
     * When transitioning from keyboard interaction to
     * mouse interaction, we have to blur any focus so that
     * the move transitions will work correctly.
     */
    this.$menu.addEventListener('mouseenter', function() {
      each(this.$menuItems, function($li) {
        $li.blur();
      });
    }.bind(this));

    each(this.$menuItems, function($li, i) {
      if(this.turnedOn || $li.hasAttribute('data-icon')) {
        $li.setAttribute('tabindex', 0);
      }
      // be able to provide x and y movement for the $activeBar
      $li.addEventListener('mouseenter', this.slide.bind(this, i, $li));

      $li.addEventListener('keyup', function(e) {
        if(this.turnedOn) {
          // change page on enter key
          if(utils.keys.enter(e)) {
            return this.changePage(i, $li);
          }

          // slide the active bar on tab or shift+tab
          if(utils.keys.tab(e)) {
            return this.slide(i, $li);
          }
        }
      }.bind(this));
    }.bind(this));

    each(this.$links, function($a, i) {
      $a.setAttribute('tabindex', -1);
      $a.addEventListener('click', this.changePage.bind(this, i, $a));
    }.bind(this));

  };

  Menu.prototype = {
    stopAnimations: stopAnimations,
    slide: slide,
    changePage: changePage
  };

  components.Menu = Menu;
})(this);
