document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Toggle hamburger animation
        const bars = document.querySelectorAll('.bar');
        if (navMenu.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                mobileMenu.click();
            }
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sticky navigation on scroll
    const navbar = document.getElementById('navbar');
    const sticky = navbar.offsetTop;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= sticky) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });
    
    // WhatsApp form submission
    const prayerForm = document.getElementById('prayer-form');
    
    prayerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const prayer = document.getElementById('prayer').value;
        
        // Format the message for WhatsApp
        const message = `Hola, soy ${name}. Mi motivo de oración es: ${prayer}`;
        
        // Create WhatsApp URL - this assumes the church has a WhatsApp number
        // Replace the placeholder number with the actual church WhatsApp number
        const churchPhone = "+5491112345678"; // Replace with actual number
        const whatsappURL = `https://wa.me/${churchPhone}?text=${encodeURIComponent(message)}`;
        
        // Open WhatsApp in a new tab
        window.open(whatsappURL, '_blank');
        
        // Reset the form
        prayerForm.reset();
    });
    
    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section-title, .pastor-image, .gallery-item, .contact-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Call the animation function on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Call it once on page load to check for elements already in view
    animateOnScroll();
    
    // Add CSS animation classes
    const style = document.createElement('style');
    style.textContent = `
        .animate {
            animation: fadeInUp 0.8s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .section-title, .pastor-image, .gallery-item, .contact-form {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
});