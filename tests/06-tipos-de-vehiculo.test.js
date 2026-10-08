const test = require("node:test");
const assert = require("node:assert/strict");
const { Vehiculo, Alimentador, BusDual } = require("../ejercicios/06-tipos-de-vehiculo");
const { codigoSinComentarios } = require("./utilidades");

test("Vehiculo guarda sus datos y cobra la tarifa base", () => {
  const bus = new Vehiculo("RVT101", 40);
  assert.equal(bus.placa, "RVT101", "bus.placa debería ser \"RVT101\" (¿la guardaste con this.placa?)");
  assert.equal(bus.pasajeros, 40, "bus.pasajeros debería ser 40");
  assert.equal(bus.tarifa(), 2950, "tarifa() de un Vehiculo debería retornar 2950");
});

test("reporte() arma el texto llamando a this.tarifa()", () => {
  const bus = new Vehiculo("RVT101", 40);
  assert.equal(bus.reporte(), "RVT101 | 40 pasajeros | Tarifa: $2950", "reporte() debería retornar \"RVT101 | 40 pasajeros | Tarifa: $2950\"");
  bus.tarifa = () => 1234;
  assert.equal(bus.reporte(), "RVT101 | 40 pasajeros | Tarifa: $1234", "reporte() debería obtener la tarifa llamando a this.tarifa(), no escribiendo 2950");
});

test("Alimentador hereda el constructor y no cobra", () => {
  const alimentador = new Alimentador("ALM202", 25);
  assert.ok(alimentador instanceof Vehiculo, "Un Alimentador debería heredar de Vehiculo (¿usaste extends?)");
  assert.equal(alimentador.placa, "ALM202", "alimentador.placa debería ser \"ALM202\" (lo guarda el constructor heredado)");
  assert.equal(alimentador.tarifa(), 0, "tarifa() de un Alimentador debería retornar 0");
  assert.equal(alimentador.reporte(), "ALM202 | 25 pasajeros | Tarifa: $0", "reporte() heredado debería retornar \"ALM202 | 25 pasajeros | Tarifa: $0\"");
});

test("BusDual eléctrico cobra 2500", () => {
  const dual = new BusDual("DUA303", 80, true);
  assert.ok(dual instanceof Vehiculo, "Un BusDual debería heredar de Vehiculo (¿usaste extends?)");
  assert.equal(dual.placa, "DUA303", "dual.placa debería ser \"DUA303\" (¿llamaste a super(placa, pasajeros)?)");
  assert.equal(dual.esElectrico, true, "dual.esElectrico debería ser true");
  assert.equal(dual.tarifa(), 2500, "tarifa() de un BusDual eléctrico debería retornar 2500");
  assert.equal(dual.reporte(), "DUA303 | 80 pasajeros | Tarifa: $2500", "reporte() heredado debería retornar \"DUA303 | 80 pasajeros | Tarifa: $2500\"");
});

test("BusDual no eléctrico cobra 3200", () => {
  assert.equal(new BusDual("DUA404", 80, false).tarifa(), 3200, "tarifa() de un BusDual no eléctrico debería retornar 3200");
});

test("usa extends y super, y escribe reporte() una sola vez", () => {
  const codigo = codigoSinComentarios("06-tipos-de-vehiculo.js");
  assert.match(codigo, /class\s+Alimentador\s+extends\s+Vehiculo\b/, "Alimentador debería heredar: class Alimentador extends Vehiculo");
  assert.match(codigo, /class\s+BusDual\s+extends\s+Vehiculo\b/, "BusDual debería heredar: class BusDual extends Vehiculo");
  assert.match(codigo, /super\s*\(/, "El constructor de BusDual debería llamar a super(placa, pasajeros)");
  const reportes = codigo.match(/^\s*reporte\s*\([^)]*\)\s*\{/gm) || [];
  assert.equal(reportes.length, 1, "reporte() se escribe una sola vez, en Vehiculo: las hijas lo heredan (encontré " + reportes.length + ")");
});
