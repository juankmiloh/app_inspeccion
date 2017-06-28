jQuery(document).ready(function($){
  //alert("PROBANDO");
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
  message = 'Todo salio bien, se guardo la inspeccion Nº. ' + window.sessionStorage.getItem("consecutivo_inspeccion") + '\n\n¿Desea realizar otra inspección?';
  title = 'Montajes & Procesos M.P SAS';
  if(navigator.notification && navigator.notification.alert){
    navigator.notification.confirm(
    message, // message
    onConfirm, // callback to invoke with index of button pressed
    title, // title
    ['SI','NO'] // buttonLabels -> valores [1,0]
  );
  }else{
    alert('Todo salio bien, se guardo la inspeccion Nº. ' + window.sessionStorage.getItem("consecutivo_inspeccion"));
    reiniciarInspeccion();
  }
}

function onConfirm(buttonIndex) {
  if (buttonIndex == 1) {
    reiniciarInspeccion();
  }else{
    location.href="../index.html";
  }
}

/*=============================================
* Funcion que se ejecuta luego de que se guarda la inspeccion
* lo que hace es limpiar los checks de la lista y algunos campos iniciales para permitir utilizar algunos datos para otra inspeccion
* Se actuliza el consecutivo de inspeccion
*==============================================*/
function reiniciarInspeccion(){
  /* ACTUALIZAMOS EL CONSECUTIVO */
  actualizarConsecutivoInspeccion();
  /* REINICIAMOS ALGUNOS CONTROLES */
  $("#text_equipo").val("");
  $("#text_velocidad").val("");
  $("#text_tipoEquipo").find('option:first').attr('selected', 'selected').parent('select');
  $("#text_inclinacion").val("");
  $("#text_ancho_paso").val("");
  $("#text_ultimo_mto").val("");
  $("#text_inicio_servicio").val("");
  $("#text_ultima_inspec").val("");
  $("#text_observacion_final").val("");
  $("#cal_item_defectos77").val("");
  $("#text_calificacion77").find('option:first').attr('selected', 'selected').parent('select');

  /* REINICIAR ITEMS PRELIMINAR */
  for (var i = 1; i <= 3; i++) {
    $('#text_obser_item'+i+'_eval_prel').val("");
  }
  /* REINICIAR ITEMS PROTECCION */
  for (var i = 1; i <= 7; i++) {
    $('#text_obser_protec_person'+i).val("");
  }
  /* REINICIAR ITEMS DEFECTOS 1 */
  for (var i = 1; i <= 31; i++) {
    $('input[name="sele_defectos'+i+'"]').prop('checked', false);
    $('#text_lv_valor_observacion_'+i).val("");
  }
  /* REINICIAR ITEMS DEFECTOS 2 */
  for (var i = 32; i <= 62; i++) {
    $('input[name="sele_defectos'+i+'"]').prop('checked', false);
    $('#text_lv_valor_observacion_'+i).val("");
  }
  /* REINICIAR ITEMS DEFECTOS 3 */
  for (var i = 63; i <= 93; i++) {
    $('input[name="sele_defectos'+i+'"]').prop('checked', false);
    $('#text_lv_valor_observacion_'+i).val("");
  }
}

/*=============================================
* Funcion que es ejecutada desde el form action de la pagina escaleras_lista_inspeccion
* Sirve para verificar si todos los check estan seleccionados, esto para no sobrecargar la pagina con el validador del form
* Se colocan en orden descendente las tablas para que empiece la verificacion de abajo de la pagina hacia arriba
* Luego si no hay campos que falten por seleccionar se procede a llamar la funcion que permite guardar la inspeccion
*==============================================*/
function verificarSeleccionChecks(){
  var v_chk_noseleccionados = 0;
  /* ITEMS DEFECTOS 3 */
  for (var i = 63; i <= 93; i++) {
    if( $('input:radio[name=sele_defectos'+i+']:checked').val() == undefined ) {
      v_chk_noseleccionados += 1;
      alert("Advertencia:\n\nDebe completar todos los campos de la lista de defectos # 3.");
      mostrarDivDefectos_3();
      $('input:radio[name=sele_defectos'+i+']').focus();
      break;
    }
  }
  if ($('#cal_item_defectos77').val() == '') {
    v_chk_noseleccionados += 1;
    mostrarDivDefectos_3();
    alert("Advertencia:\n\nDebe asignar una calificación al defecto 77.");
    setTimeout(function(){ $('input:radio[name=sele_defectos77]').focus(); }, 300); //se direcciona primero al radiobutton para que luego lo redireccione al select (dejarlo asi, funciono! no se porque)
    setTimeout(function(){ $('#text_calificacion77').focus(); }, 300);
  }
  /* ITEMS DEFECTOS 2 */
  for (var i = 32; i <= 62; i++) {
    if( $('input:radio[name=sele_defectos'+i+']:checked').val() == undefined ) {
      v_chk_noseleccionados += 1;
      alert("Advertencia:\n\nDebe completar todos los campos de la lista de defectos # 2.");
      mostrarDivDefectos_2();
      $('input:radio[name=sele_defectos'+i+']').focus();
      break;
    }
  }
  /* ITEMS DEFECTOS 1 */
  for (var i = 1; i <= 31; i++) {
    if( $('input:radio[name=sele_defectos'+i+']:checked').val() == undefined ) {
      v_chk_noseleccionados += 1;
      alert("Advertencia:\n\nDebe completar todos los campos de la lista de defectos # 1.");
      mostrarDivDefectos_1();
      $('input:radio[name=sele_defectos'+i+']').focus();
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
    var query = "SELECT MAX(k_consecutivo) AS m, n_inspeccion FROM consecutivo_escaleras";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Consecutivo Inspeccion Escaleras -> '+resultSet.rows.item(0).m + '\nInspeccion Nº -> '+resultSet.rows.item(0).n_inspeccion);
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
    * LA CUAL SE CIERRA EN LA FUNCION addItemConsecutivoEscaleras
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
    var text_velocidad = $("#text_velocidad").val();
    var text_tipoEquipo = $("#text_tipoEquipo").val();
    var text_inclinacion = $("#text_inclinacion").val();
    var text_ancho_paso = $("#text_ancho_paso").val();
    var textFecha = $("#text_fecha").val();
    var text_ultimo_mto = $("#text_ultimo_mto").val();
    var text_inicio_servicio = $("#text_inicio_servicio").val();
    var text_ultima_inspec = $("#text_ultima_inspec").val();
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
    /* Insertar valores en la tabla escaleras_valores_iniciales */
    addItemsEscalerasValoresIniciales(codigoInspector,
                                      codigo_inspeccion,
                                      textCliente,
                                      textEquipo,
                                      textEmpresaMantenimiento,
                                      text_velocidad,
                                      text_tipoEquipo,
                                      text_inclinacion,
                                      text_ancho_paso,
                                      textFecha,
                                      text_ultimo_mto,
                                      text_inicio_servicio,
                                      text_ultima_inspec,
                                      text_codigo,
                                      consecutivo_inspeccion,
                                      hora,
                                      "Inicial");
    /* Insertar valores en la tabla escaleras_valores_preliminar */
    for (var i = 1; i <= 3; i++) {
      addItemsEscalerasValoresPreliminar(codigoInspector,
                                         codigo_inspeccion,
                                         $('#numero_item_preliminar'+i).val(),
                                         $('input:radio[name=seleval'+i+']:checked').val(),
                                         $('#text_obser_item'+i+'_eval_prel').val());
    }
    /* Insertar valores en la tabla escaleras_valores_proteccion */
    for (var i = 1; i <= 7; i++) {
      addItemsEscalerasValoresProteccion(codigoInspector,
                                         codigo_inspeccion,
                                         $('#numero_item_proteccion'+i).val(),
                                         $('input:radio[name=sele_protec_person'+i+']:checked').val(),
                                         $('input:radio[name=sele_protec_person'+i+'_'+i+']:checked').val(),
                                         $('#text_obser_protec_person'+i).val());
    }
    /* Insertar valores en la tabla escaleras_valores_elementos */
    for (var i = 1; i <= 6; i++) {
      addItemsEscalerasValoresElementos(codigoInspector,
                                        codigo_inspeccion,
                                        $('#numero_item_element_inspec'+i).val(),
                                        $('#descrip_item_element_inspec'+i).val(),
                                        $('input:radio[name=sele_element_inspec'+i+']:checked').val());
    }
    /* Insertar valores en la tabla escaleras_valores_defectos */
    for (var i = 1; i <= 93; i++) {
      if ($('input:radio[name=sele_defectos'+i+']:checked').val() == "No Cumple") {
        contador_items_nocumple += 1;
      }
      addItemsEscalerasValoresDefectos(codigoInspector,
                                       codigo_inspeccion,
                                       $('#numero_item_defectos'+i).val(),
                                       $('#cal_item_defectos'+i).val(),
                                       $('input:radio[name=sele_defectos'+i+']:checked').val(),
                                       $('#text_lv_valor_observacion_'+i).val());
    }
    /* Insertar valores en la tabla escaleras_valores_finales */
    addItemsEscalerasValoresObservacionFinal(codigoInspector,codigo_inspeccion,textObserFinal);

    /* Se actualizan las respectivas tablas  de auditoria y la tabla que maneja el consecutivo */
    addItemsAuditoriaInspeccionesEscaleras(codigoInspector,codigo_inspeccion,consecutivo_inspeccion,'Pendiente',contador_items_nocumple,codigoInspector);
    addItemConsecutivoEscaleras(codigoInspector,codigo_inspeccion);
  }
}



/*=============================================
* Funcion para insertar datos en la tabla escaleras_valores_iniciales
*==============================================*/
function addItemsEscalerasValoresIniciales(k_codusuario,k_codinspeccion,n_cliente,n_equipo,n_empresamto,v_velocidad,o_tipo_equipo,v_inclinacion,v_ancho_paso,f_fecha,ultimo_mto,inicio_servicio,ultima_inspeccion,v_codigo,o_consecutivoinsp,h_hora,o_tipo_informe) {
  $('#texto_carga').text('Guardando datos iniciales...Espere');
  db.transaction(function (tx) {
    var query = "INSERT INTO escaleras_valores_iniciales (k_codusuario,k_codinspeccion,n_cliente,n_equipo,n_empresamto,v_velocidad,o_tipo_equipo,v_inclinacion,v_ancho_paso,f_fecha,ultimo_mto,inicio_servicio,ultima_inspeccion,v_codigo,o_consecutivoinsp,h_hora,o_tipo_informe) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    tx.executeSql(query, [k_codusuario,k_codinspeccion,n_cliente,n_equipo,n_empresamto,v_velocidad,o_tipo_equipo,v_inclinacion,v_ancho_paso,f_fecha,ultimo_mto,inicio_servicio,ultima_inspeccion,v_codigo,o_consecutivoinsp,h_hora,o_tipo_informe], function(tx, res) {
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
* Funcion para insertar datos en la tabla escaleras_valores_preliminar
*==============================================*/
function addItemsEscalerasValoresPreliminar(k_codusuario,k_codinspeccion,k_coditem_preli,v_calificacion,o_observacion) {
  db.transaction(function (tx) {
    var query = "INSERT INTO escaleras_valores_preliminar (k_codusuario,k_codinspeccion,k_coditem_preli,v_calificacion,o_observacion) VALUES (?,?,?,?,?)";
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
* Funcion para insertar datos en la tabla escaleras_valores_proteccion
*==============================================*/
function addItemsEscalerasValoresProteccion(k_codusuario,k_codinspeccion,k_coditem,v_sele_inspector,v_sele_empresa,o_observacion) {
  $('#texto_carga').text('Guardando datos Protección...Espere');
  db.transaction(function (tx) {
    var query = "INSERT INTO escaleras_valores_proteccion (k_codusuario,k_codinspeccion,k_coditem,v_sele_inspector,v_sele_empresa,o_observacion) VALUES (?,?,?,?,?,?)";
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
* Funcion para insertar datos en la tabla escaleras_valores_elementos
*==============================================*/
function addItemsEscalerasValoresElementos(k_codusuario,k_codinspeccion,k_coditem,o_descripcion,v_selecion) {
  $('#texto_carga').text('Guardando datos elementos...Espere');
  db.transaction(function (tx) {
    var query = "INSERT INTO escaleras_valores_elementos (k_codusuario,k_codinspeccion,k_coditem,o_descripcion,v_selecion) VALUES (?,?,?,?,?)";
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
* Funcion para insertar datos en la tabla escaleras_valores_defectos
*==============================================*/
function addItemsEscalerasValoresDefectos(k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) {
  $('#texto_carga').text('Guardando datos mecanicos...Espere');
  db.transaction(function (tx) {
    var query = "INSERT INTO escaleras_valores_defectos (k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) VALUES (?,?,?,?,?,?)";
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
* Funcion para insertar datos en la tabla escaleras_valores_finales
*==============================================*/
function addItemsEscalerasValoresObservacionFinal(k_codusuario,k_codinspeccion,o_observacion) {
  $('#texto_carga').text('Guardando datos finales...Espere');
  db.transaction(function (tx) {
    var query = "INSERT INTO escaleras_valores_finales (k_codusuario,k_codinspeccion,o_observacion) VALUES (?,?,?)";
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
* Funcion para insertar datos en la tabla auditoria_inspecciones_escaleras
*==============================================*/
function addItemsAuditoriaInspeccionesEscaleras(cod_usuario,cod_inspeccion,consecutivo_insp,estado,revision,k_codusuario_modifica) {
  $('#texto_carga').text('Guardando Inspección...Espere');
  var estado_revision;
  if (revision > 0) {
    estado_revision = "Si";
  }else{
    estado_revision = "No";
  }
  db.transaction(function (tx) {
      var query = "INSERT INTO auditoria_inspecciones_escaleras (k_codusuario,k_codinspeccion,o_consecutivoinsp,o_estado_envio,o_revision,v_item_nocumple,k_codusuario_modifica) VALUES (?,?,?,?,?,?,?)";
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
* Funcion para actualizar la tabla consecutivo_escaleras
*==============================================*/
function addItemConsecutivoEscaleras(codigo, codigo_inspeccion) {
    var consecutivo = parseInt(codigo_inspeccion) + 1;
    if (consecutivo < 10) {
        consecutivo = "0" + consecutivo;
    }
    if (consecutivo < 100) {
        consecutivo = "0" + consecutivo;
    } 
    var inspeccion = "ESC"+codigo+"-"+consecutivo+"-"+anio;
    db.transaction(function (tx) {
        var query = "INSERT INTO consecutivo_escaleras (k_codusuario, k_consecutivo, n_inspeccion) VALUES (?,?,?)";
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