jQuery(document).ready(function($){
  ObtenerCantidadItemsAIPRE(); //Ejecutamos la funcion para guardar el valor en sesion de la cantidad de items de la tabla ascensor_items_preliminar y poderlo usar previamente
  ObtenerCantidadItemsAIPP();
  ObtenerCantidadItemsAIE();
  ObtenerCantidadItemsAIC();
  ObtenerCantidadItemsAIM();
  ObtenerCantidadItemsAIP();
  ObtenerCantidadItemsAIF();
});

/*=============================================
* Crear base de datos / Hacer conexion si ya esta creada
* parametros:
* var dbShell = window.openDatabase(database_name, database_version, database_displayname, database_size);
*==============================================*/
var db = window.openDatabase("montajes_inspeccion_mp", "1.0", "Inspeccion_MP", 1000000);

/* Inicializamos la variable para contar los items no cumple */
var contador_items_nocumple = 0;

/* Inicializamos la variable fecha y anio */
var fecha = new Date();
var anio = fecha.getFullYear();

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
  * LA CUAL SE CIERRA EN LA FUNCION addItemConsecutivoAscensores
  * ============================= */
  location.href = "#arriba";
  ocultarDivs();
  abrirVentanaCarga();
  var hora = mostrarhora();
  var cambiar_cod_inspeccion = $("#text_equipo").val();

  var codigo_inspeccion = getQueryVariable('id_inspeccion');
  var cod_usuario = getQueryVariable('cod_usuario');
  var consecutivo_inspeccion = $("#text_consecutivo").val();

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

  if (cambiar_cod_inspeccion == "true") {
    var prompt_codigo_insp = prompt("INGRESE EL NUEVO CODIGO DE INSPECCIÓN:");
    if(prompt_codigo_insp == undefined){
      //alert("Ha pulsado cancelar");
    }else if(prompt_codigo_insp == ""){
      //alert("Ha pulsado aceptar con el campo vacio");
    }else{
      var nuevo_codigo_insp = prompt_codigo_insp;
      var nuevo_consecutivo = parseInt(nuevo_codigo_insp);
      if (nuevo_consecutivo < 10) {
        nuevo_consecutivo = "0" + nuevo_consecutivo;
      }
      var nuevo_consecutivo_insp = "ASC"+cod_usuario+"-"+nuevo_consecutivo+"-"+anio;
    }
  }

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
  * Actualizar valores en las tablas
  * ============================= */
  /* Actualizar valores en la tabla ascensor_valores_iniciales */
  updateItemsAscensorValoresIniciales(textCliente,textEquipo,textEmpresaMantenimiento,textTipoAccionamiento,textCapacidadPersonas,textCapacidadPeso,textNumeroParadas,textFecha,textUltimoMto,textInicioServicio,textUltimaInspec,hora,cod_usuario,codigo_inspeccion,cambiar_cod_inspeccion,nuevo_codigo_insp,nuevo_consecutivo_insp);
  /* Actualizar valores en la tabla ascensor_valores_preliminar */
  var cantidadItemsTAIPRE = window.sessionStorage.getItem("cantidadItemsTablaAIPRE");
  for (var i = 1; i <= cantidadItemsTAIPRE; i++) {
    updateItemsAscensorValoresPreliminar(cod_usuario,
                                         codigo_inspeccion,
                                         $('#numero_item_preliminar'+i).val(),
                                         $('input:radio[name=seleval'+i+']:checked').val(),
                                         $('#text_obser_item'+i+'_eval_prel').val(),
                                         cambiar_cod_inspeccion,
                                         nuevo_codigo_insp,
                                         nuevo_consecutivo_insp);
  }
  /* Actualizar valores en la tabla ascensor_valores_proteccion */
  var cantidadItemsTAIPP = window.sessionStorage.getItem("cantidadItemsTablaAIPP");
  for (var i = 1; i <= cantidadItemsTAIPP; i++) {
    updateItemsAscensorValoresProteccion(cod_usuario,
                                         codigo_inspeccion,
                                         $('#numero_item_proteccion'+i).val(),
                                         $('input:radio[name=sele_protec_person'+i+']:checked').val(),
                                         $('input:radio[name=sele_protec_person'+i+'_'+i+']:checked').val(),
                                         $('#text_obser_protec_person'+i).val(),
                                         cambiar_cod_inspeccion,
                                         nuevo_codigo_insp,
                                         nuevo_consecutivo_insp);
  }
  /* Actualizar valores en la tabla ascensor_valores_elementos */
  var cantidadItemsTAIE = window.sessionStorage.getItem("cantidadItemsTablaAIE");
  for (var i = 1; i <= cantidadItemsTAIE; i++) {
    updateItemsAscensorValoresElementos(cod_usuario,
                                        codigo_inspeccion,
                                        $('#numero_item_element_inspec'+i).val(),
                                        $('#descrip_item_element_inspec'+i).val(),
                                        $('input:radio[name=sele_element_inspec'+i+']:checked').val(),
                                        cambiar_cod_inspeccion,
                                        nuevo_codigo_insp,
                                        nuevo_consecutivo_insp);
  }
  /* Actualizar valores en la tabla ascensor_valores_cabina */
  var cantidadItemsTAIC = window.sessionStorage.getItem("cantidadItemsTablaAIC");
  for (var i = 1; i <= cantidadItemsTAIC; i++) {
    if ($('input:radio[name=sele_cabina'+i+']:checked').val() == "No Cumple") {
      contador_items_nocumple += 1;
    }
    updateItemsAscensorValoresCabina(cod_usuario,
                                     codigo_inspeccion,
                                     $('#numero_item_cabina'+i).val(),
                                     $('#cal_item_cabina'+i).val(),
                                     $('input:radio[name=sele_cabina'+i+']:checked').val(),
                                     $('#text_lv_valor_observacion_'+i).val(),
                                     cambiar_cod_inspeccion,
                                     nuevo_codigo_insp,
                                     nuevo_consecutivo_insp);
  }
  /* Actualizar valores en la tabla ascensor_valores_maquinas */
  var cantidadItemsTAIM = window.sessionStorage.getItem("cantidadItemsTablaAIM");
  var numero_final_item = 36 + parseInt(cantidadItemsTAIM);
  for (var i = 36; i < numero_final_item; i++) {
    if ($('input:radio[name=sele_maquinas'+i+']:checked').val() == "No Cumple") {
      contador_items_nocumple += 1;
    }
    updateItemsAscensorValoresMaquinas(cod_usuario,
                                       codigo_inspeccion,
                                       $('#numero_item_maquinas'+i).val(),
                                       $('#cal_item_maquinas'+i).val(),
                                       $('input:radio[name=sele_maquinas'+i+']:checked').val(),
                                       $('#text_maquinas_observacion_'+i).val(),
                                       cambiar_cod_inspeccion,
                                       nuevo_codigo_insp,
                                       nuevo_consecutivo_insp);
  }
  /* Actualizar valores en la tabla ascensor_valores_pozo */
  var cantidadItemsTAIP = window.sessionStorage.getItem("cantidadItemsTablaAIP");
  var numero_final_item = 83 + parseInt(cantidadItemsTAIP);
  for (var i = 83; i < numero_final_item; i++) {
    if ($('input:radio[name=sele_pozo'+i+']:checked').val() == "No Cumple") {
      contador_items_nocumple += 1;
    }
    updateItemsAscensorValoresPozo(cod_usuario,
                                   codigo_inspeccion,
                                   $('#numero_item_pozo'+i).val(),
                                   $('#cal_item_pozo'+i).val(),
                                   $('input:radio[name=sele_pozo'+i+']:checked').val(),
                                   $('#text_pozo_observacion_'+i).val(),
                                   cambiar_cod_inspeccion,
                                   nuevo_codigo_insp,
                                   nuevo_consecutivo_insp);
  }
  /* Actualizar valores en la tabla ascensor_valores_foso */
  var cantidadItemsTAIF = window.sessionStorage.getItem("cantidadItemsTablaAIF");
  var numero_final_item = 148 + parseInt(cantidadItemsTAIF);
  for (var i = 148; i < numero_final_item; i++) {
    if ($('input:radio[name=sele_foso'+i+']:checked').val() == "No Cumple") {
      contador_items_nocumple += 1;
    }
    updateItemsAscensorValoresFoso(cod_usuario,
                                   codigo_inspeccion,
                                   $('#numero_item_foso'+i).val(),
                                   $('#cal_item_foso'+i).val(),
                                   $('input:radio[name=sele_foso'+i+']:checked').val(),
                                   $('#text_foso_observacion_'+i).val(),
                                   cambiar_cod_inspeccion,
                                   nuevo_codigo_insp,
                                   nuevo_consecutivo_insp);
  }
  /* Actualizar valores en la tabla ascensor_valores_finales */
  updateItemsAscensorValoresObservacionFinal(cod_usuario,codigo_inspeccion,textObserFinal,cambiar_cod_inspeccion,nuevo_codigo_insp,nuevo_consecutivo_insp);

  /* Se actualizan la tabla de auditoria */
  updateItemsAuditoriaInspeccionesAscensores(cod_usuario,codigo_inspeccion,consecutivo_inspeccion,contador_items_nocumple,cambiar_cod_inspeccion,nuevo_codigo_insp,nuevo_consecutivo_insp);
}

/*=============================================
* Funcion para actualizar una fila en la tabla ascensor_valores_iniciales
*==============================================*/
function updateItemsAscensorValoresIniciales(textCliente,textEquipo,textEmpresaMantenimiento,textTipoAccionamiento,textCapacidadPersonas,textCapacidadPeso,textNumeroParadas,textFecha,textUltimoMto,textInicioServicio,textUltimaInspec,hora, k_codusuario,k_codinspeccion,cambiar_cod_inspeccion,nuevo_codigo_insp,nuevo_consecutivo_insp) {
  console.log(cambiar_cod_inspeccion);
  console.log(nuevo_codigo_insp);
  console.log(nuevo_consecutivo_insp);
  if (cambiar_cod_inspeccion != "true") {
    db.transaction(function (tx) {
      var query = "UPDATE ascensor_valores_iniciales SET n_cliente = ?,"+
                                                        "n_equipo = ?,"+
                                                        "n_empresamto = ?,"+
                                                        "o_tipoaccion = ?,"+
                                                        "v_capacperson = ?,"+
                                                        "v_capacpeso = ?,"+
                                                        "v_paradas = ?,"+
                                                        "f_fecha = ?,"+
                                                        "ultimo_mto = ?,"+
                                                        "inicio_servicio = ?,"+
                                                        "ultima_inspeccion = ?,"+
                                                        "h_hora = ? "+
                                                        "WHERE k_codusuario = ? "+
                                                        "AND k_codinspeccion = ?";
      tx.executeSql(query, [textCliente,textEquipo,textEmpresaMantenimiento,textTipoAccionamiento,textCapacidadPersonas,textCapacidadPeso,textNumeroParadas,textFecha,textUltimoMto,textInicioServicio,textUltimaInspec,hora, k_codusuario,k_codinspeccion], function(tx, res) {
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
  }else{
    var hora_insp = null;
    db.transaction(function (tx) {
      var query = "SELECT h_hora FROM ascensor_valores_iniciales WHERE k_codinspeccion = ?";
      tx.executeSql(query, [k_codinspeccion], function (tx, resultSet) {
        console.log('hora de la inspeccion -> '+resultSet.rows.item(0).h_hora);
        hora_insp = resultSet.rows.item(0).h_hora;
      },
      function (tx, error) {
        console.log('SELECT error: ' + error.message);
      });
    }, function (error) {
      console.log('transaction error: ' + error.message);
    }, function () {
      console.log('transaction ok');
    });
    db.transaction(function (tx) {
      var query = "UPDATE ascensor_valores_iniciales SET k_codinspeccion = ?,"+
                                                        "o_consecutivoinsp = ?,"+
                                                        "n_cliente = ?,"+
                                                        "n_equipo = ?,"+
                                                        "n_empresamto = ?,"+
                                                        "o_tipoaccion = ?,"+
                                                        "v_capacperson = ?,"+
                                                        "v_capacpeso = ?,"+
                                                        "v_paradas = ?,"+
                                                        "f_fecha = ?,"+
                                                        "ultimo_mto = ?,"+
                                                        "inicio_servicio = ?,"+
                                                        "ultima_inspeccion = ?,"+
                                                        "h_hora = ? "+
                                                        "WHERE k_codusuario = ? "+
                                                        "AND k_codinspeccion = ? "+
                                                        "AND h_hora = ?";
      tx.executeSql(query, [String(nuevo_codigo_insp),String(nuevo_consecutivo_insp),textCliente,textEquipo,textEmpresaMantenimiento,textTipoAccionamiento,textCapacidadPersonas,textCapacidadPeso,textNumeroParadas,textFecha,textUltimoMto,textInicioServicio,textUltimaInspec,hora, k_codusuario,k_codinspeccion,hora_insp], function(tx, res) {
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
* Funcion para actualizar una fila en la tabla ascensor_valores_preliminar
*==============================================*/
function updateItemsAscensorValoresPreliminar(k_codusuario,k_codinspeccion,coditem_preli, calificacion,observacion,cambiar_cod_inspeccion,nuevo_codigo_insp,nuevo_consecutivo_insp) {
  if (cambiar_cod_inspeccion != "true") {
    db.transaction(function (tx) {
      var query = "UPDATE ascensor_valores_preliminar SET v_calificacion = ?,"+
                                                          "o_observacion = ? "+
                                                          "WHERE k_codusuario = ? "+
                                                          "AND k_codinspeccion = ? "+
                                                          "AND k_coditem_preli = ?";
      tx.executeSql(query, [calificacion,observacion,k_codusuario,k_codinspeccion,coditem_preli], function(tx, res) {
        console.log("rowsAffected updateItemsAscensorValoresPreliminar: " + res.rowsAffected);
      },
      function(tx, error) {
        console.log('UPDATE error: ' + error.message);
      });
    }, function(error) {
      console.log('transaction error: ' + error.message);
    }, function() {
      console.log('transaction ok');
    });
  }else{
    db.transaction(function (tx) {
      var query = "SELECT * FROM ascensor_valores_preliminar WHERE k_codinspeccion=? AND k_coditem_preli=? ORDER BY k_coditem_preli ASC LIMIT 1";
      tx.executeSql(query, [k_codinspeccion,coditem_preli], function (tx, resultSet) {
        // console.log('resultado de la consulta -> '+resultSet.rows.item(0).k_codinspeccion);
        for(var x = 0; x < resultSet.rows.length; x++) {
          console.log('resultado de la consulta k_codinspeccion '+x+' -> '+resultSet.rows.item(x).k_codinspeccion);
          console.log('resultado de la consulta k_coditem_preli '+x+' -> '+resultSet.rows.item(x).k_coditem_preli);
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
    db.transaction(function (tx) {
      // var query = "UPDATE ascensor_valores_preliminar SET k_codinspeccion = ?,"+
      //                                                     "v_calificacion = ?,"+
      //                                                     "o_observacion = ? "+
      //                                                     "WHERE k_codinspeccion = ? "+
      //                                                     "AND k_codinspeccion IN (SELECT k_codinspeccion FROM ascensor_valores_preliminar WHERE k_codinspeccion=? AND k_coditem_preli=? ORDER BY k_codinspeccion LIMIT 1)"+
      //                                                     "AND k_coditem_preli IN (SELECT k_coditem_preli FROM ascensor_valores_preliminar WHERE k_codinspeccion=? AND k_coditem_preli=? ORDER BY k_coditem_preli LIMIT 1)";
      var query = "Update ascensor_valores_preliminar Set k_codinspeccion = ? WHERE k_codinspeccion IN (SELECT * FROM (SELECT k_codinspeccion FROM ascensor_valores_preliminar WHERE k_codinspeccion=? AND k_coditem_preli=? LIMIT 1) AS t)";
      tx.executeSql(query, [nuevo_codigo_insp,k_codinspeccion,coditem_preli], function(tx, res) {
        console.log("rowsAffected updateItemsAscensorValoresPreliminar: " + res.rowsAffected);
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
* Funcion para actualizar una fila en la tabla ascensor_valores_proteccion
*==============================================*/
function updateItemsAscensorValoresProteccion(k_codusuario,k_codinspeccion,cod_item, sele_inspector,sele_empresa,observacion,cambiar_cod_inspeccion,nuevo_codigo_insp,nuevo_consecutivo_insp) {
  db.transaction(function (tx) {
    var query = "UPDATE ascensor_valores_proteccion SET v_sele_inspector = ?,"+
                                                        "v_sele_empresa = ?,"+
                                                        "o_observacion = ? "+
                                                        "WHERE k_codusuario = ? "+
                                                        "AND k_codinspeccion = ? "+
                                                        "AND k_coditem = ?";                                        
    tx.executeSql(query, [sele_inspector,sele_empresa,observacion,k_codusuario,k_codinspeccion,cod_item], function(tx, res) {
      console.log("rowsAffected updateItemsAscensorValoresProteccion: " + res.rowsAffected);
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
* Funcion para actualizar una fila en la tabla ascensor_valores_elementos
*==============================================*/
function updateItemsAscensorValoresElementos(k_codusuario,k_codinspeccion,cod_item, seleccion,descripcion,cambiar_cod_inspeccion,nuevo_codigo_insp,nuevo_consecutivo_insp) {
  db.transaction(function (tx) {
    var query = "UPDATE ascensor_valores_elementos SET v_selecion = ?,"+
                                                        "o_descripcion = ? "+
                                                        "WHERE k_codusuario = ? "+
                                                        "AND k_codinspeccion = ? "+
                                                        "AND k_coditem = ?";                                         
    tx.executeSql(query, [descripcion,seleccion,k_codusuario,k_codinspeccion,cod_item], function(tx, res) {
      console.log("rowsAffected updateItemsAscensorValoresElementos: " + res.rowsAffected);
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
* Funcion para actualizar una fila en la tabla ascensor_valores_cabina
*==============================================*/
function updateItemsAscensorValoresCabina(k_codusuario,k_codinspeccion,coditem_preli, calificacion,seleccion,observacion,cambiar_cod_inspeccion,nuevo_codigo_insp,nuevo_consecutivo_insp) {
  db.transaction(function (tx) {
    var query = "UPDATE ascensor_valores_cabina SET n_calificacion = ?,"+
                                                    "v_calificacion = ?,"+
                                                    "o_observacion = ? "+
                                                    "WHERE k_codusuario = ? "+
                                                    "AND k_codinspeccion = ? "+
                                                    "AND k_coditem = ?";                                             
    tx.executeSql(query, [calificacion,seleccion,observacion,k_codusuario,k_codinspeccion,coditem_preli], function(tx, res) {
      console.log("rowsAffected updateItemsAscensorValoresCabina: " + res.rowsAffected);
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
* Funcion para actualizar una fila en la tabla ascensor_valores_maquinas
*==============================================*/
function updateItemsAscensorValoresMaquinas(k_codusuario,k_codinspeccion,coditem_preli, calificacion,seleccion,observacion,cambiar_cod_inspeccion,nuevo_codigo_insp,nuevo_consecutivo_insp) {
  db.transaction(function (tx) {
    var query = "UPDATE ascensor_valores_maquinas SET n_calificacion = ?,"+
                                                      "v_calificacion = ?,"+
                                                      "o_observacion = ? "+
                                                      "WHERE k_codusuario = ? "+
                                                      "AND k_codinspeccion = ? "+
                                                      "AND k_coditem = ?";                                             
    tx.executeSql(query, [calificacion,seleccion,observacion,k_codusuario,k_codinspeccion,coditem_preli], function(tx, res) {
      console.log("rowsAffected ascensor_valores_maquinas: " + res.rowsAffected);
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
* Funcion para actualizar una fila en la tabla ascensor_valores_pozo
*==============================================*/
function updateItemsAscensorValoresPozo(k_codusuario,k_codinspeccion,coditem_preli, calificacion,seleccion,observacion,cambiar_cod_inspeccion,nuevo_codigo_insp,nuevo_consecutivo_insp) {
  db.transaction(function (tx) {
    var query = "UPDATE ascensor_valores_pozo SET n_calificacion = ?,"+
                                                      "v_calificacion = ?,"+
                                                      "o_observacion = ? "+
                                                      "WHERE k_codusuario = ? "+
                                                      "AND k_codinspeccion = ? "+
                                                      "AND k_coditem = ?";                                             
    tx.executeSql(query, [calificacion,seleccion,observacion,k_codusuario,k_codinspeccion,coditem_preli], function(tx, res) {
      console.log("rowsAffected ascensor_valores_pozo: " + res.rowsAffected);
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
* Funcion para actualizar una fila en la tabla ascensor_valores_foso
*==============================================*/
function updateItemsAscensorValoresFoso(k_codusuario,k_codinspeccion,coditem_preli, calificacion,seleccion,observacion,cambiar_cod_inspeccion,nuevo_codigo_insp,nuevo_consecutivo_insp) {
  db.transaction(function (tx) {
    var query = "UPDATE ascensor_valores_foso SET n_calificacion = ?,"+
                                                      "v_calificacion = ?,"+
                                                      "o_observacion = ? "+
                                                      "WHERE k_codusuario = ? "+
                                                      "AND k_codinspeccion = ? "+
                                                      "AND k_coditem = ?";                                             
    tx.executeSql(query, [calificacion,seleccion,observacion,k_codusuario,k_codinspeccion,coditem_preli], function(tx, res) {
      console.log("rowsAffected ascensor_valores_foso: " + res.rowsAffected);
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
* Funcion para actualizar una fila en la tabla ascensor_valores_finales
*==============================================*/
function updateItemsAscensorValoresObservacionFinal(k_codusuario,k_codinspeccion,o_observacion,cambiar_cod_inspeccion,nuevo_codigo_insp,nuevo_consecutivo_insp) {
  db.transaction(function (tx) {
    var query = "UPDATE ascensor_valores_finales SET o_observacion = ?"+
                                                     "WHERE k_codusuario = ? "+
                                                     "AND k_codinspeccion = ?";                                       
    tx.executeSql(query, [o_observacion,k_codusuario,k_codinspeccion], function(tx, res) {
      console.log("rowsAffected updateItemsAscensorValoresObservacionFinal: " + res.rowsAffected);
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
* Funcion para actualizar una fila en la tabla auditoria_inspecciones_ascensores
*==============================================*/
function updateItemsAuditoriaInspeccionesAscensores(k_codusuario,cod_inspeccion,consecutivo_insp,revision,cambiar_cod_inspeccion,nuevo_codigo_insp,nuevo_consecutivo_insp) {
  //alert(cod_inspeccion+" "+consecutivo_insp+" "+revision);
  var estado_revision;
  if (revision > 0) {
    estado_revision = "Si";
  }else{
    estado_revision = "No";
  }
  db.transaction(function (tx) {
    var query = "UPDATE auditoria_inspecciones_ascensores SET o_revision = ?,"+
                                                              "v_item_nocumple = ? "+
                                                              "WHERE k_codusuario = ? "+
                                                              "AND k_codinspeccion = ? "+
                                                              "AND o_consecutivoinsp = ?";
    tx.executeSql(query, [estado_revision,revision,k_codusuario,cod_inspeccion,consecutivo_insp], function(tx, res) {
      console.log("rowsAffected updateItemsAuditoriaInspeccionesAscensores: " + res.rowsAffected);
    },
    function(tx, error) {
      console.log('UPDATE error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok');
    //setTimeout('cerrarVentanaCarga()',7000); //SE LE DA UN TIEMPO PARA QUE SE CIERRE, MIENTRAS SE GUARDAN LOS VALORES EN LA BD
    //cerrarVentanaCarga();
  });
}
