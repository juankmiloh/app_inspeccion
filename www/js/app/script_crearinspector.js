$(document).ready(function(){ 
	//alert("Probando Jquery!");
  //navigator.vibrate([2000, 250, 1000, 100]);
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

/*=============================================
* Funcion que se ejecuta desde el form de la pagina crear_inspector.html
* Valida si hay o no un inspector creado en las base de datos local y en la del servidor
*==============================================*/
function crearInspector(){
  var numeroUsuarios = 0;
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM usuario";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Numero de filas tabla usuario -> '+resultSet.rows.item(0).c);
      numeroUsuarios = resultSet.rows.item(0).c;
      if (numeroUsuarios > 0) {
        if(navigator.notification && navigator.notification.alert){
          navigator.notification.alert("Ya existe un inspector asignado al dispositivo!", null, "Montajes & Procesos M.P SAS", "Aceptar");
          window.location='../index.html';
        }else{
          alert("Ya existe un inspector asignado al dispositivo!");
          window.location='../index.html';
        }        
      }
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
      crearDatosInspector(); //Si no existe el inspector
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
} 

/*=============================================
* Funcion donde se valida que los campos no esten vacios
* Se prueba que haya conexion de Internet
* Se mandan los datos del usuario por metodo post al servidor
* si se tiene respuesta por parte del servidor se llaman las funciones
* crearTablaUsuario
* addItemUsuario
* crearTablaConsecutivoAscensores
* crearTablaConsecutivoEscalerasAndenes
* crearTablaConsecutivoPuertas
* se crea el usuario con exito
*==============================================*/
function crearDatosInspector(){
	probar_conexion_red();
	var codigo=$('#txt_codigo').val();
	var nombre_usuario=$('#txt_nombre_usuario').val();
	var cedula=$('#txt_cedula').val();
	var nombre=$('#txt_nombre').val();
	var apellido=$('#txt_apellido').val();
	var correo=$('#txt_correo').val();
	var rol=$('#txt_rol').val();
	
	if (cedula!="" && nombre!="" && apellido!="" && correo!="" && rol!=""){
		if (codigo != "Procesando, espere por favor...") {
			$.post('http://www.montajesyprocesos.com/inspeccion/servidor/php/crear_inspector.php',{
				Caso:'Crear',
				Id: codigo,
				Usuario: nombre_usuario,
				Cedula: cedula,
				Nombre: nombre,
				Apellido: apellido,
				Correo: correo,
				Rol: rol
			},function(e){						
        window.localStorage.setItem('codigo_inspector', codigo); //se crea la variable persistente del codigo del inspector
        crearTablaUsuario(codigo,nombre_usuario,cedula,nombre,apellido,correo,rol);
        addItemUsuario(codigo,nombre_usuario,cedula,nombre,apellido,correo,rol); //agregamos el usario a la BD
        crearTablaConsecutivoAscensores();
        addItemConsecutivoAscensores(codigo, 0);
        crearTablaConsecutivoEscalerasAndenes();
        addItemConsecutivoEscalerasAndenes(codigo, 0);
        crearTablaConsecutivoPuertas();
        addItemConsecutivoPuertas(codigo, 0);
			});	
		} else {
      if (numeroUsuarios > 0) {
        if(navigator.notification && navigator.notification.alert){
          navigator.notification.alert("Error = No tiene conexión a la base de datos. Contacte al administrador del sistema!", null, "Montajes & Procesos M.P SAS", "Ok :)");
          location.href='../websites/crear_inspector.html';
        }else{
          alert("Error = No tiene conexión a la base de datos. Contacte al administrador del sistema! :)");
          location.href='../websites/crear_inspector.html';
        }        
      }
		}	
	}
}

/*=============================================
* Crear tabla usuario
*==============================================*/
function crearTablaUsuario(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE usuario (k_codusuario unique, n_usuario, o_cedula, n_nombre, n_apellido, o_correo, o_rol, contrasena)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction creada ok');
  });
}

/*=============================================
* Funcion para insertar datos en la tabla usuario
*==============================================*/
function addItemUsuario(codigo,nombre_usuario,cedula,nombre,apellido,correo,rol) {
    db.transaction(function (tx) {
        var query = "INSERT INTO usuario (k_codusuario, n_usuario, o_cedula, n_nombre, n_apellido, o_correo, o_rol, contrasena) VALUES (?,?,?,?,?,?,?,?)";
        tx.executeSql(query, [codigo, nombre_usuario, cedula, nombre, apellido, correo, rol, cedula], function(tx, res) {
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
* Crear tabla consecutivo_ascensores
*==============================================*/
function crearTablaConsecutivoAscensores(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE consecutivo_ascensores (k_codusuario, k_consecutivo unique, n_inspeccion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction creada ok');
  });
}

/*=============================================
* Funcion para insertar datos en la tabla consecutivo_ascensores
*==============================================*/
function addItemConsecutivoAscensores(codigo, consecutivo) {
    var inspeccion = "ASC"+codigo+"-00"+consecutivo+"-"+anio;
    db.transaction(function (tx) {
        var query = "INSERT INTO consecutivo_ascensores (k_codusuario, k_consecutivo, n_inspeccion) VALUES (?,?,?)";
        tx.executeSql(query, [codigo,"00"+consecutivo, inspeccion], function(tx, res) {
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
* Crear tabla consecutivo_escaleras
*==============================================*/
function crearTablaConsecutivoEscalerasAndenes(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE consecutivo_escaleras (k_codusuario, k_consecutivo unique, n_inspeccion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction creada ok');
  });
}

/*=============================================
* Funcion para insertar datos en la tabla consecutivo_escaleras
*==============================================*/
function addItemConsecutivoEscalerasAndenes(codigo, consecutivo) {
    var inspeccion = "ESC"+codigo+"-00"+consecutivo+"-"+anio;
    db.transaction(function (tx) {
        var query = "INSERT INTO consecutivo_escaleras (k_codusuario, k_consecutivo, n_inspeccion) VALUES (?,?,?)";
        tx.executeSql(query, [codigo, "00"+consecutivo, inspeccion], function(tx, res) {
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
* Crear tabla consecutivo_puertas
*==============================================*/
function crearTablaConsecutivoPuertas(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE consecutivo_puertas (k_codusuario, k_consecutivo unique, n_inspeccion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction creada ok');
  });
}

/*=============================================
* Funcion para insertar datos en la tabla consecutivo_puertas
*==============================================*/
function addItemConsecutivoPuertas(codigo, consecutivo) {
    var inspeccion = "PUT"+codigo+"-00"+consecutivo+"-"+anio;
    db.transaction(function (tx) {
        var query = "INSERT INTO consecutivo_puertas (k_codusuario, k_consecutivo, n_inspeccion) VALUES (?,?,?)";
        tx.executeSql(query, [codigo, "00"+consecutivo, inspeccion], function(tx, res) {
          console.log("insertId: " + res.insertId + " -- probably 1");
          console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
          if(navigator.notification && navigator.notification.alert){
            navigator.notification.alert("Inspector creado con éxito!", null, "Montajes & Procesos M.P SAS", "Ok");
            window.location='../index.html';
          }else{
            alert("Inspector creado con éxito!");
            window.location='../index.html'; //despues de haber creado el inspector y las tablas correspondientes de consecutivos en la BD
          }  
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

  /* ---------- Se crea el campo oculto donde se carga la imagen ------------ */

  var cell1 = row.insertCell(0);
  cell1.innerHTML =  '<img src="http://static.forosdelweb.com/fdwtheme/logo-navidad.png?'+Math.random()+
  '" style="display:none" onload="valor_conexion(1)" onerror="valor_conexion(0)" />';
}

function valor_conexion(conexion) {
  if (conexion==1) {
    //alert("Hay conexion conexión a internet!");
    verificarCodUsuario();
  } else {
    if(navigator.notification && navigator.notification.alert){
      navigator.notification.alert("No tiene conexión a internet!", null, "Montajes & Procesos M.P SAS", "Ok");
      window.location='../index.html';
    }else{
      alert("No tiene conexión a internet!");
      location.href="../index.html";
    } 
  }
}