const test = require("node:test");
const assert = require("node:assert/strict");
const { crearFlota, reporteFlota } = require("../ejercicios/07-flota");
const { Vehiculo, Alimentador, BusDual } = require("../ejercicios/06-tipos-de-vehiculo");
const { codigoSinComentarios } = require("./utilidades");

test("crearFlota() trae uno de cada tipo, en orden", () => {
  const flota = crearFlota();
  assert.ok(Array.isArray(flota), "crearFlota() debería retornar un arreglo");
  assert.equal(flota.length, 3, "crearFlota() debería retornar 3 vehículos");
  assert.ok(flota[0] instanceof Vehiculo && !(flota[0] instanceof Alimentador) && !(flota[0] instanceof BusDual), "El primero debería ser un Vehiculo (new Vehiculo(...))");
  assert.ok(flota[1] instanceof Alimentador, "El segundo debería ser un Alimentador (new Alimentador(...))");
  assert.ok(flota[2] instanceof BusDual, "El tercero debería ser un BusDual (new BusDual(...))");
});

test("el reporte de la flota trae un texto por vehículo", () => {
  assert.deepEqual(reporteFlota(crearFlota()), [
    "RVT101 | 40 pasajeros | Tarifa: $2950",
    "ALM202 | 25 pasajeros | Tarifa: $0",
    "DUA303 | 80 pasajeros | Tarifa: $2500",
  ], "reporteFlota(crearFlota()) debería retornar los 3 reportes del enunciado (revisa placas, pasajeros y orden)");
});

test("una flota vacía da un reporte vacío", () => {
  assert.deepEqual(reporteFlota([]), [], "reporteFlota([]) debería retornar [] (¿retornaste el arreglo?)");
});

test("funciona con cualquier flota, no solo la de crearFlota()", () => {
  const flota = [new BusDual("DUA404", 60, false), new BusDual("DUA505", 70, true), new Alimentador("ALM606", 20)];
  assert.deepEqual(reporteFlota(flota), [
    "DUA404 | 60 pasajeros | Tarifa: $3200",
    "DUA505 | 70 pasajeros | Tarifa: $2500",
    "ALM606 | 20 pasajeros | Tarifa: $0",
  ], "reporteFlota() debería recorrer el arreglo que recibe, sin datos fijos");
});

test("un tipo nuevo (BusArticulado) funciona sin cambiar tu for", () => {
  class BusArticulado extends Vehiculo {
    tarifa() {
      return 3500;
    }
  }
  assert.deepEqual(reporteFlota([new BusArticulado("ART707", 150)]), ["ART707 | 150 pasajeros | Tarifa: $3500"], "reporteFlota() debería funcionar con un BusArticulado nuevo sin preguntar el tipo");
});

test("usa for...of y ningún if", () => {
  const codigo = codigoSinComentarios("07-flota.js");
  assert.match(codigo, /\bfor\s*\(\s*(const|let)\s+\w+\s+of\b/, "Tu reporteFlota() debería recorrer la flota con un for...of");
  assert.match(codigo, /\.reporte\s*\(/, "Tu código debería llamar a .reporte() de cada vehículo");
  assert.doesNotMatch(codigo, /\bif\s*\(/, "Regla del reto: no uses ningún if. Cada clase ya sabe su tarifa");
  assert.doesNotMatch(codigo, /\binstanceof\b/, "Regla del reto: no preguntes el tipo del vehículo. Cada clase ya sabe su tarifa");
});
