jQuery(document).ready(function($){
  ObtenerCantidadItemsAIPRE(); //Ejecutamos la funcion para guardar el valor en sesion de la cantidad de items de la tabla ascensor_items_preliminar y poderlo usar previamente
  ObtenerCantidadItemsAIPP();
  ObtenerCantidadItemsAIE();
  ObtenerCantidadItemsAIC();
  ObtenerCantidadItemsAIM();
  ObtenerCantidadItemsAIP();
  ObtenerCantidadItemsAIF();
  console.log(contador_items_nocumple);
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
  guardarInspeccion_v1();
  /* REINICIAMOS ALGUNOS CONTROLES */
  // $("#text_equipo").val("");
  // $("#text_tipoAccionamiento").find('option:first').attr('selected', 'selected').parent('select');
  // $("#text_capacidadPersonas").val("");
  // $("#text_capacidadPeso").val("");
  // $("#text_numeroParadas").val("");
  // $("#text_ultimo_mto").val("");
  // $("#text_inicio_servicio").val("");
  // $("#text_ultima_inspec").val("");
  // $("#text_observacion_final").val("");

  // /* REINICIAR ITEMS PRELIMINAR */
  // for (var i = 1; i <= 3; i++) {
  //   $('#text_obser_item'+i+'_eval_prel').val("");
  // }
  // /* REINICIAR ITEMS PROTECCION */
  // for (var i = 1; i <= 7; i++) {
  //   $('#text_obser_protec_person'+i).val("");
  // }
  // /* REINICIAR ITEMS CABINA */
  // var cantidadItemsTAIC = window.sessionStorage.getItem("cantidadItemsTablaAIC");
  // for (var i = 1; i <= cantidadItemsTAIC; i++) {
  //   $('input[name="sele_cabina'+i+'"]').prop('checked', false);
  //   $('#text_lv_valor_observacion_'+i).val("");
  // }
  // /* REINICIAR ITEMS MAQUINAS */
  // var cantidadItemsTAIM = window.sessionStorage.getItem("cantidadItemsTablaAIM");
  // var numero_final_item = 36 + parseInt(cantidadItemsTAIM);
  // for (var i = 36; i < numero_final_item; i++) {
  //   $('input[name="sele_maquinas'+i+'"]').prop('checked', false);
  //   $('#text_maquinas_observacion_'+i).val("");
  // }
  // /* REINICIAR ITEMS POZO */
  // var cantidadItemsTAIP = window.sessionStorage.getItem("cantidadItemsTablaAIP");
  // var numero_final_item = 83 + parseInt(cantidadItemsTAIP);
  // for (var i = 83; i < numero_final_item; i++) {
  //   $('input[name="sele_pozo'+i+'"]').prop('checked', false);
  //   $('#text_pozo_observacion_'+i).val("");
  // }
  // /* REINICIAR ITEMS FOSO */
  // var cantidadItemsTAIF = window.sessionStorage.getItem("cantidadItemsTablaAIF");
  // var numero_final_item = 148 + parseInt(cantidadItemsTAIF);
  // for (var i = 148; i < numero_final_item; i++) {
  //   $('input[name="sele_foso'+i+'"]').prop('checked', false);
  //   $('#text_foso_observacion_'+i).val("");
  // }
}

/*=============================================
* Funcion que es ejecutada desde el form action de la pagina ascensor_lista_inspeccion
* Sirve para verificar si todos los check estan seleccionados, esto para no sobrecargar la pagina con el validador del form
* Se colocan en orden descendente las tablas para que empiece la verificacion de abajo de la pagina hacia arriba
* Luego si no hay campos que falten por seleccionar se procede a llamar la funcion que permite guardar la inspeccion
*==============================================*/
function verificarSeleccionChecks(){
  var v_chk_noseleccionados = 0;
  /* ITEMS FOSO */
  var cantidadItemsTAIF = window.sessionStorage.getItem("cantidadItemsTablaAIF");
  var numero_final_item = 148 + parseInt(cantidadItemsTAIF);
  for (var i = 148; i < numero_final_item; i++) {
    if( $('input:radio[name=sele_foso'+i+']:checked').val() == undefined ) {
      v_chk_noseleccionados += 1;
      alert("Advertencia:\n\nDebe completar todos los campos de la lista Revisión de foso.");
      mostrarDivFoso();
      $('input:radio[name=sele_foso'+i+']').focus();
      break;
    }
  }
  /* ITEMS POZO */
  var cantidadItemsTAIP = window.sessionStorage.getItem("cantidadItemsTablaAIP");
  var numero_final_item = 83 + parseInt(cantidadItemsTAIP);
  for (var i = 83; i < numero_final_item; i++) {
    if( $('input:radio[name=sele_pozo'+i+']:checked').val() == undefined ) {
      v_chk_noseleccionados += 1;
      alert("Advertencia:\n\nDebe completar todos los campos de la lista Revisión de Pozo.");
      mostrarDivPozo();
      $('input:radio[name=sele_pozo'+i+']').focus();
      break;
    }
  }
  /* ITEMS MAQUINAS */
  var cantidadItemsTAIM = window.sessionStorage.getItem("cantidadItemsTablaAIM");
  var numero_final_item = 36 + parseInt(cantidadItemsTAIM);
  for (var i = 36; i < numero_final_item; i++) {
    if( $('input:radio[name=sele_maquinas'+i+']:checked').val() == undefined ) {
      v_chk_noseleccionados += 1;
      alert("Advertencia:\n\nDebe completar todos los campos de la lista de Cuarto de maquinas y poleas.");
      mostrarDivMaquinas();
      $('input:radio[name=sele_maquinas'+i+']').focus();
      break;
    }
  }
  /* ITEMS CABINA */
  var cantidadItemsTAIC = window.sessionStorage.getItem("cantidadItemsTablaAIC");
  for (var i = 1; i <= cantidadItemsTAIC; i++) {
    if( $('input:radio[name=sele_cabina'+i+']:checked').val() == undefined ) {
      v_chk_noseleccionados += 1;
      alert("Advertencia:\n\nDebe completar todos los campos de la lista Cabina.");
      mostrarDivCabina();
      $('input:radio[name=sele_cabina'+i+']').focus();
      break;
    }
  }
  /* ITEMS ELEMENTOS */
  var cantidadItemsTAIE = window.sessionStorage.getItem("cantidadItemsTablaAIE");
  for (var i = 1; i <= cantidadItemsTAIE; i++) {
    if( $('input:radio[name=sele_element_inspec'+i+']:checked').val() == undefined ) {
      v_chk_noseleccionados += 1;
      alert("Advertencia:\n\nDebe completar todos los campos de Elementos del inspector.");
      mostrarDivElementos();
      $('input:radio[name=sele_element_inspec'+i+']').focus();
      break;
    }
  }
  /* ITEMS PROTECCION PERSONAL EMPRESA */
  var cantidadItemsTAIPP = window.sessionStorage.getItem("cantidadItemsTablaAIPP");
  for (var i = 1; i <= cantidadItemsTAIPP; i++) {
    if( $('input:radio[name=sele_protec_person'+i+'_'+i+']:checked').val() == undefined ) {
      v_chk_noseleccionados += 1;
      alert("Advertencia:\n\nDebe completar todos los campos de Elementos de protección Personal.");
      mostrarDivProteccion();
      $('input:radio[name=sele_protec_person'+i+'_'+i+']').focus();
      break;
    }
  }
  /* ITEMS PROTECCION PERSONAL INSPECTOR */
  var cantidadItemsTAIPP = window.sessionStorage.getItem("cantidadItemsTablaAIPP");
  for (var i = 1; i <= cantidadItemsTAIPP; i++) {
    if( $('input:radio[name=sele_protec_person'+i+']:checked').val() == undefined ) {
      v_chk_noseleccionados += 1;
      alert("Advertencia:\n\nDebe completar todos los campos de Elementos de protección Personal.");
      mostrarDivProteccion();
      $('input:radio[name=sele_protec_person'+i+']').focus();
      break;
    }
  }
  /* ITEMS PRELIMINAR */
  var cantidadItemsTAIPRE = window.sessionStorage.getItem("cantidadItemsTablaAIPRE");
  for (var i = 1; i <= cantidadItemsTAIPRE; i++) {
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
    var consecutivo = null;
    var query = "SELECT COUNT(*) AS cantidad_inspecciones FROM consecutivo_ascensores";
    tx.executeSql(query, [], function (tx, resultSet) {
      consecutivo = (resultSet.rows.item(0).cantidad_inspecciones)-1;
      if (consecutivo < 10) {
        consecutivo = "0" + consecutivo;
      }
      if (consecutivo < 100) {
        consecutivo = "0" + consecutivo;
      }
      consecutivo = String(consecutivo);
      console.log("diana morenos -> "+consecutivo);
      db.transaction(function (tx) {
        var query = "SELECT * FROM consecutivo_ascensores WHERE k_consecutivo = ?";
        tx.executeSql(query, [consecutivo], function (tx, resultSet) {
          console.log('Consecutivo Inspeccion Ascensores -> '+resultSet.rows.item(0).k_consecutivo + '\nInspeccion Nº -> '+resultSet.rows.item(0).n_inspeccion);
          $("#text_consecutivo").val(resultSet.rows.item(0).n_inspeccion);
          window.sessionStorage.setItem("codigo_inspeccion", resultSet.rows.item(0).k_consecutivo);
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
    * LA CUAL SE CIERRA EN LA FUNCION addItemConsecutivoAscensores
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
    var textTipoAccionamiento = $("#text_tipoAccionamiento").val();
    var textCapacidadPersonas = $("#text_capacidadPersonas").val();
    var textCapacidadPeso = $("#text_capacidadPeso").val();
    var textNumeroParadas = $("#text_numeroParadas").val();
    var textFecha = $("#text_fecha").val();
    var textCodigo = $("#text_codigo").val();
    var textUltimoMto = $("#text_ultimo_mto").val();
    var textInicioServicio = $("#text_inicio_servicio").val();
    var textUltimaInspec = $("#text_ultima_inspec").val();

    /* ============================
    * Si los campos de fecha quedan vacios se les coloca una linea ya que estos no son obligatorios
    * ============================= */
    if (textFecha.length < 1) {
      textFecha = "------";
    }
    if (textUltimoMto.length < 1) {
      textUltimoMto = "------";
    }
    if (textInicioServicio.length < 1) {
      textInicioServicio = "------";
    }
    if (textUltimaInspec.length < 1) {
      textUltimaInspec = "------";
    }

    var textObserFinal = $("#text_observacion_final").val();

    /* ============================
    * Insertar valores en las tablas
    * ============================= */
    /* Insertar valores en la tabla ascensor_valores_iniciales */
    addItemsAscensorValoresIniciales(codigoInspector,codigo_inspeccion,textCliente,textEquipo,textEmpresaMantenimiento,textTipoAccionamiento,textCapacidadPersonas,textCapacidadPeso,textNumeroParadas,textFecha,textCodigo,consecutivo_inspeccion,textUltimoMto,textInicioServicio,textUltimaInspec,hora,"Inicial");
    /* Insertar valores en la tabla ascensor_valores_preliminar */
    var cantidadItemsTAIPRE = window.sessionStorage.getItem("cantidadItemsTablaAIPRE");
    for (var i = 1; i <= cantidadItemsTAIPRE; i++) {
      addItemsAscensorValoresPreliminar(codigoInspector,
                                        codigo_inspeccion,
                                        $('#numero_item_preliminar'+i).val(),
                                        $('input:radio[name=seleval'+i+']:checked').val(),
                                        $('#text_obser_item'+i+'_eval_prel').val());
    }
    /* Insertar valores en la tabla ascensor_valores_proteccion */
    var cantidadItemsTAIPP = window.sessionStorage.getItem("cantidadItemsTablaAIPP");
    for (var i = 1; i <= cantidadItemsTAIPP; i++) {
      addItemsAscensorValoresProteccion(codigoInspector,
                                        codigo_inspeccion,
                                        $('#numero_item_proteccion'+i).val(),
                                        $('input:radio[name=sele_protec_person'+i+']:checked').val(),
                                        $('input:radio[name=sele_protec_person'+i+'_'+i+']:checked').val(),
                                        $('#text_obser_protec_person'+i).val());
    }
    /* Insertar valores en la tabla ascensor_valores_elementos */
    var cantidadItemsTAIE = window.sessionStorage.getItem("cantidadItemsTablaAIE");
    for (var i = 1; i <= cantidadItemsTAIE; i++) {
      addItemsAscensorValoresElementos(codigoInspector,
                                       codigo_inspeccion,
                                       $('#numero_item_element_inspec'+i).val(),
                                       $('#descrip_item_element_inspec'+i).val(),
                                       $('input:radio[name=sele_element_inspec'+i+']:checked').val());
    }
    /* Insertar valores en la tabla ascensor_valores_cabina */
    var cantidadItemsTAIC = window.sessionStorage.getItem("cantidadItemsTablaAIC");
    for (var i = 1; i <= cantidadItemsTAIC; i++) {
      if ($('input:radio[name=sele_cabina'+i+']:checked').val() == "No Cumple") {
        contador_items_nocumple += 1;
      }
      addItemsAscensorValoresCabina(codigoInspector,
                                    codigo_inspeccion,
                                    $('#numero_item_cabina'+i).val(),
                                    $('#cal_item_cabina'+i).val(),
                                    $('input:radio[name=sele_cabina'+i+']:checked').val(),
                                    $('#text_lv_valor_observacion_'+i).val());
    }
    /* Insertar valores en la tabla ascensor_valores_maquinas */
    var cantidadItemsTAIM = window.sessionStorage.getItem("cantidadItemsTablaAIM");
    var numero_final_item = 36 + parseInt(cantidadItemsTAIM);
    for (var i = 36; i < numero_final_item; i++) {
      if ($('input:radio[name=sele_maquinas'+i+']:checked').val() == "No Cumple") {
        contador_items_nocumple += 1;
      }
      addItemsAscensorValoresMaquinas(codigoInspector,
                                      codigo_inspeccion,
                                      $('#numero_item_maquinas'+i).val(),
                                      $('#cal_item_maquinas'+i).val(),
                                      $('input:radio[name=sele_maquinas'+i+']:checked').val(),
                                      $('#text_maquinas_observacion_'+i).val());
    }
    /* Insertar valores en la tabla ascensor_valores_pozo */
    var cantidadItemsTAIP = window.sessionStorage.getItem("cantidadItemsTablaAIP");
    var numero_final_item = 83 + parseInt(cantidadItemsTAIP);
    for (var i = 83; i < numero_final_item; i++) {
      if ($('input:radio[name=sele_pozo'+i+']:checked').val() == "No Cumple") {
        contador_items_nocumple += 1;
      }
      addItemsAscensorValoresPozo(codigoInspector,
                                  codigo_inspeccion,
                                  $('#numero_item_pozo'+i).val(),
                                  $('#cal_item_pozo'+i).val(),
                                  $('input:radio[name=sele_pozo'+i+']:checked').val(),
                                  $('#text_pozo_observacion_'+i).val());
    }
    /* Insertar valores en la tabla ascensor_valores_foso */
    var cantidadItemsTAIF = window.sessionStorage.getItem("cantidadItemsTablaAIF");
    var numero_final_item = 148 + parseInt(cantidadItemsTAIF);
    for (var i = 148; i < numero_final_item; i++) {
      if ($('input:radio[name=sele_foso'+i+']:checked').val() == "No Cumple") {
        contador_items_nocumple += 1;
      }
      addItemsAscensorValoresFoso(codigoInspector,
                                  codigo_inspeccion,
                                  $('#numero_item_foso'+i).val(),
                                  $('#cal_item_foso'+i).val(),
                                  $('input:radio[name=sele_foso'+i+']:checked').val(),
                                  $('#text_foso_observacion_'+i).val());
    }
    /* Insertar valores en la tabla ascensor_valores_finales */
    addItemsAscensorValoresObservacionFinal(codigoInspector,codigo_inspeccion,textObserFinal);

    /* Se actualizan las respectivas tablas  de auditoria y la tabla que maneja el consecutivo */
    addItemsAuditoriaInspeccionesAscensores(codigoInspector,codigo_inspeccion,consecutivo_inspeccion,'Pendiente',contador_items_nocumple,codigoInspector);
    addItemConsecutivoAscensores(codigoInspector,codigo_inspeccion); 
  }
}



/*=============================================
* Funcion para insertar datos en la tabla ascensor_valores_iniciales
*==============================================*/
function addItemsAscensorValoresIniciales(cod_usuario,cod_inspeccion,cliente,equipo,emp_mantenimiento,tipo_accionamiento,capac_person,capac_peso,num_paradas,fecha,codigo,consecutivo_insp,ult_mto,ini_servicio,ultima_insp,hora,tipo_informe) {
  $('#texto_carga').text('Guardando datos iniciales...Espere');
  db.transaction(function (tx) {
    var query = "INSERT INTO ascensor_valores_iniciales (k_codusuario,k_codinspeccion,n_cliente,n_equipo,n_empresamto,o_tipoaccion,v_capacperson,v_capacpeso,v_paradas,f_fecha,v_codigo,o_consecutivoinsp,ultimo_mto,inicio_servicio,ultima_inspeccion,h_hora,o_tipo_informe) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    tx.executeSql(query, [cod_usuario,cod_inspeccion,cliente,equipo,emp_mantenimiento,tipo_accionamiento,capac_person,capac_peso,num_paradas,fecha,codigo,consecutivo_insp,ult_mto,ini_servicio,ultima_insp,hora,tipo_informe], function(tx, res) {
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
* Funcion en donde se cuentan las filas de la tabla ascensor_items_preliminar [AIPRE]
*==============================================*/
function ObtenerCantidadItemsAIPRE(){
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM ascensor_items_preliminar";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Numero de filas tabla ascensor_items_preliminar -> '+resultSet.rows.item(0).c);
      window.sessionStorage.setItem("cantidadItemsTablaAIPRE", resultSet.rows.item(0).c); //mandamos por sesion la cantidad de items
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
* Funcion para insertar datos en la tabla ascensor_valores_preliminar
*==============================================*/
function addItemsAscensorValoresPreliminar(k_codusuario,k_codinspeccion,k_coditem_preli,v_calificacion,o_observacion) {
  db.transaction(function (tx) {
    var query = "INSERT INTO ascensor_valores_preliminar (k_codusuario,k_codinspeccion,k_coditem_preli,v_calificacion,o_observacion) VALUES (?,?,?,?,?)";
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
* Funcion en donde se cuentan las filas de la tabla ascensor_items_proteccion [AIPP]
*==============================================*/
function ObtenerCantidadItemsAIPP(){
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM ascensor_items_proteccion";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Numero de filas tabla ascensor_items_proteccion -> '+resultSet.rows.item(0).c);
      window.sessionStorage.setItem("cantidadItemsTablaAIPP", resultSet.rows.item(0).c); //mandamos por sesion la cantidad de items
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
* Funcion para insertar datos en la tabla ascensor_valores_proteccion
*==============================================*/
function addItemsAscensorValoresProteccion(k_codusuario,k_codinspeccion,k_coditem,v_sele_inspector,v_sele_empresa,o_observacion) {
  $('#texto_carga').text('Guardando datos Protección...Espere');
  db.transaction(function (tx) {
    var query = "INSERT INTO ascensor_valores_proteccion (k_codusuario,k_codinspeccion,k_coditem,v_sele_inspector,v_sele_empresa,o_observacion) VALUES (?,?,?,?,?,?)";
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
* Funcion en donde se cuentan las filas de la tabla ascensor_items_elementos [AIE]
*==============================================*/
function ObtenerCantidadItemsAIE(){
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM ascensor_items_elementos";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Numero de filas tabla ascensor_items_elementos -> '+resultSet.rows.item(0).c);
      window.sessionStorage.setItem("cantidadItemsTablaAIE", resultSet.rows.item(0).c); //mandamos por sesion la cantidad de items
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
* Funcion para insertar datos en la tabla ascensor_valores_elementos
*==============================================*/
function addItemsAscensorValoresElementos(k_codusuario,k_codinspeccion,k_coditem,o_descripcion,v_selecion) {
  $('#texto_carga').text('Guardando datos elementos...Espere');
  db.transaction(function (tx) {
    var query = "INSERT INTO ascensor_valores_elementos (k_codusuario,k_codinspeccion,k_coditem,o_descripcion,v_selecion) VALUES (?,?,?,?,?)";
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
* Funcion en donde se cuentan las filas de la tabla ascensor_items_cabina [AIC]
*==============================================*/
function ObtenerCantidadItemsAIC(){
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM ascensor_items_cabina";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Numero de filas tabla ascensor_items_cabina -> '+resultSet.rows.item(0).c);
      window.sessionStorage.setItem("cantidadItemsTablaAIC", resultSet.rows.item(0).c); //mandamos por sesion la cantidad de items
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
* Funcion para insertar datos en la tabla ascensor_valores_cabina
*==============================================*/
function addItemsAscensorValoresCabina(k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) {
  $('#texto_carga').text('Guardando datos cabina...Espere');
  db.transaction(function (tx) {
    var query = "INSERT INTO ascensor_valores_cabina (k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) VALUES (?,?,?,?,?,?)";
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
* Funcion en donde se cuentan las filas de la tabla ascensor_items_maquinas [AIM]
*==============================================*/
function ObtenerCantidadItemsAIM(){
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM ascensor_items_maquinas";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Numero de filas tabla ascensor_items_maquinas -> '+resultSet.rows.item(0).c);
      window.sessionStorage.setItem("cantidadItemsTablaAIM", resultSet.rows.item(0).c); //mandamos por sesion la cantidad de items
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
* Funcion para insertar datos en la tabla ascensor_valores_maquinas
*==============================================*/
function addItemsAscensorValoresMaquinas(k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) {
  $('#texto_carga').text('Guardando datos maquinas...Espere');
  db.transaction(function (tx) {
    var query = "INSERT INTO ascensor_valores_maquinas (k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) VALUES (?,?,?,?,?,?)";
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
* Funcion en donde se cuentan las filas de la tabla ascensor_items_pozo [AIP]
*==============================================*/
function ObtenerCantidadItemsAIP(){
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM ascensor_items_pozo";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Numero de filas tabla ascensor_items_pozo -> '+resultSet.rows.item(0).c);
      window.sessionStorage.setItem("cantidadItemsTablaAIP", resultSet.rows.item(0).c); //mandamos por sesion la cantidad de items
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
* Funcion para insertar datos en la tabla ascensor_valores_pozo
*==============================================*/
function addItemsAscensorValoresPozo(k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) {
  $('#texto_carga').text('Guardando datos pozo...Espere');
  db.transaction(function (tx) {
    var query = "INSERT INTO ascensor_valores_pozo (k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) VALUES (?,?,?,?,?,?)";
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
* Funcion en donde se cuentan las filas de la tabla ascensor_items_foso [AIF]
*==============================================*/
function ObtenerCantidadItemsAIF(){
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM ascensor_items_foso";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Numero de filas tabla ascensor_items_foso -> '+resultSet.rows.item(0).c);
      window.sessionStorage.setItem("cantidadItemsTablaAIF", resultSet.rows.item(0).c); //mandamos por sesion la cantidad de items
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
* Funcion para insertar datos en la tabla ascensor_valores_foso
*==============================================*/
function addItemsAscensorValoresFoso(k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) {
  $('#texto_carga').text('Guardando datos foso...Espere');
  db.transaction(function (tx) {
    var query = "INSERT INTO ascensor_valores_foso (k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) VALUES (?,?,?,?,?,?)";
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
* Funcion para insertar datos en la tabla ascensor_valores_finales
*==============================================*/
function addItemsAscensorValoresObservacionFinal(k_codusuario,k_codinspeccion,o_observacion) {
  $('#texto_carga').text('Guardando datos finales...Espere');
  db.transaction(function (tx) {
    var query = "INSERT INTO ascensor_valores_finales (k_codusuario,k_codinspeccion,o_observacion) VALUES (?,?,?)";
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
* Funcion para insertar datos en la tabla auditoria_inspecciones_ascensores
*==============================================*/
function addItemsAuditoriaInspeccionesAscensores(cod_usuario,cod_inspeccion,consecutivo_insp,estado,revision,k_codusuario_modifica) {
  $('#texto_carga').text('Guardando Inspección...Espere');
  var estado_revision;
  if (revision > 0) {
    estado_revision = "Si";
  }else{
    estado_revision = "No";
  }
  db.transaction(function (tx) {
      var query = "INSERT INTO auditoria_inspecciones_ascensores (k_codusuario,k_codinspeccion,o_consecutivoinsp,o_estado_envio,o_revision,v_item_nocumple,k_codusuario_modifica) VALUES (?,?,?,?,?,?,?)";
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
* Funcion para actualizar la tabla consecutivo_ascensores
*==============================================*/
function addItemConsecutivoAscensores(codigo, codigo_inspeccion) {
  var consecutivo = parseInt(codigo_inspeccion) + 1;
  if (consecutivo < 10) {
    consecutivo = "0" + consecutivo;
  }
  if (consecutivo < 100) {
    consecutivo = "0" + consecutivo;
  }
  consecutivo = String(consecutivo);
  var inspeccion = "ASC"+codigo+"-"+consecutivo+"-"+anio;
  db.transaction(function (tx) {
    var query = "INSERT INTO consecutivo_ascensores (k_codusuario, k_consecutivo, n_inspeccion) VALUES (?,?,?)";
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
    // cerrarVentanaCarga();
    reiniciarInspeccion();
  });
}