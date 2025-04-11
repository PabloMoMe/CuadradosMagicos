const button = document.getElementById("calcular");

button.addEventListener("click", () => {
    let listaNumeros = [];
    let inputList = document.querySelectorAll('section.container > div.numero > input');
    inputList.forEach((x) => listaNumeros.push(x.value));

    listaNumeros=listaNumeros.map((x) => x=parseInt(x,10)); // intentar con foreach
    
    
    const orden = 3;
    const constanteMagica = orden * (orden**2+1)/2;
    magicSquareCheck(listaNumeros, orden, constanteMagica);

    function magicSquareCheck(listaNumeros, orden, constanteMagica) {
        if(!rowsCheck(listaNumeros, orden, constanteMagica)) {return};
        console.log("Llegue1")
        if(!columnsCheck(listaNumeros, orden, constanteMagica)) {return};
        console.log("Llegue2")
        if(!diagonalsCheck(listaNumeros, orden, constanteMagica)) {return};
        console.log("Llegue3")

        document.getElementById("normal").innerHTML="SI";

    }
    
    function rowsCheck(listaNumeros, orden, constanteMagica) {
        // Path check: Right -> Down
        for (let i = 0; i < orden; i++) {
            let totalSum = 0; 

            for (let j = 0; j < orden; j++) {
                totalSum+=listaNumeros[i*orden + j];
            }
            
            if (totalSum != constanteMagica) {
                document.getElementById("normal").innerHTML="NO en fila "+(i+1).toString();
                return false;
            }
        }

        return true
    }

    function columnsCheck(listaNumeros, orden, constanteMagica) {
        // Path check: Down -> Right
        for (let i = 0; i < orden; i++) {
            let totalSum = 0; 

            for (let j = 0; j < orden; j++) {
                totalSum+=listaNumeros[i+j*orden];
            }
            
            if (totalSum != constanteMagica) {
                document.getElementById("normal").innerHTML="NO en columna "+(i+1).toString();
                return false;
            }
        }

        return true
    }

    function diagonalsCheck(listaNumeros, orden, constanteMagica) {
        // Main diagonal
        let totalSum = 0;

        for (let i = 0; i < orden; i++) { 
            totalSum+=listaNumeros[i + i*orden];    
        }

        if (totalSum != constanteMagica) {
            document.getElementById("normal").innerHTML="NO en diagonal principal";
            return false;
        }

        // Secondary diagonal
        totalSum = 0;

        for (let i = 0; i < orden; i++) {
            totalSum+=listaNumeros[orden-i-1 + i*orden];
        }

        if (totalSum != constanteMagica) {
            document.getElementById("normal").innerHTML="NO en diagonal secundaria";
            return false;
        }

        return true
    }

} )










/*
if (sumnum==constanteMagica){
    console.log("Se cumple")
}
else{
    console.log("No se cumple") 
}
    */

