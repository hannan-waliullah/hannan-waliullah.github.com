(function() {
    'use strict';
    let windowposition; // variable for current middle of page
    let diveHeight;
    const storyPages = [0, 2000, 6000, 10000, 20000, 30000, 40000, 44470, 49822, 50044]; // in diveHeight, not window pos
    let convRate = 10;
    let pageIndex = 0;
    const seaOffset = 0; // change later when i know exactly where the "sea level" begins
    const pointerOffset = 163; // idk why this is LOL;
    let interfaceVal = 0;

    /* add offset of windowpos to each item in array*/
    for (let i = 0; i< storyPages.length; i++){
        storyPages[i] += (seaOffset- pointerOffset);
    }



    let pagepercentage;
    let num_animation = 5; /* how ma ny times the animation repeats */

    /* on scroll, check window height */
    window.addEventListener('scroll', function (){ 
        windowposition = (window.pageYOffset)+ pointerOffset;

        // calculate "sealevel"
        calcDiveHeight();

        // see if buttons need to be visible
        showButtons();
    
        // if diveheight > a certain amount, show interface
        if (diveHeight > 80 && interfaceVal == 0){
            showInterface();
        } else if (diveHeight < 80 && interfaceVal == 1) {
            hideInterface();
        }
        // show overlay if page changes
        getPage();
        // display height on sidiebar
        displayHeight();

        // sets scroll property as percentage of page so animation occurs while scrollign
        pagepercentage = window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
        document.body.style.setProperty('--scroll', (pagepercentage* 10% 1)); 
        
    });


    function getPage() {

        if (windowposition >= storyPages[pageIndex + 1]) {
            pageIndex++;

        } else if (pageIndex > 0 && windowposition < storyPages[pageIndex] - 1) {
            pageIndex--;
        }
        document.getElementById('ff').href = `#s${pageIndex+2}`;
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


    /*intro functions: shows  & hides the interface after scrolling certain length */
    function showInterface () {
        const hiddenItems = document.getElementsByClassName("interfaceItems");
        for (let i = 0; i < hiddenItems.length; i++){
            //hiddenItems[i].style.visibility = "visible";
            hiddenItems[i].style.animation = "fade-in 0.3s linear forwards";

        }
        interfaceVal = 1;
    }

    function hideInterface () {
        const hiddenItems = document.getElementsByClassName("interfaceItems");
        for (let i = 0; i < hiddenItems.length; i++){
            hiddenItems[i].style.animation = "fade-out 0.3s linear forwards";
        }
        interfaceVal = 0;  
    }


    /* function hides and shows skip buttons based on location */

    function showButtons () {
        if (windowposition >= storyPages[pageIndex] + 1500  && windowposition <= storyPages[pageIndex+1] - 500  ) {
            document.getElementById("button-container").style.animation = "fade-in 0.3s linear forwards";
            

        } else {
            document.getElementById("button-container").style.animation = "fade-out 0.3s linear forwards";
        }

        // if (pageIndex == storyPages.length - 1) {
        //     document.getElementById("button-container").style.animation = "fade-in 0.3s linear forwards";
        //     document.getElementById("ff").style.visibility = "hidden";
        //     document.getElementById("side-text").innerHTML = "You've reached the bottom. Again?"

        // } else { 
        //     document.getElementById("ff").style.visibility = "visible";
        //     document.getElementById("side-text").innerHTML = "It's a really long journey..."
        // }
    }

    


}) ();