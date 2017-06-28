jQuery(document).ready(function() {

}); 

/*=============================================
* Crear base de datos / Hacer conexion si ya esta creada
* parametros:
* var dbShell = window.openDatabase(database_name, database_version, database_displayname, database_size);
*==============================================*/
var db = window.openDatabase("montajes_inspeccion_mp", "1.0", "Inspeccion_MP", 1000000);

var consecutivo;
var codigoItem;
var nomAudio;
var nomArchivo;
var directorioAudio;

var codigoInspector = window.localStorage.getItem("codigo_inspector");

/* =================================================
* Wait for device API libraries to load
* ==================================================*/
document.addEventListener("deviceready",onDeviceReady,false);

/* =================================================
* device APIs are available
* ==================================================*/
function onDeviceReady() {

}

/* FUNCION PARA DETECTAR SI SE PRESIONA EL BOTON ATRAS DEL DISPOSITIVO */
document.addEventListener("backbutton", onBackKeyDown, false);
/* FUNCION PARA DENEGAR EL USO DEL BOTON ATRAS DEL DISPOSITIVO PARA EVITAR ERRORES */
function onBackKeyDown(e) {
  e.preventDefault();
  if(navigator.notification && navigator.notification.alert){
    navigator.notification.alert("Advertencia: Acción no permitida!", null, "Montajes & Procesos M.P SAS", "Ok");
  }else{
    alert("Advertencia: Acción no permitida!");
  }
}

/* =================================================
* Funcion que se ejecuta cuando se oprime el boton de Iniciar Grabadora
* recibe como parametro el id del input
* ==================================================*/
function captureAudio() {
  navigator.device.capture.captureAudio(captureSuccess, captureError, {limit: 1});
}

/* =================================================
* Funcion que cuenta los archivos de audio y envia el archivo a la siguiente funcion
* ==================================================*/
function captureSuccess(mediaFiles) {
  var i, len;
  for (i = 0, len = mediaFiles.length; i < len; i += 1) {
    onAudioURISuccess(mediaFiles[i]);
  }
}

/* =================================================
* Called if something bad happens.
* ==================================================*/
function captureError(error) {
  if (error.code != 3) {
    var msg = 'Error: No tiene instalada una grabadora de sonido.\n\nLuego de instalar la aplicación de la grabadora no la abra, vuelva a la aplicación de la inspección y oprima de nuevo el botón "Inciar Grabadora", Gracias.\n\n¿Desea instalar la grabadora?';

    title = 'Montajes & Procesos M.P SAS';
    if(navigator.notification && navigator.notification.alert){
      navigator.notification.confirm(
      msg, // message
      onConfirmGrabadora, // callback to invoke with index of button pressed
      title, // title
      ['SI','NO'] // buttonLabels -> valores [1,0]
    );
    }
  }
}

function onConfirmGrabadora(buttonIndex) {
  if (buttonIndex == 1) {
    location.href = "market://details?id=com.tct.soundrecorder&hl=es_419";
  }
}

/* =================================================
* Funcion que recibe el audio
* ==================================================*/
function onAudioURISuccess(mediaFile) {
  /* =================================================
  *   Intentar guardar el audio 
  * ==================================================*/
  path = mediaFile.fullPath;
  nomAudio=path.substr(path.lastIndexOf('/')+1);
  createFileEntryAudio(path);
}

/* =================================================
* Funcion que crea el audio en el dispositivo
* ==================================================*/
function createFileEntryAudio(mediaFile) {
  window.resolveLocalFileSystemURI(mediaFile, copyAudio, onfail);  
}

/* =================================================
* Funcion que permite crear las carpetas en el dispositivo y mover el archivo
* ==================================================*/
function copyAudio(fileEntry) {
  consecutivo = $("#text_consecutivo").val();
  var num_aleatorio = getRandomArbitrary(100,999999);
  nomArchivo = consecutivo+"_"+num_aleatorio+".m4a";
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) { 
    fileSys.root.getDirectory("inspeccion_mp", {create: true, exclusive: false}, function(dir) { 
      dir.getDirectory("puertas", { create: true }, function (subDirEntry) {
        subDirEntry.getDirectory("audios", { create: true }, function (sub_subDirEntry) {
          directorio = sub_subDirEntry.fullPath; // Directorio donde queda guardado el audio
          var str = directorio;
          directorioAudio = str.substring(0, 32);
          fileEntry.moveTo(sub_subDirEntry, nomArchivo, onCopySuccessAudio, onfail);
        }, onfail); 
      }, onfail);                    
    }, onfail); 
  }, onfail); 
}

/* =================================================
* Funcion que se ejecuta cuando se ha creado y copiado al dispositivo satisfactoriamente el audio
* ==================================================*/
function onCopySuccessAudio(entry) {
  //alert(entry.fullPath); //directorio donde se guarda el audio
  addItemsPuertasValoresAudios();
  //ObtenerCantidadItemsAVA();
  //getDataPuertasValoresAudios();
  navigator.notification.alert("Todo salio bien el audio ha sido guardado!", null, "Montajes & Procesos M.P SAS", "Aceptar");
}

/* =================================================
* Funcion que se ejecuta si ocurre algun error al copiar la foto al dispositivo
* ==================================================*/
function onfail(error) {
  alert(error.code);
}

/*=============================================
* Funcion para insertar datos en la tabla puertas_valores_audios
*==============================================*/
function addItemsPuertasValoresAudios() {
  var codigo_inspeccion = window.sessionStorage.getItem("codigo_inspeccion"); //Se coloca aca para que despues de apretar el btn iniciar grabadora actualice el valor de la variable de sesion
  //alert(codigoInspector+" "+codigo_inspeccion+" "+nomAudio);
  db.transaction(function (tx) {
    var query = "INSERT INTO puertas_valores_audios (k_codusuario,k_codinspeccion,n_audio,n_directorio,o_estado_envio) VALUES (?,?,?,?,?)";
    tx.executeSql(query, [codigoInspector,codigo_inspeccion,nomArchivo,directorioAudio,'Pendiente'], function(tx, res) {
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

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/*=============================================
* Funcion en donde se cuentan las filas de la tabla puertas_valores_audios [AVA]
*==============================================*/
/*function ObtenerCantidadItemsAVA(){
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM puertas_valores_audios";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Numero de filas tabla puertas_valores_audios -> '+resultSet.rows.item(0).c);
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}*/

/*=============================================
* Funcion para hacer un select a la tabla puertas_valores_audios
*==============================================*/
/*function getDataPuertasValoresAudios() {
  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,k_codinspeccion,n_audio,n_directorio FROM puertas_valores_audios";
    tx.executeSql(query, [], function (tx, resultSet) {
      for(var x = 0; x < resultSet.rows.length; x++) {
        alert("k_inspector: " + resultSet.rows.item(x).k_codusuario +
              ", k_codinspeccion: " + resultSet.rows.item(x).k_codinspeccion + 
              ", n_audio: " + resultSet.rows.item(x).n_audio + 
              ", n_directorio: " + resultSet.rows.item(x).n_directorio);
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
}*/