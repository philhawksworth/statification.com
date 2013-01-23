---
---

/*
    Define our global, and slide deck
*/
var stftn = {};
stftn.slides = [];
stftn.currentSlide = -1;
{% for slide in site.posts reversed %} stftn.slides.push('/{{ slide.id }}/'); {% endfor %}


/*
    Ready? Giddy up!
*/
$(function() {
    stftn.init();
});


/*
    Set everything up.
*/
stftn.init = function() {
    stftn.findPlace();
    stftn.addEventListners();
};


/*
    Create event handlers.
*/
stftn.addEventListners = function() {

    // control slides with keys
    $(document).on( "keydown", function(event){
        event.preventDefault();
        var action = {
            32: stftn.next, //space
            39: stftn.next, //right arrow
            37: stftn.prev, //left arrow
            38: stftn.prev  //up arrow
        };

        console.log("key", event.which);
        if(action[event.which]) {
            action[event.which].call();
        }
    });

    // listen for browser forwd/back buttons
    window.onpopstate = function(event){
        var url = window.location.pathname;
        $('.stage').load(url +' .section');
    };
};


/*
    Advance the slide presentation
*/
stftn.next = function() {
    stftn.currentSlide++;
    if(stftn.currentSlide >= stftn.slides.length) {
        stftn.currentSlide = stftn.slides.length - 1;
        return;
    }
    stftn.getSlide(stftn.currentSlide);
};


/*
    Regress the slide presentation
*/
stftn.prev = function() {
    stftn.currentSlide--;
    if(stftn.currentSlide <= -1) {
        stftn.currentSlide = - 1;
        return;
    }
    stftn.getSlide(stftn.currentSlide);
};


/*
    determine our place in the slides array based on the url
*/
stftn.findPlace = function() {
     stftn.currentSlide = stftn.slides.indexOf(window.location.pathname);
};


/*
    display a given slide.
*/
stftn.getSlide = function(i) {
    var url = stftn.slides[i];
    if (history.pushState ) {
        $('.stage').fadeOut(300, function(){
            $('.stage').load(url +' .section', function(){
                $('.stage').fadeIn(100);
            });
        });
        history.pushState(undefined, undefined, url);
    } else {
        window.location.pathname = url;
    }
};

