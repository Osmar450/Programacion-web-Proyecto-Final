export const toast = () => {
  return `
      <!-- Toast de mensaje temporal -->
      <div class="position-fixed top-0 end-0 p-3" style="z-index: 1080; margin-top: 4rem; margin-right: 1rem;">
        <div id="toastAlert" class="toast align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="d-flex">
            <div class="toast-body" id="toastBody">Placeholder message</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div>
    `;
};

export function showToast(message, type = 'success') {
  // Obtener el elemento del toast en el DOM por su ID
  const toastElement = document.getElementById('toastAlert');

  // Obtener el cuerpo del toast donde se mostrará el mensaje
  const toastBody = document.getElementById('toastBody');

  // Asignar el texto del mensaje que se quiere mostrar en el toast
  toastBody.textContent = message;

  // Cambiar la clase CSS del toast para ajustar el color de fondo según el tipo
  // Los tipos pueden ser: success (éxito), danger (error), warning (advertencia), info (información)
  toastElement.className = `toast align-items-center text-white bg-${type} border-0`;

  // Crear una instancia del toast de Bootstrap con un tiempo de duración de 3 segundos (3000 ms)
  const toast = new bootstrap.Toast(toastElement, {
    delay: 3000,
  });

  // Mostrar el toast en pantalla
  toast.show();
}
