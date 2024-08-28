function simulateInput() {
    var value = document.getElementById('inputValue').value;
    var iframe = document.getElementById('webView');
    
    // Obtener el documento dentro del iframe
    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    
    // Asegurarse de que el iframe esté completamente cargado
    iframe.onload = function() {
        // Inyectar el código JavaScript en el iframe
        iframe.contentWindow.postMessage({
            type: 'simulateInput',
            value: value
        }, '*');
    };

    // Escuchar los mensajes del iframe
    window.addEventListener('message', function(event) {
        if (event.data.type === 'result') {
            document.getElementById('outputValue').value = event.data.value;
        }
    });
}

// Código para escuchar los mensajes en el iframe
window.addEventListener('message', function(event) {
    if (event.data.type === 'simulateInput') {
        var iframe = document.getElementById('webView');
        var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

        // Simular la entrada en el iframe
        iframeDocument.getElementById('exValueFrom').value = event.data.value;
        iframeDocument.getElementById('exValueFrom').dispatchEvent(new Event('input'));

        // Ejecutar el cálculo y enviar el resultado
        setTimeout(function() {
            var outputValue = iframeDocument.getElementById('exValueTo').value;
            event.source.postMessage({
                type: 'result',
                value: outputValue
            }, event.origin);
        }, 2000);
    }
});
