class CalculadoraBasica extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.renderizar();
    this.configurarEventos();
  }

  renderizar() {
    this.shadowRoot.innerHTML = `
      <link href="/public/LIB/css/bootstrap.min.css" rel="stylesheet">
      
      <div class="container-fluid" data-bs-theme="dark">
        <div class="card bg-black border-danger">
          <div class="card-header bg-danger text-white text-center">
            <h2 class="mb-0 fw-bold">CALCULADORA</h2>
          </div>
          
          <div class="card-body bg-black p-4">
            <!-- Campos para la entrada -->
            <div class="row g-3 mb-3">
              <div class="col-md-6">
                <label class="form-label fw-bold text-white">Primer Número:</label>
                <input 
                  type="number" 
                  class="form-control bg-black text-white border-secondary" 
                  id="primerNumero" 
                  placeholder="0" 
                  step="any"
                >
              </div>
              <div class="col-md-6">
                <label class="form-label text-white">Segundo Número:</label>
                <input 
                  type="number" 
                  class="form-control bg-dark text-white border-secondary" 
                  id="segundoNumero" 
                  placeholder="0" 
                  step="any"
                >
              </div>
            </div>
            
            <!-- Operación y botón -->
            <div class="row g-3 mb-4">
              <div class="col-md-8">
                <label class="form-label fw-bold text-white">Operación:</label>
                <select class="form-select bg-black text-white border-secondary" id="tipoOperacion">
                  <option value="">Seleccionar operación</option>
                  <option value="suma">➕ Suma</option>
                  <option value="resta">➖ Resta</option>
                  <option value="multiplicacion">✖️ Multiplicación</option>
                  <option value="division">➗ División</option>
                </select>
              </div>
              <div class="col-md-4 d-flex align-items-end">
                <button type="button" class="btn btn-danger w-100 fw-bold" id="botonCalcular">
                  CALCULAR
                </button>
              </div>
            </div>
            <!-- seccion de los resultados -->
            <div class="mb-4">
              <div class="alert alert-dark border-danger bg-black text-white">
                <h5 class="text-danger fw-bold mb-2">📊 RESULTADO:</h5>
                <div id="areaResultado" class="fs-4 fw-bold text-center py-3 text-secondary">
                  Esperando operación...
                </div>
              </div>
              <!-- Seccion del historial -->
              <div class="card bg-black border-danger">
              <div class="card-header bg-danger text-white d-flex justify-content-between align-items-center">
                <h5 class="mb-0 fw-bold">📋 HISTORIAL</h5>
                <button type="button" class="btn btn-outline-light btn-sm fw-bold" id="botonLimpiarHistorial">
                  🧹 LIMPIAR
                </button>
              </div>
              <div class="card-body bg-black">
                <div style="max-height: 300px; overflow-y: auto;">
                  <div id="listaHistorial">
                    <div class="text-center text-secondary">
                      📝 No hay operaciones realizadas
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  configurarEventos() {
    const botonCalcular = this.shadowRoot.getElementById('botonCalcular');
    const botonLimpiar = this.shadowRoot.getElementById(
      'botonLimpiarHistorial'
    );

    botonCalcular.addEventListener('click', () => this.realizarCalculo());
    botonLimpiar.addEventListener('click', () =>
      this.limpiarHistorialCompleto()
    );

    // Efectos de focus en los campos
    const controles = this.shadowRoot.querySelectorAll(
      '.form-control, .form-select'
    );
    controles.forEach((control) => {
      control.addEventListener('focus', () => {
        control.classList.remove('border-secondary');
        control.classList.add('border-danger');
      });
      control.addEventListener('blur', () => {
        if (!control.classList.contains('is-invalid')) {
          control.classList.remove('border-danger');
          control.classList.add('border-secondary');
        }
      });
    });
  }
}

customElements.define('calculadora-basica', CalculadoraBasica);
