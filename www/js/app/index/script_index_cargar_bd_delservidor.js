$(document).ready(function(){  
  fechaFooter();
  comprobarBD();
  //alert("probando_script");
});

/*=============================================
* Primero llamamos la funcion comprobarExistenciaTablaAscensorItemsCabina para ver si esta la tabla creada
* sino esta la tabla creada verifica que haya conexion a internet, si hay conexion prosigue a seguir verificando y creando
* las otras tablas, sino hay conexion se queda mostrando un mensaje pidiendo conexion, esto hasta que se creen las tablas
*==============================================*/
function comprobarBD(){
  comprobarExistenciaTablaAscensorItemsCabina();
}

/* Fecha del footer */
function fechaFooter(){
  var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
  var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
  var f = new Date();
  var fecha = diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
  $('#fecha_footer').text(fecha);
}

/*=============================================
* Funcion que permite abrir la ventana de carga
*==============================================*/
function abrirVentanaCarga(texto){
  if (texto != "") {
    $('#texto_carga').text(texto);
  }else{
    $('#texto_carga').text("Cargando base de datos...Espere");
  }
  $('.fbback').show();
  $('.fb').show();
  $('.fbdrag1').show();
  $('body').css('overflow','hidden');
}

/*=============================================
* Funcion que permite cerrar la ventana que aparece mientras se cargan las tablas a la base de datos
*==============================================*/
function cerrarVentanaCarga(){
  $('.fbback').hide();
  $('.fbdrag1').hide();
  $('.fb').hide();
  $('body').css('overflow','auto');
  $('#btn_actualizar_inspecciones').prop('disabled', false); //habilitar boton
}

/* Funcion donde se hace el llamado a las distintas funciones que permiten crear las tablas que guardan los datos locales de inspeccion */
function crearBD_local(){
  crearTablasInspeccionAscensores();
}

/* ============================
* Funcion para crear las tablas de valores de la inspeccion
* Crear tablas (las crea si no existen)
* ============================= */
function crearTablasInspeccionAscensores(){
  crearTablaInformeValoresAudios();

  crearTablaAscensorValoresAudios();
  crearTablaAscensorValoresFotografias();
  crearTablaAscensorValoresIniciales();
  crearTablaAscensorValoresPreliminar();
  crearTablaAscensorValoresProteccion();
  crearTablaAscensorValoresElementos();
  crearTablaAscensorValoresCabina();
  crearTablaAscensorValoresMaquinas();
  crearTablaAscensorValoresPozo();
  crearTablaAscensorValoresFoso();
  crearTablaAscensorValoresObservacionFinal();

  crearTablaPuertasValoresAudios();
  crearTablaPuertasValoresFotografias();
  crearTablaPuertasValoresIniciales();
  crearTablaPuertasValoresPreliminar();
  crearTablaPuertasValoresProteccion();
  crearTablaPuertasValoresElementos();
  crearTablaPuertasValoresMecanicos();
  crearTablaPuertasValoresElectrica();
  crearTablaPuertasValoresMotorizacion();
  crearTablaPuertasValoresOtras();
  crearTablaPuertasValoresManiobras();
  crearTablaPuertasValoresObservacionFinal();

  crearTablaEscalerasValoresAudios();
  crearTablaEscalerasValoresFotografias();
  crearTablaEscalerasValoresIniciales();
  crearTablaEscalerasValoresPreliminar();
  crearTablaEscalerasValoresProteccion();
  crearTablaEscalerasValoresElementos();
  crearTablaEscalerasValoresDefectos();
  crearTablaEscalerasValoresObservacionFinal();

  crearTablaAuditoriaInspeccionesAscensores();
  crearTablaAuditoriaInspeccionesPuertas();
  crearTablaAuditoriaInspeccionesEscaleras();

  crearTablaCliente();
  crearTablaInforme();
}

/*=============================================
* Crear tabla informe_valores_audios
*==============================================*/
function crearTablaInformeValoresAudios(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE informe_valores_audios (k_codusuario,k_codinforme,n_audio,n_directorio,o_estado_envio)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla ascensor_valores_audios
*==============================================*/
function crearTablaAscensorValoresAudios(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE ascensor_valores_audios (k_codusuario,k_codinspeccion,n_audio,n_directorio,o_estado_envio)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla ascensor_valores_fotografias
*==============================================*/
function crearTablaAscensorValoresFotografias(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE ascensor_valores_fotografias (k_codusuario,k_codinspeccion,k_coditem,n_fotografia,n_directorio,o_estado_envio)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla ascensor_valores_iniciales
*==============================================*/
function crearTablaAscensorValoresIniciales(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE ascensor_valores_iniciales (k_codusuario,k_codinspeccion,n_cliente,n_equipo,n_empresamto,o_tipoaccion,v_capacperson,v_capacpeso,v_paradas,f_fecha,v_codigo,o_consecutivoinsp,ultimo_mto,inicio_servicio,ultima_inspeccion,h_hora,o_tipo_informe)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    $('#texto_carga').text("Creando valores iniciales...Espere");
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla ascensor_valores_preliminar
*==============================================*/
function crearTablaAscensorValoresPreliminar(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE ascensor_valores_preliminar (k_codusuario,k_codinspeccion,k_coditem_preli,v_calificacion,o_observacion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    $('#texto_carga').text("Creando valores preliminares...Espere");
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla ascensor_valores_proteccion
*==============================================*/
function crearTablaAscensorValoresProteccion(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE ascensor_valores_proteccion (k_codusuario,k_codinspeccion,k_coditem,v_sele_inspector,v_sele_empresa,o_observacion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    $('#texto_carga').text("Creando valores protección...Espere");
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla ascensor_valores_elementos
*==============================================*/
function crearTablaAscensorValoresElementos(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE ascensor_valores_elementos (k_codusuario,k_codinspeccion,k_coditem,o_descripcion,v_selecion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    $('#texto_carga').text("Creando valores elementos...Espere");
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla ascensor_valores_cabina
*==============================================*/
function crearTablaAscensorValoresCabina(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE ascensor_valores_cabina (k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    $('#texto_carga').text("Creando valores cabina...Espere");
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla ascensor_valores_maquinas
*==============================================*/
function crearTablaAscensorValoresMaquinas(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE ascensor_valores_maquinas (k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    $('#texto_carga').text("Creando valores maquinas...Espere");
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla ascensor_valores_pozo
*==============================================*/
function crearTablaAscensorValoresPozo(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE ascensor_valores_pozo (k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    $('#texto_carga').text("Creando valores pozo...Espere");
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla ascensor_valores_foso
*==============================================*/
function crearTablaAscensorValoresFoso(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE ascensor_valores_foso (k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    $('#texto_carga').text("Creando valores foso...Espere");
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla ascensor_valores_finales
*==============================================*/
function crearTablaAscensorValoresObservacionFinal(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE ascensor_valores_finales (k_codusuario,k_codinspeccion,o_observacion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    $('#texto_carga').text("Creando valores finales...Espere");
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla puertas_valores_audios
*==============================================*/
function crearTablaPuertasValoresAudios(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE puertas_valores_audios (k_codusuario,k_codinspeccion,n_audio,n_directorio,o_estado_envio)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla puertas_valores_fotografias
*==============================================*/
function crearTablaPuertasValoresFotografias(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE puertas_valores_fotografias (k_codusuario,k_codinspeccion,k_coditem,n_fotografia,n_directorio,o_estado_envio)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla puertas_valores_iniciales
*==============================================*/
function crearTablaPuertasValoresIniciales(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE puertas_valores_iniciales (k_codusuario,k_codinspeccion,n_cliente,n_equipo,n_empresamto,o_desc_puerta,o_tipo_puerta,o_motorizacion,o_acceso,o_accionamiento,o_operador,o_hoja,o_transmision,o_identificacion,f_fecha,v_ancho,v_alto,v_codigo,o_consecutivoinsp,ultimo_mto,inicio_servicio,ultima_inspeccion,h_hora,o_tipo_informe)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    $('#texto_carga').text("Creando valores iniciales...Espere");
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla puertas_valores_preliminar
*==============================================*/
function crearTablaPuertasValoresPreliminar(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE puertas_valores_preliminar (k_codusuario,k_codinspeccion,k_coditem_preli,v_calificacion,o_observacion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    $('#texto_carga').text("Creando valores preliminares...Espere");
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla puertas_valores_proteccion
*==============================================*/
function crearTablaPuertasValoresProteccion(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE puertas_valores_proteccion (k_codusuario,k_codinspeccion,k_coditem,v_sele_inspector,v_sele_empresa,o_observacion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    $('#texto_carga').text("Creando valores protección...Espere");
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla puertas_valores_elementos
*==============================================*/
function crearTablaPuertasValoresElementos(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE puertas_valores_elementos (k_codusuario,k_codinspeccion,k_coditem,o_descripcion,v_selecion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    $('#texto_carga').text("Creando valores elementos...Espere");
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla puertas_valores_mecanicos
*==============================================*/
function crearTablaPuertasValoresMecanicos(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE puertas_valores_mecanicos (k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    $('#texto_carga').text("Creando valores mecanicos...Espere");
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla puertas_valores_electrica
*==============================================*/
function crearTablaPuertasValoresElectrica(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE puertas_valores_electrica (k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    $('#texto_carga').text("Creando valores electrica...Espere");
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla puertas_valores_motorizacion
*==============================================*/
function crearTablaPuertasValoresMotorizacion(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE puertas_valores_motorizacion (k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    $('#texto_carga').text("Creando valores motorizacion...Espere");
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla puertas_valores_otras
*==============================================*/
function crearTablaPuertasValoresOtras(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE puertas_valores_otras (k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    $('#texto_carga').text("Creando valores otras...Espere");
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla puertas_valores_maniobras
*==============================================*/
function crearTablaPuertasValoresManiobras(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE puertas_valores_maniobras (k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    $('#texto_carga').text("Creando valores maniobras...Espere");
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla puertas_valores_finales
*==============================================*/
function crearTablaPuertasValoresObservacionFinal(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE puertas_valores_finales (k_codusuario,k_codinspeccion,o_observacion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    $('#texto_carga').text("Creando valores finales...Espere");
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla escaleras_valores_audios
*==============================================*/
function crearTablaEscalerasValoresAudios(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE escaleras_valores_audios (k_codusuario,k_codinspeccion,n_audio,n_directorio,o_estado_envio)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla escaleras_valores_fotografias
*==============================================*/
function crearTablaEscalerasValoresFotografias(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE escaleras_valores_fotografias (k_codusuario,k_codinspeccion,k_coditem,n_fotografia,n_directorio,o_estado_envio)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla escaleras_valores_iniciales
*==============================================*/
function crearTablaEscalerasValoresIniciales(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE escaleras_valores_iniciales (k_codusuario,k_codinspeccion,n_cliente,n_equipo,n_empresamto,v_velocidad,o_tipo_equipo,v_inclinacion,v_ancho_paso,f_fecha,ultimo_mto,inicio_servicio,ultima_inspeccion,v_codigo,o_consecutivoinsp,h_hora,o_tipo_informe)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    $('#texto_carga').text("Creando valores iniciales...Espere");
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla escaleras_valores_preliminar
*==============================================*/
function crearTablaEscalerasValoresPreliminar(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE escaleras_valores_preliminar (k_codusuario,k_codinspeccion,k_coditem_preli,v_calificacion,o_observacion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    $('#texto_carga').text("Creando valores preliminares...Espere");
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla escaleras_valores_proteccion
*==============================================*/
function crearTablaEscalerasValoresProteccion(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE escaleras_valores_proteccion (k_codusuario,k_codinspeccion,k_coditem,v_sele_inspector,v_sele_empresa,o_observacion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    $('#texto_carga').text("Creando valores protección...Espere");
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla escaleras_valores_elementos
*==============================================*/
function crearTablaEscalerasValoresElementos(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE escaleras_valores_elementos (k_codusuario,k_codinspeccion,k_coditem,o_descripcion,v_selecion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    $('#texto_carga').text("Creando valores elementos...Espere");
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla escaleras_valores_defectos
*==============================================*/
function crearTablaEscalerasValoresDefectos(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE escaleras_valores_defectos (k_codusuario,k_codinspeccion,k_coditem,n_calificacion,v_calificacion,o_observacion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    $('#texto_carga').text("Creando valores defectos...Espere");
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla escaleras_valores_finales
*==============================================*/
function crearTablaEscalerasValoresObservacionFinal(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE escaleras_valores_finales (k_codusuario,k_codinspeccion,o_observacion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    $('#texto_carga').text("Creando valores finales...Espere");
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla auditoria_inspecciones_ascensores, para poder controlar el estado de la inspeccion
*==============================================*/
function crearTablaAuditoriaInspeccionesAscensores(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE auditoria_inspecciones_ascensores (k_codusuario,k_codinspeccion,o_consecutivoinsp,o_estado_envio,o_revision,v_item_nocumple,k_codcliente,k_codinforme,k_codusuario_modifica,o_actualizar_inspeccion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    $('#texto_carga').text("Creando valores auditoria...Espere");
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla auditoria_inspecciones_puertas, para poder controlar el estado de la inspeccion
*==============================================*/
function crearTablaAuditoriaInspeccionesPuertas(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE auditoria_inspecciones_puertas (k_codusuario,k_codinspeccion,o_consecutivoinsp,o_estado_envio,o_revision,v_item_nocumple,k_codcliente,k_codinforme,k_codusuario_modifica,o_actualizar_inspeccion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    $('#texto_carga').text("Creando valores auditoria...Espere");
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla auditoria_inspecciones_escaleras, para poder controlar el estado de la inspeccion
*==============================================*/
function crearTablaAuditoriaInspeccionesEscaleras(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE auditoria_inspecciones_escaleras (k_codusuario,k_codinspeccion,o_consecutivoinsp,o_estado_envio,o_revision,v_item_nocumple,k_codcliente,k_codinforme,k_codusuario_modifica,o_actualizar_inspeccion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    $('#texto_carga').text("Creando valores auditoria...Espere");
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla cliente
*==============================================*/
function crearTablaCliente(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE cliente (k_codcliente, v_consecutivocliente,k_codusuario, n_cliente, n_contacto, v_nit, o_direccion, o_telefono, o_correo, n_encargado)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    $('#texto_carga').text("Creando valores cliente...Espere");
    console.log('transaction creada ok');
  });
}

/*=============================================
* Crear tabla informe
*==============================================*/
function crearTablaInforme(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE informe (k_codinforme,v_consecutivoinforme,k_codusuario,f_informe)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    $('#texto_carga').text("Creando valores informe...Espere");
    console.log('transaction creada ok');
  });
}

/*=============================================
* Funcion en donde se cuentan las filas de la tabla ascensor_items_cabina y se valida si el numero de filas es mayor que cero
* para permitir saber si existe o no la tabla con registros dentro
*==============================================*/
function comprobarExistenciaTablaAscensorItemsCabina(){
  var numeroFilas = 0;
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM ascensor_items_cabina";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Numero de filas tabla ascensor_items_cabina -> '+resultSet.rows.item(0).c);
      numeroFilas = resultSet.rows.item(0).c;
      if (numeroFilas > 0) {
        //alert("Ya existe la tabla ascensor_items_cabina!");
      }
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
      /* Funciones que se ejecutan sino existe la tabla // Aparece la ventana de carga */
      probar_conexion_red();
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para llenar la tabla ascensor_items_cabina, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaAscensorItemsCabina(){
  var url="http://192.168.0.23:8888/inspeccion/servidor/php/json_ascensor_items_cabina.php";
  $.getJSON(url,function(ascensor_items_cabina){
    crearTablaAscensorItemsCabina();
    $.each(ascensor_items_cabina, function(i,items){
      addItemsAscensorItemsCabina(items.k_coditem_cabina,items.v_item,items.o_descripcion,items.v_clasificacion);
    });
  });
}

/*=============================================
* Crear tabla ascensor_items_cabina
*==============================================*/
function crearTablaAscensorItemsCabina(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE ascensor_items_cabina (k_coditem_cabina, v_item, o_descripcion, v_clasificacion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction creada ok');
  });
}

/*=============================================
* Funcion para insertar datos en la tabla ascensor_items_cabina
*==============================================*/
function addItemsAscensorItemsCabina(k_coditem_cabina,v_item,o_descripcion,v_clasificacion) {
    db.transaction(function (tx) {
        var query = "INSERT INTO ascensor_items_cabina (k_coditem_cabina, v_item, o_descripcion, v_clasificacion) VALUES (?,?,?,?)";
        tx.executeSql(query, [k_coditem_cabina,v_item,o_descripcion,v_clasificacion], function(tx, res) {
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
        $('#texto_carga').text("Creando items cabina...Espere");
    });
}

/*=============================================
* Funcion en donde se cuentan las filas de la tabla ascensor_items_foso y se valida si el numero de filas es mayor que cero
* para permitir saber si existe o no la tabla con registros dentro
*==============================================*/
function comprobarExistenciaTablaAscensorItemsFoso(){
  var numeroFilas = 0;
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM ascensor_items_foso";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Numero de filas tabla ascensor_items_foso -> '+resultSet.rows.item(0).c);
      numeroFilas = resultSet.rows.item(0).c;
      if (numeroFilas > 0) {
        //alert("Ya existe la tabla ascensor_items_foso!");
      }
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
      /* Funciones que se ejecutan sino existe la tabla */
      llenarTablaAscensorItemsFoso();
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
} 

/*=============================================
* Funcion para llenar la tabla ascensor_items_foso, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaAscensorItemsFoso(){
  var url="http://192.168.0.23:8888/inspeccion/servidor/php/json_ascensor_items_foso.php";
  $.getJSON(url,function(ascensor_items_foso){
    crearTablaAscensorItemsFoso(); 
    $.each(ascensor_items_foso, function(i,items){
      addItemsAscensorItemsFoso(items.k_coditem_foso,items.v_item,items.o_descripcion,items.v_clasificacion);
    });
  });
}

/*=============================================
* Crear tabla ascensor_items_foso
*==============================================*/
function crearTablaAscensorItemsFoso(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE ascensor_items_foso (k_coditem_foso, v_item, o_descripcion, v_clasificacion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction creada ok');
  });
}

/*=============================================
* Funcion para insertar datos en la tabla ascensor_items_foso
*==============================================*/
function addItemsAscensorItemsFoso(k_coditem_foso,v_item,o_descripcion,v_clasificacion) {
    db.transaction(function (tx) {
        var query = "INSERT INTO ascensor_items_foso (k_coditem_foso, v_item, o_descripcion, v_clasificacion) VALUES (?,?,?,?)";
        tx.executeSql(query, [k_coditem_foso,v_item,o_descripcion,v_clasificacion], function(tx, res) {
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
        $('#texto_carga').text("Creando items foso...Espere");
    });
}

/*=============================================
* Funcion en donde se cuentan las filas de la tabla ascensor_items_maquinas y se valida si el numero de filas es mayor que cero
* para permitir saber si existe o no la tabla con registros dentro
*==============================================*/
function comprobarExistenciaTablaAscensorItemsMaquinas(){
  var numeroFilas = 0;
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM ascensor_items_maquinas";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Numero de filas tabla ascensor_items_maquinas -> '+resultSet.rows.item(0).c);
      numeroFilas = resultSet.rows.item(0).c;
      if (numeroFilas > 0) {
        //alert("Ya existe la tabla ascensor_items_maquinas!");
      }
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
      /* Funciones que se ejecutan sino existe la tabla */
      llenarTablaAscensorItemsMaquinas();
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para llenar la tabla ascensor_items_maquinas, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaAscensorItemsMaquinas(){
  var url="http://192.168.0.23:8888/inspeccion/servidor/php/json_ascensor_items_maquinas.php";
  $.getJSON(url,function(ascensor_items_maquinas){
    crearTablaAscensorItemsMaquinas(); 
    $.each(ascensor_items_maquinas, function(i,items){
      addItemsAscensorItemsMaquinas(items.k_coditem_maquinas,items.v_item,items.o_descripcion,items.v_clasificacion);
    });
  });
}

/*=============================================
* Crear tabla ascensor_items_maquinas
*==============================================*/
function crearTablaAscensorItemsMaquinas(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE ascensor_items_maquinas(k_coditem_maquinas, v_item, o_descripcion, v_clasificacion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction creada ok');
  });
}

/*=============================================
* Funcion para insertar datos en la tabla ascensor_items_maquinas
*==============================================*/
function addItemsAscensorItemsMaquinas(k_coditem_maquinas,v_item,o_descripcion,v_clasificacion) {
    db.transaction(function (tx) {
        var query = "INSERT INTO ascensor_items_maquinas (k_coditem_maquinas, v_item, o_descripcion, v_clasificacion) VALUES (?,?,?,?)";
        tx.executeSql(query, [k_coditem_maquinas,v_item,o_descripcion,v_clasificacion], function(tx, res) {
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
        $('#texto_carga').text("Creando items maquinas...Espere");
    });
}

/*=============================================
* Funcion en donde se cuentan las filas de la tabla ascensor_items_pozo y se valida si el numero de filas es mayor que cero
* para permitir saber si existe o no la tabla con registros dentro
*==============================================*/
function comprobarExistenciaTablaAscensorItemsPozo(){
  var numeroFilas = 0;
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM ascensor_items_pozo";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Numero de filas tabla ascensor_items_pozo -> '+resultSet.rows.item(0).c);
      numeroFilas = resultSet.rows.item(0).c;
      if (numeroFilas > 0) {
        //alert("Ya existe la tabla ascensor_items_pozo!");
      }
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
      /* Funciones que se ejecutan sino existe la tabla */
      llenarTablaAscensorItemsPozo();
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
} 

/*=============================================
* Funcion para llenar la tabla ascensor_items_pozo, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaAscensorItemsPozo(){
  var url="http://192.168.0.23:8888/inspeccion/servidor/php/json_ascensor_items_pozo.php";
  $.getJSON(url,function(ascensor_items_pozo){
    crearTablaAscensorItemsPozo(); 
    $.each(ascensor_items_pozo, function(i,items){
      addItemsAscensorItemsPozo(items.k_coditem_pozo,items.v_item,items.o_descripcion,items.v_clasificacion);
    });
  });
}

/*=============================================
* Crear tabla ascensor_items_pozo
*==============================================*/
function crearTablaAscensorItemsPozo(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE ascensor_items_pozo(k_coditem_pozo, v_item, o_descripcion, v_clasificacion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction creada ok');
  });
}

/*=============================================
* Funcion para insertar datos en la tabla ascensor_items_pozo
*==============================================*/
function addItemsAscensorItemsPozo(k_coditem_pozo,v_item,o_descripcion,v_clasificacion) {
    db.transaction(function (tx) {
        var query = "INSERT INTO ascensor_items_pozo (k_coditem_pozo, v_item, o_descripcion, v_clasificacion) VALUES (?,?,?,?)";
        tx.executeSql(query, [k_coditem_pozo,v_item,o_descripcion,v_clasificacion], function(tx, res) {
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
        $('#texto_carga').text("Creando items pozo...Espere");
    });
}

/*=============================================
* Funcion en donde se cuentan las filas de la tabla ascensor_items_preliminar y se valida si el numero de filas es mayor que cero
* para permitir saber si existe o no la tabla con registros dentro
*==============================================*/
function comprobarExistenciaTablaAscensorItemsPreliminar(){
  var numeroFilas = 0;
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM ascensor_items_preliminar";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Numero de filas tabla ascensor_items_preliminar -> '+resultSet.rows.item(0).c);
      numeroFilas = resultSet.rows.item(0).c;
      if (numeroFilas > 0) {
        //alert("Ya existe la tabla ascensor_items_preliminar!");
      }
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
      /* Funciones que se ejecutan sino existe la tabla */
      llenarTablaAscensorItemsPreliminar();
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para llenar la tabla ascensor_items_preliminar, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaAscensorItemsPreliminar(){
  var url="http://192.168.0.23:8888/inspeccion/servidor/php/json_ascensor_items_preliminar.php";
  $.getJSON(url,function(ascensor_items_preliminar){
    crearTablaAscensorItemsPreliminar(); 
    $.each(ascensor_items_preliminar, function(i,items){
      addItemsAscensorItemsPreliminar(items.k_coditem_preli,items.o_descripcion);
    });
  });
}

/*=============================================
* Crear tabla ascensor_items_preliminar
*==============================================*/
function crearTablaAscensorItemsPreliminar(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE ascensor_items_preliminar(k_coditem_preli, o_descripcion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction creada ok');
  });
}

/*=============================================
* Funcion para insertar datos en la tabla ascensor_items_preliminar
*==============================================*/
function addItemsAscensorItemsPreliminar(k_coditem_pozo,o_descripcion) {
    db.transaction(function (tx) {
        var query = "INSERT INTO ascensor_items_preliminar (k_coditem_preli, o_descripcion) VALUES (?,?)";
        tx.executeSql(query, [k_coditem_pozo,o_descripcion], function(tx, res) {
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
        $('#texto_carga').text("Creando items preliminares...Espere");
    });
}

/*=============================================
* Funcion en donde se cuentan las filas de la tabla ascensor_items_proteccion y se valida si el numero de filas es mayor que cero
* para permitir saber si existe o no la tabla con registros dentro
*==============================================*/
function comprobarExistenciaTablaAscensorItemsProteccion(){
  var numeroFilas = 0;
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM ascensor_items_proteccion";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Numero de filas tabla ascensor_items_proteccion -> '+resultSet.rows.item(0).c);
      numeroFilas = resultSet.rows.item(0).c;
      if (numeroFilas > 0) {
        //alert("Ya existe la tabla puertas_items_mecanicos!");
      }
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
      /* Funciones que se ejecutan sino existe la tabla */
      llenarTablaAscensorItemsProteccion();
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para llenar la tabla ascensor_items_proteccion, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaAscensorItemsProteccion(){
  var url="http://192.168.0.23:8888/inspeccion/servidor/php/json_ascensor_items_proteccion.php";
  $.getJSON(url,function(ascensor_items_proteccion){
    crearTablaAscensorItemsProteccion();
    $.each(ascensor_items_proteccion, function(i,items){
      addItemsAscensorItemsProteccion(items.k_coditem,items.o_descripcion);
    });
  });
}

/*=============================================
* Crear tabla ascensor_items_proteccion
*==============================================*/
function crearTablaAscensorItemsProteccion(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE ascensor_items_proteccion(k_coditem, o_descripcion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction creada ok');
  });
}

/*=============================================
* Funcion para insertar datos en la tabla ascensor_items_proteccion
*==============================================*/
function addItemsAscensorItemsProteccion(k_coditem,o_descripcion) {
    db.transaction(function (tx) {
        var query = "INSERT INTO ascensor_items_proteccion (k_coditem, o_descripcion) VALUES (?,?)";
        tx.executeSql(query, [k_coditem,o_descripcion], function(tx, res) {
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
        $('#texto_carga').text("Creando items protección...Espere");
    });
}

/*=============================================
* Funcion en donde se cuentan las filas de la tabla ascensor_items_elementos y se valida si el numero de filas es mayor que cero
* para permitir saber si existe o no la tabla con registros dentro
*==============================================*/
function comprobarExistenciaTablaAscensorItemsElementos(){
  var numeroFilas = 0;
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM ascensor_items_elementos";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Numero de filas tabla ascensor_items_elementos -> '+resultSet.rows.item(0).c);
      numeroFilas = resultSet.rows.item(0).c;
      if (numeroFilas > 0) {
        //alert("Ya existe la tabla ascensor_items_elementos!");
      }
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
      /* Funciones que se ejecutan sino existe la tabla */
      llenarTablaAscensorItemsElementos();
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para llenar la tabla ascensor_items_elementos, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaAscensorItemsElementos(){
  var url="http://192.168.0.23:8888/inspeccion/servidor/php/json_ascensor_items_elementos.php";
  $.getJSON(url,function(ascensor_items_elementos){
    crearTablaAscensorItemsElementos();
    $.each(ascensor_items_elementos, function(i,items){
      addItemsAscensorItemsElementos(items.k_coditem,items.o_descripcion);
    });
  });
}

/*=============================================
* Crear tabla ascensor_items_elementos
*==============================================*/
function crearTablaAscensorItemsElementos(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE ascensor_items_elementos(k_coditem, o_descripcion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction creada ok');
  });
}

/*=============================================
* Funcion para insertar datos en la tabla ascensor_items_elementos
*==============================================*/
function addItemsAscensorItemsElementos(k_coditem,o_descripcion) {
    db.transaction(function (tx) {
        var query = "INSERT INTO ascensor_items_elementos (k_coditem,o_descripcion) VALUES (?,?)";
        tx.executeSql(query, [k_coditem,o_descripcion], function(tx, res) {
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
        $('#texto_carga').text("Creando items elementos...Espere");
    });
}

/*=============================================
* Funcion en donde se cuentan las filas de la tabla escaleras_items_preliminar y se valida si el numero de filas es mayor que cero
* para permitir saber si existe o no la tabla con registros dentro
*==============================================*/
function comprobarExistenciaTablaEscalerasItemsPreliminar(){
  var numeroFilas = 0;
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM escaleras_items_preliminar";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Numero de filas tabla escaleras_items_preliminar -> '+resultSet.rows.item(0).c);
      numeroFilas = resultSet.rows.item(0).c;
      if (numeroFilas > 0) {
        //alert("Ya existe la tabla escaleras_items_preliminar!");
      }
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
      /* Funciones que se ejecutan sino existe la tabla */
      llenarTablaEscalerasItemsPreliminar();
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para llenar la tabla escaleras_items_preliminar, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaEscalerasItemsPreliminar(){
  var url="http://192.168.0.23:8888/inspeccion/servidor/php/json_escaleras_items_preliminar.php";
  $.getJSON(url,function(escaleras_items_preliminar){
    crearTablaEscalerasItemsPreliminar(); 
    $.each(escaleras_items_preliminar, function(i,items){
      addItemsEscalerasItemsPreliminar(items.k_coditem,items.o_descripcion);
    });
  });
}

/*=============================================
* Crear tabla escaleras_items_preliminar
*==============================================*/
function crearTablaEscalerasItemsPreliminar(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE escaleras_items_preliminar(k_coditem, o_descripcion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction creada ok');
  });
}

/*=============================================
* Funcion para insertar datos en la tabla escaleras_items_preliminar
*==============================================*/
function addItemsEscalerasItemsPreliminar(k_coditem,o_descripcion) {
    db.transaction(function (tx) {
        var query = "INSERT INTO escaleras_items_preliminar (k_coditem, o_descripcion) VALUES (?,?)";
        tx.executeSql(query, [k_coditem,o_descripcion], function(tx, res) {
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
        $('#texto_carga').text("Creando items preliminares...Espere");
    });
}

/*=============================================
* Funcion en donde se cuentan las filas de la tabla escaleras_items_proteccion y se valida si el numero de filas es mayor que cero
* para permitir saber si existe o no la tabla con registros dentro
*==============================================*/
function comprobarExistenciaTablaEscalerasItemsProteccion(){
  var numeroFilas = 0;
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM escaleras_items_proteccion";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Numero de filas tabla escaleras_items_proteccion -> '+resultSet.rows.item(0).c);
      numeroFilas = resultSet.rows.item(0).c;
      if (numeroFilas > 0) {
        //alert("Ya existe la tabla escaleras_items_mecanicos!");
      }
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
      /* Funciones que se ejecutan sino existe la tabla */
      llenarTablaEscalerasItemsProteccion();
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para llenar la tabla escaleras_items_proteccion, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaEscalerasItemsProteccion(){
  var url="http://192.168.0.23:8888/inspeccion/servidor/php/json_escaleras_items_proteccion.php";
  $.getJSON(url,function(escaleras_items_proteccion){
    crearTablaEscalerasItemsProteccion();
    $.each(escaleras_items_proteccion, function(i,items){
      addItemsEscalerasItemsProteccion(items.k_coditem,items.o_descripcion);
    });
  });
}

/*=============================================
* Crear tabla escaleras_items_proteccion
*==============================================*/
function crearTablaEscalerasItemsProteccion(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE escaleras_items_proteccion(k_coditem, o_descripcion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction creada ok');
  });
}

/*=============================================
* Funcion para insertar datos en la tabla escaleras_items_proteccion
*==============================================*/
function addItemsEscalerasItemsProteccion(k_coditem,o_descripcion) {
    db.transaction(function (tx) {
        var query = "INSERT INTO escaleras_items_proteccion (k_coditem, o_descripcion) VALUES (?,?)";
        tx.executeSql(query, [k_coditem,o_descripcion], function(tx, res) {
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
        $('#texto_carga').text("Creando items protección...Espere");
    });
}

/*=============================================
* Funcion en donde se cuentan las filas de la tabla escaleras_items_elementos y se valida si el numero de filas es mayor que cero
* para permitir saber si existe o no la tabla con registros dentro
*==============================================*/
function comprobarExistenciaTablaEscalerasItemsElementos(){
  var numeroFilas = 0;
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM escaleras_items_elementos";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Numero de filas tabla escaleras_items_elementos -> '+resultSet.rows.item(0).c);
      numeroFilas = resultSet.rows.item(0).c;
      if (numeroFilas > 0) {
        //alert("Ya existe la tabla escaleras_items_elementos!");
      }
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
      /* Funciones que se ejecutan sino existe la tabla */
      llenarTablaEscalerasItemsElementos();
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para llenar la tabla escaleras_items_elementos, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaEscalerasItemsElementos(){
  var url="http://192.168.0.23:8888/inspeccion/servidor/php/json_escaleras_items_elementos.php";
  $.getJSON(url,function(escaleras_items_elementos){
    crearTablaEscalerasItemsElementos();
    $.each(escaleras_items_elementos, function(i,items){
      addItemsEscalerasItemsElementos(items.k_coditem,items.o_descripcion);
    });
  });
}

/*=============================================
* Crear tabla escaleras_items_elementos
*==============================================*/
function crearTablaEscalerasItemsElementos(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE escaleras_items_elementos(k_coditem, o_descripcion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction creada ok');
  });
}

/*=============================================
* Funcion para insertar datos en la tabla escaleras_items_elementos
*==============================================*/
function addItemsEscalerasItemsElementos(k_coditem,o_descripcion) {
    db.transaction(function (tx) {
        var query = "INSERT INTO escaleras_items_elementos (k_coditem,o_descripcion) VALUES (?,?)";
        tx.executeSql(query, [k_coditem,o_descripcion], function(tx, res) {
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
        $('#texto_carga').text("Creando items elementos...Espere");
    });
}

/*=============================================
* Funcion en donde se cuentan las filas de la tabla escaleras_items_defectos y se valida si el numero de filas es mayor que cero
* para permitir saber si existe o no la tabla con registros dentro
*==============================================*/
function comprobarExistenciaTablaEscalerasItemsDefectos(){
  var numeroFilas = 0;
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM escaleras_items_defectos";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Numero de filas tabla escaleras_items_defectos -> '+resultSet.rows.item(0).c);
      numeroFilas = resultSet.rows.item(0).c;
      if (numeroFilas > 0) {
        //alert("Ya existe la tabla escaleras_items_defectos!");
      }
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
      /* Funciones que se ejecutan sino existe la tabla */
      llenarTablaEscalerasItemsDefectos();
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para llenar la tabla escaleras_items_defectos, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaEscalerasItemsDefectos(){
  var url="http://192.168.0.23:8888/inspeccion/servidor/php/json_escaleras_items_defectos.php";
  $.getJSON(url,function(escaleras_items_defectos){
    crearTablaEscalerasItemsDefectos(); 
    $.each(escaleras_items_defectos, function(i,items){
      addItemsEscalerasItemsDefectos(items.k_coditem_escaleras,items.o_descripcion,items.v_clasificacion);
    });
  });
}

/*=============================================
* Crear tabla escaleras_items_defectos
*==============================================*/
function crearTablaEscalerasItemsDefectos(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE escaleras_items_defectos(k_coditem_escaleras, o_descripcion, v_clasificacion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction creada ok');
  });
}

/*=============================================
* Funcion para insertar datos en la tabla escaleras_items_defectos
*==============================================*/
function addItemsEscalerasItemsDefectos(k_coditem_escaleras,o_descripcion,v_clasificacion) {
    db.transaction(function (tx) {
        var query = "INSERT INTO escaleras_items_defectos (k_coditem_escaleras, o_descripcion, v_clasificacion) VALUES (?,?,?)";
        tx.executeSql(query, [k_coditem_escaleras,o_descripcion,v_clasificacion], function(tx, res) {
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
        $('#texto_carga').text("Creando items defectos...Espere");
    });
}

/*=============================================
* Funcion en donde se cuentan las filas de la tabla puertas_items_preliminar y se valida si el numero de filas es mayor que cero
* para permitir saber si existe o no la tabla con registros dentro
*==============================================*/
function comprobarExistenciaTablaPuertasItemsPreliminar(){
  var numeroFilas = 0;
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM puertas_items_preliminar";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Numero de filas tabla puertas_items_preliminar -> '+resultSet.rows.item(0).c);
      numeroFilas = resultSet.rows.item(0).c;
      if (numeroFilas > 0) {
        //alert("Ya existe la tabla puertas_items_preliminar!");
      }
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
      /* Funciones que se ejecutan sino existe la tabla */
      llenarTablaPuertasItemsPreliminar();
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para llenar la tabla puertas_items_preliminar, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaPuertasItemsPreliminar(){
  var url="http://192.168.0.23:8888/inspeccion/servidor/php/json_puertas_items_preliminar.php";
  $.getJSON(url,function(puertas_items_preliminar){
    crearTablaPuertasItemsPreliminar(); 
    $.each(puertas_items_preliminar, function(i,items){
      addItemsPuertasItemsPreliminar(items.k_coditem,items.o_descripcion);
    });
  });
}

/*=============================================
* Crear tabla puertas_items_preliminar
*==============================================*/
function crearTablaPuertasItemsPreliminar(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE puertas_items_preliminar(k_coditem, o_descripcion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction creada ok');
  });
}

/*=============================================
* Funcion para insertar datos en la tabla puertas_items_preliminar
*==============================================*/
function addItemsPuertasItemsPreliminar(k_coditem,o_descripcion) {
    db.transaction(function (tx) {
        var query = "INSERT INTO puertas_items_preliminar (k_coditem, o_descripcion) VALUES (?,?)";
        tx.executeSql(query, [k_coditem,o_descripcion], function(tx, res) {
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
        $('#texto_carga').text("Creando items preliminares...Espere");
    });
}

/*=============================================
* Funcion en donde se cuentan las filas de la tabla puertas_items_proteccion y se valida si el numero de filas es mayor que cero
* para permitir saber si existe o no la tabla con registros dentro
*==============================================*/
function comprobarExistenciaTablaPuertasItemsProteccion(){
  var numeroFilas = 0;
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM puertas_items_proteccion";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Numero de filas tabla puertas_items_proteccion -> '+resultSet.rows.item(0).c);
      numeroFilas = resultSet.rows.item(0).c;
      if (numeroFilas > 0) {
        //alert("Ya existe la tabla puertas_items_mecanicos!");
      }
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
      /* Funciones que se ejecutan sino existe la tabla */
      llenarTablaPuertasItemsProteccion();
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para llenar la tabla puertas_items_proteccion, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaPuertasItemsProteccion(){
  var url="http://192.168.0.23:8888/inspeccion/servidor/php/json_puertas_items_proteccion.php";
  $.getJSON(url,function(puertas_items_proteccion){
    crearTablaPuertasItemsProteccion();
    $.each(puertas_items_proteccion, function(i,items){
      addItemsPuertasItemsProteccion(items.k_coditem,items.o_descripcion);
    });
  });
}

/*=============================================
* Crear tabla puertas_items_proteccion
*==============================================*/
function crearTablaPuertasItemsProteccion(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE puertas_items_proteccion(k_coditem, o_descripcion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction creada ok');
  });
}

/*=============================================
* Funcion para insertar datos en la tabla puertas_items_proteccion
*==============================================*/
function addItemsPuertasItemsProteccion(k_coditem,o_descripcion) {
    db.transaction(function (tx) {
        var query = "INSERT INTO puertas_items_proteccion (k_coditem, o_descripcion) VALUES (?,?)";
        tx.executeSql(query, [k_coditem,o_descripcion], function(tx, res) {
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
        $('#texto_carga').text("Creando items protección...Espere");
    });
}

/*=============================================
* Funcion en donde se cuentan las filas de la tabla puertas_items_elementos y se valida si el numero de filas es mayor que cero
* para permitir saber si existe o no la tabla con registros dentro
*==============================================*/
function comprobarExistenciaTablaPuertasItemsElementos(){
  var numeroFilas = 0;
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM puertas_items_elementos";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Numero de filas tabla puertas_items_elementos -> '+resultSet.rows.item(0).c);
      numeroFilas = resultSet.rows.item(0).c;
      if (numeroFilas > 0) {
        //alert("Ya existe la tabla puertas_items_elementos!");
      }
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
      /* Funciones que se ejecutan sino existe la tabla */
      llenarTablaPuertasItemsElementos();
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para llenar la tabla puertas_items_elementos, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaPuertasItemsElementos(){
  var url="http://192.168.0.23:8888/inspeccion/servidor/php/json_puertas_items_elementos.php";
  $.getJSON(url,function(puertas_items_elementos){
    crearTablaPuertasItemsElementos();
    $.each(puertas_items_elementos, function(i,items){
      addItemsPuertasItemsElementos(items.k_coditem,items.o_descripcion);
    });
  });
}

/*=============================================
* Crear tabla puertas_items_elementos
*==============================================*/
function crearTablaPuertasItemsElementos(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE puertas_items_elementos(k_coditem, o_descripcion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction creada ok');
  });
}

/*=============================================
* Funcion para insertar datos en la tabla puertas_items_elementos
*==============================================*/
function addItemsPuertasItemsElementos(k_coditem,o_descripcion) {
    db.transaction(function (tx) {
        var query = "INSERT INTO puertas_items_elementos (k_coditem,o_descripcion) VALUES (?,?)";
        tx.executeSql(query, [k_coditem,o_descripcion], function(tx, res) {
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
        $('#texto_carga').text("Creando items elementos...Espere");
    });
}

/*=============================================
* Funcion en donde se cuentan las filas de la tabla puertas_items_mecanicos y se valida si el numero de filas es mayor que cero
* para permitir saber si existe o no la tabla con registros dentro
*==============================================*/
function comprobarExistenciaTablaPuertasItemsMecanicos(){
  var numeroFilas = 0;
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM puertas_items_mecanicos";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Numero de filas tabla puertas_items_mecanicos -> '+resultSet.rows.item(0).c);
      numeroFilas = resultSet.rows.item(0).c;
      if (numeroFilas > 0) {
        //alert("Ya existe la tabla puertas_items_mecanicos!");
      }
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
      /* Funciones que se ejecutan sino existe la tabla */
      llenarTablaPuertasItemsMecanicos();
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para llenar la tabla puertas_items_mecanicos, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaPuertasItemsMecanicos(){
  var url="http://192.168.0.23:8888/inspeccion/servidor/php/json_puertas_items_mecanicos.php";
  $.getJSON(url,function(puertas_items_mecanicos){
    crearTablaPuertasItemsMecanicos(); 
    $.each(puertas_items_mecanicos, function(i,items){
      addItemsPuertasItemsMecanicos(items.k_coditem_puertas,items.o_descripcion,items.v_clasificacion);
    });
  });
}

/*=============================================
* Crear tabla puertas_items_mecanicos
*==============================================*/
function crearTablaPuertasItemsMecanicos(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE puertas_items_mecanicos(k_coditem_puertas, o_descripcion, v_clasificacion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction creada ok');
  });
}

/*=============================================
* Funcion para insertar datos en la tabla puertas_items_mecanicos
*==============================================*/
function addItemsPuertasItemsMecanicos(k_coditem_puertas,o_descripcion,v_clasificacion) {
  db.transaction(function (tx) {
    var query = "INSERT INTO puertas_items_mecanicos (k_coditem_puertas, o_descripcion, v_clasificacion) VALUES (?,?,?)";
    tx.executeSql(query, [k_coditem_puertas,o_descripcion,v_clasificacion], function(tx, res) {
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
    $('#texto_carga').text("Creando items mecánicos...Espere");
  });
}

/*=============================================
* Funcion en donde se cuentan las filas de la tabla puertas_items_electrica y se valida si el numero de filas es mayor que cero
* para permitir saber si existe o no la tabla con registros dentro
*==============================================*/
function comprobarExistenciaTablaPuertasItemsElectrica(){
  var numeroFilas = 0;
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM puertas_items_electrica";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Numero de filas tabla puertas_items_electrica -> '+resultSet.rows.item(0).c);
      numeroFilas = resultSet.rows.item(0).c;
      if (numeroFilas > 0) {
        //alert("Ya existe la tabla puertas_items_electrica!");
      }
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
      /* Funciones que se ejecutan sino existe la tabla */
      llenarTablaPuertasItemsElectrica();
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para llenar la tabla puertas_items_electrica, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaPuertasItemsElectrica(){
  var url="http://192.168.0.23:8888/inspeccion/servidor/php/json_puertas_items_electrica.php";
  $.getJSON(url,function(puertas_items_electrica){
    crearTablaPuertasItemsElectrica(); 
    $.each(puertas_items_electrica, function(i,items){
      addItemsPuertasItemsElectrica(items.k_coditem_electrica,items.o_descripcion,items.v_clasificacion);
    });
  });
}

/*=============================================
* Crear tabla puertas_items_electrica
*==============================================*/
function crearTablaPuertasItemsElectrica(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE puertas_items_electrica(k_coditem_electrica, o_descripcion, v_clasificacion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction creada ok');
  });
}

/*=============================================
* Funcion para insertar datos en la tabla puertas_items_electrica
*==============================================*/
function addItemsPuertasItemsElectrica(k_coditem_electrica,o_descripcion,v_clasificacion) {
  db.transaction(function (tx) {
    var query = "INSERT INTO puertas_items_electrica (k_coditem_electrica, o_descripcion, v_clasificacion) VALUES (?,?,?)";
    tx.executeSql(query, [k_coditem_electrica,o_descripcion,v_clasificacion], function(tx, res) {
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
    $('#texto_carga').text("Creando items eléctrica...Espere");
  });
}

/*=============================================
* Funcion en donde se cuentan las filas de la tabla puertas_items_maniobras y se valida si el numero de filas es mayor que cero
* para permitir saber si existe o no la tabla con registros dentro
*==============================================*/
function comprobarExistenciaTablaPuertasItemsManiobras(){
  var numeroFilas = 0;
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM puertas_items_maniobras";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Numero de filas tabla puertas_items_maniobras -> '+resultSet.rows.item(0).c);
      numeroFilas = resultSet.rows.item(0).c;
      if (numeroFilas > 0) {
        //alert("Ya existe la tabla puertas_items_maniobras!");
      }
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
      /* Funciones que se ejecutan sino existe la tabla */
      llenarTablaPuertasItemsManiobras();
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para llenar la tabla puertas_items_maniobras, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaPuertasItemsManiobras(){
  var url="http://192.168.0.23:8888/inspeccion/servidor/php/json_puertas_items_maniobras.php";
  $.getJSON(url,function(puertas_items_maniobras){
    crearTablaPuertasItemsManiobras(); 
    $.each(puertas_items_maniobras, function(i,items){
      addItemsPuertasItemsManiobras(items.k_coditem_maniobras,items.o_descripcion,items.v_clasificacion);
    });
  });
}

/*=============================================
* Crear tabla puertas_items_maniobras
*==============================================*/
function crearTablaPuertasItemsManiobras(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE puertas_items_maniobras(k_coditem_maniobras, o_descripcion, v_clasificacion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction creada ok');
  });
}

/*=============================================
* Funcion para insertar datos en la tabla puertas_items_maniobras
*==============================================*/
function addItemsPuertasItemsManiobras(k_coditem_maniobras,o_descripcion,v_clasificacion) {
  db.transaction(function (tx) {
    var query = "INSERT INTO puertas_items_maniobras (k_coditem_maniobras, o_descripcion, v_clasificacion) VALUES (?,?,?)";
    tx.executeSql(query, [k_coditem_maniobras,o_descripcion,v_clasificacion], function(tx, res) {
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
    $('#texto_carga').text("Creando items maniobras...Espere");
  });
}

/*=============================================
* Funcion en donde se cuentan las filas de la tabla puertas_items_motorizacion y se valida si el numero de filas es mayor que cero
* para permitir saber si existe o no la tabla con registros dentro
*==============================================*/
function comprobarExistenciaTablaPuertasItemsMotorizacion(){
  var numeroFilas = 0;
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM puertas_items_motorizacion";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Numero de filas tabla puertas_items_motorizacion -> '+resultSet.rows.item(0).c);
      numeroFilas = resultSet.rows.item(0).c;
      if (numeroFilas > 0) {
        //alert("Ya existe la tabla puertas_items_motorizacion!");
      }
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
      /* Funciones que se ejecutan sino existe la tabla */
      llenarTablaPuertasItemsMotorizacion();
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para llenar la tabla puertas_items_motorizacion, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaPuertasItemsMotorizacion(){
  var url="http://192.168.0.23:8888/inspeccion/servidor/php/json_puertas_items_motorizacion.php";
  $.getJSON(url,function(puertas_items_motorizacion){
    crearTablaPuertasItemsMotorizacion(); 
    $.each(puertas_items_motorizacion, function(i,items){
      addItemsPuertasItemsMotorizacion(items.k_coditem_motorizacion,items.o_descripcion,items.v_clasificacion);
    });
  });
}

/*=============================================
* Crear tabla puertas_items_motorizacion
*==============================================*/
function crearTablaPuertasItemsMotorizacion(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE puertas_items_motorizacion(k_coditem_motorizacion, o_descripcion, v_clasificacion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction creada ok');
  });
}

/*=============================================
* Funcion para insertar datos en la tabla puertas_items_motorizacion
*==============================================*/
function addItemsPuertasItemsMotorizacion(k_coditem_motorizacion,o_descripcion,v_clasificacion) {
  db.transaction(function (tx) {
    var query = "INSERT INTO puertas_items_motorizacion (k_coditem_motorizacion, o_descripcion, v_clasificacion) VALUES (?,?,?)";
    tx.executeSql(query, [k_coditem_motorizacion,o_descripcion,v_clasificacion], function(tx, res) {
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
    $('#texto_carga').text("Creando items motorización...Espere");
  });
}

/*=============================================
* Funcion en donde se cuentan las filas de la tabla puertas_items_otras y se valida si el numero de filas es mayor que cero
* para permitir saber si existe o no la tabla con registros dentro
*==============================================*/
function comprobarExistenciaTablaPuertasItemsOtras(){
  var numeroFilas = 0;
  db.transaction(function (tx) {
    var query = "SELECT COUNT(*) AS c FROM puertas_items_otras";
    tx.executeSql(query, [], function (tx, resultSet) {
      console.log('Numero de filas tabla puertas_items_otras -> '+resultSet.rows.item(0).c);
      numeroFilas = resultSet.rows.item(0).c;
      if (numeroFilas > 0) {
        //alert("Ya existe la tabla puertas_items_otras!");
      }
    },
    function (tx, error) {
      console.log('SELECT error: ' + error.message);
      /* Funciones que se ejecutan sino existe la tabla */
      llenarTablaPuertasItemsOtras();
    });
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction ok');
  });
}

/*=============================================
* Funcion para llenar la tabla puertas_items_otras, trayendo del servidor los items en un archivo JSON
*==============================================*/
function llenarTablaPuertasItemsOtras(){
  var url="http://192.168.0.23:8888/inspeccion/servidor/php/json_puertas_items_otras.php";
  $.getJSON(url,function(puertas_items_otras){
    crearTablaPuertasItemsOtras();
    $.each(puertas_items_otras, function(i,items){
      addItemsPuertasItemsOtras(items.k_coditem_otras,items.o_descripcion,items.v_clasificacion);
      setTimeout('cerrarVentanaCarga()',17000);
    });
  });
}

/*=============================================
* Crear tabla puertas_items_otras
*==============================================*/
function crearTablaPuertasItemsOtras(){
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE puertas_items_otras(k_coditem_otras, o_descripcion, v_clasificacion)');
  }, function (error) {
    console.log('transaction error: ' + error.message);
  }, function () {
    console.log('transaction creada ok');
  });
}

/*=============================================
* Funcion para insertar datos en la tabla puertas_items_otras
*==============================================*/
function addItemsPuertasItemsOtras(k_coditem_otras,o_descripcion,v_clasificacion) {
  db.transaction(function (tx) {
    var query = "INSERT INTO puertas_items_otras (k_coditem_otras, o_descripcion, v_clasificacion) VALUES (?,?,?)";
    tx.executeSql(query, [k_coditem_otras,o_descripcion,v_clasificacion], function(tx, res) {
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
    $('#texto_carga').text("Finalizando...Espere");
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

/*=============================================
* Si tenemos conexion a internet muestra un mensaje de carga y prosigue a crear y llenar las tablas
*==============================================*/
function valor_conexion(conexion) {
  if (conexion==1) {
    //alert("Hay conexion conexión a internet!");
    abrirVentanaCarga();
    crearBD_local();//primero creamos algunas tablas necesarias de la app
    llenarTablaAscensorItemsCabina();
    comprobarExistenciaTablaAscensorItemsFoso();
    comprobarExistenciaTablaAscensorItemsMaquinas();
    comprobarExistenciaTablaAscensorItemsPozo();
    comprobarExistenciaTablaAscensorItemsPreliminar();
    comprobarExistenciaTablaAscensorItemsProteccion();
    comprobarExistenciaTablaAscensorItemsElementos();

    comprobarExistenciaTablaEscalerasItemsPreliminar();
    comprobarExistenciaTablaEscalerasItemsProteccion();
    comprobarExistenciaTablaEscalerasItemsElementos();
    comprobarExistenciaTablaEscalerasItemsDefectos();

    comprobarExistenciaTablaPuertasItemsPreliminar();
    comprobarExistenciaTablaPuertasItemsProteccion();
    comprobarExistenciaTablaPuertasItemsElementos();
    comprobarExistenciaTablaPuertasItemsMecanicos();
    comprobarExistenciaTablaPuertasItemsElectrica();
    comprobarExistenciaTablaPuertasItemsManiobras();
    comprobarExistenciaTablaPuertasItemsMotorizacion();
    comprobarExistenciaTablaPuertasItemsOtras();
  } else {
    alert("No tiene conexión a internet!");
    location.href="./index.html";
  }
}