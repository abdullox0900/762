// ==========================================================================
// GALLERY SLIDER
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
    const gallerySwiper = new Swiper('.gallery-swiper', {
        slidesPerView: 2,
        spaceBetween: 24,
        slidesPerGroup: 1,
        centeredSlides: false,
        loop: true,
        speed: 800,

        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },

        effect: 'slide',

        navigation: {
            nextEl: '.gallery-nav__btn--next',
            prevEl: '.gallery-nav__btn--prev',
        },

        on: {
            slideChange: function() {
                updateCustomPagination(this.realIndex);
            },

            init: function() {
                updateCustomPagination(this.realIndex);
            }
        }
    });

    function updateCustomPagination(activeIndex) {
        const lines = document.querySelectorAll('.gallery-pagination__progress .line');
        lines.forEach((line, index) => {
            line.classList.remove('active');
        });

        // const activeLineIndex = 6 + activeIndex; 
        // if (lines[activeLineIndex] && activeLineIndex < lines.length) {
        //     lines[activeLineIndex].classList.add('active');
        // }

        const numbers = document.querySelectorAll('.gallery-pagination__number');
        const slideNumbers = ['04', '01', '02', '03'];
        numbers.forEach((number, index) => {
            const numberIndex = (activeIndex + index) % slideNumbers.length;
            number.textContent = slideNumbers[numberIndex];

            if (index === 1) {
                number.classList.add('gallery-pagination__number--active');
            } else {
                number.classList.remove('gallery-pagination__number--active');
            }
        });
    }

    const paginationNumbers = document.querySelectorAll('.gallery-pagination__number');
    paginationNumbers.forEach((number, index) => {
        number.addEventListener('click', () => {
            const groupIndex = Math.floor(index / 2);
            const slideIndex = groupIndex * 2;
            gallerySwiper.slideToLoop(slideIndex);
        });
    });

    const swiperContainer = document.querySelector('.gallery-swiper');
    if (swiperContainer) {
        swiperContainer.addEventListener('mouseenter', () => {
            gallerySwiper.autoplay.stop();
        });

        swiperContainer.addEventListener('mouseleave', () => {
            gallerySwiper.autoplay.start();
        });
    }

    // ==========================================================================
    // GALLERY INFO SLIDER
    // ==========================================================================

    const galleryInfoSwiper = new Swiper('.gallery-info-swiper', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        speed: 600,

        navigation: {
            nextEl: '.gallery-info__nav-btn--next',
            prevEl: '.gallery-info__nav-btn--prev',
        },

        effect: 'slide',
    });

    // Gallery Info Button functionality
    const galleryInfoButtons = document.querySelectorAll('.gallery-info__btn');
    galleryInfoButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Remove active from all buttons
            galleryInfoButtons.forEach(btn => btn.classList.remove('gallery-info__btn--active'));
            // Add active to clicked button
            button.classList.add('gallery-info__btn--active');

            // Go to corresponding slide
            galleryInfoSwiper.slideToLoop(index);

            // Update distance text
            const distances = ['50 метров', '250 метров', '300 метров'];
            const distanceElement = document.querySelector('.gallery-info__distance');
            if (distanceElement) {
                distanceElement.textContent = distances[index];
            }
        });
    });

    // ==========================================================================
    // PROMOTIONS SLIDER
    // ==========================================================================

    const promotionsSwiper = new Swiper('.promotions-swiper', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        speed: 800,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },

        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },

        navigation: {
            nextEl: '.promotions-nav__btn--next',
            prevEl: '.promotions-nav__btn--prev',
        },

        on: {
            slideChange: function() {
                updatePromotionsPagination(this.realIndex);
            },

            init: function() {
                updatePromotionsPagination(this.realIndex);
            }
        }
    });

    // Promotions pagination functionality
    function updatePromotionsPagination(activeIndex) {
        const indicators = document.querySelectorAll('.promotions-pagination__indicator');
        indicators.forEach((indicator, index) => {
            if (index === activeIndex) {
                indicator.classList.add('promotions-pagination__indicator--active');
            } else {
                indicator.classList.remove('promotions-pagination__indicator--active');
            }
        });
    }

    // Click events for pagination indicators
    const promotionsIndicators = document.querySelectorAll('.promotions-pagination__indicator');
    promotionsIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            promotionsSwiper.slideToLoop(index);
        });
    });

    // Pause autoplay on hover
    const promotionsContainer = document.querySelector('.promotions-swiper');
    if (promotionsContainer) {
        promotionsContainer.addEventListener('mouseenter', () => {
            promotionsSwiper.autoplay.stop();
        });

        promotionsContainer.addEventListener('mouseleave', () => {
            promotionsSwiper.autoplay.start();
        });
    }
});