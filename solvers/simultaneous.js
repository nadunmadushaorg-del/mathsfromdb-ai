const toFraction = require("../utils/fraction");

function solveSimultaneous(input) {

    let equations = input
        .replace(/and/g, ";")
        .replace(/,/g, ";")
        .split(";")
        .filter(eq => eq.length > 0);

    if (equations.length !== 2) {
        return null;
    }

    function parseEquation(eq) {

        const match = eq.match(
            /^([+-]?\d*\.?\d*)x([+-]?\d*\.?\d*)y=([+-]?\d*\.?\d*)$/
        );

        if (!match) {
            return null;
        }

        let a = match[1];
        let b = match[2];
        let c = match[3];

        if (a === "" || a === "+") a = 1;
        else if (a === "-") a = -1;
        else a = Number(a);

        if (b === "" || b === "+") b = 1;
        else if (b === "-") b = -1;
        else b = Number(b);

        if (c === "" || c === "+") c = 0;
        else c = Number(c);

        return { a, b, c };
    }

    const eq1 = parseEquation(equations[0]);
    const eq2 = parseEquation(equations[1]);

    if (!eq1 || !eq2) {
        return null;
    }

    const { a: a1, b: b1, c: c1 } = eq1;
    const { a: a2, b: b2, c: c2 } = eq2;

    const determinant =
        a1 * b2 - a2 * b1;

    console.log("\n📐 Simultaneous Equations");
    console.log("----------------------------");

    console.log("\nStep 1:");
    console.log(`Equation 1: ${equations[0]}`);
    console.log(`Equation 2: ${equations[1]}`);

    console.log("\nStep 2:");
    console.log(`a₁ = ${a1}, b₁ = ${b1}, c₁ = ${c1}`);
    console.log(`a₂ = ${a2}, b₂ = ${b2}, c₂ = ${c2}`);

    // ==========================================
    // D = 0 CASE
    // ==========================================

    if (determinant === 0) {

        const cRatio =
            a1 * c2 - a2 * c1;

        const bRatio =
            b1 * c2 - b2 * c1;

        console.log("\nStep 3:");
        console.log("D = a₁b₂ - a₂b₁");
        console.log(`D = ${determinant}`);

        // Same equation → infinitely many solutions
        if (cRatio === 0 && bRatio === 0) {

            console.log("\n♾️ Infinitely many solutions.");

            console.log("\n✅ Final Answer:");
            console.log(
                "The equations represent the same line."
            );
            console.log(
                "Therefore, there are infinitely many solutions."
            );

            return true;
        }

        // Parallel equations → no solution
        console.log("\n❌ No solution.");

        console.log("\n✅ Final Answer:");
        console.log(
            "The equations are inconsistent."
        );
        console.log(
            "Therefore, there is no solution."
        );

        return true;
    }

    // ==========================================
    // UNIQUE SOLUTION
    // ==========================================

    console.log("\nStep 3:");
    console.log("Using Cramer's Rule");

    console.log("\nStep 4:");
    console.log("D = a₁b₂ - a₂b₁");
    console.log(
        `D = (${a1})(${b2}) - (${a2})(${b1})`
    );
    console.log(`D = ${determinant}`);

    const x =
        (c1 * b2 - c2 * b1) /
        determinant;

    const y =
        (a1 * c2 - a2 * c1) /
        determinant;

    const xFraction = toFraction(x);
    const yFraction = toFraction(y);

    console.log("\nStep 5:");
    console.log("x = (c₁b₂ - c₂b₁) / D");
    console.log(`x = ${xFraction}`);

    console.log("\nStep 6:");
    console.log("y = (a₁c₂ - a₂c₁) / D");
    console.log(`y = ${yFraction}`);

    console.log("\n✅ Final Answer:");
    console.log(`x = ${xFraction}`);
    console.log(`y = ${yFraction}`);

    return true;
}

module.exports = solveSimultaneous;