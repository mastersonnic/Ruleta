function simulateExchange() {
    var amount = document.getElementById('exchangeAmount').value;
    var iframe = document.getElementById('webView');

    iframe.onload = function() {
        // Inyectar valor en el campo 'exValueFrom' y simular un cambio
        iframe.contentWindow.document.getElementById('exValueFrom').value = amount;
        
        // Ejecutar la simulación (se supone que hay un evento que hace el cálculo automáticamente)
        iframe.contentWindow.document.getElementById('exValueFrom').dispatchEvent(new Event('input'));

        // Opcional: Puedes intentar capturar el valor de salida (aunque esto puede no funcionar debido a restricciones de CORS)
        setTimeout(function() {
            var outputValue = iframe.contentWindow.document.getElementById('exValueTo').value;
            alert("Calculated Value: " + outputValue);
        }, 2000); // Esperar 2 segundos para que la simulación se ejecute
    };
}
