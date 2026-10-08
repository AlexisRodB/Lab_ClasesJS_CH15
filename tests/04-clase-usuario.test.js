const test = require("node:test");
const assert = require("node:assert/strict");
const { Usuario } = require("../ejercicios/04-clase-usuario");

test("el constructor guarda nombre y saldo", () => {
  const sofia = new Usuario("Sofía", 50000);
  assert.equal(sofia.nombre, "Sofía", "sofia.nombre debería ser \"Sofía\" (¿lo guardaste con this.nombre?)");
  assert.equal(sofia.saldo, 50000, "sofia.saldo debería ser 50000");
});

test("enviar() resta el monto y arma el mensaje", () => {
  const sofia = new Usuario("Sofía", 50000);
  assert.equal(sofia.enviar(20000), "Sofía envió $20000. Saldo: $30000", "sofia.enviar(20000) debería retornar \"Sofía envió $20000. Saldo: $30000\"");
  assert.equal(sofia.saldo, 30000, "Después de enviar 20000, sofia.saldo debería quedar en 30000 (¿usaste -=?)");
});

test("puede enviar exactamente todo su saldo", () => {
  const mateo = new Usuario("Mateo", 30000);
  assert.equal(mateo.enviar(30000), "Mateo envió $30000. Saldo: $0", "mateo.enviar(30000) con saldo 30000 debería retornar \"Mateo envió $30000. Saldo: $0\" (revisa si usaste > y no >=)");
});

test("si no alcanza, responde Saldo insuficiente y no cambia el saldo", () => {
  const sofia = new Usuario("Sofía", 50000);
  assert.equal(sofia.enviar(90000), "Saldo insuficiente", "sofia.enviar(90000) con saldo 50000 debería retornar \"Saldo insuficiente\"");
  assert.equal(sofia.saldo, 50000, "Si el saldo no alcanza, sofia.saldo debería seguir en 50000 (¿usaste return antes de restar?)");
});

test("dos envíos seguidos descuentan sobre el saldo actualizado", () => {
  const lina = new Usuario("Lina", 40000);
  lina.enviar(15000);
  assert.equal(lina.enviar(10000), "Lina envió $10000. Saldo: $15000", "Después de enviar 15000 y luego 10000, debería retornar \"Lina envió $10000. Saldo: $15000\"");
  assert.equal(lina.enviar(20000), "Saldo insuficiente", "Con 15000 de saldo, enviar(20000) debería retornar \"Saldo insuficiente\"");
});
