// ============================================================
// Ejercicio 05 · super dentro de un método: Comercio
// ============================================================
// Un comercio también envía dinero, pero paga una comisión.
// El comercio REUTILIZA la lógica de envío del Usuario
// (ejercicio 04): no la reescribe.
//
// Completa la clase Comercio para que:
//
//   1. Herede de Usuario (usa extends).
//
//   2. constructor(nombre, saldo, comision)
//      → llama a super(nombre, saldo)
//      → guarda this.comision (un porcentaje, ej. 3)
//
//   3. Sobreescriba enviar(monto):
//      → calcula la comisión: monto * this.comision / 100
//      → súmala al monto
//      → llama a super.enviar(...) con ese total y retorna
//        lo que te responda
//      → NO restes el saldo tú: deja que el padre lo haga
//
// Ejemplos:
//   const espiga = new Comercio("Panadería La Espiga", 50000, 3);
//   espiga.enviar(20000) → "Panadería La Espiga envió $20600. Saldo: $29400"
//
//   const kiosco = new Comercio("Kiosco Central", 10200, 3);
//   kiosco.enviar(10000) → "Saldo insuficiente"   (10000 + 300 = 10300)
//
// 💭 Para pensar (no se califica):
//   Si escribes this.enviar(total) en vez de super.enviar(total),
//   ¿a cuál de las dos versiones de enviar estarías llamando?
//   ¿Qué crees que pasaría?
// ============================================================

// Esta línea trae tu clase Usuario del ejercicio 04
const { Usuario } = require("./04-clase-usuario");

class Comercio {
  // Tu código aquí
}

// No borres esta línea: es la puerta por donde el test usa tu clase
module.exports = { Comercio };
