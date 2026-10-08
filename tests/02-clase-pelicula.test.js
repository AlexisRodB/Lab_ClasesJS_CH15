const test = require("node:test");
const assert = require("node:assert/strict");
const { Pelicula } = require("../ejercicios/02-clase-pelicula");

test("el constructor guarda título y duración", () => {
  const rio = new Pelicula("Río Profundo", 118);
  assert.equal(rio.titulo, "Río Profundo", "rio.titulo debería ser \"Río Profundo\" (¿lo guardaste con this.titulo?)");
  assert.equal(rio.duracion, 118, "rio.duracion debería ser 118");
});

test("toda película arranca con precioBase de 15000", () => {
  assert.equal(new Pelicula("Río Profundo", 118).precioBase, 15000, "precioBase debería ser 15000 (fíjalo dentro del constructor con this.precioBase)");
});

test("precioBoleta() retorna el precio base", () => {
  const rio = new Pelicula("Río Profundo", 118);
  assert.equal(rio.precioBoleta(), 15000, "rio.precioBoleta() debería retornar 15000");
  rio.precioBase = 20000;
  assert.equal(rio.precioBoleta(), 20000, "Si precioBase cambia a 20000, precioBoleta() debería retornar 20000 (retorna this.precioBase, no un número fijo)");
});

test("ficha() arma el texto de la película", () => {
  assert.equal(new Pelicula("Río Profundo", 118).ficha(), "Río Profundo | 118 min | $15000", "ficha() debería retornar \"Río Profundo | 118 min | $15000\"");
  assert.equal(new Pelicula("Cometa", 95).ficha(), "Cometa | 95 min | $15000", "ficha() debería retornar \"Cometa | 95 min | $15000\"");
});

test("ficha() obtiene el precio llamando a this.precioBoleta()", () => {
  const rio = new Pelicula("Río Profundo", 118);
  rio.precioBoleta = () => 99999;
  assert.equal(rio.ficha(), "Río Profundo | 118 min | $99999", "ficha() debería llamar a this.precioBoleta() en vez de leer this.precioBase (lo necesitarás en el ejercicio 03)");
});
