$(document).ready(function($){
  //alert("script funcionando!");
});

var bandera = 0;

/*=============================================
* Al dar click al boton enviar verificamos primero que haya conexion a internet
* si no hay no se hace nada
*==============================================*/
function validarConexionInternet(){
  probar_conexion_red();
}

/*=============================================
* Funcion que permite abrir la ventana de carga
*==============================================*/
function abrirVentanaCarga(){
  location.href = "#arriba";
  $('.fb').show();
  $('.fbback').show();
  $('body').css('overflow','hidden');
}

/*=============================================
* Funcion que permite cerrar la ventana de carga
*==============================================*/
function cerrarVentanaCarga(message){
  $('#texto_carga').text('Upload...OK');
  $('.fb').hide();
  $('.fbback').hide();
  $('body').css('overflow','auto');
  if(navigator.notification && navigator.notification.alert){
    navigator.notification.alert(message, null, "Montajes & Procesos M.P SAS", "Aceptar");
    window.location='../websites/visualizar_fotografias.html';
  }else{
    alert(message);
    window.location='../websites/visualizar_fotografias.html';
  }
}

/*=============================================
* Funcion que se ejecuta luego de validar que hay conexion a internet
* Se llama la funcion verificarCamposCorreo si estos campos son iguales se verifica si hay checks seleccionados 
*==============================================*/
function enviarDatosFotografias(){
  verificarSihayChecksSeleccionadosAscensores();
}

/*=============================================
* Funcion para hacer un select a la tabla auditoria_inspecciones_ascensores y poder obtener el codigo de las inspecciones pendientes
* para asi poder saber por medio del "id" de los checks si hay alguno seleccionado ir agregando al contador la cantidad de checks seleccionados
* Si el contador(bandera) es mayor a cero se abre la ventana de carga y procedemos a obtener las inspecciones seleccionadas
* Se actualizan las respectivas tablas de cliente e informe para poder hacer uso de estos valores
*==============================================*/
function verificarSihayChecksSeleccionadosAscensores(){
  db.transaction(function (tx) {
    var query = "SELECT * FROM ascensor_valores_fotografias WHERE o_estado_envio = 'Pendiente'";
    tx.executeSql(query, [], function (tx, resultSet) {
      for(var x = 0; x < resultSet.rows.length; x++) {
        nombre_fotografia = resultSet.rows.item(x).n_fotografia;
        str = nombre_fotografia;
        res = str.split(".");
        n_fotografia = res[0];
        id_check = n_fotografia;
        if( $('#'+id_check+'').prop('checked') ) {
          bandera += 1;
        }
      }
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
    verificarSihayChecksSeleccionadosPuertas();
  });
}

/*=============================================
* Funcion para hacer un select a la tabla auditoria_inspecciones_puertas y poder obtener el codigo de las inspecciones pendientes
* para asi poder saber por medio del "id" de los checks si hay alguno seleccionado ir agregando al contador la cantidad de checks seleccionados
* Si el contador(bandera) es mayor a cero se abre la ventana de carga y procedemos a obtener las inspecciones seleccionadas
* Se actualizan las respectivas tablas de cliente e informe para poder hacer uso de estos valores
*==============================================*/
function verificarSihayChecksSeleccionadosPuertas(){
  db.transaction(function (tx) {
    var query = "SELECT * FROM puertas_valores_fotografias WHERE o_estado_envio = 'Pendiente'";
    tx.executeSql(query, [], function (tx, resultSet) {
      for(var x = 0; x < resultSet.rows.length; x++) {
        nombre_fotografia = resultSet.rows.item(x).n_fotografia;
        str = nombre_fotografia;
        res = str.split(".");
        n_fotografia = res[0];
        id_check = n_fotografia;
        //alert('#'+id_check+'');
        if( $('#'+id_check+'').prop('checked') ) {
          bandera += 1;
        }
      }
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
    verificarSihayChecksSeleccionadosEscaleras();
  });
}

/*=============================================
* Funcion para hacer un select a la tabla auditoria_inspecciones_escaleras y poder obtener el codigo de las inspecciones pendientes
* para asi poder saber por medio del "id" de los checks si hay alguno seleccionado ir agregando al contador la cantidad de checks seleccionados
* Si el contador(bandera) es mayor a cero se abre la ventana de carga y procedemos a obtener las inspecciones seleccionadas
* Se actualizan las respectivas tablas de cliente e informe para poder hacer uso de estos valores
*==============================================*/
function verificarSihayChecksSeleccionadosEscaleras(){
  db.transaction(function (tx) {
    var query = "SELECT * FROM escaleras_valores_fotografias WHERE o_estado_envio = 'Pendiente'";
    tx.executeSql(query, [], function (tx, resultSet) {
      for(var x = 0; x < resultSet.rows.length; x++) {
        nombre_fotografia = resultSet.rows.item(x).n_fotografia;
        str = nombre_fotografia;
        res = str.split(".");
        n_fotografia = res[0];
        id_check = n_fotografia;
        //alert('#'+id_check+'');
        if( $('#'+id_check+'').prop('checked') ) {
          bandera += 1;
        }
      }
      if (bandera > 0) {
        //alert(bandera);
        location.href = "#arriba";
        abrirVentanaCarga();
        $('#texto_carga').text('Verificando fotografías...Espere');
        obtenerArchivosSeleccionadosAscensores();
      }else{
        $('#btn_enviar').show("slow"); //mostrar boton
        swal(
          'Error...',
          'Debe seleccionar al menos una fotografía!',
          'error'
        );
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

var cantidad_archivos_ascensores = 0;
var pila_fotos_ascensores = new Stack();
var bandera_fotos_ascensores = 0;
/*=============================================
* Funcion para hacer un select a la tabla ascensor_valores_fotografias[AVFG] que recibe por parametro el codigo de la inspeccion
* Se envian los archivos fotográficos al servidor
*==============================================*/
function obtenerArchivosSeleccionadosAscensores(){
  $('#texto_carga').text('Cargando archivos fotográficos...Espere');
  db.transaction(function (tx) {
    var query = "SELECT * FROM ascensor_valores_fotografias WHERE o_estado_envio = ?";
    tx.executeSql(query, ['Pendiente'], function (tx, resultSet) {
      try{
        for(var x = 0; x < resultSet.rows.length; x++) {
          nombre_fotografia = resultSet.rows.item(x).n_fotografia;

          str = nombre_fotografia;
          res = str.split(".");
          n_fotografia = res[0];
          var id_check = n_fotografia;

          if( $('#'+id_check+'').prop('checked') ) {
            //alert('checkBox'+id_check+' esta seleccionado!');
            pila_fotos_ascensores.add(nombre_fotografia);
            cantidad_archivos_ascensores += 1;
          }
        }
      }catch(err) {
        //alert(err.message);
      }
      enviarArchivosFotograficosAscensores();
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
* Funcion para hacer un select a la tabla ascensor_valores_fotografias[AVFG] que recibe por parametro el codigo de la inspeccion
* Se envian los archivos fotográficos al servidor
*==============================================*/
function enviarArchivosFotograficosAscensores(){
  if (pila_fotos_ascensores.hasElements()) {
    $('#texto_carga').text('Cargando archivos fotográficos...Espere');
    var arreglo_AVFG = new Array();
    var json_AVFG;
    var nombre_foto_selec = pila_fotos_ascensores.getTopElement();
    db.transaction(function (tx) {
      var query = "SELECT * FROM ascensor_valores_fotografias WHERE o_estado_envio = ? AND n_fotografia = ?";
      tx.executeSql(query, ['Pendiente',nombre_foto_selec], function (tx, resultSet) {
        try{
          for(var x = 0; x < resultSet.rows.length; x++) {
            cod_usuario = resultSet.rows.item(x).k_codusuario;
            codigo_inspeccion = resultSet.rows.item(x).k_codinspeccion;
            cod_item = resultSet.rows.item(x).k_coditem;
            nombre_directorio = resultSet.rows.item(x).n_directorio;
            nombre_fotografia = resultSet.rows.item(x).n_fotografia;
            o_estado_envio = resultSet.rows.item(x).o_estado_envio;

            str = nombre_fotografia;
            res = str.split(".");
            n_fotografia = res[0];
            var id_check = n_fotografia;

            //alert('checkBox'+id_check+' esta seleccionado!');
            var item = new Object(); //nuevo objeto siempre que entre al for
            item.cod_usuario = cod_usuario;
            item.cod_inspeccion = codigo_inspeccion;
            item.cod_item = cod_item;
            item.nombre_fotografia = nombre_fotografia;
            item.nombre_directorio = nombre_directorio;
            item.o_estado_envio = o_estado_envio;

            arreglo_AVFG.push(item);

            pila_fotos_ascensores.pop();

            json_AVFG = JSON.stringify(arreglo_AVFG); //Convertimos el arreglo a formato json
            //enviarInspeccionesSeleccionadasAscensores(cod_usuario,codigo_inspeccion,cod_item,nombre_fotografia,json_AVFG,cantidad_archivos_ascensores);
            uploadFotoAscensores(nombre_directorio,nombre_fotografia,cod_usuario,codigo_inspeccion,cod_item,cantidad_archivos_ascensores,json_AVFG);
          }
        }catch(err) {
          //alert(err.message);
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
  }else{
    /* Si bandera bandera_fotos_ascensores llega a ser igual a la cantidad de fotos a subir al servidor se puede proseguir a llamar la funcion de puertas */
    if (bandera_fotos_ascensores == cantidad_archivos_ascensores) {
      $('#texto_carga').text(cantidad_archivos_ascensores + " fotos subidas...ok");
      obtenerArchivosSeleccionadosPuertas();
    }else{
      enviarArchivosFotograficosAscensores();
    }
    //obtenerArchivosSeleccionadosPuertas();
  }
}

/*=============================================
* Funcion que permite subir los archivos fotográficos al servidor
*==============================================*/
function uploadFotoAscensores(directorio,nombre_archivo,cod_usuario,codi_inspeccion,cod_item,cantidad_archivos_ascensores,json) {
  //var directorio = "file:///storage/emulated/0"+directorio;
  var directorio = "file:///sdcard"+directorio;
  var nombreDeArchivo = nombre_archivo;
  var codigo_inspeccion = parseInt(codi_inspeccion);//se obtiene el codigo de inspeccion y se pasa a entero para eliminar los ceros iniciales que se le colocan al consecutivo
  var cod_inspeccion = codigo_inspeccion.toString();//se vuelve a pasar a string para poder acceder a la carpeta en el dispositivo
  var fileURL = directorio + "/" + cod_inspeccion + "/" + nombreDeArchivo;

  var win = function (r) {
    console.log("Successful upload...");
    console.log("Code = " + r.responseCode);
    enviarInspeccionesSeleccionadasAscensores(cod_usuario,codi_inspeccion,cod_item,nombre_archivo,json);
    carpeta = directorio + "/" + cod_inspeccion;
    borrarArchivo(carpeta, nombreDeArchivo);
    $('#texto_carga').text("Foto ascensor "+nombre_archivo+" subida...ok");
    bandera_fotos_ascensores += 1;
  }

  var fail = function (error) {
    //alert("No hay fotos de ascensores a ser cargadas! Code = " + error.code);
    enviarInspeccionesSeleccionadasAscensores(cod_usuario,codi_inspeccion,cod_item,nombre_archivo,json);
    $('#texto_carga').text("Datos foto "+nombre_archivo+" cargados...ok");
    bandera_fotos_ascensores += 1;
  }

  var uri = encodeURI("http://192.168.0.26:8080/inspeccion/servidor/php/ascensor_upload_fotografias.php");

  var options = new FileUploadOptions();
  options.fileKey="file";
  options.fileName=fileURL.substr(fileURL.lastIndexOf('/')+1);
  options.mimeType="image/jpg";

  var headers={'headerParam':'headerValue'};

  options.headers = headers;

  var ft = new FileTransfer();
  ft.onprogress = function(progressEvent) {
    if (progressEvent.lengthComputable) {
      loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
    } else {
      loadingStatus.increment();
    }
  };
  ft.upload(fileURL, uri, win, fail, options);
};

function borrarArchivo(directorio, nombreDeArchivo){
  //alert("entro a borrar"+directorio+" "+nombreDeArchivo);
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
* Funcion que se ejecuta al terminar de enviar por sesion todos los JSON con los distintos valores de la inspeccion
* Esta funcion obtiene los JSON con los valores de la inspeccion y los envia al servidor, si el servidor ejecuta con 
* exito todos los insert SQL devuelve un "0", si es asi se actualiza la tabla de auditoria de la inspeccion y
* se llama a ejecucion de nuevo la funcion "obtenerInspeccionesSeleccionadasAscensores" para continuar hacer de nuevo el proceso si queda alguna inspeccion
* con estado pendiente (Al ejecutar esta funcion en el servidor se crea el respectivo PDF de la inspeccion)
*==============================================*/
function enviarInspeccionesSeleccionadasAscensores(cod_usuario,cod_inspeccion,cod_item,n_fotografia,json,cantidad_archivos_ascensores){
  $('#texto_carga').text('Enviando fotografía '+n_fotografia+'...Espere');
  $.post('http://192.168.0.26:8080/inspeccion/servidor/php/ascensor_guardar_datos_lista_inspeccion.php',{
    json_AVFG: json
  },function(e){
    //alert("enviarInspeccionesSeleccionadasAscensores-> "+e);
    if (e == 0) {
      $('#texto_carga').text('Fotografía '+n_fotografia+'...subida oK!');
      updateItemsAscensorValoresFotografias(cod_usuario,cod_inspeccion,cod_item,n_fotografia,'Enviada');
    }else{
      cerrarVentanaCarga("Ocurrio un error al enviar los datos al servidor! enviarInspeccionesSeleccionadasAscensores\n\nCódigo de error: "+e);
    }
  });
}

/*=============================================
* Funcion para actualizar una fila en la tabla ascensor_valores_fotografias para cuando se vuelva a enviar la inspeccion de revision no se dupliquen las fotos
*==============================================*/
function updateItemsAscensorValoresFotografias(k_codusuario,k_codinspeccion,k_coditem,n_fotografia,o_estado_envio) {
  //alert("update updateItemsAscensorValoresFotografias");
  db.transaction(function (tx) {
    var query = "UPDATE ascensor_valores_fotografias SET o_estado_envio = ? "+
                                                        "WHERE k_codusuario = ? "+
                                                        "AND k_codinspeccion = ? "+
                                                        "AND k_coditem = ? "+
                                                        "AND n_fotografia = ?";
    tx.executeSql(query, [o_estado_envio,k_codusuario,k_codinspeccion,k_coditem,n_fotografia], function(tx, res) {
      console.log("rowsAffected updateItemsAscensorValoresFotografias: " + res.rowsAffected);
      enviarArchivosFotograficosAscensores(); //volvemos a llamar la funcion de envio de fotografias para verificar si hay mas seleccionadas
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

var cantidad_archivos_puertas = 0;
var pila_fotos_puertas = new Stack();
var bandera_fotos_puertas = 0;
/*=============================================
* Funcion para hacer un select a la tabla puertas_valores_fotografias[PVFG] que recibe por parametro el codigo de la inspeccion
* Se envian los archivos fotográficos al servidor
*==============================================*/
function obtenerArchivosSeleccionadosPuertas(){
  $('#texto_carga').text('Cargando archivos fotográficos...Espere');
  db.transaction(function (tx) {
    var query = "SELECT * FROM puertas_valores_fotografias WHERE o_estado_envio = ?";
    tx.executeSql(query, ['Pendiente'], function (tx, resultSet) {
      try{
        for(var x = 0; x < resultSet.rows.length; x++) {
          nombre_fotografia = resultSet.rows.item(x).n_fotografia;

          str = nombre_fotografia;
          res = str.split(".");
          n_fotografia = res[0];
          var id_check = n_fotografia;

          if( $('#'+id_check+'').prop('checked') ) {
            //alert('checkBox'+id_check+' esta seleccionado!');
            pila_fotos_puertas.add(nombre_fotografia);
            cantidad_archivos_puertas += 1;
          }
        }
      }catch(err) {
        //alert(err.message);
      }
      enviarArchivosFotograficosPuertas();
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
* Funcion para hacer un select a la tabla puertas_valores_fotografias[PVFG] que recibe por parametro el codigo de la inspeccion
* Se envian los archivos fotográficos al servidor
*==============================================*/
function enviarArchivosFotograficosPuertas(){
  if (pila_fotos_puertas.hasElements()) {
    $('#texto_carga').text('Cargando archivos fotográficos...Espere');
    var arreglo_PVFG = new Array();
    var json_PVFG;
    var nombre_foto_selec = pila_fotos_puertas.getTopElement();
    db.transaction(function (tx) {
      var query = "SELECT * FROM puertas_valores_fotografias WHERE o_estado_envio = ? AND n_fotografia = ?";
      tx.executeSql(query, ['Pendiente',nombre_foto_selec], function (tx, resultSet) {
        try{
          for(var x = 0; x < resultSet.rows.length; x++) {
            cod_usuario = resultSet.rows.item(x).k_codusuario;
            codigo_inspeccion = resultSet.rows.item(x).k_codinspeccion;
            cod_item = resultSet.rows.item(x).k_coditem;
            nombre_directorio = resultSet.rows.item(x).n_directorio;
            nombre_fotografia = resultSet.rows.item(x).n_fotografia;
            o_estado_envio = resultSet.rows.item(x).o_estado_envio;

            str = nombre_fotografia;
            res = str.split(".");
            n_fotografia = res[0];
            var id_check = n_fotografia;

            //alert('checkBox'+id_check+' esta seleccionado!');
            var item = new Object(); //nuevo objeto siempre que entre al for
            item.cod_usuario = cod_usuario;
            item.cod_inspeccion = codigo_inspeccion;
            item.cod_item = cod_item;
            item.nombre_fotografia = nombre_fotografia;
            item.nombre_directorio = nombre_directorio;
            item.o_estado_envio = o_estado_envio;

            arreglo_PVFG.push(item);

            pila_fotos_puertas.pop();

            json_PVFG = JSON.stringify(arreglo_PVFG); //Convertimos el arreglo a formato json
            //enviarInspeccionesSeleccionadasPuertas(cod_usuario,codigo_inspeccion,cod_item,nombre_fotografia,json_PVFG,cantidad_archivos_puertas);
            uploadFotoPuertas(nombre_directorio,nombre_fotografia,cod_usuario,codigo_inspeccion,cod_item,cantidad_archivos_puertas,json_PVFG);
          }
        }catch(err) {
          //alert(err.message);
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
  }else{
    /* Si bandera bandera_fotos_puertas llega a ser igual a la cantidad de fotos a subir al servidor se puede proseguir a llamar la funcion de escaleras */
    if (bandera_fotos_puertas == cantidad_archivos_puertas) {
      $('#texto_carga').text(cantidad_archivos_puertas + " fotos subidas...ok");
      obtenerArchivosSeleccionadosEscaleras();
    }else{
      enviarArchivosFotograficosPuertas();
    }    
    //obtenerArchivosSeleccionadosEscaleras();
  }
}

/*=============================================
* Funcion que permite subir los archivos fotográficos al servidor
*==============================================*/
function uploadFotoPuertas(directorio,nombre_archivo,cod_usuario,codi_inspeccion,cod_item,cantidad_archivos_puertas,json) {
  //var directorio = "file:///storage/emulated/0"+directorio;
  var directorio = "file:///sdcard"+directorio;
  var nombreDeArchivo = nombre_archivo;
  var codigo_inspeccion = parseInt(codi_inspeccion);//se obtiene el codigo de inspeccion y se pasa a entero para eliminar los ceros iniciales que se le colocan al consecutivo
  var cod_inspeccion = codigo_inspeccion.toString();//se vuelve a pasar a string para poder acceder a la carpeta en el dispositivo
  var fileURL = directorio + "/" + cod_inspeccion + "/" + nombreDeArchivo;

  var win = function (r) {
    console.log("Successful upload...");
    console.log("Code = " + r.responseCode);
    enviarInspeccionesSeleccionadasPuertas(cod_usuario,codi_inspeccion,cod_item,nombre_archivo,json);
    carpeta = directorio + "/" + cod_inspeccion;
    borrarArchivo(carpeta, nombreDeArchivo);
    $('#texto_carga').text("Foto puertas "+nombre_archivo+" subida...ok");
    bandera_fotos_puertas += 1;
  }

  var fail = function (error) {
    //alert("No hay fotos de puertas a ser cargadas! Code = " + error.code);
    enviarInspeccionesSeleccionadasPuertas(cod_usuario,codi_inspeccion,cod_item,nombre_archivo,json);
    $('#texto_carga').text("Datos foto "+nombre_archivo+" cargados...ok");
    bandera_fotos_puertas += 1;
  }

  var uri = encodeURI("http://192.168.0.26:8080/inspeccion/servidor/php/puertas_upload_fotografias.php");

  var options = new FileUploadOptions();
  options.fileKey="file";
  options.fileName=fileURL.substr(fileURL.lastIndexOf('/')+1);
  options.mimeType="image/jpg";

  var headers={'headerParam':'headerValue'};

  options.headers = headers;

  var ft = new FileTransfer();
  ft.onprogress = function(progressEvent) {
    if (progressEvent.lengthComputable) {
      loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
    } else {
      loadingStatus.increment();
    }
  };
  ft.upload(fileURL, uri, win, fail, options);
};

function borrarArchivo(directorio, nombreDeArchivo){
  //alert("entro a borrar"+directorio+" "+nombreDeArchivo);
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
* Funcion que se ejecuta al terminar de enviar por sesion todos los JSON con los distintos valores de la inspeccion
* Esta funcion obtiene los JSON con los valores de la inspeccion y los envia al servidor, si el servidor ejecuta con 
* exito todos los insert SQL devuelve un "0", si es asi se actualiza la tabla de auditoria de la inspeccion y
* se llama a ejecucion de nuevo la funcion "obtenerInspeccionesSeleccionadaspuertas" para continuar hacer de nuevo el proceso si queda alguna inspeccion
* con estado pendiente (Al ejecutar esta funcion en el servidor se crea el respectivo PDF de la inspeccion)
*==============================================*/
function enviarInspeccionesSeleccionadasPuertas(cod_usuario,cod_inspeccion,cod_item,n_fotografia,json,cantidad_archivos_puertas){
  $('#texto_carga').text('Enviando fotografía '+n_fotografia+'...Espere');
  $.post('http://192.168.0.26:8080/inspeccion/servidor/php/puertas_guardar_datos_lista_inspeccion.php',{
    json_PVFG: json
  },function(e){
    //alert("enviarInspeccionesSeleccionadaspuertas-> "+e);
    if (e == 0) {
      $('#texto_carga').text('Fotografía '+n_fotografia+'...subida oK!');
      updateItemsPuertasValoresFotografias(cod_usuario,cod_inspeccion,cod_item,n_fotografia,'Enviada');
    }else{
      cerrarVentanaCarga("Ocurrio un error al enviar los datos al servidor! enviarInspeccionesSeleccionadaspuertas\n\nCódigo de error: "+e);
    }
  });
}

/*=============================================
* Funcion para actualizar una fila en la tabla puertas_valores_fotografias para cuando se vuelva a enviar la inspeccion de revision no se dupliquen las fotos
*==============================================*/
function updateItemsPuertasValoresFotografias(k_codusuario,k_codinspeccion,k_coditem,n_fotografia,o_estado_envio) {
  //alert("update updateItemsPuertasValoresFotografias");
  db.transaction(function (tx) {
    var query = "UPDATE puertas_valores_fotografias SET o_estado_envio = ? "+
                                                        "WHERE k_codusuario = ? "+
                                                        "AND k_codinspeccion = ? "+
                                                        "AND k_coditem = ? "+
                                                        "AND n_fotografia = ?";
    tx.executeSql(query, [o_estado_envio,k_codusuario,k_codinspeccion,k_coditem,n_fotografia], function(tx, res) {
      console.log("rowsAffected updateItemspuertasValoresFotografias: " + res.rowsAffected);
      enviarArchivosFotograficosPuertas(); //volvemos a llamar la funcion de envio de fotografias para verificar si hay mas seleccionadas
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

var cantidad_archivos_escaleras = 0;
var pila_fotos_escaleras = new Stack();
var bandera_fotos_escaleras = 0;
/*=============================================
* Funcion para hacer un select a la tabla escaleras_valores_fotografias[EVFG] que recibe por parametro el codigo de la inspeccion
* Se envian los archivos fotográficos al servidor
*==============================================*/
function obtenerArchivosSeleccionadosEscaleras(){
  $('#texto_carga').text('Cargando archivos fotográficos...Espere');
  db.transaction(function (tx) {
    var query = "SELECT * FROM escaleras_valores_fotografias WHERE o_estado_envio = ?";
    tx.executeSql(query, ['Pendiente'], function (tx, resultSet) {
      try{
        for(var x = 0; x < resultSet.rows.length; x++) {
          nombre_fotografia = resultSet.rows.item(x).n_fotografia;

          str = nombre_fotografia;
          res = str.split(".");
          n_fotografia = res[0];
          var id_check = n_fotografia;

          if( $('#'+id_check+'').prop('checked') ) {
            //alert('checkBox'+id_check+' esta seleccionado!');
            pila_fotos_escaleras.add(nombre_fotografia);
            cantidad_archivos_escaleras += 1;
          }
        }
      }catch(err) {
        //alert(err.message);
      }
      enviarArchivosFotograficosEscaleras();
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
* Funcion para hacer un select a la tabla escaleras_valores_fotografias[EVFG] que recibe por parametro el codigo de la inspeccion
* Se envian los archivos fotográficos al servidor
*==============================================*/
function enviarArchivosFotograficosEscaleras(){
  if (pila_fotos_escaleras.hasElements()) {
    $('#texto_carga').text('Cargando archivos fotográficos...Espere');
    var arreglo_EVFG = new Array();
    var json_EVFG;
    var nombre_foto_selec = pila_fotos_escaleras.getTopElement();
    db.transaction(function (tx) {
      var query = "SELECT * FROM escaleras_valores_fotografias WHERE o_estado_envio = ? AND n_fotografia = ?";
      tx.executeSql(query, ['Pendiente',nombre_foto_selec], function (tx, resultSet) {
        try{
          for(var x = 0; x < resultSet.rows.length; x++) {
            cod_usuario = resultSet.rows.item(x).k_codusuario;
            codigo_inspeccion = resultSet.rows.item(x).k_codinspeccion;
            cod_item = resultSet.rows.item(x).k_coditem;
            nombre_directorio = resultSet.rows.item(x).n_directorio;
            nombre_fotografia = resultSet.rows.item(x).n_fotografia;
            o_estado_envio = resultSet.rows.item(x).o_estado_envio;

            str = nombre_fotografia;
            res = str.split(".");
            n_fotografia = res[0];
            var id_check = n_fotografia;

            //alert('checkBox'+id_check+' esta seleccionado!');
            var item = new Object(); //nuevo objeto siempre que entre al for
            item.cod_usuario = cod_usuario;
            item.cod_inspeccion = codigo_inspeccion;
            item.cod_item = cod_item;
            item.nombre_fotografia = nombre_fotografia;
            item.nombre_directorio = nombre_directorio;
            item.o_estado_envio = o_estado_envio;

            arreglo_EVFG.push(item);

            pila_fotos_escaleras.pop();

            json_EVFG = JSON.stringify(arreglo_EVFG); //Convertimos el arreglo a formato json
          }
        }catch(err) {
          //alert(err.message);
        }
        //enviarInspeccionesSeleccionadasEscaleras(cod_usuario,codigo_inspeccion,cod_item,nombre_fotografia,json_EVFG,cantidad_archivos_escaleras);
        uploadFotoEscaleras(nombre_directorio,nombre_fotografia,cod_usuario,codigo_inspeccion,cod_item,cantidad_archivos_escaleras,json_EVFG);
      },
      function (tx, error) {
        console.log('SELECT error: ' + error.message);
      });
    }, function (error) {
      console.log('transaction error: ' + error.message);
    }, function () {
      console.log('transaction ok');
    });
  }else{
    /* Si bandera bandera_fotos_escaleras llega a ser igual a la cantidad de fotos a subir al servidor se puede proseguir a llamar la funcion de subir audios */
    if (bandera_fotos_escaleras == cantidad_archivos_escaleras) {
      cantidad_fotos_subidas = cantidad_archivos_ascensores+cantidad_archivos_puertas+cantidad_archivos_escaleras;
      $('#texto_carga').text(cantidad_fotos_subidas + " fotos subidas...ok");
      window.location='./visualizar_fotografias.html';
    }else{
      enviarArchivosFotograficosEscaleras();
    }    
    //window.location='./visualizar_fotografias.html';
  }
}

/*=============================================
* Funcion que permite subir los archivos fotográficos al servidor
*==============================================*/
function uploadFotoEscaleras(directorio,nombre_archivo,cod_usuario,codi_inspeccion,cod_item,cantidad_archivos_escaleras,json) {
  //var directorio = "file:///storage/emulated/0"+directorio;
  var directorio = "file:///sdcard"+directorio;
  var nombreDeArchivo = nombre_archivo;
  var codigo_inspeccion = parseInt(codi_inspeccion);//se obtiene el codigo de inspeccion y se pasa a entero para eliminar los ceros iniciales que se le colocan al consecutivo
  var cod_inspeccion = codigo_inspeccion.toString();//se vuelve a pasar a string para poder acceder a la carpeta en el dispositivo
  var fileURL = directorio + "/" + cod_inspeccion + "/" + nombreDeArchivo;

  var win = function (r) {
    console.log("Successful upload...");
    console.log("Code = " + r.responseCode);
    enviarInspeccionesSeleccionadasEscaleras(cod_usuario,codi_inspeccion,cod_item,nombre_archivo,json);
    carpeta = directorio + "/" + cod_inspeccion;
    borrarArchivo(carpeta, nombreDeArchivo);
    $('#texto_carga').text("Foto escaleras "+nombre_archivo+" subida...ok");
    bandera_fotos_escaleras += 1;
  }

  var fail = function (error) {
    //alert("No existe la foto de puertas en el dispositivo! Code = " + error.code);
    enviarInspeccionesSeleccionadasEscaleras(cod_usuario,codi_inspeccion,cod_item,nombre_archivo,json);
    $('#texto_carga').text("Datos foto "+nombre_archivo+" cargados...ok");
    bandera_fotos_escaleras += 1;
  }

  var uri = encodeURI("http://192.168.0.26:8080/inspeccion/servidor/php/escaleras_upload_fotografias.php");

  var options = new FileUploadOptions();
  options.fileKey="file";
  options.fileName=fileURL.substr(fileURL.lastIndexOf('/')+1);
  options.mimeType="image/jpg";

  var headers={'headerParam':'headerValue'};

  options.headers = headers;

  var ft = new FileTransfer();
  ft.onprogress = function(progressEvent) {
    if (progressEvent.lengthComputable) {
      loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
    } else {
      loadingStatus.increment();
    }
  };
  ft.upload(fileURL, uri, win, fail, options);
};

function borrarArchivo(directorio, nombreDeArchivo){
  //alert("entro a borrar"+directorio+" "+nombreDeArchivo);
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
* Funcion que se ejecuta al terminar de enviar por sesion todos los JSON con los distintos valores de la inspeccion
* Esta funcion obtiene los JSON con los valores de la inspeccion y los envia al servidor, si el servidor ejecuta con 
* exito todos los insert SQL devuelve un "0", si es asi se actualiza la tabla de auditoria de la inspeccion y
* se llama a ejecucion de nuevo la funcion "obtenerInspeccionesSeleccionadasescaleras" para continuar hacer de nuevo el proceso si queda alguna inspeccion
* con estado pendiente (Al ejecutar esta funcion en el servidor se crea el respectivo PDF de la inspeccion)
*==============================================*/
function enviarInspeccionesSeleccionadasEscaleras(cod_usuario,cod_inspeccion,cod_item,n_fotografia,json,cantidad_archivos_escaleras){
  $('#texto_carga').text('Enviando fotografía '+n_fotografia+'...Espere');
  $.post('http://192.168.0.26:8080/inspeccion/servidor/php/escaleras_guardar_datos_lista_inspeccion.php',{
    json_EVFG: json
  },function(e){
    //alert("enviarInspeccionesSeleccionadasescaleras-> "+e);
    if (e == 0) {
      $('#texto_carga').text('Fotografía '+n_fotografia+'...subida oK!');
      updateItemsEscalerasValoresFotografias(cod_usuario,cod_inspeccion,cod_item,n_fotografia,'Enviada');
    }else{
      cerrarVentanaCarga("Ocurrio un error al enviar los datos al servidor! enviarInspeccionesSeleccionadasescaleras\n\nCódigo de error: "+e);
    }
  });
}

/*=============================================
* Funcion para actualizar una fila en la tabla escaleras_valores_fotografias para cuando se vuelva a enviar la inspeccion de revision no se dupliquen las fotos
*==============================================*/
function updateItemsEscalerasValoresFotografias(k_codusuario,k_codinspeccion,k_coditem,n_fotografia,o_estado_envio) {
  //alert("update updateItemsescalerasValoresFotografias");
  db.transaction(function (tx) {
    var query = "UPDATE escaleras_valores_fotografias SET o_estado_envio = ? "+
                                                        "WHERE k_codusuario = ? "+
                                                        "AND k_codinspeccion = ? "+
                                                        "AND k_coditem = ? "+
                                                        "AND n_fotografia = ?";
    tx.executeSql(query, [o_estado_envio,k_codusuario,k_codinspeccion,k_coditem,n_fotografia], function(tx, res) {
      console.log("rowsAffected updateItemsescalerasValoresFotografias: " + res.rowsAffected);
      enviarArchivosFotograficosEscaleras(); //volvemos a llamar la funcion de envio de fotografias para verificar si hay mas seleccionadas
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

function Stack() {
  var elements = [];

  this.add = add;
  this.pop = pop;
  this.getTopElement = getTopElement;
  this.hasElements = hasElements;
  this.removeAll = removeAll;
  this.size = size;

  function add(element) {
    elements.push(element);
  }

  function pop() {
    return elements.pop();
  }

  function getTopElement() {
    return elements[elements.length - 1];
  }

  function hasElements() {
    return elements.length > 0;
  }

  function removeAll() {
    elements = [];
  }

  function size() {
    return elements.length;
  }
}

/*=============================================
******** VERIFICAR CONEXION A INTERNET ********
*==============================================*/

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

/*=============================================
* Si tenemos conexion a internet permite cargar los valores de la inspeccion al servidor
*==============================================*/
function valor_conexion(conexion) {
  if (conexion==1) {
    //alert("Hay conexion conexión a internet!");
    enviarDatosFotografias();
  } else {
    if(navigator.notification && navigator.notification.alert){
      navigator.notification.alert("No tiene conexión a internet!", null, "Montajes & Procesos M.P SAS", "Ok");
      $('#btn_enviar').show("fast"); //mostrar boton
    }else{
      alert("No tiene conexión a internet!");
      $('#btn_enviar').show("fast"); //mostrar boton
    }
  }
}