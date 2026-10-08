// ============================================================
// Ejercicio 07 · Polimorfismo: el reporte de la flota (integrador)
// ============================================================
// RutaViva quiere el reporte de toda su flota, recorriendo los
// vehículos con un solo ciclo y SIN preguntar de qué tipo es cada uno.
//
// 1. Crea la función crearFlota() que retorne un arreglo con
//    uno de cada tipo, en este orden y con estos datos:
//      un Vehiculo    → placa "RVT101", 40 pasajeros
//      un Alimentador → placa "ALM202", 25 pasajeros
//      un BusDual     → placa "DUA303", 80 pasajeros, eléctrico (true)
//
// 2. Crea la función reporteFlota(flota) que:
//      → recorra el arreglo con un for...of
//      → por cada vehículo, agregue su reporte() a un arreglo nuevo
//      → retorne ese arreglo de textos
//
// Regla del reto: NO uses ningún if (ni dentro ni fuera del for).
// Cada clase ya sabe su tarifa.
//
// Ejemplos:
//   reporteFlota(crearFlota()) →
//     [ "RVT101 | 40 pasajeros | Tarifa: $2950",
//       "ALM202 | 25 pasajeros | Tarifa: $0",
//       "DUA303 | 80 pasajeros | Tarifa: $2500" ]
//   reporteFlota([]) → []
//
// 💭 Para pensar (no se califica):
//   El for llama reporte() para todos por igual, sin preguntar el
//   tipo. ¿Quién decide qué tarifa se muestra? Si mañana llega un
//   BusArticulado con tarifa 3500, ¿cuántas líneas del for cambias?
// ============================================================

// Esta línea trae tus clases del ejercicio 06
const { Vehiculo, Alimentador, BusDual } = require("./06-tipos-de-vehiculo");

function crearFlota() {
  // Tu código aquí
}

function reporteFlota(flota) {
  // Tu código aquí
}

// No borres esta línea: es la puerta por donde el test usa tus funciones
module.exports = { crearFlota, reporteFlota };
