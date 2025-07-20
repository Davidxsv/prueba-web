// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a, .hero-buttons a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }

        // Close mobile menu after clicking a link
        if (window.innerWidth <= 768) {
            const navLinks = document.querySelector('.nav-links');
            const burger = document.querySelector('.burger');
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
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
    if (!carouselContainer) return;

    const carouselTrack = carouselContainer.querySelector('.carousel-track');
    const prevButton = carouselContainer.querySelector('.carousel-button.prev');
    const nextButton = carouselContainer.querySelector('.carousel-button.next');
    const items = carouselTrack.children;

    let currentIndex = 0;
    let itemWidth = 0;
    let visibleItems = 1;

    function calculateDimensions() {
        const screenWidth = window.innerWidth;
        if (screenWidth > 1024) {
            visibleItems = 3;
        } else if (screenWidth > 768) {
            visibleItems = 2;
        } else {
            visibleItems = 1; // Mobile will use native scroll
        }

        if (items.length > 0) {
            // Calculation based on container width and visible items
            itemWidth = carouselContainer.offsetWidth / visibleItems;
        }
        updateCarousel(false); // Update without animation on resize
    }

    function updateCarousel(animate = true) {
        if (window.innerWidth <= 768) {
            carouselTrack.style.transform = 'translateX(0px)';
            return; // Disable transform-based carousel on mobile
        }

        const maxIndex = Math.max(0, items.length - visibleItems);
        currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));

        const offset = -currentIndex * itemWidth;
        carouselTrack.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
        carouselTrack.style.transform = `translateX(${offset}px)`;
    }

    prevButton.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1);
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        const maxIndex = Math.max(0, items.length - visibleItems);
        currentIndex = Math.min(maxIndex, currentIndex + 1);
        updateCarousel();
    });

    window.addEventListener('resize', calculateDimensions);

    // Initial setup
    calculateDimensions();
}

// Setup carousels only on non-mobile devices
if (window.innerWidth > 768) {
    setupCarousel('#services .carousel-container');
    setupCarousel('#productos .carousel-container');
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        // Re-initialize carousels if moving from mobile to desktop
        if (!document.querySelector('#services .carousel-container')._carouselInitialized) {
            setupCarousel('#services .carousel-container');
            document.querySelector('#services .carousel-container')._carouselInitialized = true;
        }
        if (!document.querySelector('#productos .carousel-container')._carouselInitialized) {
            setupCarousel('#productos .carousel-container');
            document.querySelector('#productos .carousel-container')._carouselInitialized = true;
        }
    } else {
        // Optional: Add cleanup logic if needed when switching to mobile
        const servicesCarousel = document.querySelector('#services .carousel-container');
        const productosCarousel = document.querySelector('#productos .carousel-container');
        if (servicesCarousel && servicesCarousel._carouselInitialized) {
            servicesCarousel._carouselInitialized = false;
        }
        if (productosCarousel && productosCarousel._carouselInitialized) {
            productosCarousel._carouselInitialized = false;
        }
    }
});


// Animate elements on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

// Observe all sections that need animation
document.querySelectorAll('.section, .about-content > div, .service-item, .producto-item').forEach(el => {
    observer.observe(el);
});
