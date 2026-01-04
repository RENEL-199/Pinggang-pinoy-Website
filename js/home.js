
let currentIndex = 0;
const slides = document.querySelector('.slides');
const totalSlides = slides.children.length;

function showSlide(index) {
  slides.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
  currentIndex++;
  if (currentIndex >= totalSlides) {
    currentIndex = 0; // go back to first image immediately
  }
  showSlide(currentIndex);
}

// Auto-slide every 3 seconds
setInterval(nextSlide, 3000);
