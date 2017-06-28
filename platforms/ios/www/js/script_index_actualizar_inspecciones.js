function actualizar_inspecciones(){
  //alert("actualizar_inspecciones");
  probar_conexion_internet();
}

/*=============================================
* Funcion que permite abrir la ventana de carga
*==============================================*/
function abrir_Ventana_Carga(){
  $('#texto_carga').text("Obteniendo datos de inspecciones...Espere");
  $('.fbback').show();
  $('.fb').show();
  $('.fbdrag1').show();
  $('body').css('overflow','hidden');
  $('#btn_actualizar_inspecciones').prop('disabled', 'disabled'); //deshabilitar boton
}

/*=============================================
* Funcion que permite cerrar la ventana que aparece mientras se cargan las tablas
*==============================================*/
function cerrar_Ventana_Carga(){
  $('.fbback').hide();
  $('.fbdrag1').hide();
  $('.fb').hide();
  $('body').css('overflow','auto');
  $('#btn_actualizar_inspecciones').prop('disabled', 'disabled'); //deshabilitar boton
  setTimeout('habilitarBoton()',20000);
  //$('#btn_actualizar_inspecciones').prop('disabled', false); //habilitar boton
}

function habilitarBoton(){
  $('#btn_actualizar_inspecciones').prop('disabled', false);
}

/*=============================================
* Funcion para llenar la tabla ascensor_valores_cabina, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaAscensorValoresCabina(){
  var cod_inspector = window.localStorage.getItem("codigo_inspector");
  var parametros = {"inspector" : cod_inspector};
  $.ajax({
    url: "http://192.168.0.27:8080/inspeccion/servidor/php/json_app_ascensor_valores_cabina.php",
    data: parametros,
    type: "POST",
    dataType : "JSON",
    success: function(response){
      $.each(response, function(i,item){
        var k_codusuario = item.k_codusuario;
        var k_codinspeccion = item.k_codinspeccion;
        var k_coditem = item.k_coditem_cabina;
        var n_calificacion = item.n_calificacion;
        var v_calificacion = item.v_calificacion;
        var o_observacion = item.o_observacion;
        var cantidad_filas = item.cantidad_filas;

        var codigo_inspeccion = k_codinspeccion;
        if (codigo_inspeccion < 10) {
          codigo_inspeccion = "0" + codigo_inspeccion;
        }
        if (codigo_inspeccion < 100) {
          codigo_inspeccion = "0" + codigo_inspeccion;
        }

        db.transaction(function (tx) {
          var query = "SELECT * FROM ascensor_valores_cabina WHERE k_codusuario = ? AND k_codinspeccion = ?";
          tx.executeSql(query, [k_codusuario,codigo_inspeccion], function (tx, resultSet) {
            if (resultSet.rows.length == 0) {
              //alert("Agregar -> "+resultSet.rows.length);
              addItemsAscensorValoresCabina(k_codusuario,codigo_inspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion); 
            }else{
              //alert("Actualizar -> "+resultSet.rows.length);
              updateItemsAscensorValoresCabina(k_codusuario,codigo_inspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion);
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

      });
    }
  });
}

/*=============================================
* Funcion para actualizar una fila en la tabla ascensor_valores_cabina
*==============================================*/
function updateItemsAscensorValoresCabina(k_codusuario,k_codinspeccion,k_coditem, n_calificacion,v_calificacion,o_observacion) {
  db.transaction(function (tx) {
    var query = "UPDATE ascensor_valores_cabina SET n_calificacion = ?,"+
                                                    "v_calificacion = ?,"+
                                                    "o_observacion = ? "+
                                                    "WHERE k_codusuario = ? "+
                                                    "AND k_codinspeccion = ? "+
                                                    "AND k_coditem = ?";                                         
    tx.executeSql(query, [n_calificacion,v_calificacion,o_observacion,k_codusuario,k_codinspeccion,k_coditem], function(tx, res) {
      console.log("rowsAffected updateItemsAscensorValoresCabina: " + res.rowsAffected);
      $('#texto_carga').text("Actualizando datos de cabina...Espere");
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
* Funcion para insertar datos en la tabla ascensor_valores_cabina
*==============================================*/
function addItemsAscensorValoresCabina(k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) {
  db.transaction(function (tx) {
    var query = "INSERT INTO ascensor_valores_cabina (k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) VALUES (?,?,?,?,?,?)";
    tx.executeSql(query, [k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion], function(tx, res) {
      console.log("insertId: " + res.insertId + " -- probably 1");
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
      $('#texto_carga').text("Añadiendo datos de cabina...Espere");
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
* Funcion para llenar la tabla ascensor_valores_elementos, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaAscensorValoresElementos(){
  var cod_inspector = window.localStorage.getItem("codigo_inspector");
  var parametros = {"inspector" : cod_inspector};
  $.ajax({
    url: "http://192.168.0.27:8080/inspeccion/servidor/php/json_app_ascensor_valores_elementos.php",
    data: parametros,
    type: "POST",
    dataType : "JSON",
    success: function(response){
      $.each(response, function(i,item){
        var k_codusuario = item.k_codusuario;
        var k_codinspeccion = item.k_codinspeccion;
        var k_coditem = item.k_coditem;
        var o_descripcion = item.o_descripcion;
        var v_seleccion = item.v_seleccion;

        var codigo_inspeccion = k_codinspeccion;
        if (codigo_inspeccion < 10) {
          codigo_inspeccion = "0" + codigo_inspeccion;
        }
        if (codigo_inspeccion < 100) {
          codigo_inspeccion = "0" + codigo_inspeccion;
        }

        db.transaction(function (tx) {
          var query = "SELECT * FROM ascensor_valores_elementos WHERE k_codusuario = ? AND k_codinspeccion = ?";
          tx.executeSql(query, [k_codusuario,codigo_inspeccion], function (tx, resultSet) {
            if (resultSet.rows.length == 0) {
              addItemsAscensorValoresElementos(k_codusuario,codigo_inspeccion,k_coditem,o_descripcion,v_seleccion);
            }else{
              updateItemsAscensorValoresElementos(k_codusuario,codigo_inspeccion,k_coditem, o_descripcion,v_seleccion);
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
      
      });
    }
  });
}

/*=============================================
* Funcion para actualizar una fila en la tabla ascensor_valores_elementos
*==============================================*/
function updateItemsAscensorValoresElementos(k_codusuario,k_codinspeccion,k_coditem, o_descripcion,v_seleccion) {
  db.transaction(function (tx) {
    var query = "UPDATE ascensor_valores_elementos SET o_descripcion = ?,"+
                                                        "v_selecion = ? "+
                                                        "WHERE k_codusuario = ? "+
                                                        "AND k_codinspeccion = ? "+
                                                        "AND k_coditem = ?";                                       
    tx.executeSql(query, [o_descripcion,v_seleccion,k_codusuario,k_codinspeccion,k_coditem], function(tx, res) {
      console.log("rowsAffected updateItemsAscensorValoresElementos: " + res.rowsAffected);
      $('#texto_carga').text("Actualizando datos elementos...Espere");
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
* Funcion para insertar datos en la tabla ascensor_valores_elementos
*==============================================*/
function addItemsAscensorValoresElementos(k_codusuario,k_codinspeccion,k_coditem,o_descripcion,v_seleccion) {
  db.transaction(function (tx) {
    var query = "INSERT INTO ascensor_valores_elementos (k_codusuario,k_codinspeccion,k_coditem,o_descripcion,v_selecion) VALUES (?,?,?,?,?)";
    tx.executeSql(query, [k_codusuario,k_codinspeccion,k_coditem,o_descripcion,v_seleccion], function(tx, res) {
      console.log("insertId: " + res.insertId + " -- probably 1");
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
      $('#texto_carga').text("Añadiendo datos elementos...Espere");
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
* Funcion para llenar la tabla ascensor_valores_finales, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaAscensorValoresFinales(){
  var cod_inspector = window.localStorage.getItem("codigo_inspector");
  var parametros = {"inspector" : cod_inspector};
  $.ajax({
    url: "http://192.168.0.27:8080/inspeccion/servidor/php/json_app_ascensor_valores_finales.php",
    data: parametros,
    type: "POST",
    dataType : "JSON",
    success: function(response){
      $.each(response, function(i,item){
        var k_codusuario = item.k_codusuario;
        var k_codinspeccion = item.k_codinspeccion;
        var o_observacion = item.o_observacion;

        var codigo_inspeccion = k_codinspeccion;
        if (codigo_inspeccion < 10) {
          codigo_inspeccion = "0" + codigo_inspeccion;
        }
        if (codigo_inspeccion < 100) {
          codigo_inspeccion = "0" + codigo_inspeccion;
        }

        db.transaction(function (tx) {
          var query = "SELECT * FROM ascensor_valores_finales WHERE k_codusuario = ? AND k_codinspeccion = ?";
          tx.executeSql(query, [k_codusuario,codigo_inspeccion], function (tx, resultSet) {
            if (resultSet.rows.length == 0) {
              addItemsAscensorValoresFinales(k_codusuario,codigo_inspeccion,o_observacion);  
            }else{
              updateItemsAscensorValoresFinales(k_codusuario,codigo_inspeccion,o_observacion);
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
    
      });
    }
  });
}

/*=============================================
* Funcion para actualizar una fila en la tabla ascensor_valores_finales
*==============================================*/
function updateItemsAscensorValoresFinales(k_codusuario,k_codinspeccion,o_observacion) {
  db.transaction(function (tx) {
    var query = "UPDATE ascensor_valores_finales SET o_observacion = ?"+
                                                     "WHERE k_codusuario = ? "+
                                                     "AND k_codinspeccion = ?";                                       
    tx.executeSql(query, [o_observacion,k_codusuario,k_codinspeccion], function(tx, res) {
      console.log("rowsAffected updateItemsAscensorValoresFinales: " + res.rowsAffected);
      $('#texto_carga').text("Actualizando datos de observación...Espere");
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
* Funcion para insertar datos en la tabla ascensor_valores_finales
*==============================================*/
function addItemsAscensorValoresFinales(k_codusuario,k_codinspeccion,o_observacion) {
  db.transaction(function (tx) {
    var query = "INSERT INTO ascensor_valores_finales (k_codusuario,k_codinspeccion,o_observacion) VALUES (?,?,?)";
    tx.executeSql(query, [k_codusuario,k_codinspeccion,o_observacion], function(tx, res) {
      console.log("insertId: " + res.insertId + " -- probably 1");
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
      $('#texto_carga').text("Añadiendo datos de observación...Espere");
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
* Funcion para llenar la tabla ascensor_valores_foso, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaAscensorValoresFoso(){
  var cod_inspector = window.localStorage.getItem("codigo_inspector");
  var parametros = {"inspector" : cod_inspector};
  $.ajax({
    url: "http://192.168.0.27:8080/inspeccion/servidor/php/json_app_ascensor_valores_foso.php",
    data: parametros,
    type: "POST",
    dataType : "JSON",
    success: function(response){
      $.each(response, function(i,item){
        var k_codusuario = item.k_codusuario;
        var k_codinspeccion = item.k_codinspeccion;
        var k_coditem = item.k_coditem;
        var n_calificacion = item.n_calificacion;
        var v_calificacion = item.v_calificacion;
        var o_observacion = item.o_observacion;
        var cantidad_filas = item.cantidad_filas;

        var codigo_inspeccion = k_codinspeccion;
        if (codigo_inspeccion < 10) {
          codigo_inspeccion = "0" + codigo_inspeccion;
        }
        if (codigo_inspeccion < 100) {
          codigo_inspeccion = "0" + codigo_inspeccion;
        }

        db.transaction(function (tx) {
          var query = "SELECT * FROM ascensor_valores_foso WHERE k_codusuario = ? AND k_codinspeccion = ?";
          tx.executeSql(query, [k_codusuario,codigo_inspeccion], function (tx, resultSet) {
            if (resultSet.rows.length == 0) {
              addItemsAscensorValoresFoso(k_codusuario,codigo_inspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion);
            }else{
              updateItemsAscensorValoresFoso(k_codusuario,codigo_inspeccion,k_coditem, n_calificacion,v_calificacion,o_observacion);
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
      
      });
    }
  });
}

/*=============================================
* Funcion para actualizar una fila en la tabla ascensor_valores_foso
*==============================================*/
function updateItemsAscensorValoresFoso(k_codusuario,k_codinspeccion,k_coditem, n_calificacion,v_calificacion,o_observacion) {
  db.transaction(function (tx) {
    var query = "UPDATE ascensor_valores_foso SET n_calificacion = ?,"+
                                                  "v_calificacion = ?,"+
                                                  "o_observacion = ? "+
                                                  "WHERE k_codusuario = ? "+
                                                  "AND k_codinspeccion = ? "+
                                                  "AND k_coditem = ?";
    tx.executeSql(query, [n_calificacion,v_calificacion,o_observacion,k_codusuario,k_codinspeccion,k_coditem], function(tx, res) {
      console.log("rowsAffected ascensor_valores_foso: " + res.rowsAffected);
      $('#texto_carga').text("Actualizando datos de foso...Espere");
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
* Funcion para insertar datos en la tabla ascensor_valores_foso
*==============================================*/
function addItemsAscensorValoresFoso(k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) {
  db.transaction(function (tx) {
    var query = "INSERT INTO ascensor_valores_foso (k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) VALUES (?,?,?,?,?,?)";
    tx.executeSql(query, [k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion], function(tx, res) {
      console.log("insertId: " + res.insertId + " -- probably 1");
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
      $('#texto_carga').text("Añadiendo datos de foso...Espere");
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
* Funcion para llenar la tabla ascensor_valores_iniciales, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaAscensorValoresIniciales(){
  var cod_inspector = window.localStorage.getItem("codigo_inspector");
  var parametros = {"inspector" : cod_inspector};
  $.ajax({
    url: "http://192.168.0.27:8080/inspeccion/servidor/php/json_app_ascensor_valores_iniciales.php",
    data: parametros,
    type: "POST",
    dataType : "JSON",
    success: function(response){
      $.each(response, function(i,item){
        var k_codusuario = item.k_codusuario;
        var k_codinspeccion = item.k_codinspeccion;
        var n_cliente = item.n_cliente;
        var n_equipo = item.n_equipo;
        var n_empresamto = item.n_empresamto;
        var o_tipoaccion = item.o_tipoaccion;
        var v_capacperson = item.v_capacperson;
        var v_capacpeso = item.v_capacpeso;
        var f_fecha = item.f_fecha;
        var v_codigo = item.v_codigo;
        var v_paradas = item.v_paradas;
        var o_consecutivoinsp = item.o_consecutivoinsp;
        var ultimo_mto = item.ultimo_mto;
        var inicio_servicio = item.inicio_servicio;
        var ultima_inspeccion = item.ultima_inspeccion;
        var h_hora = item.h_hora;
        var o_tipo_informe = item.o_tipo_informe;

        var codigo_inspeccion = k_codinspeccion;
        if (codigo_inspeccion < 10) {
          codigo_inspeccion = "0" + codigo_inspeccion;
        }
        if (codigo_inspeccion < 100) {
          codigo_inspeccion = "0" + codigo_inspeccion;
        }

        db.transaction(function (tx) {
          var query = "SELECT * FROM ascensor_valores_iniciales WHERE k_codusuario = ? AND k_codinspeccion = ?";
          tx.executeSql(query, [k_codusuario,codigo_inspeccion], function (tx, resultSet) {
            //alert(resultSet.rows.length);
            if (resultSet.rows.length == 0) {
              addItemsAscensorValoresIniciales(k_codusuario,codigo_inspeccion,n_cliente,n_equipo,n_empresamto,o_tipoaccion,v_capacperson,v_capacpeso,v_paradas,f_fecha,v_codigo,o_consecutivoinsp,ultimo_mto,inicio_servicio,ultima_inspeccion,h_hora,o_tipo_informe);
            }else{
              updateItemsAscensorValoresIniciales(n_cliente,n_equipo,n_empresamto,o_tipoaccion,v_capacperson,v_capacpeso,v_paradas,f_fecha,v_codigo,o_consecutivoinsp,ultimo_mto,inicio_servicio,ultima_inspeccion,h_hora,o_tipo_informe, k_codusuario,codigo_inspeccion);
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
        
      });
    }
  });
}

/*=============================================
* Funcion para actualizar una fila en la tabla ascensor_valores_iniciales
*==============================================*/
function updateItemsAscensorValoresIniciales(n_cliente,n_equipo,n_empresamto,o_tipoaccion,v_capacperson,v_capacpeso,v_paradas,f_fecha,v_codigo,o_consecutivoinsp,ultimo_mto,inicio_servicio,ultima_inspeccion,h_hora,o_tipo_informe, k_codusuario,k_codinspeccion) {
  db.transaction(function (tx) {
    var query = "UPDATE ascensor_valores_iniciales SET n_cliente = ?,"+
                                                      "n_equipo = ?,"+
                                                      "n_empresamto = ?,"+
                                                      "o_tipoaccion = ?,"+
                                                      "v_capacperson = ?,"+
                                                      "v_capacpeso = ?,"+
                                                      "v_paradas = ?,"+
                                                      "f_fecha = ?,"+
                                                      "v_codigo = ?,"+
                                                      "o_consecutivoinsp = ?,"+
                                                      "ultimo_mto = ?,"+
                                                      "inicio_servicio = ?,"+
                                                      "ultima_inspeccion = ?,"+
                                                      "h_hora = ?,"+
                                                      "o_tipo_informe = ? "+
                                                      "WHERE k_codusuario = ? "+
                                                      "AND k_codinspeccion = ?";
    tx.executeSql(query, [n_cliente,n_equipo,n_empresamto,o_tipoaccion,v_capacperson,v_capacpeso,v_paradas,f_fecha,v_codigo,o_consecutivoinsp,ultimo_mto,inicio_servicio,ultima_inspeccion,h_hora,o_tipo_informe, k_codusuario,k_codinspeccion], function(tx, res) {
      console.log("rowsAffected updateItemsAscensorValoresIniciales: " + res.rowsAffected);
      $('#texto_carga').text("Actualizando datos iniciales...Espere");
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
* Funcion para insertar datos en la tabla ascensor_valores_iniciales
*==============================================*/
function addItemsAscensorValoresIniciales(k_codusuario,k_codinspeccion,n_cliente,n_equipo,n_empresamto,o_tipoaccion,v_capacperson,v_capacpeso,v_paradas,f_fecha,v_codigo,o_consecutivoinsp,ultimo_mto,inicio_servicio,ultima_inspeccion,h_hora,o_tipo_informe) {
  db.transaction(function (tx) {
    var query = "INSERT INTO ascensor_valores_iniciales (k_codusuario,k_codinspeccion,n_cliente,n_equipo,n_empresamto,o_tipoaccion,v_capacperson,v_capacpeso,v_paradas,f_fecha,v_codigo,o_consecutivoinsp,ultimo_mto,inicio_servicio,ultima_inspeccion,h_hora,o_tipo_informe) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    tx.executeSql(query, [k_codusuario,k_codinspeccion,n_cliente,n_equipo,n_empresamto,o_tipoaccion,v_capacperson,v_capacpeso,v_paradas,f_fecha,v_codigo,o_consecutivoinsp,ultimo_mto,inicio_servicio,ultima_inspeccion,h_hora,o_tipo_informe], function(tx, res) {
      console.log("insertId: " + res.insertId + " -- probably 1");
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
      $('#texto_carga').text("Añadiendo datos iniciales...Espere");
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
* Funcion para llenar la tabla ascensor_valores_maquinas, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaAscensorValoresMaquinas(){
  var cod_inspector = window.localStorage.getItem("codigo_inspector");
  var parametros = {"inspector" : cod_inspector};
  $.ajax({
    url: "http://192.168.0.27:8080/inspeccion/servidor/php/json_app_ascensor_valores_maquinas.php",
    data: parametros,
    type: "POST",
    dataType : "JSON",
    success: function(response){
      $.each(response, function(i,item){
        var k_codusuario = item.k_codusuario;
        var k_codinspeccion = item.k_codinspeccion;
        var k_coditem = item.k_coditem;
        var n_calificacion = item.n_calificacion;
        var v_calificacion = item.v_calificacion;
        var o_observacion = item.o_observacion;
        var cantidad_filas = item.cantidad_filas;

        var codigo_inspeccion = k_codinspeccion;
        if (codigo_inspeccion < 10) {
          codigo_inspeccion = "0" + codigo_inspeccion;
        }
        if (codigo_inspeccion < 100) {
          codigo_inspeccion = "0" + codigo_inspeccion;
        }

        db.transaction(function (tx) {
          var query = "SELECT * FROM ascensor_valores_maquinas WHERE k_codusuario = ? AND k_codinspeccion = ?";
          tx.executeSql(query, [k_codusuario,codigo_inspeccion], function (tx, resultSet) {
            if (resultSet.rows.length == 0) {
              addItemsAscensorValoresMaquinas(k_codusuario,codigo_inspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion);
            }else{
              updateItemsAscensorValoresMaquinas(k_codusuario,codigo_inspeccion,k_coditem, n_calificacion,v_calificacion,o_observacion);
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

      });
    }
  });
}

/*=============================================
* Funcion para actualizar una fila en la tabla ascensor_valores_maquinas
*==============================================*/
function updateItemsAscensorValoresMaquinas(k_codusuario,k_codinspeccion,k_coditem, n_calificacion,v_calificacion,o_observacion) {
  db.transaction(function (tx) {
    var query = "UPDATE ascensor_valores_maquinas SET n_calificacion = ?,"+
                                                  "v_calificacion = ?,"+
                                                  "o_observacion = ? "+
                                                  "WHERE k_codusuario = ? "+
                                                  "AND k_codinspeccion = ? "+
                                                  "AND k_coditem = ?";
    tx.executeSql(query, [n_calificacion,v_calificacion,o_observacion,k_codusuario,k_codinspeccion,k_coditem], function(tx, res) {
      console.log("rowsAffected updateItemsAscensorValoresMaquinas: " + res.rowsAffected);
      $('#texto_carga').text("Actualizando datos de maquinas...Espere");
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
* Funcion para insertar datos en la tabla ascensor_valores_maquinas
*==============================================*/
function addItemsAscensorValoresMaquinas(k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) {
  db.transaction(function (tx) {
    var query = "INSERT INTO ascensor_valores_maquinas (k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) VALUES (?,?,?,?,?,?)";
    tx.executeSql(query, [k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion], function(tx, res) {
      console.log("insertId: " + res.insertId + " -- probably 1");
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
      $('#texto_carga').text("Añadiendo datos de maquinas...Espere");
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
* Funcion para llenar la tabla ascensor_valores_pozo, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaAscensorValoresPozo(){
  var cod_inspector = window.localStorage.getItem("codigo_inspector");
  var parametros = {"inspector" : cod_inspector};
  $.ajax({
    url: "http://192.168.0.27:8080/inspeccion/servidor/php/json_app_ascensor_valores_pozo.php",
    data: parametros,
    type: "POST",
    dataType : "JSON",
    success: function(response){
      $.each(response, function(i,item){
        var k_codusuario = item.k_codusuario;
        var k_codinspeccion = item.k_codinspeccion;
        var k_coditem = item.k_coditem;
        var n_calificacion = item.n_calificacion;
        var v_calificacion = item.v_calificacion;
        var o_observacion = item.o_observacion;
        var cantidad_filas = item.cantidad_filas;

        var codigo_inspeccion = k_codinspeccion;
        if (codigo_inspeccion < 10) {
          codigo_inspeccion = "0" + codigo_inspeccion;
        }
        if (codigo_inspeccion < 100) {
          codigo_inspeccion = "0" + codigo_inspeccion;
        }

        db.transaction(function (tx) {
          var query = "SELECT * FROM ascensor_valores_pozo WHERE k_codusuario = ? AND k_codinspeccion = ?";
          tx.executeSql(query, [k_codusuario,codigo_inspeccion], function (tx, resultSet) {
            if (resultSet.rows.length == 0) {
              addItemsAscensorValoresPozo(k_codusuario,codigo_inspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion);
            }else{
              updateItemsAscensorValoresPozo(k_codusuario,codigo_inspeccion,k_coditem, n_calificacion,v_calificacion,o_observacion);
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

      });
    }
  });
}

/*=============================================
* Funcion para actualizar una fila en la tabla ascensor_valores_pozo
*==============================================*/
function updateItemsAscensorValoresPozo(k_codusuario,k_codinspeccion,k_coditem, n_calificacion,v_calificacion,o_observacion) {
  db.transaction(function (tx) {
    var query = "UPDATE ascensor_valores_pozo SET n_calificacion = ?,"+
                                                  "v_calificacion = ?,"+
                                                  "o_observacion = ? "+
                                                  "WHERE k_codusuario = ? "+
                                                  "AND k_codinspeccion = ? "+
                                                  "AND k_coditem = ?";
    tx.executeSql(query, [n_calificacion,v_calificacion,o_observacion,k_codusuario,k_codinspeccion,k_coditem], function(tx, res) {
      console.log("rowsAffected updateItemsAscensorValoresPozo: " + res.rowsAffected);
      $('#texto_carga').text("Finalizando...Espere");
      setTimeout('cerrar_Ventana_Carga()',20000);
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
* Funcion para insertar datos en la tabla ascensor_valores_pozo
*==============================================*/
function addItemsAscensorValoresPozo(k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) {
  db.transaction(function (tx) {
    var query = "INSERT INTO ascensor_valores_pozo (k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) VALUES (?,?,?,?,?,?)";
    tx.executeSql(query, [k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion], function(tx, res) {
      console.log("insertId: " + res.insertId + " -- probably 1");
      console.log("rowsAffected addItemsAscensorValoresPozo: " + res.rowsAffected + " -- should be 1");
      $('#texto_carga').text("Finalizando...Espere");
      setTimeout('cerrar_Ventana_Carga()',20000);
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
* Funcion para llenar la tabla ascensor_valores_preliminar, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaAscensorValoresPreliminar(){
  var cod_inspector = window.localStorage.getItem("codigo_inspector");
  var parametros = {"inspector" : cod_inspector};
  $.ajax({
    url: "http://192.168.0.27:8080/inspeccion/servidor/php/json_app_ascensor_valores_preliminar.php",
    data: parametros,
    type: "POST",
    dataType : "JSON",
    success: function(response){
      $.each(response, function(i,item){
        var k_codusuario = item.k_codusuario;
        var k_codinspeccion = item.k_codinspeccion;
        var k_coditem_preli = item.k_coditem_preli;
        var v_calificacion = item.v_calificacion;
        var o_observacion = item.o_observacion;

        var codigo_inspeccion = k_codinspeccion;
        if (codigo_inspeccion < 10) {
          codigo_inspeccion = "0" + codigo_inspeccion;
        }
        if (codigo_inspeccion < 100) {
          codigo_inspeccion = "0" + codigo_inspeccion;
        }

        db.transaction(function (tx) {
          var query = "SELECT * FROM ascensor_valores_preliminar WHERE k_codusuario = ? AND k_codinspeccion = ?";
          tx.executeSql(query, [k_codusuario,codigo_inspeccion], function (tx, resultSet) {
            if (resultSet.rows.length == 0) {
              addItemsAscensorValoresPreliminar(k_codusuario,codigo_inspeccion,k_coditem_preli,v_calificacion,o_observacion);
            }else{
              updateItemsAscensorValoresPreliminar(k_codusuario,codigo_inspeccion,k_coditem_preli,v_calificacion,o_observacion);
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

      });
    }
  });
}

/*=============================================
* Funcion para actualizar una fila en la tabla ascensor_valores_preliminar
*==============================================*/
function updateItemsAscensorValoresPreliminar(k_codusuario,k_codinspeccion,k_coditem,v_calificacion,o_observacion) {
  db.transaction(function (tx) {
    var query = "UPDATE ascensor_valores_preliminar SET v_calificacion = ?,"+
                                                      "o_observacion = ? "+
                                                      "WHERE k_codusuario = ? "+
                                                      "AND k_codinspeccion = ? "+
                                                      "AND k_coditem_preli = ?";
    tx.executeSql(query, [v_calificacion,o_observacion,k_codusuario,k_codinspeccion,k_coditem], function(tx, res) {
      console.log("rowsAffected updateItemsAscensorValoresPreliminar: " + res.rowsAffected);
      $('#texto_carga').text("Actualizando datos preliminares...Espere");
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
* Funcion para insertar datos en la tabla ascensor_valores_preliminar
*==============================================*/
function addItemsAscensorValoresPreliminar(k_codusuario,k_codinspeccion,k_coditem_preli,v_calificacion,o_observacion) {
  db.transaction(function (tx) {
    var query = "INSERT INTO ascensor_valores_preliminar (k_codusuario,k_codinspeccion,k_coditem_preli,v_calificacion,o_observacion) VALUES (?,?,?,?,?)";
    tx.executeSql(query, [k_codusuario,k_codinspeccion,k_coditem_preli,v_calificacion,o_observacion], function(tx, res) {
      console.log("insertId: " + res.insertId + " -- probably 1");
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
      $('#texto_carga').text("Añadiendo datos preliminares...Espere");
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
* Funcion para llenar la tabla ascensor_valores_proteccion, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaAscensorValoresProteccion(){
  var cod_inspector = window.localStorage.getItem("codigo_inspector");
  var parametros = {"inspector" : cod_inspector};
  $.ajax({
    url: "http://192.168.0.27:8080/inspeccion/servidor/php/json_app_ascensor_valores_proteccion.php",
    data: parametros,
    type: "POST",
    dataType : "JSON",
    success: function(response){
      $.each(response, function(i,item){
        var k_codusuario = item.k_codusuario;
        var k_codinspeccion = item.k_codinspeccion;
        var k_coditem = item.k_coditem;
        var v_sele_inspector = item.v_sele_inspector;
        var v_sele_empresa = item.v_sele_empresa;
        var o_observacion = item.o_observacion;

        var codigo_inspeccion = k_codinspeccion;
        if (codigo_inspeccion < 10) {
          codigo_inspeccion = "0" + codigo_inspeccion;
        }
        if (codigo_inspeccion < 100) {
          codigo_inspeccion = "0" + codigo_inspeccion;
        }

        db.transaction(function (tx) {
          var query = "SELECT * FROM ascensor_valores_proteccion WHERE k_codusuario = ? AND k_codinspeccion = ?";
          tx.executeSql(query, [k_codusuario,codigo_inspeccion], function (tx, resultSet) {
            if (resultSet.rows.length == 0) {
              addItemsAscensorValoresProteccion(k_codusuario,codigo_inspeccion,k_coditem,v_sele_inspector,v_sele_empresa,o_observacion);
            }else{
              updateItemsAscensorValoresProteccion(k_codusuario,codigo_inspeccion,k_coditem,v_sele_inspector,v_sele_empresa,o_observacion);
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

      });
    }
  });
}

/*=============================================
* Funcion para actualizar una fila en la tabla ascensor_valores_proteccion
*==============================================*/
function updateItemsAscensorValoresProteccion(k_codusuario,k_codinspeccion,k_coditem,v_sele_inspector,v_sele_empresa,o_observacion) {
  db.transaction(function (tx) {
    var query = "UPDATE ascensor_valores_proteccion SET v_sele_inspector = ?,"+
                                                        "v_sele_empresa = ?,"+
                                                        "o_observacion = ? "+
                                                        "WHERE k_codusuario = ? "+
                                                        "AND k_codinspeccion = ? "+
                                                        "AND k_coditem = ?";                                         
    tx.executeSql(query, [v_sele_inspector,v_sele_empresa,o_observacion,k_codusuario,k_codinspeccion,k_coditem], function(tx, res) {
      console.log("rowsAffected updateItemsAscensorValoresProteccion: " + res.rowsAffected);
      $('#texto_carga').text("Actualizando datos de protección...Espere");
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
* Funcion para insertar datos en la tabla ascensor_valores_proteccion
*==============================================*/
function addItemsAscensorValoresProteccion(k_codusuario,k_codinspeccion,k_coditem,v_sele_inspector,v_sele_empresa,o_observacion) {
  db.transaction(function (tx) {
    var query = "INSERT INTO ascensor_valores_proteccion (k_codusuario,k_codinspeccion,k_coditem,v_sele_inspector,v_sele_empresa,o_observacion) VALUES (?,?,?,?,?,?)";
    tx.executeSql(query, [k_codusuario,k_codinspeccion,k_coditem,v_sele_inspector,v_sele_empresa,o_observacion], function(tx, res) {
      console.log("insertId: " + res.insertId + " -- probably 1");
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
      $('#texto_carga').text("Añadiendo datos de protección...Espere");
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
* Funcion para llenar la tabla auditoria_inspecciones_ascensores, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaAscensorValoresAuditoriaAscensores(){
  var cod_inspector = window.localStorage.getItem("codigo_inspector");
  var parametros = {"inspector" : cod_inspector};
  $.ajax({
    url: "http://192.168.0.27:8080/inspeccion/servidor/php/json_app_ascensor_valores_auditoria_ascensores.php",
    data: parametros,
    type: "POST",
    dataType : "JSON",
    success: function(response){
      $.each(response, function(i,item){
        var k_codusuario = item.k_codusuario;
        var k_codinspeccion = item.k_codinspeccion;
        var o_consecutivoinsp = item.o_consecutivoinsp;
        var o_estado_envio = item.o_estado_envio;
        var o_revision = item.o_revision;
        var v_item_nocumple = item.v_item_nocumple;
        var k_codcliente = item.k_codcliente;
        var k_codinforme = item.k_codinforme;
        var k_codusuario_modifica = item.k_codusuario_modifica;

        var codigo_inspeccion = k_codinspeccion;
        if (codigo_inspeccion < 10) {
          codigo_inspeccion = "0" + codigo_inspeccion;
        }
        if (codigo_inspeccion < 100) {
          codigo_inspeccion = "0" + codigo_inspeccion;
        }

        db.transaction(function (tx) {
          var query = "SELECT * FROM auditoria_inspecciones_ascensores WHERE k_codusuario = ? AND k_codinspeccion = ?";
          tx.executeSql(query, [k_codusuario,codigo_inspeccion], function (tx, resultSet) {
            if (resultSet.rows.length == 0) {
              //alert("agregar -> "+resultSet.rows.length);
              addItemsAscensorValoresAuditoriaAscensores(k_codusuario,codigo_inspeccion,o_consecutivoinsp,o_estado_envio,o_revision,v_item_nocumple,k_codcliente,k_codinforme,k_codusuario_modifica);
            }else{
              //alert("actualizar -> "+resultSet.rows.length);
              updateItemsAuditoriaInspeccionesAscensores(k_codusuario,codigo_inspeccion,o_consecutivoinsp,o_estado_envio,o_revision,v_item_nocumple,k_codcliente,k_codinforme,k_codusuario_modifica);
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

      });
    }
  });
}

/*=============================================
* Funcion para actualizar una fila en la tabla auditoria_inspecciones_ascensores
*==============================================*/
function updateItemsAuditoriaInspeccionesAscensores(k_codusuario,k_codinspeccion,o_consecutivoinsp,o_estado_envio,o_revision,v_item_nocumple,k_codcliente,k_codinforme,k_codusuario_modifica) {
  db.transaction(function (tx) {
    var query = "UPDATE auditoria_inspecciones_ascensores SET o_consecutivoinsp = ?,"+
                                                              "o_estado_envio = ?,"+
                                                              "o_revision = ?,"+
                                                              "v_item_nocumple = ?,"+
                                                              "k_codcliente = ?,"+
                                                              "k_codinforme = ?,"+
                                                              "k_codusuario_modifica = ? "+
                                                              "WHERE k_codusuario = ? "+
                                                              "AND k_codinspeccion = ?";
    tx.executeSql(query, [o_consecutivoinsp,o_estado_envio,o_revision,v_item_nocumple,k_codcliente,k_codinforme,k_codusuario_modifica,k_codusuario,k_codinspeccion], function(tx, res) {
      console.log("rowsAffected updateItemsAuditoriaInspeccionesAscensores: " + res.rowsAffected);
      $('#texto_carga').text("Actualizando datos de auditoria...Espere");
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
* Funcion para insertar datos en la tabla auditoria_inspecciones_ascensores
*==============================================*/
function addItemsAscensorValoresAuditoriaAscensores(k_codusuario,k_codinspeccion,o_consecutivoinsp,o_estado_envio,o_revision,v_item_nocumple,k_codcliente,k_codinforme,k_codusuario_modifica) {
  db.transaction(function (tx) {
    var query = "INSERT INTO auditoria_inspecciones_ascensores (k_codusuario,k_codinspeccion,o_consecutivoinsp,o_estado_envio,o_revision,v_item_nocumple,k_codcliente,k_codinforme,k_codusuario_modifica) VALUES (?,?,?,?,?,?,?,?,?)";
    tx.executeSql(query, [k_codusuario,k_codinspeccion,o_consecutivoinsp,o_estado_envio,o_revision,v_item_nocumple,k_codcliente,k_codinforme,k_codusuario_modifica], function(tx, res) {
      console.log("insertId: " + res.insertId + " -- probably 1");
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
      $('#texto_carga').text("Añadiendo datos de auditoria...Espere");
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
* Funcion para llenar la tabla cliente, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaAscensorValoresCliente(){
  var cod_inspector = window.localStorage.getItem("codigo_inspector");
  var parametros = {"inspector" : cod_inspector};
  $.ajax({
    url: "http://192.168.0.27:8080/inspeccion/servidor/php/json_app_ascensor_valores_cliente.php",
    data: parametros,
    type: "POST",
    dataType : "JSON",
    success: function(response){
      $.each(response, function(i,item){
        var k_codcliente = item.k_codcliente;
        var v_consecutivocliente = item.v_consecutivocliente;
        var k_codusuario = item.k_codusuario;
        var n_cliente = item.n_cliente;
        var n_contacto = item.n_contacto;
        var v_nit = item.v_nit;
        var o_direccion = item.o_direccion;
        var o_telefono = item.o_telefono;
        var o_correo = item.o_correo;

        db.transaction(function (tx) {
          var query = "SELECT * FROM cliente WHERE k_codusuario = ? AND k_codcliente = ?";
          tx.executeSql(query, [k_codusuario,k_codcliente], function (tx, resultSet) {
            if (resultSet.rows.length == 0) {
              addItemsAscensorValoresCliente(k_codcliente,v_consecutivocliente,k_codusuario,n_cliente,n_contacto,v_nit,o_direccion,o_telefono,o_correo);
            }else{
              updateItemsCliente(k_codcliente,v_consecutivocliente,k_codusuario,n_cliente,n_contacto,v_nit,o_direccion,o_telefono,o_correo);
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

      });
    }
  });
}

/*=============================================
* Funcion para actualizar una fila en la tabla cliente
*==============================================*/
function updateItemsCliente(k_codcliente,v_consecutivocliente,k_codusuario,n_cliente,n_contacto,v_nit,o_direccion,o_telefono,o_correo) {
  db.transaction(function (tx) {
    var query = "UPDATE cliente SET v_consecutivocliente = ?,"+
                                  "n_cliente = ?,"+
                                  "n_contacto = ?,"+
                                  "v_nit = ?,"+
                                  "o_direccion = ?,"+
                                  "o_telefono = ?,"+
                                  "o_correo = ? "+
                                  "WHERE k_codusuario = ? "+
                                  "AND k_codcliente = ?";
    tx.executeSql(query, [v_consecutivocliente,n_cliente,n_contacto,v_nit,o_direccion,o_telefono,o_correo,k_codusuario,k_codcliente], function(tx, res) {
      console.log("rowsAffected cliente: " + res.rowsAffected);
      $('#texto_carga').text("Actualizando datos de cliente...Espere");
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
* Funcion para insertar datos en la tabla cliente
*==============================================*/
function addItemsAscensorValoresCliente(k_codcliente,v_consecutivocliente,k_codusuario,n_cliente,n_contacto,v_nit,o_direccion,o_telefono,o_correo) {
  db.transaction(function (tx) {
    var query = "INSERT INTO cliente (k_codcliente,v_consecutivocliente,k_codusuario,n_cliente,n_contacto,v_nit,o_direccion,o_telefono,o_correo) VALUES (?,?,?,?,?,?,?,?,?)";
    tx.executeSql(query, [k_codcliente,v_consecutivocliente,k_codusuario,n_cliente,n_contacto,v_nit,o_direccion,o_telefono,o_correo], function(tx, res) {
      console.log("insertId: " + res.insertId + " -- probably 1");
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
      $('#texto_carga').text("Añadiendo datos de cliente...Espere");
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
* Funcion para llenar la tabla informe, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaAscensorValoresInforme(){
  var cod_inspector = window.localStorage.getItem("codigo_inspector");
  var parametros = {"inspector" : cod_inspector};
  $.ajax({
    url: "http://192.168.0.27:8080/inspeccion/servidor/php/json_app_ascensor_valores_informe.php",
    data: parametros,
    type: "POST",
    dataType : "JSON",
    success: function(response){
      if (response == "") {
        alert("No hay inspecciones a ser cargadas!");
        location.reload();
      }else{
        location.href = "#arriba";
        $.each(response, function(i,item){
          var k_codinforme = item.k_codinforme;
          var v_consecutivoinforme = item.v_consecutivoinforme;
          var k_codusuario = item.k_codusuario;
          var f_informe = item.f_informe;

          db.transaction(function (tx) {
            var query = "SELECT * FROM informe WHERE k_codusuario = ? AND k_codinforme = ?";
            tx.executeSql(query, [k_codusuario,k_codinforme], function (tx, resultSet) {
              if (resultSet.rows.length == 0) {
                abrir_Ventana_Carga();
                addItemsAscensorValoresInforme(k_codinforme,v_consecutivoinforme,k_codusuario,f_informe);
              }else{
                abrir_Ventana_Carga();
                updateItemsInforme(k_codinforme,v_consecutivoinforme,k_codusuario,f_informe);
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
        });
      }
    }
  });
}

/*=============================================
* Funcion para actualizar una fila en la tabla informe
*==============================================*/
function updateItemsInforme(k_codinforme,v_consecutivoinforme,k_codusuario,f_informe) {
  db.transaction(function (tx) {
    var query = "UPDATE informe SET v_consecutivoinforme = ?,"+
                                  "f_informe = ? "+
                                  "WHERE k_codusuario = ? "+
                                  "AND k_codinforme = ?";
    tx.executeSql(query, [v_consecutivoinforme,f_informe,k_codusuario,k_codinforme], function(tx, res) {
      console.log("rowsAffected informe: " + res.rowsAffected);
      $('#texto_carga').text("Actualizando datos de informes...Espere");
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
* Funcion para insertar datos en la tabla informe
*==============================================*/
function addItemsAscensorValoresInforme(k_codinforme,v_consecutivoinforme,k_codusuario,f_informe) {
  db.transaction(function (tx) {
    var query = "INSERT INTO informe (k_codinforme,v_consecutivoinforme,k_codusuario,f_informe) VALUES (?,?,?,?)";
    tx.executeSql(query, [k_codinforme,v_consecutivoinforme,k_codusuario,f_informe], function(tx, res) {
      console.log("insertId: " + res.insertId + " -- probably 1");
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
      $('#texto_carga').text("Añadiendo datos de informes...Espere");
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

/* /////////////////// VERIFICAR CONEXION A INTERNET ////////////////////////// */

function probar_conexion_internet(){
  /*--- primero probamos la conexion a la red 
  se crea un campo donde se carga una imagen, si esta carga hay conexion ---*/
  var tabla = $('#dataTable').attr("id");
  addFila(tabla);
}

function addFila(tableID) { 
  /*----Se toma el valor del control [tableID], 
        donde queremos que aparezcan los controles 
        creados dinamicamente ------------*/
  var table = document.getElementById(tableID);
  var rowCount = table.rows.length;
  var row = table.insertRow(rowCount);

  /* ---------- Se crea el campo oculto donde se carga la imagen ------------ */

  var cell1 = row.insertCell(0);
  cell1.innerHTML =  '<img src="http://static.forosdelweb.com/fdwtheme/logo-navidad.png?'+Math.random()+
  '" style="display:none" onload="valor_conexion_internet(1)" onerror="valor_conexion_internet(0)" />';
}

/*=============================================
* Si tenemos conexion a internet muestra un mensaje de carga y prosigue a crear y llenar las tablas
*==============================================*/
function valor_conexion_internet(conexion) {
  if (conexion==1) {
    //alert("Hay conexion conexión a internet!");
    llenarTablaAscensorValoresInforme();
    llenarTablaAscensorValoresAuditoriaAscensores(); //Se abre la ventana de carga
    llenarTablaAscensorValoresCliente();
    llenarTablaAscensorValoresPreliminar();
    llenarTablaAscensorValoresElementos();
    llenarTablaAscensorValoresProteccion();
    llenarTablaAscensorValoresCabina();
    llenarTablaAscensorValoresFinales();
    llenarTablaAscensorValoresFoso();
    llenarTablaAscensorValoresIniciales();
    llenarTablaAscensorValoresMaquinas();
    llenarTablaAscensorValoresPozo(); //Se cierra la ventana de carga
  } else {
    alert("No tiene conexión a internet!");
    location.href="./index.html";
  }
}