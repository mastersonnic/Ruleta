window.onload = function() {
    fetch('https://crypto-store.cc/?locale=en&cur_from=LTC&cur_to=BCH')
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            // Cambia el selector si es necesario para ajustar a la estructura actual
            const exchangeRateElement = doc.querySelector('.ng-tns-c3154908617-11.ng-star-inserted');
            if (exchangeRateElement) {
                const exchangeRate = exchangeRateElement.textContent.trim();
                document.getElementById('exchange-rate').textContent = `Exchange rate: ${exchangeRate}`;
            } else {
                document.getElementById('exchange-rate').textContent = 'Exchange rate not found.';
            }
        })
        .catch(error => {
            console.error('Error fetching the page:', error);
            document.getElementById('exchange-rate').textContent = 'Error fetching the exchange rate.';
        });
};
