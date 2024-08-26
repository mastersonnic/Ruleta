// Extraer el texto del div
var exchangeRateText = document.getElementById("exchangeRateDiv").innerText;

// Asignar el texto al enlace
var exchangeRateLink = document.getElementById("exchangeRateLink");
exchangeRateLink.innerText = exchangeRateText;

// Asignar la URL al enlace (opcional, si deseas cambiarla)
exchangeRateLink.href = "https://crypto-store.cc/?locale=en&cur_from=LTC&cur_to=BCH";
