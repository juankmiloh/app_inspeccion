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
  clickDivDefectos();
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
  location.href = "#campo_focus_2";
  $('#collapse_evaluacion_preliminar').collapse('show');
  $('#collapse_elementos_proteccion_personal').collapse('hide');
  $('#collapse_elementos_del_inspector').collapse('hide');
  $('#collapse_defectos').collapse('hide');
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
  $('#collapse_defectos').collapse('hide');
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
  $('#collapse_defectos').collapse('hide');
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
  $('#items_lista_verificacion').show('fast');
  location.href = "#campo_focus_4";
  $('#collapse_evaluacion_preliminar').collapse('hide');
  $('#collapse_elementos_proteccion_personal').collapse('hide');
  $('#collapse_elementos_del_inspector').collapse('hide');
  $('#collapse_defectos').collapse('hide');
}

/*=============================================
* Funcion que se ejecuta cuando clickamos en el div de DEFECTOS - LISTA # 1
* Permite mostrar u ocultar los conrtoles para un mejor rendimiento del app
*==============================================*/
function clickDivDefectos(){
  $(".div_5").click(function(){
    mostrarDivDefectos();
  });
}

function mostrarDivDefectos(){
  location.href = "#campo_focus_4";
  $('#items_lista_verificacion').show();
  $('#collapse_evaluacion_preliminar').collapse('hide');
  $('#collapse_elementos_proteccion_personal').collapse('hide');
  $('#collapse_elementos_del_inspector').collapse('hide');
  $('#collapse_defectos').collapse('show');
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
  obtenerValoresDefectos(cod_usuario,cod_inspeccion);
  obtenerValoresObservacionFinal(cod_usuario,cod_inspeccion);
}

/*=============================================
* Funcion para hacer un select a la tabla escaleras_valores_iniciales que recibe por parametro el codigo de la inspeccion
*==============================================*/
function obtenerValoresIniciales(cod_usuario,cod_inspeccion){
  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,"+
                       "k_codinspeccion,"+
                       "n_cliente,"+
                       "n_equipo,"+
                       "n_empresamto,"+
                       "v_velocidad,"+
                       "o_tipo_equipo,"+
                       "v_inclinacion,"+
                       "v_ancho_paso,"+
                       "f_fecha,"+
                       "ultimo_mto,"+
                       "inicio_servicio,"+
                       "ultima_inspeccion,"+        
                       "v_codigo,"+
                       "o_consecutivoinsp,"+
                       "h_hora,"+
                       "o_tipo_informe "+
                       "FROM escaleras_valores_iniciales "+
                       "WHERE k_codusuario = ? AND "+
                       "k_codinspeccion = ?";
    tx.executeSql(query, [cod_usuario,cod_inspeccion], function (tx, resultSet) {
      var textCliente = resultSet.rows.item(0).n_cliente;
      var textEquipo = resultSet.rows.item(0).n_equipo;
      var textEmpresaMantenimiento = resultSet.rows.item(0).n_empresamto;
      var text_velocidad = resultSet.rows.item(0).v_velocidad;
      var text_tipoEquipo = resultSet.rows.item(0).o_tipo_equipo;
      var text_inclinacion = resultSet.rows.item(0).v_inclinacion;
      var text_ancho_paso = resultSet.rows.item(0).v_ancho_paso;
      var textFecha = resultSet.rows.item(0).f_fecha;
      var text_ultimo_mto = resultSet.rows.item(0).ultimo_mto;
      var text_inicio_servicio = resultSet.rows.item(0).inicio_servicio;
      var text_ultima_inspec = resultSet.rows.item(0).ultima_inspeccion;
      var consecutivo = resultSet.rows.item(0).o_consecutivoinsp;

      cargarValoresIniciales(textCliente,textEquipo,textEmpresaMantenimiento,text_velocidad,
                             text_tipoEquipo,text_inclinacion,text_ancho_paso,textFecha,
                             text_ultimo_mto,text_inicio_servicio,text_ultima_inspec,consecutivo);
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
function cargarValoresIniciales(textCliente,textEquipo,textEmpresaMantenimiento,text_velocidad,
                                text_tipoEquipo,text_inclinacion,text_ancho_paso,textFecha,
                                text_ultimo_mto,text_inicio_servicio,text_ultima_inspec,consecutivo){
  $("#text_cliente").val(textCliente);
  $("#text_equipo").val(textEquipo);
  $("#text_empresaMantenimiento").val(textEmpresaMantenimiento);
  $("#text_velocidad").val(text_velocidad);
  $("#text_tipoEquipo").val(text_tipoEquipo);
  $("#text_inclinacion").val(text_inclinacion);
  $("#text_ancho_paso").val(text_ancho_paso);
  $("#text_fecha").val(textFecha);
  $("#text_ultimo_mto").val(text_ultimo_mto);
  $("#text_inicio_servicio").val(text_inicio_servicio);
  $("#text_ultima_inspec").val(text_ultima_inspec);
  $("#text_consecutivo").val(consecutivo);
}

/*=============================================
* Funcion para hacer un select a la tabla escaleras_valores_preliminar que recibe por parametro el codigo de la inspeccion
*==============================================*/
function obtenerValoresPreliminar(cod_usuario,cod_inspeccion){
  db.transaction(function (tx) {
    var query = "SELECT k_coditem_preli,v_calificacion,o_observacion FROM escaleras_valores_preliminar WHERE k_codusuario = ? AND k_codinspeccion = ?";
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
* Funcion para hacer un select a la tabla escaleras_valores_proteccion que recibe por parametro el codigo de la inspeccion
*==============================================*/
function obtenerValoresProteccion(cod_usuario,cod_inspeccion){
  db.transaction(function (tx) {
    var query = "SELECT k_coditem,v_sele_inspector,v_sele_empresa,o_observacion FROM escaleras_valores_proteccion WHERE k_codusuario = ? AND k_codinspeccion = ?";
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
* Funcion para hacer un select a la tabla escaleras_valores_elementos que recibe por parametro el codigo de la inspeccion
*==============================================*/
function obtenerValoresElementos(cod_usuario,cod_inspeccion){
  db.transaction(function (tx) {
    var query = "SELECT k_coditem,v_selecion FROM escaleras_valores_elementos WHERE k_codusuario = ? AND k_codinspeccion = ?";
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
* Funcion para hacer un select a la tabla escaleras_valores_defectos que recibe por parametro el codigo de la inspeccion
*==============================================*/
function obtenerValoresDefectos(cod_usuario,cod_inspeccion){
  db.transaction(function (tx) {
    var query = "SELECT k_coditem,v_calificacion,o_observacion,n_calificacion FROM escaleras_valores_defectos WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [cod_usuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        $("input[name=sele_defectos"+i+"][value='"+resultSet.rows.item(x).v_calificacion+"']").prop("checked",true);
        $('#text_lv_valor_observacion_'+i).val(resultSet.rows.item(x).o_observacion);
      }
      $('#text_calificacion77').val(resultSet.rows.item(76).n_calificacion); //se obtiene la calificacion de la posicion 76 en este caso 76 ya que se empieza a contar desde cero
      $('#cal_item_defectos77').val(resultSet.rows.item(76).n_calificacion);
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
* Funcion para hacer un select a la tabla escaleras_valores_finales que recibe por parametro el codigo de la inspeccion
*==============================================*/
function obtenerValoresObservacionFinal(cod_usuario,cod_inspeccion){
  db.transaction(function (tx) {
    var query = "SELECT o_observacion FROM escaleras_valores_finales WHERE k_codusuario = ? AND k_codinspeccion = ?";
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

