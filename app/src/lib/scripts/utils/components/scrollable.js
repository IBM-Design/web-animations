/*
Licensed Materials - Property of IBM

© Copyright IBM Corporation 2015. All Rights Reserved.

This licensed material is licensed under the Apache 2.0 license. http://www.apache.org/licenses/LICENSE-2.0.
*/

var components = components || {},
  utils = utils || {};

(function(global) {
  var $ = utils.$;

  function show() {
    var scrollerHeight = this.calculateScrollerHeight();

    // if we need a scrollbar, then style it
    if (scrollerHeight / this.$container.offsetHeight < 1) {
      this.scroll();
      this.$scroller.classList.remove('fade-out');

      this.$scroller.style.height = scrollerHeight + 'px';
    }
  }

  function hide() {
    this.$scroller.classList.add('fade-out');
  }

  function calculateScrollerHeight() {
    // ratio of the portion of the list that's visible by the actual height, including hidden overflow
    var ratio = this.$list.offsetHeight / this.$list.scrollHeight;

    return ratio * this.$list.offsetHeight;
  }

  /**
   * Sets the top position of the scrollbar while scrolling with the scroll wheel on the mouse
   */
  function scroll() {
    var scrollPercentage = this.$list.scrollTop / this.$list.scrollHeight,
    // 5px arbitrary offset so scroll bar doesn't
    // move too far beyond content wrapper bounding box
      topPosition = scrollPercentage * (this.$container.offsetHeight - 40);

    this.$scroller.style.top = topPosition + 'px';
  }

  /**
   * Stores the initial positions of the content and scrollbar
   */
  function startDrag(e) {
    this.position.start = e.pageY;
    this.position.content = this.$list.scrollTop;
    this.dragging = true;
  }

  function stopDrag() {
    this.dragging = false;
  }

  /**
   * Sets the top position of the scrollbar while dragging it (holding down mouse button and moving up and down)
   */
  function dragScroll(e) {
    var mouseDifferential = e.pageY - this.position.start,
      scrollEquivalent = mouseDifferential * (this.$list.scrollHeight / this.$container.offsetHeight);

    if (this.dragging === true) {
      this.$list.scrollTop = this.position.content + scrollEquivalent;
    }
  }

  var Scrollable = function(_config) {
    var config = _config();

    this.$container = config.$container;
    this.$list = $(this.$container, '.dropdown-options > ul')[0];
    this.$scroller = config.$scroller;
    this.dragging = false;
    this.position = {
      content: 0,
      start: 0,
      stop: 0
    };

    this.$scroller.setAttribute('aria-hidden', true);
    this.$scroller.setAttribute('tabindex', -1);
    this.$scroller.addEventListener('mousedown', this.drag.start.bind(this));
    global.addEventListener('mouseup', this.drag.stop.bind(this));
    global.addEventListener('mousemove', this.drag.scroll.bind(this));

    this.$list.addEventListener('scroll', this.scroll.bind(this));
  };

  Scrollable.prototype = {
    show: show,
    hide: hide,
    calculateScrollerHeight: calculateScrollerHeight,
    scroll: scroll,
    drag: {
      start: startDrag,
      stop: stopDrag,
      scroll: dragScroll
    }
  };

  components.Scrollable = Scrollable;
})(this);
