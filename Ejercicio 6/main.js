document.addEventListener('DOMContentLoaded', function() {
    // Activar los tooltips de Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    
    // Manejar el envío del formulario
    var contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            if (validateForm()) {
                showAlert('Formulario enviado con éxito!', 'success');
                contactForm.reset();
            }
        });
    }

    // Función para validar el formulario
    function validateForm() {
        var nombre = document.getElementById('nombre');
        var email = document.getElementById('email');
        var mensaje = document.getElementById('mensaje');
        var isValid = true;

        if (nombre.value.trim() === '') {
            setError(nombre, 'Por favor, ingrese su nombre');
            isValid = false;
        } else {
            setSuccess(nombre);
        }

        if (email.value.trim() === '') {
            setError(email, 'Por favor, ingrese su email');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            setError(email, 'Por favor, ingrese un email válido');
            isValid = false;
        } else {
            setSuccess(email);
        }

        if (mensaje.value.trim() === '') {
            setError(mensaje, 'Por favor, ingrese un mensaje');
            isValid = false;
        } else {
            setSuccess(mensaje);
        }

        return isValid;
    }

    // Función para validar email
    function isValidEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Función para mostrar error
    function setError(input, message) {
        var formControl = input.parentElement;
        var small = formControl.querySelector('small');
        formControl.className = 'mb-3 error';
        if (small) {
            small.innerText = message;
        } else {
            small = document.createElement('small');
            small.innerText = message;
            small.style.color = 'red';
            formControl.appendChild(small);
        }
    }

    // Función para mostrar éxito
    function setSuccess(input) {
        var formControl = input.parentElement;
        formControl.className = 'mb-3 success';
        var small = formControl.querySelector('small');
        if (small) {
            small.remove();
        }
    }

    // Función para mostrar alerta
    function showAlert(message, type) {
        var alertPlaceholder = document.createElement('div');
        alertPlaceholder.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
        document.querySelector('#contacto').insertBefore(alertPlaceholder, contactForm);
    }

    // Smooth scrolling para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animación al hacer scroll
    window.addEventListener('scroll', function() {
        var elements = document.querySelectorAll('.profile-card, .contact-form');
        elements.forEach(function(element) {
            var position = element.getBoundingClientRect();

            // Comprueba si el elemento está en el viewport
            if(position.top >= 0 && position.bottom <= window.innerHeight) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    });
});

