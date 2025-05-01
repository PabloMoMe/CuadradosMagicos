let orden = 3;
const container = document.getElementById("container");
const calculateButton = document.getElementById("calcular");
const decreaseOrderButton = document.getElementById("disminuir");
const increaseOrderButton = document.getElementById("aumentar");

decreaseOrderButton.addEventListener("click", () => {
    let fractions = "";
    for (let i = 0; i < orden - 2; i++) {
        fractions = fractions + "1fr ";
    }
    fractions = fractions + "1fr;";

    let size = (orden - 1) * 10

    container.setAttribute(
        "style",
        "grid-template-columns: " + fractions +
        " grid-template-rows: " + fractions +
        " width: " + size.toString() + "vw; " +
        "height: " + size.toString() + "vh;"
    );

    for (let i = 0; i < orden ** 2 - (orden - 1) ** 2; i++) {
        container.removeChild(container.lastElementChild);
    }
    orden--;
});

increaseOrderButton.addEventListener("click", () => {
    let fractions = "";

    for (let i = 0; i < orden; i++) {
        fractions = fractions + "1fr ";
    }
    fractions = fractions + "1fr;";

    let size = (orden + 1) * 10

    container.setAttribute(
        "style",
        "grid-template-columns: " + fractions +
        " grid-template-rows: " + fractions +
        " width: " + size.toString() + "vw; " +
        "height: " + size.toString() + "vh;"
    );

    for (let i = 0; i < (orden + 1) ** 2 - orden ** 2; i++) {
        let child = container.lastElementChild.cloneNode(true);
        container.appendChild(child);
    }
    orden++;
});

calculateButton.addEventListener("click", () => {
    cleanMessages();
    let listaNumeros = [];
    let inputList = document.querySelectorAll('section.container > div.numero > input');
    inputList.forEach((x) => listaNumeros.push(x.value));

    listaNumeros = listaNumeros.map((x) => x = parseInt(x, 10)); // intentar con foreach
    const constanteMagica = orden * (orden ** 2 + 1) / 2;

    let isNOrderMagicSquare = nOrderMagicSquareCheck(listaNumeros, orden, constanteMagica);
    semiMagicSquareCheck(listaNumeros, orden, constanteMagica);
    isPandiagonal = pandiagonalSquareCheck(listaNumeros, orden, constanteMagica, isNOrderMagicSquare);;
    antiMagicSquaresCheck(listaNumeros, orden);
    primeSquareCheck(listaNumeros, orden, constanteMagica);
    isAssociative = associativeSquareCheck(listaNumeros, orden);
    isCompactSquare = compactMagicSquareCheck(listaNumeros, orden, constanteMagica);
    isCompleteSquare = completeMagicSquareCheck(listaNumeros, orden, constanteMagica);
    supermagicSquareCheck(isCompactSquare, isCompleteSquare);
    ultramagicSquareCheck(isPandiagonal, isAssociative);

})

function supermagicSquareCheck(isCompactSquare, isCompleteSquare){
    if (!isCompactSquare) {
        sendMessage("No es un cuadrado compacto, por lo que no es un cuadrado supermágico");
        return false;
    }

    if (!isCompleteSquare) {
        sendMessage("No es un cuadrado completo, por lo que no es un cuadrado supermágico");
        return false;
    }

    sendMessage("Es un cuadrado supermágico de orden " + orden.toString());
}

function ultramagicSquareCheck(isPandiagonal, isAssociative){
    if (!isPandiagonal) {
        sendMessage("No es un cuadrado pandiagonal, por lo que no es un cuadrado ultramágico");
        return false;
    }

    if (!isAssociative) {
        sendMessage("No es un cuadrado asociativo, por lo que no es un cuadrado ultramágico");
        return false;
    }

    sendMessage("Es un cuadrado supermágico de orden " + orden.toString());
}

function nOrderMagicSquareCheck(listaNumeros, orden, constanteMagica) {
    if (!rowsCheck(listaNumeros, orden, constanteMagica)) { return false};
    if (!columnsCheck(listaNumeros, orden, constanteMagica)) { return false};
    if (!diagonalsCheck(listaNumeros, orden, constanteMagica)) { return false};

    sendMessage("Es un cuadrado mágico normal de orden " + orden.toString());
    return true;
}

function semiMagicSquareCheck(listaNumeros, orden, constanteMagica) {
    if (!rowsCheck(listaNumeros, orden, constanteMagica)) { return };
    if (!columnsCheck(listaNumeros, orden, constanteMagica)) { return };

    sendMessage("Es un cuadrado semimágico de orden " + orden.toString())
}

function pandiagonalSquareCheck(listaNumeros, orden, constanteMagica, isNOrderMagicSquare) {
    if (!brokenDiagonalsCheck(listaNumeros, orden, constanteMagica)) { return false};
    if (!isNOrderMagicSquare) {
        sendMessage("No es un cuadrado mágico normal, por lo que no es panmágico")
        return false
    };

    sendMessage("Es un cuadrado panmágico de orden " + orden.toString())
}

/* function heteroMagicSquareCheck(listaNumeros, orden) {
    sumsRows = getSumInRows(listaNumeros, orden);
    sumsColumns = getSumInColumns(listaNumeros, orden);
    sumDiagonals = getSumInDiagonals(listaNumeros, orden);

    sums = sumsRows.concat(sumsColumns, sumDiagonals);
    sumsSet = new Set(sums);

    if (sums.length != sumsSet.size) {
        sendMessage("Existen 2 sumas de filas/columnas/diagonales iguales, por lo que no es heterocuadrado ni un cuadrado antimágico");
        return false;
    }

    sendMessage("Es un heterocuadrado de orden " + orden.toString());
    return true;
} */

function antiMagicSquaresCheck(listaNumeros, orden) {
    sumsRows = getSumInRows(listaNumeros, orden);
    sumsColumns = getSumInColumns(listaNumeros, orden);
    sumDiagonals = getSumInDiagonals(listaNumeros, orden);

    sums = sumsRows.concat(sumsColumns, sumDiagonals);
    sums.sort();
    sumsSet = new Set(sums);

    if (sums.length != sumsSet.size) {
        sendMessage("Existen 2 sumas de filas/columnas/diagonales iguales, por lo que no es heterocuadrado ni un cuadrado antimágico");
        return false;
    }

    sendMessage("Es un heterocuadrado de orden " + orden.toString());

    if (sums[sums.length - 1] - sums[0] != orden * 2 + 1) {
        sendMessage("No existe una sucesion con las sumas, por lo que el cuadrado no es antimágico");
        return false;
    }

    sendMessage("Es un cuadrado antimágico de orden " + orden.toString());
    return true;
}

function isPrimeNumbers(listaNumeros) {
    listaNumeros.forEach((x) => {
        if (!isPrimeNumber(x)) {
            return false;
        }
    });
    return true;
}

function isPrimeNumber(number) {
    if (number <= 1) { return false; }

    for (let i = 2; i <= number / 2; i++) {
        if (number % i == 0) {
            return false;
        }
    }

    return true;
}

function primeSquareCheck(listaNumeros, orden) {
    constanteMagica=obtainMagicConstant(listaNumeros,orden);

    if (!isPrimeNumbers(listaNumeros)) {
        sendMessage("Los números no son primos, por lo que no es un cuadrado primo");
        return false
    };

    if (!rowsCheck(listaNumeros, orden, constanteMagica)) {
        sendMessage("Falla en una fila, por lo que no es cuadrado mágico");
        return false
    };

    if (!columnsCheck(listaNumeros, orden, constanteMagica)) {
        sendMessage("Falla en una columna, por lo que no es cuadrado mágico");
        return false
    };

    if (!diagonalsCheck(listaNumeros, orden, constanteMagica)) {
        sendMessage("Falla en una diagonal, por lo que no es cuadrado mágico");
        return false
    };

    sendMessage("Es un cuadrado primo de orden " + orden.toString());
}

function associativeSquareCheck(listaNumeros, orden) {
    for (let i = 0; i < listaNumeros.length / 2; i++) {
        let sum = listaNumeros[i] + listaNumeros[listaNumeros.length - i - 1];

        if (sum != orden ** 2 + 1) {
            casilla=i+1
            sendMessage("La suma en la casilla "+ casilla.toString() +" sale " + sum.toString() + " por lo que el cuadrado no es asociativo");
            return false;
        }

    }

    sendMessage("Es cuadrado asociativo de orden " + orden.toString())
    return true;
}
function compactMagicSquareCheck(listaNumeros, orden, constanteMagica) {
    if (orden % 4 != 0) {
        sendMessage("El orden debe ser 4K, K numero entero, por lo que no es un cuadrado compacto");
        return false;
    }
    const k = orden / 4;

    for (let i = 0; i < orden - 1; i++) {

        for (let j = 0; j < orden - 1; j++) {
            totalSum = 0;
            casilla = i * orden + j;
            totalSum += listaNumeros[casilla];
            totalSum += listaNumeros[casilla + 1];
            totalSum += listaNumeros[casilla + orden];
            totalSum += listaNumeros[casilla + orden + 1];

            if (totalSum != constanteMagica / k) {
                casilla=casilla+1
                sendMessage("Falla en la casilla 2x2 j= " + casilla.toString() + ", por lo que no es un cuadrado compacto");
                return false;
            }
        }
    }

    for (let i = 0; i < orden - 1; i++) {
        totalSum = 0;
        casilla = i;
        totalSum += listaNumeros[casilla];
        totalSum += listaNumeros[casilla + 1];
        totalSum += listaNumeros[casilla + listaNumeros.length - orden];
        totalSum += listaNumeros[casilla + listaNumeros.length - orden + 1];

        if (totalSum != constanteMagica / k) {
            casilla=casilla+1
            sendMessage("Falla en la casilla frontera fila 2x2 j= " + casilla.toString()+ ", por lo que no es un cuadrado compacto");
            return false;
        }
    }

    for (let i = 0; i < orden - 1; i++) {
        totalSum = 0;
        casilla = i * orden;
        totalSum += listaNumeros[casilla];
        totalSum += listaNumeros[casilla + orden - 1];
        totalSum += listaNumeros[casilla + orden];
        totalSum += listaNumeros[casilla + 2 * orden - 1];

        if (totalSum != constanteMagica / k) {
            casilla=casilla+1
            sendMessage("Falla en la casilla columna fila 2x2 j= " + casilla.toString() + ", por lo que no es un cuadrado compacto");
            return false;
        }
    }


    sendMessage("Es un cuadrado compacto de orden " + orden.toString());
    return true;
}


function completeMagicSquareCheck(listaNumeros, orden, constanteMagica) {
    if (orden % 2 != 0) {
        sendMessage("El orden debe ser 2K, K un numero entero, por lo que no es un cuadrado completo")
        return false;
    }
    k = orden / 2;


    for (let i = 0; i < orden / 2; i++) {
        for (let j = 0; j < orden / 2; j++) {
            totalSum = 0;
            casilla = j + i * orden;
            totalSum += listaNumeros[casilla];
            totalSum += listaNumeros[casilla + orden ** 2 / 2 + orden / 2];

            if (totalSum != constanteMagica / k) {
                sendMessage("Falla en la casilla " + casilla.toString()+ ", por lo que no es un cuadrado completo")
                return false;
            }
        }

        for (let j = orden / 2; j < orden; j++) {
            totalSum = 0;
            casilla = j + i * orden;
            totalSum += listaNumeros[casilla];
            totalSum += listaNumeros[casilla + orden ** 2 / 2 - orden / 2];

            if (totalSum != constanteMagica / k) {
                sendMessage("Falla en la casilla " + casilla.toString()+ ", por lo que no es un cuadrado completo")
                return false;
            }
        }

    }

    sendMessage("Es un cuadrado completo de orden " + orden.toString());
    return true;
}

function obtainMagicConstant(listaNumeros, orden) {
    let totalSum = 0;

    for (let i = 0; i < orden; i++) {
        totalSum += listaNumeros[i]
    }

    return totalSum
}

function sendMessage(texto) {
    li = document.createElement("li");
    li.innerHTML = texto;
    document.getElementById("propiedades").appendChild(li);
}

function cleanMessages() {
    document.getElementById("propiedades").textContent = '';
}

function rowsCheck(listaNumeros, orden, constanteMagica) {
    // Path check: Right -> Down
    const sumsRows = getSumInRows(listaNumeros, orden)

    for (let i = 0; i < sumsRows.length; i++) {
        if (sumsRows[i] != constanteMagica) {
            fila=i+1;
            sendMessage("Falla en la " + fila.toString() +"º fila, por lo que no es un cuadrado mágico/semimágico");
            return false;
        }
    }

    return true
}

function getSumInRows(listaNumeros, orden) {
    let sumsRows = []
    for (let i = 0; i < orden; i++) {
        let totalSum = 0;

        for (let j = 0; j < orden; j++) {
            totalSum += listaNumeros[i * orden + j];
        }
        sumsRows.push(totalSum);
    }
    return sumsRows;
}

function columnsCheck(listaNumeros, orden, constanteMagica) {
    // Path check: Down -> Right
    const sumsColumns = getSumInColumns(listaNumeros, orden)

    for (let i = 0; i < sumsColumns.length; i++) {
        if (sumsColumns[i] != constanteMagica) {
            columna=i+1;
            sendMessage("Falla en la " + columna.toString() +"º columna, por lo que no es un cuadrado mágico/semimágico");
            return false;
        }
    }

    return true
}

function getSumInColumns(listaNumeros, orden) {
    let sumsColumns = []
    for (let i = 0; i < orden; i++) {
        let totalSum = 0;

        for (let j = 0; j < orden; j++) {
            totalSum += listaNumeros[i + j * orden];
        }

        sumsColumns.push(totalSum);
    }
    return sumsColumns;
}

function diagonalsCheck(listaNumeros, orden, constanteMagica) {
    const sumsDiagonals = getSumInDiagonals(listaNumeros, orden)


    if (sumsDiagonals[0] != constanteMagica) {
        sendMessage("Falla en la diagonal principal, por lo que no es un cuadrado mágico normal")
        return false;
    }

    if (sumsDiagonals[1] != constanteMagica) {
        sendMessage("Falla en la diagonal secundaria, por lo que no es un cuadrado mágico normal")
        return false;
    }


    return true
}

function getSumInDiagonals(listaNumeros, orden) {
    let sumDiagonals = [];
    // Main diagonal
    let totalSum = 0;

    for (let i = 0; i < orden; i++) {
        totalSum += listaNumeros[i + i * orden];
    }

    sumDiagonals.push(totalSum);

    // Secondary diagonal
    totalSum = 0;

    for (let i = 0; i < orden; i++) {
        totalSum += listaNumeros[orden - i - 1 + i * orden];
    }

    sumDiagonals.push(totalSum);

    return sumDiagonals;
}

function brokenDiagonalsCheck(listaNumeros, orden, constanteMagica) {
    let bj = 2 * orden - 1; //Big jump
    let sj = orden - 1; //Small jump

    for (let i = 0; i < orden - 1; i++) {
        let totalSum = 0;
        for (let j = 0; j < i + 1; j++) {
            totalSum += listaNumeros[i + j * sj];
        }

        for (let j = 0; j < orden - i - 1; j++) {
            totalSum += listaNumeros[i + i * sj + bj + j * sj];
        }

        if (totalSum != constanteMagica) {
            diagonal=i+1;
            sendMessage("Falla en la "+ diagonal.toString() +"º diagonal quebrada, por lo que no es un cuadrado panmágico");
            return false;
        }
    }

    return true;
}