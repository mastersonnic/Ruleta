document.addEventListener('DOMContentLoaded', function() {
    // URL del proxy de CORS Anywhere
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    
    // URL del sitio que deseas cargar
    const targetUrl = 'https://exchanging.app/pro/en/?cur_from=LTC&cur_to=BCH';

    // Función para realizar la solicitud y obtener la página
    function fetchExchangePage() {
        fetch(proxyUrl + targetUrl)
            .then(response => response.text())
            .then(contents => {
                // Crear un nuevo iframe para mostrar el contenido
                const iframe = document.createElement('iframe');
                iframe.style.width = '100%';
                iframe.style.height = '600px';
                iframe.srcdoc = contents;
                document.body.appendChild(iframe);

                // Simular la entrada de datos en el input
                iframe.onload = function() {
                    const inputScript = `
                        document.getElementById('exValueFrom').value = '1.0';
                        document.getElementById('exValueFrom').dispatchEvent(new Event('input'));
                    `;
                    iframe.contentWindow.eval(inputScript);

                    // Capturar el valor de salida y mostrarlo en otro lugar
                    setTimeout(function() {
                        const outputValue = iframe.contentWindow.document.getElementById('exValueTo').value;
                        const resultDisplay = document.createElement('p');
                        resultDisplay.textContent = 'Resultado: ' + outputValue;
                        document.body.appendChild(resultDisplay);
                    }, 2000);  // Espera 2 segundos para asegurar que la página cargue
                };
            })
            .catch(err => console.error("Error al cargar la página:", err));
    }

    // Llamar a la función para cargar y manipular la página
    fetchExchangePage();
});
