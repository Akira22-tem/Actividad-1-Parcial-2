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
  realizarCalculo() {
    const primerInput = this.shadowRoot.getElementById('primerNumero');
    const segundoInput = this.shadowRoot.getElementById('segundoNumero');
    const operacionSelect = this.shadowRoot.getElementById('tipoOperacion');
    const resultado = this.shadowRoot.getElementById('areaResultado');

    // esto limpia errores antes de iniciar es decir errores previos
    [primerInput, segundoInput, operacionSelect].forEach((el) => {
      el.classList.remove('is-invalid', 'border-danger');
      el.classList.add('border-secondary');
    });

    // obtiene y valida los valores a realizar las operaciones
    const num1 = parseFloat(primerInput.value);
    const num2 = parseFloat(segundoInput.value);
    const operacion = operacionSelect.value;

    let error = false;

    if (isNaN(num1) || primerInput.value.trim() === '') {
      primerInput.classList.add('is-invalid', 'border-danger');
      error = true;
    }

    if (isNaN(num2) || segundoInput.value.trim() === '') {
      segundoInput.classList.add('is-invalid', 'border-danger');
      error = true;
    }

    if (!operacion) {
      operacionSelect.classList.add('is-invalid', 'border-danger');
      error = true;
    }

    if (error) {
      resultado.innerHTML = '❌ Completa todos los campos';
      resultado.className = 'fs-4 fw-bold text-center py-3 text-danger';
      return;
    }
    // Realizar cálculo
    let resultadoCalculo;
    let simbolo;
    let nombre;

    try {
      switch (operacion) {
        case 'suma':
          resultadoCalculo = num1 + num2;
          simbolo = '+';
          nombre = 'SUMA';
          break;
        case 'resta':
          resultadoCalculo = num1 - num2;
          simbolo = '-';
          nombre = 'RESTA';
          break;
        case 'multiplicacion':
          resultadoCalculo = num1 * num2;
          simbolo = '×';
          nombre = 'MULTIPLICACIÓN';
          break;
        case 'division':
          if (num2 === 0) throw new Error('No se puede dividir entre cero');
          resultadoCalculo = num1 / num2;
          simbolo = '÷';
          nombre = 'DIVISIÓN';
          break;
      }
      // esta parte ayuda a redondear si es necesario para o tener un numero excecivo de decimales
      if (!Number.isInteger(resultadoCalculo)) {
        resultadoCalculo = Math.round(resultadoCalculo * 1000000) / 1000000;
      }
      resultado.innerHTML = `${num1} ${simbolo} ${num2} = ${resultadoCalculo}`;
      resultado.className = 'fs-4 fw-bold text-center py-3 text-white';

      // esto ayuda a agregar los resultados de las operaciones al historial
      const registro = {
        primerNumero: num1,
        segundoNumero: num2,
        tipoOperacion: nombre,
        simboloOperacion: simbolo,
        resultadoOperacion: resultadoCalculo,
        marcaTiempo: new Date().toLocaleString('es-ES'),
      };

      this.historialOperaciones.unshift(registro);
      this.actualizarVistaHistorial();

      // Emitir evento personalizado
      this.dispatchEvent(
        new CustomEvent('calculo-completado', {
          detail: registro,
          bubbles: true,
        })
      );
    } catch (error) {
      resultado.innerHTML = `❌ ${error.message}`;
      resultado.className = 'fs-4 fw-bold text-center py-3 text-danger';

      const registroError = {
        primerNumero: num1,
        segundoNumero: num2,
        tipoOperacion: nombre || 'DESCONOCIDA',
        mensajeError: error.message,
        marcaTiempo: new Date().toLocaleString('es-ES'),
      };

      this.historialOperaciones.unshift(registroError);
      this.actualizarVistaHistorial();
    }
  }
  actualizarVistaHistorial() {
    const historial = this.shadowRoot.getElementById('listaHistorial');
    if (this.historialOperaciones.length === 0) {
      historial.innerHTML =
        '<div class="text-center text-secondary">📝 No hay operaciones realizadas</div>';
      return;
    }
    const html = this.historialOperaciones
      .slice(0, 10) //muestra hasta 10 registros realizados en el componente web
      .map((reg, i) => {
        if (reg.mensajeError) {
          return `
          <div class="border border-danger rounded p-2 mb-2 bg-black">
            <div class="d-flex justify-content-between">
              <span class="text-danger">❌ ERROR: ${reg.primerNumero} ${reg.tipoOperacion} ${reg.segundoNumero}</span>
              <small class="text-secondary">${reg.marcaTiempo}</small>
            </div>
            <small class="text-light">${reg.mensajeError}</small>
          </div>
        `;
        } else {
          return `
          <div class="border border-success rounded p-2 mb-2 bg-black">
            <div class="d-flex justify-content-between">
              <span class="text-white">
                ✅ ${reg.primerNumero} ${reg.simboloOperacion} ${reg.segundoNumero} = 
                <span class="text-danger fw-bold">${reg.resultadoOperacion}</span>
              </span>
              <small class="text-secondary">${reg.marcaTiempo}</small>
            </div>
          </div>
        `;
        }
      })
      .join('');
    historial.innerHTML = html;
  }
}
customElements.define('calculadora-basica', CalculadoraBasica);
