---
---

var stftn = {};
stftn.slides = [];
stftn.currentSlide = -1;
{% for slide in site.posts reversed %} stftn.slides.push('/{{ slide.id }}/'); {% endfor %}


// giddy up.
$(function() {
    stftn.init();
});


stftn.init = function() {
    stftn.findPlace();
    stftn.addEventListners();
};


stftn.addEventListners = function() {

    // control slides with keys
    $(document).on( "keypress", function(event){
        event.preventDefault();
        var action = {
            32: stftn.next, //space
            46: stftn.next,
            44: stftn.prev
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


stftn.next = function() {
    stftn.currentSlide++;
    if(stftn.currentSlide >= stftn.slides.length) {
        stftn.currentSlide = stftn.slides.length - 1;
        return;
    }
    stftn.getSlide(stftn.currentSlide);
};


stftn.prev = function() {
    stftn.currentSlide--;
    if(stftn.currentSlide <= -1) {
        stftn.currentSlide = - 1;
        return;
    }
    stftn.getSlide(stftn.currentSlide);
};


// determine our place in the slides array based on the url
stftn.findPlace = function() {
     stftn.currentSlide = stftn.slides.indexOf(window.location.pathname);
};


// display a given slide.
stftn.getSlide = function(i) {
    var url = stftn.slides[i];
    if (history.pushState ) {
        $('.stage').fadeOut(500, function(){
            $('.stage').load(url +' .section', function(){
                $('.stage').fadeIn(200);
            });
        });
        history.pushState(undefined, undefined, url);
    } else {
        window.location.pathname = url;
    }
};

