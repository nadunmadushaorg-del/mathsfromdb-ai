function toFraction(number) {

    // Whole number
    if (Number.isInteger(number)) {
        return String(number);
    }

    // Handle negative numbers
    const sign = number < 0 ? "-" : "";
    number = Math.abs(number);

    let bestNumerator = 1;
    let bestDenominator = 1;
    let bestError = Math.abs(number - 1);

    // Find the closest fraction
    for (let denominator = 1; denominator <= 1000; denominator++) {

        const numerator = Math.round(number * denominator);
        const value = numerator / denominator;
        const error = Math.abs(number - value);

        if (error < bestError) {
            bestError = error;
            bestNumerator = numerator;
            bestDenominator = denominator;
        }

        // Exact enough
        if (error < 0.000000001) {
            break;
        }
    }

    // Simplify fraction
    function gcd(a, b) {

        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }

        return Math.abs(a);
    }

    const divisor = gcd(bestNumerator, bestDenominator);

    bestNumerator = bestNumerator / divisor;
    bestDenominator = bestDenominator / divisor;

    return `${sign}${bestNumerator}/${bestDenominator}`;
}

module.exports = toFraction;