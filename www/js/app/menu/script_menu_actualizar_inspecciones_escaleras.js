$(document).ready(function($){
  actualizar_inspecciones_escaleras();
});

function actualizar_inspecciones_escaleras(){
  comprobarCambiosBD_escaleras();
}

/*=============================================
* Crear base de datos / Hacer conexion si ya esta creada
* parametros:
* var dbShell = window.openDatabase(database_name, database_version, database_displayname, database_size);
*==============================================*/
var db = window.openDatabase("montajes_inspeccion_mp", "1.0", "Inspeccion_MP", 1000000);

/*=============================================
* Funcion que permite abrir la ventana de carga
*==============================================*/
function abrir_Ventana_Carga(){
  $('#texto_carga').text("Obteniendo datos de inspecciones...Espere");
  $('.fbback').show();
  $('.fb').show();
  $('.fbdrag1').show();
  $('body').css('overflow','hidden');
}

/*=============================================
* Funcion que permite cerrar la ventana que aparece mientras se cargan las tablas
*==============================================*/
function cerrar_Ventana_Carga(){
  $('.fbback').hide();
  $('.fbdrag1').hide();
  $('.fb').hide();
  $('body').css('overflow','auto');
}

/*=============================================
* Funcion para llenar la tabla escaleras_valores_elementos, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaEscalerasValoresElementos(){
  var cod_inspector = window.localStorage.getItem("codigo_inspector");
  var parametros = {"inspector" : cod_inspector};
  $.ajax({
    async:  true,
    url: "http://192.168.0.26:8888/inspeccion/servidor/php/json_app_escaleras_valores_elementos.php",
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
          var query = "SELECT * FROM escaleras_valores_elementos WHERE k_codusuario = ? AND k_codinspeccion = ?";
          tx.executeSql(query, [k_codusuario,codigo_inspeccion], function (tx, resultSet) {
            if (resultSet.rows.length == 0) {
              addItemsEscalerasValoresElementos(k_codusuario,codigo_inspeccion,k_coditem,o_descripcion,v_seleccion);
            }else{
              updateItemsEscalerasValoresElementos(k_codusuario,codigo_inspeccion,k_coditem, o_descripcion,v_seleccion);
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
* Funcion para actualizar una fila en la tabla escaleras_valores_elementos
*==============================================*/
function updateItemsEscalerasValoresElementos(k_codusuario,k_codinspeccion,k_coditem, o_descripcion,v_seleccion) {
  db.transaction(function (tx) {
    var query = "UPDATE escaleras_valores_elementos SET o_descripcion = ?,"+
                                                        "v_selecion = ? "+
                                                        "WHERE k_codusuario = ? "+
                                                        "AND k_codinspeccion = ? "+
                                                        "AND k_coditem = ?";                                       
    tx.executeSql(query, [o_descripcion,v_seleccion,k_codusuario,k_codinspeccion,k_coditem], function(tx, res) {
      console.log("rowsAffected updateItemsEscalerasValoresElementos: " + res.rowsAffected);
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
* Funcion para insertar datos en la tabla escaleras_valores_elementos
*==============================================*/
function addItemsEscalerasValoresElementos(k_codusuario,k_codinspeccion,k_coditem,o_descripcion,v_seleccion) {
  db.transaction(function (tx) {
    var query = "INSERT INTO escaleras_valores_elementos (k_codusuario,k_codinspeccion,k_coditem,o_descripcion,v_selecion) VALUES (?,?,?,?,?)";
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
* Funcion para llenar la tabla escaleras_valores_finales, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaEscalerasValoresFinales(){
  var cod_inspector = window.localStorage.getItem("codigo_inspector");
  var parametros = {"inspector" : cod_inspector};
  $.ajax({
    async:  true,
    url: "http://192.168.0.26:8888/inspeccion/servidor/php/json_app_escaleras_valores_finales.php",
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
          var query = "SELECT * FROM escaleras_valores_finales WHERE k_codusuario = ? AND k_codinspeccion = ?";
          tx.executeSql(query, [k_codusuario,codigo_inspeccion], function (tx, resultSet) {
            if (resultSet.rows.length == 0) {
              addItemsEscalerasValoresFinales(k_codusuario,codigo_inspeccion,o_observacion);  
            }else{
              updateItemsEscalerasValoresFinales(k_codusuario,codigo_inspeccion,o_observacion);
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
* Funcion para actualizar una fila en la tabla escaleras_valores_finales
*==============================================*/
function updateItemsEscalerasValoresFinales(k_codusuario,k_codinspeccion,o_observacion) {
  db.transaction(function (tx) {
    var query = "UPDATE escaleras_valores_finales SET o_observacion = ?"+
                                                     "WHERE k_codusuario = ? "+
                                                     "AND k_codinspeccion = ?";                                       
    tx.executeSql(query, [o_observacion,k_codusuario,k_codinspeccion], function(tx, res) {
      console.log("rowsAffected updateItemsEscalerasValoresFinales: " + res.rowsAffected);
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
* Funcion para insertar datos en la tabla escaleras_valores_finales
*==============================================*/
function addItemsEscalerasValoresFinales(k_codusuario,k_codinspeccion,o_observacion) {
  db.transaction(function (tx) {
    var query = "INSERT INTO escaleras_valores_finales (k_codusuario,k_codinspeccion,o_observacion) VALUES (?,?,?)";
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
* Funcion para llenar la tabla escaleras_valores_iniciales, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaEscalerasValoresIniciales(){
  var cod_inspector = window.localStorage.getItem("codigo_inspector");
  var parametros = {"inspector" : cod_inspector};
  $.ajax({
    async:  true,
    url: "http://192.168.0.26:8888/inspeccion/servidor/php/json_app_escaleras_valores_iniciales.php",
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
        var v_velocidad = item.v_velocidad;
        var o_tipo_equipo = item.o_tipo_equipo;
        var v_inclinacion = item.v_inclinacion;
        var f_fecha = item.f_fecha;
        var v_ancho_paso = item.v_ancho_paso;
        var v_codigo = item.v_codigo;
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
          var query = "SELECT * FROM escaleras_valores_iniciales WHERE k_codusuario = ? AND k_codinspeccion = ?";
          tx.executeSql(query, [k_codusuario,codigo_inspeccion], function (tx, resultSet) {
            //alert(resultSet.rows.length);
            if (resultSet.rows.length == 0) {
              addItemsEscalerasValoresIniciales(k_codusuario,k_codinspeccion,n_cliente,n_equipo,n_empresamto,v_velocidad,o_tipo_equipo,v_inclinacion,v_ancho_paso,f_fecha,ultimo_mto,inicio_servicio,ultima_inspeccion,v_codigo,o_consecutivoinsp,h_hora,o_tipo_informe);
            }else{
              updateItemsEscalerasValoresIniciales(n_cliente,n_equipo,n_empresamto,v_velocidad,o_tipo_equipo,v_inclinacion,v_ancho_paso,f_fecha,ultimo_mto,inicio_servicio,ultima_inspeccion,v_codigo,o_consecutivoinsp,h_hora,o_tipo_informe, k_codusuario,codigo_inspeccion);
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
* Funcion para actualizar una fila en la tabla escaleras_valores_iniciales
*==============================================*/
function updateItemsEscalerasValoresIniciales(n_cliente,n_equipo,n_empresamto,v_velocidad,o_tipo_equipo,v_inclinacion,v_ancho_paso,f_fecha,ultimo_mto,inicio_servicio,ultima_inspeccion,v_codigo,o_consecutivoinsp,h_hora,o_tipo_informe, k_codusuario,k_codinspeccion) {
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
    tx.executeSql(query, [n_cliente,n_equipo,n_empresamto,v_velocidad,o_tipo_equipo,v_inclinacion,v_ancho_paso,f_fecha,ultimo_mto,inicio_servicio,ultima_inspeccion,v_codigo,o_consecutivoinsp,h_hora,o_tipo_informe, k_codusuario,k_codinspeccion], function(tx, res) {
      console.log("rowsAffected updateItemsescalerasValoresIniciales: " + res.rowsAffected);
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
* Funcion para insertar datos en la tabla escaleras_valores_iniciales
*==============================================*/
function addItemsEscalerasValoresIniciales(k_codusuario,k_codinspeccion,n_cliente,n_equipo,n_empresamto,v_velocidad,o_tipo_equipo,v_inclinacion,v_ancho_paso,f_fecha,ultimo_mto,inicio_servicio,ultima_inspeccion,v_codigo,o_consecutivoinsp,h_hora,o_tipo_informe) {
  db.transaction(function (tx) {
    var query = "INSERT INTO escaleras_valores_iniciales (k_codusuario,k_codinspeccion,n_cliente,n_equipo,n_empresamto,v_velocidad,o_tipo_equipo,v_inclinacion,v_ancho_paso,f_fecha,ultimo_mto,inicio_servicio,ultima_inspeccion,v_codigo,o_consecutivoinsp,h_hora,o_tipo_informe) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    tx.executeSql(query, [k_codusuario,k_codinspeccion,n_cliente,n_equipo,n_empresamto,v_velocidad,o_tipo_equipo,v_inclinacion,v_ancho_paso,f_fecha,ultimo_mto,inicio_servicio,ultima_inspeccion,v_codigo,o_consecutivoinsp,h_hora,o_tipo_informe], function(tx, res) {
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
* Funcion para llenar la tabla escaleras_valores_defectos, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaEscalerasValoresDefectos(){
  var cod_inspector = window.localStorage.getItem("codigo_inspector");
  var parametros = {"inspector" : cod_inspector};
  $.ajax({
    async:  true,
    url: "http://192.168.0.26:8888/inspeccion/servidor/php/json_app_escaleras_valores_defectos.php",
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
          var query = "SELECT * FROM escaleras_valores_defectos WHERE k_codusuario = ? AND k_codinspeccion = ?";
          tx.executeSql(query, [k_codusuario,codigo_inspeccion], function (tx, resultSet) {
            if (resultSet.rows.length == 0) {
              addItemsEscalerasValoresDefectos(k_codusuario,codigo_inspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion);
            }else{
              updateItemsEscalerasValoresDefectos(k_codusuario,codigo_inspeccion,k_coditem, n_calificacion,v_calificacion,o_observacion);
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
* Funcion para actualizar una fila en la tabla escaleras_valores_defectos
*==============================================*/
function updateItemsEscalerasValoresDefectos(k_codusuario,k_codinspeccion,k_coditem, n_calificacion,v_calificacion,o_observacion) {
  db.transaction(function (tx) {
    var query = "UPDATE escaleras_valores_defectos SET n_calificacion = ?,"+
                                                  "v_calificacion = ?,"+
                                                  "o_observacion = ? "+
                                                  "WHERE k_codusuario = ? "+
                                                  "AND k_codinspeccion = ? "+
                                                  "AND k_coditem = ?";
    tx.executeSql(query, [n_calificacion,v_calificacion,o_observacion,k_codusuario,k_codinspeccion,k_coditem], function(tx, res) {
      console.log("rowsAffected updateItemsEscalerasValoresDefectos: " + res.rowsAffected);
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
* Funcion para insertar datos en la tabla escaleras_valores_defectos
*==============================================*/
function addItemsEscalerasValoresDefectos(k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) {
  db.transaction(function (tx) {
    var query = "INSERT INTO escaleras_valores_defectos (k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion) VALUES (?,?,?,?,?,?)";
    tx.executeSql(query, [k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion], function(tx, res) {
      console.log("insertId: " + res.insertId + " -- probably 1");
      console.log("rowsAffected addItemsEscalerasValoresDefectos: " + res.rowsAffected + " -- should be 1");
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
* Funcion para llenar la tabla escaleras_valores_preliminar, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaEscalerasValoresPreliminar(){
  var cod_inspector = window.localStorage.getItem("codigo_inspector");
  var parametros = {"inspector" : cod_inspector};
  $.ajax({
    async:  true,
    url: "http://192.168.0.26:8888/inspeccion/servidor/php/json_app_escaleras_valores_preliminar.php",
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
          var query = "SELECT * FROM escaleras_valores_preliminar WHERE k_codusuario = ? AND k_codinspeccion = ?";
          tx.executeSql(query, [k_codusuario,codigo_inspeccion], function (tx, resultSet) {
            if (resultSet.rows.length == 0) {
              addItemsEscalerasValoresPreliminar(k_codusuario,codigo_inspeccion,k_coditem_preli,v_calificacion,o_observacion);
            }else{
              updateItemsEscalerasValoresPreliminar(k_codusuario,codigo_inspeccion,k_coditem_preli,v_calificacion,o_observacion);
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
* Funcion para actualizar una fila en la tabla escaleras_valores_preliminar
*==============================================*/
function updateItemsEscalerasValoresPreliminar(k_codusuario,k_codinspeccion,k_coditem,v_calificacion,o_observacion) {
  db.transaction(function (tx) {
    var query = "UPDATE escaleras_valores_preliminar SET v_calificacion = ?,"+
                                                      "o_observacion = ? "+
                                                      "WHERE k_codusuario = ? "+
                                                      "AND k_codinspeccion = ? "+
                                                      "AND k_coditem_preli = ?";
    tx.executeSql(query, [v_calificacion,o_observacion,k_codusuario,k_codinspeccion,k_coditem], function(tx, res) {
      console.log("rowsAffected updateItemsescalerasValoresPreliminar: " + res.rowsAffected);
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
* Funcion para insertar datos en la tabla escaleras_valores_preliminar
*==============================================*/
function addItemsEscalerasValoresPreliminar(k_codusuario,k_codinspeccion,k_coditem_preli,v_calificacion,o_observacion) {
  db.transaction(function (tx) {
    var query = "INSERT INTO escaleras_valores_preliminar (k_codusuario,k_codinspeccion,k_coditem_preli,v_calificacion,o_observacion) VALUES (?,?,?,?,?)";
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
* Funcion para llenar la tabla escaleras_valores_proteccion, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaEscalerasValoresProteccion(){
  var cod_inspector = window.localStorage.getItem("codigo_inspector");
  var parametros = {"inspector" : cod_inspector};
  $.ajax({
    async:  true,
    url: "http://192.168.0.26:8888/inspeccion/servidor/php/json_app_escaleras_valores_proteccion.php",
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
          var query = "SELECT * FROM escaleras_valores_proteccion WHERE k_codusuario = ? AND k_codinspeccion = ?";
          tx.executeSql(query, [k_codusuario,codigo_inspeccion], function (tx, resultSet) {
            if (resultSet.rows.length == 0) {
              addItemsEscalerasValoresProteccion(k_codusuario,codigo_inspeccion,k_coditem,v_sele_inspector,v_sele_empresa,o_observacion);
            }else{
              updateItemsEscalerasValoresProteccion(k_codusuario,codigo_inspeccion,k_coditem,v_sele_inspector,v_sele_empresa,o_observacion);
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
* Funcion para actualizar una fila en la tabla escaleras_valores_proteccion
*==============================================*/
function updateItemsEscalerasValoresProteccion(k_codusuario,k_codinspeccion,k_coditem,v_sele_inspector,v_sele_empresa,o_observacion) {
  db.transaction(function (tx) {
    var query = "UPDATE escaleras_valores_proteccion SET v_sele_inspector = ?,"+
                                                        "v_sele_empresa = ?,"+
                                                        "o_observacion = ? "+
                                                        "WHERE k_codusuario = ? "+
                                                        "AND k_codinspeccion = ? "+
                                                        "AND k_coditem = ?";                                         
    tx.executeSql(query, [v_sele_inspector,v_sele_empresa,o_observacion,k_codusuario,k_codinspeccion,k_coditem], function(tx, res) {
      console.log("rowsAffected updateItemsEscalerasValoresProteccion: " + res.rowsAffected);
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
* Funcion para insertar datos en la tabla escaleras_valores_proteccion
*==============================================*/
function addItemsEscalerasValoresProteccion(k_codusuario,k_codinspeccion,k_coditem,v_sele_inspector,v_sele_empresa,o_observacion) {
  db.transaction(function (tx) {
    var query = "INSERT INTO escaleras_valores_proteccion (k_codusuario,k_codinspeccion,k_coditem,v_sele_inspector,v_sele_empresa,o_observacion) VALUES (?,?,?,?,?,?)";
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
* Funcion para llenar la tabla auditoria_inspecciones_escaleras, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaEscalerasValoresAuditoriaEscaleras(){
  var cod_inspector = window.localStorage.getItem("codigo_inspector");
  var parametros = {"inspector" : cod_inspector};
  $.ajax({
    async:  true,
    url: "http://192.168.0.26:8888/inspeccion/servidor/php/json_app_escaleras_valores_auditoria_escaleras.php",
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
        var o_actualizar_inspeccion = item.o_actualizar_inspeccion;

        var codigo_inspeccion = k_codinspeccion;
        if (codigo_inspeccion < 10) {
          codigo_inspeccion = "0" + codigo_inspeccion;
        }
        if (codigo_inspeccion < 100) {
          codigo_inspeccion = "0" + codigo_inspeccion;
        }

        db.transaction(function (tx) {
          var query = "SELECT * FROM auditoria_inspecciones_escaleras WHERE k_codusuario = ? AND k_codinspeccion = ?";
          tx.executeSql(query, [k_codusuario,codigo_inspeccion], function (tx, resultSet) {
            if (resultSet.rows.length == 0) {
              //alert("agregar -> "+resultSet.rows.length);
              addItemsEscalerasValoresAuditoriaEscaleras(k_codusuario,codigo_inspeccion,o_consecutivoinsp,o_estado_envio,o_revision,v_item_nocumple,k_codcliente,k_codinforme,k_codusuario_modifica,o_actualizar_inspeccion);
            }else{
              //alert("actualizar -> "+resultSet.rows.length);
              /* Se actualizan la tabla de auditoria del servidor */
              actualizarTablaAuditoriaEscalerasServidor(k_codusuario,k_codinspeccion);
              updateItemsAuditoriaInspeccionesEscaleras(k_codusuario,codigo_inspeccion,o_consecutivoinsp,o_estado_envio,o_revision,v_item_nocumple,k_codcliente,k_codinforme,k_codusuario_modifica,o_actualizar_inspeccion);
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
* Funcion para actualizar una fila en la tabla auditoria_inspecciones_escaleras
*==============================================*/
function updateItemsAuditoriaInspeccionesEscaleras(k_codusuario,k_codinspeccion,o_consecutivoinsp,o_estado_envio,o_revision,v_item_nocumple,k_codcliente,k_codinforme,k_codusuario_modifica,o_actualizar_inspeccion) {
  db.transaction(function (tx) {
    var query = "UPDATE auditoria_inspecciones_escaleras SET o_consecutivoinsp = ?,"+
                                                              "o_estado_envio = ?,"+
                                                              "o_revision = ?,"+
                                                              "v_item_nocumple = ?,"+
                                                              "k_codcliente = ?,"+
                                                              "k_codinforme = ?,"+
                                                              "o_actualizar_inspeccion = ?,"+
                                                              "k_codusuario_modifica = ? "+
                                                              "WHERE k_codusuario = ? "+
                                                              "AND k_codinspeccion = ?";
    tx.executeSql(query, [o_consecutivoinsp,o_estado_envio,o_revision,v_item_nocumple,k_codcliente,k_codinforme,o_actualizar_inspeccion,k_codusuario_modifica,k_codusuario,k_codinspeccion], function(tx, res) {
      console.log("rowsAffected updateItemsAuditoriaInspeccionesEscaleras: " + res.rowsAffected);
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
* Funcion para insertar datos en la tabla auditoria_inspecciones_escaleras
*==============================================*/
function addItemsEscalerasValoresAuditoriaEscaleras(k_codusuario,k_codinspeccion,o_consecutivoinsp,o_estado_envio,o_revision,v_item_nocumple,k_codcliente,k_codinforme,k_codusuario_modifica,o_actualizar_inspeccion) {
  db.transaction(function (tx) {
    var query = "INSERT INTO auditoria_inspecciones_escaleras (k_codusuario,k_codinspeccion,o_consecutivoinsp,o_estado_envio,o_revision,v_item_nocumple,k_codcliente,k_codinforme,k_codusuario_modifica,o_actualizar_inspeccion) VALUES (?,?,?,?,?,?,?,?,?,?)";
    tx.executeSql(query, [k_codusuario,k_codinspeccion,o_consecutivoinsp,o_estado_envio,o_revision,v_item_nocumple,k_codcliente,k_codinforme,k_codusuario_modifica,o_actualizar_inspeccion], function(tx, res) {
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
function llenarTablaEscalerasValoresCliente(){
  var cod_inspector = window.localStorage.getItem("codigo_inspector");
  var parametros = {"inspector" : cod_inspector};
  $.ajax({
    async:  true,
    url: "http://192.168.0.26:8888/inspeccion/servidor/php/json_app_escaleras_valores_cliente.php",
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
              addItemsEscalerasValoresCliente(k_codcliente,v_consecutivocliente,k_codusuario,n_cliente,n_contacto,v_nit,o_direccion,o_telefono,o_correo);
            }else{
              updateItemsEscalerasValoresCliente(k_codcliente,v_consecutivocliente,k_codusuario,n_cliente,n_contacto,v_nit,o_direccion,o_telefono,o_correo);
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
function updateItemsEscalerasValoresCliente(k_codcliente,v_consecutivocliente,k_codusuario,n_cliente,n_contacto,v_nit,o_direccion,o_telefono,o_correo) {
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
function addItemsEscalerasValoresCliente(k_codcliente,v_consecutivocliente,k_codusuario,n_cliente,n_contacto,v_nit,o_direccion,o_telefono,o_correo) {
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
function llenarTablaEscalerasValoresInforme(){
  var cod_inspector = window.localStorage.getItem("codigo_inspector");
  var parametros = {"inspector" : cod_inspector};
  $.ajax({
    async:  true,
    url: "http://192.168.0.26:8888/inspeccion/servidor/php/json_app_escaleras_valores_informe.php",
    data: parametros,
    type: "POST",
    dataType : "JSON",
    success: function(response){
      if (response == "") {
        //alert("No hay inspecciones a ser cargadas!");
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
                addItemsEscalerasValoresInforme(k_codinforme,v_consecutivoinforme,k_codusuario,f_informe);
              }else{
                abrir_Ventana_Carga();
                updateItemsEscalerasValoresInforme(k_codinforme,v_consecutivoinforme,k_codusuario,f_informe);
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
function updateItemsEscalerasValoresInforme(k_codinforme,v_consecutivoinforme,k_codusuario,f_informe) {
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
function addItemsEscalerasValoresInforme(k_codinforme,v_consecutivoinforme,k_codusuario,f_informe) {
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

/*=============================================
* Funcion para llenar la tabla auditoria_inspecciones_escaleras, trayendo del servidor los items en un archivo JSON
*==============================================*/
function comprobarCambiosBD_escaleras(){
  var cod_inspector = window.localStorage.getItem("codigo_inspector");
  var parametros = {"inspector" : cod_inspector};
  $.ajax({
    async:  true,
    url: "http://192.168.0.26:8888/inspeccion/servidor/php/json_app_escaleras_comprobar_cambios_en_bd.php",
    data: parametros,
    type: "POST",
    dataType : "JSON",
    success: function(response){
      $.each(response, function(i,item){
        var count_escaleras = item.count_escaleras;
        if (count_escaleras > 0) {
          navigator.vibrate(2500); //Hacemos vibrar el dispositivo
          message = 'Advertencia:\n\nSe han realizado cambios en las inspecciones de escaleras.\n\n¿Desea cargar estos cambios?';
          title = 'Montajes & Procesos M.P SAS';
          if(navigator.notification && navigator.notification.alert){
              navigator.notification.confirm(
              message, // message
              confirm_escaleras, // callback to invoke with index of button pressed
              title, // title
              ['SI','NO'] // buttonLabels -> valores [1,0]
            );
          }else{
            llenarTablas_escaleras();
            setTimeout('comprobarCambiosBD_escaleras()',1000);
          }
        }else{
          //alert("No hay inspecciones a ser cargadas!");
          setTimeout('comprobarCambiosBD_escaleras()',10000);
        }
      });
    }
  });
}

function confirm_escaleras(buttonIndex) {
  if (buttonIndex == 1) {
    llenarTablas_escaleras();
    setTimeout('comprobarCambiosBD_escaleras()',1000);
  }
}

/*=============================================
* Funcion para actualizar el campo de o_actualizar_inspeccion (por No) de la tabla de auditoria_inspecciones_escaleras del servidor luego de que se 
* cargan los valores en el dispositivo para que no se quede en un bucle de actualizacion siempre que se cargue la funcion de actualizar
*==============================================*/
function actualizarTablaAuditoriaEscalerasServidor(k_codusuario,k_codinspeccion){
  var parametros = {"inspector" : k_codusuario, "inspeccion" : k_codinspeccion, "o_actualizar_inspeccion" : 'No'};
  $.ajax({
    async:  true,
    url: "http://192.168.0.26:8888/inspeccion/servidor/php/json_app_escaleras_actualizar_valores_auditoria.php",
    data: parametros,
    type: "POST",
    dataType : "JSON",
    success: function(response){
      //alert(response);
    }
  });
}

function llenarTablas_escaleras() {
  llenarTablaEscalerasValoresInforme(); //Se abre la ventana de carga
  llenarTablaEscalerasValoresAuditoriaEscaleras(); 
  llenarTablaEscalerasValoresCliente();
  llenarTablaEscalerasValoresPreliminar();
  llenarTablaEscalerasValoresElementos();
  llenarTablaEscalerasValoresProteccion();
  llenarTablaEscalerasValoresFinales();
  llenarTablaEscalerasValoresIniciales();
  llenarTablaEscalerasValoresDefectos(); //Se cierra la ventana de carga
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
* Si tenemos conexion a internet muestra un mensaje de carga y prosigue a llenar las tablas
*==============================================*/
function valor_conexion_internet(conexion) {
  if (conexion==1) {
    //alert("Hay conexion conexión a internet!");
    comprobarCambiosBD_escaleras();
  } else {
    alert("No tiene conexión a internet!");
    location.href="./index.html";
  }
}