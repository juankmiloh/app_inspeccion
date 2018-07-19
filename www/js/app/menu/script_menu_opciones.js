$(document).ready(function(){  
  fechaFooter();
});

/* Fecha del footer */
function fechaFooter(){
  var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
  var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
  var f = new Date();
  var fecha = diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
  $('#fecha_footer').text(fecha);
}

/*=============================================
* FUNCION PARA DETECTAR SI SE PRESIONA EL BOTON ATRAS DEL DISPOSITIVO
*==============================================*/
document.addEventListener("backbutton", onBackKeyDown, false);
/*=============================================
* FUNCION PARA DENEGAR EL USO DEL BOTON ATRAS DEL DISPOSITIVO Y EN VEZ REDIRECCIONAMOS A LA PAGINA ANTERIOR
*==============================================*/
function onBackKeyDown(e) {
  e.preventDefault();
  window.location='../../index.html';
}