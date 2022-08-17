(function() {
    "use strict";

    // for backlight title
    function onEntry(entry) {
        entry.forEach(change => {
            if (change.isIntersecting) {
                change.target.classList.add('backlight-on');
            } else {
                change.target.classList.remove('backlight-on');
            }
        });
    }
    let observer = new IntersectionObserver(onEntry, {
        threshold: [1]
    });
    let observer_parallax = new IntersectionObserver(onEntry, {
        threshold: [0.9]
    });
    let elements = document.querySelectorAll('.extra-backlight');
    if (elements) {
        for (let elm of elements) {
            if (elm.classList.contains('sc_parallax')) {
                observer_parallax.observe(elm);
            } else {
                observer.observe(elm);
            }
        }
    }

})();