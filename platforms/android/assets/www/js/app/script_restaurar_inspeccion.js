$(document).ready(function($){
  //alert("Probando script!");
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
  $('#texto_carga').text('Restauracion de la inspección...oK');
}

/*=============================================
* Funcion que permite cerrar la ventana que aparece mientras se restaura la inspeccion
* Luego de que se restaura se muestra una alerta
* recibe por parametro el tipo de inspeccion para hacer la redireccion de pagina
*==============================================*/
function cerrarVentanaCarga(valor1,valor2){
  $('.fb').hide();
  $('.fbback').hide();
  message = 'Se restauró con éxito la inspección!';
  if(navigator.notification && navigator.notification.alert){
    navigator.notification.alert(message, null, "Montajes & Procesos M.P SAS", "Aceptar");
    window.location='../'+valor1+'/'+valor2+'_visualizar_inspecciones_eliminadas.html';
  }else{
    alert(message);
    window.location='../'+valor1+'/'+valor2+'_visualizar_inspecciones_eliminadas.html';
  }
}

function restaurarInspeccionAscensor(cod_usuario,cod_inspeccion){
  abrirVentanaCarga();
  updateItemsAuditoriaInspeccionesAscensores(cod_usuario,cod_inspeccion,"Pendiente");
}

function restaurarInspeccionPuertas(cod_usuario,cod_inspeccion){
  abrirVentanaCarga();
  updateItemsAuditoriaInspeccionesPuertas(cod_usuario,cod_inspeccion,"Pendiente");
}

function restaurarInspeccionEscaleras(cod_usuario,cod_inspeccion){
  abrirVentanaCarga();
  updateItemsAuditoriaInspeccionesEscaleras(cod_usuario,cod_inspeccion,"Pendiente");
}

/*=============================================
* Funcion para actualizar una fila en la tabla auditoria_inspecciones_ascensores
*==============================================*/
function updateItemsAuditoriaInspeccionesAscensores(k_codusuario,cod_inspeccion,estado) {
  var codigo_usuario = k_codusuario.toString();
  var codigo_inspeccion = cod_inspeccion.toString();
  if (codigo_inspeccion < 10) {
    codigo_inspeccion = "0" + codigo_inspeccion;
  }
  if (codigo_inspeccion < 100) {
    codigo_inspeccion = "0" + codigo_inspeccion;
  }
  db.transaction(function (tx) {
    var query = "UPDATE auditoria_inspecciones_ascensores SET o_estado_envio = ? WHERE k_codusuario = ? AND k_codinspeccion = ?";
    cerrarVentanaCarga("ascensores","ascensor");                                                              
    //setTimeout('cerrarVentanaCarga()',7000); //SE LE DA UN TIEMPO PARA QUE SE CIERRE, MIENTRAS SE GUARDAN LOS VALORES EN LA BD
    tx.executeSql(query, [estado,codigo_usuario,codigo_inspeccion], function(tx, res) {
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
  var codigo_usuario = k_codusuario.toString();
  var codigo_inspeccion = cod_inspeccion.toString();
  if (codigo_inspeccion < 10) {
    codigo_inspeccion = "0" + codigo_inspeccion;
  }
  if (codigo_inspeccion < 100) {
    codigo_inspeccion = "0" + codigo_inspeccion;
  }
  db.transaction(function (tx) {
    var query = "UPDATE auditoria_inspecciones_puertas SET o_estado_envio = ? WHERE k_codusuario = ? AND k_codinspeccion = ?";
    cerrarVentanaCarga("puertas","puertas");                                                              
    //setTimeout('cerrarVentanaCarga()',7000); //SE LE DA UN TIEMPO PARA QUE SE CIERRE, MIENTRAS SE GUARDAN LOS VALORES EN LA BD
    tx.executeSql(query, [estado,codigo_usuario,codigo_inspeccion], function(tx, res) {
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
  var codigo_usuario = k_codusuario.toString();
  var codigo_inspeccion = cod_inspeccion.toString();
  if (codigo_inspeccion < 10) {
    codigo_inspeccion = "0" + codigo_inspeccion;
  }
  if (codigo_inspeccion < 100) {
    codigo_inspeccion = "0" + codigo_inspeccion;
  }
  db.transaction(function (tx) {
    var query = "UPDATE auditoria_inspecciones_escaleras SET o_estado_envio = ? WHERE k_codusuario = ? AND k_codinspeccion = ?";
    cerrarVentanaCarga("escaleras","escaleras");                                                              
    //setTimeout('cerrarVentanaCarga()',7000); //SE LE DA UN TIEMPO PARA QUE SE CIERRE, MIENTRAS SE GUARDAN LOS VALORES EN LA BD
    tx.executeSql(query, [estado,codigo_usuario,codigo_inspeccion], function(tx, res) {
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