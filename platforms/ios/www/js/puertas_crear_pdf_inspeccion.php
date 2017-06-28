<?php
      ob_start(); //Linea para permitir enviar flujo de datos por url al redireccionar la pagina
      header("access-control-allow-origin: *");
      include ("conexion_BD.php");
      require_once("./dompdf/dompdf_config.inc.php");

      $codigo_inspector = $_POST['codigo_inspector'];
      $codigo_inspector_dispositivo = $_POST['codigo_inspector_dispositivo'];
      $codigo_inspeccion = $_POST['codigo_inspeccion'];
      $fecha_emision = $_POST['fecha_emision'];
      $mensaje_servidor = $_POST['servidor'];

      $contador_it_leve=0;
      $contador_it_grave=0;
      $contador_it_muy_grave=0;

      $bandera_sql = 0;
      
      /*=============================================
      * Consulta SQL a la tabla puertas_valores_iniciales
      *==============================================*/
      $sql = "SELECT * FROM puertas_valores_iniciales WHERE k_codusuario=".$codigo_inspector." AND k_codinspeccion=".$codigo_inspeccion."";
      $result = mysqli_query($con, $sql);
      while ($row=mysqli_fetch_array($result)) {
            $fecha_inspeccion = $row['f_fecha'];
            $consecutivo_inspeccion = $row['o_consecutivoinsp'];
            $tipo_informe = $row['o_tipo_informe'];
            $empresa_mto = $row['n_empresamto'];
            $ultimo_mto = $row['ultimo_mto'];
            $inicio_servicio = $row['inicio_servicio'];
            $ultima_inspeccion = $row['ultima_inspeccion'];
            $nombre_equipo = $row['n_equipo'];
            $accionamiento = $row['o_tipoaccion'];
            $capac_person = $row['v_capacperson'];
            $capac_peso = $row['v_capacpeso'];
            $num_paradas = $row['v_paradas'];
      }
      if (mysqli_query($con,$sql) == true){
            //echo "Consulta exitosa!";
            //$bandera_sql += 1;
      }else{
            //echo $con->error."\nerror: ". $sql . "<br>";
            $bandera_sql += 1;
      }
      
      /*=============================================
      * Consulta SQL a la tabla cliente - auditoria_inspecciones_puertas para obtener los datos del cliente relacionado a la inspeccion
      *==============================================*/
      $sql = "SELECT c.n_cliente nombre,c.n_contacto contacto,c.v_nit nit,c.o_direccion direccion,c.o_telefono telefono,c.n_encargado encargado from cliente c,auditoria_inspecciones_puertas a WHERE a.k_codcliente=c.k_codcliente AND a.k_codusuario=".$codigo_inspector." AND a.k_codinspeccion=".$codigo_inspeccion."";
      $result = mysqli_query($con, $sql);
      while ($row=mysqli_fetch_array($result)) {
            $nombre_cliente = $row['nombre'];
            $contacto_cliente = $row['contacto'];
            $nit_cliente = $row['nit'];
            $direccion_cliente = $row['direccion'];
            $telefono_cliente = $row['telefono'];
            $encargado_emp_mto = $row['encargado'];
      }
      if (mysqli_query($con,$sql) == true){
            //echo "Consulta exitosa!";
            //$bandera_sql += 1;
      }else{
            //echo $con->error."\nerror: ". $sql . "<br>";
            $bandera_sql += 1;
      }   

      /*=============================================
      * Consulta SQL a la tabla puertas_valores_finales para obtener la observacion final
      *==============================================*/
      $sql="SELECT puertas_valores_finales.o_observacion observacion FROM puertas_valores_finales WHERE puertas_valores_finales.k_codusuario=".$codigo_inspector." AND puertas_valores_finales.k_codinspeccion=".$codigo_inspeccion."";
      $result = mysqli_query($con, $sql);
      while ($row=mysqli_fetch_array($result)) {
            $observacion_final = $row['observacion'];
      }
      if (mysqli_query($con,$sql) == true){
            //echo "Consulta exitosa!";
            //$bandera_sql += 1;
      }else{
            //echo $con->error."\nerror: ". $sql . "<br>";
            $bandera_sql += 1;
      }

      /*========================================================================
      * Vamos a crear el PDF de la inspeccion para previamente enviarlo por correo
      *========================================================================*/
?>
<html lang="es">
      <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
            <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
            <style>
                  html{font-family:sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}
                  body{margin:0;}
                  table{border-spacing:0;border-collapse:collapse;font-size:11px;width: 100%;}td,th{padding:0}
                  .centrar_texto{text-align: center;}
                  .text-justify{text-align:justify}
                  .borde{border: 1px solid #000000; color: black;}
                  .border-left{border-left: 1px solid #000000; color: black;}
                  .border-right{border-right: 1px solid #000000; color: black;}
                  .border-top{border-top: 1px solid #000000; color: black;}
                  .border-bottom{border-bottom: 1px solid #000000; color: black;}
                  .imagen_X{background: url(../images/x.png) no-repeat center center;} /* ESTILO DE IMAGEN QUE SE MUESTRA EN LOS ITEM NOCUMPLE */
            </style>
      </head>

      <body>
            <table border="0">
                  <tr>
                        <td style="text-align: left; width: 50px; height: 100px;">
                              <img src="../images/banner.png" alt="M.P SAS" width="270px" style="height: 70px;">
                        </td>
                        <td class="centrar_texto" style="width: 220px;">
                              <?php
                                    if ($mensaje_servidor != "si") {
                                          echo "<b>INFORME DE INSPECCIÓN puertas EN SITIO</b><br>";
                                    }else{
                                          echo "<b>INFORME DE INSPECCIÓN FINAL DE puertas</b><br>";
                                    }
                              ?>
                              Registro del sistema Integrado de Gestión
                        </td>
                        <td class="centrar_texto">
                              <br>
                              <img src="../images/logo_onac.png" alt="ONAC" width="80px">
                        </td>
                        <td>
                              <table>
                                    <tr>
                                          <td>
                                                CÓDIGO
                                          </td>
                                          <td class="centrar_texto">
                                                <?php
                                                      if ($mensaje_servidor != "si") {
                                                            echo "IN-R-08";
                                                      }else{
                                                            echo "IN-R-01";
                                                      }
                                                ?>
                                          </td>
                                    </tr>
                                    <tr>
                                          <td>
                                                VERSIÓN
                                          </td>
                                          <td class="centrar_texto">
                                                <?php
                                                      if ($mensaje_servidor != "si") {
                                                            echo "01";
                                                      }else{
                                                            echo "02";
                                                      }
                                                ?>
                                          </td>
                                    </tr>
                                    <tr>
                                          <td>
                                                FECHA
                                          </td>
                                          <td class="centrar_texto">
                                                <?php
                                                      if ($mensaje_servidor != "si") {
                                                            echo "15/01/2015";
                                                      }else{
                                                            echo "15/04/2016";
                                                      }
                                                ?>
                                          </td>
                                    </tr>
                              </table>
                        </td>
                  </tr>
            </table>
            <br>
            <div class="border-top border-bottom border-left border-right">
                  <table border="0"> 
                        <tr>
                              <td class="border-top" style="height: 0.3%;"></td>
                        </tr>
                  </table>

                  <table border="0">
                        <tr>
                              <td colspan="4" bgcolor="#97ad93" class="centrar_texto border-top border-bottom border-left border-right">
                                    <b>ACTA DE INSPECCIÓN puertas</b>
                              </td>
                        </tr>
                        <tr>
                              <td class="border-left" style="width: 25%;">
                                    Fecha de Inspección:
                              </td>
                              <td class="centrar_texto border-left border-right" style="width: 25%;">
                                    <?php echo $fecha_inspeccion ?>
                              </td>
                              <td style="width: 25%;">
                                    Consecutivo:
                              </td>
                              <td class="centrar_texto border-left border-right" style="width: 25%;">
                                    <?php echo $consecutivo_inspeccion ?>
                              </td>
                        </tr>

                        <tr>
                              <td class="border-top border-left" style="width: 25%;">
                                    Emitido por:
                              </td>
                              <td class="centrar_texto border-top border-left border-right" style="width: 25%;">
                                    <?php
                                          if ($mensaje_servidor != "si") {
                                                $sql="SELECT * FROM usuarios WHERE k_codusuario=".$codigo_inspector_dispositivo."";
                                                $result = mysqli_query($con, $sql);
                                                while ($row=mysqli_fetch_array($result)) {
                                                      $nombre_inspector = strtoupper($row['n_nombre'])." ".strtoupper($row['n_apellido']);
                                                }
                                                echo $nombre_inspector;
                                          }else{
                                                echo "ING. ROBINSON CARDENAS";
                                          }
                                    ?>
                              </td>
                              <td class="border-top" style="width: 25%;">
                                    Fecha de emisión:
                              </td>
                              <td class="centrar_texto border-top border-left border-right" style="width: 25%;">
                                    <?php echo $fecha_emision ?>
                              </td>
                        </tr>
                  </table>
                  <table>
                        <tr>
                              <td class="border-top border-left" style="width: 25%;">
                                    Informe Inicial (X)
                              </td>
                              <td class="centrar_texto border-top border-left border-right" style="width: 8%;">
                                    <?php
                                          if ($tipo_informe == "Inicial") {
                                                echo "X";
                                          }
                                    ?>
                              </td>
                              <td class="border-top" style="width: 25%;">
                                    Informe Revisión (X)
                              </td>
                              <td class="centrar_texto border-top border-left border-right" style="width: 8%;">
                                    <?php
                                          if ($tipo_informe == "Revisión") {
                                                echo "X";
                                          }
                                    ?>
                              </td>
                              <td class="border-top" style="width: 25%;">
                                    Informe que modifica
                              </td>
                              <td class="centrar_texto border-top border-left border-right" style="width: 9%;">
                                    <?php
                                          if ($tipo_informe == "Modifica") {
                                                echo "X";
                                          }
                                    ?>
                              </td>
                        </tr>
                  </table>
                  <table>
                        <tr>
                              <td colspan="6" bgcolor="#97ad93" class="centrar_texto border-top border-bottom border-left border-right">
                                    <b>DATOS DEL CLIENTE</b>
                              </td>
                        </tr>

                        <tr>
                              <td class="border-left" colspan="2">
                                    Nombre del cliente o Razón Social
                              </td>
                              <td colspan="4" class="centrar_texto border-left border-right">
                                    <?php echo $nombre_cliente ?>
                              </td>
                        </tr>

                        <tr>
                              <td colspan="1" class="border-top border-left">
                                    Dirección
                              </td>
                              <td colspan="2" class="centrar_texto border-top border-left border-right">
                                    <?php echo $direccion_cliente ?>
                              </td>
                              <td colspan="1" class="border-top">
                                    Teléfono
                              </td>
                              <td colspan="2" class="centrar_texto border-top border-left border-right">
                                    <?php echo $telefono_cliente ?>
                              </td>
                        </tr>

                        <tr>
                              <td colspan="1" class="border-top border-left" style="width: 25%;">
                                    Contacto Representante Legal
                              </td>
                              <td colspan="2" class="centrar_texto border-top border-left border-right" style="width: 25%;">
                                    <?php echo $contacto_cliente ?>
                              </td>
                              <td colspan="1" class="border-top" style="width: 25%;">
                                    Nit o Documento de Identidad
                              </td>
                              <td colspan="2" class="centrar_texto border-top border-left border-right" style="width: 25%;">
                                    <?php echo $nit_cliente ?>
                              </td>
                        </tr>
                  </table>
                  <table>
                        <tr>
                              <td colspan="4" bgcolor="#97ad93" class="centrar_texto border-top border-bottom border-left border-right">
                                    <b>DATOS DE LA EMPRESA DE MANTENIMIENTO</b>
                              </td>
                        </tr>
                        <tr>
                              <td class="border-left" style="width: 25%;">
                                    Nombre o razón social
                              </td>
                              <td class="centrar_texto border-left border-right" style="width: 25%;">
                                    <?php echo $empresa_mto ?>
                              </td>
                              <td style="width: 25%;">
                                    Fecha de Último Mantenimiento
                              </td>
                              <td class="centrar_texto border-left border-right" style="width: 25%;">
                                    <?php echo $ultimo_mto ?>
                              </td>
                        </tr>
                  </table>
                  <table>
                        <tr>
                              <td colspan="4" bgcolor="#97ad93" class="centrar_texto border-top border-bottom border-left border-right">
                                    <b>DATOS DE LA INSTALACION</b>
                              </td>
                        </tr>
                        <tr>
                              <td class="border-left" style="width: 25%;">
                                    Fecha puesta en servicio
                              </td>
                              <td class="centrar_texto border-left border-right" style="width: 25%;">
                                    <?php echo $inicio_servicio ?>
                              </td>
                              <td style="width: 25%;">
                                    Fecha Última inspección
                              </td>
                              <td class="centrar_texto border-left border-right" style="width: 25%;">
                                    <?php echo $ultima_inspeccion ?>
                              </td>
                        </tr>
                  </table>
                  <table>
                        <tr>
                              <td colspan="2" bgcolor="#97ad93" class="centrar_texto border-top border-bottom border-left border-right">
                                    <b>CARACTERISTICAS TÉCNICAS</b>
                              </td>
                        </tr>

                        <tr>
                              <td class="border-left" style="width: 25%;">
                                    Identificación del equipo
                              </td>
                              <td class="centrar_texto border-left border-right">
                                    <strong><?php echo $nombre_equipo ?></strong>
                              </td>
                        </tr>
                  </table>
                  <table>
                        <tr>
                              <td class="border-top border-left" style="width: 25%;">
                                    Tipo de accionamiento
                              </td>
                              <td class="centrar_texto border-top border-left border-right" style="width: 35%;">
                                    <table>
                                          <tr>
                                                <?if ($accionamiento == "SCM") {?>
                                                      <td class="centrar_texto imagen_X" style="width: 33%;">SCM</td>
                                                      <td class="centrar_texto border-left border-right" style="width: 34%;">HIDRAULICO</td>
                                                      <td class="centrar_texto" style="width: 33%;">ELÉCTRICO</td>
                                                <?} elseif ($accionamiento == "Hidráulico") {?>
                                                      <td class="centrar_texto" style="width: 33%;">SCM</td>
                                                      <td class="centrar_texto border-left border-right imagen_X" style="width: 34%;">HIDRAULICO</td>
                                                      <td class="centrar_texto" style="width: 33%;">ELÉCTRICO</td>
                                                <?} elseif ($accionamiento == "Eléctrico") {?>
                                                      <td class="centrar_texto" style="width: 33%;">SCM</td>
                                                      <td class="centrar_texto border-left border-right" style="width: 34%;">HIDRAULICO</td>
                                                      <td class="centrar_texto imagen_X" style="width: 33%;">ELÉCTRICO</td>
                                                <?}?>
                                          </tr>
                                    </table>
                              </td>
                              <td class="border-top" style="width: 20%;">
                                    Capacidad de personas
                              </td>
                              <td class="centrar_texto border-top border-left border-right" style="width: 20%;">
                                    <?php echo $capac_person ?> PERSONAS
                              </td>
                        </tr>
                  </table>
                  <table>
                        <tr>
                              <td class="border-top border-left" style="width: 25%;">
                                    Capacidad (kg)
                              </td>
                              <td class="centrar_texto border-top border-left border-right" style="width: 25%;">
                                    <?php echo $capac_peso ?>kg
                              </td>
                              <td class="border-top" style="width: 25%;">
                                    Número de Paradas
                              </td>
                              <td class="centrar_texto border-top border-left border-right" style="width: 25%;">
                                    <?php echo $num_paradas ?>
                              </td>
                        </tr>
                  </table>

                  <table>
                        <tr>
                              <td colspan="3" bgcolor="#97ad93" class="centrar_texto border-top border-bottom border-left border-right">
                                    <b>LISTA DE VERIFICACIÓN</b>
                              </td>
                        </tr>

                        <tr>
                              <td class="centrar_texto border-top border-left border-right" style="width: 33%;">
                                    <b>Descripción del defecto</b>  
                              </td>
                              <td style="width: 33%;">
                                   <table>
                                          <tr>
                                                <td colspan="3" class="centrar_texto">
                                                      <b>CON DEFECTO</b>    
                                                </td>
                                          </tr>
                                          <tr>
                                                <td class="centrar_texto border-top" style="width: 11%;">
                                                      <b>Leve</b>
                                                </td>
                                                <td class="centrar_texto border-left border-top" style="width: 11%;">
                                                      <b>Grave</b>
                                                </td>
                                                <td class="centrar_texto border-top border-left" style="width: 11%;">
                                                      <b>Muy Grave</b>
                                                </td>
                                          </tr>
                                   </table> 
                              </td>
                              <td class="centrar_texto border-top border-left border-right" style="width: 34%;">
                                    <b>Observaciones</b>
                              </td>
                        </tr>
                  </table>                  
<?php
      /*=============================================
      * Consulta SQL a la tabla puertas_valores_cabina
      *==============================================*/
      for ($i=1; $i <= 35; $i++) {
            $sql="SELECT item.k_coditem_cabina numero_item,item.o_descripcion descripcion,valor.n_calificacion clasificacion,valor.v_calificacion calificacion,valor.o_observacion observacion FROM puertas_items_cabina item,puertas_valores_cabina valor WHERE valor.k_codusuario=".$codigo_inspector." AND valor.k_codinspeccion=".$codigo_inspeccion." AND valor.k_coditem_cabina=".$i." AND item.k_coditem_cabina=valor.k_coditem_cabina";
            $result = mysqli_query($con, $sql);
            while ($row=mysqli_fetch_array($result)) {
                  $numero_item = $row['numero_item'];
                  $descripcion = $row['descripcion'];
                  $clasificacion = $row['clasificacion'];
                  $calificacion = $row['calificacion'];
                  $observacion = $row['observacion'];
            }
            if (mysqli_query($con,$sql) == true){
                  //echo "Consulta exitosa!.";
                  if ($calificacion == "No Cumple") {
                        if ($clasificacion == "L") {
                              $contador_it_leve+=1;
                              $marcador_it_leve="X";
                              $marcador_it_grave="";
                              $marcador_it_muy_grave="";
                        } elseif ($clasificacion == "G") {
                              $contador_it_grave+=1;
                              $marcador_it_leve="";
                              $marcador_it_grave="X";
                              $marcador_it_muy_grave="";
                        } elseif ($clasificacion == "MG") {
                              $contador_it_muy_grave+=1;
                              $marcador_it_leve="";
                              $marcador_it_grave="";
                              $marcador_it_muy_grave="X";
                        }
?>
                        <table>
                              <tr>
                                    <td class="border-top border-bottom border-left" style="text-align: center; width: 4%;">
                                          <b><?php echo $numero_item; ?></b>
                                    </td>
                                    <td valign="top" class="text-justify border-top border-left border-right border-bottom" style="margin: 14px; padding: 15px; width: 29%;">
                                          <?php echo $descripcion ?>      
                                    </td>  
                                    <td class="centrar_texto border-top border-bottom" style="width: 11%;">
                                          <b><?php echo $marcador_it_leve; ?></b>
                                    </td>
                                    <td class="centrar_texto border-left border-top border-bottom" style="width: 11%;">
                                          <b><?php echo $marcador_it_grave; ?></b>
                                    </td>
                                    <td class="centrar_texto border-top border-left border-bottom" style="width: 11%;">
                                          <b><?php echo $marcador_it_muy_grave; ?></b>
                                    </td>
                                    <td valign="top" class="text-justify border-top border-left border-bottom border-right" style="width: 34%; margin: 14px; padding: 15px;">
                                          <?php echo $observacion; ?>
                                    </td>
                              </tr>
                        </table>
<?php
                  }
            }else{
                  //echo $con->error."\nerror: ". $sql . "<br>";
                  $bandera_sql += 1;
            }
      }                                
?>

<?php
      /*=============================================
      * Consulta SQL a la tabla puertas_valores_maquinas
      *==============================================*/
      for ($i=36; $i <= 82; $i++) {
            $sql="SELECT item.k_coditem_maquinas numero_item,item.o_descripcion descripcion,valor.n_calificacion clasificacion,valor.v_calificacion calificacion,valor.o_observacion observacion FROM puertas_items_maquinas item,puertas_valores_maquinas valor WHERE valor.k_codusuario=".$codigo_inspector." AND valor.k_codinspeccion=".$codigo_inspeccion." AND valor.k_coditem=".$i." AND item.k_coditem_maquinas=valor.k_coditem";
            $result = mysqli_query($con, $sql);
            while ($row=mysqli_fetch_array($result)) {
                  $numero_item = $row['numero_item'];
                  $descripcion = $row['descripcion'];
                  $clasificacion = $row['clasificacion'];
                  $calificacion = $row['calificacion'];
                  $observacion = $row['observacion'];
            }
            if (mysqli_query($con,$sql) == true){
                  //echo "Consulta exitosa!.";
                  if ($calificacion == "No Cumple") {
                        if ($clasificacion == "L") {
                              $contador_it_leve+=1;
                              $marcador_it_leve="X";
                              $marcador_it_grave="";
                              $marcador_it_muy_grave="";
                        } elseif ($clasificacion == "G") {
                              $contador_it_grave+=1;
                              $marcador_it_leve="";
                              $marcador_it_grave="X";
                              $marcador_it_muy_grave="";
                        } elseif ($clasificacion == "MG") {
                              $contador_it_muy_grave+=1;
                              $marcador_it_leve="";
                              $marcador_it_grave="";
                              $marcador_it_muy_grave="X";
                        }
?>
                        <table>
                              <tr>
                                    <td class="border-top border-bottom border-left" style="text-align: center; width: 4%;">
                                          <b><?php echo $numero_item; ?></b>
                                    </td>
                                    <td valign="top" class="text-justify border-top border-left border-right border-bottom" style="margin: 14px; padding: 15px; width: 29%;">
                                          <?php echo $descripcion ?>      
                                    </td>  
                                    <td class="centrar_texto border-top border-bottom" style="width: 11%;">
                                          <b><?php echo $marcador_it_leve; ?></b>
                                    </td>
                                    <td class="centrar_texto border-left border-top border-bottom" style="width: 11%;">
                                          <b><?php echo $marcador_it_grave; ?></b>
                                    </td>
                                    <td class="centrar_texto border-top border-left border-bottom" style="width: 11%;">
                                          <b><?php echo $marcador_it_muy_grave; ?></b>
                                    </td>
                                    <td valign="top" class="text-justify border-top border-left border-bottom border-right" style="width: 34%; margin: 14px; padding: 15px;">
                                          <?php echo $observacion; ?>
                                    </td>
                              </tr>
                        </table>
<?php
                  }
            }else{
                  //echo $con->error."\nerror: ". $sql . "<br>";
                  $bandera_sql += 1;
            }
      }                                
?>

<?php
      /*=============================================
      * Consulta SQL a la tabla puertas_valores_pozo
      *==============================================*/
      for ($i=83; $i <= 147; $i++) {
            $sql="SELECT item.k_coditem_pozo numero_item,item.o_descripcion descripcion,valor.n_calificacion clasificacion,valor.v_calificacion calificacion,valor.o_observacion observacion FROM puertas_items_pozo item,puertas_valores_pozo valor WHERE valor.k_codusuario=".$codigo_inspector." AND valor.k_codinspeccion=".$codigo_inspeccion." AND valor.k_coditem=".$i." AND item.k_coditem_pozo=valor.k_coditem";
            $result = mysqli_query($con, $sql);
            while ($row=mysqli_fetch_array($result)) {
                  $numero_item = $row['numero_item'];
                  $descripcion = $row['descripcion'];
                  $clasificacion = $row['clasificacion'];
                  $calificacion = $row['calificacion'];
                  $observacion = $row['observacion'];
            }
            if (mysqli_query($con,$sql) == true){
                  //echo "Consulta exitosa!.";
                  if ($calificacion == "No Cumple") {
                        if ($clasificacion == "L") {
                              $contador_it_leve+=1;
                              $marcador_it_leve="X";
                              $marcador_it_grave="";
                              $marcador_it_muy_grave="";
                        } elseif ($clasificacion == "G") {
                              $contador_it_grave+=1;
                              $marcador_it_leve="";
                              $marcador_it_grave="X";
                              $marcador_it_muy_grave="";
                        } elseif ($clasificacion == "MG") {
                              $contador_it_muy_grave+=1;
                              $marcador_it_leve="";
                              $marcador_it_grave="";
                              $marcador_it_muy_grave="X";
                        }
?>
                        <table>
                              <tr>
                                    <td class="border-top border-bottom border-left" style="text-align: center; width: 4%;">
                                          <b><?php echo $numero_item; ?></b>
                                    </td>
                                    <td valign="top" class="text-justify border-top border-left border-right border-bottom" style="margin: 14px; padding: 15px; width: 29%;">
                                          <?php echo $descripcion ?>      
                                    </td>  
                                    <td class="centrar_texto border-top border-bottom" style="width: 11%;">
                                          <b><?php echo $marcador_it_leve; ?></b>
                                    </td>
                                    <td class="centrar_texto border-left border-top border-bottom" style="width: 11%;">
                                          <b><?php echo $marcador_it_grave; ?></b>
                                    </td>
                                    <td class="centrar_texto border-top border-left border-bottom" style="width: 11%;">
                                          <b><?php echo $marcador_it_muy_grave; ?></b>
                                    </td>
                                    <td valign="top" class="text-justify border-top border-left border-bottom border-right" style="width: 34%; margin: 14px; padding: 15px;">
                                          <?php echo $observacion; ?>
                                    </td>
                              </tr>
                        </table>
<?php
                  }
            }else{
                  //echo $con->error."\nerror: ". $sql . "<br>";
                  $bandera_sql += 1;
            }
      }                                
?>

<?php
      /*=============================================
      * Consulta SQL a la tabla puertas_valores_foso
      *==============================================*/
      for ($i=148; $i <= 176; $i++) {
            $sql="SELECT item.k_coditem_foso numero_item,item.o_descripcion descripcion,valor.n_calificacion clasificacion,valor.v_calificacion calificacion,valor.o_observacion observacion FROM puertas_items_foso item,puertas_valores_foso valor WHERE valor.k_codusuario=".$codigo_inspector." AND valor.k_codinspeccion=".$codigo_inspeccion." AND valor.k_coditem=".$i." AND item.k_coditem_foso=valor.k_coditem";
            $result = mysqli_query($con, $sql);
            while ($row=mysqli_fetch_array($result)) {
                  $numero_item = $row['numero_item'];
                  $descripcion = $row['descripcion'];
                  $clasificacion = $row['clasificacion'];
                  $calificacion = $row['calificacion'];
                  $observacion = $row['observacion'];
            }
            if (mysqli_query($con,$sql) == true){
                  //echo "Consulta exitosa!.";
                  if ($calificacion == "No Cumple") {
                        if ($clasificacion == "L") {
                              $contador_it_leve+=1;
                              $marcador_it_leve="X";
                              $marcador_it_grave="";
                              $marcador_it_muy_grave="";
                        } elseif ($clasificacion == "G") {
                              $contador_it_grave+=1;
                              $marcador_it_leve="";
                              $marcador_it_grave="X";
                              $marcador_it_muy_grave="";
                        } elseif ($clasificacion == "MG") {
                              $contador_it_muy_grave+=1;
                              $marcador_it_leve="";
                              $marcador_it_grave="";
                              $marcador_it_muy_grave="X";
                        }
?>
                        <table>
                              <tr>
                                    <td class="border-top border-bottom border-left" style="text-align: center; width: 4%;">
                                          <b><?php echo $numero_item; ?></b>
                                    </td>
                                    <td valign="top" class="text-justify border-top border-left border-right border-bottom" style="margin: 14px; padding: 15px; width: 29%;">
                                          <?php echo $descripcion ?>      
                                    </td>  
                                    <td class="centrar_texto border-top border-bottom" style="width: 11%;">
                                          <b><?php echo $marcador_it_leve; ?></b>
                                    </td>
                                    <td class="centrar_texto border-left border-top border-bottom" style="width: 11%;">
                                          <b><?php echo $marcador_it_grave; ?></b>
                                    </td>
                                    <td class="centrar_texto border-top border-left border-bottom" style="width: 11%;">
                                          <b><?php echo $marcador_it_muy_grave; ?></b>
                                    </td>
                                    <td valign="top" class="text-justify border-top border-left border-bottom border-right" style="width: 34%; margin: 14px; padding: 15px;">
                                          <?php echo $observacion; ?>
                                    </td>
                              </tr>
                        </table>
<?php
                  }
            }else{
                  //echo $con->error."\nerror: ". $sql . "<br>";
                  $bandera_sql += 1;
            }
      }                                
?>
                  <table>
                        <tr>
                              <td class="border-right border-bottom border-left" style="width: 33%;">    
                              </td>  
                              <td class="centrar_texto border-bottom" style="width: 11%;">
                                    <b><?php echo $contador_it_leve; ?></b>
                              </td>
                              <td class="centrar_texto border-left border-bottom" style="width: 11%;">
                                    <b><?php echo $contador_it_grave; ?></b>
                              </td>
                              <td class="centrar_texto border-left border-bottom" style="width: 11%;">
                                    <b><?php echo $contador_it_muy_grave; ?></b>
                              </td>
                              <td class="border-left border-bottom border-right" style="width: 34%;">
                              </td>
                        </tr>
                  </table>

                  <table border="0">
                        <tr>
                              <td class="border-top border-bottom border-left border-right" colspan="2" bgcolor="#97ad93">
                                    <br>
                              </td>
                        </tr>
                        <tr>
                              <td class="border-top border-bottom border-left border-right" colspan="2">
                                    <b>OBSERVACIONES: </b>Se deben corregir los defectos en el tiempo estipulado por la norma NTC 5926-1:
                              </td>
                        </tr>
                        <tr>
                              <td class="border-top border-bottom border-left border-right" colspan="2" class="text-justify">
                                    Para defectos leves se debe corregir en un plazo no máximo a 180 días, graves un plazo no máximo de 30 días. En caso tal que el número de defectos leves supere 10 o más se considera esta situación como un defecto grave. <?php echo "<br><br>"; ?>
                              </td>                                            
                        </tr>
                        <tr>
                              <td class="border-top border-bottom border-left border-right" colspan="2" class="text-justify">
                                    <b>RESULTADO DE LA INSPECCIÓN: Se encontró <?php echo $contador_it_leve; ?> hallazgos leve, <?php echo $contador_it_grave; ?> grave y <?php echo $contador_it_muy_grave; ?> muy grave. NOTA: <?php echo $observacion_final ?>.</b> <?php echo "<br><br>"; ?>
                              </td>
                        </tr>
                        <tr>
                              <td class="border-top border-bottom border-left border-right" colspan="2" class="text-justify">
                                    Estos hallazgos deben estar completamente subsanados para la próxima inspección. Los defectos encontrados quedan bajo responsabilidad del administrador y/o propietario del equipo.<?php echo "<br><br>"; ?> 
                              </td>
                        </tr>
                        <tr>
                              <td class="border-top border-bottom border-left border-right" colspan="2">
                                    <b>CONFORMIDAD DEL CLIENTE:</b>
                              </td>
                        </tr>
                        <tr>
                              <td class="border-top border-bottom border-left border-right" colspan="2" class="text-justify">
                                    <br><br>
                              </td>
                        </tr>
                        <tr>
                              <td class="border-top border-right border-bottom border-left" style="padding: 6px;" bgcolor="#97ad93">
                                    <b>PROPIETARIO O ADMINISTRADOR DEL EQUIPO</b>
                              </td>
                              <td class="border-top border-bottom border-right" bgcolor="#97ad93" style="text-align: center;" style="padding: 6px;">
                                    <b>INSPECTOR DE MP</b>
                              </td>
                        </tr>
                        <tr>
                              <td class="border-top border-bottom border-right border-left" style="padding: 6px;">
                                    FIRMA
                              </td>
                              <td class="border-top border-bottom border-right" style="padding: 6px;">
                                    FIRMA
                              </td>
                        </tr>
                        <tr>
                              <td class="border-top border-bottom border-right border-left">
                                    NOMBRE <?php echo strtoupper($contacto_cliente) ?>
                              </td>
                              <td class="border-top border-bottom border-right">
                                    <?php
                                          if ($mensaje_servidor != "si") {
                                                $sql="SELECT * FROM usuarios WHERE k_codusuario=".$codigo_inspector_dispositivo."";
                                                $result = mysqli_query($con, $sql);
                                                while ($row=mysqli_fetch_array($result)) {
                                                      $nombre_inspector = strtoupper($row['n_nombre'])." ".strtoupper($row['n_apellido']);
                                                }
                                                echo "NOMBRE ".$nombre_inspector;
                                          }else{
                                                $sql="SELECT * FROM usuarios WHERE k_codusuario=".$codigo_inspector."";
                                                $result = mysqli_query($con, $sql);
                                                while ($row=mysqli_fetch_array($result)) {
                                                      $nombre_inspector = strtoupper($row['n_nombre'])." ".strtoupper($row['n_apellido']);
                                                }
                                                echo "NOMBRE ".$nombre_inspector;
                                          }
                                    ?>
                              </td>
                        </tr>
                        <tr>
                              <td class="border-top border-bottom border-right border-left" bgcolor="#97ad93" style="padding: 6px;">
                                    <b>EMPRESA DE MANTENIMIENTO</b>
                              </td>
                              <td class="border-top border-bottom border-right" bgcolor="#97ad93" style="text-align: center;" style="padding: 6px;">
                                    <b>EMISOR DE INFORME POR MP</b>
                              </td>
                        </tr>
                        <tr>
                              <td class="border-top border-bottom border-right border-left" style="padding: 6px;">
                                    FIRMA
                              </td>
                              <td class="border-top border-bottom border-right" style="padding: 6px;">
                                    FIRMA
                              </td>
                        </tr>
                        <tr>
                              <td class="border-top border-right border-left">
                                    NOMBRE <?php echo strtoupper($encargado_emp_mto) ?>
                              </td>
                              <td class="border-top border-right">
                                    NOMBRE ROBINSON CARDENAS
                              </td>
                        </tr>
                  </table>
            </div>
      </body>
</html>
<?php
      /*========================================================================
      * Vamos a exportar el PDF de la inspeccion para previamente enviarlo por correo
      * El PDF se crea capturando todo el html generado
      *========================================================================*/
      $dompdf = new DOMPDF();
      $dompdf ->set_paper("A4", "portrait");
      $dompdf -> load_html(ob_get_clean());
      $dompdf -> render();

      if ($mensaje_servidor != "si") {
            unlink("../puertas/inspector_".$codigo_inspector_dispositivo."/registros_pdf/".$consecutivo_inspeccion.".pdf");
            $file_to_save = "../puertas/inspector_".$codigo_inspector_dispositivo."/registros_pdf/".$consecutivo_inspeccion.".pdf";
      }else{
            $files = glob("../puertas/servidor/inspector_".$codigo_inspector."/registros_pdf/*"); // obtiene todos los archivos
            foreach($files as $file){
              if(is_file($file)) // si se trata de un archivo
              unlink($file); // lo elimina
            }
            $file_to_save = "../puertas/servidor/inspector_".$codigo_inspector."/registros_pdf/".$consecutivo_inspeccion.".pdf";
      }

      mkdir(dirname($file_to_save), 0777, true); //esta linea es para crear el directorio si no existe
      file_put_contents($file_to_save, $dompdf->output());
      
      echo $bandera_sql;
      ob_end_flush();
      //print_r($json_auditoria_puertas);
      //echo $fecha_emision;
?>