(function () {
    'use strict'


    let currpage = 0;
    let prevpage = 0;
    const myimages = ["cookie1.jpg", "cookie2.jpg", "cookie3.jpg", "cookie4.jpg"];
    const imagebuttons = document.querySelectorAll('.cookieimg');
    const largeimg = document.getElementById("largeimg");
    const dots = document.querySelectorAll(".circle")

    /* method one to change page : scroll */
    const slides = document.querySelectorAll('.cookietext');
    let slideTops = [];
    let pageTop ;

    console.log(currpage);


    // get slide tops 
    resetPagePosition();

    // function changes the image and page number based on scroll position of post
    document.getElementById("pages").addEventListener('scroll', getPage)

    
    // function to get top of each "page"
    function resetPagePosition() {
        slides.forEach(function (slide) {
            slideTops.push((Math.floor(slide.getBoundingClientRect().top)- 8 -(100 * (slideTops.length))) * 10/9);
        });
    
        const pagePosition = window.pageYOffset;
        currpage = 0;
    
        slideTops.forEach(function (post) { if (pagePosition > post) { currpage++; } });

    }

    // functions to change image
    function changePicture(currpage) {

        // if currpage is 0, change to main page by hiding the image
        if (currpage == 0) {
            document.querySelector("#introimg").className = "showing";
            largeimg.className = "hidden";
        } else {
            console.log(currpage);
            // hide intro img (maybe add if statement so this doesn't happen every time)
            document.querySelector("#introimg").className = "hidden";
            largeimg.className = "showing";

            // add image 
            var newSlide = document.createElement('img');
            newSlide.src = `images/${myimages[currpage-1]}`;
            largeimg.className = "showing";
            //newSlide.className = "fadeinimg"; // also add in fadeinimg
            largeimg.appendChild(newSlide);

            if (largeimg.children.length > 2) {
                largeimg.removeChild(largeimg.children[0]);
            }
        }

    }

    //function to go to each page on cookie button click
    imagebuttons.forEach(function(btn){
        btn.addEventListener('click', function(e) {
            switch(this.id) {
                case "cookie1":
                    currpage = 1;
                    prevpage = 0;
                    getPage();
                    break;
        
                case "cookie2":
                    currpage = 2;
                    prevpage = 1;
                    getPage();
                    break; 

                case "cookie3":
                    currpage = 3;
                    prevpage = 2;
                    getPage();
                    break;
                
                case "cookie4":
                    currpage = 4;
                    prevpage = 3;
                    getPage();
                    break;


            }
        });


    });

    document.querySelectorAll(".mainmenubutton").forEach(function(btn) {
        btn.addEventListener('click', function(e){
            console.log("slides", slides.scrollTop);
            document.getElementById("pages").scrollTop = 0;
            currpage = 0;
            getPage();

        })
    });


    // function to get page and change image 
    function getPage() {
        let pageTop = document.getElementById("pages").scrollTop;
        console.log("pagetop:", pageTop);
    

        if(pageTop + 150 >= slideTops[currpage+1]) {
            console.log(pageTop);
            currpage++;
            console.log(`scrolling down ${currpage}`);
        }

        else if(currpage > 0 && pageTop - 150 < slideTops[currpage - 1]) {
            currpage--;
            console.log(`scrolling up ${currpage}`);
        }


        if (currpage != prevpage) {

            changePicture(currpage); //define this function later to change the main pic
            changePageNum(currpage);
            
            prevpage = currpage;
        }

    }

    function changePageNum(currpage) {
        dots.forEach(function(eachDot) {
            eachDot.removeAttribute('id');
        })

        // change color for currpage
        dots[currpage].id = "selected";
    }



})();

