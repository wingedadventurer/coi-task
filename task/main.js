var btn_toggle_slides = document.getElementsByClassName("task3__button-toggle-slides")[0];
btn_toggle_slides.onclick = onButtonToggleSlidesPressed;

var swiper = null;

document.addEventListener("DOMContentLoaded", onDOMContentLoaded);

function onButtonToggleSlidesPressed() {
    if (swiper != null) {
        // destroy swiper
        swiper.destroy();
        swiper = null;

        // destroy HTML element
        var task3 = document.getElementsByClassName("task3")[0];
        var e = task3.querySelector(".task3__swiper");
        task3.removeChild(e);
    } else {
        // add HTML element
        var task3 = document.getElementsByClassName("task3")[0];
        // NOTE: i tried making custom element but then styling breaks when it's not a div, so it's like this
        task3.innerHTML +=
            `
            <div is="custom-task3__swiper"></div>
            `;

        // add slides
        var task3Swiper = document.getElementsByClassName("task3__swiper")[0];
        task3Swiper.addSlide("images/person1.jpg");
        task3Swiper.addSlide("images/person2.jpg");
        task3Swiper.addSlide("images/person3.jpg");
        task3Swiper.addSlide("images/person4.jpg");

        // initialize swiper
        swiper = new Swiper('.task3__swiper', {
            slidesPerView: "auto",
            spaceBetween: 8,
            
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
        swiper.on("slideChange", onSwiperSlideChanged);
    }
}

function onSwiperSlideChanged() {
    // NOTE: this doesn't really print last N slides if carousel reaches the end, hope that's ok
    console.log("current swiper slide = " + swiper.activeIndex);
}

function onDOMContentLoaded() {
    
}
