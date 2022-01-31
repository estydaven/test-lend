(function() {
    'use strict';
  
    function backToTop() {
      if (window.pageYOffset > 0) {
        window.scrollBy(0, -80);
        setTimeout(backToTop, 0);
      }
    }
  
    var goTopBtn = document.querySelector('.btn-top');
  
    goTopBtn.addEventListener('click', backToTop);
})();

$('window').ready(function(){
    let stepInput = $('.quest__one input'),
    nextStepBtn = $('.next-step'),
    stepsList, body;
    body = $('body');
    stepsList = $('.quest__one');
    if($.cookie('visited')){
        console.log(true);
        body.addClass('landing').removeClass('login');
    } else {
        console.log(false);
        body.addClass('login').removeClass('landing');
    }
    $('.quest-number__all').html(stepsList.length);
    stepInput.on('change, input', function(){
        if (stepInput.val){
            nextStepBtn.prop('disabled', false);
        }
    })
    nextStepBtn.on('click', function(){
        stepSwitch();
    })

    function stepSwitch(){
        let nextQuest = $('.quest__one_active').next(),
        activeQuest;
        activeQuest = $('.quest__one_active');
        activeQuest.addClass('quest__one_passed').removeClass('quest__one_active');
        nextQuest.addClass('quest__one_active').removeClass('quest__one_hidden');
        $('.quest-number__active').html(nextQuest.data('number'));
        nextStepBtn.prop('disabled', true);
        if (activeQuest.hasClass('quest__one_final')){
            body.removeClass('quest-page').addClass('loading');
            animateProgress();
            $('.wrapper_quest').hide(100);
            setTimeout(openPrice, 2000);
        }
    }
    function openPrice(){
        body.removeClass('loading').addClass('price-land');
    }

    $('.start').on('click', function(){
        body.removeClass('login landing').addClass('quest-page');
    })

    $('.price__inner_offer').on('submit', function(e){
        e.preventDefault();
        $.cookie('price', $('input[name="price"]:checked').val());
        $.cookie('weight', $('input[name="weight"]').val());
        $.cookie('wish', $('input[name="wish"]').val());
        $.cookie('visited', true);
        console.log($.cookie('price'));
        console.log($.cookie('weight'));
        console.log($.cookie('wish'));
        body.removeClass('price-land').addClass('landing');
        $('input[value='+ $.cookie('price') +']').attr('checked', true);
        $('input[value='+ $.cookie('pricee') +']').attr('checked', true);
        
        var weightValue = Number($.cookie("weight"));
        $('input[name=weights]').val(weightValue);
        var wishValue = Number($.cookie("wish"));
        $('input[name=wishs]').val(wishValue);

        var result = (weightValue - wishValue) * 0.25;
        $('input[name=two]').val(Math.round(((weightValue - wishValue) - result + wishValue) * 10) / 10);
        var valueTwo = $('input[name=two]').val();
        var resultTwo = (valueTwo - wishValue) * 0.25;
        $('input[name=three]').val(Math.round(((valueTwo - wishValue) - resultTwo + wishValue) * 10) / 10);
        var valueThree = $('input[name=three]').val();
        var resultThree = (valueThree - wishValue) * 0.25;
        $('input[name=four]').val(Math.round(((valueThree - wishValue) - resultThree + wishValue) * 10) / 10);
    })

    if (!$.cookie('stop-timer')){
        initializeTimer();
    } else {
        $('.timer').hide();
    }
})

function initializeTimer() {

    if (!localStorage.getItem("ever-timer")) {
        var time = {
            hours: 0,
            minutes: 15,
            seconds: 0
        };

        time = time.hours * 3600 + time.minutes * 60 + time.seconds;

        localStorage.setItem("time", time);
        localStorage.setItem("ever-timer", true);
    }

    timerSettings();

}

function timerSettings() {
    var time = localStorage.getItem('time'),
        hours = parseInt(time / 3600, 10),
        minutes = parseInt((time - hours * 3600 ) / 60, 10),
        seconds = parseInt(time % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : "" + minutes;
    seconds = seconds < 10 ? "0" + seconds : "" + seconds;
    hours = hours < 10 ? "0" + hours : "" + hours;

    var hoursHTML = document.getElementsByClassName("hours");
    var minutesHTML = document.getElementsByClassName("minutes");
    var secondsHTML = document.getElementsByClassName("seconds");

    if (--time < 0) {
        localStorage.removeItem("ever-timer");
        initializeTimer();
        return;
    }

    filling(hoursHTML, hours);
    filling(minutesHTML, minutes);
    filling(secondsHTML, seconds);
    
    if (!$.cookie('stop-timer')){
        localStorage.setItem("time", time);
        setTimeout(timerSettings, 1000);
    }

}

function filling(obj, value) {
    for (var i = 0; i < obj.length; i++) {
        obj[i].innerHTML = value;
    }
}

function animateProgress() {
    const progressBars = document.querySelectorAll('.progress-container');

    const animateValue = (selector, start, end, duration) => {
      var obj = selector;
      var range = end - start;
    
      // no timer shorter than 50ms (not really visible any way)
      var minTimer = 50;
      
      // calc step time to show all interediate values
      var stepTime = Math.abs(Math.floor(duration / range));
      
      // never go below minTimer
      stepTime = Math.max(stepTime, minTimer);
      
      // get current time and calculate desired end time
      var startTime = new Date().getTime();
      var endTime = startTime + duration;
      var timer;
    
      function run() {
        var now = new Date().getTime();
        var remaining = Math.max((endTime - now) / duration, 0);
        var value = Math.round(end - remaining * range);
        obj.innerHTML = value + "%";
        if (value == end) {
          clearInterval(timer);
        }
      }
    
      var timer = setInterval(run, stepTime);
      run();
    }
    
    const progress = (value) => {    
      animateValue(valueContainer, 0, dataValue, 1500);
    }
    
    // Iterate over each progress bar
    for (var el of progressBars) {
      var dataValue = el.getAttribute('data-value');
      var valueContainer = el.querySelector('span');
      
      valueContainer.dispatchEvent(new Event('change'));
      progress(dataValue);
    }
}

const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
};

$('.result').slick({
    dots: true,
    arrows: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    prevArrow: '<button type="button" class="result__slider__bottom result__slider__bottom_prev"></button>',
    nextArrow: '<button type="button" class="result__slider__bottom result__slider__bottom_next"></button>',
    dotsClass: 'reviews__slider__dots'
});  
$(window).on('load resize', function() {
    if (window.innerWidth < 651) { 
        $('.advantages').slick({
            dots: true,
            arrows: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true,
            prevArrow: '<button type="button" class="advantages__slider__bottom advantages__slider__bottom_advantage advantages__slider__bottom_prev"></button>',
            nextArrow: '<button type="button" class="advantages__slider__bottom advantages__slider__bottom_advantage advantages__slider__bottom_next"></button>',
            dotsClass: 'reviews__slider__dots'
        });  
        $('.mistakes__inner').slick({
            dots: true,
            arrows: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true,
            prevArrow: '<button type="button" class="advantages__slider__bottom advantages__slider__bottom_prev"></button>',
            nextArrow: '<button type="button" class="advantages__slider__bottom advantages__slider__bottom_next"></button>',
            dotsClass: 'reviews__slider__dots'
        });  
     }
});