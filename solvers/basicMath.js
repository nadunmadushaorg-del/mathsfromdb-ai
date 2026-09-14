function solveBasicMath(input) {

    // ================================
    // SQUARE ROOT
    // ================================

    let sqrtMatch = input.match(
        /^√(-?\d+(?:\.\d+)?)$/
    );

    if (sqrtMatch) {

        const number = Number(sqrtMatch[1]);

        if (number < 0) {
            return null;
        }

        const answer = Math.sqrt(number);

        console.log("\n🔢 Basic Mathematics");
        console.log("----------------------------");

        console.log("\nStep 1:");
        console.log(`√${number}`);

        console.log("\nStep 2:");
        console.log(`√${number} = ${answer}`);

        console.log("\n✅ Final Answer:");
        console.log(answer);

        return true;
    }


    // ================================
    // POWER
    // ================================

    let powerMatch = input.match(
        /^(-?\d+(?:\.\d+)?)\^(-?\d+(?:\.\d+)?)$/
    );

    if (powerMatch) {

        const base = Number(powerMatch[1]);
        const exponent = Number(powerMatch[2]);

        const answer = Math.pow(base, exponent);

        console.log("\n🔢 Power");
        console.log("----------------------------");

        console.log("\nStep 1:");
        console.log(`${base}^${exponent}`);

        console.log("\nStep 2:");
        console.log(
            `${base} raised to the power ${exponent}`
        );

        console.log("\n✅ Final Answer:");
        console.log(answer);

        return true;
    }


    // ================================
    // FRACTION
    // +  -  ×  ÷
    // ================================

    let fractionMatch = input.match(
        /^(-?\d+)\/(\d+)([+\-*\/])(-?\d+)\/(\d+)$/
    );

    if (fractionMatch) {

        const numerator1 = Number(fractionMatch[1]);
        const denominator1 = Number(fractionMatch[2]);

        const operator = fractionMatch[3];

        const numerator2 = Number(fractionMatch[4]);
        const denominator2 = Number(fractionMatch[5]);

        if (
            denominator1 === 0 ||
            denominator2 === 0
        ) {
            return null;
        }

        // ================================
        // ADDITION
        // ================================

        let numerator;
        let denominator;

        if (operator === "+") {

            numerator =
                numerator1 * denominator2 +
                numerator2 * denominator1;

            denominator =
                denominator1 * denominator2;
        }


        // ================================
        // SUBTRACTION
        // ================================

        else if (operator === "-") {

            numerator =
                numerator1 * denominator2 -
                numerator2 * denominator1;

            denominator =
                denominator1 * denominator2;
        }


        // ================================
        // MULTIPLICATION
        // ================================

        else if (operator === "*") {

            numerator =
                numerator1 * numerator2;

            denominator =
                denominator1 * denominator2;
        }


        // ================================
        // DIVISION
        // ================================

        else if (operator === "/") {

            // Cannot divide by zero
            if (numerator2 === 0) {
                return null;
            }

            numerator =
                numerator1 * denominator2;

            denominator =
                denominator1 * numerator2;
        }


        // ================================
        // SIMPLIFY FRACTION
        // ================================

        function gcd(a, b) {

            a = Math.abs(a);
            b = Math.abs(b);

            while (b !== 0) {

                const temp = b;

                b = a % b;
                a = temp;
            }

            return a;
        }

        const divisor =
            gcd(numerator, denominator);

        numerator /= divisor;
        denominator /= divisor;


        // Keep negative sign on numerator
        if (denominator < 0) {

            numerator *= -1;
            denominator *= -1;
        }


        console.log("\n➗ Fractions");
        console.log("----------------------------");

        console.log("\nStep 1:");

        console.log(
            `${numerator1}/${denominator1} ${operator} ${numerator2}/${denominator2}`
        );


        if (operator === "+") {

            console.log("\nStep 2:");

            console.log(
                "Multiply crosswise and add the numerators."
            );
        }

        else if (operator === "-") {

            console.log("\nStep 2:");

            console.log(
                "Multiply crosswise and subtract the numerators."
            );
        }

        else if (operator === "*") {

            console.log("\nStep 2:");

            console.log(
                "Multiply the numerators and denominators."
            );
        }

        else if (operator === "/") {

            console.log("\nStep 2:");

            console.log(
                "Keep the first fraction and multiply by the reciprocal of the second."
            );
        }


        console.log("\nStep 3:");

        console.log(
            `Simplified fraction = ${numerator}/${denominator}`
        );

        console.log("\n✅ Final Answer:");

        console.log(
            `${numerator}/${denominator}`
        );

        return true;
    }


    // ================================
    // BASIC CALCULATION
    // ================================

    let calculationMatch = input.match(
        /^-?\d+(?:\.\d+)?[+\-*\/]-?\d+(?:\.\d+)?$/
    );

    if (calculationMatch) {

        const answer = Function(
            `"use strict"; return (${input})`
        )();

        console.log("\n🔢 Basic Calculation");
        console.log("----------------------------");

        console.log("\nStep 1:");
        console.log(input);

        console.log("\nStep 2:");

        console.log(
            `${input} = ${answer}`
        );

        console.log("\n✅ Final Answer:");

        console.log(answer);

        return true;
    }


    // ================================
    // NOTHING MATCHED
    // ================================

    return null;
}

module.exports = solveBasicMath;