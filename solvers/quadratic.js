function solveQuadratic(equation) {

    // ==========================================
    // QUADRATIC EQUATION
    //
    // ax² + bx + c = 0
    //
    // Examples:
    // x² - 9 = 0
    // x² + 5x + 6 = 0
    // 2x² + 3x - 2 = 0
    // -x² + 5x - 6 = 0
    // ==========================================

    const quadratic = equation.match(
        /^([+-]?\d*\.?\d*)x\^2([+-]?\d*\.?\d*x)?([+-]?\d*\.?\d*)=0$/
    );

    if (!quadratic) {
        return null;
    }


    // ==========================================
    // GET a
    // ==========================================

    let a = quadratic[1];

    if (a === "" || a === "+") {

        a = 1;

    } else if (a === "-") {

        a = -1;

    } else {

        a = Number(a);
    }


    // ==========================================
    // GET b
    // ==========================================

    let bPart = quadratic[2];

    let b = 0;

    if (bPart) {

        // Remove x
        bPart = bPart.replace("x", "");

        if (bPart === "" || bPart === "+") {

            b = 1;

        } else if (bPart === "-") {

            b = -1;

        } else {

            b = Number(bPart);
        }
    }


    // ==========================================
    // GET c
    // ==========================================

    let c = quadratic[3];

    if (c === "" || c === "+") {

        c = 0;

    } else {

        c = Number(c);
    }


    // ==========================================
    // VALIDATION
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
    // DISCRIMINANT
    // ==========================================

    const discriminant =
        b * b - 4 * a * c;


    // ==========================================
    // OUTPUT
    // ==========================================

    console.log("\n📐 Quadratic Equation");
    console.log("----------------------------");

    console.log("\nStep 1:");

    console.log(`a = ${a}`);
    console.log(`b = ${b}`);
    console.log(`c = ${c}`);


    console.log("\nStep 2:");

    console.log("D = b² - 4ac");

    console.log(
        `D = (${b})² - 4(${a})(${c})`
    );

    console.log(
        `D = ${discriminant}`
    );


    // ==========================================
    // NO REAL SOLUTIONS
    // ==========================================

    if (discriminant < 0) {

        console.log(
            "\n❌ No real solutions."
        );

        return true;
    }


    // ==========================================
    // ONE SOLUTION
    // ==========================================

    if (discriminant === 0) {

        const x =
            -b / (2 * a);

        console.log("\nStep 3:");

        console.log(
            "x = -b / 2a"
        );

        console.log("\nStep 4:");

        console.log(
            `x = ${x}`
        );

        console.log(
            "\n✅ Final Answer:"
        );

        console.log(
            `x = ${x}`
        );

        return true;
    }


    // ==========================================
    // TWO SOLUTIONS
    // ==========================================

    const x1 =
        (-b + Math.sqrt(discriminant)) /
        (2 * a);

    const x2 =
        (-b - Math.sqrt(discriminant)) /
        (2 * a);


    console.log("\nStep 3:");

    console.log(
        "x = (-b ± √D) / 2a"
    );


    console.log("\nStep 4:");

    console.log(
        `x₁ = ${x1}`
    );

    console.log(
        `x₂ = ${x2}`
    );


    console.log(
        "\n✅ Final Answer:"
    );

    console.log(
        `x = ${x1} or x = ${x2}`
    );


    return true;
}

module.exports = solveQuadratic;