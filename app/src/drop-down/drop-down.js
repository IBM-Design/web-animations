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
            each = utils.enumerator.each,
            swapClass = utils.swapClass,
            timeout = utils.timeout,
            addMultipleListeners = utils.addMultipleListeners,
            clearScrollableTimeout,
            Scrollable = components.Scrollable;

        /**
         *  Creates option elements to use for form processing (HTTP requests)
         */
        function populateHiddenForm(_$option) {
            var $option = document.createElement('option');

            $option.value = _$option.id;
            $option.innerHTML = _$option.innerHTML;

            this.elements.$hiddenSelect.appendChild($option);
        }

        /**
         *  Opens and closes the dropdown when you interact with the $toggle area
         */
        function toggle(e) {
            if(e.type === 'mouseup' || utils.keys.enter(e)) {
                if(this.elements.$list.classList.contains('active')) {

                    this.menu.close.call(this);

                } else {

                    this.menu.open.call(this);
                }
            }
        }

        /**
         *  Selects and option and closes the dropdown
         */
        function select(e, $li) {
            var selectedText,
                $previousSelectedElement;

            if(e.type === 'mouseup' || utils.keys.enter(e)) {
                selectedText = $($li, 'span')[0].innerHTML;
                $previousSelectedElement = $(this.elements.$el, '[aria-selected="true"]')[0];

                if(typeof $previousSelectedElement !== 'undefined') {
                    $previousSelectedElement.setAttribute('aria-selected', false);
                }

                $li.setAttribute('aria-selected', true);

                // select a form element for use with HTTP requests
                this.elements.$hiddenSelect.value = $li.id;

                swapClass(this.elements.$toggle, 'show-query').forClass('fade-query');
                this.elements.$toggle.setAttribute('aria-activedescendant', $li.id);

                this.menu.close.call(this, function() {
                    timeout(function(){
                        swapClass(this.elements.$toggle, 'fade-query').forClass('show-query');

                        this.elements.$selected.innerHTML = selectedText;
                    }.bind(this), 300);
                }.bind(this));
            }
        }

        function closeMenu(cb) {
            this.elements.$list.classList.remove('active');
            this.elements.$toggle.classList.remove('open');
            this.elements.$toggle.setAttribute('aria-expanded', false);

            each(this.elements.$options, function($li) {
                $li.setAttribute('tabindex', -1);
            });

            this.scrollable.hide();
            this.elements.$toggle.focus();

            if(cb instanceof Function) {
                return cb();
            }
        }

        function openMenu(cb) {
            var activeDescendant;

            if(typeof clearScrollableTimeout !== 'undefined') {
                clearScrollableTimeout.clear();
            }

            this.elements.$toggle.classList.toggle('open');
            this.elements.$list.classList.add('active');

            clearScrollableTimeout = timeout(function() {
                /**
                 * if-statement necessary to make sure scrollbar
                 * doesn't show on fast open-close because we need
                 * to make sure the $dropDownList is still active
                 * when we decide to show the scrollbar
                 */
                if(this.elements.$list.classList.contains('active')) {
                    each(this.elements.$options, function($li) {
                        $li.setAttribute('tabindex', 0);
                    });

                    this.elements.$toggle.setAttribute('aria-expanded', true);
                    this.scrollable.show();
                    activeDescendant = this.elements.$toggle.getAttribute('aria-activedescendant');

                    if(activeDescendant !== '' && activeDescendant !== null && activeDescendant !== 'undefined') {
                        $('#' + activeDescendant).focus();
                    } else {
                        this.elements.$options[0].focus();
                    }
                }
            }.bind(this), 300);

            if(cb instanceof Function) {
                return cb();
            }
        }

        var dropdown = {
            elements: {
                $el: $('#random-dropdown'),
                $toggle: $('#random-dropdown .dropdown-toggle')[0],
                $selected: $('#random-dropdown .dropdown-selected-option')[0],
                $list: $('#random-dropdown .dropdown-options > ul')[0],
                $options: $('#random-dropdown .dropdown-options > ul li'),
                $hiddenSelect: $('#random-dropdown form.hidden > select')[0]
            },
            scrollable: new Scrollable(function() {
                var config = {
                    $scroller: $('#scroller'),
                    $container: $('#random-dropdown')
                };

                return config;
            }),
            init: function() {
                // Make the $toggle tabbable
                this.elements.$toggle.setAttribute('tabindex', 0);

                // Any SPANs or IMGs inside $toggle should be aria-hidden
                each($(this.elements.$toggle, 'img'), function($el) {
                    $el.setAttribute('aria-hidden', true);
                });

                // We don't want to be able to tab to the UL element, just straight to the $toggle
                this.elements.$list.setAttribute('tabindex', -1);

                // Populat the hidden form so that we can use HTTP requests
                each(this.elements.$options, this.populateHiddenForm.bind(this));

                /**
                 ************************************************************
                 */

                // toggle the menu on enter or click
                addMultipleListeners(this.elements.$toggle, ['mouseup', 'keyup'], this.menu.toggle.bind(this));
                this.elements.$toggle.addEventListener('keyup', function(e) {
                    if(utils.keys.down(e)) {
                        if(this.elements.$list.classList.contains('active')) {
                            this.elements.$options[0].focus();
                        }
                    }
                }.bind(this));

                each(this.elements.$options, function($li, i, $liNodeList) {
                    // set some aria stuff so we don't forget it in the markup
                    $li.setAttribute('role', 'option');
                    $li.setAttribute('aria-selected', false);

                    // select an option on enter key or click
                    addMultipleListeners($li, ['mouseup', 'keyup'], select.bind(this), false, [$li]);

                    // be able to use the up and down arrow keys to select an option
                    $li.addEventListener('keydown', function(e) {
                        var $next,
                            $previous;

                        // Uncomment the next line to disable tab and shift+tab functionality when selecting an option
                        // e.preventDefault();

                        // up key functionality
                        if(utils.keys.up(e)) {
                            $previous = $liNodeList[i - 1];

                            // go to either the previous option, or if you're already on
                            // the first option, use the up arrow key to focus on the $toggle
                            if(typeof $previous !== 'undefined') {
                                $li.blur();
                            } else {
                                $previous = this.elements.$toggle;
                            }

                            $previous.focus();
                        // down key functionality
                        } else if (utils.keys.down(e)) {
                            $next = $liNodeList[i + 1];

                            // we can't go past the last element in the list, or there will be an error
                            if(typeof $next !== 'undefined') {
                                $li.blur();
                                $next.focus();
                            }
                        } else if (utils.keys.esc(e)) {
                            return this.menu.close.call(this);
                        }
                    }.bind(this));
                }.bind(this));
            },
            populateHiddenForm: populateHiddenForm,
            menu: {
                open: openMenu,
                close: closeMenu,
                toggle: toggle,
                select: select
            }
        };

        dropdown.init();
    });
}());
