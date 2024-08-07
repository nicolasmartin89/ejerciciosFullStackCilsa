document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("personalForm");
  const highContrastBtn = document.getElementById("highContrastBtn");
  const style1Btn = document.getElementById("style1Btn");
  const formContainer = document.querySelector(".form-container");
  const resultDiv = document.getElementById("result");

  form.addEventListener("submit", handleFormSubmit);
  highContrastBtn.addEventListener("click", toggleHighContrast);
  style1Btn.addEventListener("click", applyStyle1);

  function handleFormSubmit(event) {
    event.preventDefault();
    const formData = getFormData();
    clearErrorMessages();

    if (isFormValid(formData)) {
      displayFormData(formData);
    }
  }

  function getFormData() {
    return {
      nombre: document.getElementById("nombre").value.trim(),
      apellido: document.getElementById("apellido").value.trim(),
      email: document.getElementById("email").value.trim(),
      fechaNacimiento: document.getElementById("fechaNacimiento").value,
      paisResidencia: document.getElementById("paisResidencia").value.trim(),
    };
  }

  function isFormValid(formData) {
    let isValid = true;

    if (!isNameValid(formData.nombre)) {
      displayErrorForField("nombre-error", "Complete el campo Nombre con la información correcta (solo letras, entre 2 y 60 caracteres).");
      isValid = false;
    }

    if (!isNameValid(formData.apellido)) {
      displayErrorForField("apellido-error", "Complete el campo Apellido con la información correcta (solo letras, entre 2 y 60 caracteres).");
      isValid = false;
    }

    if (!isEmailValid(formData.email)) {
      displayErrorForField("email-error", "Complete el campo Email con una dirección válida (por ejemplo, usuario@dominio.com).");
      isValid = false;
    }

    if (!isDateValid(formData.fechaNacimiento)) {
      displayErrorForField("fechaNacimiento-error", "Complete el campo Fecha de Nacimiento con una fecha válida.");
      isValid = false;
    }

    if (!isCountryValid(formData.paisResidencia)) {
      displayErrorForField("paisResidencia-error", "Seleccione un país de residencia.");
      isValid = false;
    }

    return isValid;
  }

  function isNameValid(name) {
    const nameRegex = /^[a-zA-Z\s]{2,60}$/;
    return nameRegex.test(name);
  }

  function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isDateValid(date) {
    const minDate = new Date("1911-01-01");
    const maxDate = new Date();
    const birthDate = new Date(date);
    return birthDate >= minDate && birthDate <= maxDate;
  }

  function isCountryValid(country) {
    return country.length > 0;
  }

  function displayFormData(formData) {
    resultDiv.innerHTML = `<p>Formulario enviado con éxito:</p>
      <ul>
          <li>Nombre: ${formData.nombre}</li>
          <li>Apellido: ${formData.apellido}</li>
          <li>Email: ${formData.email}</li>
          <li>Fecha de Nacimiento: ${formData.fechaNacimiento}</li>
          <li>País de Residencia: ${formData.paisResidencia}</li>
      </ul>`;
  }

  function displayErrorForField(fieldId, message) {
    const errorSpan = document.getElementById(fieldId);
    errorSpan.textContent = message;
  }

  function clearErrorMessages() {
    const errorSpans = document.querySelectorAll(".error-message");
    errorSpans.forEach(span => {
      span.textContent = "";
    });
  }

  function toggleHighContrast() {
    formContainer.classList.remove("style1");
    formContainer.classList.toggle("high-contrast");
  }

  function applyStyle1() {
    formContainer.classList.remove("high-contrast");
    formContainer.classList.toggle("style1");
  }
});
