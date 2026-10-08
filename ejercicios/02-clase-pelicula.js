// ============================================================
// Ejercicio 02 · La clase padre: Pelicula
// ============================================================
// En Cine Estelar toda película tiene un precio de boleta base.
// Esta clase será el PADRE de la película VIP (ejercicio 03).
//
// Completa la clase Pelicula:
//
//   constructor(titulo, duracion)
//     → guarda this.titulo y this.duracion (en minutos)
//     → fija también this.precioBase = 15000
//       (no llega por parámetro: toda película arranca así)
//
//   precioBoleta()
//     → retorna this.precioBase
//
//   ficha()
//     → retorna este texto EXACTO:
//       "<titulo> | <duracion> min | $<precio>"
//     → el precio lo obtienes LLAMANDO a this.precioBoleta()
//       (no escribas this.precioBase directo en ficha)
//
// Ejemplos:
//   const rio = new Pelicula("Río Profundo", 118);
//   rio.precioBase     → 15000
//   rio.precioBoleta() → 15000
//   rio.ficha()        → "Río Profundo | 118 min | $15000"
//
// Pista: dentro de un método, otro método de la misma clase
// se llama con this.nombreDelMetodo().
// ============================================================

class Pelicula {
  // Tu código aquí
  constructor(titulo, duracion){
    this.titulo = titulo;
    this.duracion = duracion;
    this.precioBase = 15000;
  }

  precioBoleta() {
    return this.precioBase;
  }

  ficha() {
    return `${this.titulo} | ${this.duracion} min | $${this.precioBoleta()}`;
  }
}

// No borres esta línea: es la puerta por donde el test usa tu clase
module.exports = { Pelicula };
