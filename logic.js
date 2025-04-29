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
    let listaNumeros = [];
    let inputList = document.querySelectorAll('section.container > div.numero > input');
    inputList.forEach((x) => listaNumeros.push(x.value));

    listaNumeros = listaNumeros.map((x) => x = parseInt(x, 10)); // intentar con foreach
    const constanteMagica = orden * (orden ** 2 + 1) / 2;

    //magicSquareCheck(listaNumeros, orden);
    //semiMagicSquareCheck(listaNumeros, orden, constanteMagica);
    //pandiagonalSquareCheck(listaNumeros, orden, constanteMagica);
    //heteroMagicSquareCheck(listaNumeros, orden);
    //antiMagicSquareCheck(listaNumeros, orden);
    //associativeSquareCheck(listaNumeros, orden);
    //compactMagicSquareCheck(listaNumeros, orden, constanteMagica)
    completeMagicSquareCheck(listaNumeros, orden, constanteMagica)
    //isPrimeNumbers(listaNumeros);

})

/*
    p = document.createElement("p");
    p.innerHTML = "Mágico";
    document.body.appendChild(p);
*/

function magicSquareCheck(listaNumeros, orden) {
    constanteMagica = obtainMagicConstant(listaNumeros, orden);
    console.log(constanteMagica.toString());

    if (!rowsCheck(listaNumeros, orden, constanteMagica)) { return };
    if (!columnsCheck(listaNumeros, orden, constanteMagica)) { return };
    if (!diagonalsCheck(listaNumeros, orden, constanteMagica)) { return };

    document.getElementById("normal").innerHTML = "SI";
}

function semiMagicSquareCheck(listaNumeros, orden, constanteMagica) {
    if (!rowsCheck(listaNumeros, orden, constanteMagica)) { return };
    if (!columnsCheck(listaNumeros, orden, constanteMagica)) { return };

    document.getElementById("semimagico").innerHTML = "SI";
}

function pandiagonalSquareCheck(listaNumeros, orden, constanteMagica) {
    if (!brokenDiagonalsCheck(listaNumeros, orden, constanteMagica)) { return };
    if (!rowsCheck(listaNumeros, orden, constanteMagica)) { return };
    if (!columnsCheck(listaNumeros, orden, constanteMagica)) { return };
    if (!diagonalsCheck(listaNumeros, orden, constanteMagica)) { return };


    document.getElementById("pandiagonal").innerHTML = "SI";
}

function heteroMagicSquareCheck(listaNumeros, orden) {
    sumsRows = getSumInRows(listaNumeros, orden);
    sumsColumns = getSumInColumns(listaNumeros, orden);
    sumDiagonals = getSumInDiagonals(listaNumeros, orden);

    sums = sumsRows.concat(sumsColumns, sumDiagonals);
    sumsSet = new Set(sums);

    if (sums.length != sumsSet.size) {
        document.getElementById("heterocuadrado").innerHTML = "NO";
        return false;
    }

    document.getElementById("heterocuadrado").innerHTML = "SI";
}

function antiMagicSquareCheck(listaNumeros, orden) {
    sumsRows = getSumInRows(listaNumeros, orden);
    sumsColumns = getSumInColumns(listaNumeros, orden);
    sumDiagonals = getSumInDiagonals(listaNumeros, orden);

    sums = sumsRows.concat(sumsColumns, sumDiagonals);
    sums.sort();
    sumsSet = new Set(sums);

    if (sums.length != sumsSet.size) {
        document.getElementById("antimagico").innerHTML = "NO";
        return false;
    }

    if (sums[sums.length - 1] - sums[0] != orden * 2 + 1) {
        document.getElementById("antimagico").innerHTML = "NO";
        return false;
    }

    document.getElementById("antimagico").innerHTML = "SI";
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

function primeSquareCheck(listaNumeros, orden, constanteMagica) {
    if (!rowsCheck(listaNumeros, orden, constanteMagica)) { return };
    if (!columnsCheck(listaNumeros, orden, constanteMagica)) { return };
    if (!diagonalsCheck(listaNumeros, orden, constanteMagica)) { return };
    if (!isPrimeNumbers(listaNumeros)) { return };

    document.getElementById("primo").innerHTML = "SI";
}

function associativeSquareCheck(listaNumeros, orden) {
    for (let i = 0; i < listaNumeros.length / 2; i++) {
        let sum = listaNumeros[i] + listaNumeros[listaNumeros.length - i - 1];

        if (sum != orden ** 2 + 1) {
            document.getElementById("asociativo").innerHTML = "NO es asociativo, la suma sale " + sum.toString();
            return false;
        }

    }

    document.getElementById("asociativo").innerHTML = "SI";
    return true;
}
function compactMagicSquareCheck(listaNumeros, orden, constanteMagica) {
    if (orden % 4 != 0) {
        document.getElementById("asociativo").innerHTML = "El orden debe ser 4K, K numero entero";
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
                document.getElementById("compacto").innerHTML = "NO, casilla 2x2 j= " + casilla.toString();
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
            document.getElementById("compacto").innerHTML = "NO, casilla frontera fila 2x2 j= " + casilla.toString();
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
            document.getElementById("compacto").innerHTML = "NO, casilla frontera fila 2x2 j= " + casilla.toString();
            return false;
        }
    }


    document.getElementById("compacto").innerHTML = "SI";
    return true;
}


function completeMagicSquareCheck(listaNumeros, orden, constanteMagica) {
    if (orden % 2 != 0) {
        document.getElementById("completo").innerHTML = "El orden debe ser 2K";
        return false;
    }
    k = orden / 2;


    for (let i = 0; i < orden/2; i++) {
        for (let j = 0; j < orden/2; j++) {
            totalSum = 0;
            casilla = j+i*orden;
            totalSum+=listaNumeros[casilla];
            totalSum+=listaNumeros[casilla + orden**2/2 + orden/2];

            if (totalSum != constanteMagica / k) {
                document.getElementById("completo").innerHTML = "NO, casilla = " + casilla.toString();
                return false;
            }
        }

        for (let j = orden/2; j < orden; j++) {
            totalSum = 0;
            casilla = j+i*orden;
            totalSum+=listaNumeros[casilla];
            totalSum+=listaNumeros[casilla + orden**2/2 - orden/2];

            if (totalSum != constanteMagica / k) {
                document.getElementById("completo").innerHTML = "NO, casilla = " + casilla.toString();
                return false;
            }
        }

    }

    document.getElementById("completo").innerHTML = "SI";
    return true;
}

function obtainMagicConstant(listaNumeros, orden) {
    let totalSum = 0;

    for (let i = 0; i < orden; i++) {
        totalSum += listaNumeros[i]
    }

    return totalSum
}

function rowsCheck(listaNumeros, orden, constanteMagica) {
    // Path check: Right -> Down
    const sumsRows = getSumInRows(listaNumeros, orden)

    for (let i = 0; i < sumsRows.length; i++) {
        if (sumsRows[i] != constanteMagica) {
            console.log(sumsRows[i]);
            console.log(constanteMagica);
            document.getElementById("normal").innerHTML = "NO en fila";
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
            console.log(sumsRows[i]);
            console.log(constanteMagica);
            document.getElementById("normal").innerHTML = "NO en columna";
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

    for (let i = 0; i < sumsDiagonals.length; i++) {
        if (sumsDiagonals[i] != constanteMagica) {
            console.log(sumsDiagonals[i]);
            console.log(constanteMagica);
            document.getElementById("normal").innerHTML = "NO en diagonal";
            return false;
        }
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
        let con;
        for (let j = 0; j < i + 1; j++) {
            totalSum += listaNumeros[i + j * sj];
        }

        for (let j = 0; j < orden - i - 1; j++) {
            totalSum += listaNumeros[i + i * sj + bj + j * sj];
        }

        //console.log("suma: " + totalSum.toString())
        //console.log("constante magica=" + constanteMagica.toString())
        if (totalSum != constanteMagica) {
            document.getElementById("pandiagonal").innerHTML = "NO en la diagonal quebrada " + i.toString();
            return false;
        }
    }


}



