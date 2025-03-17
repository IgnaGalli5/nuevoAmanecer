document.addEventListener("DOMContentLoaded", () => {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById("mobile-menu")
    const navMenu = document.querySelector(".nav-menu")
  
    mobileMenu.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
      navMenu.classList.toggle("active")
  
      // Toggle hamburger animation
      const bars = document.querySelectorAll(".bar")
      if (navMenu.classList.contains("active")) {
        bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)"
        bars[1].style.opacity = "0"
        bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)"
      } else {
        bars[0].style.transform = "none"
        bars[1].style.opacity = "1"
        bars[2].style.transform = "none"
      }
    })
  
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navMenu.classList.contains("active")) {
          mobileMenu.click()
        }
      })
    })
  
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)
  
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70, // Adjust for fixed navbar
            behavior: "smooth",
          })
        }
      })
    })
  
    // Fixed navigation on scroll
    const navbar = document.getElementById("navbar")
    const header = document.querySelector("header")
    const navSpacer = document.createElement("div")
    navSpacer.classList.add("nav-spacer")
    header.after(navSpacer)
  
    // Get the height of the header image
    const headerImage = document.querySelector(".header-image")
  
    function updateNavPosition() {
      const headerBottom = headerImage.offsetTop + headerImage.offsetHeight
      const scrollPosition = window.scrollY
  
      if (scrollPosition > headerBottom - navbar.offsetHeight) {
        navbar.classList.add("fixed-nav")
        navSpacer.classList.add("active")
      } else {
        navbar.classList.remove("fixed-nav")
        navSpacer.classList.remove("active")
      }
    }
  
    // Initial check on page load
    updateNavPosition()
  
    // Check on scroll
    window.addEventListener("scroll", updateNavPosition)
  
    // Check on resize (in case dimensions change)
    window.addEventListener("resize", updateNavPosition)
  
    // WhatsApp form submission with validation
    const prayerForm = document.getElementById("prayer-form")
  
    prayerForm.addEventListener("submit", (e) => {
      e.preventDefault()
  
      const name = document.getElementById("name").value
      const phone = document.getElementById("phone").value
      const prayer = document.getElementById("prayer").value
  
      // Validate inputs
      if (!name || !phone || !prayer) {
        alert("Todos los campos son obligatorios.")
        return
      }
  
      // Format the message for WhatsApp
      const message = `Hola, soy ${name}. Mi motivo de oración es: ${prayer}`
  
      // Create WhatsApp URL - this assumes the church has a WhatsApp number
      const churchPhone = "+5491112345678" // Replace with actual number
      const whatsappURL = `https://wa.me/${churchPhone}?text=${encodeURIComponent(message)}`
  
      // Open WhatsApp in a new tab
      window.open(whatsappURL, "_blank")
  
      // Reset the form
      prayerForm.reset()
    })
  
    // Add animation to elements when they come into view
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(
        ".section-title, .pastor-image, .gallery-item, .contact-form, .video-container, .social-icon",
      )
  
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight
  
        if (elementPosition < windowHeight - 100) {
          element.classList.add("animate")
        }
      })
    }
  
    // Call the animation function on scroll
    window.addEventListener("scroll", animateOnScroll)
  
    // Call it once on page load to check for elements already in view
    animateOnScroll()
  
    // Add pulse animation to important elements
    const pulseElements = document.querySelectorAll(".submit-btn, .address-info")
    pulseElements.forEach((element) => {
      element.classList.add("pulse")
    })
  
    // Carrusel de anuncios
    const carousel = document.querySelector(".carousel")
    const slides = document.querySelectorAll(".carousel-slide")
    const prevBtn = document.querySelector(".prev-btn")
    const nextBtn = document.querySelector(".next-btn")
    const indicators = document.querySelectorAll(".carousel-indicator")
  
    let currentIndex = 0
    const slideCount = slides.length
  
    // Configurar el carrusel inicialmente
    function setupCarousel() {
      if (!carousel) return // Si no existe el carrusel, salir
  
      // Mostrar el primer slide
      updateCarousel()
  
      // Iniciar autoplay
      startAutoplay()
    }
  
    // Actualizar la posición del carrusel
    function updateCarousel() {
      if (!carousel) return
  
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`
  
      // Actualizar indicadores
      indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
          indicator.classList.add("active")
        } else {
          indicator.classList.remove("active")
        }
      })
    }
  
    // Ir al slide anterior
    function prevSlide() {
      currentIndex = currentIndex === 0 ? slideCount - 1 : currentIndex - 1
      updateCarousel()
      resetAutoplay()
    }
  
    // Ir al siguiente slide
    function nextSlide() {
      currentIndex = currentIndex === slideCount - 1 ? 0 : currentIndex + 1
      updateCarousel()
      resetAutoplay()
    }
  
    // Ir a un slide específico
    function goToSlide(index) {
      currentIndex = index
      updateCarousel()
      resetAutoplay()
    }
  
    // Variables para el autoplay
    let autoplayInterval
    const autoplayDelay = 5000 // 5 segundos
  
    // Iniciar autoplay
    function startAutoplay() {
      autoplayInterval = setInterval(nextSlide, autoplayDelay)
    }
  
    // Reiniciar autoplay
    function resetAutoplay() {
      clearInterval(autoplayInterval)
      startAutoplay()
    }
  
    // Configurar eventos
    if (prevBtn) prevBtn.addEventListener("click", prevSlide)
    if (nextBtn) nextBtn.addEventListener("click", nextSlide)
  
    // Configurar indicadores
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => goToSlide(index))
    })
  
    // Pausar autoplay al pasar el mouse sobre el carrusel
    if (carousel) {
      carousel.addEventListener("mouseenter", () => clearInterval(autoplayInterval))
      carousel.addEventListener("mouseleave", startAutoplay)
    }
  
    // Inicializar carrusel
    setupCarousel()
  })
  
  