(function() {

    alert("Hello! Thanks for testing! \n \n In order to best view the experience, please: \n 1. View in Full-width (I cant guarantee it works otherwise) \n 2. Make notes on the interface \n 3. Pay attention to the scrolling interactions  & animations. \n 4. Test out the buttons! \n \n Have fun!");

    'use strict';
    let windowposition; // variable for current middle of page
    let diveHeight;
    const storyPages = [0, 2000, 6000, 10000, 20000, 30000, 40000, 44470, 49822, 50044]; // in diveHeight, not window pos
    let convRate = 10;
    let pageIndex = 0;
    const seaOffset = 0; // change later when i know exactly where the "sea level" begins
    const pointerOffset = 156; // idk why this is LOL;
    const browserHeight = window.innerHeight;//change later to allow for resizing 

    /* add offset of windowpos to each item in array*/
    for (let i = 0; i< storyPages.length; i++){
        storyPages[i] += (seaOffset- pointerOffset);
    }

    console.log(storyPages);


    let pagepercentage;
    let num_animation = 5; /* how ma ny times the animation repeats */

    /* on scroll, check window height */
    window.addEventListener('scroll', function (){ 
        windowposition = (window.pageYOffset)+ pointerOffset;
        //console.log(windowposition);

        // calculate "sealevel"
        // for now, it equals window position, (update later)
        calcDiveHeight();

        // get current page
        // show overlay if page changes
        getPage();
        // display height on sidiebar
        displayHeight();

        // sets scroll property as percentage of page so animation occurs while scrollign
        console.log(window.pageYOffset / (document.body.offsetHeight - window.innerHeight) * 10);
        pagepercentage = window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
        document.body.style.setProperty('--scroll', (pagepercentage* 30% 1)); 

        // hide overlay after certain height
        //TODO; figure out what height that is
        if (diveHeight > (storyPages[pageIndex]+ 500) || diveHeight < (storyPages[pageIndex]- 500 )){
            // console.log("hiding overlay"); // code this later 
        } else {
            // console.log("showing overlay"); // code this later 
        }
        
    });

    /* event: click fastforward button */
    // getElementById("fastforward").addEventListener('click', function(){

    // });

    // /* event: click back to top button */
    // getElementById("toTop").addEventListener('click', backtoTop);



    function getPage() {
        console.log(windowposition);

        if (windowposition >= storyPages[pageIndex + 1]) {
            pageIndex++;

            // console.log('scrolling down');
            console.log(pageIndex);

        } else if (pageIndex > 0 && windowposition < storyPages[pageIndex] - 1) {
            pageIndex--;
            // console.log('scrolling up');
            console.log(pageIndex);
        }
        document.getElementById('ff').href = `#s${pageIndex+2}`;
        console.log(pageIndex)
        console.log(document.getElementById('ff').href );


    }



    //calcs diveHeght and changes the interface to show the diveHeight :)
    // also if scale changes, changes that interface too :0
    function calcDiveHeight(){ 
        if (windowposition <= 20000) {
            diveHeight = windowposition / 10;
            convRate = 10;
        } else if (windowposition < 40000) {
            diveHeight = (2000) + (windowposition - 20000)/ 5;
            convRate = 5;
        } else {
            diveHeight = (6000) + (windowposition - 40000)/ 2;
            convRate = 2;
        }
  
    }


    /* function: displays diveheight on screen */
    function displayHeight () {
        const sealevel = document.getElementById("sea-level");
        sealevel.innerHTML = Math.floor(diveHeight);

        const conv = document.getElementById("conversion-rate");
        conv.innerHTML = convRate;
    }


}) ();