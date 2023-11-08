// Obtener elementos del DOM
const titulo = document.getElementById("titulo");
const totalIngresos = document.getElementById("totalIngresos");
const totalEgresos = document.getElementById("totalEgresos");
const porcentajeGastos = document.getElementById("porcentajeGastos");
const tipoTransaccion = document.getElementById("tipoTransaccion");
const descripcion = document.getElementById("descripcion");
const monto = document.getElementById("monto");
const agregarTransaccion = document.getElementById("agregarTransaccion");
const tabIngresos = document.getElementById("tabIngresos");
const tabEgresos = document.getElementById("tabEgresos");
const listaTransacciones = document.getElementById("listaTransacciones");

// Datos iniciales
let ingresos = [];
let egresos = [];

// Función para actualizar el resumen
function actualizarResumen() {
    const totalIngresosValue = ingresos.reduce((total, ingreso) => total + ingreso.monto, 0);
    const totalEgresosValue = egresos.reduce((total, egreso) => total + egreso.monto, 0);
    
    totalIngresos.textContent = `$${totalIngresosValue.toFixed(2)}`;
    totalEgresos.textContent = `$${totalEgresosValue.toFixed(2)}`;
    
    const porcentaje = (totalEgresosValue / totalIngresosValue) * 100;
    porcentajeGastos.textContent = `${porcentaje.toFixed(2)}%`;
}

// Función para agregar una transacción
function agregarTransaccionHandler() {
    const tipo = tipoTransaccion.value;
    const descripcionValue = descripcion.value.trim();
    const montoValue = parseFloat(monto.value);

    if (!descripcionValue || isNaN(montoValue) || montoValue <= 0) {
        alert("Por favor, ingresa una descripción válida y un monto válido.");
        return;
    }

    const transaccion = { descripcion: descripcionValue, monto: montoValue };

    if (tipo === "Ingreso") {
        ingresos.push(transaccion);
    } else {
        egresos.push(transaccion);
    }

    actualizarResumen();
    actualizarListaTransacciones();
    
    // Limpiar campos
    descripcion.value = "";
    monto.value = "";
}

// Función para mostrar la lista de transacciones
function actualizarListaTransacciones() {
    listaTransacciones.innerHTML = "";

    if (tabIngresos.classList.contains("active")) {
        for (const ingreso of ingresos) {
            const item = document.createElement("div");
            item.textContent = `${ingreso.descripcion}: $${ingreso.monto.toFixed(2)}`;
            listaTransacciones.appendChild(item);
        }
    } else if (tabEgresos.classList.contains("active")) {
        for (const egreso of egresos) {
            const item = document.createElement("div");
            item.textContent = `${egreso.descripcion}: $${egreso.monto.toFixed(2)}`;
            listaTransacciones.appendChild(item);
        }
    }
}

// Eventos
agregarTransaccion.addEventListener("click", agregarTransaccionHandler);

tabIngresos.addEventListener("click", () => {
    tabIngresos.classList.add("active");
    tabEgresos.classList.remove("active");
    actualizarListaTransacciones();
});

tabEgresos.addEventListener("click", () => {
    tabEgresos.classList.add("active");
    tabIngresos.classList.remove("active");
    actualizarListaTransacciones();
});

// Inicialización
const fechaActual = new Date();
const mesActual = fechaActual.toLocaleString("default", { month: "long" });
const añoActual = fechaActual.getFullYear();
titulo.textContent = `Presupuesto de ${mesActual} ${añoActual}`;
