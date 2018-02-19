$(document).ready(function(){

  $('.performer__img').slick({
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });

  $('.ticket-information__map').slick({
    centerMode: true,
    centerPadding: false,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });

  // $('.close-modal').click(function () {
  //   $('#vote-now').modal({ show: false})
  // })

  $(".rundown__day a").click(function(){
    $('.rundown__day a').removeClass('active');
    $(this).addClass('active');
  });

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
        console.log(imgSize);
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
        background: 'url('+e.target.result+')',
        // 'backgrund-position': 'center'
    });
    $(".join-activity__input-file img, .join-activity__input-file span").css('opacity','0')
  }

  $("#btn-trigger-modal").click(function() {
    $("#modal-thankyou").css({
      'display': 'flex !important'
    })
  })


})
