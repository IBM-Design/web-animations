/*
Licensed Materials - Property of IBM

© Copyright IBM Corporation 2015. All Rights Reserved.

This licensed material is licensed under the Apache 2.0 license. http://www.apache.org/licenses/LICENSE-2.0.
*/

var utils = utils || {},
  components = components || {};

(function() {
  var $ = utils.$;

  /**
   *  Generates an HTMLElement for use in injecting into the DOM
   *  @return {SearchDataObject} this (used for chaining methods)
   */
  function build() {
    this.span.appendChild(document.createTextNode(this.text));
    this.li.appendChild(this.span);

    return this;
  }

  /**
   *  Selects element based on Element.prototype.querySelectorAll
   *  @param {String} selector
   *  @param {Element} parent
   *  @return {NodeList} {Element} nodeList
   */
  function placeElementIn(parent) {
    parent.appendChild(this.li);
  }

  /**
   *  Shows or hides elements based on the search text
   *  @param {String} exp
   */
  function test(exp) {
    // hide if the search is blank
    if(exp.test('')) {
      this.setInactive();
      return false;
    }

    // show the element if the search text matches the element text
    if(exp.test(this.text)) {
      this.setActive();
    } else {
      this.setInactive();
    }
  }

  function setActive() {
    this.li.classList.add('matched');
    this.li.setAttribute('tabindex', 0);
    this.span.className = 'enter';
  }

  function setInactive() {
    this.li.classList.remove('matched');
    this.li.setAttribute('tabindex', -1);
    this.span.className = '';
  }

  /**
   *  Holds information about a search query and generates list items
   *  to show or hide based on whether the content matches the query
   *
   *  Usage:
   *  new SearchDataObject(item).build().placeElementIn($resultsContainer);
   *
   *  .build() can be used later to delay building the item
   *  .placeElementIn(HTMLElement) can also be used later to delay placing the elements
   */
  var SearchDataObject = function(text) {
    this.text = text;
    this.li = document.createElement('li');
    this.span = document.createElement('span');

    this.li.setAttribute('role', 'option');
    this.li.setAttribute('tabindex', -1);
    this.li.classList.add('result');

    this.li.addEventListener('keyup', function(e) {
      var $next,
        $previous;

      // Uncomment the next line to disable tab and shift+tab functionality when selecting an option
      // e.preventDefault();

        // up key functionality
        if(utils.keys.up(e)) {
          $previous = this.previousSibling;

          // go to either the previous option, or if you're already on
          // the first option, use the up arrow key to focus on the $toggle
          if($previous.tagName === 'LI' && +$previous.getAttribute('tabindex') !== -1) {
            this.blur();
          } else {
            $previous = $('.search-input')[0];
          }

          if(+$previous.getAttribute('tabindex') !== -1) {
            $previous.focus();
          }
        // down key functionality
        } else if (utils.keys.down(e)) {
          $next = this.nextSibling;

          // we can't go past the last element in the list, or there will be an error
          if($next !== null && $next.getAttribute('tabindex') !== -1) {
            this.blur();
            $next.focus();
          }
        }
    });
  };

  SearchDataObject.prototype = {
    build: build,
    placeElementIn: placeElementIn,
    test: test,
    setActive: setActive,
    setInactive: setInactive
  };

  components.SearchDataObject = SearchDataObject;

  // REVIEW: why do I have this return here?
  return SearchDataObject;
}());
