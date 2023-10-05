document.addEventListener("DOMContentLoaded", function() {
    // Obtener la ruta actual
    const currentPath = window.location.pathname;

    // Obtener el botón de reportes por su ID
    const reportesButton = document.getElementById("reportsButton");

    // Si la ruta es '/leads/reports', cambia el color a azul
    if (currentPath === '/leads/reports') {
        reportesButton.classList.add("text-blue-700");
        reportesButton.classList.remove("text-gray-900");
    }
});

export default buttonLogic;