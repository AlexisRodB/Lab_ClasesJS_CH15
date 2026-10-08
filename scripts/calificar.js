// Adaptador JavaScript (node:test): corre los tests de cada ejercicio y calcula la nota (0.0 a 5.0).
// La lista de ejercicios sale de .github/calificacion.json
// Uso local:   npm test          → todos los ejercicios
//              npm test -- 03    → solo el ejercicio 03
// En GitHub Actions además genera resultado.json y el resumen del run.

const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const RAIZ = path.join(__dirname, "..");
const CONFIG = JSON.parse(fs.readFileSync(path.join(RAIZ, ".github", "calificacion.json"), "utf8"));
const TIEMPO_MAXIMO_MS = 8000;
const TIEMPO_POR_TEST_MS = 4000;
const MAX_FALLOS_EN_CONSOLA = 2;
const EN_GITHUB = process.env.GITHUB_ACTIONS === "true";

function nombresDeTests(rutaTest) {
  const codigo = fs.readFileSync(rutaTest, "utf8");
  return [...codigo.matchAll(/^test\((["'])(.+?)\1,/gm)].map((m) => m[2]);
}

function primeraLineaDeError(lineas, desde) {
  for (let i = desde + 1; i < lineas.length && !/^(ok|not ok) \d+/.test(lineas[i]); i++) {
    const enLinea = lineas[i].match(/^\s+error: (['"])(.*)\1$/);
    if (enLinea) return traducirError(enLinea[2]);
    if (/^\s+error: \|-?$/.test(lineas[i])) return traducirError((lineas[i + 1] || "").trim());
  }
  return "";
}

function traducirError(mensaje) {
  if (/of undefined/.test(mensaje)) {
    const propiedad = (mensaje.match(/reading '([^']+)'/) || [])[1];
    if (propiedad) {
      return `Se intentó leer "${propiedad}" de algo que vale undefined: ¿olvidaste el return o te faltó validar que exista?`;
    }
    return "Tu función retorna undefined: ¿olvidaste el return?";
  }
  if (/Maximum call stack size exceeded/.test(mensaje)) {
    return "Un método se llama a sí mismo sin fin: si sobreescribiste un método, llama al del padre con super.metodo(...), no con this.metodo(...)";
  }
  if (/Must call super constructor/.test(mensaje)) {
    return "Falta super(...) en el constructor de tu clase hija, o lo pusiste después de usar this: super(...) va primero";
  }
  const sinNew = mensaje.match(/Class constructor (\w+) cannot be invoked without 'new'/);
  if (sinNew) {
    return `Para crear un objeto de la clase ${sinNew[1]} falta new: new ${sinNew[1]}(...)`;
  }
  const metodo = mensaje.match(/\.(\w+) is not a function/);
  if (metodo) {
    return `No encuentro el método ${metodo[1]}(): ¿lo escribiste dentro de la clase con ese nombre exacto (o borraste el module.exports)?`;
  }
  if (/is not a function/.test(mensaje)) {
    return "No encuentro tu función: ¿le cambiaste el nombre o borraste el module.exports?";
  }
  if (/^(require|module) is not defined/.test(mensaje)) {
    return "Mezclaste import/export con require/module.exports: en este repo usa solo require y module.exports";
  }
  const sinDefinir = mensaje.match(/^(\w+) is not defined/);
  if (sinDefinir) {
    return `"${sinDefinir[1]}" no existe en tu archivo: ¿la importaste con require o escribiste bien el nombre?`;
  }
  const noEsClase = mensaje.match(/^(\w+) is not a constructor/);
  if (noEsClase) {
    return `"${noEsClase[1]}" no es una clase: ¿la exportaste con module.exports en su archivo?`;
  }
  return mensaje;
}

// Si el archivo ni siquiera se pudo cargar (require mal escrito, clase sin exportar…),
// no hay tests que leer: se explica el error de carga.
function errorDeCarga(stderr) {
  const archivo = (stderr.match(/(ejercicios[\\/][\w.-]+)/) || [])[1];
  const donde = archivo ? ` (en ${archivo.replace(/\\/g, "/")})` : "";
  const modulo = stderr.match(/Cannot find module '([^']+)'/);
  if (modulo) {
    return `No encuentro el archivo "${modulo[1]}" que pides con require${donde}: revisa el nombre y que empiece con ./`;
  }
  if (/Class extends value undefined/.test(stderr)) {
    return `La clase de la que heredas llegó como undefined${donde}: ¿la importaste con require y su archivo tiene module.exports?`;
  }
  const linea = (stderr.match(/^\w*Error: .*$/m) || [])[0];
  return linea ? `Tu archivo no se pudo cargar${donde}: ${traducirError(linea.replace(/^\w*Error: /, ""))}` : "";
}

function ejecutar(rutaTest, extra, tiempoMaximo) {
  const proceso = spawnSync(process.execPath, ["--test-reporter=tap", ...extra, rutaTest], {
    cwd: RAIZ,
    encoding: "utf8",
    timeout: tiempoMaximo,
  });
  const lineas = (proceso.stdout || "").split(/\r?\n/);
  const fallidos = [];
  let pasados = 0;

  lineas.forEach((linea, i) => {
    if (/^ok \d+ - /.test(linea)) pasados++;
    const fallo = linea.match(/^not ok \d+ - (.*)$/);
    if (fallo) fallidos.push({ nombre: fallo[1], mensaje: primeraLineaDeError(lineas, i) });
  });

  return {
    pasados,
    fallidos,
    agotado: Boolean(proceso.error && proceso.error.code === "ETIMEDOUT"),
    sintaxis: /SyntaxError/.test(proceso.stderr || ""),
    stderr: proceso.stderr || "",
  };
}

function escaparRegex(texto) {
  return texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Si un test se queda en un ciclo infinito, se corre cada test por separado
// para no perder la nota de los que sí pasan.
function ejecutarUnoPorUno(rutaTest, nombres) {
  const resultado = { pasados: 0, fallidos: [] };
  for (const nombre of nombres) {
    const r = ejecutar(rutaTest, [`--test-name-pattern=^${escaparRegex(nombre)}$`], TIEMPO_POR_TEST_MS);
    if (r.agotado) {
      resultado.fallidos.push({ nombre, mensaje: "Tiempo agotado: posible ciclo infinito" });
    } else {
      resultado.pasados += Math.min(r.pasados, 1);
      resultado.fallidos.push(...r.fallidos);
    }
  }
  return resultado;
}

function correrEjercicio(ejercicio) {
  const rutaTest = path.join(RAIZ, ejercicio.test);
  const nombres = nombresDeTests(rutaTest);
  const total = nombres.length;
  let r = ejecutar(rutaTest, [], TIEMPO_MAXIMO_MS);

  let aviso = "";
  if (r.agotado) {
    aviso = "Tiempo agotado: revisa si tienes un ciclo infinito.";
    r = ejecutarUnoPorUno(rutaTest, nombres);
  } else if (r.sintaxis) {
    const archivo = (r.stderr.match(/(ejercicios[\\/][\w.-]+)/) || [])[1];
    const donde = archivo ? `en ${archivo.replace(/\\/g, "/")}` : "en tu archivo";
    aviso = `Hay un error de sintaxis (SyntaxError) ${donde}: revisa paréntesis, llaves y comillas.`;
  } else if (r.pasados === 0 && r.fallidos.length === 0) {
    aviso = errorDeCarga(r.stderr);
  }

  return {
    id: ejercicio.id,
    titulo: ejercicio.titulo,
    pasados: Math.min(r.pasados, total),
    total,
    fallidos: r.fallidos,
    aviso,
  };
}

function calcularNota(resultados) {
  const pasados = resultados.reduce((suma, r) => suma + r.pasados, 0);
  const total = resultados.reduce((suma, r) => suma + r.total, 0);
  const nota = total === 0 ? 0 : Math.round((pasados / total) * 50) / 10;
  return { pasados, total, nota };
}

function icono(r) {
  if (r.pasados === r.total) return "✅";
  return r.pasados > 0 ? "🟡" : "❌";
}

function imprimirEnConsola(resultados, resumen) {
  console.log(`\n${CONFIG.curso} · Resultados de tus ejercicios\n`);
  for (const r of resultados) {
    console.log(`${icono(r)} ${r.id} ${r.titulo.padEnd(24)} ${r.pasados}/${r.total} tests`);
    if (r.aviso) console.log(`     ⚠️  ${r.aviso}`);
    for (const f of r.fallidos.slice(0, MAX_FALLOS_EN_CONSOLA)) {
      console.log(`     ✗ ${f.nombre}`);
      if (f.mensaje) console.log(`       → ${f.mensaje}`);
    }
    const ocultos = r.fallidos.length - MAX_FALLOS_EN_CONSOLA;
    if (ocultos > 0) console.log(`     … y ${ocultos} test(s) más por corregir`);
  }
  console.log(`\n📊 Tests aprobados: ${resumen.pasados}/${resumen.total}`);
  console.log(`🎯 Nota: ${resumen.nota.toFixed(1)} / 5.0\n`);
}

function escribirResumenGithub(resultados, resumen) {
  const filas = resultados.map(
    (r) => `| ${icono(r)} | ${r.id} · ${r.titulo} | ${r.pasados}/${r.total} |`
  );
  const detalles = resultados
    .filter((r) => r.fallidos.length || r.aviso)
    .map((r) => {
      const items = r.fallidos.map((f) => `- ✗ ${f.nombre}${f.mensaje ? ` → ${f.mensaje}` : ""}`);
      if (r.aviso) items.unshift(`- ⚠️ ${r.aviso}`);
      return `**${r.id} · ${r.titulo}**\n${items.join("\n")}`;
    });

  const markdown = [
    `## 🎯 Nota: ${resumen.nota.toFixed(1)} / 5.0`,
    `Tests aprobados: **${resumen.pasados}/${resumen.total}**`,
    "",
    "| Estado | Ejercicio | Tests |",
    "|---|---|---|",
    ...filas,
    "",
    detalles.length ? "### Qué falta por corregir\n\n" + detalles.join("\n\n") : "### ¡Todo perfecto! 🎉",
  ].join("\n");

  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, markdown + "\n");
  }
  const paraArtefacto = resultados.map(({ id, pasados, total }) => ({ id, pasados, total }));
  fs.writeFileSync(path.join(RAIZ, "resultado.json"), JSON.stringify({ ejercicios: paraArtefacto }));
}

const filtro = process.argv[2];
const ejercicios = CONFIG.ejercicios.filter((e) => !filtro || e.id === filtro.padStart(2, "0"));

if (ejercicios.length === 0) {
  const ids = CONFIG.ejercicios.map((e) => e.id).join(", ");
  console.log(`No encontré el ejercicio "${filtro}". Los disponibles son: ${ids}`);
  process.exit(1);
}

const resultados = ejercicios.map(correrEjercicio);
const resumen = calcularNota(resultados);

imprimirEnConsola(resultados, resumen);
if (EN_GITHUB) escribirResumenGithub(resultados, resumen);

process.exitCode = resumen.pasados === resumen.total ? 0 : 1;
