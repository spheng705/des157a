(function () {
    "use strict";
    console.log("reading js");

    const madLibForm = document.querySelector('#madlib-form');
    const overlay = document.querySelector('#overlay');
    const storyText = document.querySelector('#story-text');
    const closeBtn = document.querySelector('#close-btn');

    madLibForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const fname = document.querySelector('#fname').value;
        const adj1 = document.querySelector('#adj1').value;
        const city = document.querySelector('#city').value;
        const adj2 = document.querySelector('#adj2').value;
        const member = document.querySelector('#member').value;
        const verb1 = document.querySelector('#verb1').value;
        const emotion = document.querySelector('#emotion').value;
        const adj3 = document.querySelector('#adj3').value;
        const pNoun = document.querySelector('#p-noun').value;
        const song = document.querySelector('#song').value;
        const verb2 = document.querySelector('#verb2').value;
        const verb3 = document.querySelector('#verb3').value;
        const adj4 = document.querySelector('#adj4').value;
        const uname = document.querySelector('#uname').value;

      
        const fullStory = `Dear <span>${fname}</span>,<br><br>
        I just went to the most <span>${adj1}</span> TWICE concert in <span>${city}</span>! 
        The crowd was <span>${adj2}</span>, and when <span>${member}</span> started <span>${verb1}</span>, 
        I felt totally <span>${emotion}</span>.<br><br>
        The stage was <span>${adj3}</span> with <span>${pNoun}</span> everywhere. 
        During <span>${song}</span>, everyone was <span>${verb2}</span> and <span>${verb3}</span> at once.<br><br>
        I wish you were there because it was seriously the most <span>${adj4}</span> concert ever.<br><br>
        Love,<br><span>${uname}</span>`;

        storyText.innerHTML = fullStory;
        overlay.className = 'showing';
    });

    closeBtn.addEventListener('click', function () {
        overlay.className = 'hidden';
    });
})();