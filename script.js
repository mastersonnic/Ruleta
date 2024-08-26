window.onload = function() {
    fetch('https://crypto-store.cc/?locale=en&cur_from=LTC&cur_to=BCH')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok. Status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const exchangeRateElement = doc.querySelector('.ng-tns-c3154908617-11.ng-star-inserted');
            if (exchangeRateElement) {
                const exchangeRate = exchangeRateElement.textContent.trim();
                document.getElementById('exchange-rate').textContent = `Exchange rate: ${exchangeRate}`;
            } else {
                document.getElementById('exchange-rate').textContent = 'Exchange rate element not found.';
            }
        })
        .catch(error => {
            console.error('Error fetching the page:', error);
            document.getElementById('exchange-rate').textContent = 'Error fetching the exchange rate.';
        });
};
