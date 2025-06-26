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
          <h6 class="text-success mb-1 fw-bold">Nuevo Cálculo Realizado</h6>
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
  // este evento es para historial limpiado
  document.addEventListener('historial-limpiado', function () {
    const contenedor = document.getElementById('eventos');

    contenedor.innerHTML = `
      <div class="d-flex align-items-center">
        <div class="bg-warning rounded-circle p-2 me-3" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
          <span class="text-black fw-bold">🧹</span>
        </div>
        <div class="flex-grow-1">
          <h6 class="text-warning mb-1 fw-bold">🗑️ HISTORIAL ELIMINADO</h6>
          <p class="mb-0 text-white">El historial ha sido limpiado correctamente</p>
          <small class="text-secondary">📅 ${new Date().toLocaleString(
            'es-ES'
          )}</small>
        </div>
      </div>
    `;

    contenedor.className =
      'alert alert-dark border border-warning bg-black text-white';
  });
  // este tema es meramente estetico ya que ocnfigura un tema oscuro
  function aplicarTemaOscuro() {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    document.body.classList.add('bg-dark', 'text-white');
  }

  aplicarTemaOscuro();
  // PAra poder mostrar la informacion por consala se realizan los siguientes consol.log
  function mostrarInfo() {
    console.log(
      '%c🧮 CALCULADORA CARGADA',
      'color: #dc3545; font-weight: bold; font-size: 16px;'
    );
    console.log(
      '%c✅ Sistema funcionando',
      'color: #28a745; font-weight: bold;'
    );

    console.group(
      '%cFunciones disponibles:',
      'color: #fd7e14; font-weight: bold;'
    );
    console.log('• obtenerComponente() - Obtener calculadora');
    console.log('• obtenerHistorial() - Ver historial');
    console.log('• reiniciarCalculadora() - Reiniciar todo');
    console.log('• limpiarHistorial() - Limpiar historial');
    console.log('• mostrarEstadisticas() - Ver estadísticas');
    console.groupEnd();
  }

  if (customElements.get('calculadora-basica')) {
    mostrarInfo();
  } else {
    customElements.whenDefined('calculadora-basica').then(mostrarInfo);
  }
  //son funciones globales
  window.obtenerComponente = function () {
    const componente = document.querySelector('calculadora-basica');
    if (componente) {
      console.log(
        '%c🎯 Componente encontrado:',
        'color: #28a745; font-weight: bold;',
        componente
      );
      return componente;
    } else {
      console.log(
        '%c❌ Componente no encontrado',
        'color: #dc3545; font-weight: bold;'
      );
      return null;
    }
  };
  window.obtenerHistorial = function () {
    const calc = document.querySelector('calculadora-basica');
    if (calc?.obtenerHistorialOperaciones) {
      const historial = calc.obtenerHistorialOperaciones();
      console.log(
        '%c📊 Historial:',
        'color: #17a2b8; font-weight: bold;',
        historial
      );
      console.table(historial);
      return historial;
    } else {
      console.log(
        '%c❌ No se pudo obtener historial',
        'color: #dc3545; font-weight: bold;'
      );
      return null;
    }
  };
  window.reiniciarCalculadora = function () {
    const calc = document.querySelector('calculadora-basica');
    if (calc?.reiniciarCalculadora) {
      calc.reiniciarCalculadora();
      console.log(
        '%c🔄 Calculadora reiniciada',
        'color: #28a745; font-weight: bold;'
      );

      const eventos = document.getElementById('eventos');
      if (eventos) {
        eventos.innerHTML = `
        <div class="d-flex align-items-center">
          <div class="bg-info rounded-circle p-2 me-3" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
            <span class="text-white fw-bold">🔄</span>
          </div>
          <div>
            <h6 class="text-info mb-1 fw-bold">🚀 REINICIADA</h6>
            <p class="mb-0 text-white">Calculadora reiniciada completamente</p>
          </div>
        </div>
      `;
        eventos.className =
          'alert alert-dark border border-info bg-black text-white';
      }
    } else {
      console.log(
        '%c❌ No se pudo reiniciar',
        'color: #dc3545; font-weight: bold;'
      );
    }
  };
  window.limpiarHistorial = function () {
    const calc = document.querySelector('calculadora-basica');
    if (calc?.limpiarHistorialOperaciones) {
      calc.limpiarHistorialOperaciones();
      console.log(
        '%c🧹 Historial limpiado',
        'color: #ffc107; font-weight: bold;'
      );
    } else {
      console.log(
        '%c❌ No se pudo limpiar',
        'color: #dc3545; font-weight: bold;'
      );
    }
  };
  window.mostrarEstadisticas = function () {
    const calc = document.querySelector('calculadora-basica');
    if (calc?.obtenerHistorialOperaciones) {
      const historial = calc.obtenerHistorialOperaciones();
      if (historial.length === 0) {
        console.log(
          '%c📊 Sin operaciones para estadísticas',
          'color: #6c757d; font-weight: bold;'
        );
        return;
      }
      const stats = {
        total: historial.length,
        exitosas: historial.filter((op) => !op.mensajeError).length,
        errores: historial.filter((op) => op.mensajeError).length,
        operaciones: {},
      };
      historial.forEach((op) => {
        if (!op.mensajeError) {
          const tipo = op.tipoOperacion;
          stats.operaciones[tipo] = (stats.operaciones[tipo] || 0) + 1;
        }
      });
      console.log(
        '%c📈 ESTADÍSTICAS',
        'color: #6610f2; font-weight: bold; font-size: 16px;'
      );
      console.table(stats);
      return stats;
    } else {
      console.log(
        '%c❌ No se pudieron obtener estadísticas',
        'color: #dc3545; font-weight: bold;'
      );
      return null;
    }
  };
});
