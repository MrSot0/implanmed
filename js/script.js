/**
 * IMPLANMED C.A. - Landing Page
 * Módulo de Control Integrado para el Hero Carrusel (4 Láminas)
 */

document.addEventListener("DOMContentLoaded", function() {
    // 1. Selección de elementos del DOM
    const track = document.getElementById("track");
    const btnAvanzar = document.getElementById("avanzar");
    const btnRetroceder = document.getElementById("retroceder");
    const dots = document.querySelectorAll(".dot");
    const slides = document.querySelectorAll(".carrusel-slide");
    const puntosCheck = document.querySelectorAll(".punto-check");

    // 2. Estado del Carrusel
    let indiceActual = 0;
    const totalSlides = slides.length; // Retorna 4 automáticamente
    let carruselIntervalo = null;
    const TIEMPO_CAMBIO = 5000; // Tiempo en milisegundos (5 segundos)
    const coloresLaminas = ["#38bdf8", "#4ade80", "#f97316", "#facc15"];

    function actualizarInterfaz() {
        // Cálculo exacto del desplazamiento porcentual basado en el total de láminas
        const porcentajeDesplazamiento = (indiceActual * -100) / totalSlides;
        track.style.transform = `translateX(${porcentajeDesplazamiento}%)`;

        dots.forEach((dot, index) => {
            if (index === indiceActual) {
                dot.classList.add("activo");
                dot.style.backgroundColor = coloresLaminas[indiceActual];
            } else {

                dot.classList.remove("activo");
                dot.style.backgroundColor = "#334155";
            }
        });

        puntosCheck.forEach(punto => {
            punto.style.color = coloresLaminas[indiceActual];
        });

        // Marca la lámina visible para activar el efecto de zoom lento en su imagen
        slides.forEach((slide, index) => {
            slide.classList.toggle("slide-activa", index === indiceActual);
        });
    }
    
    function iniciarAutoplay() {
        // Nos aseguramos de limpiar cualquier intervalo previo antes de crear uno nuevo
        detenerAutoplay();
        
        carruselIntervalo = setInterval(() => {
            // Avanza de forma cíclica
            indiceActual = (indiceActual < totalSlides - 1) ? indiceActual + 1 : 0;
            actualizarInterfaz();
        }, TIEMPO_CAMBIO);
    }

    /**
     * Detiene el temporizador para evitar conflictos durante la interacción manual
     */
    function detenerAutoplay() {
        if (carruselIntervalo) {
            clearInterval(carruselIntervalo);
        }
    }

    // ==========================================================================
    // ESCUCHADORES DE EVENTOS (INTERACCIONES)
    // ==========================================================================

    // Evento: Botón Siguiente (Flecha Derecha)
    btnAvanzar.addEventListener("click", () => {
        indiceActual = (indiceActual < totalSlides - 1) ? indiceActual + 1 : 0;
        actualizarInterfaz();
        iniciarAutoplay(); // Reinicia el contador al interactuar
    });

    // Evento: Botón Anterior (Flecha Izquierda)
    btnRetroceder.addEventListener("click", () => {
        indiceActual = (indiceActual > 0) ? indiceActual - 1 : totalSlides - 1;
        actualizarInterfaz();
        iniciarAutoplay(); // Reinicia el contador al interactuar
    });

    // Evento: Clic Directo en los Puntos de Paginación
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            indiceActual = index;
            actualizarInterfaz();
            iniciarAutoplay(); // Reinicia el contador al interactuar
        });
    });

    // ==========================================================================
    // MEJORAS DE ACCESIBILIDAD Y CONTROL DE TECLADO
    // ==========================================================================
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
            btnAvanzar.click();
        } else if (e.key === "ArrowLeft") {
            btnRetroceder.click();
        }
    });

    // ==========================================================================
    // ENVÍO DE FORMULARIO A WHATSAPP
    // ==========================================================================
    const formPresupuesto = document.getElementById("form-presupuesto");
    if (formPresupuesto) {
        formPresupuesto.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById("nombre").value;
            const telefono = document.getElementById("telefono").value;
            const correo = document.getElementById("correo").value;
            const tipoUsuarioSelect = document.getElementById("tipo-usuario");
            const tipoUsuarioTexto = tipoUsuarioSelect.options[tipoUsuarioSelect.selectedIndex].text;
            const detalle = document.getElementById("detalle").value;
            
            const mensaje = `*Nueva Solicitud de Presupuesto - IMPLANMED*\n\n` +
                            `*Nombre:* ${nombre}\n` +
                            `*Teléfono:* ${telefono}\n` +
                            `*Correo:* ${correo}\n` +
                            `*Tipo de perfil:* ${tipoUsuarioTexto}\n\n` +
                            `*Detalle del requerimiento:*\n${detalle}`;
            
            const numeroWhatsApp = "584246434299"; 
            const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
            
            window.open(url, "_blank");
        });
    }

    // Inicialización del estado visual y arranque del movimiento automático
    actualizarInterfaz();
    iniciarAutoplay();
});


document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', () => {
        // Despliega u oculta la lista de enlaces (.nav-links)
        navLinks.classList.toggle('activo');
        
        // Transforma el diseño de las tres barritas en una "X"
        menuToggle.classList.toggle('abierto');
    });

    // Opcional: Cierra el menú automáticamente cuando el usuario hace clic en una opción
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('activo');
            menuToggle.classList.remove('abierto');
        });
    });
});

// BOTÓN VOLVER ARRIBA
const btnTop = document.getElementById('btn-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        btnTop.classList.add('visible');
    } else {
        btnTop.classList.remove('visible');
    }
});

btnTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function abrirPopupConstruccion(e) {
    e.preventDefault();
    document.getElementById('popup-construccion').classList.add('visible');
}

document.getElementById('popup-cerrar').addEventListener('click', () => {
    document.getElementById('popup-construccion').classList.remove('visible');
});

document.getElementById('popup-construccion').addEventListener('click', function(e) {
    if (e.target === this) this.classList.remove('visible');
});

document.getElementById('abrir-login').addEventListener('click', abrirPopupConstruccion);
document.getElementById('abrir-registro').addEventListener('click', abrirPopupConstruccion);
document.getElementById('abrir-carrito').addEventListener('click', abrirPopupConstruccion);
// Botones de carrito en las tarjetas de producto
document.querySelectorAll('.btn-card-carrito').forEach(btn => {
    btn.addEventListener('click', abrirPopupConstruccion);
});

const heroSeccion = document.querySelector('.hero-seccion-global');

if (heroSeccion) {
    heroSeccion.addEventListener('touchstart', () => {
        detenerAutoplay();
    }, { passive: true });

    // Reactiva al soltar el dedo
    heroSeccion.addEventListener('touchend', () => {
        setTimeout(() => {
            iniciarAutoplay();
        }, 3000); // Espera 3 segundos antes de reanudar
    }, { passive: true });

    heroSeccion.addEventListener('mouseenter', () => {
        detenerAutoplay();
    });

    heroSeccion.addEventListener('mouseleave', () => {
        iniciarAutoplay();
    });
}
