// === FRONTEND: scripts/scripts.js ===
document.addEventListener('DOMContentLoaded', () => {
    cargarMotos();

    document.getElementById('btnBuscar').addEventListener('click', () => {
        const valor = document.getElementById('inputBuscar').value.trim();
        cargarMotos(valor);
    });
});

function cargarMotos(filtroMarca = '') {
    let url = 'http://localhost:3000/motos';
    if (filtroMarca) {
        url += `?marca=${encodeURIComponent(filtroMarca)}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(motos => {
            const tbody = document.getElementById('motosTbody');
            const mensaje = document.getElementById('mensajeVacio');

            tbody.innerHTML = '';

            if (motos.length === 0) {
                mensaje.style.display = 'block';
                return;
            }
            mensaje.style.display = 'none';

            motos.forEach(moto => {
                const fila = document.createElement('tr');

                fila.innerHTML = `
                    <td>${moto.marca}</td>
                    <td>${moto.modelo}</td>
                    <td>${moto.cilindrada}</td>
                    <td>${moto.tipo}</td>
                `;

                tbody.appendChild(fila);
            });
        })
        .catch(err => {
            console.error('Error cargando motos:', err);
        });
}
