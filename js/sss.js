'use strict';
$(document).ready(function () {
  headerGnb();
  prevnextBtn();
  setImageSlide('#main-visual', 1, true, 3000);
});

// gnb 영역 
$(window).on('resize', function () {
  var windowWidth = $(window).width();
  // if (windowWidth >= 1024) {
  //   $('#header ul.gnb-list > li').removeClass('on');
  //   $('#header div.table-right').removeClass('open');
  // }
  headerGnb();
  prevnextBtn();
  setImageSlide('#main-visual', 1, true, 3000);
});


function headerGnb() {
  $('#header').on('mouseenter focusin', function () {
    $('#header ul.sub').css({
      'height': '200px'
    });
    $(this).addClass('open');
    $('#header span.global').css({
      'opacity': 1
    });
  });

  $('#header').on('mouseleave focusout', function () {
    $('#header ul.sub').css({
      'height': '0px'
    });
    $(this).removeAttr('class');
    $('#header span.global').css({
      'opacity': 0
    });
  });

  $('#header div.language-box').on('mouseenter focusin', function () {
    $('#header div.language-box > ul.language').addClass('on');
  });

  $('#header div.language-box').on('mouseleave', function () {
    $('#header div.language-box > ul.language').removeClass('on');
  });
}

// 스크롤 발생 시 header 고정

$(window).on('scroll', function () {
  // console.log('scroll');
  var scrollTop = $(window).scrollTop();
  if (scrollTop === 0) {
    $('#header').removeClass('on');
    $('#header span.global').css({
      'opacity': 0
    });
  } else {
    $('#header').addClass('on');
    $('#header span.global').css({
      'opacity': 1
    });
    $('#header div.language-box > ul.language').addClass('on');
  }


});



// main-visual prev/next button 작동방법
function prevnextBtn() {
  $('#main-visual > div.container-box > a.next').on('mouseenter', function () {
    $('#main-visual > div.container-box').addClass('arrow-go-r');
  });

  $('#main-visual > div.container-box > a.next').on('mouseleave', function () {
    $('#main-visual > div.container-box').removeClass('arrow-go-r');
  });

  $('#main-visual > div.container-box > a.prev').on('mouseenter', function () {
    $('#main-visual > div.container-box').addClass('arrow-go-l');
  });

  $('#main-visual > div.container-box > a.prev').on('mouseleave', function () {
    $('#main-visual > div.container-box').removeClass('arrow-go-l');
  });
}


// main-visual: 이미지 슬라이드
function setImageSlide(selector, first, status, speed) {
  $(selector).each(function () {
    var $selector = $(this);
    var numSlide = $selector.find('.slide-layers > li').length;
    var slideNow = 0;
    var slidePrev = 0;
    var slideNext = 0;
    var slideFirst = first;
    var timerId = '';
    var timerSpeed = speed;
    var isTimerOn = status;
    var onAnimation = false;

    showSlide(slideFirst);

    $selector.find('.indicator li a').on('click', function () {
      var index = $selector.find('.indicator li').index($(this).parent());
      showSlide(index + 1);
    });

    $selector.find('.slide-layers li a').on('focus', function () {
      var index = $selector.find('.slide-layers li').index($(this).parent());
      $selector.find('div.slide-inner').scrollLeft(0);
      showSlide(index + 1);
    });

    $selector.find('a.prev').on('click', function () {
      showSlide(slidePrev);
    });

    $selector.find('a.next').on('click', function () {
      showSlide(slideNext);
    });


    function startTimer() {
      timerId = setTimeout(function () {
        showSlide(slideNext);
      }, timerSpeed);
      isTimerOn = true;
    }

    function stopTimer() {
      clearTimeout(timerId);
      isTimerOn = false;
    }

    function resetTimer() {
      clearTimeout(timerId);
      if (isTimerOn === true) {
        timerId = setTimeout(function () {
          showSlide(slideNext);
        }, timerSpeed);
      }
    }

    function showSlide(n) {
      if (slideNow === n || onAnimation === true) return false;
      resetTimer();
      if (slideNow === 0) {
        $selector.find('.slide-layers li:eq(' + (n - 1) + ')').addClass('on');
      } else {
        onAnimation = true;
        $selector.find('.slide-layers li:eq(' + (slideNow - 1) + ')').removeClass().addClass('hide').one(
          'animationend',
          function () {
            $(this).removeClass();
            onAnimation = false;
          });
        $selector.find('.slide-layers li:eq(' + (n - 1) + ')').addClass('show');
      }
      $selector.find('.indicator li').removeClass('on');
      $selector.find('.indicator li:eq(' + (n - 1) + ')').addClass('on');
      slideNow = n;
      slidePrev = (n === 1) ? numSlide : (n - 1);
      slideNext = (n === numSlide) ? 1 : (n + 1);

      // 1번 이미지 일 때 텍스트 변화
      if (slideNow === 1) {
        $('#main-visual > div.main-text').addClass('active');
      } else {
        $('#main-visual > div.main-text').removeClass('active');
      }


    }

  });
}

// 처음 상태
$('#spc-brand ul.indicator > li:eq(0)').addClass('on');
$('#spc-brand ul.sub:eq(0)').addClass('on');

//spc-brand: 클릭했을 때 탭 메뉴 바뀌기
$('#spc-brand ul.indicator > li > a').on('click', function () {
  // 클릭했을 때 indicator 변화
  var index = $('#spc-brand ul.indicator > li').index($(this).parent());
  $('#spc-brand ul.indicator > li').removeClass('on');
  $('#spc-brand ul.indicator > li:eq(' + index + ')').addClass('on');

  // 클릭했을 때 sub메뉴 변화
  $('#spc-brand ul.sub').removeClass('on');
  $('#spc-brand ul.sub:eq(' + index + ')').addClass('on');

});

//배너 슬라이드: 예시 spc-brand

var numBanner = $('#spc-brand ul.sub.on > li').length;
// alert(numBanner);
var bannerNow = 0;
var bannerPrev = 0;
var bannerNext = 0;
var offsetLeft = 0;
var widthBox = 0;
var widthBar = 0;
var offsetLeftMin = 0;
var loadCounter = 0;
var throttleCounter = 0;

setStatus();

$('#spc-brand p.control-small > a.prev').on('click', function() {
  showBanner(bannerPrev);
});

$('#spc-brand p.control-small > a.next').on('click', function() {
 showBanner(bannerNext);
});



function setStatus() {
  widthBox = $('#spc-brand div.brand-list').innerWidth();
  widthBar = 0;
  $('#spc-brand .brand-list > ul.sub > li').each(function() {
    widthBar += $(this).outerWidth(true);
  });
  offsetLeftMin = widthBox - widthBar;
  $('#spc-brand ul.sub').css({'width' : (widthBar + 5) + 'px'});
}

function showBanner(n) {
  offsetLeft = -$('#spc-brand ul.sub > li:eq('+ (n - 1) +')').position().left;
  $('#spc-brand ul.sub').css({'left' : offsetLeft + 'px', 'transition': 'left 0.3s'});
  // numBanner = $('#spc-brand ul.sub.on').hasClass('on')

  // 상태정보 저장
  bannerNow = n;
  bannerPrev = (n === 1) ? 1 : (n - 1);
  bannerNext = (n === numBanner) ? numBanner : (n + 1);
}