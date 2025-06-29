//#region TASK 1
class Task1 extends HTMLElement {
    btn_show_more;
    p_more;

    constructor() {
        super();

        // NOTE: this is needed to pass the class as "this" and not the button itself
        this.onButtonShowMorePressed = this.onButtonShowMorePressed.bind(this);
    }

    connectedCallback() {
        this.classList.add("task1");
        this.innerHTML =
            `
            <div class="task1__image-div">
                <img src="./images/person0.jpg" alt="x" class="task1__image">
            </div>
            <div class="task1__text">
                <div>
                    <h1>
                        HANDCRAFTED AND RESPONSIBLY SOURCED
                    </h1>
                    <br>
                    <p>
                        On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain.
                    </p>
                    <br>
                    <button class="task1__button-more">
                        Learn more
                    </button>
                    <p class="task1__paragraph-more" hidden>
                        On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain.
                    </p>
                </div>
            </div>
            `;
        
        // when visible
        var observerVisible = new IntersectionObserver (
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.style.animation = "fadeIn 0.6s forwards";
                    }
                })
            },
            {threshold: 1.0}
        );
        observerVisible.observe(this);

        // when invisible
        const observerInvisible = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        this.style.animation = "";
                        this.style.opacity = "0%";
                    }
                })
            },
            {threshold: 0.0}
        );
        observerInvisible.observe(this);

        // get references to elements
        this.p_more = this.getElementsByClassName("task1__paragraph-more")[0];
        this.btn_show_more = this.getElementsByClassName("task1__button-more")[0];

        // connect show more button to callback
        this.btn_show_more.onclick = this.onButtonShowMorePressed;
    }

    onButtonShowMorePressed() {
        this.btn_show_more.hidden = true;
        this.btn_show_more.style.display = "none";
        this.p_more.hidden = false;
        this.p_more.style.animation = "fadeIn 1.0s forwards, moveUp 0.75s forwards";
    }
}
customElements.define("custom-task1", Task1);
//#endregion

//#region TASK 2
class Task2__Cocktail extends HTMLElement {
    static get observedAttributes() {
        return ['image', 'flavor1visible', 'flavor2visible', 'flavor3visible', 'flavor4visible', 'text'];
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.classList.add("task2__cocktail");
        this.innerHTML =
            `
            <div class="task2__cocktail-crop-container">
                ${this.getAttribute('flavor1visible') == 1 ? '<img src="./images/flavor1.png" alt="x" class="task2__cocktail-flavor task2__cocktail-flavor-top-left">' : ""}
                ${this.getAttribute('flavor2visible') == 1 ? '<img src="./images/flavor2.png" alt="x" class="task2__cocktail-flavor task2__cocktail-flavor-top-right">' : ""}
                ${this.getAttribute('flavor3visible') == 1 ? '<img src="./images/flavor3.png" alt="x" class="task2__cocktail-flavor task2__cocktail-flavor-bottom-left">' : ""}
                ${this.getAttribute('flavor4visible') == 1 ? '<img src="./images/flavor4.png" alt="x" class="task2__cocktail-flavor task2__cocktail-flavor-bottom-right">' : ""}
                <div class="task2__cocktail-crop">
                    <img src="${this.getAttribute('image')}" alt="x" class="task2__cocktail-image">
                </div>
            </div>
            <p class="task2__cocktail-description">SPARKLING TRIPLE CITRUS & MINT COCKTAIL</p>
            `;
    }
}
customElements.define("custom-task2__cocktail", Task2__Cocktail);
//#endregion

//#region TASK 3
class Task3__Swiper extends HTMLDivElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.classList.add("task3__swiper");
        this.innerHTML =
            `
            <div class="swiper-wrapper">
            </div>
            <div class="swiper-button-prev">
                <img src="images/nav.png" alt="L" style="rotate: 180deg;">
            </div>
            <div class="swiper-button-next">
                <img src="images/nav.png" alt="R">
            </div>
            `;
    }

    addSlide(imagePath) {
        this.getElementsByClassName("swiper-wrapper")[0].innerHTML +=
        `
        <div class="swiper-slide">
            <img src="` + imagePath + `" alt="x">
        </div>
        `;
    }
}
customElements.define("custom-task3__swiper", Task3__Swiper, {extends: "div"});
//#endregion

//#region BONUS
class Bonus__Message extends HTMLElement {
    message_div;
    message_p;
    message_img;

    static get observedAttributes() {
        return ['left', 'text'];
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.classList.add("bonus__message");
        this.innerHTML =
            `
            <div class="bonus__message-div">
            <img class="bonus__message-img" src="">
            <p class="bonus__message-p">
            ${this.getAttribute('text')}
            </p>
            </div>
            `;
        
        // get references to elements
        this.message_div = this.getElementsByClassName("bonus__message-div")[0];
        this.message_p = this.getElementsByClassName("bonus__message-p")[0];
        this.message_img = this.getElementsByClassName("bonus__message-img")[0];
        
        // move left or right based on left attribute
        if (this.getAttribute("left") === "1") {
            this.message_div.style.marginLeft = "4px";
            this.message_div.style.backgroundColor = "lightblue";
            this.message_div.style.flexDirection = "row";
            this.message_img.src="./images/bonus_me.png";
        } else {
            this.message_div.style.marginLeft = "auto";
            this.message_div.style.marginRight = "4px";
            this.message_div.style.backgroundColor = "lightgreen";
            this.message_div.style.flexDirection = "row-reverse";
            this.message_img.src="./images/bonus_coi.png";
        }
        
        // when visible
        var observerVisible = new IntersectionObserver (
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.message_div.style.animation = "fadeIn 0.6s forwards, moveUp 0.8s forwards";
                    }
                })
            },
            {threshold: 1.0}
        );
        observerVisible.observe(this);
    }
}
customElements.define("custom-bonus-message", Bonus__Message);
//#endregion