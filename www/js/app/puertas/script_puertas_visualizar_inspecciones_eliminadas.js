$(document).ready(function($){
  /* CARGAR FUNCIONES INICIALES */
  //alert("probando script");
  mostrarBarraHeader();
  fechaFooter();
  Concurrent.Thread.create(obtenerCantidadInspeccionesPendientesPuertas);
  //verificarCantidadInspecciones();
  setTimeout('verificarCantidadInspecciones()',1500);
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
/* Fecha del footer */
function fechaFooter(){
  var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
  var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
  var f = new Date();
  var fecha = diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
  $('#fecha_footer').text(fecha);
}

/*=============================================
* FUNCION PARA DETECTAR SI SE PRESIONA EL BOTON ATRAS DEL DISPOSITIVO
*==============================================*/
document.addEventListener("backbutton", onBackKeyDown, false);
/*=============================================
* FUNCION PARA DENEGAR EL USO DEL BOTON ATRAS DEL DISPOSITIVO
*==============================================*/
function onBackKeyDown(e) {
  e.preventDefault();
  window.location='../menu/index_puertas.html';
}

/* //////////////////////////////////////////////////// PUERTAS /////////////////////////////////////////////////// */

/*=============================================
* Funcion para hacer un select a la tabla auditoria_inspecciones_puertas y saber la cantidad de inspecciones pendientes por envio al servidor
* Si es diferente de cero continua mostrando las inspecciones
*==============================================*/
function obtenerCantidadInspeccionesPendientesPuertas(){
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM auditoria_inspecciones_puertas WHERE o_estado_envio = ?";
    tx.executeSql(query, ["Eliminada"], function (tx, resultSet) {
      var cantidad_inspecciones = resultSet.rows.item(0).c;
      console.log('Numero de inspecciones de puertas pendientes por cargar -> ' + cantidad_inspecciones);
      window.sessionStorage.setItem("cantidad_inspecciones_puertas", cantidad_inspecciones); //mandamos por sesion la cantidad de inspecciones de puertas
      if (cantidad_inspecciones > 0) {
        obtenerCodigoInspeccionesPendientesPuertas('Eliminada');
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
    var query = "SELECT * FROM puertas_valores_iniciales WHERE k_codusuario = ? AND k_codinspeccion = ?";
    tx.executeSql(query, [k_codusuario,codigo_inspeccion], function (tx, resultSet) {
      var consecutivo_inspe = resultSet.rows.item(0).o_consecutivoinsp;
      var nombre_cliente = resultSet.rows.item(0).n_cliente;
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
                  '<center><b>TIPO</b></center>'+
                '</th>'+
                '<th class="active">'+
                  '<center><b>CLIENTE</b></center>'+
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
                        'Puerta'+
                      '</center>'+
                    '</td>'+
                    '<td>'+
                      '<center>'+
                        nombre_cliente+
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
                        '<a href="javascript:restaurarInspeccionPuertas('+k_codusuario+','+codigo_inspeccion+')"><span class="glyphicon glyphicon-share-alt"></span> RESTAURAR</a>'+
                        //'&nbsp| <a href="./puertas/puertas_confirma_eliminar_lista_insp.html?cod_usuario='+k_codusuario+'&id_inspeccion='+codigo_inspeccion+'">ELIMINAR</a>'+
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

function verificarCantidadInspecciones(){
  var cantidad_inspecciones_puertas = window.sessionStorage.getItem("cantidad_inspecciones_puertas");

  if (cantidad_inspecciones_puertas > 0 ) {
    //alert("Cantidad de inspecciones puertas -> "+cantidad_inspecciones_puertas);
  }else{
    swal({
      title: 'ATENCIÓN',
      type: 'info',
      html: 'No tiene inspecciones eliminadas.',
      showCloseButton: false,
      showCancelButton: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> oK',
      allowOutsideClick: false
    }).then(function () {
      window.location='../menu/index_puertas.html';
    })
  }
}