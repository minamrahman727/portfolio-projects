document.addEventListener('DOMContentLoaded', () => {
    const angleValueInput = document.getElementById('angleValue');
    const unitSelect = document.getElementById('unitSelect');
    const convertBtn = document.getElementById('convertBtn');
    const resultDegrees = document.getElementById('resultDegrees');
    const resultRadians = document.getElementById('resultRadians');
    const resultGradians = document.getElementById('resultGradians');

    function convertAngle() {
        const angleValue = parseFloat(angleValueInput.value);
        const unit = unitSelect.value;

        let degrees, radians, gradians;

        switch (unit) {
            case 'degrees':
                degrees = angleValue;
                radians = degrees * (Math.PI / 180);
                gradians = degrees * (10 / 9);
                break;
            case 'radians':
                radians = angleValue;
                degrees = radians * (180 / Math.PI);
                gradians = radians * (200 / Math.PI);
                break;
            case 'gradians':
                gradians = angleValue;
                degrees = gradians * (9 / 10);
                radians = gradians * (Math.PI / 200);
                break;
            default:
                return;
        }

        resultDegrees.textContent = degrees.toFixed(5);
        resultRadians.textContent = radians.toFixed(5);
        resultGradians.textContent = gradians.toFixed(5);
    }

    convertBtn.addEventListener('click', convertAngle);

    // Optional: Convert on Enter key press
    angleValueInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            convertAngle();
        }
    });
});
