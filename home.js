const nav = $('.nav-top');
const navBars = $('.nav-bars');
const dishesCards = $('.dishes-list');
const carouselButtonPrev = $('.carousel-btn-prev');
const carouselButtonNext = $('.carousel-btn-next');
const galleryImagesCopy = $('.gallery-image');
const body = $('body');

$(window).scroll(() => {
  const scrollTop = $(window).scrollTop();
  if (scrollTop > 0) {
    nav.addClass('scroll');
  } else {
    nav.removeClass('scroll');
  }
});

navBars.click(() => {
    nav.toggleClass('active');
});

carouselButtonPrev.click(() => {
  dishesCards.each(function () {
    if ($(window).width() < 768) {
      $(this).scrollLeft($(this).scrollLeft() - 0.8 * $(window).width());
    } else {
      $(this).scrollLeft($(this).scrollLeft() - 400);
    }
  });
});

carouselButtonNext.click(() => {
  dishesCards.each(function () {
    $(this).css('scroll-behavior', 'smooth');
    if ($(window).width() < 768) {
      $(this).scrollLeft($(this).scrollLeft() + 0.8 * $(window).width());
    } else {
      $(this).scrollLeft($(this).scrollLeft() + 400);
    }
  });
});

galleryImagesCopy.each(function () {
  $(this).click(() => {
    const finalImage = $(this).clone();
    if($(window).width() < $(window).height()) {
      finalImage.css({
        'width': '90%',
        'height': 'auto',
    });
    } else {
      finalImage.css({
        'height': '90%',
        'width': 'auto',
    });
    }

    const finalDiv = $('<div>').addClass('gallery-container-final').append(finalImage);
    body.append(finalDiv);

    const transitionImage = $(this).clone();
    const rectInital = this.getBoundingClientRect();
    transitionImage.css({
        'position': 'absolute',
        'top': rectInital.top,
        'left': rectInital.left,
        'width': rectInital.width,
        'height': rectInital.height,
        'transition': 'all 0.3s ease-in-out'
    });
    const transitionDiv = $('<div>').addClass('gallery-container-active').append(transitionImage);
    body.append(transitionDiv);
    const rectFinal = finalImage[0].getBoundingClientRect();
    console.log("height of final image: " + rectFinal.height);
    console.log("width of final image: " + rectFinal.width);
    finalDiv.remove();
    setTimeout(() => {
      transitionImage.css({
          'top': rectFinal.top,
          'left': rectFinal.left,
          'width': rectFinal.width,
          'height': rectFinal.height
      });
      transitionDiv.css('opacity', '1');
    }, 20);
    transitionDiv.click(() => {
      const element = $('.gallery-container');
      const elementOffsetTop = element.offset().top;
      const elementHeight = element.outerHeight();
      const viewportHeight = $(window).height();
      const viewportScrollTop = $(window).scrollTop();

      if ((elementOffsetTop + elementHeight) > viewportScrollTop && elementOffsetTop < (viewportScrollTop + viewportHeight)) {
        transitionImage.css({
          'top': rectInital.top,
          'left': rectInital.left,
          'width': rectInital.width,
          'height': rectInital.height
      });
      } else if ( (elementOffsetTop + elementHeight) < viewportScrollTop ) {
        transitionImage.css({
          'top': 0,
          'left': '50%',
          'width': 0,
          'height': 0,
      });
      } else {
        console.log(3);
        transitionImage.css({
          'top': viewportHeight,
          'left': '50%',
          'width': 0,
          'height': 0,
      });
      }
      transitionDiv.css('opacity', '0');
      setTimeout(() => {
        transitionDiv.remove();
      }, 300);
    });
  });
});

