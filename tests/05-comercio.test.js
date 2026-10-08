const test = require("node:test");
const assert = require("node:assert/strict");
const { Comercio } = require("../ejercicios/05-comercio");
const { Usuario } = require("../ejercicios/04-clase-usuario");
const { codigoSinComentarios } = require("./utilidades");

test("un Comercio también es un Usuario", () => {
  const espiga = new Comercio("Panadería La Espiga", 50000, 3);
  assert.ok(espiga instanceof Usuario, "Un Comercio debería heredar de Usuario (¿usaste extends?)");
  assert.equal(espiga.nombre, "Panadería La Espiga", "espiga.nombre debería ser \"Panadería La Espiga\" (¿llamaste a super(nombre, saldo)?)");
  assert.equal(espiga.saldo, 50000, "espiga.saldo debería ser 50000 (¿le pasaste los datos a super?)");
  assert.equal(espiga.comision, 3, "espiga.comision debería ser 3");
});

test("enviar() suma la comisión al monto", () => {
  const espiga = new Comercio("Panadería La Espiga", 50000, 3);
  assert.equal(espiga.enviar(20000), "Panadería La Espiga envió $20600. Saldo: $29400", "espiga.enviar(20000) con 3% debería retornar \"Panadería La Espiga envió $20600. Saldo: $29400\"");
  assert.equal(espiga.saldo, 29400, "Después de enviar 20000 con 3% de comisión, el saldo debería quedar en 29400");
});

test("la comisión depende del porcentaje de cada comercio", () => {
  const ferreteria = new Comercio("Ferretería El Tornillo", 100000, 5);
  assert.equal(ferreteria.enviar(10000), "Ferretería El Tornillo envió $10500. Saldo: $89500", "Con 5% de comisión, enviar(10000) debería retornar \"Ferretería El Tornillo envió $10500. Saldo: $89500\" (¿usaste this.comision?)");
});

test("si el monto más la comisión no alcanza, responde Saldo insuficiente", () => {
  const kiosco = new Comercio("Kiosco Central", 10200, 3);
  assert.equal(kiosco.enviar(10000), "Saldo insuficiente", "kiosco.enviar(10000) con saldo 10200 debería retornar \"Saldo insuficiente\" (10000 + 300 de comisión = 10300)");
  assert.equal(kiosco.saldo, 10200, "Si no alcanza, el saldo debería seguir en 10200");
});

test("una persona y un comercio envían lo mismo y quedan con saldos distintos", () => {
  const sofia = new Usuario("Sofía", 50000);
  const espiga = new Comercio("Panadería La Espiga", 50000, 3);
  sofia.enviar(20000);
  espiga.enviar(20000);
  assert.equal(sofia.saldo, 30000, "La persona debería quedar con 30000: el Usuario no paga comisión");
  assert.equal(espiga.saldo, 29400, "El comercio debería quedar con 29400");
});

test("usa extends, super() y super.enviar() sin restar el saldo", () => {
  const codigo = codigoSinComentarios("05-comercio.js");
  assert.match(codigo, /class\s+Comercio\s+extends\s+Usuario\b/, "Tu clase debería heredar: class Comercio extends Usuario");
  assert.match(codigo, /super\s*\(/, "Tu constructor debería llamar a super(nombre, saldo)");
  assert.match(codigo, /super\.enviar\s*\(/, "Tu enviar() debería llamar a super.enviar(...) para reutilizar la lógica del padre");
  assert.doesNotMatch(codigo, /this\.saldo\s*(-|\+)?=(?!=)/, "No cambies this.saldo en Comercio: deja que el padre lo reste con super.enviar(...)");
});
