(function() {
    'use strict';
    let windowposition; // variable for current middle of page
    let diveHeight;
    const storyPages = [0, 2000, 4000, 6000, 8000, 9000]; // in diveHeight, not window pos
    let pageIndex = 0;
    const seaOffset = 400; // change later when i know exactly where the "sea level" begins
    const browserHeight = window.innerHeight;//change later to allow for resizing 


    
    /* on scroll, check window height */
    addEventListener('scroll', function (){ 
        windowposition = (window.pageYOffset + window.innerHeight) - seaOffset;
        //console.log(windowposition);

        // calculate "sealevel"
        // for now, it equals window position, (update later)
        calcDiveHeight(windowposition);

        // get current page
        // show overlay if page changes
        getPage(diveHeight);

        // hide overlay after certain height
        //TODO; figure out what height that is
        if (diveHeight > (storyPages[pageIndex]+ 500) || diveHeight < (storyPages[pageIndex]- 500)){
            // console.log("hiding overlay"); // code this later 
        } else {
            // console.log("showing overlay"); // code this later 
        }
        
    });

    // /* event: click fastforward button */
    // getElementById("fastforward").addEventListener('click', fastForward);

    // /* event: click back to top button */
    // getElementById("toTop").addEventListener('click', backtoTop);



    function getPage(windowposition) {
        if (windowposition >= storyPages[pageIndex + 1]) {
            pageIndex++;
            // console.log('scrolling down');
            console.log(pageIndex);

        } else if (pageIndex > 0 && windowposition < storyPages[pageIndex] - 1) {
            pageIndex--;
            // console.log('scrolling up');
            console.log(pageIndex);
        }

    }



    //calcs diveHeght and changes the interface to show the diveHeight :)
    // also if scale changes, changes that interface too :0
    function calcDiveHeight(windowpostion){ 
        diveHeight = windowposition;

        // update dive height in ui

        // update dive height in ui
    }

    /* function, fast forwards to next event */
    function fastForward() {}

    /* function, scrolls back to top */
    function backtoTop() {}




}) ();