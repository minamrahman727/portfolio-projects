const conversions = {
    atm: {
        bar: 1.01325,
        kPa: 101.325,
        mmHg: 760,
        Pa: 101325,
        psi: 14.696
    },
    bar: {
        atm: 0.986923,
        kPa: 100,
        mmHg: 750.062,
        Pa: 100000,
        psi: 14.5038
    },
    kPa: {
        atm: 0.00986923,
        bar: 0.01,
        mmHg: 7.50062,
        Pa: 1000,
        psi: 0.145038
    },
    mmHg: {
        atm: 0.00131579,
        bar: 0.00133322,
        kPa: 0.133322,
        Pa: 133.322,
        psi: 0.0193368
    },
    Pa: {
        atm: 9.86923e-6,
        bar: 1e-5,
        kPa: 0.001,
        mmHg: 0.00750062,
        psi: 0.000145038
    },
    psi: {
        atm: 0.068046,
        bar: 0.0689476,
        kPa: 6.89476,
        mmHg: 51.715,
        Pa: 6894.76
    }
};

function convertPressure() {
    const inputValue = parseFloat(document.getElementById('inputValue').value);
    const inputUnit = document.getElementById('inputUnit').value;
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; // Clear previous values

    if (!isNaN(inputValue)) {
        for (let [unit, factor] of Object.entries(conversions[inputUnit])) {
            const convertedValue = (inputValue * factor).toFixed(4);
            outputDiv.innerHTML += `<div>${convertedValue} ${unit}</div>`;
        }
    } else {
        outputDiv.innerHTML = '<div>Please enter a valid number</div>';
    }
}
