const apiKey = '4ce0fa1e8bfcfd2d42975c58'; // Replace with your API key from ExchangeRate API
const apiUrl = 'https://v6.exchangerate-api.com/v6/' + apiKey + '/latest/';

const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const result = document.getElementById('result');
const convertBtn = document.getElementById('convertBtn');

// Fetch the list of currencies and populate dropdowns
fetch(apiUrl + 'USD')
    .then(response => response.json())
    .then(data => {
        const currencies = Object.keys(data.conversion_rates);
        currencies.forEach(currency => {
            let option1 = document.createElement('option');
            let option2 = document.createElement('option');
            option1.value = currency;
            option1.text = currency;
            option2.value = currency;
            option2.text = currency;
            fromCurrency.appendChild(option1);
            toCurrency.appendChild(option2);
        });
    })
    .catch(error => {
        result.textContent = 'Error fetching currency data.';
    });

// Event listener for the Convert button
convertBtn.addEventListener('click', () => {
    const fromCurrencyValue = fromCurrency.value;
    const toCurrencyValue = toCurrency.value;
    const amountValue = amount.value;

    if (amountValue === '' || amountValue <= 0) {
        result.textContent = 'Please enter a valid amount.';
        return;
    }

    // Fetch the conversion rate and calculate the result
    fetch(apiUrl + fromCurrencyValue)
        .then(response => response.json())
        .then(data => {
            const rate = data.conversion_rates[toCurrencyValue];
            const convertedAmount = (amountValue * rate).toFixed(5);
            result.textContent = `${amountValue} ${fromCurrencyValue} = ${convertedAmount} ${toCurrencyValue}`;
        })
        .catch(error => {
            result.textContent = 'Error fetching conversion data.';
        });
});
// Add event listener for the swap button
document.getElementById('swapBtn').addEventListener('click', () => {
    const fromValue = fromCurrency.value;
    const toValue = toCurrency.value;

    // Swap the currencies
    fromCurrency.value = toValue;
    toCurrency.value = fromValue;

    // Automatically trigger conversion after swapping
    convertBtn.click();
});
const historicalData = document.getElementById('historicalData');

function fetchHistoricalRates(from, to) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7); // 7 days back

    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];

    // Use ExchangeRate API or any other API that supports historical data
    const historicalApiUrl = `https://api.exchangerate.host/timeseries?start_date=${startDateStr}&end_date=${endDateStr}&base=${from}&symbols=${to}`;

    fetch(historicalApiUrl)
        .then(response => response.json())
        .then(data => {
            let rates = data.rates;
            let historyHtml = `<h3>7-Day Exchange Rate (${from} to ${to})</h3><ul>`;

            for (let date in rates) {
                historyHtml += `<li><strong>${date}:</strong> ${rates[date][to]}</li>`;
            }

            historyHtml += `</ul>`;
            historicalData.innerHTML = historyHtml;
            historicalData.style.display = 'block'; // Show historical data
        })
        .catch(error => {
            historicalData.textContent = 'Error fetching historical data.';
        });
}

// Trigger fetching historical data when conversion happens
convertBtn.addEventListener('click', () => {
    fetchHistoricalRates(fromCurrency.value, toCurrency.value);
});
const favoritesList = document.getElementById('favoritesList');
const saveFavoriteBtn = document.getElementById('saveFavoriteBtn');

let favoritePairs = JSON.parse(localStorage.getItem('favoritePairs')) || [];
document.addEventListener('mousemove', function(e) {
    const converterCard = document.querySelector('.converter');
    const rect = converterCard.getBoundingClientRect();
    const xAxis = (e.clientX - rect.left) - rect.width / 2;
    const yAxis = (e.clientY - rect.top) - rect.height / 2;

    const rotateX = yAxis / 20; // Adjust the sensitivity of the 3D rotation
    const rotateY = -xAxis / 20;

    converterCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

    
