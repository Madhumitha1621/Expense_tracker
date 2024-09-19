// Get references to form elements
const incomeForm = document.getElementById('income-form');
const expenseForm = document.getElementById('expense-form');
const incomeDescription = document.getElementById('income-description');
const incomeAmount = document.getElementById('income-amount');
const expenseDescription = document.getElementById('expense-description');
const expenseAmount = document.getElementById('expense-amount');
const categoryInput = document.getElementById('category-input');
const transactionList = document.getElementById('transaction-list');
const totalIncome = document.getElementById('total-income');
const totalExpense = document.getElementById('total-expense');
const balance = document.getElementById('balance');

// Event listener for income form
incomeForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const description = incomeDescription.value.trim();
    const amount = parseFloat(incomeAmount.value.trim());

    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid income description and amount.');
        return;
    }

    addTransaction(description, amount, 'Income');
    updateSummary();
    clearIncomeInputs();
});

// Event listener for expense form
expenseForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const description = expenseDescription.value.trim();
    const amount = parseFloat(expenseAmount.value.trim());
    const category = categoryInput.value;

    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid expense description and amount.');
        return;
    }

    addTransaction(description, amount, category);
    updateSummary();
    clearExpenseInputs();
});

// Function to add a transaction (both income and expense)
function addTransaction(description, amount, category) {
    const transactionRow = document.createElement('tr');
    transactionRow.innerHTML = `
        <td>${description}</td>
        <td>${category}</td>
        <td>${amount.toFixed(2)}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;
    transactionList.appendChild(transactionRow);

    transactionRow.querySelector('.delete-btn').addEventListener('click', function() {
        transactionRow.remove();
        updateSummary();
    });
}

// Function to update the summary
function updateSummary() {
    let totalIncomes = 0;
    let totalExpenses = 0;
    const transactions = transactionList.querySelectorAll('tr');

    transactions.forEach(function(transaction) {
        const amount = parseFloat(transaction.children[2].textContent);
        const category = transaction.children[1].textContent;

        if (category === 'Income') {
            totalIncomes += amount;
        } else {
            totalExpenses += amount;
        }
    });

    totalIncome.textContent = totalIncomes.toFixed(2);
    totalExpense.textContent = totalExpenses.toFixed(2);
    const currentBalance = totalIncomes - totalExpenses;
    balance.textContent = currentBalance.toFixed(2);

    if (currentBalance >= 0) {
        balance.classList.remove('negative');
        balance.classList.add('positive');
    } else {
        balance.classList.remove('positive');
        balance.classList.add('negative');
    }
}

// Function to clear the income form inputs
function clearIncomeInputs() {
    incomeDescription.value = '';
    incomeAmount.value = '';
}

// Function to clear the expense form inputs
function clearExpenseInputs() {
    expenseDescription.value = '';
    expenseAmount.value = '';
}
