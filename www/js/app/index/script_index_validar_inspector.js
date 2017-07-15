/*=============================================
* Funcion que se ejecuta cuando se abre la pagina web
*==============================================*/
$(document).ready(function(){ 
  //alert("probando_script");
  /*
  * Llamamos la función verificarUsuario para saber si hay un inspector asignado al dispositivo
  */
  verificarUsuario();
  limpiarVariablesSession();
  obtenerCantidadFotosPendientesAscensores();
});

/*=============================================
* Crear base de datos / Hacer conexion si ya esta creada
* parametros:
* var dbShell = window.openDatabase(database_name, database_version, database_displayname, database_size);
*==============================================*/
var db = window.openDatabase("montajes_inspeccion_mp", "1.0", "Inspeccion_MP", 1000000);

var cantidad_fotos_pendientes = 0;

/*=============================================
* FUNCION PARA DETECTAR SI SE PRESIONA EL BOTON ATRAS DEL DISPOSITIVO
*==============================================*/
document.addEventListener("backbutton", onBackKeyDown, false);
/*=============================================
* FUNCION PARA DENEGAR EL USO DEL BOTON ATRAS DEL DISPOSITIVO
* SE MUESTRA UNA ALERTA DE ADVERTENCIA
*==============================================*/
function onBackKeyDown(e) {
  e.preventDefault();
  if(navigator.notification && navigator.notification.alert){
    navigator.notification.alert("Advertencia:\n\n<<Acción no permitida>>", null, "Montajes & Procesos M.P SAS", "Ok");
  }else{
    alert("Advertencia:\n\n<<Acción no permitida>>");
  }
}

/*=============================================
* Funcion para hacer un select a la tabla usuario y verificar si esta creada la tabla usuario
* sino nos redirige a la pagina para crear un inspector
*==============================================*/
function verificarUsuario() {
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM usuario";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Numero de filas tabla usuario -> '+resultSet.rows.item(0).c);
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
      //alert("Hay conexion a la red");
      window.localStorage.setItem('codigo_inspector', 0);
      if(navigator.notification && navigator.notification.alert){
        navigator.notification.alert("No hay un inspector asignado al dispositivo!!!", null, "Montajes & Procesos M.P SAS", "Aceptar");
      }else{
        alert("No hay un inspector asignado al dispositivo!!!");
      }
      $('#btn_actualizar_inspecciones').prop('disabled', 'disabled'); //deshabilitamos el boton para actualizar la base de datos
      window.location="./websites/crear_inspector.html";
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion que permite eliminar las variables de sesion creadas en la pagina visualizar inspecciones
*==============================================*/
function limpiarVariablesSession(){
  window.sessionStorage.removeItem("cantidad_inspecciones_ascensores");
  window.sessionStorage.removeItem("cantidad_inspecciones_puertas");
  window.sessionStorage.removeItem("cantidad_inspecciones_escaleras");
  window.sessionStorage.removeItem("cantidadInformes");
}

/*=============================================
* Funcion para hacer un select a la tabla ascensor_valores_fotografias y poder obtener la cantidad de fotos pendientes por subir al servidor
* sino hay fotos pendientes se muestra una alerta y se redirecciona al index
*==============================================*/
function obtenerCantidadFotosPendientesAscensores(){
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM ascensor_valores_fotografias WHERE o_estado_envio = ?";
    tx.executeSql(query, ["Pendiente"], function (tx, resultSet) {
      cantidad_fotos_ascensores = resultSet.rows.item(0).c;
      cantidad_fotos_pendientes += cantidad_fotos_ascensores;
      obtenerCantidadFotosPendientesPuertas();
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
* Funcion para hacer un select a la tabla puertas_valores_fotografias y poder obtener la cantidad de fotos pendientes por subir al servidor
* sino hay fotos pendientes se muestra una alerta y se redirecciona al index
*==============================================*/
function obtenerCantidadFotosPendientesPuertas(){
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM puertas_valores_fotografias WHERE o_estado_envio = ?";
    tx.executeSql(query, ["Pendiente"], function (tx, resultSet) {
      cantidad_fotos_puertas = resultSet.rows.item(0).c;
      cantidad_fotos_pendientes += cantidad_fotos_puertas;
      obtenerCantidadFotosPendientesEscaleras();
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
* Funcion para hacer un select a la tabla escaleras_valores_fotografias y poder obtener la cantidad de fotos pendientes por subir al servidor
* sino hay fotos pendientes se muestra una alerta y se redirecciona al index
*==============================================*/
function obtenerCantidadFotosPendientesEscaleras(){
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM escaleras_valores_fotografias WHERE o_estado_envio = ?";
    tx.executeSql(query, ["Pendiente"], function (tx, resultSet) {
      cantidad_fotos_escaleras = resultSet.rows.item(0).c;
      cantidad_fotos_pendientes += cantidad_fotos_escaleras;
      $("#text_btn_fotos_pendientes").text(' "'+cantidad_fotos_pendientes+'"');
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

/* /////////////////// VERIFICAR CONEXION A INTERNET ////////////////////////// */

function probar_conexion_red(){
  /*--- primero probamos la conexion a la red 
  se crea un campo donde se carga una imagen, si esta carga hay conexion ---*/
  var tabla = $('#dataTable').attr("id");
  addRow(tabla);
}

function addRow(tableID) { 
  /*----Se toma el valor del control [tableID], 
        donde queremos que aparezcan los controles 
        creados dinamicamente ------------*/
  var table = document.getElementById(tableID);
  var rowCount = table.rows.length;
  var row = table.insertRow(rowCount);

  //---------- Se crea el campo oculto donde se carga la imagen ------------//

  var cell1 = row.insertCell(0);
  cell1.innerHTML =  '<img src="http://static.forosdelweb.com/fdwtheme/logo-navidad.png?'+Math.random()+
  '" style="display:none" onload="valor_conexion(1)" onerror="valor_conexion(0)" />';
}

function valor_conexion(conexion) {
  if (conexion==1) {
    //alert("Hay conexión a internet!");
    //alert("Tenga paciencia se cargaran los archivos al servidor!");
  } else {
    alert("No tiene conexion a internet!");
    //location.href="./index.php";
  }
}

