# 🏛️ Taller de clases y herencia

Generation Colombia · Cohorte 15 · JavaScript · Taller calificable

---

## 🧭 ¿Qué es esto?

### Los negocios del taller

Vas a modelar cuatro negocios con **clases**: una app de domicilios, un cine, una billetera digital y un sistema de buses.
En 7 ejercicios pasas de una clase sola a una familia de clases que heredan, sobreescriben y responden cada una a su manera.

### La calificación es automática

Cada vez que subes tu código, GitHub corre unos **tests** que revisan tus clases.
En pocos minutos ves tu nota de **0.0 a 5.0** y qué te falta corregir.

### ¿Qué es un test?

**Definición técnica:** un test es un código que crea objetos con tus clases, llama sus métodos con datos conocidos y compara lo que retornan con el resultado esperado.

**En la vida real:** es como el control de calidad de una fábrica. Antes de que el producto salga, alguien lo prueba; si algo falla, te dice exactamente qué.

### ¿Qué es un test de estructura?

Algunos ejercicios piden una herramienta concreta, como `extends`, `super(...)` o `for...of`.
Un test de estructura lee tu código y revisa que **sí la usaste**. Si llegas al resultado por otro camino, ese test no pasa.

---

## 📋 Los 7 ejercicios

### Tabla general

| # | Tema | Archivo | Lo que debes completar |
|---|---|---|---|
| 01 | Una clase: constructor y métodos | `ejercicios/01-clase-restaurante.js` | clase `Restaurante` |
| 02 | La clase padre del cine | `ejercicios/02-clase-pelicula.js` | clase `Pelicula` |
| 03 | Herencia y sobreescritura | `ejercicios/03-pelicula-vip.js` | clase `PeliculaVIP` |
| 04 | La clase padre de la billetera | `ejercicios/04-clase-usuario.js` | clase `Usuario` |
| 05 | `super` dentro de un método | `ejercicios/05-comercio.js` | clase `Comercio` |
| 06 | Una clase padre y dos hijas | `ejercicios/06-tipos-de-vehiculo.js` | clases `Vehiculo`, `Alimentador` y `BusDual` |
| 07 | Polimorfismo (integrador) | `ejercicios/07-flota.js` | funciones `crearFlota` y `reporteFlota` |

### ¿Dónde está el enunciado?

Al inicio de cada archivo, en los comentarios.
Ahí están las reglas, los ejemplos y una pista o una pregunta para pensar.

### ¿Y los archivos punto1.js, punto2.js… del taller?

Aquí cada clase ya tiene su archivo listo dentro de `ejercicios/`.
No imprimes con `console.log`: los métodos **retornan** y los tests revisan lo que retornan.

---

## ⏰ Fecha límite

### Cuándo cierra

**Domingo 11 de octubre de 2026 a las 11:59 p. m.** (hora de Colombia).

### Qué pasa después

Después de esa hora puedes seguir haciendo `git push`, pero **tu nota ya no cambia**.
Si abres tu Pull Request por primera vez después del cierre, queda con la etiqueta **⏰ Fuera de plazo**.

---

## 🚀 Paso 1 · Crea tu copia del repo (Fork)

### ¿Qué es un Fork?

**Definición técnica:** un fork es una copia de un repositorio en tu propia cuenta de GitHub. Puedes modificarla sin afectar el original.

**En la vida real:** la profe tiene el cuaderno original y tú le sacas fotocopia. Escribes en tu fotocopia, no en el cuaderno de la profe.

### Cómo hacerlo

1. Entra al repositorio de la profe en GitHub.
2. Arriba a la derecha, haz clic en **Fork**.
3. Deja todo como está y haz clic en **Create fork**.

### Cómo saber que quedó bien

Arriba a la izquierda debe decir **TU-USUARIO / Lab_ClasesJS_CH15**.
Debajo aparece en letra pequeña: *forked from …*

---

## 💻 Paso 2 · Descarga tu copia al computador (Clone)

### Copia la dirección de TU fork

En **tu** fork (no en el de la profe), haz clic en el botón verde **Code** y copia la URL que termina en `.git`.

### Clona desde VS Code

Abre la terminal de VS Code (`Ctrl + ñ` o menú **Terminal → New Terminal**), ubícate en la carpeta donde guardas tus proyectos y escribe esto. Cambia la URL por la que copiaste:

```bash
git clone https://github.com/TU-USUARIO/Lab_ClasesJS_CH15.git
```

### Abre la carpeta del proyecto

Entra a la carpeta que se acaba de crear y ábrela en VS Code:

```bash
cd Lab_ClasesJS_CH15
code .
```

---

## ✍️ Paso 3 · Resuelve los ejercicios

### Dónde escribes tu código

Abre el archivo del ejercicio, por ejemplo `ejercicios/01-clase-restaurante.js`.
Escribe tu solución **dentro** de las llaves de la clase, donde dice `// Tu código aquí`.

### Tres reglas de oro

- **No le cambies el nombre** a la clase ni a los métodos: escríbelos exactamente como en el enunciado.
- **No borres** la última línea, la de `module.exports`: por ahí es por donde el test usa tu clase.
- **Usa `return`** en los métodos: el test revisa lo que retornan, no lo que imprimes con `console.log`.

### Los textos van EXACTOS

Cuando un método retorna un texto, el test lo compara letra por letra: espacios, `|`, `-`, `$` y puntos incluidos.
Copia el formato del ejemplo del enunciado.

### En los ejercicios 03, 05 y 07

Arriba ya viene escrita una línea con `require`: trae tu clase del ejercicio anterior (02, 04 o 06).
No la borres. Si ese ejercicio tiene un error, este también falla.

### Ejemplo de cómo se ve una clase resuelta

Este es un ejemplo **distinto** a los 7 ejercicios, solo para que veas la forma. Una clase con constructor y un método:

```javascript
class Mascota {
  constructor(nombre) {
    this.nombre = nombre;
  }

  saludar() {
    return `Hola, soy ${this.nombre}`;
  }
}

module.exports = { Mascota };
```

---

## 🧪 Paso 4 · Prueba tu nota en tu computador

### Corre todos los tests

En la terminal de VS Code, dentro de la carpeta del proyecto, escribe:

```bash
npm test
```

No necesitas `npm install`: los tests usan herramientas que ya vienen con Node.js.

### Cómo leer el resultado

- ✅ el ejercicio pasó todos sus tests
- 🟡 pasó algunos tests
- ❌ no pasó ninguno
- Debajo de cada ✗ aparece **qué** esperaba el test

Al final ves tu **nota de 0.0 a 5.0**. Es la misma que te va a poner GitHub.

### Corre un solo ejercicio

Si quieres revisar solo uno, agrega su número. Por ejemplo, para el 03:

```bash
npm test -- 03
```

---

## ☁️ Paso 5 · Sube tu código a tu fork

### Los 3 comandos de siempre

Cada vez que quieras guardar tu avance en GitHub, corre estos 3 comandos en orden:

```bash
git add .
git commit -m "Resuelvo ejercicios 01 al 03"
git push
```

### ¿Qué hace cada uno?

- `git add .` → prepara todos tus cambios (como meter las cosas en una caja).
- `git commit -m "..."` → cierra la caja y le pone una etiqueta con un mensaje.
- `git push` → envía la caja a tu fork en GitHub.

---

## 📬 Paso 6 · Entrega: abre tu Pull Request (solo UNA vez)

### ¿Qué es un Pull Request?

**Definición técnica:** un Pull Request (PR) es una solicitud para proponer tus cambios al repositorio original. Ahí se revisan y se comentan.

**En la vida real:** es como radicar un documento en una oficina. Lo entregas una vez, queda con número de radicado, y cualquier corrección se agrega a ese mismo trámite.

### Cómo abrirlo

1. Entra a **tu fork** en GitHub.
2. Haz clic en **Contribute** y luego en **Open pull request**.
3. En el título escribe tu **nombre y apellido completos**. Por ejemplo: `Laura Gómez Pérez`.
4. Haz clic en **Create pull request**.

### Muy importante

**Abre un solo PR.** Cuando hagas `git push` otra vez, tu PR se actualiza solo y se vuelve a calificar.
No hace falta abrir uno nuevo.

---

## 🎯 Paso 7 · Mira tu nota en GitHub

### Dónde aparece

Espera 1 o 2 minutos después de cada `git push` y entra a tu Pull Request:

- Aparece un **comentario automático** con tu nota y una tabla por ejercicio.
- A la derecha verás una etiqueta, por ejemplo **Nota 4.2**.
- El enlace **Ver qué falta por corregir** te muestra qué tests fallaron.

### ¿Quieres subir la nota?

Corrige en VS Code, revisa con `npm test` y haz de nuevo el **Paso 5**.
El comentario y la etiqueta se actualizan solos.

### Ojo con la fecha límite

Después del **domingo 11 de octubre a las 11:59 p. m.**, los `git push` ya no cambian tu nota.
Si tu primera entrega llega tarde, el PR queda con **⏰ Fuera de plazo**.

---

## 🚫 Archivos que NO debes modificar

### La lista

- La carpeta `tests/`
- La carpeta `scripts/`
- La carpeta `.github/`
- El archivo `package.json`

### ¿Qué pasa si los modificas?

Tu PR queda marcado con la etiqueta **⚠️ Revisar** y la profe lo revisa a mano.
Además, GitHub siempre califica con los tests originales, así que modificarlos no cambia tu nota.

---

## 🆘 Errores frecuentes

### "npm no se reconoce como un comando"

No tienes Node.js instalado, o VS Code se abrió antes de instalarlo.
Instálalo desde [nodejs.org](https://nodejs.org) (versión LTS) y reinicia VS Code.

### "No encuentro el método …()"

El método no existe en tu clase con ese nombre exacto (revisa mayúsculas y tildes), o borraste la línea `module.exports`.
Compara tu archivo con el enunciado.

### "… debería ser …" en una propiedad

El constructor no guardó ese dato con `this`.
Revisa que escribas `this.nombre = nombre;` y no solo `nombre = nombre;`.

### "Falta super(...) en el constructor de tu clase hija"

En una clase con `extends`, el constructor debe llamar a `super(...)` **antes** de usar `this`.
Si llamas `super()` sin datos, las propiedades del padre quedan en `undefined`.

### "Un método se llama a sí mismo sin fin"

Dentro de un método sobreescrito escribiste `this.metodo(...)` en vez de `super.metodo(...)`.
`this` llama a la versión de la hija (la misma), `super` llama a la del padre.

### "La clase de la que heredas llegó como undefined"

El `require` de arriba no trajo la clase padre.
No borres esa línea, y revisa que el archivo del padre conserve su `module.exports`.

### "Tu clase debería heredar…" o "Regla del reto…"

Es un test de estructura: el enunciado pide `extends`, `super`, `for...of` o no usar `if`, y tu código no lo cumple.
Lee otra vez el enunciado del ejercicio.

### "Hay un error de sintaxis (SyntaxError) en…"

El mensaje dice **en qué archivo** está el error. El más común con clases: poner una **coma** entre métodos (en una clase no van comas).
Ojo: un error en el 02, el 04 o el 06 también hace fallar el 03, el 05 o el 07, porque los usan.

### "Please tell me who you are" al hacer commit

Git no sabe quién eres. Configúralo una sola vez con tu nombre y el correo de tu cuenta de GitHub:

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tucorreo@ejemplo.com"
```

### "Permission denied" o error 403 al hacer push

Clonaste el repo de la profe en vez de tu fork.
Vuelve al **Paso 2** y clona la URL de **tu** fork.

---

<sub>© 2026 Ana Alvarado · Educadora Tech & Desarrolladora Full Stack · Todos los derechos reservados · linkedin.com/in/ana-alvarado-instructora-full-stack</sub>
