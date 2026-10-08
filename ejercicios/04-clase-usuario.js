// ============================================================
// Ejercicio 04 · La clase padre: Usuario
// ============================================================
// En Billetera Ceiba, una persona envía dinero sin costo.
// Esta clase será el PADRE del comercio (ejercicio 05).
//
// Completa la clase Usuario:
//
//   constructor(nombre, saldo)
//     → guarda this.nombre y this.saldo
//
//   enviar(monto)
//     → si el monto es mayor que el saldo, retorna el texto
//       "Saldo insuficiente" y NO cambia el saldo
//     → si no, resta el monto al saldo y retorna este texto EXACTO:
//       "<nombre> envió $<monto>. Saldo: $<saldo nuevo>"
//
// Ejemplos:
//   const sofia = new Usuario("Sofía", 50000);
//   sofia.enviar(20000) → "Sofía envió $20000. Saldo: $30000"
//   sofia.enviar(90000) → "Saldo insuficiente"   (saldo sigue en 30000)
//   sofia.enviar(30000) → "Sofía envió $30000. Saldo: $0"
//
// Pista: usa un return anticipado, como el retirar() de la
// clase del banco.
// ============================================================

class Usuario {
  // Tu código aquí
  constructor(nombre, saldo) {
    this.nombre = nombre;
    this.saldo = saldo;
  }

  enviar(monto) {
    if (monto > this.saldo) {
      return "Saldo insuficiente";
    }
    this.saldo -= monto;
    return `${this.nombre} envió $${monto}. Saldo: $${this.saldo}`;
  }
}

// No borres esta línea: es la puerta por donde el test usa tu clase
module.exports = { Usuario };
