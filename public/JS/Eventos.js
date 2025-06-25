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

});
