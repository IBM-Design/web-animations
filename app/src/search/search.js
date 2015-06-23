/*
Licensed Materials - Property of IBM

© Copyright IBM Corporation 2015. All Rights Reserved.

This licensed material is licensed under the Apache 2.0 license. http://www.apache.org/licenses/LICENSE-2.0.
*/

var utils = utils || {},
  components = components || {};

(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // utilities
    var $ = utils.$,
      timeout = utils.timeout,
      SearchDataObject = components.SearchDataObject,
      addMultipleListeners = utils.addMultipleListeners,
      clearFlash,
      clearTimeout;

    // elements
    var $searchForm = $('#search'),
      $searchInput = $('.search-input')[0],
      $resultsContainer = $('.results')[0],
      data = ['Item 1','Item 2','Item 3','Item 4','Item 5'],
      dataObj = [],
      $searchContainer = $('.search-container')[0],
      $searchToggle = $('.search-toggler')[0],
      $searchLoader = $('.search-loader')[0];

    function searchToggle(e) {
      var escapedWhileInsideResults = utils.keys.esc(e) && $searchContainer.classList.contains('open');

      if((e.type === 'mouseup') || utils.keys.enter(e) || escapedWhileInsideResults) {
        $searchContainer.classList.toggle('open');

        this.classList.toggle('active');

        $searchInput.focus();

        if($searchContainer.classList.contains('open') === false){
          this.classList.remove('open');
          $searchInput.value = '';
          search(e);
          $('.directional-nav > ul')[0].focus();
        }
      }
    }

    function keepOpen(e) {
      e.preventDefault();
      e.stopPropagation();

      return false;
    }

    function flash() {
      $searchInput.classList.add('flash');
      clearFlash = timeout(function() {
        if(typeof clearFlash !== 'undefined') {
          clearFlash.clear();
        }

        $searchInput.classList.remove('flash');
      }, 1000);
    }

    // in IE10, refreshing page keeps old value and focus; we don't want that
    $searchInput.blur();
    $searchInput.value = '';

    // build each search object
    data.forEach(function(item) {
      var obj = new SearchDataObject(item);

      obj.build().placeElementIn($resultsContainer);

      dataObj.push(obj);
    });

    // toggle the search box
    addMultipleListeners($searchToggle, ['mouseup', 'keyup'], searchToggle);
    $searchContainer.addEventListener('mouseup', keepOpen);
    $searchContainer.addEventListener('keyup', searchToggle);

    // search on keyup
    addMultipleListeners($searchInput, ['keyup', 'search', 'focus'], function(e) {
      var firstResult = $('.results li.matched')[0];
      // call this (the specific key pressed is handled in the search function)
      search(e);

      // highlight the first search result
      // it will quietly fail if there are no results, because
      // the element will exist, but there will be no tabindex
      if(utils.keys.down(e) && typeof firstResult !== 'undefined') {
        if(+firstResult.getAttribute('tabindex') !== -1) {
          firstResult.focus();
        }
      }

      if(e.type === 'focus') {
        flash();
      }
    });

    /////////////////////////////////////////////////////////////////////

    function search(e) {
      var searchTerm,
        numberOfResults,
        query,
        $alert;

      if((!utils.keys.down(e) && !utils.keys.up(e)) || e.type === 'search') {

        searchTerm = new RegExp($searchInput.value, 'i');

        if(typeof clearTimeout !== 'undefined') {
          clearTimeout.clear();
        }

        $searchLoader.classList.add('showing');

        if($searchInput.value.length > 0) {
          $searchForm.className = 'searching';
        } else {
          $searchLoader.classList.remove('showing');
          $searchForm.className = '';
        }

        clearTimeout = timeout(function() {
          $searchLoader.classList.remove('showing');
        }, 700);


        dataObj.forEach(function(o) {
          // this method sets the class of each item to show it or hide it
          o.test(searchTerm);
        });

        if(e.type === 'keyup') {
          numberOfResults = $('#search li.matched').length;
          query = $searchInput.value;

          if(!!$('.number-of-results')[0]) {
            document.body.removeChild($('.number-of-results')[0]);
          }

          $alert = document.createElement('div');
          $alert.className = 'number-of-results';
          $alert.setAttribute('role', 'alert');
          $alert.innerHTML = 'Search for ' + query + ' returned ' + numberOfResults + ' results';

          document.body.appendChild($alert);
        }

      }
    }
  });
}());
