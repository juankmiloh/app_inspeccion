jQuery(document).ready(function($){
  //alert("Probando script!");
});

/*=============================================
* Crear base de datos / Hacer conexion si ya esta creada
* parametros:
* var dbShell = window.openDatabase(database_name, database_version, database_displayname, database_size);
*==============================================*/
var db = window.openDatabase("montajes_inspeccion_mp", "1.0", "Inspeccion_MP", 1000000);

/* Inicializamos la variable fecha y anio */
var fecha = new Date();
var anio = fecha.getFullYear();

/* Inicializamos la variable para contar los items no cumple */
var contador_items_nocumple = 0;

/*=============================================
* Funcion que permite abrir la ventana que aparece mientras se guarda la inspeccion
*==============================================*/
function abrirVentanaCarga(){
  $('.fb').show();
  $('.fbback').show();
  $('body').css('overflow','hidden');
}

/*=============================================
* Funcion que permite cerrar la ventana que aparece mientras se guarda la inspeccion
* Luego de que se guarde se muestra una alerta y se redirige al index
*==============================================*/
function cerrarVentanaCarga(){
  $('.fb').hide();
  $('.fbback').hide();
  $('body').css('overflow','auto');
  swal({
    title: 'Todo salio bien!',
    html: 'Se guardo la inspección Nº. ' + window.sessionStorage.getItem("consecutivo_inspeccion") + '<br>¿Desea realizar otra inspección?',
    type: 'success',
    showCancelButton: true,
    confirmButtonColor: '#428bca',
    cancelButtonColor: '#d9534f',
    confirmButtonText: 'Si',
    cancelButtonText: 'No',
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: true,
    allowOutsideClick: false
  }).then(function () {
    reiniciarInspeccion();
  }, function (dismiss) {
    // dismiss can be 'cancel', 'overlay',
    // 'close', and 'timer'
    if (dismiss === 'cancel') {
      location.href="../../index.html";
    }
  })
  // message = 'Todo salio bien, se guardo la inspeccion Nº. ' + window.sessionStorage.getItem("consecutivo_inspeccion") + '\n\n¿Desea realizar otra inspección?';
  // title = 'Montajes & Procesos M.P SAS';
  // if(navigator.notification && navigator.notification.alert){
  //   navigator.notification.confirm(
  //   message, // message
  //   onConfirm, // callback to invoke with index of button pressed
  //   title, // title
  //   ['SI','NO'] // buttonLabels -> valores [1,0]
  // );
  // }else{
  //   alert('Todo salio bien, se guardo la inspeccion Nº. ' + window.sessionStorage.getItem("consecutivo_inspeccion"));
  //   reiniciarInspeccion();
  // }
}

// function onConfirm(buttonIndex) {
//   if (buttonIndex == 1) {
//     reiniciarInspeccion();
//   }else{
//     location.href="../../index.html";
//   }
// }

/*=============================================
* Funcion que se ejecuta luego de que se guarda la inspeccion
* lo que hace es limpiar los checks de la lista y algunos campos iniciales para permitir utilizar algunos datos para otra inspeccion
* Se actuliza el consecutivo de inspeccion
*==============================================*/
function reiniciarInspeccion(){
  /*REINICIAMOS EL CONTADOR GLOBAL DE ITEMS NO CUMPLE*/
  contador_items_nocumple = 0;
  console.log(contador_items_nocumple);
  /* ACTUALIZAMOS EL CONSECUTIVO */
  actualizarConsecutivoInspeccion();
  /* REINICIAMOS ALGUNOS CONTROLES */
  $("#text_equipo").val("");
  $("#text_desc_puerta").val("");
  $("#text_tipoPuerta").find('option:first').attr('selected', 'selected').parent('select');
  $("#text_motorizacion").find('option:first').attr('selected', 'selected').parent('select');
  $("#text_acceso").find('option:first').attr('selected', 'selected').parent('select');
  $("#text_accionamiento").val("");
  $("#text_operador").val("");
  $("#text_hoja").find('option:first').attr('selected', 'selected').parent('select');
  $("#text_transmision").find('option:first').attr('selected', 'selected').parent('select');
  $("#text_identificacion").val("");
  $("#text_ultimo_mto").val("");
  $("#text_inicio_servicio").val("");
  $("#text_ultima_inspec").val("");
  $("#text_ancho").val("");
  $("#text_alto").val("");
  $("#text_observacion_final").val("");
  $("#cal_item_otras55").val("");
  $("#text_calificacion55").find('option:first').attr('selected', 'selected').parent('select');

  /* REINICIAR ITEMS PRELIMINAR */
  for (var i = 1; i <= 3; i++) {
    $('#text_obser_item'+i+'_eval_prel').val("");
  }
  /* REINICIAR ITEMS PROTECCION */
  for (var i = 1; i <= 7; i++) {
    $('#text_obser_protec_person'+i).val("");
  }
  /* REINICIAR ITEMS MECANICOS */
  for (var i = 1; i <= 37; i++) {
    $('input[name="sele_mecanicos'+i+'"]').prop('checked', false);
    $('#text_lv_valor_observacion_'+i).val("");
  }
  /* REINICIAR ITEMS ELECTRICA */
  for (var i = 38; i <= 42; i++) {
    $('input[name="sele_electrica'+i+'"]').prop('checked', false);
    $('#text_electrica_observacion_'+i).val("");
  }
  /* REINICIAR ITEMS MOT0RIZACION */
  for (var i = 43; i <= 54; i++) {
    $('input[name="sele_motorizacion'+i+'"]').prop('checked', false);
    $('#text_motorizacion_observacion_'+i).val("");
  }
  /* REINICIAR ITEMS OTRAS */
  for (var i = 55; i <= 75; i++) {
    $('input[name="sele_otras'+i+'"]').prop('checked', false);
    $('#text_otras_observacion_'+i).val("");
  }
  /* REINICIAR ITEMS MANIOBRAS */
  for (var i = 76; i <= 86; i++) {
    $('input[name="sele_maniobras'+i+'"]').prop('checked', false);
    $('#text_maniobras_observacion_'+i).val("");
  }
}

/*=============================================
* Funcion que es ejecutada desde el form action de la pagina puertas_lista_inspeccion
* Sirve para verificar si todos los check estan seleccionados, esto para no sobrecargar la pagina con el validador del form
* Se colocan en orden descendente las tablas para que empiece la verificacion de abajo de la pagina hacia arriba
* Luego si no hay campos que falten por seleccionar se procede a llamar la funcion que permite guardar la inspeccion
*==============================================*/
function verificarSeleccionChecks(){
  var v_chk_noseleccionados = 0;
  /* ITEMS MANIOBRAS */
  for (var i = 76; i <= 86; i++) {
    if( $('input:radio[name=sele_maniobras'+i+']:checked').val() == undefined ) {
      v_chk_noseleccionados += 1;
      alert("Advertencia:\n\nDebe completar todos los campos de la lista Maniobras de seguridad.");
      mostrarDivManiobras();
      $('input:radio[name=sele_maniobras'+i+']').focus();
      break;
    }
  }
  /* ITEMS OTRAS */
  for (var i = 55; i <= 75; i++) {
    if( $('input:radio[name=sele_otras'+i+']:checked').val() == undefined ) {
      v_chk_noseleccionados += 1;
      alert("Advertencia:\n\nDebe completar todos los campos de la lista Otras Comprobaciones.");
      mostrarDivOtras();
      $('input:radio[name=sele_otras'+i+']').focus();
      break;
    }
  }
  if ($('#cal_item_otras55').val() == '') {
    v_chk_noseleccionados += 1;
    alert("Advertencia:\n\nDebe asignar una calificación al defecto 55.");
    mostrarDivOtras();
  }
  /* ITEMS MOTORIZACION */
  for (var i = 43; i <= 54; i++) {
    if( $('input:radio[name=sele_motorizacion'+i+']:checked').val() == undefined ) {
      v_chk_noseleccionados += 1;
      alert("Advertencia:\n\nDebe completar todos los campos de la lista Motorización.");
      mostrarDivMotorizacion();
      $('input:radio[name=sele_motorizacion'+i+']').focus();
      break;
    }
  }
  /* ITEMS ELECTRICA */
  for (var i = 38; i <= 42; i++) {
    if( $('input:radio[name=sele_electrica'+i+']:checked').val() == undefined ) {
      v_chk_noseleccionados += 1;
      alert("Advertencia:\n\nDebe completar todos los campos de la lista Instalación Eléctrica.");
      mostrarDivElectrica();
      $('input:radio[name=sele_electrica'+i+']').focus();
      break;
    }
  }
  /* ITEMS MECANICOS */
  for (var i = 1; i <= 37; i++) {
    if( $('input:radio[name=sele_mecanicos'+i+']:checked').val() == undefined ) {
      v_chk_noseleccionados += 1;
      alert("Advertencia:\n\nDebe completar todos los campos de la lista Elementos Mecánicos.");
      mostrarDivMecanicos();
      $('input:radio[name=sele_mecanicos'+i+']').focus();
      break;
    }
  }
  /* ITEMS ELEMENTOS */
  for (var i = 1; i <= 6; i++) {
    if( $('input:radio[name=sele_element_inspec'+i+']:checked').val() == undefined ) {
      v_chk_noseleccionados += 1;
      alert("Advertencia:\n\nDebe completar todos los campos de Elementos del inspector.");
      mostrarDivElementos();
      $('input:radio[name=sele_element_inspec'+i+']').focus();
      break;
    }
  }
  /* ITEMS PROTECCION PERSONAL EMPRESA */
  for (var i = 1; i <= 7; i++) {
    if( $('input:radio[name=sele_protec_person'+i+'_'+i+']:checked').val() == undefined ) {
      v_chk_noseleccionados += 1;
      alert("Advertencia:\n\nDebe completar todos los campos de Elementos de protección Personal.");
      mostrarDivProteccion();
      $('input:radio[name=sele_protec_person'+i+'_'+i+']').focus();
      break;
    }
  }
  /* ITEMS PROTECCION PERSONAL INSPECTOR */
  for (var i = 1; i <= 7; i++) {
    if( $('input:radio[name=sele_protec_person'+i+']:checked').val() == undefined ) {
      v_chk_noseleccionados += 1;
      alert("Advertencia:\n\nDebe completar todos los campos de Elementos de protección Personal.");
      mostrarDivProteccion();
      $('input:radio[name=sele_protec_person'+i+']').focus();
      break;
    }
  }
  /* ITEMS PRELIMINAR */
  for (var i = 1; i <= 3; i++) {
    if( $('input:radio[name=seleval'+i+']:checked').val() == undefined ) {
      v_chk_noseleccionados += 1;
      alert("Advertencia:\n\nDebe completar todos los campos de la Evaluación preliminar.");
      mostrarDivPreliminar();
      $('input:radio[name=seleval'+i+']').focus();
      break;
    }else{
      //alert($('input:radio[name=seleval'+i+']:checked').val());
    }
  }
  //alert(v_chk_noseleccionados);
  return v_chk_noseleccionados;
}

/*=============================================
* Funcion que carga el ultimo consecutivo de inspeccion para mostrarlo en el campo del formulario
* Se guardan en variables de sesion los valores del codigo y consecutivo de inspeccion
*==============================================*/
function actualizarConsecutivoInspeccion(){
  db.transaction(function (tx) {
    var query = "SELECT MAX(k_consecutivo) AS m, n_inspeccion FROM consecutivo_puertas";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Consecutivo Inspeccion Puertas -> '+resultSet.rows.item(0).m + '\nInspeccion Nº -> '+resultSet.rows.item(0).n_inspeccion);
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

/*=============================================
* Funcion que permite obtener la hora
*==============================================*/
function mostrarhora(){ 
  var fecha = new Date();
  var hora = fecha.getHours();
  var minutos = fecha.getMinutes();
  var segundos = fecha.getSeconds();
  if (hora < 10) {
    hora = "0" + hora;
  }
  if (minutos < 10) {
    minutos = "0" + minutos;
  }
  if (segundos < 10) {
    segundos = "0" + segundos;
  }
  hora_final = hora + ":" + minutos + ":" + segundos; 
  window.status = hora_final;
  return window.status;
}

/*=============================================
* Funcion que se ejecuta cuando se oprime el boton Guardar Inspeccion
*==============================================*/
function guardarInspeccion_v1(){
  if (verificarSeleccionChecks() == 0) {
    /* ============================
    * REDIRECCIONAMOS AL INICIO DE LA PAGINA DE INSPECCION Y ABRIMOS LA VENTANA DE CARGA
    * LA CUAL SE CIERRA EN LA FUNCION addItemConsecutivoPuertas
    * ============================= */
    $('#texto_carga').text('Verificando items...Espere');
    location.href = "#arriba";
    /* Funcion creada en el script de mostrar consecutivo - se llama para ocultar de nuevo todos los div´s de los items */
    ocultarDivs();
    abrirVentanaCarga();
    var hora = mostrarhora();

    var codigoInspector = window.localStorage.getItem("codigo_inspector");
    var codigo_inspeccion = window.sessionStorage.getItem("codigo_inspeccion");
    var consecutivo_inspeccion = window.sessionStorage.getItem("consecutivo_inspeccion");

    var textCliente = $("#text_cliente").val();
    var textEquipo = $("#text_equipo").val();
    var textEmpresaMantenimiento = $("#text_empresaMantenimiento").val();
    var text_desc_puerta = $("#text_desc_puerta").val();
    var text_tipoPuerta = $("#text_tipoPuerta").val();
    var text_motorizacion = $("#text_motorizacion").val();
    var text_acceso = $("#text_acceso").val();
    var text_accionamiento = $("#text_accionamiento").val();
    var text_operador = $("#text_operador").val();
    var text_hoja = $("#text_hoja").val();
    var text_transmision = $("#text_transmision").val();
    var text_identificacion = $("#text_identificacion").val();
    var textFecha = $("#text_fecha").val();
    var text_ultimo_mto = $("#text_ultimo_mto").val();
    var text_inicio_servicio = $("#text_inicio_servicio").val();
    var text_ultima_inspec = $("#text_ultima_inspec").val();
    var text_ancho = $("#text_ancho").val();
    var text_alto = $("#text_alto").val();
    var text_codigo = $("#text_codigo").val();

    /* ============================
    * Si los campos de fecha quedan vacios se les coloca una linea ya que estos no son obligatorios
    * ============================= */
    if (textFecha.length < 1) {
      textFecha = "------";
    }
    if (text_ultimo_mto.length < 1) {
      text_ultimo_mto = "------";
    }
    if (text_inicio_servicio.length < 1) {
      text_inicio_servicio = "------";
    }
    if (text_ultima_inspec.length < 1) {
      text_ultima_inspec = "------";
    }

    var textObserFinal = $("#text_observacion_final").val();

    /* ============================
    * Insertar valores en las tablas
    * ============================= */
    /* Insertar valores en la tabla puertas_valores_iniciales */
    addItemsPuertasValoresIniciales(codigoInspector,
                                    codigo_inspeccion,
                                    textCliente,
                                    textEquipo,
                                    textEmpresaMantenimiento,
                                    text_desc_puerta,
                                    text_tipoPuerta,
                                    text_motorizacion,
                                    text_acceso,
                                    text_accionamiento,
                                    text_operador,
                                    text_hoja,
                                    text_transmision,
                                    text_identificacion,
                                    textFecha,
                                    text_ancho,
                                    text_alto,
                                    text_codigo,
                                    consecutivo_inspeccion,
                                    text_ultimo_mto,
                                    text_inicio_servicio,
                                    text_ultima_inspec,
                                    hora,
                                    "Inicial");
    /* Insertar valores en la tabla puertas_valores_preliminar */
    for (var i = 1; i <= 3; i++) {
      addItemsPuertasValoresPreliminar(codigoInspector,
                                       codigo_inspeccion,
                                       $('#numero_item_preliminar'+i).val(),
                                       $('input:radio[name=seleval'+i+']:checked').val(),
                                       $('#text_obser_item'+i+'_eval_prel').val());
    }
    /* Insertar valores en la tabla puertas_valores_proteccion */
    for (var i = 1; i <= 7; i++) {
      addItemsPuertasValoresProteccion(codigoInspector,
                                       codigo_inspeccion,
                                       $('#numero_item_proteccion'+i).val(),
                                       $('input:radio[name=sele_protec_person'+i+']:checked').val(),
                                       $('input:radio[name=sele_protec_person'+i+'_'+i+']:checked').val(),
                                       $('#text_obser_protec_person'+i).val());
    }
    /* Insertar valores en la tabla puertas_valores_elementos */
    for (var i = 1; i <= 6; i++) {
      addItemsPuertasValoresElementos(codigoInspector,
                                      codigo_inspeccion,
                                      $('#numero_item_element_inspec'+i).val(),
                                      $('#descrip_item_element_inspec'+i).val(),
                                      $('input:radio[name=sele_element_inspec'+i+']:checked').val());
    }
    /* Insertar valores en la tabla puertas_valores_mecanicos */
    for (var i = 1; i <= 37; i++) {
      if ($('input:radio[name=sele_mecanicos'+i+']:checked').val() == "No Cumple") {
        contador_items_nocumple += 1;
      }
      addItemsPuertasValoresMecanicos(codigoInspector,
                                      codigo_inspeccion,
                                      $('#numero_item_mecanicos'+i).val(),
                                      $('#cal_item_mecanicos'+i).val(),
                                      $('input:radio[name=sele_mecanicos'+i+']:checked').val(),
                                      $('#text_lv_valor_observacion_'+i).val());
    }
    /* Insertar valores en la tabla puertas_valores_electrica */
    for (var i = 38; i <= 42; i++) {
      if ($('input:radio[name=sele_electrica'+i+']:checked').val() == "No Cumple") {
        contador_items_nocumple += 1;
      }
      addItemsPuertasValoresElectrica(codigoInspector,
                                      codigo_inspeccion,
                                      $('#numero_item_electrica'+i).val(),
                                      $('#cal_item_electrica'+i).val(),
                                      $('input:radio[name=sele_electrica'+i+']:checked').val(),
                                      $('#text_electrica_observacion_'+i).val());
    }
    /* Insertar valores en la tabla puertas_valores_motorizacion */
    for (var i = 43; i <= 54; i++) {
      if ($('input:radio[name=sele_motorizacion'+i+']:checked').val() == "No Cumple") {
        contador_items_nocumple += 1;
      }
      addItemsPuertasValoresMotorizacion(codigoInspector,
                                         codigo_inspeccion,
                                         $('#numero_item_motorizacion'+i).val(),
                                         $('#cal_item_motorizacion'+i).val(),
                                         $('input:radio[name=sele_motorizacion'+i+']:checked').val(),
                                         $('#text_motorizacion_observacion_'+i).val());
    }
    /* Insertar valores en la tabla puertas_valores_otras */
    for (var i = 55; i <= 75; i++) {
      if ($('input:radio[name=sele_otras'+i+']:checked').val() == "No Cumple") {
        contador_items_nocumple += 1;
      }
      addItemsPuertasValoresOtras(codigoInspector,
                                  codigo_inspeccion,
                                  $('#numero_item_otras'+i).val(),
                                  $('#cal_item_otras'+i).val(),
                                  $('input:radio[name=sele_otras'+i+']:checked').val(),
                                  $('#text_otras_observacion_'+i).val());
    }
    /* Insertar valores en la tabla puertas_valores_maniobras */
    for (var i = 76; i <= 86; i++) {
      if ($('input:radio[name=sele_maniobras'+i+']:checked').val() == "No Cumple") {
        contador_items_nocumple += 1;
      }
      addItemsPuertasValoresManiobras(codigoInspector,
                                      codigo_inspeccion,
                                      $('#numero_item_maniobras'+i).val(),
                                      $('#cal_item_maniobras'+i).val(),
                                      $('input:radio[name=sele_maniobras'+i+']:checked').val(),
                                      $('#text_maniobras_observacion_'+i).val());
    }
    /* Insertar valores en la tabla puertas_valores_finales */
    addItemsPuertasValoresObservacionFinal(codigoInspector,codigo_inspeccion,textObserFinal);

    /* Se actualizan las respectivas tablas  de auditoria y la tabla que maneja el consecutivo */
    addItemsAuditoriaInspeccionesPuertas(codigoInspector,codigo_inspeccion,consecutivo_inspeccion,'Pendiente',contador_items_nocumple,codigoInspector);
    addItemConsecutivoPuertas(codigoInspector,codigo_inspeccion);
  }
}



/*=============================================
* Funcion para insertar datos en la tabla puertas_valores_iniciales
*==============================================*/
function addItemsPuertasValoresIniciales(k_codusuario,k_codinspeccion,n_cliente,n_equipo,n_empresamto,o_desc_puerta,o_tipo_puerta,o_motorizacion,o_acceso,o_accionamiento,o_operador,o_hoja,o_transmision,o_identificacion,f_fecha,v_ancho,v_alto,v_codigo,o_consecutivoinsp,ultimo_mto,inicio_servicio,ultima_inspeccion,h_hora,o_tipo_informe) {
  $('#texto_carga').text('Guardando datos iniciales...Espere');
  db.transaction(function (tx) {
    var query = "INSERT INTO puertas_valores_iniciales (k_codusuario,k_codinspeccion,n_cliente,n_equipo,n_empresamto,o_desc_puerta,o_tipo_puerta,o_motorizacion,o_acceso,o_accionamiento,o_operador,o_hoja,o_transmision,o_identificacion,f_fecha,v_ancho,v_alto,v_codigo,o_consecutivoinsp,ultimo_mto,inicio_servicio,ultima_inspeccion,h_hora,o_tipo_informe) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    tx.executeSql(query, [k_codusuario,k_codinspeccion,n_cliente,n_equipo,n_empresamto,o_desc_puerta,o_tipo_puerta,o_motorizacion,o_acceso,o_accionamiento,o_operador,o_hoja,o_transmision,o_identificacion,f_fecha,v_ancho,v_alto,v_codigo,o_consecutivoinsp,ultimo_mto,inicio_servicio,ultima_inspeccion,h_hora,o_tipo_informe], function(tx, res) {
      console.log("insertId: " + res.insertId + " -- probably 1");
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
    },
    function(tx, error) {
      console.log('INSERT error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para insertar datos en la tabla puertas_valores_preliminar
*==============================================*/
function addItemsPuertasValoresPreliminar(k_codusuario,k_codinspeccion,k_coditem_preli,v_calificacion,o_observacion) {
  db.transaction(function (tx) {
    var query = "INSERT INTO puertas_valores_preliminar (k_codusuario,k_codinspeccion,k_coditem_preli,v_calificacion,o_observacion) VALUES (?,?,?,?,?)";
    tx.executeSql(query, [k_codusuario,k_codinspeccion,k_coditem_preli,v_calificacion,o_observacion], function(tx, res) {
      console.log("insertId: " + res.insertId + " -- probably 1");
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
    },
    function(tx, error) {
      console.log('INSERT error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para insertar datos en la tabla puertas_valores_proteccion
*==============================================*/
function addItemsPuertasValoresProteccion(k_codusuario,k_codinspeccion,k_coditem,v_sele_inspector,v_sele_empresa,o_observacion) {
  $('#texto_carga').text('Guardando datos Protección...Espere');
  db.transaction(function (tx) {
    var query = "INSERT INTO puertas_valores_proteccion (k_codusuario,k_codinspeccion,k_coditem,v_sele_inspector,v_sele_empresa,o_observacion) VALUES (?,?,?,?,?,?)";
    tx.executeSql(query, [k_codusuario,k_codinspeccion,k_coditem,v_sele_inspector,v_sele_empresa,o_observacion], function(tx, res) {
      console.log("insertId: " + res.insertId + " -- probably 1");
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
    },
    function(tx, error) {
      console.log('INSERT error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para insertar datos en la tabla puertas_valores_elementos
*==============================================*/
function addItemsPuertasValoresElementos(k_codusuario,k_codinspeccion,k_coditem,o_descripcion,v_selecion) {
  $('#texto_carga').text('Guardando datos elementos...Espere');
  db.transaction(function (tx) {
    var query = "INSERT INTO puertas_valores_elementos (k_codusuario,k_codinspeccion,k_coditem,o_descripcion,v_selecion) VALUES (?,?,?,?,?)";
    tx.executeSql(query, [k_codusuario,k_codinspeccion,k_coditem,o_descripcion,v_selecion], function(tx, res) {
      console.log("insertId: " + res.insertId + " -- probably 1");
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
    },
    function(tx, error) {
      console.log('INSERT error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para insertar datos en la tabla puertas_valores_mecanicos
*==============================================*/
function addItemsPuertasValoresMecanicos(k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) {
  $('#texto_carga').text('Guardando datos mecanicos...Espere');
  db.transaction(function (tx) {
    var query = "INSERT INTO puertas_valores_mecanicos (k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) VALUES (?,?,?,?,?,?)";
    tx.executeSql(query, [k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion], function(tx, res) {
      console.log("insertId: " + res.insertId + " -- probably 1");
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
    },
    function(tx, error) {
      console.log('INSERT error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para insertar datos en la tabla puertas_valores_electrica
*==============================================*/
function addItemsPuertasValoresElectrica(k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) {
  $('#texto_carga').text('Guardando datos electrica...Espere');
  db.transaction(function (tx) {
    var query = "INSERT INTO puertas_valores_electrica (k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) VALUES (?,?,?,?,?,?)";
    tx.executeSql(query, [k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion], function(tx, res) {
      console.log("insertId: " + res.insertId + " -- probably 1");
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
    },
    function(tx, error) {
      console.log('INSERT error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para insertar datos en la tabla puertas_valores_motorizacion
*==============================================*/
function addItemsPuertasValoresMotorizacion(k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) {
  $('#texto_carga').text('Guardando datos motorizacion...Espere');
  db.transaction(function (tx) {
    var query = "INSERT INTO puertas_valores_motorizacion (k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) VALUES (?,?,?,?,?,?)";
    tx.executeSql(query, [k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion], function(tx, res) {
      console.log("insertId: " + res.insertId + " -- probably 1");
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
    },
    function(tx, error) {
      console.log('INSERT error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para insertar datos en la tabla puertas_valores_otras
*==============================================*/
function addItemsPuertasValoresOtras(k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) {
  $('#texto_carga').text('Guardando datos otras...Espere');
  db.transaction(function (tx) {
    var query = "INSERT INTO puertas_valores_otras (k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) VALUES (?,?,?,?,?,?)";
    tx.executeSql(query, [k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion], function(tx, res) {
      console.log("insertId: " + res.insertId + " -- probably 1");
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
    },
    function(tx, error) {
      console.log('INSERT error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para insertar datos en la tabla puertas_valores_maniobras
*==============================================*/
function addItemsPuertasValoresManiobras(k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) {
  $('#texto_carga').text('Guardando datos maniobras...Espere');
  db.transaction(function (tx) {
    var query = "INSERT INTO puertas_valores_maniobras (k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) VALUES (?,?,?,?,?,?)";
    tx.executeSql(query, [k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion], function(tx, res) {
      console.log("insertId: " + res.insertId + " -- probably 1");
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
    },
    function(tx, error) {
      console.log('INSERT error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para insertar datos en la tabla puertas_valores_finales
*==============================================*/
function addItemsPuertasValoresObservacionFinal(k_codusuario,k_codinspeccion,o_observacion) {
  $('#texto_carga').text('Guardando datos finales...Espere');
  db.transaction(function (tx) {
    var query = "INSERT INTO puertas_valores_finales (k_codusuario,k_codinspeccion,o_observacion) VALUES (?,?,?)";
    tx.executeSql(query, [k_codusuario,k_codinspeccion,o_observacion], function(tx, res) {
      console.log("insertId: " + res.insertId + " -- probably 1");
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
    },
    function(tx, error) {
      console.log('INSERT error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para insertar datos en la tabla auditoria_inspecciones_puertas
*==============================================*/
function addItemsAuditoriaInspeccionesPuertas(cod_usuario,cod_inspeccion,consecutivo_insp,estado,revision,k_codusuario_modifica) {
  $('#texto_carga').text('Guardando Inspección...Espere');
  var estado_revision;
  if (revision > 0) {
    estado_revision = "Si";
  }else{
    estado_revision = "No";
  }
  db.transaction(function (tx) {
      var query = "INSERT INTO auditoria_inspecciones_puertas (k_codusuario,k_codinspeccion,o_consecutivoinsp,o_estado_envio,o_revision,v_item_nocumple,k_codusuario_modifica) VALUES (?,?,?,?,?,?,?)";
      tx.executeSql(query, [cod_usuario,cod_inspeccion,consecutivo_insp,estado,estado_revision,revision,k_codusuario_modifica], function(tx, res) {
        console.log("insertId: " + res.insertId + " -- probably 1");
        console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
      },
      function(tx, error) {
        console.log('INSERT error: ' + error.message);
      });
  }, function(error) {
      console.log('transaction error: ' + error.message);
  }, function() {
      console.log('transaction ok');
  });
}

/*=============================================
* Funcion para actualizar la tabla consecutivo_puertas
*==============================================*/
function addItemConsecutivoPuertas(codigo, codigo_inspeccion) {
    var consecutivo = parseInt(codigo_inspeccion) + 1;
    if (consecutivo < 10) {
        consecutivo = "0" + consecutivo;
    }
    if (consecutivo < 100) {
        consecutivo = "0" + consecutivo;
    } 
    var inspeccion = "PUT"+codigo+"-"+consecutivo+"-"+anio;
    db.transaction(function (tx) {
        var query = "INSERT INTO consecutivo_puertas (k_codusuario, k_consecutivo, n_inspeccion) VALUES (?,?,?)";
        tx.executeSql(query, [codigo, consecutivo, inspeccion], function(tx, res) {
          console.log("insertId: " + res.insertId + " -- probably 1");
          console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
        },
        function(tx, error) {
            console.log('INSERT error: ' + error.message);
        });
    }, function(error) {
        console.log('transaction error: ' + error.message);
    }, function() {
        console.log('transaction ok');
        //setTimeout('cerrarVentanaCarga()',7000); //SE LE DA UN TIEMPO PARA QUE SE CIERRE, MIENTRAS SE GUARDAN LOS VALORES EN LA BD
        cerrarVentanaCarga();
    });
}