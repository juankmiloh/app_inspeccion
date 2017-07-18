jQuery(document).ready(function($){
  //alert("Probando script!");
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
  message = 'Todo salio bien, se modifico la inspeccion Nº. ' + consecutivo_inspeccion;
  if(navigator.notification && navigator.notification.alert){
    navigator.notification.alert(message, null, "Montajes & Procesos M.P SAS", "Aceptar");
    window.location='../visualizar_inspecciones.html';
  }else{
    alert(message);
    window.location='../visualizar_inspecciones.html';
  }
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
  * LA CUAL SE CIERRA EN LA FUNCION addItemConsecutivoPuertas
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
  * Actualizar valores en las tablas
  * ============================= */
  /* Actualizar valores en la tabla puertas_valores_iniciales */
  updateItemsPuertasValoresIniciales(textCliente,
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
                                    cod_usuario,
                                    codigo_inspeccion);
  /* Actualizar valores en la tabla puertas_valores_preliminar */
  for (var i = 1; i <= 3; i++) {
    updateItemsPuertasValoresPreliminar(cod_usuario,
                                        codigo_inspeccion,
                                        $('#numero_item_preliminar'+i).val(),
                                        $('input:radio[name=seleval'+i+']:checked').val(),
                                        $('#text_obser_item'+i+'_eval_prel').val());
  }
  /* Actualizar valores en la tabla puertas_valores_proteccion */
  for (var i = 1; i <= 7; i++) {
    updateItemsPuertasValoresProteccion(cod_usuario,
                                        codigo_inspeccion,
                                        $('#numero_item_proteccion'+i).val(),
                                        $('input:radio[name=sele_protec_person'+i+']:checked').val(),
                                        $('input:radio[name=sele_protec_person'+i+'_'+i+']:checked').val(),
                                        $('#text_obser_protec_person'+i).val());
  }
  /* Actualizar valores en la tabla puertas_valores_elementos */
  for (var i = 1; i <= 6; i++) {
    updateItemsPuertasValoresElementos(cod_usuario,
                                       codigo_inspeccion,
                                       $('#numero_item_element_inspec'+i).val(),
                                       $('#descrip_item_element_inspec'+i).val(),
                                       $('input:radio[name=sele_element_inspec'+i+']:checked').val());
  }
  /* Actualizar valores en la tabla puertas_valores_mecanicos */
  for (var i = 1; i <= 37; i++) {
    if ($('input:radio[name=sele_mecanicos'+i+']:checked').val() == "No Cumple") {
      contador_items_nocumple += 1;
    }
    updateItemsPuertasValoresMecanicos(cod_usuario,
                                       codigo_inspeccion,
                                       $('#numero_item_mecanicos'+i).val(),
                                       $('#cal_item_mecanicos'+i).val(),
                                       $('input:radio[name=sele_mecanicos'+i+']:checked').val(),
                                       $('#text_lv_valor_observacion_'+i).val());
  }
  /* Actualizar valores en la tabla puertas_valores_electrica */
  for (var i = 38; i <= 42; i++) {
    if ($('input:radio[name=sele_electrica'+i+']:checked').val() == "No Cumple") {
      contador_items_nocumple += 1;
    }
    updateItemsPuertasValoresElectrica(cod_usuario,
                                       codigo_inspeccion,
                                       $('#numero_item_electrica'+i).val(),
                                       $('#cal_item_electrica'+i).val(),
                                       $('input:radio[name=sele_electrica'+i+']:checked').val(),
                                       $('#text_electrica_observacion_'+i).val());
  }
  /* Actualizar valores en la tabla puertas_valores_motorizacion */
  for (var i = 43; i <= 54; i++) {
    if ($('input:radio[name=sele_motorizacion'+i+']:checked').val() == "No Cumple") {
      contador_items_nocumple += 1;
    }
    updateItemsPuertasValoresMotorizacion(cod_usuario,
                                          codigo_inspeccion,
                                          $('#numero_item_motorizacion'+i).val(),
                                          $('#cal_item_motorizacion'+i).val(),
                                          $('input:radio[name=sele_motorizacion'+i+']:checked').val(),
                                          $('#text_motorizacion_observacion_'+i).val());
  }
  /* Actualizar valores en la tabla puertas_valores_otras */
  for (var i = 55; i <= 75; i++) {
    if ($('input:radio[name=sele_otras'+i+']:checked').val() == "No Cumple") {
      contador_items_nocumple += 1;
    }
    updateItemsPuertasValoresOtras(cod_usuario,
                                   codigo_inspeccion,
                                   $('#numero_item_otras'+i).val(),
                                   $('#cal_item_otras'+i).val(),
                                   $('input:radio[name=sele_otras'+i+']:checked').val(),
                                   $('#text_otras_observacion_'+i).val());
  }
  /* Actualizar valores en la tabla puertas_valores_maniobras */
  for (var i = 76; i <= 86; i++) {
    if ($('input:radio[name=sele_maniobras'+i+']:checked').val() == "No Cumple") {
      contador_items_nocumple += 1;
    }
    updateItemsPuertasValoresManiobras(cod_usuario,
                                       codigo_inspeccion,
                                       $('#numero_item_maniobras'+i).val(),
                                       $('#cal_item_maniobras'+i).val(),
                                       $('input:radio[name=sele_maniobras'+i+']:checked').val(),
                                       $('#text_maniobras_observacion_'+i).val());
  }
  /* Actualizar valores en la tabla puertas_valores_finales */
  updateItemsPuertasValoresObservacionFinal(cod_usuario,codigo_inspeccion,textObserFinal);

  /* Se actualizan las respectivas tablas  de auditoria y la tabla que maneja el consecutivo */
  updateItemsAuditoriaInspeccionesPuertas(cod_usuario,codigo_inspeccion,consecutivo_inspeccion,contador_items_nocumple);
}

/*=============================================
* Funcion para actualizar una fila en la tabla puertas_valores_iniciales
*==============================================*/
function updateItemsPuertasValoresIniciales(n_cliente,n_equipo,n_empresamto,o_desc_puerta,o_tipo_puerta,o_motorizacion,o_acceso,o_accionamiento,o_operador,o_hoja,o_transmision,o_identificacion,f_fecha,v_ancho,v_alto,v_codigo,o_consecutivoinsp,ultimo_mto,inicio_servicio,ultima_inspeccion,h_hora, k_codusuario,k_codinspeccion) {
  $('#texto_carga').text('Guardando datos iniciales...Espere');
  db.transaction(function (tx) {
    var query = "UPDATE puertas_valores_iniciales SET n_cliente = ?,"+
                                                      "n_equipo = ?,"+
                                                      "n_empresamto = ?,"+
                                                      "o_desc_puerta = ?,"+
                                                      "o_tipo_puerta = ?,"+
                                                      "o_motorizacion = ?,"+
                                                      "o_acceso = ?,"+
                                                      "o_accionamiento = ?,"+
                                                      "o_operador = ?,"+
                                                      "o_hoja = ?,"+
                                                      "o_transmision = ?,"+
                                                      "o_identificacion = ?,"+
                                                      "f_fecha = ?,"+
                                                      "v_ancho = ?,"+
                                                      "v_alto = ?,"+
                                                      "v_codigo = ?,"+
                                                      "o_consecutivoinsp = ?,"+
                                                      "ultimo_mto = ?,"+
                                                      "inicio_servicio = ?,"+
                                                      "ultima_inspeccion = ?,"+
                                                      "h_hora = ? "+
                                                      "WHERE k_codusuario = ? "+
                                                      "AND k_codinspeccion = ?";
    tx.executeSql(query, [n_cliente,n_equipo,n_empresamto,o_desc_puerta,o_tipo_puerta,o_motorizacion,o_acceso,o_accionamiento,o_operador,o_hoja,o_transmision,o_identificacion,f_fecha,v_ancho,v_alto,v_codigo,o_consecutivoinsp,ultimo_mto,inicio_servicio,ultima_inspeccion,h_hora, k_codusuario,k_codinspeccion], function(tx, res) {
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
* Funcion para actualizar una fila en la tabla puertas_valores_preliminar
*==============================================*/
function updateItemsPuertasValoresPreliminar(k_codusuario,k_codinspeccion,coditem_preli, calificacion,observacion) {
  db.transaction(function (tx) {
    var query = "UPDATE puertas_valores_preliminar SET v_calificacion = ?,"+
                                                      "o_observacion = ? "+
                                                      "WHERE k_codusuario = ? "+
                                                      "AND k_codinspeccion = ? "+
                                                      "AND k_coditem_preli = ?";                                             
    tx.executeSql(query, [calificacion,observacion,k_codusuario,k_codinspeccion,coditem_preli], function(tx, res) {
      console.log("rowsAffected updateItemsPuertasValoresPreliminar: " + res.rowsAffected);
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
* Funcion para actualizar una fila en la tabla puertas_valores_proteccion
*==============================================*/
function updateItemsPuertasValoresProteccion(k_codusuario,k_codinspeccion,cod_item, sele_inspector,sele_empresa,observacion) {
  db.transaction(function (tx) {
    var query = "UPDATE puertas_valores_proteccion SET v_sele_inspector = ?,"+
                                                      "v_sele_empresa = ?,"+
                                                      "o_observacion = ? "+
                                                      "WHERE k_codusuario = ? "+
                                                      "AND k_codinspeccion = ? "+
                                                      "AND k_coditem = ?";                                        
    tx.executeSql(query, [sele_inspector,sele_empresa,observacion,k_codusuario,k_codinspeccion,cod_item], function(tx, res) {
      console.log("rowsAffected updateItemsPuertasValoresProteccion: " + res.rowsAffected);
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
* Funcion para actualizar una fila en la tabla puertas_valores_elementos
*==============================================*/
function updateItemsPuertasValoresElementos(k_codusuario,k_codinspeccion,cod_item, seleccion,descripcion) {
  db.transaction(function (tx) {
    var query = "UPDATE puertas_valores_elementos SET v_selecion = ?,"+
                                                     "o_descripcion = ? "+
                                                     "WHERE k_codusuario = ? "+
                                                     "AND k_codinspeccion = ? "+
                                                     "AND k_coditem = ?";                                         
    tx.executeSql(query, [descripcion,seleccion,k_codusuario,k_codinspeccion,cod_item], function(tx, res) {
      console.log("rowsAffected updateItemsPuertasValoresElementos: " + res.rowsAffected);
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
* Funcion para actualizar una fila en la tabla puertas_valores_mecanicos
*==============================================*/
function updateItemsPuertasValoresMecanicos(k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) {
  $('#texto_carga').text('Guardando datos mecanicos...Espere');
  db.transaction(function (tx) {
    var query = "UPDATE puertas_valores_mecanicos SET n_calificacion = ?,"+
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
* Funcion para insertar datos en la tabla puertas_valores_electrica
*==============================================*/
function updateItemsPuertasValoresElectrica(k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) {
  $('#texto_carga').text('Guardando datos electrica...Espere');
  db.transaction(function (tx) {
    var query = "UPDATE puertas_valores_electrica SET n_calificacion = ?,"+
                                                     "v_calificacion = ?,"+
                                                     "o_observacion = ? "+
                                                     "WHERE k_codusuario = ? "+
                                                     "AND k_codinspeccion = ? "+
                                                     "AND k_coditem = ?";                                             
    tx.executeSql(query, [n_calificacion,v_calificacion,o_observacion,k_codusuario,k_codinspeccion,k_coditem], function(tx, res) {
      console.log("rowsAffected puertas_valores_electrica: " + res.rowsAffected);
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
* Funcion para insertar datos en la tabla puertas_valores_motorizacion
*==============================================*/
function updateItemsPuertasValoresMotorizacion(k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) {
  $('#texto_carga').text('Guardando datos motorizacion...Espere');
  db.transaction(function (tx) {
    var query = "UPDATE puertas_valores_motorizacion SET n_calificacion = ?,"+
                                                        "v_calificacion = ?,"+
                                                        "o_observacion = ? "+
                                                        "WHERE k_codusuario = ? "+
                                                        "AND k_codinspeccion = ? "+
                                                        "AND k_coditem = ?";                                             
    tx.executeSql(query, [n_calificacion,v_calificacion,o_observacion,k_codusuario,k_codinspeccion,k_coditem], function(tx, res) {
      console.log("rowsAffected puertas_valores_motorizacion: " + res.rowsAffected);
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
* Funcion para insertar datos en la tabla puertas_valores_otras
*==============================================*/
function updateItemsPuertasValoresOtras(k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) {
  $('#texto_carga').text('Guardando datos otras...Espere');
  db.transaction(function (tx) {
    var query = "UPDATE puertas_valores_otras SET n_calificacion = ?,"+
                                                 "v_calificacion = ?,"+
                                                 "o_observacion = ? "+
                                                 "WHERE k_codusuario = ? "+
                                                 "AND k_codinspeccion = ? "+
                                                 "AND k_coditem = ?";                                             
    tx.executeSql(query, [n_calificacion,v_calificacion,o_observacion,k_codusuario,k_codinspeccion,k_coditem], function(tx, res) {
      console.log("rowsAffected puertas_valores_otras: " + res.rowsAffected);
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
* Funcion para insertar datos en la tabla puertas_valores_maniobras
*==============================================*/
function updateItemsPuertasValoresManiobras(k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) {
  $('#texto_carga').text('Guardando datos maniobras...Espere');
  db.transaction(function (tx) {
    var query = "UPDATE puertas_valores_maniobras SET n_calificacion = ?,"+
                                                     "v_calificacion = ?,"+
                                                     "o_observacion = ? "+
                                                     "WHERE k_codusuario = ? "+
                                                     "AND k_codinspeccion = ? "+
                                                     "AND k_coditem = ?";                                             
    tx.executeSql(query, [n_calificacion,v_calificacion,o_observacion,k_codusuario,k_codinspeccion,k_coditem], function(tx, res) {
      console.log("rowsAffected puertas_valores_maniobras: " + res.rowsAffected);
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
* Funcion para insertar datos en la tabla puertas_valores_finales
*==============================================*/
function updateItemsPuertasValoresObservacionFinal(k_codusuario,k_codinspeccion,o_observacion) {
  $('#texto_carga').text('Guardando datos finales...Espere');
  db.transaction(function (tx) {
    var query = "UPDATE puertas_valores_finales SET o_observacion = ?"+
                                                   "WHERE k_codusuario = ? "+
                                                   "AND k_codinspeccion = ?";                                       
    tx.executeSql(query, [o_observacion,k_codusuario,k_codinspeccion], function(tx, res) {
      console.log("rowsAffected addItemsPuertasValoresObservacionFinal: " + res.rowsAffected);
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
* Funcion para insertar datos en la tabla auditoria_inspecciones_puertas
*==============================================*/
function updateItemsAuditoriaInspeccionesPuertas(k_codusuario,cod_inspeccion,consecutivo_insp,revision) {
  $('#texto_carga').text('Guardando Inspección...Espere');
  var estado_revision;
  if (revision > 0) {
    estado_revision = "Si";
  }else{
    estado_revision = "No";
  }
  db.transaction(function (tx) {
    var query = "UPDATE auditoria_inspecciones_puertas SET o_revision = ?,"+
                                                          "v_item_nocumple = ? "+
                                                          "WHERE k_codusuario = ? "+
                                                          "AND k_codinspeccion = ? "+
                                                          "AND o_consecutivoinsp = ?";
    tx.executeSql(query, [estado_revision,revision,k_codusuario,cod_inspeccion,consecutivo_insp], function(tx, res) {
      console.log("rowsAffected updateItemsAuditoriaInspeccionesPuertas: " + res.rowsAffected);
    },
    function(tx, error) {
      console.log('UPDATE error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok');
    //setTimeout('cerrarVentanaCarga()',7000); //SE LE DA UN TIEMPO PARA QUE SE CIERRE, MIENTRAS SE GUARDAN LOS VALORES EN LA BD
    cerrarVentanaCarga();
  });
}
