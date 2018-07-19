var wrapper = document.getElementById("signature-pad");
var clearButton = wrapper.querySelector("[data-action=clear]");
var changeColorButton = wrapper.querySelector("[data-action=change-color]");
var undoButton = wrapper.querySelector("[data-action=undo]");
var savePNGButton = wrapper.querySelector("[data-action=save-png]");
var saveJPGButton = wrapper.querySelector("[data-action=save-jpg]");
var saveSVGButton = wrapper.querySelector("[data-action=save-svg]");
var canvas = wrapper.querySelector("canvas");
var signaturePad = new SignaturePad(canvas, {
  // It's Necessary to use an opaque color when saving image as JPEG;
  // this option can be omitted if only saving as PNG or SVG
  backgroundColor: 'rgb(255, 255, 255)'
});

/*=============================================
* Crear base de datos / Hacer conexion si ya esta creada
* parametros:
* var dbShell = window.openDatabase(database_name, database_version, database_displayname, database_size);
*==============================================*/
var db = window.openDatabase("montajes_inspeccion_mp", "1.0", "Inspeccion_MP", 1000000);

var pictureSource;   // picture source
var destinationType; // sets the format of returned value
var nomimage; // nombre de la imagen a guardar
var consecutivo;
var codigoItem;
var nombreImagen;
var nomArchivo;
var directorioImagen;

var codigoInspector = window.localStorage.getItem("codigo_inspector");

/* =================================================
* Wait for device API libraries to load
* ==================================================*/
document.addEventListener("deviceready",onDeviceReady,false);

/* =================================================
* device APIs are available
* ==================================================*/
function onDeviceReady() {
  pictureSource=navigator.camera.PictureSourceType;
  destinationType=navigator.camera.DestinationType;
}
  
// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
function resizeCanvas() {
  // When zoomed out to less than 100%, for some very strange reason,
  // some browsers report devicePixelRatio as less than 1
  // and only part of the canvas is cleared then.
  var ratio =  Math.max(window.devicePixelRatio || 1, 1);

  // This part causes the canvas to be cleared
  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  canvas.getContext("2d").scale(ratio, ratio);

  // This library does not listen for canvas changes, so after the canvas is automatically
  // cleared by the browser, SignaturePad#isEmpty might still return false, even though the
  // canvas looks empty, because the internal data of this library wasn't cleared. To make sure
  // that the state of this library is consistent with visual state of the canvas, you
  // have to clear it manually.
  signaturePad.clear();
}

// On mobile devices it might make more sense to listen to orientation change,
// rather than window resize events.
window.onresize = resizeCanvas;
resizeCanvas();

// function download(dataURL, filename) {
//   var blob = dataURLToBlob(dataURL);
//   var url = window.URL.createObjectURL(blob);

//   var a = document.createElement("a");
//   a.style = "display: none";
//   a.href = url;
//   a.download = filename;

//   document.body.appendChild(a);
//   a.click();

//   window.URL.revokeObjectURL(url);
// }

function download(dataURL, filename) {
  //nomimage=dataURL.substr(dataURL.lastIndexOf('/')+1); //nombre de la imagen
  
  var res = dataURL.split(",");
  var base64String = res[1];
  console.log(base64String);
  var params = {data: base64String, prefix: 'myPrefix_', format: 'JPG', quality: 80, mediaScanner: true};
  window.imageSaver.saveBase64Image(params,
      function (filePath) {
        //alert('File saved on ' + filePath);
        createFileEntryPhoto(filePath);
      },
      function (msg) {
        alert('Error download : '+msg);
      }
  );
}

/* =================================================
* Funcion que crea la foto
* ==================================================*/
function createFileEntryPhoto(imageURI) {
  window.resolveLocalFileSystemURI(imageURI, copyPhoto, fail);    
}

/* =================================================
* Funcion que permite guardar la foto en el dispositivo
* ==================================================*/
function copyPhoto(fileEntry) {
  consecutivo = window.sessionStorage.getItem("consecutivo_informe");
  var num_aleatorio = getRandomArbitrary(100,999999);
  nomArchivo = consecutivo+"_"+num_aleatorio+".jpg";

  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) { 
    fileSys.root.getDirectory("inspeccion_mp", {create: true, exclusive: false}, function(dir) { 
      dir.getDirectory("informes", { create: true }, function (subDirEntry) {
        subDirEntry.getDirectory("firmas", { create: true }, function (sub_subDirEntry) {
          directorio = sub_subDirEntry.fullPath; // Directorio donde queda guardada la imagen
          var str = directorio;
          directorioImagen = str.substring(0, 37);
          fileEntry.moveTo(sub_subDirEntry, nomArchivo, onCopySuccessPhoto, fail);
        }, fail); 
      }, fail);                    
    }, fail); 
  }, fail); 
}

/* =================================================
* Funcion que se ejecuta cuando se ha creado y copiado al dispositivo satisfactoriamente la foto
* ==================================================*/
function onCopySuccessPhoto(entry) {
  navigator.notification.alert("Todo salio bien la firma ha sido guardada!", null, "Montajes & Procesos M.P SAS", "Aceptar");
}

/* =================================================
* Funcion que se ejecuta si ocurre algun error al copiar la foto al dispositivo
* ==================================================*/
function fail(error) {
  alert("ERROR : "+error.code);
}  

// One could simply use Canvas#toBlob method instead, but it's just to show
// that it can be done using result of SignaturePad#toDataURL.
function dataURLToBlob(dataURL) {
  // Code taken from https://github.com/ebidel/filer.js
  var parts = dataURL.split(';base64,');
  var contentType = parts[0].split(":")[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;
  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}

clearButton.addEventListener("click", function (event) {
  signaturePad.clear();
});

undoButton.addEventListener("click", function (event) {
  var data = signaturePad.toData();

  if (data) {
    data.pop(); // remove the last dot or line
    signaturePad.fromData(data);
  }
});

changeColorButton.addEventListener("click", function (event) {
  var r = Math.round(Math.random() * 255);
  var g = Math.round(Math.random() * 255);
  var b = Math.round(Math.random() * 255);
  var color = "rgb(" + r + "," + g + "," + b +")";

  signaturePad.penColor = color;
});

savePNGButton.addEventListener("click", function (event) {
  if (signaturePad.isEmpty()) {
    alert("Please provide a signature first.");
  } else {
    var dataURL = signaturePad.toDataURL();
    download(dataURL, "signature.png");
  }
});

saveJPGButton.addEventListener("click", function (event) {
  if (signaturePad.isEmpty()) {
    alert("Please provide a signature first.");
  } else {
    var dataURL = signaturePad.toDataURL("image/jpeg");
    download(dataURL, "signature.jpg");
  }
});

saveSVGButton.addEventListener("click", function (event) {
  if (signaturePad.isEmpty()) {
    alert("Please provide a signature first.");
  } else {
    var dataURL = signaturePad.toDataURL('image/svg+xml');
    download(dataURL, "signature.svg");
  }
});
