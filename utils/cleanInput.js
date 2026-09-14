function cleanInput(input) {

    let equation = input.toLowerCase();

    // Remove common words
    equation = equation
        .replace(/solve/g, "")
        .replace(/find/g, "")
        .replace(/calculate/g, "")
        .replace(/answer/g, "")
        .replace(/please/g, "")
        .replace(/when/g, "");

    // Remove question labels
    equation = equation
        .replace(/x\s*:/g, "")
        .replace(/equation\s*:/g, "");

    // Remove Sinhala words
    equation = equation
        .replace(/විසඳන්න/g, "")
        .replace(/හොයන්න/g, "")
        .replace(/ගණනය/g, "")
        .replace(/පිළිතුර/g, "");

    // Remove spaces
    equation = equation.replace(/\s/g, "");

    // Convert ² to ^2
    equation = equation.replace(/²/g, "^2");

    // Remove unwanted punctuation
    equation = equation.replace(/[?:,]/g, "");

    return equation;
}

module.exports = cleanInput;