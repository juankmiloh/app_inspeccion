$(document).ready(function($){
  /* CARGAR FUNCIONES INICIALES */
  //alert("probando script");
  mostrarBarraHeader();
  ObtenerCantidadInformes();
  ObtenerCantidadClientes();
  seleccionarTodasInspeccionesAscensores();
  seleccionarTodasInspeccionesPuertas();
  seleccionarTodasInspeccionesEscaleras();
  Concurrent.Thread.create(obtenerCantidadInspeccionesPendientesAscensores); //Ejecutamos de manera concurrente la funcion de cargar las inspecciones de ascensores
  Concurrent.Thread.create(obtenerCantidadInspeccionesPendientesPuertas); //Ejecutamos de manera concurrente la funcion de cargar las inspecciones de puertas
  Concurrent.Thread.create(obtenerCantidadInspeccionesPendientesEscaleras); //Ejecutamos de manera concurrente la funcion de cargar las inspecciones de escaleras
  //verificarCantidadInspecciones();
  setTimeout('verificarCantidadInspecciones()',1000);
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
* Funcion que permite mostrar la fecha
*==============================================*/
function mostrarFecha(){
  var fecha = new Date();
  var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
  var numero_meses = new Array ("01","02","03","04","05","06","07","08","09","10","11","12");
  var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
  var dia = 0;   
  
  if (fecha.getDate() < 10) {
    dia = "0"+fecha.getDate();
  } else {
    dia = fecha.getDate();
  }

  fecha = fecha.getFullYear()+"-"+numero_meses[fecha.getMonth()]+"-"+dia;
  return fecha;
}

/*=============================================
* FUNCION PARA DETECTAR SI SE PRESIONA EL BOTON ATRAS DEL DISPOSITIVO
*==============================================*/
document.addEventListener("backbutton", onBackKeyDown, false);
/*=============================================
* FUNCION PARA DENEGAR EL USO DEL BOTON ATRAS DEL DISPOSITIVO
* HACER UNA PREGUNTA AL USUARIO PARA VER SI REALMENTE DESEA VOLVER AL INDEX
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

/*=============================================
* Funcion que permite que al seleccionar el check de marcar todas las inspecciones -> seleccionar todos los check de la pagina
*==============================================*/
function seleccionarTodasInspeccionesAscensores(){
  $("#marcarTodos_ascensores").change(function () {
    if ($(this).is(':checked')) {
      //$("input[type=checkbox]").prop('checked', true); //seleccionar todos los check de la pagina
      $("#tabla_inspeccion_ascensores input[type=checkbox]").prop('checked', true); //solo los del objeto #tabla_inspeccion_ascensores
    } else {
      //$("input[type=checkbox]").prop('checked', false);//deseleccionar todos los check de la pagina
      $("#tabla_inspeccion_ascensores input[type=checkbox]").prop('checked', false);//solo los del objeto #tabla_inspeccion_ascensores
    }
  });
}

/*=============================================
* Funcion que permite que al seleccionar el check de marcar todas las inspecciones -> seleccionar todos los check de la pagina
*==============================================*/
function seleccionarTodasInspeccionesPuertas(){
  $("#marcarTodos_puertas").change(function () {
    if ($(this).is(':checked')) {
      //$("input[type=checkbox]").prop('checked', true); //todos los check
      $("#tabla_inspeccion_puertas input[type=checkbox]").prop('checked', true); //solo los del objeto #tabla_inspeccion_puertas
    } else {
      //$("input[type=checkbox]").prop('checked', false);//todos los check
      $("#tabla_inspeccion_puertas input[type=checkbox]").prop('checked', false);//solo los del objeto #tabla_inspeccion_puertas
    }
  });
}

/*=============================================
* Funcion que permite que al seleccionar el check de marcar todas las inspecciones -> seleccionar todos los check de la pagina
*==============================================*/
function seleccionarTodasInspeccionesEscaleras(){
  $("#marcarTodos_escaleras").change(function () {
    if ($(this).is(':checked')) {
      //$("input[type=checkbox]").prop('checked', true); //todos los check
      $("#tabla_inspeccion_escaleras input[type=checkbox]").prop('checked', true); //solo los del objeto #tabla_inspeccion_escaleras
    } else {
      //$("input[type=checkbox]").prop('checked', false);//todos los check
      $("#tabla_inspeccion_escaleras input[type=checkbox]").prop('checked', false);//solo los del objeto #tabla_inspeccion_escaleras
    }
  });
}

/*=============================================
* Funcion en donde se cuentan las filas de la tabla informe
*==============================================*/
function ObtenerCantidadInformes(){
  var codigoInspector = window.localStorage.getItem("codigo_inspector");
  var codigo_informe;
  var consecutivo_informe;

  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM informe";
    tx.executeSql(query, [], function (tx, resultSet) {
      codigo_informe = resultSet.rows.item(0).c;
      consecutivo_informe = "INF"+codigoInspector+"-"+resultSet.rows.item(0).c+"-"+anio;
      console.log('Numero de filas tabla informe -> '+resultSet.rows.item(0).c);
      window.sessionStorage.setItem("cantidadInformes", codigo_informe); //mandamos por sesion la cantidad de informes
      window.sessionStorage.setItem("consecutivo_informe", consecutivo_informe); //mandamos por sesion la cantidad de informes
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
* Funcion en donde se cuentan las filas de la tabla cliente
*==============================================*/
function ObtenerCantidadClientes(){
  var codigoInspector = window.localStorage.getItem("codigo_inspector");
  var codigo_cliente;
  var consecutivo_cliente;

  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM cliente";
    tx.executeSql(query, [], function (tx, resultSet) {
      codigo_cliente = resultSet.rows.item(0).c;
      consecutivo_cliente = "CLI"+codigoInspector+"-"+resultSet.rows.item(0).c+"-"+anio;
      console.log('Numero de filas tabla cliente -> '+resultSet.rows.item(0).c);
      window.sessionStorage.setItem("codigo_cliente", codigo_cliente); //mandamos por sesion el codigo del cliente
      window.sessionStorage.setItem("consecutivo_cliente", consecutivo_cliente); //mandamos por sesion el consecutivo del cliente
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

/* //////////////////////////////////////////////////// ASCENSORES /////////////////////////////////////////////////// */

/*=============================================
* Funcion para hacer un select a la tabla auditoria_inspecciones_ascensores y saber la cantidad de inspecciones pendientes por envio al servidor
* Si es diferente de cero continua mostrando las inspecciones
*==============================================*/
function obtenerCantidadInspeccionesPendientesAscensores(){
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM auditoria_inspecciones_ascensores WHERE o_estado_envio = ?";
    tx.executeSql(query, ["Pendiente"], function (tx, resultSet) {
      var cantidad_inspecciones = resultSet.rows.item(0).c;
      console.log('Numero de inspecciones de ascensores pendientes por cargar -> ' + cantidad_inspecciones);
      window.sessionStorage.setItem("cantidad_inspecciones_ascensores", cantidad_inspecciones); //mandamos por sesion la cantidad de inspecciones a ascensores
      if (cantidad_inspecciones > 0) {
        obtenerCodigoInspeccionesPendientesAscensores('Pendiente');
      }
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
      swal({
        title: 'BUEN TRABAJO!',
        type: 'success',
        html: 'No tiene inspecciones pendientes!',
        showCloseButton: false,
        showCancelButton: false,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> oK',
        allowOutsideClick: false
      }).then(function () {
        window.location='../index.html';
      })
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para hacer un select a la tabla auditoria_inspecciones_ascensores y saber que inspecciones estan pendientes
*==============================================*/
function obtenerCodigoInspeccionesPendientesAscensores(estado){
  $('#ascensores').show('fast');
  db.transaction(function (tx) {
    var query = "SELECT * FROM auditoria_inspecciones_ascensores WHERE o_estado_envio = ?";
    tx.executeSql(query, [estado], function (tx, resultSet) {
      for(var x = 0; x < resultSet.rows.length; x++) {
        var k_codusuario = resultSet.rows.item(x).k_codusuario;
        var codigo_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        var cantidad_nocumple = resultSet.rows.item(x).v_item_nocumple;
        visualizarInspeccionesAscensores(k_codusuario,codigo_inspeccion,cantidad_nocumple);
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
* Funcion que recibe el codigo de inspeccion que esta pendiente y la muestra en una tabal html
*==============================================*/
function visualizarInspeccionesAscensores(k_codusuario,codigo_inspeccion,cantidad_nocumple){
  db.transaction(function (tx) {
    var query = "SELECT o_consecutivoinsp,n_equipo,o_tipo_informe FROM ascensor_valores_iniciales WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [k_codusuario,codigo_inspeccion], function (tx, resultSet) {
      var consecutivo_inspe = resultSet.rows.item(0).o_consecutivoinsp;
      var nombre_equipo = resultSet.rows.item(0).n_equipo;
      var tipo_informe = resultSet.rows.item(0).o_tipo_informe;
      var contenidoDiv = 
      '<br>'+
      '<div class="table-responsive">'+
        '<table class="table table-bordered">'+
            '<thead>'+
              '<tr>'+
                '<th colspan="5" bgcolor="#70b6e0">'+
                  '<center><div><b>INSPECCIÓN - </b><b style="color:#d9534f;">'+consecutivo_inspe+'</b></div></center>'+
                '</th>'+
              '</tr>'+
              '<tr>'+
                '<th class="active">'+
                  '<center></center>'+
                '</th>'+
                '<th class="active">'+
                  '<center><b>TIPO</b></center>'+
                '</th>'+
                '<th class="active">'+
                  '<center><b>EQUIPO</b></center>'+
                '</th>'+
                '<th class="active">'+
                  '<center><b>NO CUMPLE</b></center>'+
                '</th>'+
                '<th class="active">'+
                  '<center><b>INFORME</b></center></center>'+
                '</th>'+
              '</tr>'+
            '</thead>'+
            '<tbody>'+
                '<tr>'+
                    '<td>'+
                      '<center>'+
                        '<input type="checkbox" checked name='+consecutivo_inspe+' id=asc-'+k_codusuario+'-'+codigo_inspeccion+' />'+
                      '</center>'+
                    '</td>'+
                    '<td>'+
                      '<center>'+
                        'Ascensor'+
                      '</center>'+
                    '</td>'+
                    '<td>'+
                      '<center>'+
                        nombre_equipo+
                      '</center>'+
                    '</td>'+
                    '<td>'+
                      '<center>'+
                        cantidad_nocumple+
                      '</center>'+
                    '</td>'+
                    '<td>'+
                      '<center>'+
                        tipo_informe+
                      '</center>'+
                    '</td>'+
                    '<tr>'+
                      '<td colspan="5" class="info">'+
                        '<center><b>ACCIONES</b></center>'+
                      '</td>'+
                    '</tr>'+
                    '<td colspan="5">'+
                      '<center>'+
                        '<a href="./ascensor_modificar_lista_inspeccion.html?cod_usuario='+k_codusuario+'&id_inspeccion='+codigo_inspeccion+'">MODIFICAR</a>&nbsp| '+
                        '<a href="./ascensor_confirma_eliminar_lista_insp.html?cod_usuario='+k_codusuario+'&id_inspeccion='+codigo_inspeccion+'">ELIMINAR</a>'+
                      '</center>'+
                    '</td>'+
                '</tr>'+
            '</tbody>'+
        '</table>'+
    '</div>';
    $(contenidoDiv).appendTo("#tabla_inspeccion_ascensores");
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

/* //////////////////////////////////////////////////// PUERTAS /////////////////////////////////////////////////// */

/*=============================================
* Funcion para hacer un select a la tabla auditoria_inspecciones_puertas y saber la cantidad de inspecciones pendientes por envio al servidor
* Si es diferente de cero continua mostrando las inspecciones
*==============================================*/
function obtenerCantidadInspeccionesPendientesPuertas(){
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM auditoria_inspecciones_puertas WHERE o_estado_envio = ?";
    tx.executeSql(query, ["Pendiente"], function (tx, resultSet) {
      var cantidad_inspecciones = resultSet.rows.item(0).c;
      console.log('Numero de inspecciones de puertas pendientes por cargar -> ' + cantidad_inspecciones);
      window.sessionStorage.setItem("cantidad_inspecciones_puertas", cantidad_inspecciones); //mandamos por sesion la cantidad de inspecciones de puertas
      if (cantidad_inspecciones > 0) {
        obtenerCodigoInspeccionesPendientesPuertas('Pendiente');
      }
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
      swal({
        title: 'BUEN TRABAJO!',
        type: 'success',
        html: 'No tiene inspecciones pendientes!',
        showCloseButton: false,
        showCancelButton: false,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> oK',
        allowOutsideClick: false
      }).then(function () {
        window.location='../index.html';
      })
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para hacer un select a la tabla auditoria_inspecciones_puertas y saber que inspecciones estan pendientes
*==============================================*/
function obtenerCodigoInspeccionesPendientesPuertas(estado){
  $('#puertas').show('fast');
  db.transaction(function (tx) {
    var query = "SELECT * FROM auditoria_inspecciones_puertas WHERE o_estado_envio = ?";
    tx.executeSql(query, [estado], function (tx, resultSet) {
      for(var x = 0; x < resultSet.rows.length; x++) {
        var k_codusuario = resultSet.rows.item(x).k_codusuario;
        var codigo_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        var cantidad_nocumple = resultSet.rows.item(x).v_item_nocumple;
        visualizarInspeccionesPuertas(k_codusuario,codigo_inspeccion,cantidad_nocumple);
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
* Funcion que recibe el codigo de inspeccion que esta pendiente y la muestra en una tabal html
*==============================================*/
function visualizarInspeccionesPuertas(k_codusuario,codigo_inspeccion,cantidad_nocumple){
  db.transaction(function (tx) {
    var query = "SELECT o_consecutivoinsp,n_equipo,o_tipo_informe FROM puertas_valores_iniciales WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [k_codusuario,codigo_inspeccion], function (tx, resultSet) {
      var consecutivo_inspe = resultSet.rows.item(0).o_consecutivoinsp;
      var nombre_equipo = resultSet.rows.item(0).n_equipo;
      var tipo_informe = resultSet.rows.item(0).o_tipo_informe;
      var contenidoDiv = 
      '<br>'+
      '<div class="table-responsive">'+
        '<table class="table table-bordered">'+
            '<thead>'+
              '<tr>'+
                '<th colspan="5" bgcolor="#70b6e0">'+
                  '<center><div><b>INSPECCIÓN - </b><b style="color:#d9534f;">'+consecutivo_inspe+'</b></div></center>'+
                '</th>'+
              '</tr>'+
              '<tr>'+
                '<th class="active">'+
                  '<center></center>'+
                '</th>'+
                '<th class="active">'+
                  '<center><b>TIPO</b></center>'+
                '</th>'+
                '<th class="active">'+
                  '<center><b>EQUIPO</b></center>'+
                '</th>'+
                '<th class="active">'+
                  '<center><b>NO CUMPLE</b></center>'+
                '</th>'+
                '<th class="active">'+
                  '<center><b>INFORME</b></center></center>'+
                '</th>'+
              '</tr>'+
            '</thead>'+
            '<tbody>'+
                '<tr>'+
                    '<td>'+
                      '<center>'+
                        '<input type="checkbox" checked name='+consecutivo_inspe+' id=put-'+k_codusuario+'-'+codigo_inspeccion+' />'+
                      '</center>'+
                    '</td>'+
                    '<td>'+
                      '<center>'+
                        'Puerta'+
                      '</center>'+
                    '</td>'+
                    '<td>'+
                      '<center>'+
                        nombre_equipo+
                      '</center>'+
                    '</td>'+
                    '<td>'+
                      '<center>'+
                        cantidad_nocumple+
                      '</center>'+
                    '</td>'+
                    '<td>'+
                      '<center>'+
                        tipo_informe+
                      '</center>'+
                    '</td>'+
                    '<tr>'+
                      '<td colspan="5" class="info">'+
                        '<center><b>ACCIONES</b></center>'+
                      '</td>'+
                    '</tr>'+
                    '<td colspan="5">'+
                      '<center>'+
                        '<a href="./puertas_modificar_lista_inspeccion.html?cod_usuario='+k_codusuario+'&id_inspeccion='+codigo_inspeccion+'">MODIFICAR</a>&nbsp| '+
                        '<a href="./puertas_confirma_eliminar_lista_insp.html?cod_usuario='+k_codusuario+'&id_inspeccion='+codigo_inspeccion+'">ELIMINAR</a>'+
                      '</center>'+
                    '</td>'+
                '</tr>'+
            '</tbody>'+
        '</table>'+
    '</div>';
    $(contenidoDiv).appendTo("#tabla_inspeccion_puertas");
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

/* //////////////////////////////////////////////////// ESCALERAS /////////////////////////////////////////////////// */

/*=============================================
* Funcion para hacer un select a la tabla auditoria_inspecciones_escaleras y saber la cantidad de inspecciones pendientes por envio al servidor
* Si es diferente de cero continua mostrando las inspecciones
*==============================================*/
function obtenerCantidadInspeccionesPendientesEscaleras(){
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM auditoria_inspecciones_escaleras WHERE o_estado_envio = ?";
    tx.executeSql(query, ["Pendiente"], function (tx, resultSet) {
      var cantidad_inspecciones = resultSet.rows.item(0).c;
      console.log('Numero de inspecciones de escaleras pendientes por cargar -> ' + cantidad_inspecciones);
      window.sessionStorage.setItem("cantidad_inspecciones_escaleras", cantidad_inspecciones); //mandamos por sesion la cantidad de inspecciones a escaleras
      if (cantidad_inspecciones > 0) {
        obtenerCodigoInspeccionesPendientesEscaleras('Pendiente');
      }
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
      swal({
        title: 'BUEN TRABAJO!',
        type: 'success',
        html: 'No tiene inspecciones pendientes!',
        showCloseButton: false,
        showCancelButton: false,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> oK',
        allowOutsideClick: false
      }).then(function () {
        window.location='../index.html';
      })
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para hacer un select a la tabla auditoria_inspecciones_escaleras y saber que inspecciones estan pendientes
*==============================================*/
function obtenerCodigoInspeccionesPendientesEscaleras(estado){
  $('#escaleras').show('fast');
  db.transaction(function (tx) {
    var query = "SELECT * FROM auditoria_inspecciones_escaleras WHERE o_estado_envio = ?";
    tx.executeSql(query, [estado], function (tx, resultSet) {
      for(var x = 0; x < resultSet.rows.length; x++) {
        var k_codusuario = resultSet.rows.item(x).k_codusuario;
        var codigo_inspeccion = resultSet.rows.item(x).k_codinspeccion;
        var cantidad_nocumple = resultSet.rows.item(x).v_item_nocumple;
        visualizarInspeccionesEscaleras(k_codusuario,codigo_inspeccion,cantidad_nocumple);
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
* Funcion que recibe el codigo de inspeccion que esta pendiente y la muestra en una tabal html
*==============================================*/
function visualizarInspeccionesEscaleras(k_codusuario,codigo_inspeccion,cantidad_nocumple){
  db.transaction(function (tx) {
    var query = "SELECT o_consecutivoinsp,n_equipo,o_tipo_informe,o_tipo_equipo FROM escaleras_valores_iniciales WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [k_codusuario,codigo_inspeccion], function (tx, resultSet) {
      var consecutivo_inspe = resultSet.rows.item(0).o_consecutivoinsp;
      var nombre_equipo = resultSet.rows.item(0).n_equipo;
      var tipo_informe = resultSet.rows.item(0).o_tipo_informe;
      var tipo_equipo = resultSet.rows.item(0).o_tipo_equipo;
      var contenidoDiv = 
      '<br>'+
      '<div class="table-responsive">'+
        '<table class="table table-bordered">'+
            '<thead>'+
              '<tr>'+
                '<th colspan="5" bgcolor="#70b6e0">'+
                  '<center><div><b>INSPECCIÓN - </b><b style="color:#d9534f;">'+consecutivo_inspe+'</b></div></center>'+
                '</th>'+
              '</tr>'+
              '<tr>'+
                '<th class="active">'+
                  '<center></center>'+
                '</th>'+
                '<th class="active">'+
                  '<center><b>TIPO</b></center>'+
                '</th>'+
                '<th class="active">'+
                  '<center><b>EQUIPO</b></center>'+
                '</th>'+
                '<th class="active">'+
                  '<center><b>NO CUMPLE</b></center>'+
                '</th>'+
                '<th class="active">'+
                  '<center><b>INFORME</b></center></center>'+
                '</th>'+
              '</tr>'+
            '</thead>'+
            '<tbody>'+
                '<tr>'+
                    '<td>'+
                      '<center>'+
                        '<input type="checkbox" checked name='+consecutivo_inspe+' id=esc-'+k_codusuario+'-'+codigo_inspeccion+' />'+
                      '</center>'+
                    '</td>'+
                    '<td>'+
                      '<center>'+
                        tipo_equipo+
                      '</center>'+
                    '</td>'+
                    '<td>'+
                      '<center>'+
                        nombre_equipo+
                      '</center>'+
                    '</td>'+
                    '<td>'+
                      '<center>'+
                        cantidad_nocumple+
                      '</center>'+
                    '</td>'+
                    '<td>'+
                      '<center>'+
                        tipo_informe+
                      '</center>'+
                    '</td>'+
                    '<tr>'+
                      '<td colspan="5" class="info">'+
                        '<center><b>ACCIONES</b></center>'+
                      '</td>'+
                    '</tr>'+
                    '<td colspan="5">'+
                      '<center>'+
                        '<a href="./escaleras_modificar_lista_inspeccion.html?cod_usuario='+k_codusuario+'&id_inspeccion='+codigo_inspeccion+'">MODIFICAR</a>&nbsp| '+
                        '<a href="./escaleras_confirma_eliminar_lista_insp.html?cod_usuario='+k_codusuario+'&id_inspeccion='+codigo_inspeccion+'">ELIMINAR</a>'+
                      '</center>'+
                    '</td>'+
                '</tr>'+
            '</tbody>'+
        '</table>'+
    '</div>';
    $(contenidoDiv).appendTo("#tabla_inspeccion_escaleras");
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

function verificarCantidadInspecciones(){
  var cantidad_inspecciones_ascensores = window.sessionStorage.getItem("cantidad_inspecciones_ascensores");
  var cantidad_inspecciones_puertas = window.sessionStorage.getItem("cantidad_inspecciones_puertas");
  var cantidad_inspecciones_escaleras = window.sessionStorage.getItem("cantidad_inspecciones_escaleras");

  if (cantidad_inspecciones_ascensores > 0 || cantidad_inspecciones_puertas > 0 || cantidad_inspecciones_escaleras > 0) {
    //alert("Cantidad de inspecciones ascensores -> "+cantidad_inspecciones_ascensores);
    //alert("Cantidad de inspecciones puertas -> "+cantidad_inspecciones_puertas);
    //alert("Cantidad de inspecciones escaleras -> "+cantidad_inspecciones_escaleras);
  }else{
    swal({
      title: 'BUEN TRABAJO!',
      type: 'success',
      html: 'No tiene inspecciones pendientes!',
      showCloseButton: false,
      showCancelButton: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> oK',
      allowOutsideClick: false
    }).then(function () {
      window.location='../index.html';
    })
  }
}