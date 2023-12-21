function getUsuarios() {
  axios
    .get("http://localhost:8080/usuarios")
    .then(function (response) {
      if (Array.isArray(response.data)) {
        let listContent = response.data
          .map(
            (usuario) =>
              "<tr>" +
              "<td>" +
              usuario.id +
              "</td>" +
              "<td>" +
              usuario.nombre +
              "</td>" +
              "<td>" +
              usuario.correo +
              "</td>" +
              "<td>" +
              "<label onclick=borrarUsuarios(" +
              usuario.id +
              ")>Borrar Usuario</label>" +
              "</td>" +
              "</tr>"
          )
          .join("");
        document.getElementById("result").innerHTML =
          "<tr>" +
          "<th>ID</th>" +
          "<th>Nombre</th>" +
          "<th>Correo</th>" +
          "<th>Eliminar</th>" +
          "</tr>" +
          listContent;
      } else {
        document.getElementById("result").textContent =
          "Respuesta inesperada del servidor";
      }
    })
    .catch(function (error) {
      document.getElementById("result").textContent =
        "Error: " +
        (error.response && error.response.data ? error.response.data : error);
    })
    .finally(function () {});
}
function insertUsuarios() {
  // Capturar los valores del formulario
  var id = document.getElementById("id").value;
  var nombre = document.getElementById("nombre").value;
  var correo = document.getElementById("correo").value;
  var contrasena = document.getElementById("contraseña").value;
  axios
    .post("http://localhost:8080/insertUsuarios", {
      id: id,
      nombre: nombre,
      correo: correo,
      contrasena: contrasena,
    })
    .then(function (response) {
      // Actualiza esta parte según la respuesta esperada de tu backend
      getUsuarios();
      document.getElementById("mensajes").textContent =
        "Usuario agregado con exito";
    })
    .catch(function (error) {
      document.getElementById("mensajes").textContent =
        "Error: " +
        (error.response && error.response.data ? error.response.data : error);
    })
    .finally(function () {});
}

function borrarUsuarios(usuarioId) {
  axios
    .post("http://localhost:8080/borrarUsuarios", { usuarioId: usuarioId })
    .then(function (response) {
      getUsuarios();
      document.getElementById("mensajes").textContent =
        "Usuario eliminado con exito";
    })
    .catch(function (error) {
      document.getElementById("mensajes").textContent =
        "Error: " +
        (error.response && error.response.data ? error.response.data : error);
    })
    .finally(function () {});
}
