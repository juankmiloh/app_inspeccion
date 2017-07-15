jQuery(document).ready(function($){
  //alert("probando script");
  /* CARGAR FUNCIONES INICIALES */
  mostrarBarraHeader();
  mostrarFecha();
  mostrarConsecutivoInspeccion();
  /* FUNCIONES QUE PERMITEN OPTIMIZAR EL RENDIMIENTO DEL FORMULARIO HTML */
  ocultarDivs();
  clickDivPreliminar();
  clickDivProteccion();
  clickDivElementos();
  clickDivListaVerificacion();
  clickDivCabina();
  clickDivMaquinas();
  clickDivPozo();
  clickDivFoso();
  clickBtnF1();
  clickBtnF2_guardar();
  dejarContenerdorBtnsFLot();
});

/*=============================================
* Crear base de datos / Hacer conexion si ya esta creada
* parametros:
* var dbShell = window.openDatabase(database_name, database_version, database_displayname, database_size);
*==============================================*/
var db = window.openDatabase("montajes_inspeccion_mp", "1.0", "Inspeccion_MP", 1000000);

/* Inicializamos la variable withClass */
var withClass = false;

/*=============================================
* Funcion que permite mostrar la barra fija al header cuando se scrollea la pagina
*==============================================*/
function mostrarBarraHeader(){
  $(document).scroll(function(e){
    if($(window).scrollTop() >= ($("#top_home").height()*1)){
      if(!withClass){
        jQuery('#header').removeClass("sombra");
        jQuery('#header').addClass("av_header_effect");
        $('#linea_cabecera').addClass("esconder_linea_cabecera");
        $('#label_cabecera').addClass("centrar_label_cabecera");
        withClass = true;
      }           
    }
    if($(window).scrollTop() < ($("#top_home").height()*1)){
      jQuery('#header').removeClass("av_header_effect");
      jQuery('#header').addClass("sombra");
      $('#linea_cabecera').removeClass("esconder_linea_cabecera");
      $('#label_cabecera').removeClass("centrar_label_cabecera");
      withClass = false;
    }
  });  
}

/*=============================================
* Funcion que se ejecuta cuando se presiona el boton (+) de la lista de inspeccion
* Se verifica si el boton tiene la clase de girar y dependiendo se activa la clase 'animacionVer' la cual permite mostrar los btns flotantes
* y se muestra el 'fbback_1' que es el div verde clarito que permite ocultar los controles
*==============================================*/
function clickBtnF1() {
  $('.botonF1').click(function(){
    if ($('.botonF1').hasClass('botonF1_girar')){
      $('.botonF1').removeClass('botonF1_girar');
      $('.btn_flotante').removeClass('animacionVer');
      $('.fbback_1').hide();
    }else{
      $('.botonF1').addClass('botonF1_girar');
      $('.btn_flotante').addClass('animacionVer');
      $('.texto_boton_flotante').addClass('animacionVer');
      $('.fbback_1').show();
    }
  })
}

/*=============================================
* Funcion que se ejecuta cuando se presiona el boton guardar de la lista de inspeccion
* Se quita la clase 'botonF1_girar' del btn (+) y se ocultan los btns flotantes al igual que el 'fbback_1'
*==============================================*/
function clickBtnF2_guardar() {
  $('.botonF2').click(function(){
    $('.botonF1').removeClass('botonF1_girar');
    $('.btn_flotante').removeClass('animacionVer');
    $('.fbback_1').hide();
  })
}

/*=============================================
* Funcion que se ejecuta cuando se deja de pasar el mouse por encima del btn (+)
* Se quita la clase 'botonF1_girar' del btn (+) y se ocultan los btns flotantes al igual que el 'fbback_1'
* En la aplicacion funciona es pinchando en el div verde 'fbback_1'
*==============================================*/
function dejarContenerdorBtnsFLot() {
  $('.contenedor_btns_flotantes').mouseleave(function(){
    $('.botonF1').removeClass('botonF1_girar');
    $('.btn_flotante').removeClass('animacionVer');
    $('.fbback_1').hide();
  })
}

/*=============================================
* Funcion que permite esconder los div´s de todos los items de la inspeccion
*==============================================*/
function ocultarDivs(){
  $('#items_lista_verificacion').hide();
}

/*=============================================
* Funcion que permite mostrar los div´s de todos los items de la inspeccion
* Se activa cuando es presionado el boton guardar inspeccion, para permitir comprobar que no hay ningun campo sin vacio ni sin seleccionar
*==============================================*/
function mostrarDivs(){
  $('#items_lista_verificacion').show();
}

/*=============================================
* Funcion que se ejecuta cuando clickamos en el div de EVALUACIÓN PRELIMINAR DE INSPECCIÓN
* Permite mostrar u ocultar los conrtoles para un mejor rendimiento del app
*==============================================*/
function clickDivPreliminar(){
  $(".div_1").click(function(){
    mostrarDivPreliminar();
  });
}

function mostrarDivPreliminar(){
  location.href = "#campo_focus_2";
  $('#collapse_evaluacion_preliminar').collapse('show');
  $('#collapse_elementos_proteccion_personal').collapse('hide');
  $('#collapse_elementos_del_inspector').collapse('hide');
  $('#collapse_cabina').collapse('hide');
  $('#collapse_maquinas').collapse('hide');
  $('#collapse_pozo').collapse('hide');
  $('#collapse_foso').collapse('hide');
  $('#items_lista_verificacion').hide();
}

/*=============================================
* Funcion que se ejecuta cuando clickamos en el div de ELEMENTOS DE PROTECCIÓN PERSONAL
* Permite mostrar u ocultar los conrtoles para un mejor rendimiento del app
*==============================================*/
function clickDivProteccion(){
  $(".div_2").click(function(){
    mostrarDivProteccion();
  });
}

function mostrarDivProteccion(){
  location.href = "#campo_focus_2";
  $('#collapse_evaluacion_preliminar').collapse('hide');
  $('#collapse_elementos_proteccion_personal').collapse('show');
  $('#collapse_elementos_del_inspector').collapse('hide');
  $('#collapse_cabina').collapse('hide');
  $('#collapse_maquinas').collapse('hide');
  $('#collapse_pozo').collapse('hide');
  $('#collapse_foso').collapse('hide');
  $('#items_lista_verificacion').hide();
}

/*=============================================
* Funcion que se ejecuta cuando clickamos en el div de ELEMENTOS DEl INSPECTOR
* Permite mostrar u ocultar los conrtoles para un mejor rendimiento del app
*==============================================*/
function clickDivElementos(){
  $(".div_3").click(function(){
    mostrarDivElementos();
  });
}

function mostrarDivElementos(){
  location.href = "#campo_focus_3";
  $('#collapse_evaluacion_preliminar').collapse('hide');
  $('#collapse_elementos_proteccion_personal').collapse('hide');
  $('#collapse_elementos_del_inspector').collapse('show');
  $('#collapse_cabina').collapse('hide');
  $('#collapse_maquinas').collapse('hide');
  $('#collapse_pozo').collapse('hide');
  $('#collapse_foso').collapse('hide');
  $('#items_lista_verificacion').hide();
}

/*=============================================
* Funcion que se ejecuta cuando clickamos en el div de LISTA DE VERIFICACIÓN 5926-1
* Permite mostrar u ocultar los conrtoles para un mejor rendimiento del app
*==============================================*/
function clickDivListaVerificacion(){
  $("#div_4").click(function(){
    if( $('#items_lista_verificacion').is(":visible") ){
      $('#items_lista_verificacion').hide('fast');
    }else{
      mostrarDivListaVerificacion();
    }
  });
}

function mostrarDivListaVerificacion(){
  location.href = "#campo_focus_4";
  $('#collapse_evaluacion_preliminar').collapse('hide');
  $('#collapse_elementos_proteccion_personal').collapse('hide');
  $('#collapse_elementos_del_inspector').collapse('hide');
  $('#collapse_cabina').collapse('hide');
  $('#collapse_maquinas').collapse('hide');
  $('#collapse_pozo').collapse('hide');
  $('#collapse_foso').collapse('hide');
  $('#items_lista_verificacion').show('fast');
}

/*=============================================
* Funcion que se ejecuta cuando clickamos en el div de CABINA
* Permite mostrar u ocultar los conrtoles para un mejor rendimiento del app
*==============================================*/
function clickDivCabina(){
  $(".div_5").click(function(){
    mostrarDivCabina();
  });
}

function mostrarDivCabina(){
  location.href = "#campo_focus_4";
  $('#collapse_evaluacion_preliminar').collapse('hide');
  $('#collapse_elementos_proteccion_personal').collapse('hide');
  $('#collapse_elementos_del_inspector').collapse('hide');
  $('#collapse_cabina').collapse('show');
  $('#collapse_maquinas').collapse('hide');
  $('#collapse_pozo').collapse('hide');
  $('#collapse_foso').collapse('hide');
  $('#items_lista_verificacion').show('fast');
}

/*=============================================
* Funcion que se ejecuta cuando clickamos en el div de CUARTO DE MAQUINAS Y POLEAS
* Permite mostrar u ocultar los conrtoles para un mejor rendimiento del app
*==============================================*/
function clickDivMaquinas(){
  $(".div_6").click(function(){
    mostrarDivMaquinas();
  });
}

function mostrarDivMaquinas(){
  location.href = "#campo_focus_5";
  $('#collapse_evaluacion_preliminar').collapse('hide');
  $('#collapse_elementos_proteccion_personal').collapse('hide');
  $('#collapse_elementos_del_inspector').collapse('hide');
  $('#collapse_cabina').collapse('hide');
  $('#collapse_maquinas').collapse('show');
  $('#collapse_pozo').collapse('hide');
  $('#collapse_foso').collapse('hide');
  $('#items_lista_verificacion').show('fast');
}

/*=============================================
* Funcion que se ejecuta cuando clickamos en el div de REVISIÓN DE POZO
* Permite mostrar u ocultar los conrtoles para un mejor rendimiento del app
*==============================================*/
function clickDivPozo(){
  $(".div_7").click(function(){
    mostrarDivPozo();
  });
}

function mostrarDivPozo(){
  location.href = "#campo_focus_6";
  $('#collapse_evaluacion_preliminar').collapse('hide');
  $('#collapse_elementos_proteccion_personal').collapse('hide');
  $('#collapse_elementos_del_inspector').collapse('hide');
  $('#collapse_cabina').collapse('hide');
  $('#collapse_maquinas').collapse('hide');
  $('#collapse_pozo').collapse('show');
  $('#collapse_foso').collapse('hide');
  $('#items_lista_verificacion').show('fast');
}

/*=============================================
* Funcion que se ejecuta cuando clickamos en el div de REVISIÓN DE FOSO
* Permite mostrar u ocultar los conrtoles para un mejor rendimiento del app
*==============================================*/
function clickDivFoso(){
  $(".div_8").click(function(){
    mostrarDivFoso();
  });
}

function mostrarDivFoso(){
  location.href = "#campo_focus_7";
  $('#collapse_evaluacion_preliminar').collapse('hide');
  $('#collapse_elementos_proteccion_personal').collapse('hide');
  $('#collapse_elementos_del_inspector').collapse('hide');
  $('#collapse_cabina').collapse('hide');
  $('#collapse_maquinas').collapse('hide');
  $('#collapse_pozo').collapse('hide');
  $('#collapse_foso').collapse('show');
  $('#items_lista_verificacion').show('fast');
}

/*=============================================
* Funcion que permite mostrar la fecha de la inspeccion
*==============================================*/
function mostrarFecha(){
  var fecha = new Date();
  var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
  var numero_meses = new Array ("01","02","03","04","05","06","07","08","09","10","11","12");
  var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
  var dia = 0;   
  
  if (fecha.getDate() < 10) {
    dia = "0"+fecha.getDate();
  } else {
    dia = fecha.getDate();
  }

  fecha = dia+"/"+numero_meses[fecha.getMonth()]+"/"+fecha.getFullYear();
  //$("#text_fecha").val(fecha);
}

/*=============================================
* Funcion que carga el ultimo consecutivo de inspeccion para mostrarlo en el campo del formulario
* Se guardan en variables de sesion los valores del codigo y consecutivo de inspeccion
*==============================================*/
function mostrarConsecutivoInspeccion(){
  db.transaction(function (tx) {
    var query = "SELECT MAX(k_consecutivo) AS m, n_inspeccion FROM consecutivo_ascensores";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Consecutivo Inspeccion Ascensores -> '+resultSet.rows.item(0).m + '\nInspeccion Nº -> '+resultSet.rows.item(0).n_inspeccion);
      $("#text_consecutivo").val(resultSet.rows.item(0).n_inspeccion);
      window.sessionStorage.setItem("codigo_inspeccion", resultSet.rows.item(0).m);
      window.sessionStorage.setItem("consecutivo_inspeccion", resultSet.rows.item(0).n_inspeccion);
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}