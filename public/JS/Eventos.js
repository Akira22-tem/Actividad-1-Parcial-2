document.addEventListener('DOMContentLoaded', function () {
  // evento para el calculo completado
  document.addEventListener('calculo-completado', function (evento) {
    const contenedor = document.getElementById('eventos');
    const {
      primerNumero,
      segundoNumero,
      tipoOperacion,
      simboloOperacion,
      resultadoOperacion,
      marcaTiempo,
    } = evento.detail;
    contenedor.innerHTML = `
      <div class="d-flex align-items-center">
        <div class="bg-success rounded-circle p-2 me-3" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
          <span class="text-white fw-bold">✓</span>
        </div>
        <div class="flex-grow-1">
          <h6 class="text-success mb-1 fw-bold">🎉 NUEVO CÁLCULO</h6>
          <p class="mb-1 text-white">
            <strong class="text-danger">${tipoOperacion}:</strong> 
            ${primerNumero} ${simboloOperacion} ${segundoNumero} = 
            <span class="fw-bold text-success">${resultadoOperacion}</span>
          </p>
          <small class="text-secondary">📅 ${marcaTiempo}</small>
        </div>
      </div>
    `;

    contenedor.className =
      'alert alert-dark border border-success bg-black text-white';
  });
});
