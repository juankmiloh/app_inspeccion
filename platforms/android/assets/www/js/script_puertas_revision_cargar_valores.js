$(document).ready(function($){
  /* CARGAR FUNCIONES INICIALES */
  //alert("probando script");
  mostrarBarraHeader();
  /* FUNCIONES QUE PERMITEN OPTIMIZAR EL RENDIMIENTO DEL FORMULARIO HTML */
  ocultarDivs();
  clickDivPreliminar();
  clickDivProteccion();
  clickDivElementos();
  clickDivListaVerificacion();
  clickDivMecanicos();
  clickDivElectrica();
  clickDivMotorizacion();
  clickDivOtras();
  clickDivManiobras();
  /* FUNCIONES PARA MODIFICAR LA INSPECCION */
  var cod_usuario = getQueryVariable('cod_usuario');
  var cod_inspeccion = getQueryVariable('id_inspeccion');
  modificarInspeccion(cod_usuario,cod_inspeccion);
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
  $('#collapse_evaluacion_preliminar').collapse('show');
  location.href = "#campo_focus_2";
  $('#collapse_elementos_proteccion_personal').collapse('hide');
  $('#collapse_elementos_del_inspector').collapse('hide');
  $('#collapse_mecanicos').collapse('hide');
  $('#collapse_electrica').collapse('hide');
  $('#collapse_motorizacion').collapse('hide');
  $('#collapse_otras').collapse('hide');
  $('#collapse_maniobras').collapse('hide');
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
  $('#collapse_evaluacion_preliminar').collapse('hide');
  location.href = "#campo_focus_2";
  $('#collapse_elementos_proteccion_personal').collapse('show');
  $('#collapse_elementos_del_inspector').collapse('hide');
  $('#collapse_mecanicos').collapse('hide');
  $('#collapse_electrica').collapse('hide');
  $('#collapse_motorizacion').collapse('hide');
  $('#collapse_otras').collapse('hide');
  $('#collapse_maniobras').collapse('hide');
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
  $('#collapse_evaluacion_preliminar').collapse('hide');
  location.href = "#campo_focus_3";
  $('#collapse_elementos_proteccion_personal').collapse('hide');
  $('#collapse_elementos_del_inspector').collapse('show');
  $('#collapse_mecanicos').collapse('hide');
  $('#collapse_electrica').collapse('hide');
  $('#collapse_motorizacion').collapse('hide');
  $('#collapse_otras').collapse('hide');
  $('#collapse_maniobras').collapse('hide');
  $('#items_lista_verificacion').hide();
}

/*=============================================
* Funcion que se ejecuta cuando clickamos en el div de LISTA DE DEFECTOS
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
  $('#items_lista_verificacion').show('fast');
  location.href = "#campo_focus_4";
  $('#collapse_evaluacion_preliminar').collapse('hide');
  $('#collapse_elementos_proteccion_personal').collapse('hide');
  $('#collapse_elementos_del_inspector').collapse('hide');
  $('#collapse_mecanicos').collapse('hide');
  $('#collapse_electrica').collapse('hide');
  $('#collapse_motorizacion').collapse('hide');
  $('#collapse_otras').collapse('hide');
  $('#collapse_maniobras').collapse('hide');
}

/*=============================================
* Funcion que se ejecuta cuando clickamos en el div de ELEMENTOS MECANICOS
* Permite mostrar u ocultar los conrtoles para un mejor rendimiento del app
*==============================================*/
function clickDivMecanicos(){
  $(".div_5").click(function(){
    mostrarDivMecanicos();
  });
}

function mostrarDivMecanicos(){
  $('#items_lista_verificacion').show();
  location.href = "#campo_focus_4";
  $('#collapse_evaluacion_preliminar').collapse('hide');
  $('#collapse_elementos_proteccion_personal').collapse('hide');
  $('#collapse_elementos_del_inspector').collapse('hide');
  $('#collapse_mecanicos').collapse('show');
  $('#collapse_electrica').collapse('hide');
  $('#collapse_motorizacion').collapse('hide');
  $('#collapse_otras').collapse('hide');
  $('#collapse_maniobras').collapse('hide');
}

/*=============================================
* Funcion que se ejecuta cuando clickamos en el div de INSTALACION ELECTRICA
* Permite mostrar u ocultar los conrtoles para un mejor rendimiento del app
*==============================================*/
function clickDivElectrica(){
  $(".div_6").click(function(){
    mostrarDivElectrica();
  });
}

function mostrarDivElectrica(){
  $('#items_lista_verificacion').show();
  location.href = "#campo_focus_5";
  $('#collapse_evaluacion_preliminar').collapse('hide');
  $('#collapse_elementos_proteccion_personal').collapse('hide');
  $('#collapse_elementos_del_inspector').collapse('hide');
  $('#collapse_mecanicos').collapse('hide');
  $('#collapse_electrica').collapse('show');
  $('#collapse_motorizacion').collapse('hide');
  $('#collapse_otras').collapse('hide');
  $('#collapse_maniobras').collapse('hide');
}

/*=============================================
* Funcion que se ejecuta cuando clickamos en el div de MOTORIZACION
* Permite mostrar u ocultar los conrtoles para un mejor rendimiento del app
*==============================================*/
function clickDivMotorizacion(){
  $(".div_7").click(function(){
    mostrarDivMotorizacion();
  });
}

function mostrarDivMotorizacion(){
  $('#items_lista_verificacion').show();
  location.href = "#campo_focus_6";
  $('#collapse_evaluacion_preliminar').collapse('hide');
  $('#collapse_elementos_proteccion_personal').collapse('hide');
  $('#collapse_elementos_del_inspector').collapse('hide');
  $('#collapse_mecanicos').collapse('hide');
  $('#collapse_electrica').collapse('hide');
  $('#collapse_motorizacion').collapse('show');
  $('#collapse_otras').collapse('hide');
  $('#collapse_maniobras').collapse('hide');
}

/*=============================================
* Funcion que se ejecuta cuando clickamos en el div de OTRAS COMPROBACIONES
* Permite mostrar u ocultar los conrtoles para un mejor rendimiento del app
*==============================================*/
function clickDivOtras(){
  $(".div_8").click(function(){
    mostrarDivOtras();
  });
}

function mostrarDivOtras(){
  $('#items_lista_verificacion').show();
  location.href = "#campo_focus_7";
  $('#collapse_evaluacion_preliminar').collapse('hide');
  $('#collapse_elementos_proteccion_personal').collapse('hide');
  $('#collapse_elementos_del_inspector').collapse('hide');
  $('#collapse_mecanicos').collapse('hide');
  $('#collapse_electrica').collapse('hide');
  $('#collapse_motorizacion').collapse('hide');
  $('#collapse_otras').collapse('show');
  $('#collapse_maniobras').collapse('hide');
}

/*=============================================
* Funcion que se ejecuta cuando clickamos en el div de MANIOBRAS DE SEGURIDAD
* Permite mostrar u ocultar los conrtoles para un mejor rendimiento del app
*==============================================*/
function clickDivManiobras(){
  $(".div_9").click(function(){
    mostrarDivManiobras();
  });
}

function mostrarDivManiobras(){
  $('#items_lista_verificacion').show();
  location.href = "#campo_focus_8";
  $('#collapse_evaluacion_preliminar').collapse('hide');
  $('#collapse_elementos_proteccion_personal').collapse('hide');
  $('#collapse_elementos_del_inspector').collapse('hide');
  $('#collapse_mecanicos').collapse('hide');
  $('#collapse_electrica').collapse('hide');
  $('#collapse_motorizacion').collapse('hide');
  $('#collapse_otras').collapse('hide');
  $('#collapse_maniobras').collapse('show');
}

/*=============================================
* Funcion que permite capturar el valor de la variable enviada por URL
*==============================================*/
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}

/*=============================================
* Funcion que recibe y envia por parametro el codigo de la inspeccion a modificar y permite llamar varias funciones que cargan los valores en la lista
*==============================================*/
function modificarInspeccion(cod_usuario,cod_inspeccion){
  obtenerValoresIniciales(cod_usuario,cod_inspeccion);
  obtenerValoresPreliminar(cod_usuario,cod_inspeccion);
  obtenerValoresProteccion(cod_usuario,cod_inspeccion);
  obtenerValoresElementos(cod_usuario,cod_inspeccion);
  obtenerValoresMecanicos(cod_usuario,cod_inspeccion);
  obtenerValoresElectrica(cod_usuario,cod_inspeccion);
  obtenerValoresMotorizacion(cod_usuario,cod_inspeccion);
  obtenerValoresOtras(cod_usuario,cod_inspeccion);
  obtenerValoresManiobras(cod_usuario,cod_inspeccion);
  obtenerValoresObservacionFinal(cod_usuario,cod_inspeccion);
}

/*=============================================
* Funcion para hacer un select a la tabla puertas_valores_iniciales que recibe por parametro el codigo de la inspeccion
*==============================================*/
function obtenerValoresIniciales(cod_usuario,cod_inspeccion){
  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,"+
                       "k_codinspeccion,"+
                       "n_cliente,"+
                       "n_equipo,"+
                       "n_empresamto,"+
                       "o_desc_puerta,"+
                       "o_tipo_puerta,"+
                       "o_motorizacion,"+
                       "o_acceso,"+
                       "o_accionamiento,"+
                       "o_operador,"+
                       "o_hoja,"+
                       "o_transmision,"+
                       "o_identificacion,"+
                       "f_fecha,"+
                       "v_ancho,"+
                       "v_alto,"+          
                       "v_codigo,"+
                       "o_consecutivoinsp,"+
                       "ultimo_mto,"+
                       "inicio_servicio,"+
                       "ultima_inspeccion,"+
                       "h_hora,"+
                       "o_tipo_informe "+
                       "FROM puertas_valores_iniciales "+
                       "WHERE k_codusuario = ? AND "+
                       "k_codinspeccion = ?";
    tx.executeSql(query, [cod_usuario,cod_inspeccion], function (tx, resultSet) {
      var textCliente = resultSet.rows.item(0).n_cliente;
      var textEquipo = resultSet.rows.item(0).n_equipo;
      var textEmpresaMantenimiento = resultSet.rows.item(0).n_empresamto;
      var text_desc_puerta = resultSet.rows.item(0).o_desc_puerta;
      var text_tipoPuerta = resultSet.rows.item(0).o_tipo_puerta;
      var text_motorizacion = resultSet.rows.item(0).o_motorizacion;
      var text_acceso = resultSet.rows.item(0).o_acceso;
      var text_accionamiento = resultSet.rows.item(0).o_accionamiento;
      var text_operador = resultSet.rows.item(0).o_operador;
      var text_hoja = resultSet.rows.item(0).o_hoja;
      var text_transmision = resultSet.rows.item(0).o_transmision;
      var text_identificacion = resultSet.rows.item(0).o_identificacion;
      var textFecha = resultSet.rows.item(0).f_fecha;
      var text_ultimo_mto = resultSet.rows.item(0).ultimo_mto;
      var text_inicio_servicio = resultSet.rows.item(0).inicio_servicio;
      var text_ultima_inspec = resultSet.rows.item(0).ultima_inspeccion;
      var text_ancho = resultSet.rows.item(0).v_ancho;
      var text_alto = resultSet.rows.item(0).v_alto;
      var consecutivo = resultSet.rows.item(0).o_consecutivoinsp;

      cargarValoresIniciales(textCliente,textEquipo,textEmpresaMantenimiento,text_desc_puerta,
                             text_tipoPuerta,text_motorizacion,text_acceso,text_accionamiento,
                             text_operador,text_hoja,text_transmision,text_identificacion,
                             textFecha,text_ultimo_mto,text_inicio_servicio,text_ultima_inspec,text_ancho,text_alto,consecutivo);
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

/*=============================================
* Funcion para mostrar los valores obtenidos de la consulta en los respectivos campos del formulario
*==============================================*/
function cargarValoresIniciales(textCliente,textEquipo,textEmpresaMantenimiento,text_desc_puerta,
                                text_tipoPuerta,text_motorizacion,text_acceso,text_accionamiento,
                                text_operador,text_hoja,text_transmision,text_identificacion,
                                textFecha,text_ultimo_mto,text_inicio_servicio,text_ultima_inspec,text_ancho,text_alto,consecutivo){
  $("#text_cliente").val(textCliente);
  $("#text_equipo").val(textEquipo);
  $("#text_empresaMantenimiento").val(textEmpresaMantenimiento);
  $("#text_desc_puerta").val(text_desc_puerta);
  $("#text_tipoPuerta").val(text_tipoPuerta);
  $("#text_motorizacion").val(text_motorizacion);
  $("#text_acceso").val(text_acceso);
  $("#text_accionamiento").val(text_accionamiento);
  $("#text_operador").val(text_operador);
  $("#text_hoja").val(text_hoja);
  $("#text_transmision").val(text_transmision);
  $("#text_identificacion").val(text_identificacion);
  $("#text_fecha").val(textFecha);
  $("#text_ultimo_mto").val(text_ultimo_mto);
  $("#text_inicio_servicio").val(text_inicio_servicio);
  $("#text_ultima_inspec").val(text_ultima_inspec);
  $("#text_ancho").val(text_ancho);
  $("#text_alto").val(text_alto);
  $("#text_consecutivo").val(consecutivo);
}

/*=============================================
* Funcion para hacer un select a la tabla puertas_valores_preliminar que recibe por parametro el codigo de la inspeccion
*==============================================*/
function obtenerValoresPreliminar(cod_usuario,cod_inspeccion){
  db.transaction(function (tx) {
    var query = "SELECT k_coditem_preli,v_calificacion,o_observacion FROM puertas_valores_preliminar WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [cod_usuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        $("input[name=seleval"+i+"][value='"+resultSet.rows.item(x).v_calificacion+"']").prop("checked",true);
        $("#text_obser_item"+i+"_eval_prel").val(resultSet.rows.item(x).o_observacion);
      }
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

/*=============================================
* Funcion para hacer un select a la tabla puertas_valores_proteccion que recibe por parametro el codigo de la inspeccion
*==============================================*/
function obtenerValoresProteccion(cod_usuario,cod_inspeccion){
  db.transaction(function (tx) {
    var query = "SELECT k_coditem,v_sele_inspector,v_sele_empresa,o_observacion FROM puertas_valores_proteccion WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [cod_usuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        $("input[name=sele_protec_person"+i+"][value='"+resultSet.rows.item(x).v_sele_inspector+"']").prop("checked",true);
        $("input[name=sele_protec_person"+i+"_"+i+"][value='"+resultSet.rows.item(x).v_sele_empresa+"']").prop("checked",true);
        $('#text_obser_protec_person'+i).val(resultSet.rows.item(x).o_observacion);
      }
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

/*=============================================
* Funcion para hacer un select a la tabla puertas_valores_elementos que recibe por parametro el codigo de la inspeccion
*==============================================*/
function obtenerValoresElementos(cod_usuario,cod_inspeccion){
  db.transaction(function (tx) {
    var query = "SELECT k_coditem,v_selecion FROM puertas_valores_elementos WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [cod_usuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        $("input[name=sele_element_inspec"+i+"][value='"+resultSet.rows.item(x).v_selecion+"']").prop("checked",true);
      }
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

/*=============================================
* Funcion para hacer un select a la tabla puertas_valores_mecanicos que recibe por parametro el codigo de la inspeccion
*==============================================*/
function obtenerValoresMecanicos(cod_usuario,cod_inspeccion){
  db.transaction(function (tx) {
    var query = "SELECT k_coditem,v_calificacion,o_observacion FROM puertas_valores_mecanicos WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [cod_usuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        $("input[name=sele_mecanicos"+i+"][value='"+resultSet.rows.item(x).v_calificacion+"']").prop("checked",true);
        $('#text_lv_valor_observacion_'+i).val(resultSet.rows.item(x).o_observacion);
      }
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

/*=============================================
* Funcion para hacer un select a la tabla puertas_valores_electrica que recibe por parametro el codigo de la inspeccion
*==============================================*/
function obtenerValoresElectrica(cod_usuario,cod_inspeccion){
  db.transaction(function (tx) {
    var query = "SELECT k_coditem,v_calificacion,o_observacion FROM puertas_valores_electrica WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [cod_usuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 38; x < resultSet.rows.length; x++,i++) {
        $("input[name=sele_electrica"+i+"][value='"+resultSet.rows.item(x).v_calificacion+"']").prop("checked",true);
        $('#text_electrica_observacion_'+i).val(resultSet.rows.item(x).o_observacion);
      }
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

/*=============================================
* Funcion para hacer un select a la tabla puertas_valores_motorizacion que recibe por parametro el codigo de la inspeccion
*==============================================*/
function obtenerValoresMotorizacion(cod_usuario,cod_inspeccion){
  db.transaction(function (tx) {
    var query = "SELECT k_coditem,v_calificacion,o_observacion FROM puertas_valores_motorizacion WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [cod_usuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 43; x < resultSet.rows.length; x++,i++) {
        $("input[name=sele_motorizacion"+i+"][value='"+resultSet.rows.item(x).v_calificacion+"']").prop("checked",true);
        $('#text_motorizacion_observacion_'+i).val(resultSet.rows.item(x).o_observacion);
      }
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

/*=============================================
* Funcion para hacer un select a la tabla puertas_valores_otras que recibe por parametro el codigo de la inspeccion
*==============================================*/
function obtenerValoresOtras(cod_usuario,cod_inspeccion){
  db.transaction(function (tx) {
    var query = "SELECT k_coditem,v_calificacion,o_observacion,n_calificacion FROM puertas_valores_otras WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [cod_usuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 55; x < resultSet.rows.length; x++,i++) {
        $("input[name=sele_otras"+i+"][value='"+resultSet.rows.item(x).v_calificacion+"']").prop("checked",true);
        $('#text_otras_observacion_'+i).val(resultSet.rows.item(x).o_observacion);
      }
      $('#text_calificacion55').val(resultSet.rows.item(0).n_calificacion); //se coloca el cero porque 55 es el primer valor de la lista
      $('#cal_item_otras55').val(resultSet.rows.item(0).n_calificacion); //se coloca el cero porque 55 es el primer valor de la lista
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

/*=============================================
* Funcion para hacer un select a la tabla puertas_valores_maniobras que recibe por parametro el codigo de la inspeccion
*==============================================*/
function obtenerValoresManiobras(cod_usuario,cod_inspeccion){
  db.transaction(function (tx) {
    var query = "SELECT k_coditem,v_calificacion,o_observacion FROM puertas_valores_maniobras WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [cod_usuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 76; x < resultSet.rows.length; x++,i++) {
        $("input[name=sele_maniobras"+i+"][value='"+resultSet.rows.item(x).v_calificacion+"']").prop("checked",true);
        $('#text_maniobras_observacion_'+i).val(resultSet.rows.item(x).o_observacion);
      }
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

/*=============================================
* Funcion para hacer un select a la tabla puertas_valores_finales que recibe por parametro el codigo de la inspeccion
*==============================================*/
function obtenerValoresObservacionFinal(cod_usuario,cod_inspeccion){
  db.transaction(function (tx) {
    var query = "SELECT o_observacion FROM puertas_valores_finales WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [cod_usuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0; x < resultSet.rows.length; x++) {
        $("#text_observacion_final").val(resultSet.rows.item(x).o_observacion);
      }
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

