// Ayuda para los tests de estructura: lee el código del estudiante sin comentarios
const fs = require("node:fs");
const path = require("node:path");

function codigoSinComentarios(archivo) {
  const codigo = fs.readFileSync(path.join(__dirname, "..", "ejercicios", archivo), "utf8");
  return codigo.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
}

module.exports = { codigoSinComentarios };
