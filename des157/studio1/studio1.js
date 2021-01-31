(function(){
    'use strict'


    // event handler captures submission of form
    const myForm = document.querySelector("#myForm");
    const madlib = document.querySelector('#madlib');

    myForm.addEventListener('submit', function(e){
        e.preventDefault();
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
            madlib.innerHTML = 'Please fill out the fields';
        } else { makeMadlib(words); }

    }
    function makeMadlib(wordsArray) { 
        const myText = `here are the values: ${wordsArray[0]}, ${wordsArray[1]}, ${wordsArray[2]}, ${wordsArray[3]}`;
        madlib.innerHTML = myText;

    }

})();