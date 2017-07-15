$(document).ready(function($){
  //addItemsAscensorValoresFotografias();
});

/*=============================================
* Crear base de datos / Hacer conexion si ya esta creada
* parametros:
* var dbShell = window.openDatabase(database_name, database_version, database_displayname, database_size);
*==============================================*/
var db = window.openDatabase("montajes_inspeccion_mp", "1.0", "Inspeccion_MP", 1000000);

/*=============================================
* Funcion que permite abrir la ventana que aparece mientras se guarda la inspeccion
*==============================================*/
function abrirVentanaCarga(){
  $('.fb').show();
  $('.fbback').show();
}

/*=============================================
* Funcion que permite cerrar la ventana que aparece mientras se guarda la inspeccion
* Luego de que se guarde se muestra una alerta y se redirige al index
*==============================================*/
function cerrarVentanaCarga(){
  $('.fb').hide();
  $('.fbback').hide();
  message = 'Se elimino con éxito la inspección!';
  if(navigator.notification && navigator.notification.alert){
    navigator.notification.alert(message, null, "Montajes & Procesos M.P SAS", "Aceptar");
    window.location='../visualizar_inspecciones.html';
  }else{
    alert(message);
    window.location='../visualizar_inspecciones.html';
  }
}

function eliminarInspeccionAscensor(){
  abrirVentanaCarga();
  var cod_usuario = getQueryVariable('cod_usuario');
  var cod_inspeccion = getQueryVariable('id_inspeccion');

  // borrarArchivosFotograficos(cod_usuario,cod_inspeccion);
  // borrarArchivosAudio(cod_usuario,cod_inspeccion);
  // removeItemsAudios(cod_usuario,cod_inspeccion);
  // removeItemsCabina(cod_usuario,cod_inspeccion);
  // removeItemsElementos(cod_usuario,cod_inspeccion);
  // removeItemsFinales(cod_usuario,cod_inspeccion);
  // removeItemsFoso(cod_usuario,cod_inspeccion);
  // removeItemsFotografias(cod_usuario,cod_inspeccion);
  // removeItemsIniciales(cod_usuario,cod_inspeccion);
  // removeItemsMaquinas(cod_usuario,cod_inspeccion);
  // removeItemsPozo(cod_usuario,cod_inspeccion);
  // removeItemsPreliminar(cod_usuario,cod_inspeccion);
  // removeItemsProteccion(cod_usuario,cod_inspeccion);
  updateItemsAuditoriaInspeccionesAscensores(cod_usuario,cod_inspeccion,"Eliminada");
}

function eliminarInspeccionPuerta(){
  abrirVentanaCarga();
  var cod_usuario = getQueryVariable('cod_usuario');
  var cod_inspeccion = getQueryVariable('id_inspeccion');

  updateItemsAuditoriaInspeccionesPuertas(cod_usuario,cod_inspeccion,"Eliminada");
}

function eliminarInspeccionEscalera(){
  abrirVentanaCarga();
  var cod_usuario = getQueryVariable('cod_usuario');
  var cod_inspeccion = getQueryVariable('id_inspeccion');

  updateItemsAuditoriaInspeccionesEscaleras(cod_usuario,cod_inspeccion,"Eliminada");
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
* Select a la tabla ascensor_valores_fotografias para obtener los datos del archivo y poderlo eliminar del dispositivo
*==============================================*/
function borrarArchivosFotograficos(k_codusuario,cod_inspeccion){
  db.transaction(function (tx) {
    var query = "SELECT n_fotografia,n_directorio FROM ascensor_valores_fotografias WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [k_codusuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0; x < resultSet.rows.length; x++) {
        var directorio = resultSet.rows.item(x).n_directorio;
        var nombre_archivo = resultSet.rows.item(x).n_fotografia;
        //alert("n_fotografia: " + nombre_archivo + "n_directorio: " + directorio);
        borrarArchivo(directorio,nombre_archivo);
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
* Select a la tabla ascensor_valores_audios para obtener los datos del archivo y poderlo eliminar del dispositivo
*==============================================*/
function borrarArchivosAudio(k_codusuario,cod_inspeccion){
  db.transaction(function (tx) {
    var query = "SELECT n_audio,n_directorio FROM ascensor_valores_audios WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [k_codusuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0; x < resultSet.rows.length; x++) {
        var directorio = resultSet.rows.item(x).n_directorio;
        var nombre_archivo = resultSet.rows.item(x).n_audio;
        //alert("n_audio: " + nombre_archivo + "n_directorio: " + directorio);
        borrarArchivo(directorio,nombre_archivo);
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

/*==========================================
* Funcion para borrar cualquier tipo de archivo del dispositivo
* Recibe por parametro la ubicacion de donde esta guardado el archivo en el celchu y el nombre del archivo
============================================*/
function borrarArchivo(ubicacion, nombreDeArchivo){
  //directorio = "file:///sdcard" + ubicacion;
  directorio = "file:///sdcard" + ubicacion;
  window.resolveLocalFileSystemURL(directorio, function(dir) {
    dir.getFile(nombreDeArchivo, {create:false}, function(fileEntry) {
      fileEntry.remove(function(){
        // El archivo ha sido eliminado satisfactoriamente
        //alert("Archivo eliminado con éxito!");
      }, fallo_eliminar_archivo);
    }, fallo_eliminar_archivo);
  }, fallo_eliminar_archivo);
}

function fallo_eliminar_archivo(error){
  console.log(error.code);
  //alert("El archivo no existe! Code = " + error.code);
}

/*=============================================
* Funcion para eliminar una fila en la tabla ascensor_valores_audios pasando por parametro el codigo de inspeccion
*==============================================*/
function removeItemsAudios(k_codusuario,cod_inspeccion) {
  db.transaction(function (tx) {
    var query = "DELETE FROM ascensor_valores_audios WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [k_codusuario,cod_inspeccion], function (tx, res) {
      console.log("rowsAffected: " + res.rowsAffected);
    },
    function (tx, error) {
      console.log('DELETE error: ' + error.message);
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para eliminar una fila en la tabla ascensor_valores_cabina pasando por parametro el codigo de inspeccion
*==============================================*/
function removeItemsCabina(k_codusuario,cod_inspeccion) {
  db.transaction(function (tx) {
    var query = "DELETE FROM ascensor_valores_cabina WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [k_codusuario,cod_inspeccion], function (tx, res) {
      console.log("rowsAffected: " + res.rowsAffected);
    },
    function (tx, error) {
      console.log('DELETE error: ' + error.message);
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para eliminar una fila en la tabla ascensor_valores_elementos pasando por parametro el codigo de inspeccion
*==============================================*/
function removeItemsElementos(k_codusuario,cod_inspeccion) {
  db.transaction(function (tx) {
    var query = "DELETE FROM ascensor_valores_elementos WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [k_codusuario,cod_inspeccion], function (tx, res) {
      console.log("rowsAffected: " + res.rowsAffected);
    },
    function (tx, error) {
      console.log('DELETE error: ' + error.message);
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para eliminar una fila en la tabla ascensor_valores_finales pasando por parametro el codigo de inspeccion
*==============================================*/
function removeItemsFinales(k_codusuario,cod_inspeccion) {
  db.transaction(function (tx) {
    var query = "DELETE FROM ascensor_valores_finales WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [k_codusuario,cod_inspeccion], function (tx, res) {
      console.log("rowsAffected: " + res.rowsAffected);
    },
    function (tx, error) {
      console.log('DELETE error: ' + error.message);
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para eliminar una fila en la tabla ascensor_valores_foso pasando por parametro el codigo de inspeccion
*==============================================*/
function removeItemsFoso(k_codusuario,cod_inspeccion) {
  db.transaction(function (tx) {
    var query = "DELETE FROM ascensor_valores_foso WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [k_codusuario,cod_inspeccion], function (tx, res) {
      console.log("rowsAffected: " + res.rowsAffected);
    },
    function (tx, error) {
      console.log('DELETE error: ' + error.message);
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para eliminar una fila en la tabla ascensor_valores_fotografias pasando por parametro el codigo de inspeccion
*==============================================*/
function removeItemsFotografias(k_codusuario,cod_inspeccion) {
  db.transaction(function (tx) {
    var query = "DELETE FROM ascensor_valores_fotografias WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [k_codusuario,cod_inspeccion], function (tx, res) {
      console.log("rowsAffected: " + res.rowsAffected);
    },
    function (tx, error) {
      console.log('DELETE error: ' + error.message);
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para eliminar una fila en la tabla ascensor_valores_iniciales pasando por parametro el codigo de inspeccion
*==============================================*/
function removeItemsIniciales(k_codusuario,cod_inspeccion) {
  db.transaction(function (tx) {
    var query = "DELETE FROM ascensor_valores_iniciales WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [k_codusuario,cod_inspeccion], function (tx, res) {
      console.log("rowsAffected: " + res.rowsAffected);
    },
    function (tx, error) {
      console.log('DELETE error: ' + error.message);
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para eliminar una fila en la tabla ascensor_valores_maquinas pasando por parametro el codigo de inspeccion
*==============================================*/
function removeItemsMaquinas(k_codusuario,cod_inspeccion) {
  db.transaction(function (tx) {
    var query = "DELETE FROM ascensor_valores_maquinas WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [k_codusuario,cod_inspeccion], function (tx, res) {
      console.log("rowsAffected: " + res.rowsAffected);
    },
    function (tx, error) {
      console.log('DELETE error: ' + error.message);
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para eliminar una fila en la tabla ascensor_valores_pozo pasando por parametro el codigo de inspeccion
*==============================================*/
function removeItemsPozo(k_codusuario,cod_inspeccion) {
  db.transaction(function (tx) {
    var query = "DELETE FROM ascensor_valores_pozo WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [k_codusuario,cod_inspeccion], function (tx, res) {
      console.log("rowsAffected: " + res.rowsAffected);
    },
    function (tx, error) {
      console.log('DELETE error: ' + error.message);
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para eliminar una fila en la tabla ascensor_valores_preliminar pasando por parametro el codigo de inspeccion
*==============================================*/
function removeItemsPreliminar(k_codusuario,cod_inspeccion) {
  db.transaction(function (tx) {
    var query = "DELETE FROM ascensor_valores_preliminar WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [k_codusuario,cod_inspeccion], function (tx, res) {
      console.log("rowsAffected: " + res.rowsAffected);
    },
    function (tx, error) {
      console.log('DELETE error: ' + error.message);
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para eliminar una fila en la tabla ascensor_valores_proteccion pasando por parametro el codigo de inspeccion
*==============================================*/
function removeItemsProteccion(k_codusuario,cod_inspeccion) {
  db.transaction(function (tx) {
    var query = "DELETE FROM ascensor_valores_proteccion WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [k_codusuario,cod_inspeccion], function (tx, res) {
      console.log("rowsAffected: " + res.rowsAffected);
    },
    function (tx, error) {
      console.log('DELETE error: ' + error.message);
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para actualizar una fila en la tabla auditoria_inspecciones_ascensores
*==============================================*/
function updateItemsAuditoriaInspeccionesAscensores(k_codusuario,cod_inspeccion,estado) {
  db.transaction(function (tx) {
    var query = "UPDATE auditoria_inspecciones_ascensores SET o_estado_envio = ? WHERE k_codusuario = ? AND k_codinspeccion = ?";
    cerrarVentanaCarga();                                                              
    //setTimeout('cerrarVentanaCarga()',7000); //SE LE DA UN TIEMPO PARA QUE SE CIERRE, MIENTRAS SE GUARDAN LOS VALORES EN LA BD
    tx.executeSql(query, [estado,k_codusuario,cod_inspeccion], function(tx, res) {
      console.log("rowsAffected updateItemsAuditoriaInspeccionesAscensores: " + res.rowsAffected);
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
* Funcion para actualizar una fila en la tabla auditoria_inspecciones_puertas
*==============================================*/
function updateItemsAuditoriaInspeccionesPuertas(k_codusuario,cod_inspeccion,estado) {
  db.transaction(function (tx) {
    var query = "UPDATE auditoria_inspecciones_puertas SET o_estado_envio = ? WHERE k_codusuario = ? AND k_codinspeccion = ?";
    cerrarVentanaCarga();                                                              
    //setTimeout('cerrarVentanaCarga()',7000); //SE LE DA UN TIEMPO PARA QUE SE CIERRE, MIENTRAS SE GUARDAN LOS VALORES EN LA BD
    tx.executeSql(query, [estado,k_codusuario,cod_inspeccion], function(tx, res) {
      console.log("rowsAffected updateItemsAuditoriaInspeccionesPuertas: " + res.rowsAffected);
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
* Funcion para actualizar una fila en la tabla auditoria_inspecciones_puertas
*==============================================*/
function updateItemsAuditoriaInspeccionesEscaleras(k_codusuario,cod_inspeccion,estado) {
  db.transaction(function (tx) {
    var query = "UPDATE auditoria_inspecciones_escaleras SET o_estado_envio = ? WHERE k_codusuario = ? AND k_codinspeccion = ?";
    cerrarVentanaCarga();                                                              
    //setTimeout('cerrarVentanaCarga()',7000); //SE LE DA UN TIEMPO PARA QUE SE CIERRE, MIENTRAS SE GUARDAN LOS VALORES EN LA BD
    tx.executeSql(query, [estado,k_codusuario,cod_inspeccion], function(tx, res) {
      console.log("rowsAffected updateItemsAuditoriaInspeccionesEscaleras: " + res.rowsAffected);
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