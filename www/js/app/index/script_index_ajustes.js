$(document).ready(function(){
  // alert("probando_script");
});

/* Inicializamos la variable fecha y anio */
var fecha = new Date();
var anio = fecha.getFullYear();

/*=============================================
* Funcion que permite insertar un nuevo consecutivo en la tabla de consecutivo_ascensores
*==============================================*/
function insertar_consecutivo() {
  var k_codusuario = prompt("INGRESE EL CÓDIGO DE USUARIO:");
  var k_consecutivo = prompt("INGRESE EL CONSECUTIVO:");
  if (k_consecutivo < 10) {
    k_consecutivo = "0" + k_consecutivo;
  }
  if (k_consecutivo < 100) {
    k_consecutivo = "0" + k_consecutivo;
  }
  k_consecutivo = String(k_consecutivo);
  var n_inspeccion = "ASC"+k_codusuario+"-"+k_consecutivo+"-"+anio;
  db.transaction(function (tx) {
    var query = "INSERT INTO consecutivo_ascensores (k_codusuario,k_consecutivo,n_inspeccion) VALUES (?,?,?)";
    tx.executeSql(query, [k_codusuario,k_consecutivo,n_inspeccion], function(tx, res) {
      console.log(res);
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
* Funcion que permite eliminar un consecutivo de la tabla consecutivo_ascensores
*==============================================*/
function eliminar_inspeccion() {
  var cod_inspeccion = prompt("INGRESE EL CÓDIGO DE INSPECCIÓN:");
  if(cod_inspeccion == undefined){
    //alert("Ha pulsado cancelar");
  }else if(cod_inspeccion == ""){
    // alert("Ha pulsado aceptar con el campo vacio");
    // db.transaction(function (tx) {
    //   var query = "DELETE FROM consecutivo_ascensores WHERE n_inspeccion=?";
    //   tx.executeSql(query, ["ASC2-100-2017"], function(tx, res) {
    //     console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
    //   },
    //   function(tx, error) {
    //     console.log('DELETE error: ' + error.message);
    //   });
    // }, function(error) {
    //   console.log('transaction error: ' + error.message);
    // }, function() {
    //   console.log('transaction ok');
    // });
  }else{
    //Eliminar un registro
    db.transaction(function (tx) {
      var query = "DELETE FROM consecutivo_ascensores WHERE k_consecutivo=?";
      tx.executeSql(query, [cod_inspeccion], function(tx, res) {
        console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
      },
      function(tx, error) {
        console.log('DELETE error: ' + error.message);
      });
    }, function(error) {
      console.log('transaction error: ' + error.message);
    }, function() {
      console.log('transaction ok');
    });
  }
}

/*=============================================
* Funcion que permite listar todos los consecutivos de la tabla consecutivo_ascensores
*==============================================*/
function mostrar_consecutivos() {
  db.transaction(function (tx) {
    var query = "SELECT * FROM consecutivo_ascensores";
    tx.executeSql(query, [], function (tx, resultSet) {
      for(var x = 0; x < resultSet.rows.length; x++) {
        var k_codusuario = resultSet.rows.item(x).k_codusuario;
        var k_consecutivo = resultSet.rows.item(x).k_consecutivo;
        var n_inspeccion = resultSet.rows.item(x).n_inspeccion;
        var contenidoDiv = 
        '<table border="1">'+
          '<thead>'+
            '<th>k_codusuario</th>'+
            '<th>k_consecutivo</th>'+
            '<th>n_inspeccion</th>'+
          '</thead>'+
          '<tbody>'+
            '<tr>'+
              '<td>'+k_codusuario+'</td>'+
              '<td>'+k_consecutivo+'</td>'+
              '<td>'+n_inspeccion+'</td>'+
            '</tr>'+
          '</tbody>'+
        '</table>';
        $(contenidoDiv).appendTo("#lista_consecutivos");
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
* Funcion que permite listar los datos de la tabla auditoria_inspecciones_ascensores
*==============================================*/
function mostrar_auditoria_ascensores() {
  db.transaction(function (tx) {
    var query = "SELECT * FROM auditoria_inspecciones_ascensores";
    tx.executeSql(query, [], function (tx, resultSet) {
      for(var x = 0; x < resultSet.rows.length; x++) {
        var k_codusuario = resultSet.rows.item(x).k_codusuario;
        var k_consecutivo = resultSet.rows.item(x).k_codinspeccion;
        var o_estado_envio = resultSet.rows.item(x).o_estado_envio;
        var contenidoDiv = 
        '<table border="1">'+
          '<thead>'+
            '<th>k_codusuario</th>'+
            '<th>k_consecutivo</th>'+
            '<th>o_estado_envio</th>'+
          '</thead>'+
          '<tbody>'+
            '<tr>'+
              '<td>'+k_codusuario+'</td>'+
              '<td>'+k_consecutivo+'</td>'+
              '<td>'+o_estado_envio+'</td>'+
            '</tr>'+
          '</tbody>'+
        '</table>';
        $(contenidoDiv).appendTo("#lista_consecutivos");
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
* Funcion que permite cambiar el campo de estado de la tabla de auditoria_inspecciones_ascensores
*==============================================*/
function cambiar_estado_inspeccion() {
  var k_codusuario = prompt("INGRESE EL CÓDIGO DE USUARIO:");
  var k_consecutivo = prompt("INGRESE EL CÓDIGO DE INSPECCIÓN:");
  var o_estado_envio = prompt("INGRESE EL NUEVO ESTADO:");
  db.transaction(function (tx) {
    var query = "UPDATE auditoria_inspecciones_ascensores SET o_estado_envio = ? "+
                                                              "WHERE k_codusuario = ? "+
                                                              "AND k_codinspeccion = ?";
    tx.executeSql(query, [o_estado_envio,k_codusuario,k_consecutivo], function(tx, res) {
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
* Funcion que permite llamar a las distintas funciones de borrado de datos de las tablas que contienen datos de las inspecciones de ascensores
*==============================================*/
function eliminar_datos_inspeccion() {
  var k_codinspeccion = prompt("INGRESE EL CÓDIGO DE INSPECCIÓN:");
  eliminar_datos_cabina(k_codinspeccion);
  eliminar_datos_elementos(k_codinspeccion);
  eliminar_datos_finales(k_codinspeccion);
  eliminar_datos_foso(k_codinspeccion);
  eliminar_datos_iniciales(k_codinspeccion);
  eliminar_datos_maquinas(k_codinspeccion);
  eliminar_datos_pozo(k_codinspeccion);
  eliminar_datos_preliminar(k_codinspeccion);
  eliminar_datos_proteccion(k_codinspeccion);
  eliminar_datos_auditoria_ascensores(k_codinspeccion);
  eliminar_datos_consecutivo_ascensores(k_codinspeccion);
}

/*=============================================
* Funcion que permite eliminar de la BD los datos de la tabla ascensor_valores_cabina
*==============================================*/
function eliminar_datos_cabina(k_codinspeccion) {
  //Eliminar un registro
  db.transaction(function (tx) {
    var query = "DELETE FROM ascensor_valores_cabina WHERE k_codinspeccion=?";
    tx.executeSql(query, [k_codinspeccion], function(tx, res) {
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
    },
    function(tx, error) {
      console.log('DELETE error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion que permite eliminar de la BD los datos de la tabla ascensor_valores_elementos
*==============================================*/
function eliminar_datos_elementos(k_codinspeccion) {
  //Eliminar un registro
  db.transaction(function (tx) {
    var query = "DELETE FROM ascensor_valores_elementos WHERE k_codinspeccion=?";
    tx.executeSql(query, [k_codinspeccion], function(tx, res) {
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
    },
    function(tx, error) {
      console.log('DELETE error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion que permite eliminar de la BD los datos de la tabla ascensor_valores_finales
*==============================================*/
function eliminar_datos_finales(k_codinspeccion) {
  //Eliminar un registro
  db.transaction(function (tx) {
    var query = "DELETE FROM ascensor_valores_finales WHERE k_codinspeccion=?";
    tx.executeSql(query, [k_codinspeccion], function(tx, res) {
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
    },
    function(tx, error) {
      console.log('DELETE error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion que permite eliminar de la BD los datos de la tabla ascensor_valores_foso
*==============================================*/
function eliminar_datos_foso(k_codinspeccion) {
  //Eliminar un registro
  db.transaction(function (tx) {
    var query = "DELETE FROM ascensor_valores_foso WHERE k_codinspeccion=?";
    tx.executeSql(query, [k_codinspeccion], function(tx, res) {
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
    },
    function(tx, error) {
      console.log('DELETE error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion que permite eliminar de la BD los datos de la tabla ascensor_valores_iniciales
*==============================================*/
function eliminar_datos_iniciales(k_codinspeccion) {
  //Eliminar un registro
  db.transaction(function (tx) {
    var query = "DELETE FROM ascensor_valores_iniciales WHERE k_codinspeccion=?";
    tx.executeSql(query, [k_codinspeccion], function(tx, res) {
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
    },
    function(tx, error) {
      console.log('DELETE error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion que permite eliminar de la BD los datos de la tabla ascensor_valores_maquinas
*==============================================*/
function eliminar_datos_maquinas(k_codinspeccion) {
  //Eliminar un registro
  db.transaction(function (tx) {
    var query = "DELETE FROM ascensor_valores_maquinas WHERE k_codinspeccion=?";
    tx.executeSql(query, [k_codinspeccion], function(tx, res) {
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
    },
    function(tx, error) {
      console.log('DELETE error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion que permite eliminar de la BD los datos de la tabla ascensor_valores_pozo
*==============================================*/
function eliminar_datos_pozo(k_codinspeccion) {
  //Eliminar un registro
  db.transaction(function (tx) {
    var query = "DELETE FROM ascensor_valores_pozo WHERE k_codinspeccion=?";
    tx.executeSql(query, [k_codinspeccion], function(tx, res) {
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
    },
    function(tx, error) {
      console.log('DELETE error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion que permite eliminar de la BD los datos de la tabla ascensor_valores_preliminar
*==============================================*/
function eliminar_datos_preliminar(k_codinspeccion) {
  //Eliminar un registro
  db.transaction(function (tx) {
    var query = "DELETE FROM ascensor_valores_preliminar WHERE k_codinspeccion=?";
    tx.executeSql(query, [k_codinspeccion], function(tx, res) {
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
    },
    function(tx, error) {
      console.log('DELETE error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion que permite eliminar de la BD los datos de la tabla ascensor_valores_proteccion
*==============================================*/
function eliminar_datos_proteccion(k_codinspeccion) {
  //Eliminar un registro
  db.transaction(function (tx) {
    var query = "DELETE FROM ascensor_valores_proteccion WHERE k_codinspeccion=?";
    tx.executeSql(query, [k_codinspeccion], function(tx, res) {
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
    },
    function(tx, error) {
      console.log('DELETE error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion que permite eliminar de la BD los datos de la tabla auditoria_inspecciones_ascensores
*==============================================*/
function eliminar_datos_auditoria_ascensores(k_codinspeccion) {
  //Eliminar un registro
  db.transaction(function (tx) {
    var query = "DELETE FROM auditoria_inspecciones_ascensores WHERE k_codinspeccion=?";
    tx.executeSql(query, [k_codinspeccion], function(tx, res) {
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
    },
    function(tx, error) {
      console.log('DELETE error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion que permite eliminar de la BD los datos de la tabla consecutivo_ascensores
*==============================================*/
function eliminar_datos_consecutivo_ascensores(k_codinspeccion) {
  //Eliminar un registro
  db.transaction(function (tx) {
    var query = "DELETE FROM consecutivo_ascensores WHERE k_consecutivo=?";
    tx.executeSql(query, [k_codinspeccion], function(tx, res) {
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
    },
    function(tx, error) {
      console.log('DELETE error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok');
  });
}