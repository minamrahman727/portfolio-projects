function convertTime() {
    const inputValue = parseFloat(document.getElementById('inputValue').value);
    const inputUnit = document.getElementById('inputUnit').value;

    const units = {
        microsecond: 1e-6,
        millisecond: 1e-3,
        second: 1,
        minute: 60,
        hour: 3600,
        day: 86400,
        week: 604800,
        year: 31536000
    };

    const valueInSeconds = inputValue * units[inputUnit];

    const result = `
        <p>Microseconds: ${valueInSeconds / units.microsecond}</p>
        <p>Milliseconds: ${valueInSeconds / units.millisecond}</p>
        <p>Seconds: ${valueInSeconds / units.second}</p>
        <p>Minutes: ${valueInSeconds / units.minute}</p>
        <p>Hours: ${valueInSeconds / units.hour}</p>
        <p>Days: ${valueInSeconds / units.day}</p>
        <p>Weeks: ${valueInSeconds / units.week}</p>
        <p>Years: ${valueInSeconds / units.year}</p>
    `;

    document.getElementById('result').innerHTML = result;
}
