document.addEventListener("DOMContentLoaded", function() {
    // Obtener la ruta actual
    const currentPath = window.location.pathname;

    // Obtener el botón de reportes por su ID
    const Button1 = document.getElementById("button1");
    console.log(currentPath);

    // Si la ruta es '/leads/reports', cambia el color a azul
    if (currentPath === '/leads/upload') {
        Button1.classList.add("text-blue-700");
        Button1.classList.remove("text-gray-900");
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // Obtener la ruta actual
    const currentPath = window.location.pathname;

    // Obtener el botón de reportes por su ID
    const Button2 = document.getElementById("button2");

    // Si la ruta es '/leads/reports', cambia el color a azul
    if (currentPath === '/leads/reports') {
        Button2.classList.add("text-blue-700");
        Button2.classList.remove("text-gray-900");
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // Obtener la ruta actual
    const currentPath = window.location.pathname;

    // Obtener el botón de reportes por su ID
    const Button3 = document.getElementById("button3");

    // Si la ruta es '/leads/reports', cambia el color a azul
    if (currentPath === '/user') {
        Button3.classList.add("text-blue-700");
        Button3.classList.remove("text-gray-900");
    }
});

