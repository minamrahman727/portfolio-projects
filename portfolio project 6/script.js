document.getElementById('convertBtn').addEventListener('click', function() {
    const inputValue = parseFloat(document.getElementById('inputValue').value);
    const fromUnit = document.getElementById('fromUnit').value;

    if (isNaN(inputValue) || inputValue < 0) {
        alert('Please enter a valid non-negative number.');
        return;
    }

    const conversions = {
        watts: 1,
        kilowatts: 1000,
        horsepower: 745.7,
        "foot-pound": 0.022597,
        BTU: 17.584
    };

    // Convert input value to watts
    const valueInWatts = inputValue * conversions[fromUnit];

    // Convert from watts to other units
    const results = {
        watts: valueInWatts / conversions.watts,
        kilowatts: valueInWatts / conversions.kilowatts,
        horsepower: valueInWatts / conversions.horsepower,
        "foot-pound": valueInWatts / conversions["foot-pound"],
        BTU: valueInWatts / conversions.BTU
    };

    // Display results
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = ''; // Clear previous results
    for (const [unit, result] of Object.entries(results)) {
        const resultElement = document.createElement('div');
        resultElement.className = 'result-item';
        resultElement.textContent = `${result.toFixed(4)} ${unit}`;
        resultsContainer.appendChild(resultElement);
    }
});

document.getElementById('resetBtn').addEventListener('click', function() {
    document.getElementById('inputValue').value = '';
    document.getElementById('resultsContainer').innerHTML = '';
});
