function simulateExchange() {
    var exchangeAmount = document.getElementById('exchangeAmount').value;
    var iframe = document.getElementById('webView');
    
    iframe.onload = function() {
        var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        
        var jsCode = `
            // Inyectar valor en el campo de entrada y disparar eventos
            var inputField = document.getElementById('exValueFrom');
            var outputField = document.getElementById('exValueTo');
            
            if (inputField && outputField) {
                inputField.value = '${exchangeAmount}'; // Inyectar el valor desde el campo de entrada
                inputField.dispatchEvent(new Event('input')); // Disparar el evento de entrada

                // Esperar para capturar el resultado
                setTimeout(function() {
                    var resultValue = outputField.value;
                    // Enviar el resultado de vuelta a la página principal
                    window.parent.postMessage({ type: 'result', value: resultValue }, '*');
                }, 2000);
            }
        `;
        
        var script = iframeDocument.createElement('script');
        script.type = 'text/javascript';
        script.text = jsCode;
        iframeDocument.head.appendChild(script);
    };

    window.addEventListener('message', function(event) {
        if (event.data.type === 'result') {
            document.getElementById('resultViewer').value = event.data.value;
        }
    });
}
