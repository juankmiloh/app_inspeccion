jQuery(document).ready(function($){
    /* CARGAR ITEMS EN LA LISTA DE INSPECCION */
    //alert("probando");
    cargarItemsEvaluacionPreliminar();
    cargarItemsProteccionPersonal();
    cargarItemsElementosDelInspector();
    cargarItemsMecanicos();
    cargarItemsElectrica();
    cargarItemsMotorizacion();
    cargarItemsOtras();
    cargarItemsManiobras();
});

/*=============================================
* Crear base de datos / Hacer conexion si ya esta creada
* parametros:
* var dbShell = window.openDatabase(database_name, database_version, database_displayname, database_size);
*==============================================*/
var db = window.openDatabase("montajes_inspeccion_mp", "1.0", "Inspeccion_MP", 1000000);

/* DATOS PARA CARGAR LA INSPECCION */
var cod_inspeccion = getQueryVariable('id_inspeccion');
var codigo_inspector = getQueryVariable("cod_usuario");

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

/*=============================================
* Funcion para hacer un select a la tabla puertas_items_preliminar y cargar los items en la lista
*==============================================*/
function cargarItemsEvaluacionPreliminar() {
    var valor_seleval = 1;
    var valor_for_options_radio = 1;
    var valor_options_radio = 1;
    db.transaction(function (tx) {
        var query = "SELECT k_coditem, o_descripcion FROM puertas_items_preliminar";
        tx.executeSql(query, [], function (tx, resultSet) {
            for(var x = 0; x < resultSet.rows.length; x++) {
                var numero_item = resultSet.rows.item(x).k_coditem;
                var descripcion_item = resultSet.rows.item(x).o_descripcion;
                var contenidoDiv = 
                '<div class="container-fluid">'+
                    '<input type="hidden" id="numero_item_preliminar'+numero_item+'" value="'+numero_item+'">'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                        '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: center; background-color: #5bc0de;">'+
                            '<label>ÍTEM</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                        '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: justify;">'+
                            '<p style="margin: 14px; padding: 15px; width: 88%;">'+descripcion_item+'</p>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid; text-align: center;">'+
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; background-color: #5bc0de; padding-left: 2%;">'+
                            '<label for="optionsRadiosPreliminar'+valor_for_options_radio+'">SI CUMPLE</label>'+
                        '</div>';
                        valor_for_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid; background-color: #5bc0de; padding-left: 2%;">'+
                            '<label for="optionsRadiosPreliminar'+valor_for_options_radio+'">NO CUMPLE</label>'+
                        '</div>';
                        valor_for_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid; background-color: #5bc0de; padding-left: 2%;">'+
                            '<label for="optionsRadiosPreliminar'+valor_for_options_radio+'">NO APLICA</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid; border-bottom:1px solid; text-align: center;">'+
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid;">'+
                            '<div class="radio">'+
                                '<label for="optionsRadiosPreliminar'+valor_options_radio+'" style="width: 100%;">'+
                                    '<input type="radio" name="seleval'+valor_seleval+'" id="optionsRadiosPreliminar'+valor_options_radio+'" value="Si Cumple">'+
                                '</label>'+
                            '</div>'+
                        '</div>';
                        valor_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid;">'+
                            '<div class="radio">'+
                                '<label for="optionsRadiosPreliminar'+valor_options_radio+'" style="width: 100%;">'+
                                    '<input type="radio" name="seleval'+valor_seleval+'" id="optionsRadiosPreliminar'+valor_options_radio+'" value="No Cumple" required>'+
                                '</label>'+
                            '</div>'+
                        '</div>';
                        valor_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid;">'+
                            '<div class="radio">'+
                                '<label for="optionsRadiosPreliminar'+valor_options_radio+'" style="width: 100%;">'+
                                    '<input type="radio" name="seleval'+valor_seleval+'" id="optionsRadiosPreliminar'+valor_options_radio+'" value="No Aplica">'+
                                '</label>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                        '<br>'+
                        '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: center; background-color: #5bc0de;">'+
                            '<label for="text_obser_item'+numero_item+'_eval_prel">OBSERVACIÓN</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-top:1px solid; border-left:1px solid; border-right:1px solid; border-bottom:1px solid;">'+
                        '<div class="col-xs-12 col-md-12">'+
                            '<br>'+
                            '<textarea class="form-control" rows="3" id="text_obser_item'+numero_item+'_eval_prel" name="text_obser_item'+numero_item+'_eval_prel" placeholder="Ingrese aquí la observación..."></textarea>'+
                            '<br>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                
                '<br>'+
                '<div class="divisionItems sombra"></div>'+
                '<br>';
                $(contenidoDiv).appendTo("#items_evaluacion_preliminar");
                valor_for_options_radio += 1;
                valor_options_radio += 1;
                valor_seleval += 1;
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
* Funcion para hacer un select a la tabla puertas_items_proteccion y cargar los items en la lista de inspeccion
*==============================================*/
function cargarItemsProteccionPersonal() {
    var valor_seleval = 1;
    var valor_for_options_radio = 1;
    var valor_options_radio = 1;
    db.transaction(function (tx) {
        var query = "SELECT k_coditem, o_descripcion FROM puertas_items_proteccion";
        tx.executeSql(query, [], function (tx, resultSet) {
            for(var x = 0; x < resultSet.rows.length; x++) {
                var numero_item = resultSet.rows.item(x).k_coditem;
                var descripcion_item = resultSet.rows.item(x).o_descripcion;
                var contenidoDiv = 
                '<div class="container-fluid">'+
                    '<div class="row" style="border:1px solid;">'+
                        '<div class="col-xs-12 col-sm-12 col-md-12" style="background-color: #5bc0de;">'+
                            '<input type="hidden" id="numero_item_proteccion'+numero_item+'" value="'+numero_item+'">'+
                            '<center><label>ÍTEM</label></center>'+
                        '</div>'+      

                        '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: center;">'+
                            '<br><label>'+descripcion_item+'</label><br><br>'+
                        '</div>'+

                        '<div class="col-xs-6 col-sm-6 col-md-6" style="border-top:1px solid; border-right:1px solid; border-bottom:1px solid;">'+
                            '<center>'+                            
                                '<div class="row">'+
                                    '<div class="col-xs-12 col-sm-12 col-md-12" style="background-color: #5bc0de;">'+
                                        '<label>INSPECTOR</label>'+
                                    '</div>'+
                                    '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; background-color: #9cd9eb;">'+
                                        '<label for="options_protec_person'+valor_for_options_radio+'">C</label>'+
                                    '</div>';
                                    valor_for_options_radio += 1;
                                    contenidoDiv +=
                                    '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid; background-color: #9cd9eb;">'+
                                        '<label for="options_protec_person'+valor_for_options_radio+'">NC</label>'+
                                    '</div>';
                                    valor_for_options_radio += 1;
                                    contenidoDiv +=
                                    '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid; background-color: #9cd9eb;">'+
                                        '<label for="options_protec_person'+valor_for_options_radio+'">N/A</label>'+
                                    '</div>'+
                                '</div>'+

                                '<div class="row">'+
                                    '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid;">'+
                                        '<label>'+
                                            '<input type="radio" name="sele_protec_person'+numero_item+'" id="options_protec_person'+valor_options_radio+'" value="Si Cumple" required>'+
                                        '</label>'+
                                    '</div>';
                                    valor_options_radio += 1;
                                    contenidoDiv +=
                                    '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid;">'+
                                        '<label>'+
                                            '<input type="radio" name="sele_protec_person'+numero_item+'" id="options_protec_person'+valor_options_radio+'" value="No Cumple" required>'+
                                        '</label>'+
                                    '</div>';
                                    valor_options_radio += 1;
                                    contenidoDiv +=
                                    '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid;">'+
                                        '<label>'+
                                            '<input type="radio" name="sele_protec_person'+numero_item+'" id="options_protec_person'+valor_options_radio+'" value="No Aplica" required>'+
                                        '</label>'+
                                    '</div>'+
                                '</div>'+
                            '</center>'+
                        '</div>'+

                        '<div class="col-xs-6 col-sm-6 col-md-6" style="border-top:1px solid; border-bottom:1px solid; border-left:1px solid;">'+
                            '<center>'+                           
                                '<div class="row">'+
                                    '<div class="col-xs-12 col-sm-12 col-md-12" style="background-color: #5bc0de;">'+
                                        '<label>EMPRESA MANTO</label>'+
                                    '</div>';
                                    valor_for_options_radio += 1;
                                    contenidoDiv +=
                                    '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; background-color: #9cd9eb;">'+
                                        '<label for="options_protec_person'+valor_for_options_radio+'">C</label>'+
                                    '</div>';
                                    valor_for_options_radio += 1;
                                    contenidoDiv +=
                                    '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid; background-color: #9cd9eb;">'+
                                        '<label for="options_protec_person'+valor_for_options_radio+'">NC</label>'+
                                    '</div>';
                                    valor_for_options_radio += 1;
                                    contenidoDiv +=
                                    '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid; background-color: #9cd9eb;">'+
                                        '<label for="options_protec_person'+valor_for_options_radio+'">N/A</label>'+
                                    '</div>'+
                                '</div>'+

                                '<div class="row">';
                                    valor_options_radio += 1;
                                    contenidoDiv +=
                                    '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid;">'+
                                        '<label>'+
                                            '<input type="radio" name="sele_protec_person'+numero_item+'_'+numero_item+'" id="options_protec_person'+valor_options_radio+'" value="Si Cumple" required>'+
                                        '</label>'+
                                    '</div>';
                                    valor_options_radio += 1;
                                    contenidoDiv +=
                                    '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid;">'+
                                        '<label>'+
                                            '<input type="radio" name="sele_protec_person'+numero_item+'_'+numero_item+'" id="options_protec_person'+valor_options_radio+'" value="No Cumple" required>'+
                                        '</label>'+
                                    '</div>';
                                    valor_options_radio += 1;
                                    contenidoDiv +=
                                    '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid;">'+
                                        '<label>'+
                                            '<input type="radio" name="sele_protec_person'+numero_item+'_'+numero_item+'" id="options_protec_person'+valor_options_radio+'" value="No Aplica" required>'+
                                        '</label>'+
                                    '</div>'+
                                '</div>'+
                            '</center>'+
                        '</div>'+

                        '<div class="col-xs-12 col-sm-12 col-md-12" style="text-align: center;">'+
                            '<hr>'+
                            '<center><label for="text_obser_protec_person'+numero_item+'">OBSERVACIONES</label></center>'+
                            '<center><textarea class="form-control" rows="3" id="text_obser_protec_person'+numero_item+'" name="text_obser_protec_person'+numero_item+'" placeholder="Ingrese aquí la observación..."></textarea></center>'+
                            '<br>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<br>'+
                '<div class="divisionItems sombra"></div>'+
                '<br>';
                $(contenidoDiv).appendTo("#items_elementos_proteccion_personal");
                valor_for_options_radio += 1;
                valor_options_radio += 1;
                valor_seleval += 1;
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
* Funcion para hacer un select a la tabla puertas_items_elementos y cargar los items en la lista de inspeccion
*==============================================*/
function cargarItemsElementosDelInspector() {
    var valor_seleval = 1;
    var valor_options_radio = 1;
    db.transaction(function (tx) {
        var query = "SELECT k_coditem, o_descripcion FROM puertas_items_elementos";
        tx.executeSql(query, [], function (tx, resultSet) {
            for(var x = 0; x < resultSet.rows.length; x++) {
                var numero_item = resultSet.rows.item(x).k_coditem;
                var descripcion_item = resultSet.rows.item(x).o_descripcion;
                var contenidoDiv = 
                '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; height: 7em;">'+
                    '<input type="hidden" id="numero_item_element_inspec'+numero_item+'" value="'+numero_item+'">'+
                    '<input type="hidden" id="descrip_item_element_inspec'+numero_item+'" value="'+descripcion_item+'">'+
                    '<label style="margin: 3%; padding: 3%;">'+descripcion_item+'</label>'+
                '</div>';
                $(contenidoDiv).appendTo("#items_elementos_del_inspector");

                var contenidoDiv_1 =
                '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; height: 7em;">'+
                    '<label for="options_element_inpec'+valor_options_radio+'" style="margin-top: 2.5em; width: 100%; height: 50%;">'+
                        '<input type="radio" name="sele_element_inspec'+valor_seleval+'" id="options_element_inpec'+valor_options_radio+'" value="Si Cumple" required>'+
                    '</label>'+
                '</div>';
                valor_options_radio += 1;
                contenidoDiv_1 +=
                '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid; height: 7em;">'+
                    '<label for="options_element_inpec'+valor_options_radio+'" style="margin-top: 2.5em; width: 100%; height: 50%;">'+
                        '<input type="radio" name="sele_element_inspec'+valor_seleval+'" id="options_element_inpec'+valor_options_radio+'" value="No Cumple" required>'+
                    '</label>'+
                '</div>';
                valor_options_radio += 1;
                contenidoDiv_1 +=
                '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid; height: 7em;">'+
                    '<label for="options_element_inpec'+valor_options_radio+'" style="margin-top: 2.5em; width: 100%; height: 50%;">'+
                        '<input type="radio" name="sele_element_inspec'+valor_seleval+'" id="options_element_inpec'+valor_options_radio+'" value="No Aplica" required>'+
                    '</label>'+
                '</div>';
                $(contenidoDiv_1).appendTo("#items_elementos_del_inspector_1");
                valor_options_radio += 1;
                valor_seleval += 1;
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
* Funcion para hacer un select a la tabla puertas_items_mecanicos y puertas_valores_mecanicos para poder cargar los items que no cumplen en la lista de revision
*==============================================*/
function cargarItemsMecanicos() {
    var valor_seleval = 1;
    var valor_for_options_radio = 1;
    var valor_options_radio = 1;
    var contador_items = 0; //contador que va aumentando si encuentra items a cargar sino se queda en cero
    db.transaction(function (tx) {
        var query = "SELECT k_coditem_puertas, o_descripcion, v_clasificacion FROM puertas_items_mecanicos i,puertas_valores_mecanicos v WHERE i.k_coditem_puertas=v.k_coditem AND v.k_codinspeccion=? AND v.k_codusuario=? AND v.v_calificacion='No Cumple'";
        tx.executeSql(query, [cod_inspeccion,codigo_inspector], function (tx, resultSet) {
            for(var x = 0; x < resultSet.rows.length; x++) {
                contador_items += 1;
                var numero_item = resultSet.rows.item(x).k_coditem_puertas;
                var descripcion_item = resultSet.rows.item(x).o_descripcion;
                var clasificacion_item = resultSet.rows.item(x).v_clasificacion;
                if (clasificacion_item == "Leve") {
                    clasificacion_item = "L";
                }
                if (clasificacion_item == "Grave") {
                    clasificacion_item = "G";
                }
                if (clasificacion_item == "Muy Grave") {
                    clasificacion_item = "MG";
                }
                var contenidoDiv = 
                '<div class="container-fluid">'+
                    '<input type="hidden" id="numero_item_mecanicos'+numero_item+'" value="'+numero_item+'">'+
                    '<input type="hidden" id="cal_item_mecanicos'+numero_item+'" value="'+clasificacion_item+'">'+
                    '<div class="row" style="border-left:1px solid; border-right:1px solid; text-align: center;">'+
                        '<div class="col-xs-6 col-sm-6 col-md-6" style="border-top:1px solid; background-color: #5bc0de;">'+
                            '<label>ÍTEM</label>'+
                        '</div>'+
                        '<div class="col-xs-6 col-sm-6 col-md-6" style="border-top:1px solid; border-left:1px solid; background-color: #5bc0de;">'+
                            '<label>CAL</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid; text-align: center;">'+
                        '<div class="col-xs-6 col-sm-6 col-md-6" style="border-top:1px solid;">'+
                            '<label>'+numero_item+'</label>'+
                        '</div>'+
                        '<div class="col-xs-6 col-sm-6 col-md-6" style="border-top:1px solid; border-left:1px solid;">'+
                            '<label>"'+clasificacion_item+'"</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                        '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: center; background-color: #5bc0de;">'+
                            '<label>DEFECTO</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                        '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: justify;">'+
                            '<p style="margin: 14px; padding: 15px; width: 88%;">'+descripcion_item+'</p>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid; text-align: center;">'+
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; background-color: #5bc0de; padding-left: 2%;">'+
                            '<label for="sele_lv_mecanicos'+valor_for_options_radio+'">SI CUMPLE</label>'+
                        '</div>';
                        valor_for_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid; background-color: #5bc0de; padding-left: 2%;">'+
                            '<label for="sele_lv_mecanicos'+valor_for_options_radio+'">NO CUMPLE</label>'+
                        '</div>';
                        valor_for_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid; background-color: #5bc0de; padding-left: 2%;">'+
                            '<label for="sele_lv_mecanicos'+valor_for_options_radio+'">NO APLICA</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid; text-align: center;">'+
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid;">'+
                            '<div class="radio">'+
                                '<label for="sele_lv_mecanicos'+valor_options_radio+'" style="width: 100%;">'+
                                    '<input type="radio" name="sele_mecanicos'+valor_seleval+'" id="sele_lv_mecanicos'+valor_options_radio+'" value="Si Cumple">'+
                                '</label>'+
                            '</div>'+
                        '</div>';
                        valor_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid;">'+
                            '<div class="radio">'+
                                '<label for="sele_lv_mecanicos'+valor_options_radio+'" style="width: 100%;">'+
                                    '<input type="radio" name="sele_mecanicos'+valor_seleval+'" id="sele_lv_mecanicos'+valor_options_radio+'" value="No Cumple" required>'+
                                '</label>'+
                            '</div>'+
                        '</div>';
                        valor_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid;">'+
                            '<div class="radio">'+
                                '<label for="sele_lv_mecanicos'+valor_options_radio+'" style="width: 100%;">'+
                                    '<input type="radio" name="sele_mecanicos'+valor_seleval+'" id="sele_lv_mecanicos'+valor_options_radio+'" value="No Aplica">'+
                                '</label>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                        '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: center; background-color: #5bc0de;">'+
                            '<label for="text_lv_valor_observacion_'+numero_item+'">OBSERVACIÓN</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-top:1px solid; border-left:1px solid; border-right:1px solid;">'+
                        '<div class="col-xs-12 col-md-12">'+
                            '<br>'+
                            '<textarea class="form-control" rows="3" id="text_lv_valor_observacion_'+numero_item+'" name="text_lv_valor_observacion_'+numero_item+'" placeholder="Ingrese aquí la observación..."></textarea>'+
                            '<br>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                        '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: center; background-color: #5bc0de;">'+
                            '<label for="botonIniciar'+numero_item+'">REGISTRO FOTOGRÁFICO</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-top:1px solid; border-left:1px solid; border-right:1px solid; border-bottom:1px solid; text-align: center;">'+
                        '<div class="col-xs-12 col-md-12">'+
                            '<br>'+
                            '<button type="button" id="botonIniciar'+numero_item+'" class="btn btn-success sombra boton_webcam" onclick="capturePhoto(this.id)">'+
                                '<span class="glyphicon glyphicon-camera"></span>'+
                                ' Iniciar Cámara'+
                            '</button>'+
                            '<br><br>'+                 
                        '</div>'+
                    '</div>'+
                '</div>'+
                
                '<br>'+
                '<div class="divisionItems sombra"></div>'+
                '<br>';
                $(contenidoDiv).appendTo("#items_mecanicos");
                valor_for_options_radio += 1;
                valor_options_radio += 1;
                valor_seleval += 1;
            }
            if (contador_items == 0) {
                //alert(contador_items);
                $('#div_mecanicos').hide();
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
* Funcion para hacer un select a la tabla puertas_items_electrica y cargar los items en la lista
*==============================================*/
function cargarItemsElectrica() {
    var valor_seleval = 38;
    var valor_for_options_radio = 1;
    var valor_options_radio = 1;
    var contador_items = 0; //contador que va aumentando si encuentra items a cargar sino se queda en cero
    db.transaction(function (tx) {
        var query = "SELECT k_coditem_electrica, o_descripcion, v_clasificacion FROM puertas_items_electrica i,puertas_valores_electrica v WHERE i.k_coditem_electrica=v.k_coditem AND v.k_codinspeccion=? AND v.k_codusuario=? AND v.v_calificacion='No Cumple'";
        tx.executeSql(query, [cod_inspeccion,codigo_inspector], function (tx, resultSet) {
            for(var x = 0; x < resultSet.rows.length; x++) {
                contador_items += 1;
                var numero_item = resultSet.rows.item(x).k_coditem_electrica;
                var valor_Item = resultSet.rows.item(x).v_item;
                var descripcion_item = resultSet.rows.item(x).o_descripcion;
                var clasificacion_item = resultSet.rows.item(x).v_clasificacion;
                if (clasificacion_item == "Leve") {
                    clasificacion_item = "L";
                }
                if (clasificacion_item == "Grave") {
                    clasificacion_item = "G";
                }
                if (clasificacion_item == "Muy Grave") {
                    clasificacion_item = "MG";
                }
                var contenidoDiv = 
                '<div class="container-fluid">'+
                    '<input type="hidden" id="numero_item_electrica'+numero_item+'" value="'+numero_item+'">'+
                    '<input type="hidden" id="cal_item_electrica'+numero_item+'" value="'+clasificacion_item+'">'+
                    '<div class="row" style="border-left:1px solid; border-right:1px solid; text-align: center;">'+
                        '<div class="col-xs-6 col-sm-6 col-md-6" style="border-top:1px solid; background-color: #5bc0de;">'+
                            '<label>ÍTEM</label>'+
                        '</div>'+
                        '<div class="col-xs-6 col-sm-6 col-md-6" style="border-top:1px solid; border-left:1px solid; background-color: #5bc0de;">'+
                            '<label>CAL</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid; text-align: center;">'+
                        '<div class="col-xs-6 col-sm-6 col-md-6" style="border-top:1px solid;">'+
                            '<label>'+numero_item+'</label>'+
                        '</div>'+
                        '<div class="col-xs-6 col-sm-6 col-md-6" style="border-top:1px solid; border-left:1px solid;">'+
                            '<label>"'+clasificacion_item+'"</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                        '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: center; background-color: #5bc0de;">'+
                            '<label>DEFECTO</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                        '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: justify;">'+
                            '<p style="margin: 14px; padding: 15px; width: 88%;">'+descripcion_item+'</p>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid; text-align: center;">'+
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; background-color: #5bc0de; padding-left: 2%;">'+
                            '<label for="sele_lv_electrica'+valor_for_options_radio+'">SI CUMPLE</label>'+
                        '</div>';
                        valor_for_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid; background-color: #5bc0de; padding-left: 2%;">'+
                            '<label for="sele_lv_electrica'+valor_for_options_radio+'">NO CUMPLE</label>'+
                        '</div>';
                        valor_for_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid; background-color: #5bc0de; padding-left: 2%;">'+
                            '<label for="sele_lv_electrica'+valor_for_options_radio+'">NO APLICA</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid; text-align: center;">'+
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid;">'+
                            '<div class="radio">'+
                                '<label for="sele_lv_electrica'+valor_options_radio+'" style="width: 100%;">'+
                                    '<input type="radio" name="sele_electrica'+valor_seleval+'" id="sele_lv_electrica'+valor_options_radio+'" value="Si Cumple">'+
                                '</label>'+
                            '</div>'+
                        '</div>';
                        valor_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid;">'+
                            '<div class="radio">'+
                                '<label for="sele_lv_electrica'+valor_options_radio+'" style="width: 100%;">'+
                                    '<input type="radio" name="sele_electrica'+valor_seleval+'" id="sele_lv_electrica'+valor_options_radio+'" value="No Cumple"  required>'+
                                '</label>'+
                            '</div>'+
                        '</div>';
                        valor_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid;">'+
                            '<div class="radio">'+
                                '<label for="sele_lv_electrica'+valor_options_radio+'" style="width: 100%;">'+
                                    '<input type="radio" name="sele_electrica'+valor_seleval+'" id="sele_lv_electrica'+valor_options_radio+'" value="No Aplica" >'+
                                '</label>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                        '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: center; background-color: #5bc0de;">'+
                            '<label for="text_electrica_observacion_'+numero_item+'">OBSERVACIÓN</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-top:1px solid; border-left:1px solid; border-right:1px solid;">'+
                        '<div class="col-xs-12 col-md-12">'+
                            '<br>'+
                            '<textarea class="form-control" rows="3" id="text_electrica_observacion_'+numero_item+'" name="text_electrica_observacion_'+numero_item+'" placeholder="Ingrese aquí la observación..."></textarea>'+
                            '<br>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                        '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: center; background-color: #5bc0de;">'+
                            '<label for="botonIniciar'+numero_item+'">REGISTRO FOTOGRÁFICO</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-top:1px solid; border-left:1px solid; border-right:1px solid; border-bottom:1px solid; text-align: center;">'+
                        '<div class="col-xs-12 col-md-12">'+
                            '<br>'+
                            '<button type="button" id="botonIniciar'+numero_item+'" class="btn btn-success sombra boton_webcam" onclick="capturePhoto(this.id)">'+
                                '<span class="glyphicon glyphicon-camera"></span>'+
                                ' Iniciar Cámara'+
                            '</button>'+
                            '<br><br>'+                 
                        '</div>'+
                    '</div>'+
                '</div>'+
                
                '<br>'+
                '<div class="divisionItems sombra"></div>'+
                '<br>';
                $(contenidoDiv).appendTo("#items_electrica");
                valor_for_options_radio += 1;
                valor_options_radio += 1;
                valor_seleval += 1;
            }
            if (contador_items == 0) {
                //alert(contador_items);
                $('#div_electrica').hide();
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
* Funcion para hacer un select a la tabla puertas_items_motorizacion y cargar los items en la lista
*==============================================*/
function cargarItemsMotorizacion() {
    var valor_seleval = 43;
    var valor_for_options_radio = 1;
    var valor_options_radio = 1;
    var contador_items = 0; //contador que va aumentando si encuentra items a cargar sino se queda en cero
    db.transaction(function (tx) {
        var query = "SELECT k_coditem_motorizacion, o_descripcion, v_clasificacion FROM puertas_items_motorizacion i,puertas_valores_motorizacion v WHERE i.k_coditem_motorizacion=v.k_coditem AND v.k_codinspeccion=? AND v.k_codusuario=? AND v.v_calificacion='No Cumple'";
        tx.executeSql(query, [cod_inspeccion,codigo_inspector], function (tx, resultSet) {
            for(var x = 0; x < resultSet.rows.length; x++) {
                contador_items += 1;
                var numero_item = resultSet.rows.item(x).k_coditem_motorizacion;
                var valor_Item = resultSet.rows.item(x).v_item;
                var descripcion_item = resultSet.rows.item(x).o_descripcion;
                var clasificacion_item = resultSet.rows.item(x).v_clasificacion;
                if (clasificacion_item == "Leve") {
                    clasificacion_item = "L";
                }
                if (clasificacion_item == "Grave") {
                    clasificacion_item = "G";
                }
                if (clasificacion_item == "Muy Grave") {
                    clasificacion_item = "MG";
                }
                var contenidoDiv = 
                '<div class="container-fluid">'+
                    '<input type="hidden" id="numero_item_motorizacion'+numero_item+'" value="'+numero_item+'">'+
                    '<input type="hidden" id="cal_item_motorizacion'+numero_item+'" value="'+clasificacion_item+'">'+
                    '<div class="row" style="border-left:1px solid; border-right:1px solid; text-align: center;">'+
                        '<div class="col-xs-6 col-sm-6 col-md-6" style="border-top:1px solid; background-color: #5bc0de;">'+
                            '<label>ÍTEM</label>'+
                        '</div>'+
                        '<div class="col-xs-6 col-sm-6 col-md-6" style="border-top:1px solid; border-left:1px solid; background-color: #5bc0de;">'+
                            '<label>CAL</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid; text-align: center;">'+
                        '<div class="col-xs-6 col-sm-6 col-md-6" style="border-top:1px solid;">'+
                            '<label>'+numero_item+'</label>'+
                        '</div>'+
                        '<div class="col-xs-6 col-sm-6 col-md-6" style="border-top:1px solid; border-left:1px solid;">'+
                            '<label>"'+clasificacion_item+'"</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                        '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: center; background-color: #5bc0de;">'+
                            '<label>DEFECTO</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                        '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: justify;">'+
                            '<p style="margin: 14px; padding: 15px; width: 88%;">'+descripcion_item+'</p>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid; text-align: center;">'+
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; background-color: #5bc0de; padding-left: 2%;">'+
                            '<label for="sele_lv_motorizacion'+valor_for_options_radio+'">SI CUMPLE</label>'+
                        '</div>';
                        valor_for_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid; background-color: #5bc0de; padding-left: 2%;">'+
                            '<label for="sele_lv_motorizacion'+valor_for_options_radio+'">NO CUMPLE</label>'+
                        '</div>';
                        valor_for_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid; background-color: #5bc0de; padding-left: 2%;">'+
                            '<label for="sele_lv_motorizacion'+valor_for_options_radio+'">NO APLICA</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid; text-align: center;">'+
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid;">'+
                            '<div class="radio">'+
                                '<label for="sele_lv_motorizacion'+valor_options_radio+'" style="width: 100%;">'+
                                    '<input type="radio" name="sele_motorizacion'+valor_seleval+'" id="sele_lv_motorizacion'+valor_options_radio+'" value="Si Cumple">'+
                                '</label>'+
                            '</div>'+
                        '</div>';
                        valor_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid;">'+
                            '<div class="radio">'+
                                '<label for="sele_lv_motorizacion'+valor_options_radio+'" style="width: 100%;">'+
                                    '<input type="radio" name="sele_motorizacion'+valor_seleval+'" id="sele_lv_motorizacion'+valor_options_radio+'" value="No Cumple"  required>'+
                                '</label>'+
                            '</div>'+
                        '</div>';
                        valor_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid;">'+
                            '<div class="radio">'+
                                '<label for="sele_lv_motorizacion'+valor_options_radio+'" style="width: 100%;">'+
                                    '<input type="radio" name="sele_motorizacion'+valor_seleval+'" id="sele_lv_motorizacion'+valor_options_radio+'" value="No Aplica" >'+
                                '</label>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                        '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: center; background-color: #5bc0de;">'+
                            '<label for="text_motorizacion_observacion_'+numero_item+'">OBSERVACIÓN</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-top:1px solid; border-left:1px solid; border-right:1px solid;">'+
                        '<div class="col-xs-12 col-md-12">'+
                            '<br>'+
                            '<textarea class="form-control" rows="3" id="text_motorizacion_observacion_'+numero_item+'" name="text_motorizacion_observacion_'+numero_item+'" placeholder="Ingrese aquí la observación..."></textarea>'+
                            '<br>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                        '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: center; background-color: #5bc0de;">'+
                            '<label for="botonIniciar'+numero_item+'">REGISTRO FOTOGRÁFICO</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-top:1px solid; border-left:1px solid; border-right:1px solid; border-bottom:1px solid; text-align: center;">'+
                        '<div class="col-xs-12 col-md-12">'+
                            '<br>'+
                            '<button type="button" id="botonIniciar'+numero_item+'" class="btn btn-success sombra boton_webcam" onclick="capturePhoto(this.id)">'+
                                '<span class="glyphicon glyphicon-camera"></span>'+
                                ' Iniciar Cámara'+
                            '</button>'+
                            '<br><br>'+                 
                        '</div>'+
                    '</div>'+
                '</div>'+
                
                '<br>'+
                '<div class="divisionItems sombra"></div>'+
                '<br>';
                $(contenidoDiv).appendTo("#items_motorizacion");
                valor_for_options_radio += 1;
                valor_options_radio += 1;
                valor_seleval += 1;
            }
            if (contador_items == 0) {
                //alert(contador_items);
                $('#div_motorizacion').hide();
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
* Funcion para hacer un select a la tabla puertas_items_otras y cargar los items en la lista
*==============================================*/
function cargarItemsOtras() {
    var valor_seleval = 55;
    var valor_for_options_radio = 1;
    var valor_options_radio = 1;
    var contador_items = 0; //contador que va aumentando si encuentra items a cargar sino se queda en cero
    db.transaction(function (tx) {
        var query = "SELECT k_coditem_otras, o_descripcion, v_clasificacion FROM puertas_items_otras i,puertas_valores_otras v WHERE i.k_coditem_otras=v.k_coditem AND v.k_codinspeccion=? AND v.k_codusuario=? AND v.v_calificacion='No Cumple'";
        tx.executeSql(query, [cod_inspeccion,codigo_inspector], function (tx, resultSet) {
            for(var x = 0; x < resultSet.rows.length; x++) {
                contador_items += 1;
                var numero_item = resultSet.rows.item(x).k_coditem_otras;
                var valor_Item = resultSet.rows.item(x).v_item;
                var descripcion_item = resultSet.rows.item(x).o_descripcion;
                var clasificacion_item = resultSet.rows.item(x).v_clasificacion;
                if (clasificacion_item == "Leve") {
                    clasificacion_item = "L";
                }
                if (clasificacion_item == "Grave") {
                    clasificacion_item = "G";
                }
                if (clasificacion_item == "Muy Grave") {
                    clasificacion_item = "MG";
                }
                var contenidoDiv = 
                '<div class="container-fluid">'+
                    '<input type="hidden" id="numero_item_otras'+numero_item+'" value="'+numero_item+'">'+
                    '<input type="hidden" id="cal_item_otras'+numero_item+'" value="'+clasificacion_item+'">'+
                    '<div class="row" style="border-left:1px solid; border-right:1px solid; text-align: center;">'+
                        '<div class="col-xs-6 col-sm-6 col-md-6" style="border-top:1px solid; background-color: #5bc0de;">'+
                            '<label>ÍTEM</label>'+
                        '</div>'+
                        '<div class="col-xs-6 col-sm-6 col-md-6" style="border-top:1px solid; border-left:1px solid; background-color: #5bc0de;">'+
                            '<label>CAL</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid; text-align: center;">';
                        if (numero_item == 55) {
                            contenidoDiv += 
                            '<div class="col-xs-6 col-sm-6 col-md-6" style="border-top:1px solid;">'+
                                '<br>'+
                                '<label>'+numero_item+'</label>'+
                                '<br>'+
                            '</div>'+
                            '<div class="col-xs-6 col-sm-6 col-md-6" style="border-top:1px solid; border-left:1px solid;">'+
                                '<label style="display: none;">"'+clasificacion_item+'"</label>'+
                                '<br>'+
                                '<select class="form-control" id="text_calificacion55" name="text_calificacion55" onchange="actualizarCalificacion(this)" required>'+
                                    '<option value="">Seleccione</option>'+
                                    '<option value="L">Leve</option>'+
                                    '<option value="G">Grave</option>'+
                                    '<option value="MG">Muy Grave</option>'+
                                '</select>'+
                                '<br>'+
                            '</div>';
                        }else{
                            contenidoDiv += 
                            '<div class="col-xs-6 col-sm-6 col-md-6" style="border-top:1px solid;">'+
                                '<label>'+numero_item+'</label>'+
                            '</div>'+
                            '<div class="col-xs-6 col-sm-6 col-md-6" style="border-top:1px solid; border-left:1px solid;">'+
                                '<label>"'+clasificacion_item+'"</label>'+
                            '</div>';
                        }
                    contenidoDiv +=
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                        '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: center; background-color: #5bc0de;">'+
                            '<label>DEFECTO</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                        '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: justify;">'+
                            '<p style="margin: 14px; padding: 15px; width: 88%;">'+descripcion_item+'</p>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid; text-align: center;">'+
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; background-color: #5bc0de; padding-left: 2%;">'+
                            '<label for="sele_lv_otras'+valor_for_options_radio+'">SI CUMPLE</label>'+
                        '</div>';
                        valor_for_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid; background-color: #5bc0de; padding-left: 2%;">'+
                            '<label for="sele_lv_otras'+valor_for_options_radio+'">NO CUMPLE</label>'+
                        '</div>';
                        valor_for_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid; background-color: #5bc0de; padding-left: 2%;">'+
                            '<label for="sele_lv_otras'+valor_for_options_radio+'">NO APLICA</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid; text-align: center;">'+
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid;">'+
                            '<div class="radio">'+
                                '<label for="sele_lv_otras'+valor_options_radio+'" style="width: 100%;">'+
                                    '<input type="radio" name="sele_otras'+valor_seleval+'" id="sele_lv_otras'+valor_options_radio+'" value="Si Cumple">'+
                                '</label>'+
                            '</div>'+
                        '</div>';
                        valor_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid;">'+
                            '<div class="radio">'+
                                '<label for="sele_lv_otras'+valor_options_radio+'" style="width: 100%;">'+
                                    '<input type="radio" name="sele_otras'+valor_seleval+'" id="sele_lv_otras'+valor_options_radio+'" value="No Cumple"  required>'+
                                '</label>'+
                            '</div>'+
                        '</div>';
                        valor_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid;">'+
                            '<div class="radio">'+
                                '<label for="sele_lv_otras'+valor_options_radio+'" style="width: 100%;">'+
                                    '<input type="radio" name="sele_otras'+valor_seleval+'" id="sele_lv_otras'+valor_options_radio+'" value="No Aplica" >'+
                                '</label>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                        '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: center; background-color: #5bc0de;">'+
                            '<label for="text_otras_observacion_'+numero_item+'">OBSERVACIÓN</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-top:1px solid; border-left:1px solid; border-right:1px solid;">'+
                        '<div class="col-xs-12 col-md-12">'+
                            '<br>'+
                            '<textarea class="form-control" rows="3" id="text_otras_observacion_'+numero_item+'" name="text_otras_observacion_'+numero_item+'" placeholder="Ingrese aquí la observación..."></textarea>'+
                            '<br>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                        '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: center; background-color: #5bc0de;">'+
                            '<label for="botonIniciar'+numero_item+'">REGISTRO FOTOGRÁFICO</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-top:1px solid; border-left:1px solid; border-right:1px solid; border-bottom:1px solid; text-align: center;">'+
                        '<div class="col-xs-12 col-md-12">'+
                            '<br>'+
                            '<button type="button" id="botonIniciar'+numero_item+'" class="btn btn-success sombra boton_webcam" onclick="capturePhoto(this.id)">'+
                                '<span class="glyphicon glyphicon-camera"></span>'+
                                ' Iniciar Cámara'+
                            '</button>'+
                            '<br><br>'+                 
                        '</div>'+
                    '</div>'+
                '</div>'+
                
                '<br>'+
                '<div class="divisionItems sombra"></div>'+
                '<br>';
                $(contenidoDiv).appendTo("#items_otras");
                valor_for_options_radio += 1;
                valor_options_radio += 1;
                valor_seleval += 1;
            }
            if (contador_items == 0) {
                //alert(contador_items);
                $('#div_otras').hide();
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

function actualizarCalificacion(select){
    var calificacion = $(select).val();
    $('#cal_item_otras55').val(calificacion);
}

/*=============================================
* Funcion para hacer un select a la tabla puertas_items_maniobras y cargar los items en la lista
*==============================================*/
function cargarItemsManiobras() {
    var valor_seleval = 76;
    var valor_for_options_radio = 1;
    var valor_options_radio = 1;
    var contador_items = 0; //contador que va aumentando si encuentra items a cargar sino se queda en cero
    db.transaction(function (tx) {
        var query = "SELECT k_coditem_maniobras, o_descripcion, v_clasificacion FROM puertas_items_maniobras i,puertas_valores_maniobras v WHERE i.k_coditem_maniobras=v.k_coditem AND v.k_codinspeccion=? AND v.k_codusuario=? AND v.v_calificacion='No Cumple'";
        tx.executeSql(query, [cod_inspeccion,codigo_inspector], function (tx, resultSet) {
            for(var x = 0; x < resultSet.rows.length; x++) {
                contador_items += 1;
                var numero_item = resultSet.rows.item(x).k_coditem_maniobras;
                var valor_Item = resultSet.rows.item(x).v_item;
                var descripcion_item = resultSet.rows.item(x).o_descripcion;
                var clasificacion_item = resultSet.rows.item(x).v_clasificacion;
                if (clasificacion_item == "Leve") {
                    clasificacion_item = "L";
                }
                if (clasificacion_item == "Grave") {
                    clasificacion_item = "G";
                }
                if (clasificacion_item == "Muy Grave") {
                    clasificacion_item = "MG";
                }
                var contenidoDiv = 
                '<div class="container-fluid">'+
                    '<input type="hidden" id="numero_item_maniobras'+numero_item+'" value="'+numero_item+'">'+
                    '<input type="hidden" id="cal_item_maniobras'+numero_item+'" value="'+clasificacion_item+'">'+
                    '<div class="row" style="border-left:1px solid; border-right:1px solid; text-align: center;">'+
                        '<div class="col-xs-6 col-sm-6 col-md-6" style="border-top:1px solid; background-color: #5bc0de;">'+
                            '<label>ÍTEM</label>'+
                        '</div>'+
                        '<div class="col-xs-6 col-sm-6 col-md-6" style="border-top:1px solid; border-left:1px solid; background-color: #5bc0de;">'+
                            '<label>CAL</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid; text-align: center;">'+
                        '<div class="col-xs-6 col-sm-6 col-md-6" style="border-top:1px solid;">'+
                            '<label>'+numero_item+'</label>'+
                        '</div>'+
                        '<div class="col-xs-6 col-sm-6 col-md-6" style="border-top:1px solid; border-left:1px solid;">'+
                            '<label>"'+clasificacion_item+'"</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                        '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: center; background-color: #5bc0de;">'+
                            '<label>DEFECTO</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                        '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: justify;">'+
                            '<p style="margin: 14px; padding: 15px; width: 88%;">'+descripcion_item+'</p>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid; text-align: center;">'+
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; background-color: #5bc0de; padding-left: 2%;">'+
                            '<label for="sele_lv_maniobras'+valor_for_options_radio+'">SI CUMPLE</label>'+
                        '</div>';
                        valor_for_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid; background-color: #5bc0de; padding-left: 2%;">'+
                            '<label for="sele_lv_maniobras'+valor_for_options_radio+'">NO CUMPLE</label>'+
                        '</div>';
                        valor_for_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid; background-color: #5bc0de; padding-left: 2%;">'+
                            '<label for="sele_lv_maniobras'+valor_for_options_radio+'">NO APLICA</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid; text-align: center;">'+
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid;">'+
                            '<div class="radio">'+
                                '<label for="sele_lv_maniobras'+valor_options_radio+'" style="width: 100%;">'+
                                    '<input type="radio" name="sele_maniobras'+valor_seleval+'" id="sele_lv_maniobras'+valor_options_radio+'" value="Si Cumple">'+
                                '</label>'+
                            '</div>'+
                        '</div>';
                        valor_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid;">'+
                            '<div class="radio">'+
                                '<label for="sele_lv_maniobras'+valor_options_radio+'" style="width: 100%;">'+
                                    '<input type="radio" name="sele_maniobras'+valor_seleval+'" id="sele_lv_maniobras'+valor_options_radio+'" value="No Cumple"  required>'+
                                '</label>'+
                            '</div>'+
                        '</div>';
                        valor_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid;">'+
                            '<div class="radio">'+
                                '<label for="sele_lv_maniobras'+valor_options_radio+'" style="width: 100%;">'+
                                    '<input type="radio" name="sele_maniobras'+valor_seleval+'" id="sele_lv_maniobras'+valor_options_radio+'" value="No Aplica" >'+
                                '</label>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                        '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: center; background-color: #5bc0de;">'+
                            '<label for="text_maniobras_observacion_'+numero_item+'">OBSERVACIÓN</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-top:1px solid; border-left:1px solid; border-right:1px solid;">'+
                        '<div class="col-xs-12 col-md-12">'+
                            '<br>'+
                            '<textarea class="form-control" rows="3" id="text_maniobras_observacion_'+numero_item+'" name="text_maniobras_observacion_'+numero_item+'" placeholder="Ingrese aquí la observación..."></textarea>'+
                            '<br>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                        '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: center; background-color: #5bc0de;">'+
                            '<label for="botonIniciar'+numero_item+'">REGISTRO FOTOGRÁFICO</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-top:1px solid; border-left:1px solid; border-right:1px solid; border-bottom:1px solid; text-align: center;">'+
                        '<div class="col-xs-12 col-md-12">'+
                            '<br>'+
                            '<button type="button" id="botonIniciar'+numero_item+'" class="btn btn-success sombra boton_webcam" onclick="capturePhoto(this.id)">'+
                                '<span class="glyphicon glyphicon-camera"></span>'+
                                ' Iniciar Cámara'+
                            '</button>'+
                            '<br><br>'+                 
                        '</div>'+
                    '</div>'+
                '</div>'+
                
                '<br>'+
                '<div class="divisionItems sombra"></div>'+
                '<br>';
                $(contenidoDiv).appendTo("#items_maniobras");
                valor_for_options_radio += 1;
                valor_options_radio += 1;
                valor_seleval += 1;
            }
            if (contador_items == 0) {
                //alert(contador_items);
                $('#div_maniobras').hide();
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
