function solveTrigonometry(input) {

    // ==========================================
    // INVERSE TRIGONOMETRY
    // asin(x), acos(x), atan(x)
    // ==========================================

    const inverseMatch = input.match(
        /^(asin|acos|atan)\((-?\d+(?:\.\d+)?)\)$/
    );

    if (inverseMatch) {

        const functionName = inverseMatch[1];
        const value = Number(inverseMatch[2]);

        // ------------------------------------------
        // DOMAIN CHECK
        // ------------------------------------------

        if (
            (functionName === "asin" || functionName === "acos") &&
            (value < -1 || value > 1)
        ) {
            console.log("\n📐 Inverse Trigonometry");
            console.log("----------------------------");

            console.log("\nStep 1:");
            console.log(`Function = ${functionName}`);
            console.log(`Value = ${value}`);

            console.log("\n❌ Invalid value.");

            console.log("\n✅ Final Answer:");
            console.log(
                `${functionName}(${value}) is undefined for real angles.`
            );

            return true;
        }

        let radians;
        let degrees;

        if (functionName === "asin") {
            radians = Math.asin(value);
        }
        else if (functionName === "acos") {
            radians = Math.acos(value);
        }
        else {
            radians = Math.atan(value);
        }

        degrees =
            radians * 180 / Math.PI;

        // Remove tiny floating-point errors
        if (Math.abs(degrees) < 0.000000001) {
            degrees = 0;
        }

        degrees = Number(degrees.toFixed(6));

        console.log("\n📐 Inverse Trigonometry");
        console.log("----------------------------");

        console.log("\nStep 1:");

        if (functionName === "asin") {
            console.log(`sin⁻¹(${value})`);
        }
        else if (functionName === "acos") {
            console.log(`cos⁻¹(${value})`);
        }
        else {
            console.log(`tan⁻¹(${value})`);
        }

        console.log("\nStep 2:");

        console.log(
            "Calculate the inverse trigonometric value."
        );

        console.log("\nStep 3:");

        console.log(
            `Angle = ${degrees}°`
        );

        console.log("\n✅ Final Answer:");

        console.log(
            `${functionName}(${value}) = ${degrees}°`
        );

        return true;
    }

    // ==========================================
    // NORMAL TRIGONOMETRY
    // sin(x), cos(x), tan(x)
    // ==========================================

    const match = input.match(
        /^(sin|cos|tan)\(?(-?\d+(?:\.\d+)?)\)?$/
    );

    if (!match) {
        return null;
    }

    const functionName = match[1];
    const angle = Number(match[2]);

    // ==========================================
    // TAN UNDEFINED CASE
    // ==========================================

    if (functionName === "tan") {

        const normalizedAngle =
            ((angle % 180) + 180) % 180;

        if (Math.abs(normalizedAngle - 90) < 0.000000001) {

            console.log("\n📐 Trigonometry");
            console.log("----------------------------");

            console.log("\nStep 1:");
            console.log(`Function = tan`);
            console.log(`Angle = ${angle}°`);

            console.log("\nStep 2:");
            console.log("Convert degrees to radians:");
            console.log(`Radians = ${angle} × π / 180`);

            console.log("\nStep 3:");
            console.log(
                `tan(${angle}°) is undefined`
            );

            console.log("\n❌ Final Answer:");
            console.log(
                `tan(${angle}°) = undefined`
            );

            return true;
        }
    }

    const radians =
        angle * Math.PI / 180;

    let answer;

    if (functionName === "sin") {
        answer = Math.sin(radians);
    }
    else if (functionName === "cos") {
        answer = Math.cos(radians);
    }
    else {
        answer = Math.tan(radians);
    }

    // Remove floating-point errors
    if (Math.abs(answer) < 0.000000001) {
        answer = 0;
    }

    answer = Number(answer.toFixed(6));

    console.log("\n📐 Trigonometry");
    console.log("----------------------------");

    console.log("\nStep 1:");
    console.log(`Function = ${functionName}`);
    console.log(`Angle = ${angle}°`);

    console.log("\nStep 2:");
    console.log("Convert degrees to radians:");
    console.log(`Radians = ${angle} × π / 180`);

    console.log("\nStep 3:");
    console.log(
        `${functionName}(${angle}°) = ${answer}`
    );

    console.log("\n✅ Final Answer:");
    console.log(
        `${functionName}(${angle}°) = ${answer}`
    );

    return true;
}

module.exports = solveTrigonometry;