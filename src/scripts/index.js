const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS59AZZTTQhPy8t1ew6cDKrOKZJIi4b-FNiaTgTnB6Hj3JDPMF0agBSYo4L9TLrQpXzGS9s2W6GcBjg/pub?output=csv";
        
async function cargarDatos() {
    const response = await fetch(sheetUrl);
    const data = await response.text();
    const rows = data.split("\n").slice(1); // Eliminar encabezados
    
    const tbody = document.querySelector("#data-table tbody");
    tbody.innerHTML = "";
    
    rows.forEach(row => {
        const cols = row.split(",");
        if (cols.length > 1) {
            const tr = document.createElement("tr");
            cols.forEach((col, index) => {
                const td = document.createElement("td");
                if (index === 1) { // Índice de la columna de enlaces de Facebook
                    const a = document.createElement("a");
                    a.href = col.trim();
                    a.target = "_blank";
                    a.textContent = "Ver en Facebook";
                    td.appendChild(a);
                } else {
                    td.textContent = col.trim();
                }
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        }
    });
}

document.addEventListener("DOMContentLoaded", cargarDatos);