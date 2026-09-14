function solveBracket(equation) {

    // ==========================================
    // BRACKET EQUATION
    // Example: 2(x+3)=14
    // ==========================================

    const equationMatch = equation.match(
        /^([+-]?\d*\.?\d*)\(x([+-]\d*\.?\d*)\)=([+-]?\d*\.?\d*)$/
    );

    if (equationMatch) {

        let a = equationMatch[1];
        let b = equationMatch[2];
        let c = equationMatch[3];

        if (a === "" || a === "+") {
            a = 1;
        }
        else if (a === "-") {
            a = -1;
        }
        else {
            a = Number(a);
        }

        b = b === "" ? 0 : Number(b);
        c = c === "" ? 0 : Number(c);

        const x = (c / a) - b;

        console.log("\n📐 Bracket Equation");
        console.log("----------------------------");

        console.log("\nStep 1:");
        console.log(`Equation: ${a}(x + ${b}) = ${c}`);

        console.log("\nStep 2:");
        console.log(`x + ${b} = ${c} / ${a}`);

        console.log("\nStep 3:");
        console.log(`x + ${b} = ${c / a}`);

        console.log("\nStep 4:");
        console.log(`x = ${c / a} - ${b}`);

        console.log(`x = ${x}`);

        console.log("\n✅ Final Answer:");
        console.log(`x = ${x}`);

        return true;
    }


    // ==========================================
    // SIMPLE BRACKET CALCULATION
    // Example: 2(3+4)
    // ==========================================

    const calculationMatch = equation.match(
        /^(-?\d+(?:\.\d+)?)\((-?\d+(?:\.\d+)?)([+-])(-?\d+(?:\.\d+)?)\)$/
    );

    if (calculationMatch) {

        const multiplier =
            Number(calculationMatch[1]);

        const number1 =
            Number(calculationMatch[2]);

        const operator =
            calculationMatch[3];

        const number2 =
            Number(calculationMatch[4]);


        let insideResult;

        if (operator === "+") {

            insideResult =
                number1 + number2;

        } else {

            insideResult =
                number1 - number2;
        }


        const answer =
            multiplier * insideResult;


        console.log("\n📐 Bracket Calculation");
        console.log("----------------------------");

        console.log("\nStep 1:");

        console.log(
            `Inside bracket: ${number1} ${operator} ${number2}`
        );

        console.log(
            `= ${insideResult}`
        );

        console.log("\nStep 2:");

        console.log(
            `${multiplier} × ${insideResult}`
        );

        console.log(
            `= ${answer}`
        );

        console.log("\n✅ Final Answer:");

        console.log(answer);

        return true;
    }


    // Nothing matched
    return null;
}

module.exports = solveBracket;