document.addEventListener('DOMContentLoaded', () => {
    const salaryButton = document.getElementById('set-salary');
    const addExpenseButton = document.getElementById('add-expense');
    const clearExpensesButton = document.getElementById('clear-expenses');

    // Ensure event listeners are not added multiple times
    salaryButton.removeEventListener('click', setSalary);
    salaryButton.addEventListener('click', setSalary);

    addExpenseButton.removeEventListener('click', addExpense);
    addExpenseButton.addEventListener('click', addExpense);

    clearExpensesButton.removeEventListener('click', clearExpenses);
    clearExpensesButton.addEventListener('click', clearExpenses);

    // Load saved data and handle monthly reset
    loadSavedData();

    function setSalary() {
        const salaryInput = document.getElementById('monthly-salary');
        const expenseNameInput = document.getElementById('expense-name');
        const expenseAmountInput = document.getElementById('expense-amount');
        const expenseCategorySelect = document.getElementById('expense-category');
        const expenseSummaryTextarea = document.getElementById('expense-summary');
        const expenseDocumentInput = document.getElementById('expense-document');
        const salaryError = document.getElementById('salary-error');

        const salary = parseFloat(salaryInput.value);

        if (isNaN(salary) || salary <= 0) {
            salaryError.textContent = 'Please enter a valid salary.';
            return;
        }

        salaryError.textContent = '';
        expenseNameInput.disabled = false;
        expenseAmountInput.disabled = false;
        expenseCategorySelect.disabled = false;
        addExpenseButton.disabled = false;
        expenseSummaryTextarea.disabled = false;
        expenseDocumentInput.disabled = false;

        localStorage.setItem('salary', salary);
        document.getElementById('total-expense').textContent = '0';
        document.getElementById('remaining-balance').textContent = salary;
        updateProgressBar(0, salary);
        saveExpenses();
    }

    function addExpense() {
        const amount = parseFloat(document.getElementById('expense-amount').value);
        const category = document.getElementById('expense-category').value;
        const description = document.getElementById('expense-name').value;
        const expenseList = document.getElementById('expense-list');
        const totalExpenseElement = document.getElementById('total-expense');
        const remainingBalanceElement = document.getElementById('remaining-balance');
        const progressBar = document.getElementById('progress-fill');

        if (isNaN(amount) || amount <= 0 || !category || !description) {
            document.getElementById('expense-error').textContent = 'Please enter valid expense details.';
            return;
        }

        document.getElementById('expense-error').textContent = '';

        // Prevent adding the same expense multiple times
        const existingItems = Array.from(expenseList.getElementsByTagName('li'));
        const newExpenseText = `${category}: PKR ${amount.toFixed(2)} - ${description}`;
        if (existingItems.some(item => item.textContent === newExpenseText)) {
            document.getElementById('expense-error').textContent = '   ';
            return;
        }

        const listItem = document.createElement('li');
        listItem.textContent = newExpenseText;
        expenseList.appendChild(listItem);

        const totalExpenses = parseFloat(totalExpenseElement.textContent) + amount;
        const remainingBalance = parseFloat(remainingBalanceElement.textContent) - amount;

        totalExpenseElement.textContent = totalExpenses.toFixed(2);
        remainingBalanceElement.textContent = remainingBalance.toFixed(2);
        updateProgressBar(totalExpenses, parseFloat(localStorage.getItem('salary')));
        saveExpenses();
    }

    function clearExpenses() {
        document.getElementById('expense-list').innerHTML = '';
        document.getElementById('total-expense').textContent = '0';
        document.getElementById('remaining-balance').textContent = localStorage.getItem('salary') || '0';
        updateProgressBar(0, parseFloat(localStorage.getItem('salary')));
        localStorage.removeItem('expenses');
    }

    function updateProgressBar(totalExpenses, salary) {
        const progressBar = document.getElementById('progress-fill');
        const progress = (totalExpenses / salary) * 100;
        progressBar.style.width = `${Math.min(progress, 100)}%`;
    }

    function saveExpenses() {
        const expenseItems = [];
        document.querySelectorAll('#expense-list li').forEach(item => {
            expenseItems.push(item.textContent);
        });
        localStorage.setItem('expenses', JSON.stringify(expenseItems));
        localStorage.setItem('last-reset-date', getCurrentMonth());
    }

    function loadSavedData() {
        const savedSalary = localStorage.getItem('salary');
        if (savedSalary) {
            document.getElementById('monthly-salary').value = savedSalary;
            setSalary();
        }

        const lastResetDate = localStorage.getItem('last-reset-date');
        const currentMonth = getCurrentMonth();

        if (lastResetDate !== currentMonth) {
            clearExpenses();
        }

        const savedExpenses = JSON.parse(localStorage.getItem('expenses'));
        if (savedExpenses) {
            const expenseList = document.getElementById('expense-list');
            savedExpenses.forEach(expense => {
                const listItem = document.createElement('li');
                listItem.textContent = expense;
                expenseList.appendChild(listItem);
            });

            const totalExpenses = savedExpenses.reduce((sum, expense) => {
                const amountText = expense.match(/PKR ([\d.]+)/);
                return sum + (amountText ? parseFloat(amountText[1]) : 0);
            }, 0);

            const salary = parseFloat(localStorage.getItem('salary')) || 0;
            document.getElementById('total-expense').textContent = totalExpenses.toFixed(2);
            document.getElementById('remaining-balance').textContent = (salary - totalExpenses).toFixed(2);
            updateProgressBar(totalExpenses, salary);
        }
    }

    function getCurrentMonth() {
        const date = new Date();
        return `${date.getFullYear()}-${date.getMonth() + 1}`;
    }
});
