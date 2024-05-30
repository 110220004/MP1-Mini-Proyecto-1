// Function to append a value (number or operator) to the result input field
function appendValue(value) {
    var resultField = document.getElementById("result");
    resultField.value = resultField.value + value;
}

// Function to clear the result input field
function clearResult() {
    var resultField = document.getElementById("result");
    resultField.value = "";
}

// Function to calculate the result of the expression in the result input field
function calculateResult() {
    var resultField = document.getElementById("result");
    try {
        var result = eval(resultField.value); // Evaluate the expression
        saveToHistory(resultField.value + ' = ' + result); // Save the calculation to history
        resultField.value = result; // Display the result
    } catch (e) {
        resultField.value = "Error"; // Display error if the expression is invalid
    }
}

// Function to save a calculation to local storage and update the history display
function saveToHistory(calculation) {
    var history = JSON.parse(localStorage.getItem('history')) || []; // Retrieve history from local storage
    history.push(calculation); // Add the new calculation to the history
    localStorage.setItem('history', JSON.stringify(history)); // Save the updated history back to local storage
    displayHistory(); // Update the history display
}

// Function to display the calculation history stored in local storage
function displayHistory() {
    var history = JSON.parse(localStorage.getItem('history')) || []; // Retrieve history from local storage
    var historyContainer = document.getElementById('history'); // Get the history container element
    historyContainer.innerHTML = '<h2>History</h2>'; // Clear current contents and add a heading
    history.forEach(function (item) {
        var div = document.createElement('div'); // Create a new div for each calculation
        div.textContent = item; // Set the text content of the div to the calculation
        historyContainer.appendChild(div); // Append the div to the history container
    });
}

// Event listener to display the history when the page loads
document.addEventListener('DOMContentLoaded', displayHistory);

// Event listener to clear local storage when the page is closed
window.addEventListener('beforeunload', function() {
    localStorage.removeItem('history');
});