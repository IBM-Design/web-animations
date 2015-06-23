/*
Licensed Materials - Property of IBM

© Copyright IBM Corporation 2015. All Rights Reserved.

This licensed material is licensed under the Apache 2.0 license. http://www.apache.org/licenses/LICENSE-2.0.
*/

var utils = utils || {},
    components = components || {};

(function(win) {
    document.addEventListener('DOMContentLoaded', function() {
        // utilities
        var $ = utils.$,
            addMultipleListeners = utils.addMultipleListeners;

        // elements
        var $drawerToggle = $('.nav-drawer-toggler')[0],
            $closeDrawer = $('.close-drawer')[0],
            $drawer = $('.drawer')[0];

        function open(e) {
            if(e.type === 'mouseup' || utils.keys.enter(e)) {
                $drawer.classList.remove('close');
                $drawer.classList.add('open');
                $drawer.focus();
            }
        }

        function close(e) {
            // This check is necessary
            if($drawer.classList.contains('open')) {
                if(e.type === 'mouseup' || utils.keys.esc(e)) {
                    $drawer.classList.remove('open');
                    $drawer.classList.add('close');
                    $drawerToggle.focus();
                }
            }
        }

        var drawer = {
            open: open,
            close: close
        };

        addMultipleListeners($drawerToggle, ['mouseup', 'keydown'], drawer.open.bind(this));

        $closeDrawer.addEventListener('mouseup', drawer.close);
        win.addEventListener('keyup', drawer.close);
    });
})(this);
