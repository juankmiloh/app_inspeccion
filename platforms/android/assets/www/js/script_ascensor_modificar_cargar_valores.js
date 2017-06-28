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
  clickDivCabina();
  clickDivMaquinas();
  clickDivPozo();
  clickDivFoso();
  /* FUNCIONES PARA MODIFICAR LA INSPECCION */
  var cod_usuario = getQueryVariable('cod_usuario');
  var cod_inspeccion = getQueryVariable('id_inspeccion');
  modificarInspeccion(cod_usuario,cod_inspeccion);
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
  obtenerValoresCabina(cod_usuario,cod_inspeccion);
  obtenerValoresMaquinas(cod_usuario,cod_inspeccion);
  obtenerValoresPozo(cod_usuario,cod_inspeccion);
  obtenerValoresFoso(cod_usuario,cod_inspeccion);
  obtenerValoresObservacionFinal(cod_usuario,cod_inspeccion);
}

/*=============================================
* Funcion para hacer un select a la tabla ascensor_valores_iniciales que recibe por parametro el codigo de la inspeccion
*==============================================*/
function obtenerValoresIniciales(cod_usuario,cod_inspeccion){
  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,"+
               "k_codinspeccion,"+
               "n_cliente,"+
               "n_equipo,"+
               "n_empresamto,"+
               "o_tipoaccion,"+
               "v_capacperson,"+
               "v_capacpeso,"+
               "v_paradas,"+
               "f_fecha,"+
               "v_codigo,"+
               "o_consecutivoinsp,"+
               "ultimo_mto,"+
               "inicio_servicio,"+
               "ultima_inspeccion,"+
               "h_hora,"+
               "o_tipo_informe "+
               "FROM ascensor_valores_iniciales "+
               "WHERE k_codusuario = ? AND "+
               "k_codinspeccion = ?";
    tx.executeSql(query, [cod_usuario,cod_inspeccion], function (tx, resultSet) {
      var cliente = resultSet.rows.item(0).n_cliente;
      var nombre_equipo = resultSet.rows.item(0).n_equipo;
      var empresa_mto = resultSet.rows.item(0).n_empresamto;
      var accionamiento = resultSet.rows.item(0).o_tipoaccion;
      var capac_person = resultSet.rows.item(0).v_capacperson;
      var capac_peso = resultSet.rows.item(0).v_capacpeso;
      var fecha = resultSet.rows.item(0).f_fecha;
      var num_paradas = resultSet.rows.item(0).v_paradas;
      var consecutivo = resultSet.rows.item(0).o_consecutivoinsp;
      var ultimo_mto = resultSet.rows.item(0).ultimo_mto;
      var inicio_servicio = resultSet.rows.item(0).inicio_servicio;
      var ultima_inspeccion = resultSet.rows.item(0).ultima_inspeccion;

      cargarValoresIniciales(cliente,nombre_equipo,empresa_mto,accionamiento,capac_person,capac_peso,num_paradas,fecha,consecutivo,ultimo_mto,inicio_servicio,ultima_inspeccion);
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
function cargarValoresIniciales(cliente,nombre_equipo,empresa_mto,accionamiento,capac_person,capac_peso,num_paradas,fecha,consecutivo,ultimo_mto,inicio_servicio,ultima_inspeccion){
  $("#text_cliente").val(cliente);
  $("#text_equipo").val(nombre_equipo);
  $("#text_empresaMantenimiento").val(empresa_mto);
  $("#text_tipoAccionamiento").val(accionamiento);
  $("#text_capacidadPersonas").val(capac_person);
  $("#text_capacidadPeso").val(capac_peso);
  $("#text_numeroParadas").val(num_paradas);
  $("#text_fecha").val(fecha);
  $("#text_consecutivo").val(consecutivo);
  $("#text_ultimo_mto").val(ultimo_mto);
  $("#text_inicio_servicio").val(inicio_servicio);
  $("#text_ultima_inspec").val(ultima_inspeccion);
}

/*=============================================
* Funcion para hacer un select a la tabla ascensor_valores_preliminar que recibe por parametro el codigo de la inspeccion
*==============================================*/
function obtenerValoresPreliminar(cod_usuario,cod_inspeccion){
  db.transaction(function (tx) {
    var query = "SELECT k_coditem_preli,v_calificacion,o_observacion FROM ascensor_valores_preliminar WHERE k_codusuario = ? AND k_codinspeccion = ?";
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
* Funcion para hacer un select a la tabla ascensor_valores_proteccion que recibe por parametro el codigo de la inspeccion
*==============================================*/
function obtenerValoresProteccion(cod_usuario,cod_inspeccion){
  db.transaction(function (tx) {
    var query = "SELECT k_coditem,v_sele_inspector,v_sele_empresa,o_observacion FROM ascensor_valores_proteccion WHERE k_codusuario = ? AND k_codinspeccion = ?";
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
* Funcion para hacer un select a la tabla ascensor_valores_elementos que recibe por parametro el codigo de la inspeccion
*==============================================*/
function obtenerValoresElementos(cod_usuario,cod_inspeccion){
  db.transaction(function (tx) {
    var query = "SELECT k_coditem,v_selecion FROM ascensor_valores_elementos WHERE k_codusuario = ? AND k_codinspeccion = ?";
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
* Funcion para hacer un select a la tabla ascensor_valores_cabina que recibe por parametro el codigo de la inspeccion
*==============================================*/
function obtenerValoresCabina(cod_usuario,cod_inspeccion){
  db.transaction(function (tx) {
    var query = "SELECT k_coditem,v_calificacion,o_observacion FROM ascensor_valores_cabina WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [cod_usuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        $("input[name=sele_cabina"+i+"][value='"+resultSet.rows.item(x).v_calificacion+"']").prop("checked",true);
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
* Funcion para hacer un select a la tabla ascensor_valores_maquinas que recibe por parametro el codigo de la inspeccion
*==============================================*/
function obtenerValoresMaquinas(cod_usuario,cod_inspeccion){
  db.transaction(function (tx) {
    var query = "SELECT k_coditem,v_calificacion,o_observacion FROM ascensor_valores_maquinas WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [cod_usuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 36; x < resultSet.rows.length; x++,i++) {
        $("input[name=sele_maquinas"+i+"][value='"+resultSet.rows.item(x).v_calificacion+"']").prop("checked",true);
        $('#text_maquinas_observacion_'+i).val(resultSet.rows.item(x).o_observacion);
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
* Funcion para hacer un select a la tabla ascensor_valores_pozo que recibe por parametro el codigo de la inspeccion
*==============================================*/
function obtenerValoresPozo(cod_usuario,cod_inspeccion){
  db.transaction(function (tx) {
    var query = "SELECT k_coditem,v_calificacion,o_observacion FROM ascensor_valores_pozo WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [cod_usuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 83; x < resultSet.rows.length; x++,i++) {
        $("input[name=sele_pozo"+i+"][value='"+resultSet.rows.item(x).v_calificacion+"']").prop("checked",true);
        $('#text_pozo_observacion_'+i).val(resultSet.rows.item(x).o_observacion);
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
* Funcion para hacer un select a la tabla ascensor_valores_foso que recibe por parametro el codigo de la inspeccion
*==============================================*/
function obtenerValoresFoso(cod_usuario,cod_inspeccion){
  db.transaction(function (tx) {
    var query = "SELECT k_coditem,v_calificacion,o_observacion FROM ascensor_valores_foso WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [cod_usuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 148; x < resultSet.rows.length; x++,i++) {
        $("input[name=sele_foso"+i+"][value='"+resultSet.rows.item(x).v_calificacion+"']").prop("checked",true);
        $('#text_foso_observacion_'+i).val(resultSet.rows.item(x).o_observacion);
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
* Funcion para hacer un select a la tabla ascensor_valores_finales que recibe por parametro el codigo de la inspeccion
*==============================================*/
function obtenerValoresObservacionFinal(cod_usuario,cod_inspeccion){
  db.transaction(function (tx) {
    var query = "SELECT o_observacion FROM ascensor_valores_finales WHERE k_codusuario = ? AND k_codinspeccion = ?";
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

