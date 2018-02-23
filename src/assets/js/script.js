$(document).ready(function(){

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

})
