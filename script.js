window.onload = function() {
    var xhr = new XMLHttpRequest();
    
    // Aquí se debería poner la URL real si estuvieras haciendo una solicitud a un servidor
    xhr.open('GET', 'https://crypto-store.cc/?locale=en&cur_from=LTC&cur_to=BCH', true);

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Procesar la respuesta del servidor
            var parser = new DOMParser();
            var doc = parser.parseFromString(xhr.responseText, 'text/html');
            
            // Buscar el elemento que contiene la tasa de intercambio
            var exchangeRateElement = doc.querySelector('.ng-tns-c3154908617-11.ng-star-inserted');
            
            if (exchangeRateElement) {
                // Extraer el texto de la tasa de intercambio
                var exchangeRate = exchangeRateElement.textContent.trim();
                // Mostrar la tasa de intercambio en el elemento #exchange-rate
                document.getElementById('exchange-rate').textContent = exchangeRate;
            } else {
                document.getElementById('exchange-rate').textContent = 'Exchange rate element not found.';
            }
        } else {
            document.getElementById('exchange-rate').textContent = 'Error fetching the exchange rate.';
        }
    };

    xhr.onerror = function() {
        document.getElementById('exchange-rate').textContent = 'Request failed.';
    };

    xhr.send();
};
