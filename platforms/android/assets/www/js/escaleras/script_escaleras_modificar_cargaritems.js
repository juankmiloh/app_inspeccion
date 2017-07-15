jQuery(document).ready(function($){
    /* CARGAR ITEMS EN LA LISTA DE INSPECCION */
    cargarItemsEvaluacionPreliminar();
    cargarItemsProteccionPersonal();
    cargarItemsElementosDelInspector();
    cargarItemsdefectos_1();
    cargarItemsdefectos_2();
    cargarItemsdefectos_3();
});

/*=============================================
* Crear base de datos / Hacer conexion si ya esta creada
* parametros:
* var dbShell = window.openDatabase(database_name, database_version, database_displayname, database_size);
*==============================================*/
var db = window.openDatabase("montajes_inspeccion_mp", "1.0", "Inspeccion_MP", 1000000);

/*=============================================
* Funcion para hacer un select a la tabla escaleras_items_preliminar y cargar los items en la lista
*==============================================*/
function cargarItemsEvaluacionPreliminar() {
    var valor_seleval = 1;
    var valor_for_options_radio = 1;
    var valor_options_radio = 1;
    db.transaction(function (tx) {
        var query = "SELECT k_coditem, o_descripcion FROM escaleras_items_preliminar";
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
* Funcion para hacer un select a la tabla escaleras_items_proteccion y cargar los items en la lista de inspeccion
*==============================================*/
function cargarItemsProteccionPersonal() {
    var valor_seleval = 1;
    var valor_for_options_radio = 1;
    var valor_options_radio = 1;
    db.transaction(function (tx) {
        var query = "SELECT k_coditem, o_descripcion FROM escaleras_items_proteccion";
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
* Funcion para hacer un select a la tabla escaleras_items_elementos y cargar los items en la lista de inspeccion
*==============================================*/
function cargarItemsElementosDelInspector() {
    var valor_seleval = 1;
    var valor_options_radio = 1;
    db.transaction(function (tx) {
        var query = "SELECT k_coditem, o_descripcion FROM escaleras_items_elementos";
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
* Funcion para hacer un select a la tabla escaleras_items_defectos y cargar los 31 PRIMEROS items en la lista
*==============================================*/
function cargarItemsdefectos_1() {
    var valor_seleval = 1;
    var valor_for_options_radio = 1;
    var valor_options_radio = 1;
    db.transaction(function (tx) {
        var query = "SELECT k_coditem_escaleras, o_descripcion, v_clasificacion FROM escaleras_items_defectos";
        tx.executeSql(query, [], function (tx, resultSet) {
            for(var x = 0; x < 31; x++) {
                var numero_item = resultSet.rows.item(x).k_coditem_escaleras;
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
                    '<input type="hidden" id="numero_item_defectos'+numero_item+'" value="'+numero_item+'">'+
                    '<input type="hidden" id="cal_item_defectos'+numero_item+'" value="'+clasificacion_item+'">'+
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
                    '</div>';

                    if (numero_item == 14) {
                        contenidoDiv +=
                        '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                            '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: justify;">'+
                                '<ul id="lightgallery_14" class="list-unstyled row">'+
                                    '<li class="col-xs-12 col-sm-12 col-md-12" data-responsive="../../figuras_escaleras/figura2.png 375, ../../figuras_escaleras/figura2.png 480, ../../figuras_escaleras/figura2.png 800" data-src="../../figuras_escaleras/figura2.png" data-sub-html="<h4>Figura 2</h4>" data-pinterest-text="Pin it1" data-tweet-text="share on twitter 1" style="display: block;">'+
                                        '<p style="margin: 14px; padding: 15px; width: 88%;">'+descripcion_item+' '+
                                            '<a href="" style="color: #d9534f;">'+
                                                '<span class="glyphicon glyphicon-picture"></span>'+
                                                '(Ver Figuras)'+
                                                '<img class="img-responsive" src="../../figuras_escaleras/figura2.png" alt="Thumb-1" style="width: 2em; display: none;">'+
                                            '</a>'+
                                       '</p>'+
                                    '</li>'+
                                    '<li class="col-xs-6 col-sm-4 col-md-3" data-responsive="../../figuras_escaleras/figura5.png 375, ../../figuras_escaleras/figura5.png 480, ../../figuras_escaleras/figura5.png 800" data-src="../../figuras_escaleras/figura5.png" data-sub-html="<h4>Figura 5</h4>" data-pinterest-text="Pin it1" data-tweet-text="share on twitter 1" style="display: none;">'+
                                        '<a href="">'+
                                            '<img class="img-responsive" src="../../figuras_escaleras/figura5.png" alt="Thumb-2">'+
                                        '</a>'+
                                    '</li>'+
                                    '<li class="col-xs-6 col-sm-4 col-md-3" data-responsive="../../figuras_escaleras/figura6.png 375, ../../figuras_escaleras/figura6.png 480, ../../figuras_escaleras/figura6.png 800" data-src="../../figuras_escaleras/figura6.png" data-sub-html="<h4>Figura 6</h4>" data-pinterest-text="Pin it1" data-tweet-text="share on twitter 1" style="display: none;">'+
                                        '<a href="">'+
                                            '<img class="img-responsive" src="../../figuras_escaleras/figura6.png" alt="Thumb-3">'+
                                        '</a>'+
                                    '</li>'+
                                '</ul>'+
                            '</div>'+
                        '</div>'+
                        '<script>'+
                            'lightGallery(document.getElementById("lightgallery_14"));'+
                        '</script>';
                    }else if (numero_item == 29) {
                        contenidoDiv +=
                        '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                            '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: justify;">'+
                                '<p style="margin: 14px; padding: 15px; width: 88%;">'+descripcion_item+'</p>'+
                                '<center>'+
                                    '<table border="1">'+
                                        '<tr style="background-color: #5bc0de; text-align:center;">'+
                                            '<td>'+
                                                '<b>A la velocidad nominal v de</b>'+
                                            '</td>'+
                                            '<td>'+
                                                '<b>Distancia de frenado comprendida entre</b>'+
                                            '</td>'+
                                        '</tr>'+
                                        '<tr style="text-align: center;">'+
                                            '<td>'+
                                                '0,50 m/s'+
                                            '</td>'+
                                            '<td>'+
                                                '0,20 m y 1,00 m'+
                                            '</td>'+
                                        '</tr>'+
                                        '<tr style="text-align: center;">'+
                                            '<td>'+
                                                '0,65 m/s'+
                                            '</td>'+
                                            '<td>'+
                                                '0,30 m y 1,30 m'+
                                            '</td>'+
                                        '</tr>'+
                                        '<tr style="text-align: center;">'+
                                            '<td>'+
                                                '0,75 m/s'+
                                            '</td>'+
                                            '<td>'+
                                                '0,40 m y 1,50 m'+
                                            '</td>'+
                                        '</tr>'+
                                    '</table>'+
                                '</center>'+
                                '<br>'+
                            '</div>'+
                        '</div>';
                    }else if (numero_item == 30) {
                        contenidoDiv +=
                        '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                            '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: justify;">'+
                                '<p style="margin: 14px; padding: 15px; width: 88%;">'+descripcion_item+'</p>'+
                                '<center>'+
                                    '<table border="1">'+
                                        '<tr style="background-color: #5bc0de; text-align:center;">'+
                                            '<td>'+
                                                '<b>A la velocidad nominal v de</b>'+
                                            '</td>'+
                                            '<td>'+
                                                '<b>Distancia de frenado comprendida entre</b>'+
                                            '</td>'+
                                        '</tr>'+
                                        '<tr style="text-align: center;">'+
                                            '<td>'+
                                                '0,50 m/s'+
                                            '</td>'+
                                            '<td>'+
                                                '0,20 m y 1,00 m'+
                                            '</td>'+
                                        '</tr>'+
                                        '<tr style="text-align: center;">'+
                                            '<td>'+
                                                '0,65 m/s'+
                                            '</td>'+
                                            '<td>'+
                                                '0,30 m y 1,30 m'+
                                            '</td>'+
                                        '</tr>'+
                                        '<tr style="text-align: center;">'+
                                            '<td>'+
                                                '0,75 m/s'+
                                            '</td>'+
                                            '<td>'+
                                                '0,40 m y 1,50 m'+
                                            '</td>'+
                                        '</tr>'+
                                        '<tr style="text-align: center;">'+
                                            '<td>'+
                                                '0,90 m/s'+
                                            '</td>'+
                                            '<td>'+
                                                '0,55 m y 1,70 m'+
                                            '</td>'+
                                        '</tr>'+
                                    '</table>'+
                                '</center>'+
                                '<br>'+
                            '</div>'+
                        '</div>';
                    }else{
                        contenidoDiv +=
                        '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                            '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: justify;">'+
                                '<p style="margin: 14px; padding: 15px; width: 88%;">'+descripcion_item+'</p>'+
                            '</div>'+
                        '</div>';
                    }

                    contenidoDiv +=
                    '<div class="row" style="border-left:1px solid; border-right:1px solid; text-align: center;">'+
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; background-color: #5bc0de; padding-left: 2%;">'+
                            '<label for="sele_lv_defectos'+valor_for_options_radio+'">SI CUMPLE</label>'+
                        '</div>';
                        valor_for_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid; background-color: #5bc0de; padding-left: 2%;">'+
                            '<label for="sele_lv_defectos'+valor_for_options_radio+'">NO CUMPLE</label>'+
                        '</div>';
                        valor_for_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid; background-color: #5bc0de; padding-left: 2%;">'+
                            '<label for="sele_lv_defectos'+valor_for_options_radio+'">NO APLICA</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid; text-align: center;">'+
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid;">'+
                            '<div class="radio">'+
                                '<label for="sele_lv_defectos'+valor_options_radio+'" style="width: 100%;">'+
                                    '<input type="radio" name="sele_defectos'+valor_seleval+'" id="sele_lv_defectos'+valor_options_radio+'" value="Si Cumple">'+
                                '</label>'+
                            '</div>'+
                        '</div>';
                        valor_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid;">'+
                            '<div class="radio">'+
                                '<label for="sele_lv_defectos'+valor_options_radio+'" style="width: 100%;">'+
                                    '<input type="radio" name="sele_defectos'+valor_seleval+'" id="sele_lv_defectos'+valor_options_radio+'" value="No Cumple" required>'+
                                '</label>'+
                            '</div>'+
                        '</div>';
                        valor_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid;">'+
                            '<div class="radio">'+
                                '<label for="sele_lv_defectos'+valor_options_radio+'" style="width: 100%;">'+
                                    '<input type="radio" name="sele_defectos'+valor_seleval+'" id="sele_lv_defectos'+valor_options_radio+'" value="No Aplica">'+
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
                $(contenidoDiv).appendTo("#items_defectos_1");
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
* Funcion para hacer un select a la tabla escaleras_items_defectos y cargar los 31 segundos items en la lista
*==============================================*/
function cargarItemsdefectos_2() {
    var valor_seleval = 32;
    var valor_for_options_radio = 94;
    var valor_options_radio = 94;
    db.transaction(function (tx) {
        var query = "SELECT k_coditem_escaleras, o_descripcion, v_clasificacion FROM escaleras_items_defectos";
        tx.executeSql(query, [], function (tx, resultSet) {
            for(var x = 31; x < 62; x++) {
                var numero_item = resultSet.rows.item(x).k_coditem_escaleras;
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
                    '<input type="hidden" id="numero_item_defectos'+numero_item+'" value="'+numero_item+'">'+
                    '<input type="hidden" id="cal_item_defectos'+numero_item+'" value="'+clasificacion_item+'">'+
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
                    '</div>';

                    if (numero_item == 32) {
                        contenidoDiv +=
                        '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                            '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: justify;">'+
                                '<ul id="lightgallery_32" class="list-unstyled row">'+
                                    '<li class="col-xs-12 col-sm-12 col-md-12" data-responsive="../../figuras_escaleras/figura6.png 375, ../../figuras_escaleras/figura6.png 480, ../../figuras_escaleras/figura6.png 800" data-src="../../figuras_escaleras/figura6.png" data-sub-html="<h4>Figura 6</h4>" data-pinterest-text="Pin it1" data-tweet-text="share on twitter 1" style="display: block;">'+
                                        '<p style="margin: 14px; padding: 15px; width: 88%;">'+descripcion_item+' '+
                                            '<a href="" style="color: #d9534f;">'+
                                                '<span class="glyphicon glyphicon-picture"></span>'+
                                                '(Ver Figura)'+
                                                '<img class="img-responsive" src="../../figuras_escaleras/figura6.png" alt="Thumb-1" style="width: 2em; display: none;">'+
                                            '</a>'+
                                       '</p>'+
                                    '</li>'+
                                '</ul>'+
                            '</div>'+
                        '</div>'+
                        '<script>'+
                            'lightGallery(document.getElementById("lightgallery_32"));'+
                        '</script>';
                    }else if (numero_item == 37) {
                        contenidoDiv +=
                        '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                            '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: justify;">'+
                                '<ul id="lightgallery_37" class="list-unstyled row">'+
                                    '<li class="col-xs-12 col-sm-12 col-md-12" data-responsive="../../figuras_escaleras/figura2.png 375, ../../figuras_escaleras/figura2.png 480, ../../figuras_escaleras/figura2.png 800" data-src="../../figuras_escaleras/figura2.png" data-sub-html="<h4>Figura 2</h4>" data-pinterest-text="Pin it1" data-tweet-text="share on twitter 1" style="display: block;">'+
                                        '<p style="margin: 14px; padding: 15px; width: 88%;">'+descripcion_item+' '+
                                            '<a href="" style="color: #d9534f;">'+
                                                '<span class="glyphicon glyphicon-picture"></span>'+
                                                '(Ver Figuras)'+
                                                '<img class="img-responsive" src="../../figuras_escaleras/figura2.png" alt="Thumb-1" style="width: 2em; display: none;">'+
                                            '</a>'+
                                       '</p>'+
                                    '</li>'+
                                    '<li class="col-xs-6 col-sm-4 col-md-3" data-responsive="../../figuras_escaleras/figura3.png 375, ../../figuras_escaleras/figura3.png 480, ../../figuras_escaleras/figura3.png 800" data-src="../../figuras_escaleras/figura3.png" data-sub-html="<h4>Figura 3</h4>" data-pinterest-text="Pin it1" data-tweet-text="share on twitter 1" style="display: none;">'+
                                        '<a href="">'+
                                            '<img class="img-responsive" src="../../figuras_escaleras/figura3.png" alt="Thumb-2">'+
                                        '</a>'+
                                    '</li>'+
                                '</ul>'+
                            '</div>'+
                        '</div>'+
                        '<script>'+
                            'lightGallery(document.getElementById("lightgallery_37"));'+
                        '</script>';
                    }else if (numero_item == 44) {
                        contenidoDiv +=
                        '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                            '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: justify;">'+
                                '<ul id="lightgallery_44" class="list-unstyled row">'+
                                    '<li class="col-xs-12 col-sm-12 col-md-12" data-responsive="../../figuras_escaleras/figura3.png 375, ../../figuras_escaleras/figura3.png 480, ../../figuras_escaleras/figura3.png 800" data-src="../../figuras_escaleras/figura3.png" data-sub-html="<h4>Figura 3</h4>" data-pinterest-text="Pin it1" data-tweet-text="share on twitter 1" style="display: block;">'+
                                        '<p style="margin: 14px; padding: 15px; width: 88%;">'+descripcion_item+' '+
                                            '<a href="" style="color: #d9534f;">'+
                                                '<span class="glyphicon glyphicon-picture"></span>'+
                                                '(Ver Figura)'+
                                                '<img class="img-responsive" src="../../figuras_escaleras/figura3.png" alt="Thumb-1" style="width: 2em; display: none;">'+
                                            '</a>'+
                                       '</p>'+
                                    '</li>'+
                                '</ul>'+
                            '</div>'+
                        '</div>'+
                        '<script>'+
                            'lightGallery(document.getElementById("lightgallery_44"));'+
                        '</script>';
                    }else if (numero_item == 50) {
                        contenidoDiv +=
                        '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                            '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: justify;">'+
                                '<ul id="lightgallery_50" class="list-unstyled row">'+
                                    '<li class="col-xs-12 col-sm-12 col-md-12" data-responsive="../../figuras_escaleras/figura3.png 375, ../../figuras_escaleras/figura3.png 480, ../../figuras_escaleras/figura3.png 800" data-src="../../figuras_escaleras/figura3.png" data-sub-html="<h4>Figura 3</h4>" data-pinterest-text="Pin it1" data-tweet-text="share on twitter 1" style="display: block;">'+
                                        '<p style="margin: 14px; padding: 15px; width: 88%;">'+descripcion_item+' '+
                                            '<a href="" style="color: #d9534f;">'+
                                                '<span class="glyphicon glyphicon-picture"></span>'+
                                                '(Ver Figura)'+
                                                '<img class="img-responsive" src="../../figuras_escaleras/figura3.png" alt="Thumb-1" style="width: 2em; display: none;">'+
                                            '</a>'+
                                       '</p>'+
                                    '</li>'+
                                '</ul>'+
                            '</div>'+
                        '</div>'+
                        '<script>'+
                            'lightGallery(document.getElementById("lightgallery_50"));'+
                        '</script>';
                    }else if (numero_item == 59) {
                        contenidoDiv +=
                        '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                            '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: justify;">'+
                                '<ul id="lightgallery_59" class="list-unstyled row">'+
                                    '<li class="col-xs-12 col-sm-12 col-md-12" data-responsive="../../figuras_escaleras/figura2.png 375, ../../figuras_escaleras/figura2.png 480, ../../figuras_escaleras/figura2.png 800" data-src="../../figuras_escaleras/figura2.png" data-sub-html="<h4>Figura 2</h4>" data-pinterest-text="Pin it1" data-tweet-text="share on twitter 1" style="display: block;">'+
                                        '<p style="margin: 14px; padding: 15px; width: 88%;">'+descripcion_item+' '+
                                            '<a href="" style="color: #d9534f;">'+
                                                '<span class="glyphicon glyphicon-picture"></span>'+
                                                '(Ver Figura)'+
                                                '<img class="img-responsive" src="../../figuras_escaleras/figura2.png" alt="Thumb-1" style="width: 2em; display: none;">'+
                                            '</a>'+
                                       '</p>'+
                                    '</li>'+
                                '</ul>'+
                            '</div>'+
                        '</div>'+
                        '<script>'+
                            'lightGallery(document.getElementById("lightgallery_59"));'+
                        '</script>';
                    }else{
                        contenidoDiv +=
                        '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                            '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: justify;">'+
                                '<p style="margin: 14px; padding: 15px; width: 88%;">'+descripcion_item+'</p>'+
                            '</div>'+
                        '</div>';
                    }

                    contenidoDiv +=
                    '<div class="row" style="border-left:1px solid; border-right:1px solid; text-align: center;">'+
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; background-color: #5bc0de; padding-left: 2%;">'+
                            '<label for="sele_lv_defectos'+valor_for_options_radio+'">SI CUMPLE</label>'+
                        '</div>';
                        valor_for_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid; background-color: #5bc0de; padding-left: 2%;">'+
                            '<label for="sele_lv_defectos'+valor_for_options_radio+'">NO CUMPLE</label>'+
                        '</div>';
                        valor_for_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid; background-color: #5bc0de; padding-left: 2%;">'+
                            '<label for="sele_lv_defectos'+valor_for_options_radio+'">NO APLICA</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid; text-align: center;">'+
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid;">'+
                            '<div class="radio">'+
                                '<label for="sele_lv_defectos'+valor_options_radio+'" style="width: 100%;">'+
                                    '<input type="radio" name="sele_defectos'+valor_seleval+'" id="sele_lv_defectos'+valor_options_radio+'" value="Si Cumple">'+
                                '</label>'+
                            '</div>'+
                        '</div>';
                        valor_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid;">'+
                            '<div class="radio">'+
                                '<label for="sele_lv_defectos'+valor_options_radio+'" style="width: 100%;">'+
                                    '<input type="radio" name="sele_defectos'+valor_seleval+'" id="sele_lv_defectos'+valor_options_radio+'" value="No Cumple" required>'+
                                '</label>'+
                            '</div>'+
                        '</div>';
                        valor_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid;">'+
                            '<div class="radio">'+
                                '<label for="sele_lv_defectos'+valor_options_radio+'" style="width: 100%;">'+
                                    '<input type="radio" name="sele_defectos'+valor_seleval+'" id="sele_lv_defectos'+valor_options_radio+'" value="No Aplica">'+
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
                $(contenidoDiv).appendTo("#items_defectos_2");
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
* Funcion para hacer un select a la tabla escaleras_items_defectos y cargar los 31 ultimos items en la lista
*==============================================*/
function cargarItemsdefectos_3() {
    var valor_seleval = 63;
    var valor_for_options_radio = 187;
    var valor_options_radio = 187;
    db.transaction(function (tx) {
        var query = "SELECT k_coditem_escaleras, o_descripcion, v_clasificacion FROM escaleras_items_defectos";
        tx.executeSql(query, [], function (tx, resultSet) {
            for(var x = 62; x < resultSet.rows.length; x++) {
                var numero_item = resultSet.rows.item(x).k_coditem_escaleras;
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
                    '<input type="hidden" id="numero_item_defectos'+numero_item+'" value="'+numero_item+'">'+
                    '<input type="hidden" id="cal_item_defectos'+numero_item+'" value="'+clasificacion_item+'">'+
                    '<div class="row" style="border-left:1px solid; border-right:1px solid; text-align: center;">'+
                        '<div class="col-xs-6 col-sm-6 col-md-6" style="border-top:1px solid; background-color: #5bc0de;">'+
                            '<label>ÍTEM</label>'+
                        '</div>'+
                        '<div class="col-xs-6 col-sm-6 col-md-6" style="border-top:1px solid; border-left:1px solid; background-color: #5bc0de;">'+
                            '<label>CAL</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid; text-align: center;">';
                        if (numero_item == 77) {
                            contenidoDiv += 
                            '<div class="col-xs-6 col-sm-6 col-md-6" style="border-top:1px solid; id="div_item77"">'+
                                '<br>'+
                                '<label>'+numero_item+'</label>'+
                                '<br>'+
                            '</div>'+
                            '<div class="col-xs-6 col-sm-6 col-md-6" style="border-top:1px solid; border-left:1px solid;">'+
                                '<label style="display: none;">"'+clasificacion_item+'"</label>'+
                                '<br>'+
                                '<select class="form-control" id="text_calificacion77" name="text_calificacion77" onchange="actualizarCalificacion(this)" required>'+
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
                    '</div>';

                    if (numero_item == 79) {
                        contenidoDiv +=
                        '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                            '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: justify;">'+
                                '<ul id="lightgallery_79" class="list-unstyled row">'+
                                    '<li class="col-xs-12 col-sm-12 col-md-12" data-responsive="../../figuras_escaleras/figura2.png 375, ../../figuras_escaleras/figura2.png 480, ../../figuras_escaleras/figura2.png 800" data-src="../../figuras_escaleras/figura2.png" data-sub-html="<h4>Figura 2</h4>" data-pinterest-text="Pin it1" data-tweet-text="share on twitter 1" style="display: block;">'+
                                        '<p style="margin: 14px; padding: 15px; width: 88%;">'+descripcion_item+' '+
                                            '<a href="" style="color: #d9534f;">'+
                                                '<span class="glyphicon glyphicon-picture"></span>'+
                                                '(Ver Figuras)'+
                                                '<img class="img-responsive" src="../../figuras_escaleras/figura2.png" alt="Thumb-1" style="width: 2em; display: none;">'+
                                            '</a>'+
                                       '</p>'+
                                    '</li>'+
                                    '<li class="col-xs-6 col-sm-4 col-md-3" data-responsive="../../figuras_escaleras/figura8.png 375, ../../figuras_escaleras/figura8.png 480, ../../figuras_escaleras/figura8.png 800" data-src="../../figuras_escaleras/figura8.png" data-sub-html="<h4>Figura 8</h4>" data-pinterest-text="Pin it1" data-tweet-text="share on twitter 1" style="display: none;">'+
                                        '<a href="">'+
                                            '<img class="img-responsive" src="../../figuras_escaleras/figura8.png" alt="Thumb-2">'+
                                        '</a>'+
                                    '</li>'+
                                '</ul>'+
                            '</div>'+
                        '</div>'+
                        '<script>'+
                            'lightGallery(document.getElementById("lightgallery_79"));'+
                        '</script>';
                    }else if (numero_item == 80) {
                        contenidoDiv +=
                        '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                            '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: justify;">'+
                                '<ul id="lightgallery_80" class="list-unstyled row">'+
                                    '<li class="col-xs-12 col-sm-12 col-md-12" data-responsive="../../figuras_escaleras/figura3.png 375, ../../figuras_escaleras/figura3.png 480, ../../figuras_escaleras/figura3.png 800" data-src="../../figuras_escaleras/figura3.png" data-sub-html="<h4>Figura 3</h4>" data-pinterest-text="Pin it1" data-tweet-text="share on twitter 1" style="display: block;">'+
                                        '<p style="margin: 14px; padding: 15px; width: 88%;">'+descripcion_item+' '+
                                            '<a href="" style="color: #d9534f;">'+
                                                '<span class="glyphicon glyphicon-picture"></span>'+
                                                '(Ver Figuras)'+
                                                '<img class="img-responsive" src="../../figuras_escaleras/figura3.png" alt="Thumb-1" style="width: 2em; display: none;">'+
                                            '</a>'+
                                       '</p>'+
                                    '</li>'+
                                    '<li class="col-xs-6 col-sm-4 col-md-3" data-responsive="../../figuras_escaleras/figura7.png 375, ../../figuras_escaleras/figura7.png 480, ../../figuras_escaleras/figura7.png 800" data-src="../../figuras_escaleras/figura7.png" data-sub-html="<h4>Figura 7</h4>" data-pinterest-text="Pin it1" data-tweet-text="share on twitter 1" style="display: none;">'+
                                        '<a href="">'+
                                            '<img class="img-responsive" src="../../figuras_escaleras/figura7.png" alt="Thumb-2">'+
                                        '</a>'+
                                    '</li>'+
                                '</ul>'+
                            '</div>'+
                        '</div>'+
                        '<script>'+
                            'lightGallery(document.getElementById("lightgallery_80"));'+
                        '</script>';
                    }else if (numero_item == 81) {
                        contenidoDiv +=
                        '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                            '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: justify;">'+
                                '<ul id="lightgallery_81" class="list-unstyled row">'+
                                    '<li class="col-xs-12 col-sm-12 col-md-12" data-responsive="../../figuras_escaleras/figura2.png 375, ../../figuras_escaleras/figura2.png 480, ../../figuras_escaleras/figura2.png 800" data-src="../../figuras_escaleras/figura2.png" data-sub-html="<h4>Figura 2</h4>" data-pinterest-text="Pin it1" data-tweet-text="share on twitter 1" style="display: block;">'+
                                        '<p style="margin: 14px; padding: 15px; width: 88%;">'+descripcion_item+' '+
                                            '<a href="" style="color: #d9534f;">'+
                                                '<span class="glyphicon glyphicon-picture"></span>'+
                                                '(Ver Figuras)'+
                                                '<img class="img-responsive" src="../../figuras_escaleras/figura2.png" alt="Thumb-1" style="width: 2em; display: none;">'+
                                            '</a>'+
                                       '</p>'+
                                    '</li>'+
                                    '<li class="col-xs-6 col-sm-4 col-md-3" data-responsive="../../figuras_escaleras/figura4.png 375, ../../figuras_escaleras/figura4.png 480, ../../figuras_escaleras/figura4.png 800" data-src="../../figuras_escaleras/figura4.png" data-sub-html="<h4>Figura 4</h4>" data-pinterest-text="Pin it1" data-tweet-text="share on twitter 1" style="display: none;">'+
                                        '<a href="">'+
                                            '<img class="img-responsive" src="../../figuras_escaleras/figura4.png" alt="Thumb-2">'+
                                        '</a>'+
                                    '</li>'+
                                    '<li class="col-xs-6 col-sm-4 col-md-3" data-responsive="../../figuras_escaleras/figura7.png 375, ../../figuras_escaleras/figura7.png 480, ../../figuras_escaleras/figura7.png 800" data-src="../../figuras_escaleras/figura7.png" data-sub-html="<h4>Figura 7</h4>" data-pinterest-text="Pin it1" data-tweet-text="share on twitter 1" style="display: none;">'+
                                        '<a href="">'+
                                            '<img class="img-responsive" src="../../figuras_escaleras/figura7.png" alt="Thumb-3">'+
                                        '</a>'+
                                    '</li>'+
                                '</ul>'+
                            '</div>'+
                        '</div>'+
                        '<script>'+
                            'lightGallery(document.getElementById("lightgallery_81"));'+
                        '</script>';
                    }else if (numero_item == 85) {
                        contenidoDiv +=
                        '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                            '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: justify;">'+
                                '<ul id="lightgallery_85" class="list-unstyled row">'+
                                    '<li class="col-xs-12 col-sm-12 col-md-12" data-responsive="../../figuras_escaleras/figura9.png 375, ../../figuras_escaleras/figura9.png 480, ../../figuras_escaleras/figura9.png 800" data-src="../../figuras_escaleras/figura9.png" data-sub-html="<h4>Figura 9</h4>" data-pinterest-text="Pin it1" data-tweet-text="share on twitter 1" style="display: block;">'+
                                        '<p style="margin: 14px; padding: 15px; width: 88%;">'+descripcion_item+' '+
                                            '<a href="" style="color: #d9534f;">'+
                                                '<span class="glyphicon glyphicon-picture"></span>'+
                                                '(Ver Figura)'+
                                                '<img class="img-responsive" src="../../figuras_escaleras/figura9.png" alt="Thumb-1" style="width: 2em; display: none;">'+
                                            '</a>'+
                                       '</p>'+
                                    '</li>'+
                                '</ul>'+
                            '</div>'+
                        '</div>'+
                        '<script>'+
                            'lightGallery(document.getElementById("lightgallery_85"));'+
                        '</script>';
                    }else{
                        contenidoDiv +=
                        '<div class="row" style="border-left:1px solid; border-right:1px solid;">'+
                            '<div class="col-xs-12 col-sm-12 col-md-12" style="border-top:1px solid; text-align: justify;">'+
                                '<p style="margin: 14px; padding: 15px; width: 88%;">'+descripcion_item+'</p>'+
                            '</div>'+
                        '</div>';
                    }

                    contenidoDiv +=
                    '<div class="row" style="border-left:1px solid; border-right:1px solid; text-align: center;">'+
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; background-color: #5bc0de; padding-left: 2%;">'+
                            '<label for="sele_lv_defectos'+valor_for_options_radio+'">SI CUMPLE</label>'+
                        '</div>';
                        valor_for_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid; background-color: #5bc0de; padding-left: 2%;">'+
                            '<label for="sele_lv_defectos'+valor_for_options_radio+'">NO CUMPLE</label>'+
                        '</div>';
                        valor_for_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid; background-color: #5bc0de; padding-left: 2%;">'+
                            '<label for="sele_lv_defectos'+valor_for_options_radio+'">NO APLICA</label>'+
                        '</div>'+
                    '</div>'+

                    '<div class="row" style="border-left:1px solid; border-right:1px solid; text-align: center;">'+
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid;">'+
                            '<div class="radio">'+
                                '<label for="sele_lv_defectos'+valor_options_radio+'" style="width: 100%;">'+
                                    '<input type="radio" name="sele_defectos'+valor_seleval+'" id="sele_lv_defectos'+valor_options_radio+'" value="Si Cumple">'+
                                '</label>'+
                            '</div>'+
                        '</div>';
                        valor_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid;">'+
                            '<div class="radio">'+
                                '<label for="sele_lv_defectos'+valor_options_radio+'" style="width: 100%;">'+
                                    '<input type="radio" name="sele_defectos'+valor_seleval+'" id="sele_lv_defectos'+valor_options_radio+'" value="No Cumple" required>'+
                                '</label>'+
                            '</div>'+
                        '</div>';
                        valor_options_radio += 1;
                        contenidoDiv +=
                        '<div class="col-xs-4 col-sm-4 col-md-4" style="border-top:1px solid; border-left:1px solid;">'+
                            '<div class="radio">'+
                                '<label for="sele_lv_defectos'+valor_options_radio+'" style="width: 100%;">'+
                                    '<input type="radio" name="sele_defectos'+valor_seleval+'" id="sele_lv_defectos'+valor_options_radio+'" value="No Aplica">'+
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
                $(contenidoDiv).appendTo("#items_defectos_3");
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

function actualizarCalificacion(select){
    var calificacion = $(select).val();
    $('#cal_item_defectos77').val(calificacion);
}