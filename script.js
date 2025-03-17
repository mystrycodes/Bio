// Dark Mode Toggle
document.getElementById("darkModeToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    let content = document.getElementById("darkModeToggle").innerHTML;
    document.querySelector(".hero").classList.toggle("light-mode");
    document.getElementById("darkModeToggle").innerHTML = (content == "🌙" ? "☀️" : "🌙");
});

const carouselInner = document.querySelector('.carousel-inner');
const images = document.querySelectorAll('.carousel-inner img');
const dotsContainer = document.querySelector('.carousel-dots');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let index = 0;
let startX = 0;
let endX = 0;

function createDots() {
    images.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    });
}

function updateDots() {
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function updateButtons() {
    prevButton.style.display = index === 0 ? 'none' : 'block';
    nextButton.style.display = index === images.length - 1 ? 'none' : 'block';
}

function updateCarousel() {
    carouselInner.style.transition = 'transform 0.4s ease-in-out';
    carouselInner.style.transform = `translateX(${-index * 100}%)`;
    updateDots();
    updateButtons();
}

function nextSlide() {
    if (index < images.length - 1) {
        index++;
        updateCarousel();
    }
}

function prevSlide() {
    if (index > 0) {
        index--;
        updateCarousel();
    }
}

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

carouselInner.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

carouselInner.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    if (startX > endX + 50) {
        nextSlide();
    } else if (startX < endX - 50) {
        prevSlide();
    }
});

createDots();
updateButtons();