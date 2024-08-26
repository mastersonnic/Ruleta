window.onload = function() {
    // Objeto para almacenar los tipos de cambio
    var exchangeRates = {};

    // Función para convertir el monto basado en el tipo de cambio
    function convertAmount() {
        var amount = parseFloat(document.getElementById('amount').value);
        var fromCurrency = document.getElementById('from-currency').value;
        var toCurrency = document.getElementById('to-currency').value;
        var key = fromCurrency + '-' + toCurrency;

        if (exchangeRates[key]) {
            var exchangeRate = exchangeRates[key];
            var convertedAmount = (amount * exchangeRate).toFixed(2);
            document.getElementById('exchange-rate').textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        } else {
            document.getElementById('exchange-rate').textContent = 'Exchange rate not available for the selected currencies.';
        }
    }

    // Función para obtener el tipo de cambio desde un servidor
    function fetchExchangeRates() {
        var xhr = new XMLHttpRequest();
        
        // Aquí deberías poner la URL real del servidor que proporciona el tipo de cambio
        xhr.open('GET', 'https://crypto-store.cc/?locale=en&cur_from=LTC&cur_to=BCH', true);

        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                var parser = new DOMParser();
                var doc = parser.parseFromString(xhr.responseText, 'text/html');
                
                // Buscar el elemento que contiene la tasa de intercambio
                var ltcToBchElement = doc.querySelector('.ng-tns-c3154908617-11.ng-star-inserted');
                
                if (ltcToBchElement) {
                    var ltcToBchRate = parseFloat(ltcToBchElement.textContent.trim());
                    var bchToLtcRate = 1 / ltcToBchRate; // Suponiendo que la tasa inversa es simplemente el recíproco

                    // Almacenar los tipos de cambio en el objeto
                    exchangeRates['LTC-BCH'] = ltcToBchRate;
                    exchangeRates['BCH-LTC'] = bchToLtcRate;

                    // Realizar la conversión usando los datos obtenidos
                    convertAmount();
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
    }

    // Configurar el evento de clic para el botón de conversión
    document.getElementById('convert').onclick = convertAmount;

    // Obtener el tipo de cambio al cargar la página
    fetchExchangeRates();
};
