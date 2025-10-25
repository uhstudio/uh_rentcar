// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

// Close menu when link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.textContent = '☰';
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(221, 208, 200, 0.95)';
        nav.style.backdropFilter = 'blur(10px)';
    } else {
        nav.style.background = 'rgba(221, 208, 200, 0.98)';
        nav.style.backdropFilter = 'none';
    }
});

// Auto Image Slider for Hero Section
const slides = document.querySelectorAll('.car-slide');
let currentSlide = 0;
const intervalTime = 4000;

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

let sliderInterval = setInterval(nextSlide, intervalTime);

// Pause slider on hover
const slider = document.querySelector('.car-slider');
slider.addEventListener('mouseenter', () => {
    clearInterval(sliderInterval);
});

slider.addEventListener('mouseleave', () => {
    sliderInterval = setInterval(nextSlide, intervalTime);
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.car-card, .feature-card, .testimonial-card, .contact-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.textContent = '☰';
    }
});

// === Popup Mobil ===
const modal = document.getElementById('carModal');
const modalImg = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalPassengers = document.getElementById('modalPassengers');
const modalBtn = document.getElementById('modalButton');
const closeBtn = document.querySelector('.close');

// buka modal saat klik mobil
document.querySelectorAll('.car-card').forEach(card => {
card.addEventListener('click', (e) => {
    e.preventDefault();

        const img = card.querySelector('img').src;
        const title = card.querySelector('h3').innerText;
        const price = card.querySelector('.car-price').innerText;
        const passengers = card.querySelector('.car-passengers').innerText;

        modalImg.src = img;
        modalTitle.innerText = title;
        modalPrice.innerText = `Harga: ${price}`;
        modalPassengers.innerText = passengers;

            // === WA Link ===
            const nomor = "6289667182588"; // ubah ke nomor kamu
            const pesan = `Halo UH Rent Car, saya ingin memesan ${title} (${price}).`;
            const linkWA = `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;

            // simpan link ke tombol
            modalBtn.onclick = () => {
            window.open(linkWA, "_blank");
            };

            modal.style.display = "block";
     });
});

// tutup modal
closeBtn.onclick = () => (modal.style.display = "none");
window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };