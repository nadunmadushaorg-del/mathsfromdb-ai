function solveLinear(equation) {

    // ==========================================
    // LINEAR EQUATION
    // Examples:
    // 2x+5=15
    // -3x-4=8
    // x+7=10
    // -x+5=2
    // ==========================================

    const match = equation.match(
        /^([+-]?\d*\.?\d*)x([+-]\d*\.?\d*)=([+-]?\d*\.?\d*)$/
    );

    if (!match) {
        return null;
    }

    let a = match[1];
    let b = match[2];
    let c = match[3];


    // ==========================================
    // COEFFICIENT OF x
    // ==========================================

    if (a === "" || a === "+") {

        a = 1;

    } else if (a === "-") {

        a = -1;

    } else {

        a = Number(a);
    }


    // ==========================================
    // CONSTANT b
    // ==========================================

    if (b === "" || b === "+") {

        b = 0;

    } else {

        b = Number(b);
    }


    // ==========================================
    // RIGHT SIDE c
    // ==========================================

    if (c === "" || c === "+") {

        c = 0;

    } else {

        c = Number(c);
    }


    // ==========================================
    // INVALID EQUATION
    // ==========================================

    if (
        !Number.isFinite(a) ||
        !Number.isFinite(b) ||
        !Number.isFinite(c) ||
        a === 0
    ) {

        return null;
    }


    // ==========================================
    // SOLVE
    // ax + b = c
    //
    // ax = c - b
    //
    // x = (c - b) / a
    // ==========================================

    const x = (c - b) / a;


    // ==========================================
    // OUTPUT
    // ==========================================

    console.log("\n📐 Linear Equation");
    console.log("----------------------------");

    console.log("\nStep 1:");

    console.log(
        `Equation: ${a}x + ${b} = ${c}`
    );


    console.log("\nStep 2:");

    console.log(
        `${a}x = ${c} - (${b})`
    );


    const rightSide = c - b;

    console.log(
        `${a}x = ${rightSide}`
    );


    console.log("\nStep 3:");

    console.log(
        `x = ${rightSide} / ${a}`
    );


    console.log(
        `x = ${x}`
    );


    console.log("\n✅ Final Answer:");

    console.log(
        `x = ${x}`
    );


    return true;
}

module.exports = solveLinear;