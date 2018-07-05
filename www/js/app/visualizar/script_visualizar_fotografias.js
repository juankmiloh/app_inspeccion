$(document).ready(function($){
  /* CARGAR FUNCIONES INICIALES */
  //alert("probando script");

  var newRandom = getRandomInt(0,99999);
  // addItemsValoresFotografias("ascensor",0,"ASC5-000-2017_1_"+newRandom+".jpg");
  // addItemsValoresFotografias("puertas",0,"PUT5-000-2017_1_"+newRandom+".jpg");
  // addItemsValoresFotografias("escaleras",0,"ESC5-000-2017_1_"+newRandom+".jpg");

  mostrarBarraHeader();
  seleccionarTodasInspeccionesAscensores();
  seleccionarTodasInspeccionesPuertas();
  seleccionarTodasInspeccionesEscaleras();

  obtenerCantidadFotosPendientesAscensores();
  obtenerCantidadFotosPendientesPuertas();
  obtenerCantidadFotosPendientesEscaleras();
  
  // Concurrent.Thread.create(obtenerCantidadFotosPendientesAscensores); //Ejecutamos de manera concurrente la funcion de cargar los datos de las fotos de ascensores
  // Concurrent.Thread.create(obtenerCantidadFotosPendientesPuertas); //Ejecutamos de manera concurrente la funcion de cargar los datos de las fotos de puertas
  // Concurrent.Thread.create(obtenerCantidadFotosPendientesEscaleras); //Ejecutamos de manera concurrente la funcion de cargar los datos de las fotos de escaleras
  //verificarCantidadFotografias();
  setTimeout('verificarCantidadFotografias()',1500);
  fechaFooter();
  //$("#text_btn_flotante").text("900");
});

/*=============================================
* Crear base de datos / Hacer conexion si ya esta creada
* parametros:
* var dbShell = window.openDatabase(database_name, database_version, database_displayname, database_size);
*==============================================*/
var db = window.openDatabase("montajes_inspeccion_mp", "1.0", "Inspeccion_MP", 1000000);

/*=============================================
* FUNCION PARA DETECTAR SI SE PRESIONA EL BOTON ATRAS DEL DISPOSITIVO
*==============================================*/
document.addEventListener("backbutton", onBackKeyDown, false);
/*=============================================
* FUNCION PARA DENEGAR EL USO DEL BOTON ATRAS DEL DISPOSITIVO
*==============================================*/
function onBackKeyDown(e) {
  e.preventDefault();
  message = 'Advertencia:\n\n¿Desea volver al menú principal?';
  title = 'Montajes & Procesos M.P SAS';
  if(navigator.notification && navigator.notification.alert){
      navigator.notification.confirm(
      message, // message
      onConfirm, // callback to invoke with index of button pressed
      title, // title
      ['SI','NO'] // buttonLabels -> valores [1,0]
    );
  }
}

function onConfirm(buttonIndex) {
  if (buttonIndex == 1) {
    location.href="../index.html";
  }
}

/* Fecha del footer */
function fechaFooter(){
  var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
  var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
  var f = new Date();
  var fecha = diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
  $('#fecha_footer').text(fecha);
}

/* Inicializamos la variable withClass */
var withClass = false;

/*=============================================
* Funcion que permite mostrar la barra fija al header cuando se scrollea la pagina
*==============================================*/
function mostrarBarraHeader(){
  $(document).scroll(function(e){
    if($(window).scrollTop() >= ($("#top_home").height()*1)){
      if(!withClass){
        jQuery('#header').removeClass("sombra");
        jQuery('#header').addClass("av_header_effect");
        $('#linea_cabecera').addClass("esconder_linea_cabecera");
        $('#label_cabecera').addClass("centrar_label_cabecera");
        $('.fb').addClass("cambiar");
        withClass = true;
      }           
    }
    if($(window).scrollTop() < ($("#top_home").height()*1)){
      jQuery('#header').removeClass("av_header_effect");
      jQuery('#header').addClass("sombra");
      $('#linea_cabecera').removeClass("esconder_linea_cabecera");
      $('#label_cabecera').removeClass("centrar_label_cabecera");
      $('.fb').removeClass("cambiar");
      withClass = false;
    }
  });
}

/*=============================================
* Funcion que permite que al seleccionar el check de marcar todas las fotografias de ascensores se seleccionen todos los check de ascensores
*==============================================*/
function seleccionarTodasInspeccionesAscensores(){
  $("#marcarTodos_ascensores").change(function () {
    if ($(this).is(':checked')) {
      //$("input[type=checkbox]").prop('checked', true); //seleccionar todos los check de la pagina
      $("#tabla_ascensores input[type=checkbox]").prop('checked', true); //solo los del objeto #tabla_inspeccion_ascensores
    } else {
      //$("input[type=checkbox]").prop('checked', false);//deseleccionar todos los check de la pagina
      $("#tabla_ascensores input[type=checkbox]").prop('checked', false);//solo los del objeto #tabla_inspeccion_ascensores
    }
  });
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
      console.log('Numero de fotos de ascensores pendientes por cargar -> ' + cantidad_fotos_ascensores);
      window.sessionStorage.setItem("cantidad_fotos_ascensores", cantidad_fotos_ascensores); //mandamos por sesion la cantidad de fotos de ascensores
      if (cantidad_fotos_ascensores > 0) {
        $('#ascensores').show('fast');
        obtenerDatosFotosPendientesAscensores(cantidad_fotos_ascensores);
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
* Funcion para hacer un select a la tabla ascensor_valores_fotografias[AVFG] que recibe por parametro la cantidad de fotos pendientes
* Se envia por sesion un json con el resultado del select
* El "json" es un arreglo con una coleccion de objetos o un arreglo de arreglos
*==============================================*/
function obtenerDatosFotosPendientesAscensores(cantidad_fotos){
  var arreglo_AVFG = new Array();
  var json_AVFG;

  db.transaction(function (tx) {
    var query = "SELECT * FROM ascensor_valores_fotografias WHERE o_estado_envio = ? ORDER BY k_codinspeccion ASC";
    tx.executeSql(query, ['Pendiente'], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        cod_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        cod_item = resultSet.rows.item(x).k_coditem;
        nombre_fotografia = resultSet.rows.item(x).n_fotografia;
        nombre_directorio = resultSet.rows.item(x).n_directorio;
        o_estado_envio = resultSet.rows.item(x).o_estado_envio;

        var item = new Object(); //nuevo objeto siempre que entre al for
        item.cod_usuario = cod_usuario;
        item.cod_inspeccion = cod_inspeccion;
        item.cod_item = cod_item;
        item.nombre_fotografia = nombre_fotografia;
        item.nombre_directorio = nombre_directorio;
        item.o_estado_envio = o_estado_envio;

        arreglo_AVFG.push(item);
      }
      json_AVFG = JSON.stringify(arreglo_AVFG); //Convertimos el arreglo a formato json
      visualizarFotosAscensores(arreglo_AVFG,cantidad_fotos);
      //alert(json_AVFG);
      //window.sessionStorage.setItem("json_AVFG", json_AVFG); //mandamos por sesion el json
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
* Funcion que recibe por parametro los datos de las fotos de ascensores pendientes y permite mostrarlos en el HTML
*==============================================*/
function visualizarFotosAscensores(json,cantidad_fotos){
  //var codigo_inicial_ins = parseInt(JSON.stringify(json[0].cod_inspeccion));
  var codigo_inicial_ins = "-1";
  var contenidoTabla = 
  '<tr>'+
    '<td colspan="3" bgcolor="#70b6e0">'+
      '<center><b>REGISTRO DE FOTOGRAFÍAS | ASCENSORES </b><b style="color:#d9534f;">('+cantidad_fotos+')</b></center>'+
    '</td>'+
  '</tr>';
  $("#tabla_ascensores tbody").append(contenidoTabla);
  $.each(json, function(i,items){
    cod_usuario = items.cod_usuario;
    cod_inspeccion = items.cod_inspeccion;
    cod_item = items.cod_item;
    nombre_fotografia = items.nombre_fotografia;
    nombre_directorio = items.nombre_directorio;
    o_estado_envio = items.o_estado_envio;

    str = nombre_fotografia;
    res = str.split(".");
    n_fotografia = res[0];

    var contenidoTabla = 
    '<tr>';
      if (cod_inspeccion != codigo_inicial_ins) {
        contenidoTabla += 
        '<td class="active centrar_texto">'+
          '<b></b>'+
        '</td>'+
        '<td class="active centrar_texto">'+
          '<center><b>INSPECCIÓN # '+cod_inspeccion+'</b></center></center>'+
        '</td>'+
        '<td class="active centrar_texto">'+
          '<center><b>ESTADO</b></center>'+
        '</td>';
      }
    contenidoTabla += 
    '</tr>'+
    '<tr>'+
      '<td>'+
        '<center>'+
          '<input type="checkbox" checked name='+cod_inspeccion+' id='+n_fotografia+' />'+
        '</center>'+
      '</td>'+
      '<td>'+
        '<center>'+
          nombre_fotografia+
        '</center>'+
      '</td>'+
      '<td>'+
        '<center>'+
          o_estado_envio+
        '</center>'+
      '</td>'+
    '</tr>';
    $("#tabla_ascensores tbody").append(contenidoTabla);
    codigo_inicial_ins = items.cod_inspeccion;
  });
}

/*=============================================
* Funcion que permite que al seleccionar el check de marcar todas las fotografias de puertas se seleccionen todos los check de puertas
*==============================================*/
function seleccionarTodasInspeccionesPuertas(){
  $("#marcarTodos_puertas").change(function () {
    if ($(this).is(':checked')) {
      //$("input[type=checkbox]").prop('checked', true); //seleccionar todos los check de la pagina
      $("#tabla_puertas input[type=checkbox]").prop('checked', true); //solo los del objeto #tabla_inspeccion_puertas
    } else {
      //$("input[type=checkbox]").prop('checked', false);//deseleccionar todos los check de la pagina
      $("#tabla_puertas input[type=checkbox]").prop('checked', false);//solo los del objeto #tabla_inspeccion_puertas
    }
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
      console.log('Numero de fotos de puertas pendientes por cargar -> ' + cantidad_fotos_puertas);
      window.sessionStorage.setItem("cantidad_fotos_puertas", cantidad_fotos_puertas); //mandamos por sesion la cantidad de fotos de puertas
      if (cantidad_fotos_puertas > 0) {
        $('#puertas').show('fast');
        obtenerDatosFotosPendientesPuertas(cantidad_fotos_puertas);
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
* Funcion para hacer un select a la tabla puertas_valores_fotografias[AVFG] que recibe por parametro la cantidad de fotos pendientes
* Se envia por sesion un json con el resultado del select
* El "json" es un arreglo con una coleccion de objetos o un arreglo de arreglos
*==============================================*/
function obtenerDatosFotosPendientesPuertas(cantidad_fotos){
  var arreglo_AVFG = new Array();
  var json_AVFG;

  db.transaction(function (tx) {
    var query = "SELECT * FROM puertas_valores_fotografias WHERE o_estado_envio = ? ORDER BY k_codinspeccion ASC";
    tx.executeSql(query, ['Pendiente'], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        cod_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        cod_item = resultSet.rows.item(x).k_coditem;
        nombre_fotografia = resultSet.rows.item(x).n_fotografia;
        nombre_directorio = resultSet.rows.item(x).n_directorio;
        o_estado_envio = resultSet.rows.item(x).o_estado_envio;

        var item = new Object(); //nuevo objeto siempre que entre al for
        item.cod_usuario = cod_usuario;
        item.cod_inspeccion = cod_inspeccion;
        item.cod_item = cod_item;
        item.nombre_fotografia = nombre_fotografia;
        item.nombre_directorio = nombre_directorio;
        item.o_estado_envio = o_estado_envio;

        arreglo_AVFG.push(item);
      }
      json_AVFG = JSON.stringify(arreglo_AVFG); //Convertimos el arreglo a formato json
      visualizarFotosPuertas(arreglo_AVFG,cantidad_fotos);
      //alert(json_AVFG);
      window.sessionStorage.setItem("json_AVFG", json_AVFG); //mandamos por sesion el json
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
* Funcion que recibe por parametro los datos de las fotos de puertas pendientes y permite mostrarlos en el HTML
*==============================================*/
function visualizarFotosPuertas(json,cantidad_fotos){
  //var codigo_inicial_ins = parseInt(JSON.stringify(json[0].cod_inspeccion));
  var codigo_inicial_ins = "-1";
  var contenidoTabla = 
  '<tr>'+
    '<td colspan="3" bgcolor="#70b6e0">'+
      '<center><b>REGISTRO DE FOTOGRAFÍAS | puertas </b><b style="color:#d9534f;">('+cantidad_fotos+')</b></center>'+
    '</td>'+
  '</tr>';
  $("#tabla_puertas tbody").append(contenidoTabla);
  $.each(json, function(i,items){
    cod_usuario = items.cod_usuario;
    cod_inspeccion = items.cod_inspeccion;
    cod_item = items.cod_item;
    nombre_fotografia = items.nombre_fotografia;
    nombre_directorio = items.nombre_directorio;
    o_estado_envio = items.o_estado_envio;

    str = nombre_fotografia;
    res = str.split(".");
    n_fotografia = res[0];

    var contenidoTabla = 
    '<tr>';
      if (cod_inspeccion != codigo_inicial_ins) {
        contenidoTabla += 
        '<td class="active centrar_texto">'+
          '<b></b>'+
        '</td>'+
        '<td class="active centrar_texto">'+
          '<center><b>INSPECCIÓN # '+cod_inspeccion+'</b></center></center>'+
        '</td>'+
        '<td class="active centrar_texto">'+
          '<center><b>ESTADO</b></center>'+
        '</td>';
      }
    contenidoTabla += 
    '</tr>'+
    '<tr>'+
      '<td>'+
        '<center>'+
          '<input type="checkbox" checked name='+cod_inspeccion+' id='+n_fotografia+' />'+
        '</center>'+
      '</td>'+
      '<td>'+
        '<center>'+
          nombre_fotografia+
        '</center>'+
      '</td>'+
      '<td>'+
        '<center>'+
          o_estado_envio+
        '</center>'+
      '</td>'+
    '</tr>';
    $("#tabla_puertas tbody").append(contenidoTabla);
    codigo_inicial_ins = items.cod_inspeccion;
  });
}

/*=============================================
* Funcion que permite que al seleccionar el check de marcar todas las fotografias de escaleras se seleccionen todos los check de escaleras
*==============================================*/
function seleccionarTodasInspeccionesEscaleras(){
  $("#marcarTodos_escaleras").change(function () {
    if ($(this).is(':checked')) {
      //$("input[type=checkbox]").prop('checked', true); //seleccionar todos los check de la pagina
      $("#tabla_escaleras input[type=checkbox]").prop('checked', true); //solo los del objeto #tabla_inspeccion_escaleras
    } else {
      //$("input[type=checkbox]").prop('checked', false);//deseleccionar todos los check de la pagina
      $("#tabla_escaleras input[type=checkbox]").prop('checked', false);//solo los del objeto #tabla_inspeccion_escaleras
    }
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
      console.log('Numero de fotos de escaleras pendientes por cargar -> ' + cantidad_fotos_escaleras);
      window.sessionStorage.setItem("cantidad_fotos_escaleras", cantidad_fotos_escaleras); //mandamos por sesion la cantidad de fotos de escaleras
      if (cantidad_fotos_escaleras > 0) {
        $('#escaleras').show('fast');
        obtenerDatosFotosPendientesEscaleras(cantidad_fotos_escaleras);
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
* Funcion para hacer un select a la tabla escaleras_valores_fotografias[AVFG] que recibe por parametro la cantidad de fotos pendientes
* Se envia por sesion un json con el resultado del select
* El "json" es un arreglo con una coleccion de objetos o un arreglo de arreglos
*==============================================*/
function obtenerDatosFotosPendientesEscaleras(cantidad_fotos){
  var arreglo_AVFG = new Array();
  var json_AVFG;

  db.transaction(function (tx) {
    var query = "SELECT * FROM escaleras_valores_fotografias WHERE o_estado_envio = ? ORDER BY k_codinspeccion ASC";
    tx.executeSql(query, ['Pendiente'], function (tx, resultSet) {
      for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
        cod_usuario = resultSet.rows.item(x).k_codusuario;
        cod_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        cod_item = resultSet.rows.item(x).k_coditem;
        nombre_fotografia = resultSet.rows.item(x).n_fotografia;
        nombre_directorio = resultSet.rows.item(x).n_directorio;
        o_estado_envio = resultSet.rows.item(x).o_estado_envio;

        var item = new Object(); //nuevo objeto siempre que entre al for
        item.cod_usuario = cod_usuario;
        item.cod_inspeccion = cod_inspeccion;
        item.cod_item = cod_item;
        item.nombre_fotografia = nombre_fotografia;
        item.nombre_directorio = nombre_directorio;
        item.o_estado_envio = o_estado_envio;

        arreglo_AVFG.push(item);
      }
      json_AVFG = JSON.stringify(arreglo_AVFG); //Convertimos el arreglo a formato json
      visualizarFotosEscaleras(arreglo_AVFG,cantidad_fotos);
      //alert(json_AVFG);
      //window.sessionStorage.setItem("json_AVFG", json_AVFG); //mandamos por sesion el json
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
* Funcion que recibe por parametro los datos de las fotos de escaleras pendientes y permite mostrarlos en el HTML
*==============================================*/
function visualizarFotosEscaleras(json,cantidad_fotos){
  //var codigo_inicial_ins = parseInt(JSON.stringify(json[0].cod_inspeccion));
  var codigo_inicial_ins = "-1";
  var contenidoTabla = 
  '<tr>'+
    '<td colspan="3" bgcolor="#70b6e0">'+
      '<center><b>REGISTRO DE FOTOGRAFÍAS | escaleras </b><b style="color:#d9534f;">('+cantidad_fotos+')</b></center>'+
    '</td>'+
  '</tr>';
  $("#tabla_escaleras tbody").append(contenidoTabla);
  $.each(json, function(i,items){
    cod_usuario = items.cod_usuario;
    cod_inspeccion = items.cod_inspeccion;
    cod_item = items.cod_item;
    nombre_fotografia = items.nombre_fotografia;
    nombre_directorio = items.nombre_directorio;
    o_estado_envio = items.o_estado_envio;

    str = nombre_fotografia;
    res = str.split(".");
    n_fotografia = res[0];

    var contenidoTabla = 
    '<tr>';
      if (cod_inspeccion != codigo_inicial_ins) {
        contenidoTabla += 
        '<td class="active centrar_texto">'+
          '<b></b>'+
        '</td>'+
        '<td class="active centrar_texto">'+
          '<center><b>INSPECCIÓN # '+cod_inspeccion+'</b></center></center>'+
        '</td>'+
        '<td class="active centrar_texto">'+
          '<center><b>ESTADO</b></center>'+
        '</td>';
      }
    contenidoTabla += 
    '</tr>'+
    '<tr>'+
      '<td>'+
        '<center>'+
          '<input type="checkbox" checked name='+cod_inspeccion+' id='+n_fotografia+' />'+
        '</center>'+
      '</td>'+
      '<td>'+
        '<center>'+
          nombre_fotografia+
        '</center>'+
      '</td>'+
      '<td>'+
        '<center>'+
          o_estado_envio+
        '</center>'+
      '</td>'+
    '</tr>';
    $("#tabla_escaleras tbody").append(contenidoTabla);
    codigo_inicial_ins = items.cod_inspeccion;
  });
}

function verificarCantidadFotografias(){
  var cantidad_fotos_ascensores = window.sessionStorage.getItem("cantidad_fotos_ascensores");
  var cantidad_fotos_puertas = window.sessionStorage.getItem("cantidad_fotos_puertas");
  var cantidad_fotos_escaleras = window.sessionStorage.getItem("cantidad_fotos_escaleras");

  if (cantidad_fotos_ascensores > 0 || cantidad_fotos_puertas > 0 || cantidad_fotos_escaleras > 0) {
    $('.boton_flotante').show('slow'); //mostrar boton
  }else{
    swal({
      title: 'BUEN TRABAJO!',
      type: 'success',
      html: 'No tiene fotografías pendientes!',
      showCloseButton: false,
      showCancelButton: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> oK',
      allowOutsideClick: false
    }).then(function () {
      window.location='../index.html';
    })
  }
}

/*=============================================
* Funcion para insertar datos en la tabla ascensor_valores_fotografias
*==============================================*/
function addItemsValoresFotografias(tabla,codigo_inspeccion,nombre_foto) {
  //alert(codigo_inspeccion);
  db.transaction(function (tx) {
    var query = "INSERT INTO "+tabla+"_valores_fotografias (k_codusuario,k_codinspeccion,k_coditem,n_fotografia,n_directorio,o_estado_envio) VALUES (?,?,?,?,?,?)";
    tx.executeSql(query, ["5",codigo_inspeccion,"1",nombre_foto,"/inspeccion_mp/ascensores/fotografias","Pendiente"], function(tx, res) {
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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

