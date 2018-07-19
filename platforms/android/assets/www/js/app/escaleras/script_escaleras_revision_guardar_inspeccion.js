jQuery(document).ready(function($){
  //alert("PROBANDO");
});

/*=============================================
* Crear base de datos / Hacer conexion si ya esta creada
* parametros:
* var dbShell = window.openDatabase(database_name, database_version, database_displayname, database_size);
*==============================================*/
var db = window.openDatabase("montajes_inspeccion_mp", "1.0", "Inspeccion_MP", 1000000);

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
  var consecutivo_inspeccion = $("#text_consecutivo").val();
  swal({
    title: 'TODO SALIO BIEN!',
    type: 'success',
    html: 'Se guardo revisión de la inspección Nº. ' + consecutivo_inspeccion,
    showCloseButton: false,
    showCancelButton: false,
    confirmButtonText: '<i class="fa fa-thumbs-up"></i> oK',
    allowOutsideClick: false
  }).then(function () {
    window.location='../../index.html';
  })
  // message = 'Todo salio bien, se modifico la inspeccion Nº. ' + consecutivo_inspeccion;
  // if(navigator.notification && navigator.notification.alert){
  //   navigator.notification.alert(message, null, "Montajes & Procesos M.P SAS", "Aceptar");
  //   window.location='../../index.html';
  // }else{
  //   alert(message);
  //   window.location='../../index.html';
  // }
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
function guardarInspeccion(){
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

  var codigo_inspeccion = getQueryVariable('id_inspeccion');
  var cod_usuario = getQueryVariable('cod_usuario');
  var consecutivo_inspeccion = $("#text_consecutivo").val();

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
  * Actualizar valores en las tablas
  * ============================= */
  /* Actualizar valores en la tabla escaleras_valores_iniciales */
  updateItemsEscalerasValoresIniciales(textCliente,
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
                                       'Revisión',
                                       cod_usuario,
                                       codigo_inspeccion);
  /* Actualizar valores en la tabla escaleras_valores_preliminar */
  for (var i = 1; i <= 3; i++) {
    updateItemsEscalerasValoresPreliminar(cod_usuario,
                                        codigo_inspeccion,
                                        $('#numero_item_preliminar'+i).val(),
                                        $('input:radio[name=seleval'+i+']:checked').val(),
                                        $('#text_obser_item'+i+'_eval_prel').val());
  }
  /* Actualizar valores en la tabla escaleras_valores_proteccion */
  for (var i = 1; i <= 7; i++) {
    updateItemsEscalerasValoresProteccion(cod_usuario,
                                        codigo_inspeccion,
                                        $('#numero_item_proteccion'+i).val(),
                                        $('input:radio[name=sele_protec_person'+i+']:checked').val(),
                                        $('input:radio[name=sele_protec_person'+i+'_'+i+']:checked').val(),
                                        $('#text_obser_protec_person'+i).val());
  }
  /* Actualizar valores en la tabla escaleras_valores_elementos */
  for (var i = 1; i <= 6; i++) {
    updateItemsEscalerasValoresElementos(cod_usuario,
                                       codigo_inspeccion,
                                       $('#numero_item_element_inspec'+i).val(),
                                       $('#descrip_item_element_inspec'+i).val(),
                                       $('input:radio[name=sele_element_inspec'+i+']:checked').val());
  }
  /* Actualizar valores en la tabla escaleras_valores_defectos */
  for (var i = 1; i <= 93; i++) {
    if ($('input:radio[name=sele_defectos'+i+']:checked').val() == "No Cumple") {
      contador_items_nocumple += 1;
    }
    updateItemsEscalerasValoresDefectos(cod_usuario,
                                        codigo_inspeccion,
                                        $('#numero_item_defectos'+i).val(),
                                        $('#cal_item_defectos'+i).val(),
                                        $('input:radio[name=sele_defectos'+i+']:checked').val(),
                                        $('#text_lv_valor_observacion_'+i).val());
  }
  /* Actualizar valores en la tabla escaleras_valores_finales */
  updateItemsEscalerasValoresObservacionFinal(cod_usuario,codigo_inspeccion,textObserFinal);

  /* Se actualizan las respectiva tabla de auditoria */
  updateItemsAuditoriaInspeccionesEscaleras(cod_usuario,codigo_inspeccion,consecutivo_inspeccion,contador_items_nocumple,'Pendiente','No');
}

/*=============================================
* Funcion para actualizar datos en la tabla escaleras_valores_iniciales
*==============================================*/
function updateItemsEscalerasValoresIniciales(n_cliente,n_equipo,n_empresamto,v_velocidad,o_tipo_equipo,v_inclinacion,v_ancho_paso,f_fecha,ultimo_mto,inicio_servicio,ultima_inspeccion,v_codigo,o_consecutivoinsp,h_hora,tipo_informe,k_codusuario,k_codinspeccion) {
  $('#texto_carga').text('Guardando datos iniciales...Espere');
  db.transaction(function (tx) {
    var query = "UPDATE escaleras_valores_iniciales SET n_cliente = ?,"+
                                                       "n_equipo = ?,"+
                                                       "n_empresamto = ?,"+
                                                       "v_velocidad = ?,"+
                                                       "o_tipo_equipo = ?,"+
                                                       "v_inclinacion = ?,"+
                                                       "v_ancho_paso = ?,"+
                                                       "f_fecha = ?,"+
                                                       "ultimo_mto = ?,"+
                                                       "inicio_servicio = ?,"+
                                                       "ultima_inspeccion = ?,"+
                                                       "v_codigo = ?,"+
                                                       "o_consecutivoinsp = ?,"+
                                                       "h_hora = ?,"+
                                                       "o_tipo_informe = ? "+
                                                       "WHERE k_codusuario = ? "+
                                                       "AND k_codinspeccion = ?";
    tx.executeSql(query, [n_cliente,n_equipo,n_empresamto,v_velocidad,o_tipo_equipo,v_inclinacion,v_ancho_paso,f_fecha,ultimo_mto,inicio_servicio,ultima_inspeccion,v_codigo,o_consecutivoinsp,h_hora,tipo_informe,k_codusuario,k_codinspeccion], function(tx, res) {
      console.log("rowsAffected: " + res.rowsAffected);
    },
    function(tx, error) {
      console.log('UPDATE error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para actualizar una fila en la tabla escaleras_valores_preliminar
*==============================================*/
function updateItemsEscalerasValoresPreliminar(k_codusuario,k_codinspeccion,coditem_preli, calificacion,observacion) {
  db.transaction(function (tx) {
    var query = "UPDATE escaleras_valores_preliminar SET v_calificacion = ?,"+
                                                        "o_observacion = ? "+
                                                        "WHERE k_codusuario = ? "+
                                                        "AND k_codinspeccion = ? "+
                                                        "AND k_coditem_preli = ?";                                             
    tx.executeSql(query, [calificacion,observacion,k_codusuario,k_codinspeccion,coditem_preli], function(tx, res) {
      console.log("rowsAffected updateItemsEscalerasValoresPreliminar: " + res.rowsAffected);
    },
    function(tx, error) {
      console.log('UPDATE error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para actualizar una fila en la tabla escaleras_valores_proteccion
*==============================================*/
function updateItemsEscalerasValoresProteccion(k_codusuario,k_codinspeccion,cod_item, sele_inspector,sele_empresa,observacion) {
  db.transaction(function (tx) {
    var query = "UPDATE escaleras_valores_proteccion SET v_sele_inspector = ?,"+
                                                        "v_sele_empresa = ?,"+
                                                        "o_observacion = ? "+
                                                        "WHERE k_codusuario = ? "+
                                                        "AND k_codinspeccion = ? "+
                                                        "AND k_coditem = ?";                                        
    tx.executeSql(query, [sele_inspector,sele_empresa,observacion,k_codusuario,k_codinspeccion,cod_item], function(tx, res) {
      console.log("rowsAffected updateItemsEscalerasValoresProteccion: " + res.rowsAffected);
    },
    function(tx, error) {
      console.log('UPDATE error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para actualizar una fila en la tabla escaleras_valores_elementos
*==============================================*/
function updateItemsEscalerasValoresElementos(k_codusuario,k_codinspeccion,cod_item, seleccion,descripcion) {
  db.transaction(function (tx) {
    var query = "UPDATE escaleras_valores_elementos SET v_selecion = ?,"+
                                                       "o_descripcion = ? "+
                                                       "WHERE k_codusuario = ? "+
                                                       "AND k_codinspeccion = ? "+
                                                       "AND k_coditem = ?";                                         
    tx.executeSql(query, [descripcion,seleccion,k_codusuario,k_codinspeccion,cod_item], function(tx, res) {
      console.log("rowsAffected updateItemsEscalerasValoresElementos: " + res.rowsAffected);
    },
    function(tx, error) {
      console.log('UPDATE error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para actualizar datos en la tabla escaleras_valores_defectos
*==============================================*/
function updateItemsEscalerasValoresDefectos(k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) {
  $('#texto_carga').text('Guardando datos mecanicos...Espere');
  db.transaction(function (tx) {
    var query = "UPDATE escaleras_valores_defectos SET n_calificacion = ?,"+
                                                     "v_calificacion = ?,"+
                                                     "o_observacion = ? "+
                                                     "WHERE k_codusuario = ? "+
                                                     "AND k_codinspeccion = ? "+
                                                     "AND k_coditem = ?";                                             
    tx.executeSql(query, [n_calificacion,v_calificacion,o_observacion,k_codusuario,k_codinspeccion,k_coditem], function(tx, res) {
      console.log("rowsAffected puertas_valores_mecanicos: " + res.rowsAffected);
    },
    function(tx, error) {
      console.log('UPDATE error: ' + error.message);
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
function updateItemsEscalerasValoresObservacionFinal(k_codusuario,k_codinspeccion,o_observacion) {
  $('#texto_carga').text('Guardando revisión...Espere');
  db.transaction(function (tx) {
    var query = "UPDATE escaleras_valores_finales SET o_observacion = ?"+
                                                   "WHERE k_codusuario = ? "+
                                                   "AND k_codinspeccion = ?";                                       
    tx.executeSql(query, [o_observacion,k_codusuario,k_codinspeccion], function(tx, res) {
      console.log("rowsAffected addItemsEscalerasValoresObservacionFinal: " + res.rowsAffected);
    },
    function(tx, error) {
      console.log('UPDATE error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para actualizar una fila en la tabla auditoria_inspecciones_escaleras
*==============================================*/
function updateItemsAuditoriaInspeccionesEscaleras(k_codusuario,cod_inspeccion,consecutivo_insp,revision,estado_envio,o_actualizar_inspeccion) {
  //alert(cod_inspeccion+" "+consecutivo_insp+" "+estado_envio);
  var estado_revision;
  if (revision > 0) {
    estado_revision = "Si";
  }else{
    estado_revision = "No";
  }
  db.transaction(function (tx) {
    var query = "UPDATE auditoria_inspecciones_escaleras SET o_actualizar_inspeccion = ?,"+
                                                              "o_estado_envio = ?,"+
                                                              "o_revision = ?,"+
                                                              "v_item_nocumple = ? "+
                                                              "WHERE k_codusuario = ? "+
                                                              "AND k_codinspeccion = ? "+
                                                              "AND o_consecutivoinsp = ?";
    tx.executeSql(query, [o_actualizar_inspeccion,estado_envio,estado_revision,revision,k_codusuario,cod_inspeccion,consecutivo_insp], function(tx, res) {
      console.log("rowsAffected updateItemsAuditoriaInspeccionesEscaleras: " + res.rowsAffected);
    },
    function(tx, error) {
      console.log('UPDATE error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok');
    cerrarVentanaCarga();
  });
}
