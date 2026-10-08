// ============================================================
// Ejercicio 03 · Herencia: PeliculaVIP
// ============================================================
// Las funciones VIP cuestan más. En vez de escribir otra clase
// desde cero, PeliculaVIP HEREDA de Pelicula (ejercicio 02) y
// solo cambia lo que es distinto: el precio.
//
// Completa la clase PeliculaVIP para que:
//
//   1. Herede de Pelicula (usa extends).
//
//   2. constructor(titulo, duracion, incluyeComida)
//      → llama a super(titulo, duracion) ANTES de usar this
//      → guarda this.incluyeComida (true o false)
//
//   3. Sobreescriba precioBoleta():
//      → precio base + 25000 por la silla VIP
//      → y 18000 más si incluyeComida es true
//
//   4. NO escribas ficha() en esta clase: debe funcionar heredada.
//
// Ejemplos:
//   const vip = new PeliculaVIP("Río Profundo", 118, true);
//   vip.precioBoleta() → 58000   (15000 + 25000 + 18000)
//   vip.ficha()        → "Río Profundo | 118 min | $58000"
//
//   new PeliculaVIP("Cometa", 95, false).precioBoleta() → 40000
//
// 💭 Para pensar (no se califica):
//   PeliculaVIP no define ficha(). Aun así, la ficha de una
//   película VIP sale con el precio más alto. ¿Por qué, si
//   ficha() es la misma que heredó de Pelicula?
// ============================================================

// Esta línea trae tu clase Pelicula del ejercicio 02
const { Pelicula } = require("./02-clase-pelicula");

class PeliculaVIP {
  // Tu código aquí
}

// No borres esta línea: es la puerta por donde el test usa tu clase
module.exports = { PeliculaVIP };
