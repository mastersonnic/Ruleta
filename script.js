window.onload = function() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://crypto-store.cc/?locale=en&cur_from=LTC&cur_to=BCH', true);

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(xhr.responseText, 'text/html');
            
            var exchangeRateElement = doc.querySelector('.ng-tns-c3154908617-11.ng-star-inserted');
            
            if (exchangeRateElement) {
                var exchangeRateText = exchangeRateElement.textContent.trim();
                var exchangeRateMatch = exchangeRateText.match(/1 BCH = ([\d.]+) LTC/);
                if (exchangeRateMatch) {
                    window.exchangeRateBCHtoLTC = parseFloat(exchangeRateMatch[1]);
                    window.exchangeRateLTCtoBCH = 1 / window.exchangeRateBCHtoLTC;
                    document.getElementById('exchange-rate').textContent = exchangeRateText;
                } else {
                    document.getElementById('exchange-rate').textContent = 'Error parsing the exchange rate.';
                }
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

function convertBCHtoLTC() {
    var amount = parseFloat(document.getElementById('amount').value);
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }
    var result = amount * (window.exchangeRateBCHtoLTC || 0);
    document.getElementById('result').value = result.toFixed(8) + ' LTC';
}

function convertLTCtoBCH() {
    var amount = parseFloat(document.getElementById('amount').value);
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }
    var result = amount * (window.exchangeRateLTCtoBCH || 0);
    document.getElementById('result').value = result.toFixed(8) + ' BCH';
}
