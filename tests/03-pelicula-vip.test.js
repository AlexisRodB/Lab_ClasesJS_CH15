const test = require("node:test");
const assert = require("node:assert/strict");
const { PeliculaVIP } = require("../ejercicios/03-pelicula-vip");
const { Pelicula } = require("../ejercicios/02-clase-pelicula");
const { codigoSinComentarios } = require("./utilidades");

test("una PeliculaVIP también es una Pelicula", () => {
  const vip = new PeliculaVIP("Río Profundo", 118, true);
  assert.ok(vip instanceof Pelicula, "Una PeliculaVIP debería heredar de Pelicula (¿usaste extends?)");
  assert.equal(vip.titulo, "Río Profundo", "vip.titulo debería ser \"Río Profundo\" (¿llamaste a super(titulo, duracion)?)");
  assert.equal(vip.duracion, 118, "vip.duracion debería ser 118 (¿le pasaste los datos a super?)");
});

test("guarda si incluye comida", () => {
  assert.equal(new PeliculaVIP("Río Profundo", 118, true).incluyeComida, true, "incluyeComida debería ser true");
  assert.equal(new PeliculaVIP("Cometa", 95, false).incluyeComida, false, "incluyeComida debería ser false");
});

test("sin comida, la boleta VIP vale 40000", () => {
  assert.equal(new PeliculaVIP("Cometa", 95, false).precioBoleta(), 40000, "precioBoleta() sin comida debería retornar 40000 (15000 + 25000)");
});

test("con comida, la boleta VIP vale 58000", () => {
  assert.equal(new PeliculaVIP("Río Profundo", 118, true).precioBoleta(), 58000, "precioBoleta() con comida debería retornar 58000 (15000 + 25000 + 18000)");
});

test("ficha() heredada muestra el precio VIP", () => {
  assert.equal(new PeliculaVIP("Río Profundo", 118, true).ficha(), "Río Profundo | 118 min | $58000", "ficha() debería retornar \"Río Profundo | 118 min | $58000\" (revisa que ficha() en Pelicula llame a this.precioBoleta())");
  assert.equal(new PeliculaVIP("Cometa", 95, false).ficha(), "Cometa | 95 min | $40000", "ficha() debería retornar \"Cometa | 95 min | $40000\"");
});

test("usa extends y super, y no reescribe ficha()", () => {
  const codigo = codigoSinComentarios("03-pelicula-vip.js");
  assert.match(codigo, /class\s+PeliculaVIP\s+extends\s+Pelicula\b/, "Tu clase debería heredar: class PeliculaVIP extends Pelicula");
  assert.match(codigo, /super\s*\(/, "Tu constructor debería llamar a super(titulo, duracion)");
  assert.equal(Object.prototype.hasOwnProperty.call(PeliculaVIP.prototype, "ficha"), false, "No escribas ficha() en PeliculaVIP: debe funcionar heredada de Pelicula");
});
