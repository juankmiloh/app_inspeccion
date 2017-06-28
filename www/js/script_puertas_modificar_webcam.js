jQuery(document).ready(function() {

}); 

/*=============================================
* Crear base de datos / Hacer conexion si ya esta creada
* parametros:
* var dbShell = window.openDatabase(database_name, database_version, database_displayname, database_size);
*==============================================*/
var db = window.openDatabase("montajes_inspeccion_mp", "1.0", "Inspeccion_MP", 1000000);

var pictureSource;   // picture source
var destinationType; // sets the format of returned value
var nomimage; // nombre de la imagen a guardar
var consecutivo;
var codigoItem;
var nombreImagen;
var directorioImagen;

var codigoInspector = getQueryVariable('cod_usuario');
var codigo_inspeccion = getQueryVariable('id_inspeccion');

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

/* =================================================
* Wait for device API libraries to load
* ==================================================*/
document.addEventListener("deviceready",onDeviceReady,false);

/* =================================================
* device APIs are available
* ==================================================*/
function onDeviceReady() {
  pictureSource=navigator.camera.PictureSourceType;
  destinationType=navigator.camera.DestinationType;
}

/* =================================================
* Funcion que se ejecuta cuando se oprime el boton de Iniciar Camara
* recibe como parametro el id del input
* ==================================================*/
function capturePhoto(id_input) {
  // Take picture using device camera
  var solo_id = id_input.substr(12);
  //alert(solo_id);
  window.sessionStorage.setItem("id_input_presionado_camara", solo_id);
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 100, 
    destinationType: destinationType.FILE_URI });
}

/* =================================================
* Funcion que recibe la foto
* ==================================================*/
function onPhotoURISuccess(imageURI) {
  nomimage=imageURI.substr(imageURI.lastIndexOf('/')+1); //nombre de la imagen
  createFileEntryPhoto(imageURI);
}

/* =================================================
* Funcion que crea la foto
* ==================================================*/
function createFileEntryPhoto(imageURI) {
  window.resolveLocalFileSystemURI(imageURI, copyPhoto, fail);    
}

/* =================================================
* Funcion que permite guardar la foto en el dispositivo
* ==================================================*/
function copyPhoto(fileEntry) {
  consecutivo = $("#text_consecutivo").val(); //Capturamos el consecutivo de inspeccion
  var res = consecutivo.split("-"); //separamos el consecutivo con split para obtener el codigo de inspeccion
  var codigo_inspeccion = parseInt(res[1]);//se obtiene el codigo de inspeccion y se pasa a entero para eliminar los ceros iniciales que se le colocan al consecutivo
  var cod_inspeccion = codigo_inspeccion.toString();//se vuelve a pasar a string para poder crear la carpeta en el dispositivo
  codigoItem = window.sessionStorage.getItem("id_input_presionado_camara");
  nombreImagen = consecutivo+"_"+codigoItem+"_"+nomimage;
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) { 
    fileSys.root.getDirectory("inspeccion_mp", {create: true, exclusive: false}, function(dir) { 
      dir.getDirectory("puertas", { create: true }, function (subDirEntry) {
        subDirEntry.getDirectory("fotografias", { create: true }, function (sub_subDirEntry) {
          sub_subDirEntry.getDirectory(cod_inspeccion, { create: true }, function (sub_sub_subDirEntry) {
            directorio = sub_sub_subDirEntry.fullPath; // Directorio donde queda guardada la imagen
            var str = directorio;
            directorioImagen = str.substring(0, 35);
            fileEntry.moveTo(sub_sub_subDirEntry, nombreImagen, onCopySuccessPhoto, fail);
          }, fail);
        }, fail); 
      }, fail);                    
    }, fail); 
  }, fail); 
}

/* =================================================
* Funcion que se ejecuta cuando se ha creado y copiado al dispositivo satisfactoriamente la foto
* ==================================================*/
function onCopySuccessPhoto(entry) {
  //alert(entry.fullPath); //directorio donde se guarda la imagen
  addItemspuertasValoresFotografias();
  //ObtenerCantidadItemsAVF();
  //getDatapuertasValoresFotografias();
  navigator.notification.alert("Todo salio bien la fotografía ha sido guardada!", null, "Montajes & Procesos M.P SAS", "Aceptar");
}

/* =================================================
* Funcion que se ejecuta si ocurre algun error al copiar la foto al dispositivo
* ==================================================*/
function fail(error) {
  alert(error.code);
}    

/* =================================================
* Called if something bad happens.
* ==================================================*/
function onFail(message) {
  //alert('Failed because: ' + message);
}

/*=============================================
* Funcion para insertar datos en la tabla puertas_valores_fotografias
*==============================================*/
function addItemspuertasValoresFotografias() {
  //alert(codigoInspector+" "+codigo_inspeccion+" "+codigoItem+" "+nombreImagen+" "+directorioImagen);
  db.transaction(function (tx) {
    var query = "INSERT INTO puertas_valores_fotografias (k_codusuario,k_codinspeccion,k_coditem,n_fotografia,n_directorio,o_estado_envio) VALUES (?,?,?,?,?,?)";
    tx.executeSql(query, [codigoInspector,codigo_inspeccion,codigoItem,nombreImagen,directorioImagen,'Pendiente'], function(tx, res) {
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
* Funcion en donde se cuentan las filas de la tabla puertas_valores_fotografias [AVF]
*==============================================*/
/*function ObtenerCantidadItemsAVF(){
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM puertas_valores_fotografias";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Numero de filas tabla puertas_valores_fotografias -> '+resultSet.rows.item(0).c);
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
* Funcion para hacer un select a la tabla puertas_valores_fotografias
*==============================================*/
/*function getDatapuertasValoresFotografias() {
  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,k_codinspeccion,k_coditem,n_fotografia,n_directorio FROM puertas_valores_fotografias";
    tx.executeSql(query, [], function (tx, resultSet) {
      for(var x = 0; x < resultSet.rows.length; x++) {
        alert("k_inspector: " + resultSet.rows.item(x).k_codusuario +
              ", k_codinspeccion: " + resultSet.rows.item(x).k_codinspeccion + 
              ", k_coditem: " + resultSet.rows.item(x).k_coditem +
              ", n_fotografia: " + resultSet.rows.item(x).n_fotografia +
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