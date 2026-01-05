function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
}


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


document.querySelectorAll(".footer-title").forEach(title => {
  title.addEventListener("click", () => {
    const section = title.parentElement;

    // Optional: close other sections (accordion behavior)
    document.querySelectorAll(".footer-section").forEach(sec => {
      if (sec !== section) sec.classList.remove("active");
    });

    // Toggle current section
    section.classList.toggle("active");
  });
});

let featuredIndex = 0;

function slideFeatured(direction = 0) {
  const track = document.querySelector('.featured-track');
  const cards = document.querySelectorAll('.featured-card');
  const carousel = document.querySelector('.featured-carousel');

  if (!cards.length) return;

  const cardStyle = getComputedStyle(cards[0]);
  const gap = parseInt(cardStyle.marginRight) || 20;

  const cardWidth = cards[0].offsetWidth + gap;
  const visibleWidth = carousel.offsetWidth;

  const visibleCards = Math.floor(visibleWidth / cardWidth) || 1;
  const maxIndex = Math.max(0, cards.length - visibleCards);

  featuredIndex += direction;
  featuredIndex = Math.max(0, Math.min(featuredIndex, maxIndex));

  track.style.transform = `translateX(${-featuredIndex * cardWidth}px)`;
}

/* Recalculate on resize */
window.addEventListener('resize', () => {
  slideFeatured(0);
});

/* Optional: Touch swipe support */
let startX = 0;

document.querySelector('.featured-carousel')
  .addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

document.querySelector('.featured-carousel')
  .addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      slideFeatured(diff > 0 ? 1 : -1);
    }
  });




