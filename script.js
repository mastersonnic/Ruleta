document.addEventListener("DOMContentLoaded", function() {
    const exchangeRateElement = document.getElementById('exchange-rate');

    async function fetchExchangeRate() {
        try {
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const targetUrl = 'https://crypto-store.cc/?locale=en&cur_from=LTC&cur_to=BCH';
            const response = await fetch(proxyUrl + targetUrl);
            const text = await response.text();

            const match = text.match(/1 BCH = ([\d.]+) LTC/);

            if (match && match[1]) {
                exchangeRateElement.textContent = `1 BCH = ${match[1]} LTC`;
            } else {
                exchangeRateElement.textContent = 'Exchange rate not found';
            }
        } catch (error) {
            exchangeRateElement.textContent = 'Error fetching exchange rate';
        }
    }

    fetchExchangeRate();
});
