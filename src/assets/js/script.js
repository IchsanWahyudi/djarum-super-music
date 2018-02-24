$(document).ready(function(){

  new WOW().init();

  var wd = $(window).width();
  var hg = $(window).height()

  modalLocations()
  videoFunc()

  $('.hero-image').css('height',hg)

  $(window).resize(function () {
    console.log('masuk')
    modalLocations()
    videoFunc()
    $('.hero-image').css('height',hg)
  })

  $('#stop-video').click(function(){
    $('.html5-video-player').each(function(){
      $(this).stopVideo();
    });
  });

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
    console.log($('#price-ticket').val())
    var price = $('#price-ticket').val()
    var qty = $(this).val();
    var total = price * qty;
    $('#total-price span').html(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
  })

  $('#menu-home').addClass('menu--hidden')

  $('.see-more').click(function (event) {
      $('html, body').animate({
          scrollTop: $($.attr(this, 'href')).offset().top - 100
      }, 600);
  });

  $(document).on('click', 'a[href^="#"]', function (event) {
    // event.preventDefault();
    console.log('test')

      $('html, body').animate({
          scrollTop: $($.attr(this, 'href')).offset().top -100
      }, 500);
  });

  $(window).scroll(function() {
    if ($(this).scrollTop() >= 760) {
      $('#menu-home').removeClass('menu--hidden')
    }else{
      $('#menu-home').addClass('menu--hidden')
    }
  })

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

  function videoFunc() {
    if(wd >= 768 && wd <= 992 ){
      videoResponsive(100, 100, 100)
    }else if(wd <= 767){
      videoResponsive(60, 250, 80)
    }else{
      videoResponsive(200, 100, 150)
    }
  }

})
