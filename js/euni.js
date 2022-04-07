$(document).ready(function () {
  preventDefaultAnchor();

/*main-visual: image-slide */



// var numSlide = $('#main-visual ul.slide-layers > li').length;
// var slideNow = 0;
// var slideNext = 0;
// var slidePrev = 0;
// var timerId = '';
// var timerSpeed = 2000;

// $('#main-visual ul.indicator > li > a').on('click', function() {
//   var index = $('#main-visual ul.indicator > li').index($(this).parent());
//   showSlide(index + 1);
// });

// $('#main-visual a.prev').on('click', function() {
//   showSlide(slidePrev);
// });

// $('#main-visual a.next').on('click', function() {
//   showSlide(slideNext);
// });

//   function showSlide(n) {
//     if (slideNow === 0) {
//       $('#main-visual .slide-layers > li:eq('+ (n - 1) +')').addClass('on');
//     } else {
//       $('#main-visual .slide-layers > li:eq('+ (slideNow - 1) +')').removeClass().addClass('hide').one('animationed', function() {
//         $(this).removeClass();
//       });
//       $('#main-visual .slide-layers > li:eq('+ (n - 1) +')').addClass('show');
//     }
    
//     $('#main-visual ul.indicator > li').removeClass('on');
//     $('#main-visual ul.indicator > li:eq('+ (n - 1) +')').addClass('on');


//     slideNow = n;
//     slidePrev = (n === 1) ? numSlide : (n - 1);
//     slideNext = (n === numSlide) ? 1 : (n + 1);
//   }
});


function preventDefaultAnchor() {
  $(document).on('click', 'a[href="#"]', function (e) {
    e.preventDefault();
  });
}

$(window).on('resize', function () {
  var windowWidth = $(window).width();
  if (windowWidth >= 1024) {
    $('#header ul.gnb-list > li').removeClass('on');
    $('#header div.table-right').removeClass('open');
  }
});




// 잠시저장





// main-visual


//on 