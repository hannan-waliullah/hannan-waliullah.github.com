(function(){
    'use strict'



    // event handler captures submission of form
    const myForm = document.querySelector("#myForm");
    const madlib = document.querySelector('#storycontainer');

    myForm.addEventListener('submit', function(e){
        e.preventDefault();

        console.log("formsubmitted");
        const formData = document.querySelectorAll("input[type=text]");
        processData(formData);
    });

    function processData(formData) {
        let emptyFields = 0;
        const words = [];
        console.log(formData);
        for (let word of formData) {
            console.log(word);
            if(word.value) {
                words.push(word.value);
                word.value=" ";
            } else { emptyFields++; }
        }

        if (emptyFields > 0) {
            alert('Please fill out the fields');
        } else { 
            makeMadlib(words);
            //opens overlay
            document.querySelector("#overlay").className='showing';
        }

    }

    function makeMadlib(wordsArray) {
        const sentence1 = `<p>You start your journey down the ${wordsArray[0]} trench, off the coast of ${wordsArray[1]}...</p>`
        const sentence2 = `<p>After ${wordsArray[2]} of descent, you see an object glimmering in the distance...</p>`
        const sentence3 = `<p>You've struck treasure! Its a chest, filled with ${wordsArray[3]}...</p>`
        const sentence4 = `<p>You feel ${wordsArray[4]} as you make your journey up to the surface.</p>`

        madlib.innerHTML = sentence1 + sentence2 + sentence3 + sentence4;
    }

    // resets madlib
    document.getElementById("resetbtn").addEventListener('click',function(e){
        e.preventDefault();

        console.log("resetting now");
        // close overlay
        document.querySelector("#overlay").className='hidden';

        // clear out the form;
        const formData = document.querySelectorAll("input[type=text]");
        for (let formval of formData) {
            formval.value= "";
        }
    })


})();
