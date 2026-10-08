// ============================================================
// Ejercicio 06 · Una clase padre y dos hijas: la flota de RutaViva
// ============================================================
// RutaViva, un sistema de buses, tiene varios tipos de vehículo.
// Todos tienen placa y pasajeros, pero cada uno cobra distinto.
// Las tres clases van en este mismo archivo.
//
// 1. Completa la clase Vehiculo:
//      constructor(placa, pasajeros) → guarda this.placa y this.pasajeros
//      tarifa()  → retorna 2950 (la tarifa base)
//      reporte() → retorna este texto EXACTO:
//        "<placa> | <pasajeros> pasajeros | Tarifa: $<tarifa>"
//        (la tarifa se obtiene LLAMANDO a this.tarifa())
//
// 2. Completa la clase Alimentador:
//      → hereda de Vehiculo
//      → sobreescribe tarifa() para retornar 0
//      → no necesita constructor propio: hereda el del padre
//
// 3. Completa la clase BusDual:
//      → hereda de Vehiculo
//      → constructor(placa, pasajeros, esElectrico): usa super
//        y guarda this.esElectrico (true o false)
//      → sobreescribe tarifa(): 2500 si es eléctrico, 3200 si no
//
// Ejemplos:
//   new Vehiculo("RVT101", 40).reporte()      → "RVT101 | 40 pasajeros | Tarifa: $2950"
//   new Alimentador("ALM202", 25).reporte()   → "ALM202 | 25 pasajeros | Tarifa: $0"
//   new BusDual("DUA303", 80, true).tarifa()  → 2500
//   new BusDual("DUA404", 80, false).tarifa() → 3200
//
// Pista: reporte() se escribe UNA sola vez, en Vehiculo.
// ============================================================

class Vehiculo {
  // Tu código aquí
  constructor(placa, pasajeros) {
    this.placa = placa;
    this.pasajeros = pasajeros;
  }

  tarifa() {
    return 2950;
  }

  reporte() {
    return `${this.placa} | ${this.pasajeros} pasajeros | Tarifa: $${this.tarifa()}`;
  }
}

class Alimentador extends Vehiculo {
  // Tu código aquí
  tarifa() {
    return 0;
  }

}

class BusDual extends Vehiculo {
  // Tu código aquí
  constructor(placa, pasajeros, esElectrico) {
    super(placa, pasajeros);
    this.esElectrico = esElectrico;
  }

  tarifa() {
    return this.esElectrico ? 2500 : 3200;
  }
}


// No borres esta línea: es la puerta por donde el test usa tus clases
module.exports = { Vehiculo, Alimentador, BusDual };
