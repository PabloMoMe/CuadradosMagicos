let orden = 3;
const container = document.getElementById("container");
const calculateButton = document.getElementById("calcular");
const decreaseOrderButton = document.getElementById("disminuir");
const increaseOrderButton = document.getElementById("aumentar");

decreaseOrderButton.addEventListener("click", () => {
    let fractions = "";
    for (let i = 0; i < orden-2; i++) {
        fractions=fractions+"1fr ";
    }
    fractions=fractions+"1fr;";

    let size = (orden-1)*10

    container.setAttribute(
        "style",
        "grid-template-columns: " + fractions + 
        " grid-template-rows: " + fractions +
        " width: " + size.toString() + "vw; " +
        "height: " + size.toString() + "vh;"
    );
    
    for (let i = 0; i < orden**2-(orden-1)**2; i++) {
        container.removeChild(container.lastElementChild);    
    }
    orden--;
});

increaseOrderButton.addEventListener("click", () => {
    let fractions = "";
    
    for (let i = 0; i < orden; i++) {
        fractions=fractions+"1fr ";
    }
    fractions=fractions+"1fr;";

    let size = (orden+1)*10

    container.setAttribute(
        "style",
        "grid-template-columns: " + fractions + 
        " grid-template-rows: " + fractions +
        " width: " + size.toString() + "vw; " +
        "height: " + size.toString() + "vh;"
    );
    
    for (let i = 0; i < (orden+1)**2-orden**2; i++) {
        let child = container.lastElementChild.cloneNode(true);
        container.appendChild(child); 
    }
    orden++;
});

calculateButton.addEventListener("click", () => {
    let listaNumeros = [];
    let inputList = document.querySelectorAll('section.container > div.numero > input');
    inputList.forEach((x) => listaNumeros.push(x.value));

    listaNumeros=listaNumeros.map((x) => x=parseInt(x,10)); // intentar con foreach
    const constanteMagica = orden * (orden**2+1)/2;

    magicSquareCheck(listaNumeros, orden, constanteMagica);
    semiMagicSquareCheck(listaNumeros, orden, constanteMagica);
    pandiagonalSquareCheck(listaNumeros, orden, constanteMagica);

} )

/*
    p = document.createElement("p");
    p.innerHTML = "Mágico";
    document.body.appendChild(p);
*/

function magicSquareCheck(listaNumeros, orden, constanteMagica) {
    if(!rowsCheck(listaNumeros, orden, constanteMagica)) {return};
    if(!columnsCheck(listaNumeros, orden, constanteMagica)) {return};
    if(!diagonalsCheck(listaNumeros, orden, constanteMagica)) {return};

    document.getElementById("normal").innerHTML="SI";
}

function semiMagicSquareCheck(listaNumeros, orden, constanteMagica) {
    if(!rowsCheck(listaNumeros, orden, constanteMagica)) {return};
    if(!columnsCheck(listaNumeros, orden, constanteMagica)) {return};

    document.getElementById("semimagico").innerHTML="SI";
}

function pandiagonalSquareCheck(listaNumeros, orden, constanteMagica) {
    if(!brokenDiagonalsCheck(listaNumeros, orden, constanteMagica)) {return};
    if(!rowsCheck(listaNumeros, orden, constanteMagica)) {return};
    if(!columnsCheck(listaNumeros, orden, constanteMagica)) {return};
    if(!diagonalsCheck(listaNumeros, orden, constanteMagica)) {return};
    

    document.getElementById("pandiagonal").innerHTML="SI";
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

function brokenDiagonalsCheck(listaNumeros, orden, constanteMagica) {
    let bj = 2*orden-1; //Big jump
    let sj = orden-1; //Small jump

    for (let i = 0; i < orden-1; i++) { 
        let totalSum = 0;
        let con;
        for (let j = 0; j < i+1; j++) {
            totalSum+=listaNumeros[i + j*sj];
            con = i + j*sj
            console.log("casilla" + con.toString())
        }
        
        for (let j = 0; j < orden-i-1; j++) {
            totalSum+=listaNumeros[i+i*sj +bj + j*sj];
            con = i+i*sj +bj + j*sj
            console.log("casilla" + con.toString())
        }

        console.log("suma: "+totalSum.toString())
        console.log("constante magica="+constanteMagica.toString())
        if (totalSum != constanteMagica) {
            document.getElementById("pandiagonal").innerHTML="NO en la diagonal quebrada " + i.toString();
            return false;
        }
    }

    
}



