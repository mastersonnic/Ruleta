window.onload = function() {
    document.getElementById('convert').onclick = function() {
        var amount = document.getElementById('amount').value;
        var fromCurrency = document.getElementById('from-currency').value;
        var toCurrency = document.getElementById('to-currency').value;

        // Aquí se debería poner la URL real si estuvieras haciendo una solicitud a un servidor
        var url = `https://crypto-store.cc/?locale=en&cur_from=${fromCurrency}&cur_to=${toCurrency}`;

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                var parser = new DOMParser();
                var doc = parser.parseFromString(xhr.responseText, 'text/html');
                
                var exchangeRateElement = doc.querySelector('.ng-tns-c3154908617-11.ng-star-inserted');
                
                if (exchangeRateElement) {
                    var exchangeRate = exchangeRateElement.textContent.trim();
                    var convertedAmount = (amount * parseFloat(exchangeRate)).toFixed(2);
                    document.getElementById('exchange-rate').textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
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
};
