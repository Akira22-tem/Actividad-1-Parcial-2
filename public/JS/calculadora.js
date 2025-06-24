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
            <h2 class="mb-0 fw-bold">🧮 CALCULADORA</h2>
          </div>
          
          <div class="card-body bg-black p-4">
            <!-- Campos de entrada -->
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
                <label class="form-label fw-bold text-white">Segundo Número:</label>
                <input 
                  type="number" 
                  class="form-control bg-black text-white border-secondary" 
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
                  🚀 CALCULAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('calculadora-basica', CalculadoraBasica);
