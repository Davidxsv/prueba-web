document.addEventListener('DOMContentLoaded', () => {

    // --- ANIMACIÓN DE CUBOS EN CANVAS ---
    const canvas = document.getElementById('cubic-animation-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        const particleConfig = {
            count: 50, // Número de partículas
            minSize: 5,
            maxSize: 20,
            minSpeed: 0.1,
            maxSpeed: 0.5,
            color: 'rgba(255, 255, 255, 0.1)' // Color de las partículas
        };

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * (particleConfig.maxSize - particleConfig.minSize) + particleConfig.minSize;
                this.vx = (Math.random() - 0.5) * (particleConfig.maxSpeed - particleConfig.minSpeed) + particleConfig.minSpeed;
                this.vy = (Math.random() - 0.5) * (particleConfig.maxSpeed - particleConfig.minSpeed) + particleConfig.minSpeed;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                ctx.fillStyle = particleConfig.color;
                ctx.fillRect(this.x, this.y, this.size, this.size);
            }
        }

        function init() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            particles = [];
            for (let i = 0; i < particleConfig.count; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', init);

        init();
        animate();
    }

    // --- ANIMACIÓN DE SCROLL CON INTERSECTION OBSERVER ---
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('services-grid') || entry.target.classList.contains('projects-grid') || entry.target.classList.contains('social-links-grid')) {
                    const cards = entry.target.children;
                    Array.from(cards).forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('is-visible');
                        }, index * 150);
                    });
                } else {
                    entry.target.classList.add('is-visible');
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    const animatedElements = document.querySelectorAll('.fade-in, .about-description');
    animatedElements.forEach(element => observer.observe(element));

    const animatedGrids = document.querySelectorAll('.services-grid, .projects-grid, .social-links-grid');
    animatedGrids.forEach(grid => observer.observe(grid));

});
