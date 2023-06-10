$(function () {
  // set padding to the boy
  $('body').css('paddingTop', $('.navbar').innerHeight());

  //smoothly scroll
  $('.navbar li a').on('click', function (e) {
    e.preventDefault();
    $('body,html').animate({
      scrollTop: $('#' + $(this).data('scroll')).offset().top + 10
    }, 1000);
  });

  // set active on the <a></a>
  $('.navbar li a').on('click', function () {
    $(this).addClass('active').parent().siblings().find('a').removeClass('active');
  })

  $(window, 'body', 'html').scroll(function () {
    //sync the active section
    $('.block').each(function () {
      if ($(window).scrollTop() > $(this).offset().top) {
        $('.navbar a').removeClass('active');
        $('.navbar li').find('a[data-scroll=' + $(this).attr('id') + ']').addClass('active');
      }
    })

    //Top Button
    if ($(window).scrollTop() >= 500) {
      $('#topBtn').fadeIn();
    } else {
      $('#topBtn').fadeOut();
    }
  });

  $('#topBtn').on('click', function () {
    $('body,html').animate({
      scrollTop: 0
    }, 1000);
  })

  // Start Popup
  $('.popBtn').on('click', function () {
    $($(this).data('pop')).fadeIn();
  })

  $('.popup').on('click', function () {
    $(this).fadeOut();
  })
  $('.close').on('click', function (e) {
    e.preventDefault();
    $(this).parent().parent().fadeOut();
  })

  $('.popup .inner').on('click', function (e) {
    e.stopPropagation();
  })

  // Start Progress
  $('.progress span').each(function () {
    $(this).animate({
      width: $(this).data('prog')
    }, 1500, function () {
      $(this).text($(this).data('prog'));
    })
  });

  // fixed menu
  $('.setting-icon').on('click', function () {
    $(this).toggleClass('show');
    if ($(this).hasClass('show')) {
      $(this).parent().animate({
        left: 0
      }, 500)
    } else {
      $(this).parent().animate({
        left: '-' + $(this).parent().innerWidth()
      }, 500)
    }
  });

  // Set Theme
  $('.theme li').on('click', function () {
    if ($(this).hasClass('dark')) {
      $('.CSS').attr('href', 'CSS/darkTheme.css');
    } else {
      $('.CSS').attr('href', 'CSS/main.css');
    }
  })

  // slider images
  let totalWidth = $('.imgs').innerWidth();
  let numberOfImages = $('.imgs').children().length;
  let MarginOfImages = 5;
  let totalMarginOfImages = MarginOfImages * (numberOfImages - 1);
  let widthOfImg = (totalWidth - totalMarginOfImages) / numberOfImages;
  $('.imgs img').css({
    marginRight: MarginOfImages + 'px',
    width: widthOfImg + 'px'
  })

  $('.imgs img').on('click', function () {
    $(this).addClass('selected').siblings().removeClass('selected');
    $('.main-img img').hide().attr('src', $(this).attr('src')).fadeIn(500);
  })

  $('.angle-right').on('click', function () {
    if ($('.imgs img:last').hasClass('selected')) {
      $('.imgs img').eq(0).click()
    } else {
      $('.imgs .selected').next().click();
    }
  })
  $('.angle-left').on('click', function () {
    if ($('.imgs img:first').hasClass('selected')) {
      $('.imgs img:last').click()
    } else {
      $('.imgs .selected').prev().click();
    }
  })

  // Start Info Cards
  $('.cards-container .card i.more').on('click', function () {
    $(this).toggleClass('fa-minus fa-plus')
    $(this).next().slideToggle(500);
  });

  $('.cards-section>i').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active')
  });

  $('.cards-section i.list-icon').on('click', function () {
    $('.cards-container').addClass('list');
  });

  $('.cards-section i.grip-icon').on('click', function () {
    $('.cards-container').removeClass('list');
  });

  // Start Form

  // remove and set the placeholder on the input
  let placeholder;
  $('[placeholder]').focus(function () {
    placeholder = $(this).attr('placeholder');
    $(this).attr('placeholder', '');
  }).blur(function () {
    $(this).attr('placeholder', placeholder);
  });

  // Set A Star Next a requierd Input
  let reqWidth = $('[required]').innerWidth();
  let divOfInputWidth = $('[required]').parent().innerWidth();
  $('[required]').parent().css({
    position: 'relative',
  })

  $('<span class = "star">*</span>').insertBefore('[required]').css({
    position: 'absolute',
    right: (divOfInputWidth - reqWidth) + 7 + 'px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'red'
  });

  // wrong message if the input is empty
  $('[required]').each(function () {
    $(this).blur(function () {
      if ($(this).val() == '') {
        $(this).next('span').fadeIn().delay(1500).fadeOut();
      }
    })
  });

  // upload file
  $('.file-input').prepend('<span>Upload Your File</span>');
  $('.file-input').append('<i class="fa-solid fa-upload"></i>');
  let fileValue = $(':input[type="file"]').val();
  $(':input[type="file"]').change(function () {
    $(this).prev('span').text($(this).val())
  })

  // to knowing what is the key code
  $('input.keyCode').keyup(function (e) {
    let key = e.keyCode; // or e.which
    $(this).next('span').text(key);
  });

  // to change the placeholder in arabic
  $('input').on('keyup', function () {
    let key = $(this).val().charCodeAt(0);
    if (key > 200) {
      $(this).attr('dir', 'rtl')
    } else {
      $(this).attr('dir', 'ltr')
    }
  })

  // to add tags
  $('input.tags').keyup(function (e) {
    if (e.keyCode == 188) {
      if ($(this).val().charAt(0) == ',') {
        $(this).val('');
      } else {
        if ($('input.tags+div').html() === '') {
          $('input.tags').next('div').append('<span class="tag"><i class="fa fa-times"></i>' + $(this).val().slice(0, -1) + '</span>');
          $('input.tags').val('');
        } else {
          $('input.tags+div span').each(function () {
            if ($(this).text() === $('input.tags').val().slice(0, -1)) {
              $('input.tags').val('')
            }
          })
          if ($(this).val() != '') {
            $('input.tags').next('div').append('<span class="tag"><i class="fa fa-times"></i>' + $(this).val().slice(0, -1) + '</span>');
            $('input.tags').val('');
          }
        }
      }
    }
  });

  // to remove the tag
  $('input.tags+div').on('click', 'i', function () {
    $(this).parent('span').fadeOut('fast', function () {
      $(this).remove()
    })
  });

  // trim paragrph text characters
  function trimText(selector, chars) {
    $(selector).each(function () {
      if ($(this).text().length > chars) {
        let TrimText = $(this).text().slice(chars, -1);
        let trimmed = $(this).text().substring(0, chars);
        let both = trimmed + TrimText;
        $(this).parent().append('<span class="both">' + both + '</span>')
        $(this).html(trimmed + '<span class= "see-more">...see more</span>')
      }
    })
  }

  $('body').on('click', 'span.see-more', function () {
    $(this).parent().next().css('display', 'inline-block');
    $(this).parent().css('display', 'none');
  });

  trimText($('.trimmed-text p'), 100);

  // Start Bounce Effect On Button
  function bounce(element, Top, time) {
    $(element).on('click', function () {
      $(this).animate({
        top: '-=' + Top
      }, time).animate({
        top: '+=' + Top
      }, time)
    })
  }

  bounce('.bounce-btn', 8, 150);

  // Start make all the elements in the same heigth
  let theHighest = 0;
  for (let i = 0; i < $('.same-heigth div').length; i++) {
    if ($('.same-heigth div').eq(i).innerHeight() > theHighest) {
      theHighest = $('.same-heigth div').eq(i).innerHeight();
    }
  }
  $('.same-heigth div').height(theHighest);

  // Start shuffle cards
  let zIndex = 0;
  $('.cards .card').on('click', function () {
    $(this).animate({
      left: '30%',
      top: '50px'
    }, 500, function () {
      zIndex--
      $(this).css('z-index', zIndex)
    }).animate({
      left: '50%',
      top: 0
    }, 500)
  })

  // making ToDo List
  let newTask = $('.new-task');
  $('.todo-form').on('submit', function (e) {
    e.preventDefault();
    if (newTask.val() != '') {
      $('<li>' + newTask.val() + '</li>').appendTo('.todo-list ul');
      newTask.val('');
    }
  });

  $('.todo-list ul').on('click', 'li', function () {
    $(this).css("text-decoration", "line-through").delay(200).fadeOut(200, function () {
      $(this).remove();
    })
  })

  // Start infinite writting
  let content = $('.typer').data('text');
  let contentLength = content.length;
  let n = 0;

  let writting = setInterval(function () {
    if (n != contentLength) {
      $('.typer').html($('.typer').html() + content[n]);
      n++
    } else {
      $('.typer+span').css("display", "none");
      clearInterval(writting);
    }
  }, 200);

  // Start get total price
  let total = 0;
  function totalPrice() {
    $('.container table tr:not(:last-child) td:last-child').each(function () {
      total += +$(this).text();
    });
    $('.the-total').html(total);
  }
  totalPrice();
  // Start Today's Note

  (function repeatNots() {
    $('.today-note ul .active').each(function () {
      if (!$(this).is(':last-child')) {
        $(this).delay(500).fadeOut(1000, function () {
          $(this).removeClass('active').next().fadeIn(1000).addClass('active');
          repeatNots();
        })
      } else {
        $(this).delay(500).fadeOut(400, function () {
          $(this).removeClass('active');
          $('.today-note ul li:first-child').fadeIn(1000).addClass('active');
          repeatNots();
        })
      }
    })
  }());

  //  Start dynamic tabs
  $('.shuffle li').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');
    $($(this).data('content')).addClass('show').siblings().removeClass('show');
  })

  // change the style of tabs
  $('.switch').on('click', function () {
    $('.dynamic-tabs').toggleClass('left-side');
  })

  // Start suggestion box
  let mail = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
  let completedEmail;
  let name;
  $('.email-input').on('keyup', function () {
    name = '';
    let g = $(this).val();
    if (g.includes('@')) {
      g = g.substring(0, g.indexOf("@"));
    }
    if (!$(this).next().is('.email-suggestion')) {
      $('<ul class="email-suggestion"></ul>').insertAfter(this);
    }
    for (let i = 0; i < mail.length; i++) {
      name += '<li>' + g + '@' + mail[i] + '</li>';
    }
    $('.email-suggestion').html(name);
  });

  $('body').on('click', '.email-suggestion li', function () {
    $('.email-input').val($(this).text());
  });
});