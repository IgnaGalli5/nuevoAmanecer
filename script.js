// Función para manejar el envío del formulario de contacto
function handleContactForm(event) {
  event.preventDefault()
  // Aquí iría la lógica para enviar el formulario a través de una API
  alert("Gracias por contactarnos. Te responderemos pronto.")
}

// Agregar eventos cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactForm)
  }
})

