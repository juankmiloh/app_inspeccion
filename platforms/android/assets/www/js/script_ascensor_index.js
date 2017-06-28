jQuery(document).ready(function($){
  $('#div_revision').hide();
  $('#div_btn_regresar').hide();
  click_btn_revision();
  click_btn_regresar();
  cargarSelectInspecciones();
  fechaFooter();
});

/*=============================================
* Crear base de datos / Hacer conexion si ya esta creada
* parametros:
* var dbShell = window.openDatabase(database_name, database_version, database_displayname, database_size);
*==============================================*/
var db = window.openDatabase("montajes_inspeccion_mp", "1.0", "Inspeccion_MP", 1000000);

/* Fecha del footer */
function fechaFooter(){
  var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
  var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
  var f = new Date();
  var fecha = diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
  $('#fecha_footer').text(fecha);
}

/*=============================================
* Funcion que se ejecuta cuando clickamos en el boton de informe de revision
*==============================================*/
function click_btn_revision(){
	$("#btn_revision").click(function(){
		if( $('#div_revision').is(":visible") ){
			//si esta visible
		}else{
			//si no esta visible
		  	$('#div_titulo').hide('fast');
			$('#div_btn_informe_inicial').hide('fast');
			$('#div_btn_revision').hide('fast');
			$('#div_revision').show('fast'); //muetras el div
			$('#div_btn_regresar').show('fast');
		}
  	});
}

/*=============================================
* Funcion que se ejecuta cuando clickamos en el boton regresar
*==============================================*/
function click_btn_regresar(){
	$("#btn_regresar").click(function(){
		if( $('#div_revision').is(":visible") ){
			//si esta visible
			$('#div_titulo').show('fast');
			$('#div_btn_informe_inicial').show('fast');
			$('#div_btn_revision').show('fast');
		  	$('#div_revision').hide('fast'); //esconde el div
		  	$('#div_btn_regresar').hide('fast');
		}else{
			//si no esta visible
		}
  	});
}

/*=============================================
* Funcion para hacer un select a la tabla auditoria_inspecciones_ascensores y cargar las inspecciones que estan para revision
*==============================================*/
function cargarSelectInspecciones(){
	db.transaction(function (tx) {
		var query = "SELECT k_codusuario,k_codinspeccion,o_consecutivoinsp,o_estado_envio,o_revision,v_item_nocumple,k_codcliente,k_codinforme FROM auditoria_inspecciones_ascensores WHERE o_revision = ? AND o_estado_envio = ?";
		tx.executeSql(query, ["Si","Enviada"], function (tx, resultSet) {
			for(var x = 0, i = 1; x < resultSet.rows.length; x++,i++) {
				cod_usuario = resultSet.rows.item(x).k_codusuario;
				cod_inspeccion = resultSet.rows.item(x).k_codinspeccion;
				consecutivoinsp = resultSet.rows.item(x).o_consecutivoinsp;
				estado_envio = resultSet.rows.item(x).o_estado_envio;
				revision = resultSet.rows.item(x).o_revision;
				cantidad_item_nocumple = resultSet.rows.item(x).v_item_nocumple;
				codcliente = resultSet.rows.item(x).k_codcliente;
				codinforme = resultSet.rows.item(x).k_codinforme;

				var arreglo_auditoria_ascensores = new Array();

		        arreglo_auditoria_ascensores.push(cod_usuario,cod_inspeccion);

				$("#select_inspeccion").append('<option value="'+arreglo_auditoria_ascensores+'">'+consecutivoinsp+'</option>');
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

function redireccionarListaInspeccion(select){
	var datos = $(select).val();
	var separar = datos.split(",");
	//alert(separar[1]);
	var cod_usuario = separar[0];
	var cod_inspeccion = separar[1];

	location.href="./ascensor_revision_lista_inspeccion.html?cod_usuario="+cod_usuario+"&id_inspeccion="+cod_inspeccion;	
}

