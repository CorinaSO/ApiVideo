const pintarCanvas = () => {
  var c = document.getElementById("miCanvas");
  var cxt = c.getContext("2d");
  cxt.fillStyle = "rgba(76, 91, 175, 0.8)"; // Definimos el color para rellenar el rectangulo
  cxt.fillRect(0, 0, 600, 70); // Dibuja un rectangulo relleno - fillRect(x,y,width,height)
  cxt.font = "bold 20px Calibri, Arial"; // Fuente para el texto
  cxt.fillStyle = "rgba(10, 10, 3, 0.767)";
  cxt.fillText("REPRODUCCIÓN DE UN VÍDEO", 200, 40); // Texto relleno
};

const eliminar = (e) => {
  let v = document.getElementById("video");
  if (v != undefined) {
    v.remove();
    let b = document.getElementById("botones");
    if (b != undefined) {
      b.remove();
    }
  }
  let p = document.getElementById("error");
  p.innerHTML = "";
  let i = document.getElementById("file");
  i.value = "";
};

const seleccionArchivo = (e) => {
  let file = e.target.files;
  if (file[0].type != "video/mp4") {
    let p = document.getElementById("error");
    p.innerHTML =
      "El formato del elemento seleccionado no es válido, debe seleccionar un archivo tipo mp4";
    p.className = "rojo";
  } else {
    añadirVideo(file[0].name, file[0].type);
    añadirBotonesReproductor();
  }
};

const añadirVideo = (nombre, tipo) => {
  //Añadimos el video
  let r = document.getElementById("reproductor");
  let v = document.createElement("video");
  v.setAttribute("id", "video");
  v.setAttribute("poster", "imagenes/descarga.png");
  r.appendChild(v);

  //Añadimos el control de eventos al elemento video
  v.addEventListener("loadstart", () => {
    let p = document.getElementById("error");
    p.innerHTML = "Cargando el video";
    //Añadimos la clase loading para ver el gif mientras se carga el video
    let v = document.getElementById("video");
    v.className = "loading";
  });

  v.addEventListener("canplaythrough", () => {
    let p = document.getElementById("error");
    console.log("Se lanza el evento canplaythrough");
    p.innerHTML = "Ya puede reproducir el video de forma completa";
    //eliminamos el poster de video y la clase para que deje de verse el gif
    //una vez se puede reproducir el video
    let v = document.getElementById("video");
    v.removeAttribute("class");
    v.setAttribute("poster", "");
  });

  v.addEventListener("error", () => {
    let p = document.getElementById("error");
    p.innerHTML = "Se ha producido un error en la carga del video";
    p.className = "rojo";
  });

  r = document.getElementById("video");
  v = document.createElement("source");
  v.setAttribute("src", "./" + nombre);
  v.setAttribute("type", tipo);
  r.appendChild(v);

  //Añadimos el div donde irán los botones
  r = document.getElementById("reproductor");
  let d = document.createElement("div");
  d.setAttribute("id", "botones");
  r.appendChild(d);
};

const añadirBotonesReproductor = () => {
  let r = document.getElementById("botones");
  for (let i = 1; i < 5; i++) {
    let b = document.createElement("boton");
    b.className = "boton";
    b.setAttribute("id", "boton" + i.toString());
    switch (i) {
      case 1:
        b.innerHTML = "Reproducir";
        break;
      case 2:
        b.innerHTML = "Pausa";
        break;
      case 3:
        b.innerHTML = "Subir Volumen";
        break;
      case 4:
        b.innerHTML = "Bajar Volumen";
        break;
    }
    r.appendChild(b);
    b.addEventListener("click", function () {
      let v = document.getElementById("video");
      let currentVolume = v.volume;

      switch (this.getAttribute("id")) {
        case "boton1":
          v.play();
          break;
        case "boton2":
          v.pause();
          break;
        case "boton3":
          currentVolume = v.volume;
          if (currentVolume < 1) {
            v.volume += 0.1;
            v.muted = false;
          }
          break;
        case "boton4":
          if (currentVolume > 0 && currentVolume - 0.1 > 0) {
            v.volume -= 0.1;
          } else {
            if (currentVolume - 0.1 < 0) v.muted = true;
          }
          break;
      }
    });
  }
};
