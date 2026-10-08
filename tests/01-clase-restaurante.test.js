const test = require("node:test");
const assert = require("node:assert/strict");
const { Restaurante } = require("../ejercicios/01-clase-restaurante");

test("el constructor guarda nombre, categoría y calificación", () => {
  const brasa = new Restaurante("La Brasa Dorada", "Asados", 4.6);
  assert.equal(brasa.nombre, "La Brasa Dorada", "brasa.nombre debería ser \"La Brasa Dorada\" (¿lo guardaste con this.nombre?)");
  assert.equal(brasa.categoria, "Asados", "brasa.categoria debería ser \"Asados\"");
  assert.equal(brasa.calificacion, 4.6, "brasa.calificacion debería ser 4.6");
});

test("describir() arma el texto del restaurante", () => {
  const brasa = new Restaurante("La Brasa Dorada", "Asados", 4.6);
  assert.equal(brasa.describir(), "La Brasa Dorada - Asados (4.6 estrellas)", "describir() debería retornar \"La Brasa Dorada - Asados (4.6 estrellas)\" (revisa espacios y guion)");
});

test("cada restaurante se describe con sus propios datos", () => {
  const wok = new Restaurante("Wok Express", "Comida china", 4.2);
  const arepas = new Restaurante("Arepas del Parque", "Arepas", 4.8);
  assert.equal(wok.describir(), "Wok Express - Comida china (4.2 estrellas)", "wok.describir() debería retornar \"Wok Express - Comida china (4.2 estrellas)\" (¿usaste this?)");
  assert.equal(arepas.describir(), "Arepas del Parque - Arepas (4.8 estrellas)", "arepas.describir() debería retornar \"Arepas del Parque - Arepas (4.8 estrellas)\"");
});

test("con 4.5 exacto está bien calificado", () => {
  assert.equal(new Restaurante("Punto Exacto", "Pizzas", 4.5).estaBienCalificado(), true, "Con calificación 4.5, estaBienCalificado() debería retornar true (revisa si usaste >=)");
});

test("estaBienCalificado() distingue arriba y abajo de 4.5", () => {
  assert.equal(new Restaurante("La Brasa Dorada", "Asados", 4.6).estaBienCalificado(), true, "Con calificación 4.6, estaBienCalificado() debería retornar true");
  assert.equal(new Restaurante("Wok Express", "Comida china", 4.2).estaBienCalificado(), false, "Con calificación 4.2, estaBienCalificado() debería retornar false");
  assert.equal(new Restaurante("Casi Casi", "Postres", 4.49).estaBienCalificado(), false, "Con calificación 4.49, estaBienCalificado() debería retornar false");
});
