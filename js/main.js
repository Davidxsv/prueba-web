// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        // Close mobile menu after clicking a link
        if (window.innerWidth <= 768) {
            const navLinks = document.querySelector('.nav-links');
            const burger = document.querySelector('.burger');
            navLinks.classList.remove('nav-active');
            burger.classList.remove('toggle');
        }
    });
});

// Mobile navigation toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

// Carousel functionality
function setupCarousel(carouselSelector) {
    const carouselContainer = document.querySelector(carouselSelector);
    if (!carouselContainer) return; // Exit if carousel container not found

    const carouselTrack = carouselContainer.querySelector('.carousel-track');
    const prevButton = carouselContainer.querySelector('.carousel-button.prev');
    const nextButton = carouselContainer.querySelector('.carousel-button.next');
    const items = carouselTrack.children;

    let currentIndex = 0;
    const itemWidth = items[0].offsetWidth + 30; // Item width + margin-right

    function updateCarousel() {
        carouselTrack.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
    }

    prevButton.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1);
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = Math.min(items.length - 1, currentIndex + 1);
        updateCarousel();
    });

    // Optional: Adjust carousel on window resize
    window.addEventListener('resize', () => {
        // Recalculate itemWidth if needed, or reset currentIndex to 0 for simplicity
        // For a more robust solution, you'd recalculate visible items and adjust currentIndex
        currentIndex = 0;
        updateCarousel();
    });
}

// Setup carousels for Services and Productos sections
setupCarousel('#services .carousel-container');
setupCarousel('#productos .carousel-container');