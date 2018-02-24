$(document).ready(function(){

  new WOW().init();

  var wd = $(window).width()
  var hg = $(window).height()
  var temp_hg = hg;

  modalLocations()
  videoFunc()

  // var

  $(window).resize(function () {
    wd = $(this).width()
    hg = $(this).height();

    modalLocations()
    videoFunc()
    $('.hero-image').css('height',$(this).height())
  })

  // for handle iphone5
  if (hg <= 584) {
    temp_hg = hg - 30
  }

  $('.hero-image').css('height',temp_hg)

  // $('.close-modal').click(function(){
  // 	$('.video-content')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
  // });

  // for menu
  $('#menu-home').addClass('menu--hidden')

  $(window).scroll(function() {
    if ($(this).scrollTop() >= temp_hg) {
      $('#menu-home').removeClass('menu--hidden')
    }else{
      $('#menu-home').addClass('menu--hidden')
    }
  })

  $('.wrap-bar').click(function () {
    // setTimeout(function () {
      // $('.bar').toggleClass('change');
      $('.menu-mobile').addClass('menu-mobile--show');
      $('body').addClass('no-scroll');
      $('.menu').removeClass('menu--show');
    // }, 0);
  })

  $('.menu-mobile__close').click(function () {
    $('.menu').addClass('menu--show');
    $('.menu-mobile').removeClass('menu-mobile--show');
    $('body').removeClass('no-scroll');
  })

  $('#kuantitas').change(function() {
    var price = $('#price-ticket').val()
    var qty = $(this).val();
    var total = price * qty;
    $('#total-price span').html(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
  })

  $('.see-more').click(function (event) {
    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top - 100
    }, 600);
  });

  $(document).on('click', 'a[href^="index.html#"]', function (event) {
    $('.menu').addClass('menu--show');
    $('.menu-mobile').removeClass('menu-mobile--show');
    $('body').removeClass('no-scroll');
    var ths = $(this.hash)
    var scroll = ths.offset().top
    if (ths[0].id == 'performers') {
      scroll = scroll - 50
      if(wd > 768){
        scroll = scroll - 80
      }
    }else{
      scroll = scroll - 20
    }

    $('html, body').animate({
        scrollTop: scroll
    }, 600);
  });

  $(".rundown__day a").click(function(){
    $('.rundown__day a').removeClass('active');
    $(this).addClass('active');
  });

  $(".upload-file").click(function() {
    $("#upload-struk").click();
  })

  $("#upload-struk").change(function(e){
    console.log(e)
    var file = this.files[0];
    if (typeof file !== "undefined") {
      var imgType = file.type;
      var imgSize = file.size;
      var match = ["image/png","image/jpg","image/jpeg"];

      if (!((imgType == match[0]) || (imgType == match[1]) || (imgType == match[2]) )) {
        return false;
      }else{
        if (imgSize > 1000000) {
        }else{
          readFileUpload(this);
        }
      }
    }
  });

  function videoFunc() {
    if(wd >= 768 && wd <= 992 ){
      videoResponsive(100, 100, 100)
    }else if(wd <= 767){
      videoResponsive(60, 250, 80)
    }else{
      videoResponsive(200, 100, 150)
    }
  }

  function videoResponsive(w, h, l) {
    $('#video-content').css({
      width: wd - w,
      height: hg - h
    })

    $('.modal-video .modal-content .close-modal').css({
      left: wd - l,
      top: '20px'
    })
  }

  function modalLocations() {
    if(wd <= 992 ){
      $('.location__content').attr('data-toggle','modal');
      $('.location__content').attr('data-target','#modal-location');
    }else{
      $('.location__content').removeAttr('data-toggle');
    }
  }

  function readFileUpload(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = imagePreviewFile;
      reader.readAsDataURL(input.files[0]);
    }
  }

  function imagePreviewFile(e) {
    console.log(e)
    $('.upload-file').css({
        backgroundImage: 'url('+e.target.result+')',
    });
    $('.upload-file').html('')
  }

  $(".join-activity__input-file").click(function() {
    $("#input-file").click();
  })

  $("#input-file").change(function(e){
    console.log(e)
    var file = this.files[0];
    if (typeof file !== "undefined") {
      var imgType = file.type;
      var imgSize = file.size;
      var match = ["image/png","image/jpg","image/jpeg"];

      if (!((imgType == match[0]) || (imgType == match[1]) || (imgType == match[2]) )) {
        return false;
      }else{
        if (imgSize > 1000000) {
        }else{
          readFile(this);
        }
      }
    }
  });

  function readFile(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = imagePreview;
      reader.readAsDataURL(input.files[0]);
    }
  }

  function imagePreview(e) {
    console.log(e)
    $('.join-activity__input-file').css({
        backgroundImage: 'url('+e.target.result+')',
    });
    $(".join-activity__input-file img, .join-activity__input-file span").css('opacity','0')
  }
})
