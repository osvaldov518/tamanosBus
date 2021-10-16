const tamanosBus = async (event) => {
    // TODO implement
    
    var grupos = JSON.parse("["+event.groups+"]"); // capturo el objeto "groups" y lo transformo en un array.
    
    var xMax = 0;
    for (var i = 0; i < grupos.length; i++) {
        xMax +=grupos[i]; // sumo la cantidad de cada grupo para obtener el x (tamaño del bus), mas grande.
    }
    
    var vSizes = [];
    
    var maxGrupo = Math.max.apply(Math, grupos); // obtengo el tamaño del grupo mas grande.
    
    for (var j = maxGrupo; j < xMax; j++) { // Inicio el ciclo con el tamaño minimo del bus que siempre será el grupo mas grande.
        if (xMax%j == 0) { // la operacion modulo me permite obtener los divisores (posibles tamaños del bus), del total de pasajeros.
            vSizes.push(j);
        }
    }

    vSizes.push(xMax);
    
    // ******* Con esta logica se valida el resultado es correcto con el primer ciclo ********
    // ******* Si hay fallos se corrige el resultado. 
    
    var suma = 0;
    
    for (var k = 0; k < vSizes.length; k++) {
        for (var l = 0; l < grupos.length; l++) {
            suma += grupos[l];
            if (suma == vSizes[k]) {
                suma = 0;
                continue;
            } else if ((suma > vSizes[k]) && (vSizes.length > 1)) {
                vSizes.shift();
                k = -1;
                break;
            }
        }
    }
    
    // ****************************************************************************************
    
    vSizes = vSizes.join(','); // transformo nuevamente el array a string para poder presentarlo en el Response.
    
    const response = {
        sizes : vSizes
    };
    return response;
};

exports.handler = tamanosBus;
