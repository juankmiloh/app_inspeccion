$(document).ready(function($){
  //alert("script funcionando!");
  limpiarJsonSessionClienteInforme();
  // addItemsAscensorValoresAudios(1);
  // addItemsInformeValoresAudios();2
  //addItemsEscalerasValoresAudios("003");
  // $("#btn_enviar").click(function(){
  //   $('#btn_enviar').hide("slow"); //esconder boton
  // });
});

/*=============================================
* Funcion que permite eliminar las variables de sesion creadas con los JSON de los datos del cliente e informe
*==============================================*/
function limpiarJsonSessionClienteInforme(){
  window.sessionStorage.removeItem("json_cliente");
  window.sessionStorage.removeItem("json_informe");
  window.sessionStorage.removeItem("json_IVA");
}

var bandera = 0;













/*=============================================
* Funcion para insertar datos en la tabla informe_valores_audios
*==============================================*/
function addItemsInformeValoresAudios() {
  var codigo_informe = window.sessionStorage.getItem("cantidadInformes"); //Se coloca aca para que despues de apretar el btn iniciar grabadora actualice el valor de la variable de sesion
  //alert(codigoInspector+" "+codigo_informe+" "+nomAudio);
  db.transaction(function (tx) {
    var query = "INSERT INTO informe_valores_audios (k_codusuario,k_codinforme,n_audio,n_directorio,o_estado_envio) VALUES (?,?,?,?,?)";
    tx.executeSql(query, ["codigoInspector","codigo_informe","nomArchivo","directorioAudio",'Pendiente'], function(tx, res) {
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
* Funcion para insertar datos en la tabla ascensor_valores_audios
*==============================================*/
function addItemsAscensorValoresAudios(codigo_inspeccion) {
  db.transaction(function (tx) {
    var query = "INSERT INTO ascensor_valores_audios (k_codusuario,k_codinspeccion,n_audio,n_directorio,o_estado_envio) VALUES (?,?,?,?,?)";
    tx.executeSql(query, ["25",codigo_inspeccion,"nomArchivo","directorioAudio",'Pendiente'], function(tx, res) {
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
* Funcion para insertar datos en la tabla escaleras_valores_audios
*==============================================*/
function addItemsEscalerasValoresAudios(codigo_inspeccion) {
  db.transaction(function (tx) {
    var query = "INSERT INTO escaleras_valores_audios (k_codusuario,k_codinspeccion,n_audio,n_directorio,o_estado_envio) VALUES (?,?,?,?,?)";
    tx.executeSql(query, ["1",codigo_inspeccion,"nomArchivo","directorioAudio",'Pendiente'], function(tx, res) {
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
  window.location='./visualizar_inspecciones.html';
}

/*=============================================
* Funcion que permite validar que en los campos de correo se introduzca el mismo e-mail
*==============================================*/
function verificarCamposCorreo(){
  var str = $('#email').val();
  var n = str.indexOf('@');
  var retorno = 0;

  var str = $('#email_confirmacion').val();
  var n1 = str.indexOf('@');
  if ($('#email').val()!="" && n!=-1) {
    if ($('#email_confirmacion').val()!="" && n1!=-1) {
      if ($('#email').val() == $('#email_confirmacion').val()) {
        //alert("Correcto!");
        retorno = true;
      }else{
        //alert("Los correos no coinciden!");
        $('#btn_enviar').show("slow"); //esconder boton
        retorno = false;
      }
    }
  }
  return retorno;
}

/*=============================================
* Funcion que permite eliminar las variables de sesion creadas con los JSON de los valores de la inspeccion
*==============================================*/

function limpiarVariablesJsonSessionLista(){
  //VARIABLES DE SESION DE ASCENSORES
  window.sessionStorage.removeItem("json_AVA");
  window.sessionStorage.removeItem("json_AVC");
  window.sessionStorage.removeItem("json_AVE");
  window.sessionStorage.removeItem("json_AVOF");
  window.sessionStorage.removeItem("json_AVF");
  window.sessionStorage.removeItem("json_AVI");
  window.sessionStorage.removeItem("json_AVM");
  window.sessionStorage.removeItem("json_AVP");
  window.sessionStorage.removeItem("json_AVPRE");
  window.sessionStorage.removeItem("json_AVPP");

  //VARIABLES DE SESION DE PUERTAS
  window.sessionStorage.removeItem("json_PVA");
  window.sessionStorage.removeItem("json_PVM");
  window.sessionStorage.removeItem("json_PVEL");
  window.sessionStorage.removeItem("json_PVMO");
  window.sessionStorage.removeItem("json_PVO");
  window.sessionStorage.removeItem("json_PVMA");
  window.sessionStorage.removeItem("json_PVE");
  window.sessionStorage.removeItem("json_PVOF");
  window.sessionStorage.removeItem("json_PVI");
  window.sessionStorage.removeItem("json_PVPRE");
  window.sessionStorage.removeItem("json_PVPP");

  //VARIABLES DE SESION DE ESCALERAS
  window.sessionStorage.removeItem("json_EVA");
  window.sessionStorage.removeItem("json_EVD");
  window.sessionStorage.removeItem("json_EVE");
  window.sessionStorage.removeItem("json_EVOF");
  window.sessionStorage.removeItem("json_EVI");
  window.sessionStorage.removeItem("json_EVPRE");
  window.sessionStorage.removeItem("json_EVPP");
}

/*=============================================
* Funcion que se ejecuta luego de validar que hay conexion a internet
* Se llama la funcion verificarCamposCorreo si estos campos son iguales se verifica si hay checks seleccionados 
*==============================================*/
function guardarDatosInforme(){  
  if(verificarCamposCorreo()){
    verificarSihayChecksSeleccionadosAscensores();
  }else{
    alert("Error: Los campos de correo electrónico no coinciden.");
    $("#email").focus();
  }
}

/*=============================================
* Funcion para hacer un select a la tabla auditoria_inspecciones_ascensores y poder obtener el codigo de las inspecciones pendientes
* para asi poder saber por medio del "id" de los checks si hay alguno seleccionado ir agregando al contador la cantidad de checks seleccionados
* Si el contador(bandera) es mayor a cero se abre la ventana de carga y procedemos a obtener las inspecciones seleccionadas
* Se actualizan las respectivas tablas de cliente e informe para poder hacer uso de estos valores
*==============================================*/
function verificarSihayChecksSeleccionadosAscensores(){
  db.transaction(function (tx) {
    var query = "SELECT * FROM auditoria_inspecciones_ascensores WHERE o_estado_envio = 'Pendiente'";
    tx.executeSql(query, [], function (tx, resultSet) {
      for(var x = 0; x < resultSet.rows.length; x++) {
        var codigo_usuario = resultSet.rows.item(x).k_codusuario;
        var codigo_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        var id_check = 'asc-'+codigo_usuario+'-'+codigo_inspeccion;
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
    var query = "SELECT * FROM auditoria_inspecciones_puertas WHERE o_estado_envio = 'Pendiente'";
    tx.executeSql(query, [], function (tx, resultSet) {
      for(var x = 0; x < resultSet.rows.length; x++) {
        var codigo_usuario = resultSet.rows.item(x).k_codusuario;
        var codigo_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        var id_check = 'put-'+codigo_usuario+'-'+codigo_inspeccion;
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
    var query = "SELECT * FROM auditoria_inspecciones_escaleras WHERE o_estado_envio = 'Pendiente'";
    tx.executeSql(query, [], function (tx, resultSet) {
      for(var x = 0; x < resultSet.rows.length; x++) {
        var codigo_usuario = resultSet.rows.item(x).k_codusuario;
        var codigo_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        var id_check = 'esc-'+codigo_usuario+'-'+codigo_inspeccion;
        //alert('#'+id_check+'');
        if( $('#'+id_check+'').prop('checked') ) {
          bandera += 1;
        }
      }
      if (bandera > 0) {
        //alert(bandera);
        location.href = "#arriba";
        $('#btn_enviar').hide("slow"); //esconder boton
        abrirVentanaCarga();
        $('#texto_carga').text('Verificando inspecciones...Espere');
        actualizarTablasCliente_Informe();
      }else{
        $('#btn_enviar').show("slow"); //mostrar boton
        alert("Advertencia: Debe seleccionar al menos una inspección!");
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
*************** CLIENTE / INFORME *************
*==============================================*/

/*=============================================
* Funcion que permite actualizar las tablas cliente e informe luego de enviar todos los valores de las inspecciones al servidor
*==============================================*/
function actualizarTablasCliente_Informe(){
  var codigoInspector = window.localStorage.getItem("codigo_inspector");
  var codigoInforme = window.sessionStorage.getItem("cantidadInformes");
  var consecutivoInforme = window.sessionStorage.getItem("consecutivo_informe");
  var codigoCliente = window.sessionStorage.getItem("codigo_cliente");
  var consecutivoCliente = window.sessionStorage.getItem("consecutivo_cliente");

  var textCliente = $("#text_cliente").val();
  var textContacto = $("#text_contacto_legal").val();
  var textNitContacto = $("#text_nit_contacto").val();
  var textDireccion = $("#text_direccion_cliente").val();
  var textTelefono = $("#text_telefono_cliente").val();
  var textCorreo = $("#email").val();
  var textEncargado = $("#text_encargado").val();
  
  enviarValoresAudiosInforme(codigoInforme);
  addItemInforme(codigoInforme,consecutivoInforme,codigoInspector);
  /* Al ejecutarse esta funcion se envian los datos al servidor */
  addItemCliente(codigoCliente,consecutivoCliente,codigoInspector,textCliente,textContacto,textNitContacto,textDireccion,textTelefono,textCorreo,textEncargado);

}

/*=============================================
* Funcion para hacer un select a la tabla informe_valores_audios[IVA] que recibe por parametro el codigo de la inspeccion
* Se envia por sesion un json con el resultado del select
* El "json" es un arreglo con una coleccion de objetos o un arreglo de arreglos
*==============================================*/
function enviarValoresAudiosInforme(cod_informe){
  var arreglo_IVA = new Array();
  var json_IVA;

  db.transaction(function (tx) {
    var query = "SELECT * FROM informe_valores_audios WHERE k_codinforme = ? AND o_estado_envio = ?";
    tx.executeSql(query, [cod_informe,'Pendiente'], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        cod_informe = resultSet.rows.item(x).k_codinforme;
        nombre_audio = resultSet.rows.item(x).n_audio;
        nombre_directorio = resultSet.rows.item(x).n_directorio;
        o_estado_envio = resultSet.rows.item(x).o_estado_envio;

        var item = new Object(); //nuevo objeto siempre que entre al for
        item.cod_usuario = cod_usuario;
        item.cod_informe = cod_informe;
        item.nombre_audio = nombre_audio;
        item.nombre_directorio = nombre_directorio;
        item.o_estado_envio = o_estado_envio;

        arreglo_IVA.push(item);
      }
      json_IVA = JSON.stringify(arreglo_IVA); //Convertimos el arreglo a formato json
      //alert(json_IVA);
      window.sessionStorage.setItem("json_IVA", json_IVA); //mandamos por sesion el json
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
* Funcion para insertar datos en la tabla informe
*==============================================*/
function addItemInforme(k_codinforme, v_consecutivoinforme, k_codusuario) {
  db.transaction(function (tx) {
    var query = "INSERT INTO informe (k_codinforme, v_consecutivoinforme, k_codusuario, f_informe) VALUES (?,?,?,?)";
    tx.executeSql(query, [k_codinforme, v_consecutivoinforme, k_codusuario, mostrarFecha()], function(tx, res) {
      console.log("insertId: " + res.insertId + " -- probably 1");
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
    },
    function(tx, error) {
      console.log('INSERT error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok informe');
    enviarValoresinforme(); //Cargamos a sesion el JSON con los valores del informe
  });
}

/*=============================================
* Funcion para hacer un select a la tabla informe
* Se envia por sesion un json con el resultado del select
* El "json" es un arreglo con una coleccion de objetos o un arreglo de arreglos
*==============================================*/
function enviarValoresinforme(){
  var cod_informe = window.sessionStorage.getItem("cantidadInformes");
  //alert(cod_informe);
  //var cod_informe = "0";
  var arreglo_informe = new Array();
  var json_informe;

  db.transaction(function (tx) {
    var query = "SELECT k_codinforme,v_consecutivoinforme,k_codusuario,f_informe FROM informe WHERE k_codinforme = ?";
    tx.executeSql(query, [cod_informe], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_informe = resultSet.rows.item(x).k_codinforme;
        consecutivo = resultSet.rows.item(x).v_consecutivoinforme;
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        fecha = resultSet.rows.item(x).f_informe;

        var item = new Object();
        item.cod_informe = cod_informe;
        item.consecutivo = consecutivo;
        item.cod_usuario = cod_usuario;
        item.fecha = fecha;

        arreglo_informe.push(item);
      }
      json_informe = JSON.stringify(arreglo_informe); //Convertimos el arreglo a formato json
      //alert(json_informe);
      window.sessionStorage.setItem("json_informe", json_informe); //mandamos por sesion el json
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
* Funcion para insertar datos en la tabla cliente
*==============================================*/
function addItemCliente(k_codcliente, v_consecutivocliente,k_codusuario, n_cliente, n_contacto, v_nit, o_direccion, o_telefono, o_correo, n_encargado) {
  db.transaction(function (tx) {
    var query = "INSERT INTO cliente (k_codcliente, v_consecutivocliente,k_codusuario, n_cliente, n_contacto, v_nit, o_direccion, o_telefono, o_correo,n_encargado) VALUES (?,?,?,?,?,?,?,?,?,?)";
    tx.executeSql(query, [k_codcliente, v_consecutivocliente,k_codusuario, n_cliente, n_contacto, v_nit, o_direccion, o_telefono, o_correo, n_encargado], function(tx, res) {
      console.log("insertId: " + res.insertId + " -- probably 1");
      console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
    },
    function(tx, error) {
      console.log('INSERT error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok cliente');
    enviarValoresCliente(); //Cargamos a sesion el JSON con los valores del cliente
  });
}

/*=============================================
* Funcion para hacer un select a la tabla cliente
* Se envia por sesion un json con el resultado del select
* El "json" es un arreglo con una coleccion de objetos o un arreglo de arreglos
*==============================================*/
function enviarValoresCliente(){
  var cod_cliente = window.sessionStorage.getItem("codigo_cliente");
  //alert(cod_cliente);
  //var cod_cliente = "0";
  var arreglo_cliente = new Array();
  var json_cliente;

  db.transaction(function (tx) {
    var query = "SELECT k_codcliente,v_consecutivocliente,k_codusuario,n_cliente,n_contacto,v_nit,o_direccion,o_telefono,o_correo,n_encargado FROM cliente WHERE k_codcliente = ?";
    tx.executeSql(query, [cod_cliente], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_cliente = resultSet.rows.item(x).k_codcliente;
        consecutivo = resultSet.rows.item(x).v_consecutivocliente;
        k_codusuario = resultSet.rows.item(x).k_codusuario;
        nombre = resultSet.rows.item(x).n_cliente;
        contacto = resultSet.rows.item(x).n_contacto;
        nit = resultSet.rows.item(x).v_nit;
        direccion = resultSet.rows.item(x).o_direccion;
        telefono = resultSet.rows.item(x).o_telefono;
        correo = resultSet.rows.item(x).o_correo;
        n_encargado = resultSet.rows.item(x).n_encargado;

        var item = new Object();
        item.cod_cliente = cod_cliente;
        item.consecutivo = consecutivo;
        item.k_codusuario = k_codusuario;
        item.nombre = nombre;
        item.contacto = contacto;
        item.nit = nit;
        item.direccion = direccion;
        item.telefono = telefono;
        item.correo = correo;
        item.n_encargado = n_encargado;

        arreglo_cliente.push(item);
      }
      json_cliente = JSON.stringify(arreglo_cliente); //Convertimos el arreglo a formato json
      //alert(json_cliente);
      window.sessionStorage.setItem("json_cliente", json_cliente); //mandamos por sesion el json
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
    enviarDatosClienteInforme(); // Enviamos al servidor los datos del informe y el cliente
  });
}

function enviarDatosClienteInforme(){
  //alert("informe-> "+window.sessionStorage.getItem("json_informe")+"\ncliente-> "+window.sessionStorage.getItem("json_cliente"));
  var codigoInspector = window.localStorage.getItem("codigo_inspector");
  var consecutivoInforme = window.sessionStorage.getItem("cantidadInformes");
  $.post('http://192.168.0.26:8080/inspeccion/servidor/php/ascensor_guardar_datos_cliente_informe.php',{
    codigo_inspector: codigoInspector,
    json_cliente: window.sessionStorage.getItem("json_cliente"),
    json_informe: window.sessionStorage.getItem("json_informe"),
    json_IVA: window.sessionStorage.getItem("json_IVA") //informe_valores_audios
  },function(e){
    //alert("enviarDatosClienteInforme-> "+e);
    if (e == 0) {
      $('#texto_carga').text('Informe creado...Ok');
      enviarArchivosAudioInforme(codigoInspector,consecutivoInforme); //enviar los archivos al servidor
    }else{
      cerrarVentanaCarga("Ocurrio un error al enviar los datos al servidor enviarDatosClienteInforme!");
    }
  });
}

var bandera_audios_informe;
/*=============================================
* Funcion para hacer un select a la tabla informe_valores_audios[AVA] que recibe por parametro el codigo del informe
* Se envian los archivos de audio al servidor
*==============================================*/
function enviarArchivosAudioInforme(codigo_inspector,codigo_informe){
  $('#texto_carga').text('Cargando archivos de informe...Espere');
  var cantidad_archivos = 0;
  bandera_audios_informe = 0;
  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,k_codinforme,n_audio,n_directorio FROM informe_valores_audios WHERE k_codinforme = ? AND o_estado_envio = ?";
    tx.executeSql(query, [codigo_informe,'Pendiente'], function (tx, resultSet) {
      cantidad_archivos = resultSet.rows.length;
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        cod_informe = resultSet.rows.item(x).k_codinforme;
        nombre_audio = resultSet.rows.item(x).n_audio;
        nombre_directorio = resultSet.rows.item(x).n_directorio;

        uploadInformeAudio(nombre_directorio,nombre_audio,cod_usuario,cod_informe,'Enviada',cantidad_archivos,codigo_inspector);
      }
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
    if (cantidad_archivos == 0) {
      obtenerArchivosSeleccionadosAscensores(); //Se llama la funcion para iniciar la carga de datos al servidor
    }
  });
}

/*=============================================
* Funcion que permite subir los archivos de audio del informe al servidor
*==============================================*/
function uploadInformeAudio(directorio,nombre_archivo,cod_usuario,cod_informe,estado_envio,cantidad_archivos,codigo_inspector) {
  var directorio = "file:///sdcard"+directorio;
  var nombreDeArchivo = nombre_archivo;
  var fileURL = directorio + "/" + nombreDeArchivo;

  /*funcion que se ejecuta cuando se ha subido ya el archivo*/
  var win = function (r) {
    console.log("Successful upload...");
    console.log("Code = " + r.responseCode);
    //alert("audioInforme subido...ok");
    updateItemsInformeValoresAudios(cod_usuario,cod_informe,estado_envio);
    borrarArchivo(directorio, nombreDeArchivo);
    $('#texto_carga').text("Audio informe "+nombre_archivo+" subido...ok");
    bandera_audios_informe += 1;
    if (bandera_audios_informe == cantidad_archivos) {
      $('#texto_carga').text(cantidad_archivos + " audios subidos...ok");
      obtenerArchivosSeleccionadosAscensores(); //Se llama la funcion para iniciar la carga de datos al servidor
    }
  }

  var fail = function (error) {
    //alert("No hay audioInforme a ser cargados! Code = " + error.code);
  }

  var uri = encodeURI("http://192.168.0.26:8080/inspeccion/servidor/php/informe_upload_audios.php");

  var options = new FileUploadOptions();
  options.fileKey="file";
  options.fileName=fileURL.substr(fileURL.lastIndexOf('/')+1);
  options.mimeType="audio/3gpp";

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

/*=============================================
* Funcion para actualizar una fila en la tabla informe_valores_audios
*==============================================*/
function updateItemsInformeValoresAudios(k_codusuario,k_codinforme,o_estado_envio) {
  //alert("updateItemsInformeValoresAudios");
  db.transaction(function (tx) {
    var query = "UPDATE informe_valores_audios SET o_estado_envio = ? "+
                                                  "WHERE k_codusuario = ? "+
                                                  "AND k_codinforme = ? ";
    tx.executeSql(query, [o_estado_envio,k_codusuario,k_codinforme], function(tx, res) {
      console.log("rowsAffected updateItemsInformeValoresAudios: " + res.rowsAffected);
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
********** ENVIAR CORREO ELECTRONICO **********
*==============================================*/

function enviarCorreoElectronico(){
  $('#texto_carga').text('Enviando informe...Espere');
  var codigo_inspector = window.localStorage.getItem("codigo_inspector");
  var correo_electronico = $('#email').val();
  var nombre_empresa = $('#text_cliente').val();
  //alert(nombre_empresa);
  $.post('http://192.168.0.26:8080/inspeccion/servidor/php/email/enviarCorreoInspeccion.php',{
    codigo_inspector: codigo_inspector,
    correo: correo_electronico,
    nombre_empresa: nombre_empresa
  },function(e){
    //alert("enviarCorreoElectronico-> "+e);
    if (e == 0) {
      cerrarVentanaCarga("<<Todo salio bien, proceso de envío exitoso>>");
    }else{
      cerrarVentanaCarga("Ocurrio un error al enviar los datos al servidor! enviarCorreoElectronico\n\nCódigo de error: "+e);
    }
  });
}

/*=============================================
****************** ASCENSORES *****************
*==============================================*/

/*=============================================
* Funcion para hacer un select a la tabla ascensor_valores_audios[AVA] que recibe por parametro el codigo de la inspeccion
* Se envia por sesion un json con el resultado del select
* El "json" es un arreglo con una coleccion de objetos o un arreglo de arreglos
*==============================================*/
function enviarValoresAudiosAscensores(codigo_usuario,cod_inspeccion){
  var arreglo_AVA = new Array();
  var json_AVA;

  db.transaction(function (tx) {
    var query = "SELECT * FROM ascensor_valores_audios WHERE k_codusuario = ? AND k_codinspeccion = ? AND o_estado_envio = ?";
    tx.executeSql(query, [codigo_usuario,cod_inspeccion,'Pendiente'], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        cod_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        nombre_audio = resultSet.rows.item(x).n_audio;
        nombre_directorio = resultSet.rows.item(x).n_directorio;
        o_estado_envio = resultSet.rows.item(x).o_estado_envio;

        var item = new Object(); //nuevo objeto siempre que entre al for
        item.cod_usuario = cod_usuario;
        item.cod_inspeccion = cod_inspeccion;
        item.nombre_audio = nombre_audio;
        item.nombre_directorio = nombre_directorio;
        item.o_estado_envio = o_estado_envio;

        arreglo_AVA.push(item);
      }
      json_AVA = JSON.stringify(arreglo_AVA); //Convertimos el arreglo a formato json
      //alert(json_AVA);
      window.sessionStorage.setItem("json_AVA", json_AVA); //mandamos por sesion el json
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
* Funcion para hacer un select a la tabla ascensor_valores_preliminar [AVPRE] que recibe por parametro el codigo de la inspeccion
* Se envia por sesion un json con el resultado del select
* El "json" es un arreglo con una coleccion de objetos o un arreglo de arreglos
*==============================================*/
function enviarValoresPreliminarAscensores(codigo_usuario,cod_inspeccion){
  var arreglo_AVPRE = new Array();
  var json_AVPRE;

  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,k_codinspeccion,k_coditem_preli,v_calificacion,o_observacion FROM ascensor_valores_preliminar WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [codigo_usuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        cod_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        cod_item = resultSet.rows.item(x).k_coditem_preli;
        calificacion = resultSet.rows.item(x).v_calificacion;
        observacion = resultSet.rows.item(x).o_observacion;

        var item = new Object();
        item.cod_usuario = cod_usuario;
        item.cod_inspeccion = cod_inspeccion;
        item.cod_item = cod_item;
        item.calificacion = calificacion;
        item.observacion = observacion;

        arreglo_AVPRE.push(item);
      }
      json_AVPRE = JSON.stringify(arreglo_AVPRE); //Convertimos el arreglo a formato json
      //alert(json_AVPRE);
      window.sessionStorage.setItem("json_AVPRE", json_AVPRE); //mandamos por sesion el json
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
* Funcion para hacer un select a la tabla ascensor_valores_proteccion [AVPP] que recibe por parametro el codigo de la inspeccion
* Se envia por sesion un json con el resultado del select
* El "json" es un arreglo con una coleccion de objetos o un arreglo de arreglos
*==============================================*/
function enviarValoresProteccionAscensores(codigo_usuario,cod_inspeccion){
  var arreglo_AVPP = new Array();
  var json_AVPP;

  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,k_codinspeccion,k_coditem,v_sele_inspector,v_sele_empresa,o_observacion FROM ascensor_valores_proteccion WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [codigo_usuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        cod_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        cod_item = resultSet.rows.item(x).k_coditem;
        seleccion_inspector = resultSet.rows.item(x).v_sele_inspector;
        seleccion_empresa = resultSet.rows.item(x).v_sele_empresa;
        observacion = resultSet.rows.item(x).o_observacion;

        var item = new Object();
        item.cod_usuario = cod_usuario;
        item.cod_inspeccion = cod_inspeccion;
        item.cod_item = cod_item;
        item.seleccion_inspector = seleccion_inspector;
        item.seleccion_empresa = seleccion_empresa;
        item.observacion = observacion;

        arreglo_AVPP.push(item);
      }
      json_AVPP = JSON.stringify(arreglo_AVPP); //Convertimos el arreglo a formato json
      //alert(json_AVPP);
      window.sessionStorage.setItem("json_AVPP", json_AVPP); //mandamos por sesion el json

      enviarInspeccionesSeleccionadasAscensores(codigo_usuario,cod_inspeccion); //Se llama aqui la funcion para permitir que las anteriores funciones de enviar valores alcancen a ejecutarse por competo
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
* Funcion para hacer un select a la tabla ascensor_valores_elementos[AVE] que recibe por parametro el codigo de la inspeccion
* Se envia por sesion un json con el resultado del select
* El "json" es un arreglo con una coleccion de objetos o un arreglo de arreglos
*==============================================*/
function enviarValoreselementosAscensores(codigo_usuario,cod_inspeccion){
  var arreglo_AVE = new Array();
  var json_AVE;

  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,k_codinspeccion,k_coditem,o_descripcion,v_selecion FROM ascensor_valores_elementos WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [codigo_usuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        cod_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        cod_item = resultSet.rows.item(x).k_coditem;
        descripcion = resultSet.rows.item(x).o_descripcion;
        seleccion = resultSet.rows.item(x).v_selecion;

        var item = new Object(); //nuevo objeto siempre que entre al for
        item.cod_usuario = cod_usuario;
        item.cod_inspeccion = cod_inspeccion;
        item.cod_item = cod_item;
        item.descripcion = descripcion;
        item.seleccion = seleccion;

        arreglo_AVE.push(item);
      }
      json_AVE = JSON.stringify(arreglo_AVE); //Convertimos el arreglo a formato json
      //alert(json_AVE);
      window.sessionStorage.setItem("json_AVE", json_AVE); //mandamos por sesion el json
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
* Funcion para hacer un select a la tabla ascensor_valores_iniciales [AVI] que recibe por parametro el codigo de la inspeccion
* Se envia por sesion un json con el resultado del select
* Y mandar los valores obtenidos por "POST" y poderlos guardar en la base de datos del servidor
*==============================================*/
function enviarValoresInicialesAscensores(codigo_usuario,cod_inspeccion){
  var arreglo_AVI = new Array();
  var json_AVI;

  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,"+
               "k_codinspeccion,"+
               "n_cliente,"+
               "n_equipo,"+
               "n_empresamto,"+
               "o_tipoaccion,"+
               "v_capacperson,"+
               "v_capacpeso,"+
               "v_paradas,"+
               "f_fecha,"+
               "v_codigo,"+
               "o_consecutivoinsp,"+
               "ultimo_mto,"+
               "inicio_servicio,"+
               "ultima_inspeccion,"+
               "h_hora,"+
               "o_tipo_informe "+
               "FROM ascensor_valores_iniciales "+
               "WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [codigo_usuario,cod_inspeccion], function (tx, resultSet) {
      var cod_usuario = resultSet.rows.item(0).k_codusuario;
      var cod_inspeccion = resultSet.rows.item(0).k_codinspeccion;
      var cliente = resultSet.rows.item(0).n_cliente;
      var nombre_equipo = resultSet.rows.item(0).n_equipo;
      var empresa_mto = resultSet.rows.item(0).n_empresamto;
      var accionamiento = resultSet.rows.item(0).o_tipoaccion;
      var capac_person = resultSet.rows.item(0).v_capacperson;
      var capac_peso = resultSet.rows.item(0).v_capacpeso;
      var fecha = resultSet.rows.item(0).f_fecha;
      var num_paradas = resultSet.rows.item(0).v_paradas;
      var codigo = resultSet.rows.item(0).v_codigo;
      var consecutivo = resultSet.rows.item(0).o_consecutivoinsp;
      var ultimo_mto = resultSet.rows.item(0).ultimo_mto;
      var inicio_servicio = resultSet.rows.item(0).inicio_servicio;
      var ultima_inspeccion = resultSet.rows.item(0).ultima_inspeccion;
      var hora = resultSet.rows.item(0).h_hora;
      var tipo_informe = resultSet.rows.item(0).o_tipo_informe;

      var miObjeto_AVI = new Object(); //nuevo objeto siempre que entre al for
      miObjeto_AVI.cod_usuario = cod_usuario;
      miObjeto_AVI.cod_inspeccion = cod_inspeccion;
      miObjeto_AVI.cliente = cliente;
      miObjeto_AVI.nombre_equipo = nombre_equipo;
      miObjeto_AVI.empresa_mto = empresa_mto; 
      miObjeto_AVI.accionamiento = accionamiento;
      miObjeto_AVI.capac_person = capac_person;
      miObjeto_AVI.capac_peso = capac_peso;
      miObjeto_AVI.fecha = fecha;
      miObjeto_AVI.num_paradas = num_paradas;
      miObjeto_AVI.codigo = codigo;
      miObjeto_AVI.consecutivo = consecutivo;
      miObjeto_AVI.ultimo_mto = ultimo_mto;
      miObjeto_AVI.inicio_servicio = inicio_servicio;
      miObjeto_AVI.ultima_inspeccion = ultima_inspeccion;
      miObjeto_AVI.hora = hora;
      miObjeto_AVI.tipo_informe = tipo_informe;

      arreglo_AVI.push(miObjeto_AVI);

      json_AVI = JSON.stringify(arreglo_AVI); //Convertimos el arreglo a formato json
      window.sessionStorage.setItem("json_AVI", json_AVI); //mandamos por sesion el objeto
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
* Funcion para hacer un select a la tabla ascensor_valores_cabina[AVC] que recibe por parametro el codigo de la inspeccion
* Se envia por sesion un json con el resultado del select
* El "json" es un arreglo con una coleccion de objetos o un arreglo de arreglos
*==============================================*/
function enviarValoresCabinaAscensores(codigo_usuario,cod_inspeccion){
  var arreglo_AVC = new Array();
  var json_AVC;

  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion FROM ascensor_valores_cabina WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [codigo_usuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        cod_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        cod_item = resultSet.rows.item(x).k_coditem;
        nombre_calificacion = resultSet.rows.item(x).n_calificacion;
        valor_calificacion = resultSet.rows.item(x).v_calificacion;
        observacion = resultSet.rows.item(x).o_observacion;

        var item = new Object(); //nuevo objeto siempre que entre al for
        item.cod_usuario = cod_usuario;
        item.cod_inspeccion = cod_inspeccion;
        item.cod_item = cod_item;
        item.nombre_calificacion = nombre_calificacion;
        item.valor_calificacion = valor_calificacion;
        item.observacion = observacion;

        arreglo_AVC.push(item);
      }
      json_AVC = JSON.stringify(arreglo_AVC); //Convertimos el arreglo a formato json
      //alert(json_AVC);
      window.sessionStorage.setItem("json_AVC", json_AVC); //mandamos por sesion el json
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
* Funcion para hacer un select a la tabla ascensor_valores_maquinas[AVM] que recibe por parametro el codigo de la inspeccion
* Se envia por sesion un json con el resultado del select
* El "json" es un arreglo con una coleccion de objetos o un arreglo de arreglos
*==============================================*/
function enviarValoresMaquinasAscensores(codigo_usuario,cod_inspeccion){
  var arreglo_AVM = new Array();
  var json_AVM;

  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion FROM ascensor_valores_maquinas WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [codigo_usuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        cod_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        cod_item = resultSet.rows.item(x).k_coditem;
        nombre_calificacion = resultSet.rows.item(x).n_calificacion;
        valor_calificacion = resultSet.rows.item(x).v_calificacion;
        observacion = resultSet.rows.item(x).o_observacion;

        var item = new Object(); //nuevo objeto siempre que entre al for
        item.cod_usuario = cod_usuario;
        item.cod_inspeccion = cod_inspeccion;
        item.cod_item = cod_item;
        item.nombre_calificacion = nombre_calificacion;
        item.valor_calificacion = valor_calificacion;
        item.observacion = observacion;

        arreglo_AVM.push(item);
      }
      json_AVM = JSON.stringify(arreglo_AVM); //Convertimos el arreglo a formato json
      //alert(json_AVM);
      window.sessionStorage.setItem("json_AVM", json_AVM); //mandamos por sesion el json
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
* Funcion para hacer un select a la tabla ascensor_valores_pozo[AVP] que recibe por parametro el codigo de la inspeccion
* Se envia por sesion un json con el resultado del select
* El "json" es un arreglo con una coleccion de objetos o un arreglo de arreglos
*==============================================*/
function enviarValoresPozoAscensores(codigo_usuario,cod_inspeccion){
  var arreglo_AVP = new Array();
  var json_AVP;

  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion FROM ascensor_valores_pozo WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [codigo_usuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        cod_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        cod_item = resultSet.rows.item(x).k_coditem;
        nombre_calificacion = resultSet.rows.item(x).n_calificacion;
        valor_calificacion = resultSet.rows.item(x).v_calificacion;
        observacion = resultSet.rows.item(x).o_observacion;

        var item = new Object(); //nuevo objeto siempre que entre al for
        item.cod_usuario = cod_usuario;
        item.cod_inspeccion = cod_inspeccion;
        item.cod_item = cod_item;
        item.nombre_calificacion = nombre_calificacion;
        item.valor_calificacion = valor_calificacion;
        item.observacion = observacion;

        arreglo_AVP.push(item);
      }
      json_AVP = JSON.stringify(arreglo_AVP); //Convertimos el arreglo a formato json
      //alert(json_AVP);
      window.sessionStorage.setItem("json_AVP", json_AVP); //mandamos por sesion el json
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
* Funcion para hacer un select a la tabla ascensor_valores_foso[AVF] que recibe por parametro el codigo de la inspeccion
* Se envia por sesion un json con el resultado del select
* El "json" es un arreglo con una coleccion de objetos o un arreglo de arreglos
*==============================================*/
function enviarValoresFosoAscensores(codigo_usuario,cod_inspeccion){
  var arreglo_AVF = new Array();
  var json_AVF;

  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion FROM ascensor_valores_foso WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [codigo_usuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        cod_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        cod_item = resultSet.rows.item(x).k_coditem;
        nombre_calificacion = resultSet.rows.item(x).n_calificacion;
        valor_calificacion = resultSet.rows.item(x).v_calificacion;
        observacion = resultSet.rows.item(x).o_observacion;

        var item = new Object(); //nuevo objeto siempre que entre al for
        item.cod_usuario = cod_usuario;
        item.cod_inspeccion = cod_inspeccion;
        item.cod_item = cod_item;
        item.nombre_calificacion = nombre_calificacion;
        item.valor_calificacion = valor_calificacion;
        item.observacion = observacion;

        arreglo_AVF.push(item);
      }
      json_AVF = JSON.stringify(arreglo_AVF); //Convertimos el arreglo a formato json
      //alert(json_AVF);
      window.sessionStorage.setItem("json_AVF", json_AVF); //mandamos por sesion el json
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
* Funcion para hacer un select a la tabla ascensor_valores_finales [AVOF] que recibe por parametro el codigo de la inspeccion
* Se envia por sesion un json con el resultado del select
* Y mandar los valores obtenidos por "POST" y poderlos guardar en la base de datos del servidor
*==============================================*/
function enviarValoresFinalesAscensores(codigo_usuario,cod_inspeccion){
  var arreglo_AVOF = new Array();
  var json_AVOF;

  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,k_codinspeccion,o_observacion FROM ascensor_valores_finales WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [codigo_usuario,cod_inspeccion], function (tx, resultSet) {
      var cod_usuario = resultSet.rows.item(0).k_codusuario;
      var cod_inspeccion = resultSet.rows.item(0).k_codinspeccion;
      var observacion = resultSet.rows.item(0).o_observacion;

      var item = new Object(); //nuevo objeto
      item.cod_usuario = cod_usuario;
      item.cod_inspeccion = cod_inspeccion;
      item.observacion = observacion;

      arreglo_AVOF.push(item);

      json_AVOF = JSON.stringify(arreglo_AVOF); //Convertimos el arreglo a formato json
      //alert(json_AVOF);
      window.sessionStorage.setItem("json_AVOF", json_AVOF); //mandamos por sesion el objeto
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

var cantidad_datos_ascensores = 0;
var pila_datos_ascensores = new Stack();
/*=============================================
* Funcion para hacer un select a la tabla auditoria_inspecciones_ascensores[AVFG] que recibe por parametro el codigo de la inspeccion
* Se envian los datos al servidor
*==============================================*/
function obtenerArchivosSeleccionadosAscensores(){
  $('#texto_carga').text('Cargando datos de inspección...Espere');
  db.transaction(function (tx) {
    var query = "SELECT * FROM auditoria_inspecciones_ascensores WHERE o_estado_envio = ?";
    tx.executeSql(query, ['Pendiente'], function (tx, resultSet) {
      try{
        for(var x = 0; x < resultSet.rows.length; x++) {
          codigo_usuario = resultSet.rows.item(x).k_codusuario;
          codigo_inspeccion = resultSet.rows.item(x).k_codinspeccion;
          o_consecutivoinsp = resultSet.rows.item(x).o_consecutivoinsp;
          var id_check = 'asc-'+codigo_usuario+'-'+codigo_inspeccion;

          if( $('#'+id_check+'').prop('checked') ) {
            //alert('checkBox'+id_check+' esta seleccionado!');
            pila_datos_ascensores.add(o_consecutivoinsp);
            cantidad_datos_ascensores += 1;
            //alert(cantidad_datos_ascensores);
          }
        }
      }catch(err) {
        //alert(err.message);
      }
      enviarDatosAscensores();
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
* Funcion para hacer un select a la tabla auditoria_inspecciones_ascensores[AVFG] que recibe por parametro el codigo de la inspeccion
* Se envian los datos al servidor
*==============================================*/
function enviarDatosAscensores(){
  if (pila_datos_ascensores.hasElements()) {
    $('#texto_carga').text('Cargando datos de inspección...Espere');
    var inspecc_selec = pila_datos_ascensores.getTopElement();
    db.transaction(function (tx) {
      var query = "SELECT * FROM auditoria_inspecciones_ascensores WHERE o_estado_envio = ? AND o_consecutivoinsp = ?";
      tx.executeSql(query, ['Pendiente',inspecc_selec], function (tx, resultSet) {
        try{
          for(var x = 0; x < resultSet.rows.length; x++) {
            codigo_usuario = resultSet.rows.item(x).k_codusuario;
            codigo_inspeccion = resultSet.rows.item(x).k_codinspeccion;

            enviarValoresAudiosAscensores(codigo_usuario,codigo_inspeccion);
            enviarValoresCabinaAscensores(codigo_usuario,codigo_inspeccion);
            enviarValoreselementosAscensores(codigo_usuario,codigo_inspeccion);
            enviarValoresFinalesAscensores(codigo_usuario,codigo_inspeccion);
            enviarValoresFosoAscensores(codigo_usuario,codigo_inspeccion);
            enviarValoresInicialesAscensores(codigo_usuario,codigo_inspeccion);
            enviarValoresMaquinasAscensores(codigo_usuario,codigo_inspeccion);
            enviarValoresPozoAscensores(codigo_usuario,codigo_inspeccion);
            enviarValoresPreliminarAscensores(codigo_usuario,codigo_inspeccion);
            enviarValoresProteccionAscensores(codigo_usuario,codigo_inspeccion); //Dentro de esta se llama la funcion enviarInspeccionesSeleccionadasAscensores() para que se repita el ciclo de envio de inspeccion si hay otra pendiente
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
    obtenerArchivosSeleccionadosPuertas();
  }
}

/*=============================================
* Funcion que se ejecuta al terminar de enviar por sesion todos los JSON con los distintos valores de la inspeccion
* Esta funcion obtiene los JSON con los valores de la inspeccion y los envia al servidor, si el servidor ejecuta con 
* exito todos los insert SQL devuelve un "0", si es asi se actualiza la tabla de auditoria de la inspeccion y
* se llama a ejecucion de nuevo la funcion "enviarDatosAscensores" para continuar hacer de nuevo el proceso si queda alguna inspeccion
* con estado pendiente (Al ejecutar esta funcion en el servidor se crea el respectivo PDF de la inspeccion)
*==============================================*/
function enviarInspeccionesSeleccionadasAscensores(codigo_usuario,codigo_inspeccion){
  var k_codusuario_modifica = window.localStorage.getItem("codigo_inspector");
  $('#texto_carga').text('Enviando inspección '+codigo_usuario+'-'+codigo_inspeccion+'...Espere');
  $.post('http://192.168.0.26:8080/inspeccion/servidor/php/ascensor_guardar_datos_lista_inspeccion.php',{
    json_AVA: window.sessionStorage.getItem("json_AVA"),
    json_AVC: window.sessionStorage.getItem("json_AVC"),
    json_AVE: window.sessionStorage.getItem("json_AVE"),
    json_AVOF: window.sessionStorage.getItem("json_AVOF"),
    json_AVF: window.sessionStorage.getItem("json_AVF"),
    json_AVI: window.sessionStorage.getItem("json_AVI"),
    json_AVM: window.sessionStorage.getItem("json_AVM"),
    json_AVP: window.sessionStorage.getItem("json_AVP"),
    json_AVPRE: window.sessionStorage.getItem("json_AVPRE"),
    json_AVPP: window.sessionStorage.getItem("json_AVPP")
  },function(e){
    //alert("enviarInspeccionesSeleccionadasAscensores-> "+e);
    if (e == 0) {
      $('#texto_carga').text('Inpección '+codigo_usuario+'-'+codigo_inspeccion+' Saved...OK');
      var cod_cliente = window.sessionStorage.getItem("codigo_cliente");
      var cod_informe = window.sessionStorage.getItem("cantidadInformes");
      updateItemsAuditoriaInspeccionesAscensores("Enviada",cod_cliente,cod_informe,codigo_inspeccion,codigo_usuario,k_codusuario_modifica);
      //updateItemsAuditoriaInspeccionesAscensores("Pendiente",cod_cliente,cod_informe,codigo_inspeccion,codigo_usuario);
    }else{
      cerrarVentanaCarga("Ocurrio un error al enviar los datos al servidor! enviarInspeccionesSeleccionadasAscensores\n\nCódigo de error: "+e);
    }
  });
}

/*=============================================
* Funcion para actualizar una fila en la tabla auditoria_inspecciones_ascensores
*==============================================*/
function updateItemsAuditoriaInspeccionesAscensores(estado,cod_cliente,cod_informe, cod_inspeccion,codigo_inspector,k_codusuario_modifica) {
  //alert("update->"+cod_inspeccion);
  //alert(estado+" "+cod_cliente+" "+cod_informe+" "+cod_inspeccion);
  db.transaction(function (tx) {
    var query = "UPDATE auditoria_inspecciones_ascensores SET o_estado_envio = ?,"+
                                                              "k_codcliente = ?,"+
                                                              "k_codinforme = ?,"+
                                                              "k_codusuario_modifica = ? "+
                                                              "WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [estado,cod_cliente,cod_informe,k_codusuario_modifica,codigo_inspector,cod_inspeccion], function(tx, res) {
      console.log("rowsAffected updateItemsAuditoriaInspeccionesAscensores: " + res.rowsAffected);
    },
    function(tx, error) {
      console.log('UPDATE error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok');
    enviarValoresAuditoriaAscensores(codigo_inspector,cod_inspeccion); //cargamos en sesion el JSON con los valores de auditoria
  });
}

/*=============================================
* Funcion para hacer un select a la tabla auditoria_inspecciones_ascensores que recibe por parametro el codigo de la inspeccion
* Se envia por sesion un json con el resultado del select
* El "json" es un arreglo con una coleccion de objetos o un arreglo de arreglos
*==============================================*/
function enviarValoresAuditoriaAscensores(codigo_inspector,cod_inspeccion){
  var arreglo_auditoria_ascensores = new Array();
  var json_auditoria_ascensores;

  db.transaction(function (tx) {
    var query = "SELECT * FROM auditoria_inspecciones_ascensores WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [codigo_inspector,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        cod_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        consecutivoinsp = resultSet.rows.item(x).o_consecutivoinsp;
        estado_envio = resultSet.rows.item(x).o_estado_envio;
        revision = resultSet.rows.item(x).o_revision;
        cantidad_item_nocumple = resultSet.rows.item(x).v_item_nocumple;
        codcliente = resultSet.rows.item(x).k_codcliente;
        codinforme = resultSet.rows.item(x).k_codinforme;
        k_codusuario_modifica = resultSet.rows.item(x).k_codusuario_modifica;
        o_actualizar_inspeccion = resultSet.rows.item(x).o_actualizar_inspeccion;

        var item = new Object();
        item.cod_usuario = cod_usuario;
        item.cod_inspeccion = cod_inspeccion;
        item.consecutivoinsp = consecutivoinsp;
        item.estado_envio = estado_envio;
        item.revision = revision;
        item.cantidad_item_nocumple = cantidad_item_nocumple;
        item.codcliente = codcliente;
        item.codinforme = codinforme;
        item.k_codusuario_modifica = k_codusuario_modifica;
        item.o_actualizar_inspeccion = o_actualizar_inspeccion;

        arreglo_auditoria_ascensores.push(item);
      }
      json_auditoria_ascensores = JSON.stringify(arreglo_auditoria_ascensores); //Convertimos el arreglo a formato json
      //alert(json_auditoria_ascensores);
      window.sessionStorage.setItem("json_auditoria_ascensores", json_auditoria_ascensores); //mandamos por sesion el json
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
    enviarDatosAuditoriaAscensores(codigo_inspector,cod_inspeccion); //enviamos los valores de la tabla auditoria al servidor
  });
}

function enviarDatosAuditoriaAscensores(codigo_inspector,cod_inspeccion){
  $.post('http://192.168.0.26:8080/inspeccion/servidor/php/ascensor_guardar_datos_auditoria_inspeccion.php',{
    caso: "auditoria_ascensor",
    codigo_inspector: codigo_inspector,
    json_auditoria_ascensores: window.sessionStorage.getItem("json_auditoria_ascensores")
  },function(e){
    //alert("enviarDatosAuditoriaAscensores-> "+e);
    if (e == 0) {
      enviarArchivosAudioAscensores(codigo_inspector,cod_inspeccion); //enviar los archivos de audio al servidor, al final de esta funcion se llama la de crear PDF
    }else{
      cerrarVentanaCarga("Ocurrio un error al enviar los datos al servidor! enviarDatosAuditoriaAscensores\n\nCódigo de error: "+e);
    }
  });
}

var bandera_audios_ascensores;
/*=============================================
* Funcion para hacer un select a la tabla ascensor_valores_audios[AVA] que recibe por parametro el codigo de la inspeccion
* Se envian los archivos de audio al servidor
*==============================================*/
function enviarArchivosAudioAscensores(codigo_inspector,cod_inspeccion){
  $('#texto_carga').text('Cargando archivos de audio...Espere');
  var cantidad_archivos = 0;
  bandera_audios_ascensores = 0;
  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,k_codinspeccion,n_audio,n_directorio FROM ascensor_valores_audios WHERE k_codusuario = ? AND k_codinspeccion = ? AND o_estado_envio = ?";
    tx.executeSql(query, [codigo_inspector,cod_inspeccion,'Pendiente'], function (tx, resultSet) {
      cantidad_archivos = resultSet.rows.length;
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        cod_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        nombre_audio = resultSet.rows.item(x).n_audio;
        nombre_directorio = resultSet.rows.item(x).n_directorio;

        uploadAudioAscensores(nombre_directorio,nombre_audio,cod_usuario,cod_inspeccion,'Enviada',cantidad_archivos,codigo_inspector);
      }
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
    if (cantidad_archivos == 0) {
      crearPDFAscensores(codigo_inspector,cod_inspeccion); //Llamamos la funcion de crear PDF
    }
    //var tiempo = parseInt(cantidad_archivos) * 5000;
    //setTimeout(function(){ crearPDFAscensores(codigo_inspector,cod_inspeccion); },tiempo); //se multiplica la cantidad de archivos a subir al servidor por 5 segundos (5000) para que cada archivo tenga un tiempo de 5 seg en su carga al servidor y complete las funciones de borrado y actualizacion
    //crearPDFAscensores(codigo_inspector,cod_inspeccion); //Llamamos la funcion de crear PDF
  });
}

/*=============================================
* Funcion que permite subir los archivos de audio al servidor
*==============================================*/
function uploadAudioAscensores(directorio,nombre_archivo,cod_usuario,cod_inspeccion,estado_envio,cantidad_archivos,codigo_inspector) {
  var directorio = "file:///sdcard"+directorio;
  var nombreDeArchivo = nombre_archivo;
  var fileURL = directorio + "/" + nombreDeArchivo;

  var win = function (r) {
    console.log("Successful upload...");
    console.log("Code = " + r.responseCode);
    updateItemsAscensorValoresAudios(cod_usuario,cod_inspeccion,'Enviada');
    borrarArchivo(directorio, nombreDeArchivo);
    $('#texto_carga').text("Audio ascensor "+nombre_archivo+" subido...ok");
    bandera_audios_ascensores += 1;
    //alert("Audio ascensor "+nombre_archivo+" subido...ok");
    /* Si bandera bandera_audios_ascensores llega a ser igual a la cantidad de audios a subir al servidor se puede proseguir a llamar la funcion de subir audios */
    if (bandera_audios_ascensores == cantidad_archivos) {
      //alert("termino la carga de "+bandera_audios_ascensores+" audios de ascensores!");
      $('#texto_carga').text(cantidad_archivos + " audios subidos...ok");
      crearPDFAscensores(codigo_inspector,cod_inspeccion); //Llamamos la funcion de crear PDF
    }
  }

  var fail = function (error) {
    //alert("No hay audios a ser cargados! Code = " + error.code);
  }

  var uri = encodeURI("http://192.168.0.26:8080/inspeccion/servidor/php/ascensor_upload_audios.php");

  var options = new FileUploadOptions();
  options.fileKey="file";
  options.fileName=fileURL.substr(fileURL.lastIndexOf('/')+1);
  options.mimeType="audio/3gpp";

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

/*=============================================
* Funcion que permite crear en el servidor el PDF de la inspeccion
*==============================================*/
function crearPDFAscensores(codigo_inspector,codigo_inspeccion){
  var codigo_inspector_dispositivo = window.localStorage.getItem("codigo_inspector");
  $('#texto_carga').text('Creando PDF '+codigo_inspector+'-'+codigo_inspeccion+'...Espere');
  $.post('http://192.168.0.26:8080/inspeccion/servidor/php/ascensor_crear_pdf_inspeccion.php',{
    codigo_inspector_dispositivo: codigo_inspector_dispositivo,
    codigo_inspector: codigo_inspector,
    codigo_inspeccion: codigo_inspeccion,
    fecha_emision: mostrarFecha()
  },function(e){
    //alert("crearPDFAscensores-> "+e);
    if (e == 0) {
      $('#texto_carga').text('PDF de inspección '+codigo_inspector+'-'+codigo_inspeccion+' Saved...OK');
      pila_datos_ascensores.pop();
      enviarDatosAscensores();////
    }else{
      cerrarVentanaCarga("Ocurrio un error al enviar los datos al servidor! crearPDFAscensores\n\nCódigo de error: "+e);
    }
  });
}

/*=============================================
* Funcion para actualizar una fila en la tabla ascensor_valores_audios
*==============================================*/
function updateItemsAscensorValoresAudios(k_codusuario,k_codinspeccion,o_estado_envio) {
  //alert("audio -> "+o_estado_envio);
  db.transaction(function (tx) {
    var query = "UPDATE ascensor_valores_audios SET o_estado_envio = ? "+
                                                    "WHERE k_codusuario = ? "+
                                                    "AND k_codinspeccion = ? ";
    tx.executeSql(query, [o_estado_envio,k_codusuario,k_codinspeccion], function(tx, res) {
      console.log("rowsAffected updateItemsAscensorValoresAudios: " + res.rowsAffected);
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
****************** PUERTAS *****************
*==============================================*/

/*=============================================
* Funcion para hacer un select a la tabla puertas_valores_audios[PVA] que recibe por parametro el codigo de la inspeccion
* Se envia por sesion un json con el resultado del select
* El "json" es un arreglo con una coleccion de objetos o un arreglo de arreglos
*==============================================*/
function enviarValoresAudiosPuertas(codigo_usuario,cod_inspeccion){
  var arreglo_PVA = new Array();
  var json_PVA;

  db.transaction(function (tx) {
    var query = "SELECT * FROM puertas_valores_audios WHERE k_codusuario = ? AND k_codinspeccion = ? AND o_estado_envio = ?";
    tx.executeSql(query, [codigo_usuario,cod_inspeccion,'Pendiente'], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        cod_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        nombre_audio = resultSet.rows.item(x).n_audio;
        nombre_directorio = resultSet.rows.item(x).n_directorio;
        o_estado_envio = resultSet.rows.item(x).o_estado_envio;

        var item = new Object(); //nuevo objeto siempre que entre al for
        item.cod_usuario = cod_usuario;
        item.cod_inspeccion = cod_inspeccion;
        item.nombre_audio = nombre_audio;
        item.nombre_directorio = nombre_directorio;
        item.o_estado_envio = o_estado_envio;

        arreglo_PVA.push(item);
      }
      json_PVA = JSON.stringify(arreglo_PVA); //Convertimos el arreglo a formato json
      //alert(json_PVA);
      window.sessionStorage.setItem("json_PVA", json_PVA); //mandamos por sesion el json
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
* Funcion para hacer un select a la tabla puertas_valores_preliminar [PVPRE] que recibe por parametro el codigo de la inspeccion
* Se envia por sesion un json con el resultado del select
* El "json" es un arreglo con una coleccion de objetos o un arreglo de arreglos
*==============================================*/
function enviarValoresPreliminarPuertas(codigo_usuario,cod_inspeccion){
  var arreglo_PVPRE = new Array();
  var json_PVPRE;

  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,k_codinspeccion,k_coditem_preli,v_calificacion,o_observacion FROM puertas_valores_preliminar WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [codigo_usuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        cod_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        cod_item = resultSet.rows.item(x).k_coditem_preli;
        calificacion = resultSet.rows.item(x).v_calificacion;
        observacion = resultSet.rows.item(x).o_observacion;

        var item = new Object();
        item.cod_usuario = cod_usuario;
        item.cod_inspeccion = cod_inspeccion;
        item.cod_item = cod_item;
        item.calificacion = calificacion;
        item.observacion = observacion;

        arreglo_PVPRE.push(item);
      }
      json_PVPRE = JSON.stringify(arreglo_PVPRE); //Convertimos el arreglo a formato json
      //alert(json_PVPRE);
      window.sessionStorage.setItem("json_PVPRE", json_PVPRE); //mandamos por sesion el json
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
* Funcion para hacer un select a la tabla puertas_valores_proteccion [PVPP] que recibe por parametro el codigo de la inspeccion
* Se envia por sesion un json con el resultado del select
* El "json" es un arreglo con una coleccion de objetos o un arreglo de arreglos
*==============================================*/
function enviarValoresProteccionPuertas(codigo_usuario,cod_inspeccion){
  var arreglo_PVPP = new Array();
  var json_PVPP;

  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,k_codinspeccion,k_coditem,v_sele_inspector,v_sele_empresa,o_observacion FROM puertas_valores_proteccion WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [codigo_usuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        cod_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        cod_item = resultSet.rows.item(x).k_coditem;
        seleccion_inspector = resultSet.rows.item(x).v_sele_inspector;
        seleccion_empresa = resultSet.rows.item(x).v_sele_empresa;
        observacion = resultSet.rows.item(x).o_observacion;

        var item = new Object();
        item.cod_usuario = cod_usuario;
        item.cod_inspeccion = cod_inspeccion;
        item.cod_item = cod_item;
        item.seleccion_inspector = seleccion_inspector;
        item.seleccion_empresa = seleccion_empresa;
        item.observacion = observacion;

        arreglo_PVPP.push(item);
      }
      json_PVPP = JSON.stringify(arreglo_PVPP); //Convertimos el arreglo a formato json
      //alert(json_PVPP);
      window.sessionStorage.setItem("json_PVPP", json_PVPP); //mandamos por sesion el json

      enviarInspeccionesSeleccionadasPuertas(codigo_usuario,cod_inspeccion); //Se llama aqui la funcion para permitir que las anteriores funciones de enviar valores alcancen a ejecutarse por competo
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
* Funcion para hacer un select a la tabla puertas_valores_elementos[PVE] que recibe por parametro el codigo de la inspeccion
* Se envia por sesion un json con el resultado del select
* El "json" es un arreglo con una coleccion de objetos o un arreglo de arreglos
*==============================================*/
function enviarValoreselementosPuertas(codigo_usuario,cod_inspeccion){
  var arreglo_PVE = new Array();
  var json_PVE;

  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,k_codinspeccion,k_coditem,o_descripcion,v_selecion FROM puertas_valores_elementos WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [codigo_usuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        cod_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        cod_item = resultSet.rows.item(x).k_coditem;
        descripcion = resultSet.rows.item(x).o_descripcion;
        seleccion = resultSet.rows.item(x).v_selecion;

        var item = new Object(); //nuevo objeto siempre que entre al for
        item.cod_usuario = cod_usuario;
        item.cod_inspeccion = cod_inspeccion;
        item.cod_item = cod_item;
        item.descripcion = descripcion;
        item.seleccion = seleccion;

        arreglo_PVE.push(item);
      }
      json_PVE = JSON.stringify(arreglo_PVE); //Convertimos el arreglo a formato json
      //alert(json_PVE);
      window.sessionStorage.setItem("json_PVE", json_PVE); //mandamos por sesion el json
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
* Funcion para hacer un select a la tabla puertas_valores_iniciales [PVI] que recibe por parametro el codigo de la inspeccion
* Se envia por sesion un json con el resultado del select
* Y mandar los valores obtenidos por "POST" y poderlos guardar en la base de datos del servidor
*==============================================*/
function enviarValoresInicialesPuertas(codigo_usuario,cod_inspeccion){
  var arreglo_PVI = new Array();
  var json_PVI;

  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,"+
               "k_codinspeccion,"+
               "n_cliente,"+
               "n_equipo,"+
               "n_empresamto,"+
               "o_desc_puerta,"+
               "o_tipo_puerta,"+
               "o_motorizacion,"+
               "o_acceso,"+
               "o_accionamiento,"+
               "o_operador,"+
               "o_hoja,"+
               "o_transmision,"+
               "o_identificacion,"+
               "f_fecha,"+
               "v_ancho,"+
               "v_alto,"+
               "v_codigo,"+
               "o_consecutivoinsp,"+
               "ultimo_mto,"+
               "inicio_servicio,"+
               "ultima_inspeccion,"+
               "h_hora,"+
               "o_tipo_informe "+
               "FROM puertas_valores_iniciales "+
               "WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [codigo_usuario,cod_inspeccion], function (tx, resultSet) {
      var k_codusuario = resultSet.rows.item(0).k_codusuario;
      var k_codinspeccion = resultSet.rows.item(0).k_codinspeccion;
      var n_cliente = resultSet.rows.item(0).n_cliente;
      var n_equipo = resultSet.rows.item(0).n_equipo;
      var n_empresamto = resultSet.rows.item(0).n_empresamto;
      var o_desc_puerta = resultSet.rows.item(0).o_desc_puerta;
      var o_tipo_puerta = resultSet.rows.item(0).o_tipo_puerta;
      var o_motorizacion = resultSet.rows.item(0).o_motorizacion;
      var o_acceso = resultSet.rows.item(0).o_acceso;
      var o_accionamiento = resultSet.rows.item(0).o_accionamiento;
      var o_operador = resultSet.rows.item(0).o_operador;
      var o_hoja = resultSet.rows.item(0).o_hoja;
      var o_transmision = resultSet.rows.item(0).o_transmision;
      var o_identificacion = resultSet.rows.item(0).o_identificacion;
      var f_fecha = resultSet.rows.item(0).f_fecha;
      var v_ancho = resultSet.rows.item(0).v_ancho;
      var v_alto = resultSet.rows.item(0).v_alto;
      var v_codigo = resultSet.rows.item(0).v_codigo;
      var o_consecutivoinsp = resultSet.rows.item(0).o_consecutivoinsp;
      var ultimo_mto = resultSet.rows.item(0).ultimo_mto;
      var inicio_servicio = resultSet.rows.item(0).inicio_servicio;
      var ultima_inspeccion = resultSet.rows.item(0).ultima_inspeccion;
      var h_hora = resultSet.rows.item(0).h_hora;
      var o_tipo_informe = resultSet.rows.item(0).o_tipo_informe;

      var miObjeto_PVI = new Object(); //nuevo objeto siempre que entre al for
      miObjeto_PVI.k_codusuario = k_codusuario;
      miObjeto_PVI.k_codinspeccion = k_codinspeccion;
      miObjeto_PVI.n_cliente = n_cliente;
      miObjeto_PVI.n_equipo = n_equipo;
      miObjeto_PVI.n_empresamto = n_empresamto; 
      miObjeto_PVI.o_desc_puerta = o_desc_puerta;
      miObjeto_PVI.o_tipo_puerta = o_tipo_puerta;
      miObjeto_PVI.o_motorizacion = o_motorizacion;
      miObjeto_PVI.o_acceso = o_acceso;
      miObjeto_PVI.o_accionamiento = o_accionamiento;
      miObjeto_PVI.o_operador = o_operador;
      miObjeto_PVI.o_hoja = o_hoja;
      miObjeto_PVI.o_transmision = o_transmision;
      miObjeto_PVI.o_identificacion = o_identificacion;
      miObjeto_PVI.f_fecha = f_fecha;
      miObjeto_PVI.v_ancho = v_ancho;
      miObjeto_PVI.v_alto = v_alto;
      miObjeto_PVI.v_codigo = v_codigo;
      miObjeto_PVI.o_consecutivoinsp = o_consecutivoinsp;
      miObjeto_PVI.ultimo_mto = ultimo_mto;
      miObjeto_PVI.inicio_servicio = inicio_servicio;
      miObjeto_PVI.ultima_inspeccion = ultima_inspeccion;
      miObjeto_PVI.h_hora = h_hora;
      miObjeto_PVI.o_tipo_informe = o_tipo_informe;

      arreglo_PVI.push(miObjeto_PVI);

      json_PVI = JSON.stringify(arreglo_PVI); //Convertimos el arreglo a formato json
      //alert(json_PVI);
      window.sessionStorage.setItem("json_PVI", json_PVI); //mandamos por sesion el objeto
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
* Funcion para hacer un select a la tabla puertas_valores_mecanicos[PVM] que recibe por parametro el codigo de la inspeccion
* Se envia por sesion un json con el resultado del select
* El "json" es un arreglo con una coleccion de objetos o un arreglo de arreglos
*==============================================*/
function enviarValoresMecanicosPuertas(codigo_usuario,cod_inspeccion){
  var arreglo_PVM = new Array();
  var json_PVM;

  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion FROM puertas_valores_mecanicos WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [codigo_usuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        cod_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        cod_item = resultSet.rows.item(x).k_coditem;
        nombre_calificacion = resultSet.rows.item(x).n_calificacion;
        valor_calificacion = resultSet.rows.item(x).v_calificacion;
        observacion = resultSet.rows.item(x).o_observacion;

        var item = new Object(); //nuevo objeto siempre que entre al for
        item.cod_usuario = cod_usuario;
        item.cod_inspeccion = cod_inspeccion;
        item.cod_item = cod_item;
        item.nombre_calificacion = nombre_calificacion;
        item.valor_calificacion = valor_calificacion;
        item.observacion = observacion;

        arreglo_PVM.push(item);
      }
      json_PVM = JSON.stringify(arreglo_PVM); //Convertimos el arreglo a formato json
      //alert(json_PVM);
      window.sessionStorage.setItem("json_PVM", json_PVM); //mandamos por sesion el json
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
* Funcion para hacer un select a la tabla puertas_valores_electrica[PVE] que recibe por parametro el codigo de la inspeccion
* Se envia por sesion un json con el resultado del select
* El "json" es un arreglo con una coleccion de objetos o un arreglo de arreglos
*==============================================*/
function enviarValoresElectricaPuertas(codigo_usuario,cod_inspeccion){
  var arreglo_PVE = new Array();
  var json_PVEL;

  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion FROM puertas_valores_electrica WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [codigo_usuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        cod_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        cod_item = resultSet.rows.item(x).k_coditem;
        nombre_calificacion = resultSet.rows.item(x).n_calificacion;
        valor_calificacion = resultSet.rows.item(x).v_calificacion;
        observacion = resultSet.rows.item(x).o_observacion;

        var item = new Object(); //nuevo objeto siempre que entre al for
        item.cod_usuario = cod_usuario;
        item.cod_inspeccion = cod_inspeccion;
        item.cod_item = cod_item;
        item.nombre_calificacion = nombre_calificacion;
        item.valor_calificacion = valor_calificacion;
        item.observacion = observacion;

        arreglo_PVE.push(item);
      }
      json_PVEL = JSON.stringify(arreglo_PVE); //Convertimos el arreglo a formato json
      //alert(json_PVEL);
      window.sessionStorage.setItem("json_PVEL", json_PVEL); //mandamos por sesion el json
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
* Funcion para hacer un select a la tabla puertas_valores_motorizacion[PVMO] que recibe por parametro el codigo de la inspeccion
* Se envia por sesion un json con el resultado del select
* El "json" es un arreglo con una coleccion de objetos o un arreglo de arreglos
*==============================================*/
function enviarValoresMotorizacionPuertas(codigo_usuario,cod_inspeccion){
  var arreglo_PVMO = new Array();
  var json_PVMO;

  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion FROM puertas_valores_motorizacion WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [codigo_usuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        cod_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        cod_item = resultSet.rows.item(x).k_coditem;
        nombre_calificacion = resultSet.rows.item(x).n_calificacion;
        valor_calificacion = resultSet.rows.item(x).v_calificacion;
        observacion = resultSet.rows.item(x).o_observacion;

        var item = new Object(); //nuevo objeto siempre que entre al for
        item.cod_usuario = cod_usuario;
        item.cod_inspeccion = cod_inspeccion;
        item.cod_item = cod_item;
        item.nombre_calificacion = nombre_calificacion;
        item.valor_calificacion = valor_calificacion;
        item.observacion = observacion;

        arreglo_PVMO.push(item);
      }
      json_PVMO = JSON.stringify(arreglo_PVMO); //Convertimos el arreglo a formato json
      //alert(json_PVMO);
      window.sessionStorage.setItem("json_PVMO", json_PVMO); //mandamos por sesion el json
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
* Funcion para hacer un select a la tabla puertas_valores_otras[PVO] que recibe por parametro el codigo de la inspeccion
* Se envia por sesion un json con el resultado del select
* El "json" es un arreglo con una coleccion de objetos o un arreglo de arreglos
*==============================================*/
function enviarValoresOtrasPuertas(codigo_usuario,cod_inspeccion){
  var arreglo_PVO = new Array();
  var json_PVO;

  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion FROM puertas_valores_otras WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [codigo_usuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        cod_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        cod_item = resultSet.rows.item(x).k_coditem;
        nombre_calificacion = resultSet.rows.item(x).n_calificacion;
        valor_calificacion = resultSet.rows.item(x).v_calificacion;
        observacion = resultSet.rows.item(x).o_observacion;

        var item = new Object(); //nuevo objeto siempre que entre al for
        item.cod_usuario = cod_usuario;
        item.cod_inspeccion = cod_inspeccion;
        item.cod_item = cod_item;
        item.nombre_calificacion = nombre_calificacion;
        item.valor_calificacion = valor_calificacion;
        item.observacion = observacion;

        arreglo_PVO.push(item);
      }
      json_PVO = JSON.stringify(arreglo_PVO); //Convertimos el arreglo a formato json
      //alert(json_PVO);
      window.sessionStorage.setItem("json_PVO", json_PVO); //mandamos por sesion el json
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
* Funcion para hacer un select a la tabla puertas_valores_maniobras[PVMA] que recibe por parametro el codigo de la inspeccion
* Se envia por sesion un json con el resultado del select
* El "json" es un arreglo con una coleccion de objetos o un arreglo de arreglos
*==============================================*/
function enviarValoresManiobrasPuertas(codigo_usuario,cod_inspeccion){
  var arreglo_PVMA = new Array();
  var json_PVMA;

  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion FROM puertas_valores_maniobras WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [codigo_usuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        cod_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        cod_item = resultSet.rows.item(x).k_coditem;
        nombre_calificacion = resultSet.rows.item(x).n_calificacion;
        valor_calificacion = resultSet.rows.item(x).v_calificacion;
        observacion = resultSet.rows.item(x).o_observacion;

        var item = new Object(); //nuevo objeto siempre que entre al for
        item.cod_usuario = cod_usuario;
        item.cod_inspeccion = cod_inspeccion;
        item.cod_item = cod_item;
        item.nombre_calificacion = nombre_calificacion;
        item.valor_calificacion = valor_calificacion;
        item.observacion = observacion;

        arreglo_PVMA.push(item);
      }
      json_PVMA = JSON.stringify(arreglo_PVMA); //Convertimos el arreglo a formato json
      //alert(json_PVMA);
      window.sessionStorage.setItem("json_PVMA", json_PVMA); //mandamos por sesion el json
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
* Funcion para hacer un select a la tabla puertas_valores_finales [PVOF] que recibe por parametro el codigo de la inspeccion
* Se envia por sesion un json con el resultado del select
* Y mandar los valores obtenidos por "POST" y poderlos guardar en la base de datos del servidor
*==============================================*/
function enviarValoresFinalesPuertas(codigo_usuario,cod_inspeccion){
  var arreglo_PVOF = new Array();
  var json_PVOF;

  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,k_codinspeccion,o_observacion FROM puertas_valores_finales WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [codigo_usuario,cod_inspeccion], function (tx, resultSet) {
      var cod_usuario = resultSet.rows.item(0).k_codusuario;
      var cod_inspeccion = resultSet.rows.item(0).k_codinspeccion;
      var observacion = resultSet.rows.item(0).o_observacion;

      var item = new Object(); //nuevo objeto
      item.cod_usuario = cod_usuario;
      item.cod_inspeccion = cod_inspeccion;
      item.observacion = observacion;

      arreglo_PVOF.push(item);

      json_PVOF = JSON.stringify(arreglo_PVOF); //Convertimos el arreglo a formato json
      //alert(json_PVOF);
      window.sessionStorage.setItem("json_PVOF", json_PVOF); //mandamos por sesion el objeto
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

var cantidad_datos_puertas = 0;
var pila_datos_puertas = new Stack();
/*=============================================
* Funcion para hacer un select a la tabla auditoria_inspecciones_puertas[PVFG] que recibe por parametro el codigo de la inspeccion
* Se envian los datos al servidor
*==============================================*/
function obtenerArchivosSeleccionadosPuertas(){
  $('#texto_carga').text('Cargando datos de inspección...Espere');
  db.transaction(function (tx) {
    var query = "SELECT * FROM auditoria_inspecciones_puertas WHERE o_estado_envio = ?";
    tx.executeSql(query, ['Pendiente'], function (tx, resultSet) {
      try{
        for(var x = 0; x < resultSet.rows.length; x++) {
          codigo_usuario = resultSet.rows.item(x).k_codusuario;
          codigo_inspeccion = resultSet.rows.item(x).k_codinspeccion;
          o_consecutivoinsp = resultSet.rows.item(x).o_consecutivoinsp;
          var id_check = 'put-'+codigo_usuario+'-'+codigo_inspeccion;

          if( $('#'+id_check+'').prop('checked') ) {
            //alert('checkBox'+id_check+' esta seleccionado!');
            pila_datos_puertas.add(o_consecutivoinsp);
            cantidad_datos_puertas += 1;
            //alert(cantidad_datos_puertas);
          }
        }
      }catch(err) {
        //alert(err.message);
      }
      enviarDatosPuertas();
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
* Funcion para hacer un select a la tabla auditoria_inspecciones_puertas[AVFG] que recibe por parametro el codigo de la inspeccion
* Se envian los datos al servidor
*==============================================*/
function enviarDatosPuertas(){
  if (pila_datos_puertas.hasElements()) {
    $('#texto_carga').text('Cargando datos de inspección...Espere');
    var inspecc_selec = pila_datos_puertas.getTopElement();
    db.transaction(function (tx) {
      var query = "SELECT * FROM auditoria_inspecciones_puertas WHERE o_estado_envio = ? AND o_consecutivoinsp = ?";
      tx.executeSql(query, ['Pendiente',inspecc_selec], function (tx, resultSet) {
        try{
          for(var x = 0; x < resultSet.rows.length; x++) {
            codigo_usuario = resultSet.rows.item(x).k_codusuario;
            codigo_inspeccion = resultSet.rows.item(x).k_codinspeccion;

            enviarValoresAudiosPuertas(codigo_usuario,codigo_inspeccion);
            enviarValoresMecanicosPuertas(codigo_usuario,codigo_inspeccion);
            enviarValoresElectricaPuertas(codigo_usuario,codigo_inspeccion);
            enviarValoresMotorizacionPuertas(codigo_usuario,codigo_inspeccion);
            enviarValoresOtrasPuertas(codigo_usuario,codigo_inspeccion);
            enviarValoresManiobrasPuertas(codigo_usuario,codigo_inspeccion);
            enviarValoreselementosPuertas(codigo_usuario,codigo_inspeccion);
            enviarValoresFinalesPuertas(codigo_usuario,codigo_inspeccion);
            enviarValoresInicialesPuertas(codigo_usuario,codigo_inspeccion);
            enviarValoresPreliminarPuertas(codigo_usuario,codigo_inspeccion);
            enviarValoresProteccionPuertas(codigo_usuario,codigo_inspeccion); //Dentro de esta se llama la funcion enviarInspeccionesSeleccionadasPuertas() para que se repita el ciclo de envio de inspeccion si hay otra pendiente
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
    obtenerArchivosSeleccionadosEscaleras();
  }
}

/*=============================================
* Funcion que se ejecuta al terminar de enviar por sesion todos los JSON con los distintos valores de la inspeccion
* Esta funcion obtiene los JSON con los valores de la inspeccion y los envia al servidor, si el servidor ejecuta con 
* exito todos los insert SQL devuelve un "0", si es asi se actualiza la tabla de auditoria de la inspeccion y
* se llama a ejecucion de nuevo la funcion "enviarDatosPuertas" para continuar hacer de nuevo el proceso si queda alguna inspeccion
* con estado pendiente (Al ejecutar esta funcion en el servidor se crea el respectivo PDF de la inspeccion)
*==============================================*/
function enviarInspeccionesSeleccionadasPuertas(codigo_usuario,codigo_inspeccion){
  var k_codusuario_modifica = window.localStorage.getItem("codigo_inspector");
  $('#texto_carga').text('Enviando inspección '+codigo_usuario+'-'+codigo_inspeccion+'...Espere');
  $.post('http://192.168.0.26:8080/inspeccion/servidor/php/puertas_guardar_datos_lista_inspeccion.php',{
    json_PVA: window.sessionStorage.getItem("json_PVA"),
    json_PVM: window.sessionStorage.getItem("json_PVM"),
    json_PVEL: window.sessionStorage.getItem("json_PVEL"),
    json_PVMO: window.sessionStorage.getItem("json_PVMO"),
    json_PVO: window.sessionStorage.getItem("json_PVO"),
    json_PVMA: window.sessionStorage.getItem("json_PVMA"),
    json_PVE: window.sessionStorage.getItem("json_PVE"),
    json_PVOF: window.sessionStorage.getItem("json_PVOF"),
    json_PVI: window.sessionStorage.getItem("json_PVI"),
    json_PVPRE: window.sessionStorage.getItem("json_PVPRE"),
    json_PVPP: window.sessionStorage.getItem("json_PVPP")
  },function(e){
    //alert("enviarInspeccionesSeleccionadasPuertas-> "+e);
    if (e == 0) {
      $('#texto_carga').text('Inpección '+codigo_usuario+'-'+codigo_inspeccion+' Saved...OK');
      var cod_cliente = window.sessionStorage.getItem("codigo_cliente");
      var cod_informe = window.sessionStorage.getItem("cantidadInformes");
      updateItemsAuditoriaInspeccionesPuertas("Enviada",cod_cliente,cod_informe,codigo_inspeccion,codigo_usuario,k_codusuario_modifica);
      //updateItemsAuditoriaInspeccionesPuertas("Pendiente",cod_cliente,cod_informe,codigo_inspeccion,codigo_usuario,k_codusuario_modifica);
    }else{
      cerrarVentanaCarga("Ocurrio un error al enviar los datos al servidor! enviarInspeccionesSeleccionadasPuertas\n\nCódigo de error: "+e);
    }
  });
}

/*=============================================
* Funcion para actualizar una fila en la tabla auditoria_inspecciones_puertas
*==============================================*/
function updateItemsAuditoriaInspeccionesPuertas(estado,cod_cliente,cod_informe, cod_inspeccion,codigo_inspector,k_codusuario_modifica) {
  //alert("update->"+cod_inspeccion);
  //alert(estado+" "+cod_cliente+" "+cod_informe+" "+cod_inspeccion);
  db.transaction(function (tx) {
    var query = "UPDATE auditoria_inspecciones_puertas SET o_estado_envio = ?,"+
                                                              "k_codcliente = ?,"+
                                                              "k_codinforme = ?,"+
                                                              "k_codusuario_modifica = ? "+
                                                              "WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [estado,cod_cliente,cod_informe,k_codusuario_modifica,codigo_inspector,cod_inspeccion], function(tx, res) {
      console.log("rowsAffected updateItemsAuditoriaInspeccionesPuertas: " + res.rowsAffected);
    },
    function(tx, error) {
      console.log('UPDATE error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok');
    enviarValoresAuditoriaPuertas(codigo_inspector,cod_inspeccion); //cargamos en sesion el JSON con los valores de auditoria
  });
}

/*=============================================
* Funcion para hacer un select a la tabla auditoria_inspecciones_puertas que recibe por parametro el codigo de la inspeccion
* Se envia por sesion un json con el resultado del select
* El "json" es un arreglo con una coleccion de objetos o un arreglo de arreglos
*==============================================*/
function enviarValoresAuditoriaPuertas(codigo_inspector,cod_inspeccion){
  var arreglo_auditoria_puertas = new Array();
  var json_auditoria_puertas;

  db.transaction(function (tx) {
    var query = "SELECT * FROM auditoria_inspecciones_puertas WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [codigo_inspector,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        cod_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        consecutivoinsp = resultSet.rows.item(x).o_consecutivoinsp;
        estado_envio = resultSet.rows.item(x).o_estado_envio;
        revision = resultSet.rows.item(x).o_revision;
        cantidad_item_nocumple = resultSet.rows.item(x).v_item_nocumple;
        codcliente = resultSet.rows.item(x).k_codcliente;
        codinforme = resultSet.rows.item(x).k_codinforme;
        k_codusuario_modifica = resultSet.rows.item(x).k_codusuario_modifica;
        o_actualizar_inspeccion = resultSet.rows.item(x).o_actualizar_inspeccion;

        var item = new Object();
        item.cod_usuario = cod_usuario;
        item.cod_inspeccion = cod_inspeccion;
        item.consecutivoinsp = consecutivoinsp;
        item.estado_envio = estado_envio;
        item.revision = revision;
        item.cantidad_item_nocumple = cantidad_item_nocumple;
        item.codcliente = codcliente;
        item.codinforme = codinforme;
        item.k_codusuario_modifica = k_codusuario_modifica;
        item.o_actualizar_inspeccion = o_actualizar_inspeccion;

        arreglo_auditoria_puertas.push(item);
      }
      json_auditoria_puertas = JSON.stringify(arreglo_auditoria_puertas); //Convertimos el arreglo a formato json
      //alert(json_auditoria_puertas);
      window.sessionStorage.setItem("json_auditoria_puertas", json_auditoria_puertas); //mandamos por sesion el json
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
    enviarDatosAuditoriaPuertas(codigo_inspector,cod_inspeccion); //enviamos los valores de la tabla auditoria al servidor
  });
}

function enviarDatosAuditoriaPuertas(codigo_inspector,cod_inspeccion){
  $.post('http://192.168.0.26:8080/inspeccion/servidor/php/puertas_guardar_datos_auditoria_inspeccion.php',{
    caso: "auditoria_puertas",
    codigo_inspector: codigo_inspector,
    json_auditoria_puertas: window.sessionStorage.getItem("json_auditoria_puertas")
  },function(e){
    //alert("enviarDatosAuditoriaPuertas-> "+e);
    if (e == 0) {
      enviarArchivosAudioPuertas(codigo_inspector,cod_inspeccion); //enviar los archivos de audios al servidor, al final de esta funcion se llama la de crear PDF
    }else{
      cerrarVentanaCarga("Ocurrio un error al enviar los datos al servidor! enviarDatosAuditoriaPuertas\n\nCódigo de error: "+e);
    }
  });
}

var bandera_audios_puertas;
/*=============================================
* Funcion para hacer un select a la tabla puertas_valores_audios[PVA] que recibe por parametro el codigo de la inspeccion
* Se envian los archivos de audio al servidor
*==============================================*/
function enviarArchivosAudioPuertas(codigo_inspector,cod_inspeccion){
  $('#texto_carga').text('Cargando archivos de audio...Espere');
  var cantidad_archivos = 0;
  bandera_audios_puertas = 0;
  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,k_codinspeccion,n_audio,n_directorio FROM puertas_valores_audios WHERE k_codusuario = ? AND k_codinspeccion = ? AND o_estado_envio = ?";
    tx.executeSql(query, [codigo_inspector,cod_inspeccion,'Pendiente'], function (tx, resultSet) {
      cantidad_archivos = resultSet.rows.length;
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        cod_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        nombre_audio = resultSet.rows.item(x).n_audio;
        nombre_directorio = resultSet.rows.item(x).n_directorio;

        uploadAudioPuertas(nombre_directorio,nombre_audio,cod_usuario,cod_inspeccion,'Enviada',cantidad_archivos,codigo_inspector);
      }
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
    if (cantidad_archivos == 0) {
      crearPDFPuertas(codigo_inspector,cod_inspeccion); //Llamamos la funcion de crear PDF
    }
  });
}

/*=============================================
* Funcion que permite subir los archivos de audio al servidor
*==============================================*/
function uploadAudioPuertas(directorio,nombre_archivo,cod_usuario,cod_inspeccion,estado_envio,cantidad_archivos,codigo_inspector) {
  var directorio = "file:///sdcard"+directorio;
  var nombreDeArchivo = nombre_archivo;
  var fileURL = directorio + "/" + nombreDeArchivo;

  var win = function (r) {
    console.log("Successful upload...");
    console.log("Code = " + r.responseCode);
    updateItemsPuertasValoresAudios(cod_usuario,cod_inspeccion,'Enviada');
    borrarArchivo(directorio, nombreDeArchivo);
    $('#texto_carga').text("Audio puertas "+nombre_archivo+" subido...ok");
    bandera_audios_puertas += 1;
    if (bandera_audios_puertas == cantidad_archivos) {
      $('#texto_carga').text(cantidad_archivos + " audios subidos...ok");
      crearPDFPuertas(codigo_inspector,cod_inspeccion); //Llamamos la funcion de crear PDF
    }
  }

  var fail = function (error) {
    //alert("No hay audios a ser cargados! Code = " + error.code);
  }

  var uri = encodeURI("http://192.168.0.26:8080/inspeccion/servidor/php/puertas_upload_audios.php");

  var options = new FileUploadOptions();
  options.fileKey="file";
  options.fileName=fileURL.substr(fileURL.lastIndexOf('/')+1);
  options.mimeType="audio/3gpp";

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

/*=============================================
* Funcion que permite crear en el servidor el PDF de la inspeccion
*==============================================*/
function crearPDFPuertas(codigo_inspector,codigo_inspeccion){
  var codigo_inspector_dispositivo = window.localStorage.getItem("codigo_inspector");
  $('#texto_carga').text('Creando PDF '+codigo_inspector+'-'+codigo_inspeccion+'...Espere');
  $.post('http://192.168.0.26:8080/inspeccion/servidor/php/puertas_crear_pdf_inspeccion.php',{
    codigo_inspector_dispositivo: codigo_inspector_dispositivo,
    codigo_inspector: codigo_inspector,
    codigo_inspeccion: codigo_inspeccion,
    fecha_emision: mostrarFecha()
  },function(e){
    //alert("crearPDFPuertas-> "+e);
    if (e == 0) {
      //alert("errores -> "+e);
      $('#texto_carga').text('PDF de inspección '+codigo_inspector+'-'+codigo_inspeccion+' Saved...OK');
      pila_datos_puertas.pop();
      enviarDatosPuertas();
    }else{
      cerrarVentanaCarga("Ocurrio un error al enviar los datos al servidor! crearPDFPuertas\n\nCódigo de error: "+e);
    }
  });
}

/*=============================================
* Funcion para actualizar una fila en la tabla puertas_valores_audios
*==============================================*/
function updateItemsPuertasValoresAudios(k_codusuario,k_codinspeccion,o_estado_envio) {
  //alert("audio -> "+o_estado_envio);
  db.transaction(function (tx) {
    var query = "UPDATE puertas_valores_audios SET o_estado_envio = ? "+
                                                    "WHERE k_codusuario = ? "+
                                                    "AND k_codinspeccion = ? ";
    tx.executeSql(query, [o_estado_envio,k_codusuario,k_codinspeccion], function(tx, res) {
      console.log("rowsAffected updateItemsPuertasValoresAudios: " + res.rowsAffected);
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
****************** ESCALERAS *****************
*==============================================*/

/*=============================================
* Funcion para hacer un select a la tabla escaleras_valores_audios[EVA] que recibe por parametro el codigo de la inspeccion
* Se envia por sesion un json con el resultado del select
* El "json" es un arreglo con una coleccion de objetos o un arreglo de arreglos
*==============================================*/
function enviarValoresAudiosEscaleras(codigo_usuario,cod_inspeccion){
  var arreglo_EVA = new Array();
  var json_EVA;

  db.transaction(function (tx) {
    var query = "SELECT * FROM escaleras_valores_audios WHERE k_codusuario = ? AND k_codinspeccion = ? AND o_estado_envio = ?";
    tx.executeSql(query, [codigo_usuario,cod_inspeccion,'Pendiente'], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        cod_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        nombre_audio = resultSet.rows.item(x).n_audio;
        nombre_directorio = resultSet.rows.item(x).n_directorio;
        o_estado_envio = resultSet.rows.item(x).o_estado_envio;

        var item = new Object(); //nuevo objeto siempre que entre al for
        item.cod_usuario = cod_usuario;
        item.cod_inspeccion = cod_inspeccion;
        item.nombre_audio = nombre_audio;
        item.nombre_directorio = nombre_directorio;
        item.o_estado_envio = o_estado_envio;

        arreglo_EVA.push(item);
      }
      json_EVA = JSON.stringify(arreglo_EVA); //Convertimos el arreglo a formato json
      //alert(json_EVA);
      window.sessionStorage.setItem("json_EVA", json_EVA); //mandamos por sesion el json
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
* Funcion para hacer un select a la tabla escaleras_valores_preliminar [EVPRE] que recibe por parametro el codigo de la inspeccion
* Se envia por sesion un json con el resultado del select
* El "json" es un arreglo con una coleccion de objetos o un arreglo de arreglos
*==============================================*/
function enviarValoresPreliminarEscaleras(codigo_usuario,cod_inspeccion){
  var arreglo_EVPRE = new Array();
  var json_EVPRE;

  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,k_codinspeccion,k_coditem_preli,v_calificacion,o_observacion FROM escaleras_valores_preliminar WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [codigo_usuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        cod_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        cod_item = resultSet.rows.item(x).k_coditem_preli;
        calificacion = resultSet.rows.item(x).v_calificacion;
        observacion = resultSet.rows.item(x).o_observacion;

        var item = new Object();
        item.cod_usuario = cod_usuario;
        item.cod_inspeccion = cod_inspeccion;
        item.cod_item = cod_item;
        item.calificacion = calificacion;
        item.observacion = observacion;

        arreglo_EVPRE.push(item);
      }
      json_EVPRE = JSON.stringify(arreglo_EVPRE); //Convertimos el arreglo a formato json
      //alert(json_EVPRE);
      window.sessionStorage.setItem("json_EVPRE", json_EVPRE); //mandamos por sesion el json
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
* Funcion para hacer un select a la tabla escaleras_valores_proteccion [EVPP] que recibe por parametro el codigo de la inspeccion
* Se envia por sesion un json con el resultado del select
* El "json" es un arreglo con una coleccion de objetos o un arreglo de arreglos
*==============================================*/
function enviarValoresProteccionEscaleras(codigo_usuario,cod_inspeccion){
  var arreglo_EVPP = new Array();
  var json_EVPP;

  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,k_codinspeccion,k_coditem,v_sele_inspector,v_sele_empresa,o_observacion FROM escaleras_valores_proteccion WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [codigo_usuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        cod_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        cod_item = resultSet.rows.item(x).k_coditem;
        seleccion_inspector = resultSet.rows.item(x).v_sele_inspector;
        seleccion_empresa = resultSet.rows.item(x).v_sele_empresa;
        observacion = resultSet.rows.item(x).o_observacion;

        var item = new Object();
        item.cod_usuario = cod_usuario;
        item.cod_inspeccion = cod_inspeccion;
        item.cod_item = cod_item;
        item.seleccion_inspector = seleccion_inspector;
        item.seleccion_empresa = seleccion_empresa;
        item.observacion = observacion;

        arreglo_EVPP.push(item);
      }
      json_EVPP = JSON.stringify(arreglo_EVPP); //Convertimos el arreglo a formato json
      //alert(json_EVPP);
      window.sessionStorage.setItem("json_EVPP", json_EVPP); //mandamos por sesion el json

      enviarInspeccionesSeleccionadasEscaleras(codigo_usuario,cod_inspeccion); //Se llama aqui la funcion para permitir que las anteriores funciones de enviar valores alcancen a ejecutarse por competo
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
* Funcion para hacer un select a la tabla escaleras_valores_elementos[EVE] que recibe por parametro el codigo de la inspeccion
* Se envia por sesion un json con el resultado del select
* El "json" es un arreglo con una coleccion de objetos o un arreglo de arreglos
*==============================================*/
function enviarValoreselementosEscaleras(codigo_usuario,cod_inspeccion){
  var arreglo_EVE = new Array();
  var json_EVE;

  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,k_codinspeccion,k_coditem,o_descripcion,v_selecion FROM escaleras_valores_elementos WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [codigo_usuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        cod_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        cod_item = resultSet.rows.item(x).k_coditem;
        descripcion = resultSet.rows.item(x).o_descripcion;
        seleccion = resultSet.rows.item(x).v_selecion;

        var item = new Object(); //nuevo objeto siempre que entre al for
        item.cod_usuario = cod_usuario;
        item.cod_inspeccion = cod_inspeccion;
        item.cod_item = cod_item;
        item.descripcion = descripcion;
        item.seleccion = seleccion;

        arreglo_EVE.push(item);
      }
      json_EVE = JSON.stringify(arreglo_EVE); //Convertimos el arreglo a formato json
      //alert(json_EVE);
      window.sessionStorage.setItem("json_EVE", json_EVE); //mandamos por sesion el json
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
* Funcion para hacer un select a la tabla escaleras_valores_iniciales [EVI] que recibe por parametro el codigo de la inspeccion
* Se envia por sesion un json con el resultado del select
* Y mandar los valores obtenidos por "POST" y poderlos guardar en la base de datos del servidor
*==============================================*/
function enviarValoresInicialesEscaleras(codigo_usuario,cod_inspeccion){
  var arreglo_EVI = new Array();
  var json_EVI;

  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,"+
               "k_codinspeccion,"+
               "n_cliente,"+
               "n_equipo,"+
               "n_empresamto,"+
               "v_velocidad,"+
               "o_tipo_equipo,"+
               "v_inclinacion,"+
               "v_ancho_paso,"+
               "f_fecha,"+
               "v_codigo,"+
               "o_consecutivoinsp,"+
               "ultimo_mto,"+
               "inicio_servicio,"+
               "ultima_inspeccion,"+
               "h_hora,"+
               "o_tipo_informe "+
               "FROM escaleras_valores_iniciales "+
               "WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [codigo_usuario,cod_inspeccion], function (tx, resultSet) {
      var cod_usuario = resultSet.rows.item(0).k_codusuario;
      var cod_inspeccion = resultSet.rows.item(0).k_codinspeccion;
      var cliente = resultSet.rows.item(0).n_cliente;
      var nombre_equipo = resultSet.rows.item(0).n_equipo;
      var empresa_mto = resultSet.rows.item(0).n_empresamto;
      var velocidad = resultSet.rows.item(0).v_velocidad;
      var tipo_equipo = resultSet.rows.item(0).o_tipo_equipo;
      var inclinacion = resultSet.rows.item(0).v_inclinacion;
      var fecha = resultSet.rows.item(0).f_fecha;
      var ancho_paso = resultSet.rows.item(0).v_ancho_paso;
      var codigo = resultSet.rows.item(0).v_codigo;
      var consecutivo = resultSet.rows.item(0).o_consecutivoinsp;
      var ultimo_mto = resultSet.rows.item(0).ultimo_mto;
      var inicio_servicio = resultSet.rows.item(0).inicio_servicio;
      var ultima_inspeccion = resultSet.rows.item(0).ultima_inspeccion;
      var hora = resultSet.rows.item(0).h_hora;
      var tipo_informe = resultSet.rows.item(0).o_tipo_informe;

      var miObjeto_EVI = new Object(); //nuevo objeto siempre que entre al for
      miObjeto_EVI.cod_usuario = cod_usuario;
      miObjeto_EVI.cod_inspeccion = cod_inspeccion;
      miObjeto_EVI.cliente = cliente;
      miObjeto_EVI.nombre_equipo = nombre_equipo;
      miObjeto_EVI.empresa_mto = empresa_mto; 
      miObjeto_EVI.velocidad = velocidad;
      miObjeto_EVI.tipo_equipo = tipo_equipo;
      miObjeto_EVI.inclinacion = inclinacion;
      miObjeto_EVI.fecha = fecha;
      miObjeto_EVI.ancho_paso = ancho_paso;
      miObjeto_EVI.codigo = codigo;
      miObjeto_EVI.consecutivo = consecutivo;
      miObjeto_EVI.ultimo_mto = ultimo_mto;
      miObjeto_EVI.inicio_servicio = inicio_servicio;
      miObjeto_EVI.ultima_inspeccion = ultima_inspeccion;
      miObjeto_EVI.hora = hora;
      miObjeto_EVI.tipo_informe = tipo_informe;

      arreglo_EVI.push(miObjeto_EVI);

      json_EVI = JSON.stringify(arreglo_EVI); //Convertimos el arreglo a formato json
      window.sessionStorage.setItem("json_EVI", json_EVI); //mandamos por sesion el objeto
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
* Funcion para hacer un select a la tabla escaleras_valores_defectos[EVD] que recibe por parametro el codigo de la inspeccion
* Se envia por sesion un json con el resultado del select
* El "json" es un arreglo con una coleccion de objetos o un arreglo de arreglos
*==============================================*/
function enviarValoresDefectosEscaleras(codigo_usuario,cod_inspeccion){
  var arreglo_EVD = new Array();
  var json_EVD;

  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion FROM escaleras_valores_defectos WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [codigo_usuario,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        cod_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        cod_item = resultSet.rows.item(x).k_coditem;
        nombre_calificacion = resultSet.rows.item(x).n_calificacion;
        valor_calificacion = resultSet.rows.item(x).v_calificacion;
        observacion = resultSet.rows.item(x).o_observacion;

        var item = new Object(); //nuevo objeto siempre que entre al for
        item.cod_usuario = cod_usuario;
        item.cod_inspeccion = cod_inspeccion;
        item.cod_item = cod_item;
        item.nombre_calificacion = nombre_calificacion;
        item.valor_calificacion = valor_calificacion;
        item.observacion = observacion;

        arreglo_EVD.push(item);
      }
      json_EVD = JSON.stringify(arreglo_EVD); //Convertimos el arreglo a formato json
      //alert(json_EVD);
      window.sessionStorage.setItem("json_EVD", json_EVD); //mandamos por sesion el json
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
* Funcion para hacer un select a la tabla escaleras_valores_finales [EVOF] que recibe por parametro el codigo de la inspeccion
* Se envia por sesion un json con el resultado del select
* Y mandar los valores obtenidos por "POST" y poderlos guardar en la base de datos del servidor
*==============================================*/
function enviarValoresFinalesEscaleras(codigo_usuario,cod_inspeccion){
  var arreglo_EVOF = new Array();
  var json_EVOF;

  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,k_codinspeccion,o_observacion FROM escaleras_valores_finales WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [codigo_usuario,cod_inspeccion], function (tx, resultSet) {
      var cod_usuario = resultSet.rows.item(0).k_codusuario;
      var cod_inspeccion = resultSet.rows.item(0).k_codinspeccion;
      var observacion = resultSet.rows.item(0).o_observacion;

      var item = new Object(); //nuevo objeto
      item.cod_usuario = cod_usuario;
      item.cod_inspeccion = cod_inspeccion;
      item.observacion = observacion;

      arreglo_EVOF.push(item);

      json_EVOF = JSON.stringify(arreglo_EVOF); //Convertimos el arreglo a formato json
      //alert(json_EVOF);
      window.sessionStorage.setItem("json_EVOF", json_EVOF); //mandamos por sesion el objeto
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

var cantidad_datos_escaleras = 0;
var pila_datos_escaleras = new Stack();
/*=============================================
* Funcion para hacer un select a la tabla auditoria_inspecciones_escaleras[EVFG] que recibe por parametro el codigo de la inspeccion
* Se envian los datos al servidor
*==============================================*/
function obtenerArchivosSeleccionadosEscaleras(){
  $('#texto_carga').text('Cargando datos de inspección...Espere');
  db.transaction(function (tx) {
    var query = "SELECT * FROM auditoria_inspecciones_escaleras WHERE o_estado_envio = ?";
    tx.executeSql(query, ['Pendiente'], function (tx, resultSet) {
      try{
        for(var x = 0; x < resultSet.rows.length; x++) {
          codigo_usuario = resultSet.rows.item(x).k_codusuario;
          codigo_inspeccion = resultSet.rows.item(x).k_codinspeccion;
          o_consecutivoinsp = resultSet.rows.item(x).o_consecutivoinsp;
          var id_check = 'esc-'+codigo_usuario+'-'+codigo_inspeccion;

          if( $('#'+id_check+'').prop('checked') ) {
            //alert('checkBox'+id_check+' esta seleccionado!');
            pila_datos_escaleras.add(o_consecutivoinsp);
            cantidad_datos_escaleras += 1;
            //alert(cantidad_datos_escaleras);
          }
        }
      }catch(err) {
        //alert(err.message);
      }
      enviarDatosEscaleras();
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
* Funcion para hacer un select a la tabla auditoria_inspecciones_escaleras[EVFG] que recibe por parametro el codigo de la inspeccion
* Se envian los datos al servidor
*==============================================*/
function enviarDatosEscaleras(){
  if (pila_datos_escaleras.hasElements()) {
    $('#texto_carga').text('Cargando datos de inspección...Espere');
    var inspecc_selec = pila_datos_escaleras.getTopElement();
    db.transaction(function (tx) {
      var query = "SELECT * FROM auditoria_inspecciones_escaleras WHERE o_estado_envio = ? AND o_consecutivoinsp = ?";
      tx.executeSql(query, ['Pendiente',inspecc_selec], function (tx, resultSet) {
        try{
          for(var x = 0; x < resultSet.rows.length; x++) {
            codigo_usuario = resultSet.rows.item(x).k_codusuario;
            codigo_inspeccion = resultSet.rows.item(x).k_codinspeccion;

            enviarValoresAudiosEscaleras(codigo_usuario,codigo_inspeccion);
            enviarValoresDefectosEscaleras(codigo_usuario,codigo_inspeccion);
            enviarValoreselementosEscaleras(codigo_usuario,codigo_inspeccion);
            enviarValoresFinalesEscaleras(codigo_usuario,codigo_inspeccion);
            enviarValoresInicialesEscaleras(codigo_usuario,codigo_inspeccion);
            enviarValoresPreliminarEscaleras(codigo_usuario,codigo_inspeccion);
            enviarValoresProteccionEscaleras(codigo_usuario,codigo_inspeccion); //Dentro de esta se llama la funcion enviarInspeccionesSeleccionadasEscaleras() para que se repita el ciclo de envio de inspeccion si hay otra pendiente
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
    enviarCorreoElectronico();
  }
}

/*=============================================
* Funcion que se ejecuta al terminar de enviar por sesion todos los JSON con los distintos valores de la inspeccion
* Esta funcion obtiene los JSON con los valores de la inspeccion y los envia al servidor, si el servidor ejecuta con 
* exito todos los insert SQL devuelve un "0", si es asi se actualiza la tabla de auditoria de la inspeccion y
* se llama a ejecucion de nuevo la funcion "enviarDatosEscaleras" para continuar hacer de nuevo el proceso si queda alguna inspeccion
* con estado pendiente (Al ejecutar esta funcion en el servidor se crea el respectivo PDF de la inspeccion)
*==============================================*/
function enviarInspeccionesSeleccionadasEscaleras(codigo_usuario,codigo_inspeccion){
  var k_codusuario_modifica = window.localStorage.getItem("codigo_inspector");
  $('#texto_carga').text('Enviando inspección '+codigo_usuario+'-'+codigo_inspeccion+'...Espere');
  $.post('http://192.168.0.26:8080/inspeccion/servidor/php/escaleras_guardar_datos_lista_inspeccion.php',{
    json_EVA: window.sessionStorage.getItem("json_EVA"),
    json_EVD: window.sessionStorage.getItem("json_EVD"),
    json_EVE: window.sessionStorage.getItem("json_EVE"),
    json_EVOF: window.sessionStorage.getItem("json_EVOF"),
    json_EVI: window.sessionStorage.getItem("json_EVI"),
    json_EVPRE: window.sessionStorage.getItem("json_EVPRE"),
    json_EVPP: window.sessionStorage.getItem("json_EVPP")
  },function(e){
    //alert("enviarInspeccionesSeleccionadasEscaleras-> "+e);
    if (e == 0) {
      $('#texto_carga').text('Inpección '+codigo_usuario+'-'+codigo_inspeccion+' Saved...OK');
      var cod_cliente = window.sessionStorage.getItem("codigo_cliente");
      var cod_informe = window.sessionStorage.getItem("cantidadInformes");
      updateItemsAuditoriaInspeccionesEscaleras("Enviada",cod_cliente,cod_informe,codigo_inspeccion,codigo_usuario,k_codusuario_modifica);
      //updateItemsAuditoriaInspeccionesEscaleras("Pendiente",cod_cliente,cod_informe,codigo_inspeccion,codigo_usuario,k_codusuario_modifica);
    }else{
      cerrarVentanaCarga("Ocurrio un error al enviar los datos al servidor! enviarInspeccionesSeleccionadasEscaleras\n\nCódigo de error: "+e);
    }
  });
}

/*=============================================
* Funcion para actualizar una fila en la tabla auditoria_inspecciones_escaleras
*==============================================*/
function updateItemsAuditoriaInspeccionesEscaleras(estado,cod_cliente,cod_informe, cod_inspeccion,codigo_inspector,k_codusuario_modifica) {
  //alert("update->"+cod_inspeccion);
  //alert(estado+" "+cod_cliente+" "+cod_informe+" "+cod_inspeccion);
  db.transaction(function (tx) {
    var query = "UPDATE auditoria_inspecciones_escaleras SET o_estado_envio = ?,"+
                                                              "k_codcliente = ?,"+
                                                              "k_codinforme = ?,"+
                                                              "k_codusuario_modifica = ? "+
                                                              "WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [estado,cod_cliente,cod_informe,k_codusuario_modifica,codigo_inspector,cod_inspeccion], function(tx, res) {
      console.log("rowsAffected updateItemsAuditoriaInspeccionesEscaleras: " + res.rowsAffected);
    },
    function(tx, error) {
      console.log('UPDATE error: ' + error.message);
    });
  }, function(error) {
    console.log('transaction error: ' + error.message);
  }, function() {
    console.log('transaction ok');
    enviarValoresAuditoriaEscaleras(codigo_inspector,cod_inspeccion); //cargamos en sesion el JSON con los valores de auditoria
  });
}

/*=============================================
* Funcion para hacer un select a la tabla auditoria_inspecciones_escaleras que recibe por parametro el codigo de la inspeccion
* Se envia por sesion un json con el resultado del select
* El "json" es un arreglo con una coleccion de objetos o un arreglo de arreglos
*==============================================*/
function enviarValoresAuditoriaEscaleras(codigo_inspector,cod_inspeccion){
  var arreglo_auditoria_escaleras = new Array();
  var json_auditoria_escaleras;

  db.transaction(function (tx) {
    var query = "SELECT * FROM auditoria_inspecciones_escaleras WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [codigo_inspector,cod_inspeccion], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        cod_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        consecutivoinsp = resultSet.rows.item(x).o_consecutivoinsp;
        estado_envio = resultSet.rows.item(x).o_estado_envio;
        revision = resultSet.rows.item(x).o_revision;
        cantidad_item_nocumple = resultSet.rows.item(x).v_item_nocumple;
        codcliente = resultSet.rows.item(x).k_codcliente;
        codinforme = resultSet.rows.item(x).k_codinforme;
        k_codusuario_modifica = resultSet.rows.item(x).k_codusuario_modifica;
        o_actualizar_inspeccion = resultSet.rows.item(x).o_actualizar_inspeccion;

        var item = new Object();
        item.cod_usuario = cod_usuario;
        item.cod_inspeccion = cod_inspeccion;
        item.consecutivoinsp = consecutivoinsp;
        item.estado_envio = estado_envio;
        item.revision = revision;
        item.cantidad_item_nocumple = cantidad_item_nocumple;
        item.codcliente = codcliente;
        item.codinforme = codinforme;
        item.k_codusuario_modifica = k_codusuario_modifica;
        item.o_actualizar_inspeccion = o_actualizar_inspeccion;

        arreglo_auditoria_escaleras.push(item);
      }
      json_auditoria_escaleras = JSON.stringify(arreglo_auditoria_escaleras); //Convertimos el arreglo a formato json
      //alert(json_auditoria_escaleras);
      window.sessionStorage.setItem("json_auditoria_escaleras", json_auditoria_escaleras); //mandamos por sesion el json
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
    enviarDatosAuditoriaEscaleras(codigo_inspector,cod_inspeccion); //enviamos los valores de la tabla auditoria al servidor
  });
}

function enviarDatosAuditoriaEscaleras(codigo_inspector,cod_inspeccion){
  $.post('http://192.168.0.26:8080/inspeccion/servidor/php/escaleras_guardar_datos_auditoria_inspeccion.php',{
    caso: "auditoria_escaleras",
    codigo_inspector: codigo_inspector,
    json_auditoria_escaleras: window.sessionStorage.getItem("json_auditoria_escaleras")
  },function(e){
    //alert("enviarDatosAuditoriaEscaleras-> "+e);
    if (e == 0) {
      enviarArchivosAudioEscaleras(codigo_inspector,cod_inspeccion); //enviar los archivos de audios al servidor, al final de esta funcion se llama la de crear PDF
    }else{
      cerrarVentanaCarga("Ocurrio un error al enviar los datos al servidor! enviarDatosAuditoriaEscaleras\n\nCódigo de error: "+e);
    }
  });
}

var bandera_audios_escaleras;
/*=============================================
* Funcion para hacer un select a la tabla escaleras_valores_audios[AVA] que recibe por parametro el codigo de la inspeccion
* Se envian los archivos de audio al servidor
*==============================================*/
function enviarArchivosAudioEscaleras(codigo_inspector,cod_inspeccion){
  $('#texto_carga').text('Cargando archivos de audio...Espere');
  var cantidad_archivos = 0;
  bandera_audios_escaleras = 0;
  db.transaction(function (tx) {
    var query = "SELECT k_codusuario,k_codinspeccion,n_audio,n_directorio FROM escaleras_valores_audios WHERE k_codusuario = ? AND k_codinspeccion = ? AND o_estado_envio = ?";
    tx.executeSql(query, [codigo_inspector,cod_inspeccion,'Pendiente'], function (tx, resultSet) {
      cantidad_archivos = resultSet.rows.length;
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        cod_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        nombre_audio = resultSet.rows.item(x).n_audio;
        nombre_directorio = resultSet.rows.item(x).n_directorio;

        uploadAudioEscaleras(nombre_directorio,nombre_audio,cod_usuario,cod_inspeccion,'Enviada',cantidad_archivos,codigo_inspector);
      }
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
    if (cantidad_archivos == 0) {
      crearPDFEscaleras(codigo_inspector,cod_inspeccion); //Llamamos la funcion de crear PDF
    }
  });
}

/*=============================================
* Funcion que permite subir los archivos de audio al servidor
*==============================================*/
function uploadAudioEscaleras(directorio,nombre_archivo,cod_usuario,cod_inspeccion,estado_envio,cantidad_archivos,codigo_inspector) {
  var directorio = "file:///sdcard"+directorio;
  var nombreDeArchivo = nombre_archivo;
  var fileURL = directorio + "/" + nombreDeArchivo;

  var win = function (r) {
    console.log("Successful upload...");
    console.log("Code = " + r.responseCode);
    updateItemsEscalerasValoresAudios(cod_usuario,cod_inspeccion,'Enviada');
    borrarArchivo(directorio, nombreDeArchivo);
    $('#texto_carga').text("Audio escaleras "+nombre_archivo+" subido...ok");
    bandera_audios_escaleras += 1;
    if (bandera_audios_escaleras == cantidad_archivos) {
      $('#texto_carga').text(cantidad_archivos + " audios subidos...ok");
      crearPDFEscaleras(codigo_inspector,cod_inspeccion); //Llamamos la funcion de crear PDF
    }
  }

  var fail = function (error) {
    //alert("No hay audios a ser cargados! Code = " + error.code);
  }

  var uri = encodeURI("http://192.168.0.26:8080/inspeccion/servidor/php/escaleras_upload_audios.php");

  var options = new FileUploadOptions();
  options.fileKey="file";
  options.fileName=fileURL.substr(fileURL.lastIndexOf('/')+1);
  options.mimeType="audio/3gpp";

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

/*=============================================
* Funcion que permite crear en el servidor el PDF de la inspeccion
*==============================================*/
function crearPDFEscaleras(codigo_inspector,codigo_inspeccion){
  var codigo_inspector_dispositivo = window.localStorage.getItem("codigo_inspector");
  $('#texto_carga').text('Creando PDF '+codigo_inspector+'-'+codigo_inspeccion+'...Espere');
  $.post('http://192.168.0.26:8080/inspeccion/servidor/php/escaleras_crear_pdf_inspeccion.php',{
    codigo_inspector_dispositivo: codigo_inspector_dispositivo,
    codigo_inspector: codigo_inspector,
    codigo_inspeccion: codigo_inspeccion,
    fecha_emision: mostrarFecha()
  },function(e){
    //alert("crearPDFEscaleras-> "+e);
    if (e == 0) {
      $('#texto_carga').text('PDF de inspección '+codigo_inspector+'-'+codigo_inspeccion+' Saved...OK');
      pila_datos_escaleras.pop();
      enviarDatosEscaleras();////
    }else{
      cerrarVentanaCarga("Ocurrio un error al enviar los datos al servidor! crearPDFEscaleras\n\nCódigo de error: "+e);
    }
  });
}

/*=============================================
* Funcion para actualizar una fila en la tabla escaleras_valores_audios
*==============================================*/
function updateItemsEscalerasValoresAudios(k_codusuario,k_codinspeccion,o_estado_envio) {
  //alert("audio -> "+o_estado_envio);
  db.transaction(function (tx) {
    var query = "UPDATE escaleras_valores_audios SET o_estado_envio = ? "+
                                                    "WHERE k_codusuario = ? "+
                                                    "AND k_codinspeccion = ? ";
    tx.executeSql(query, [o_estado_envio,k_codusuario,k_codinspeccion], function(tx, res) {
      console.log("rowsAffected updateItemsEscalerasValoresAudios: " + res.rowsAffected);
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
    guardarDatosInforme();
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