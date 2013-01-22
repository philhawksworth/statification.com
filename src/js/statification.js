---
---

var stftn = {};
stftn.slides = [];
stftn.currentSlide = -1;
{% for slide in site.posts reversed %} stftn.slides.push('{{ slide.id }}'); {% endfor %}


// giddy up.
$(function() {
    stftn.init();
});


stftn.init = function() {
    stftn.addEventListners();
};


stftn.addEventListners = function() {

    // control slides with keys
    $(document).on( "keypress", function(event){
        var action = {
            32: stftn.next, //space
            33: stftn.next,
            44: stftn.prev
        };
        console.log("key", event.which);
        if(action[event.which]) {
            action[event.which].call();
        }
    });

    // listen for broswer forwd/back buttons
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


stftn.getSlide = function(i) {

    var url = "/" + stftn.slides[i];
    if (history.pushState ) {
        $('.stage').load(url +' .section');
        history.pushState(undefined, undefined, url);
    } else {
        window.location.pathname = url;
    }

};

