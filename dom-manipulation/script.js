document.addEventListener("DOMContentLoaded", function () {
    // Predefined quotes
    const quotes = [
        { text: "The best way to predict the future is to create it.", category: "Motivation" },
        { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Inspiration" },
        { text: "Act as if what you do makes a difference. It does.", category: "Encouragement" }
    ];

    // Select elements
    const quoteDisplay = document.getElementById("quoteDisplay");
    const newQuoteBtn = document.getElementById("newQuote");
    const formContainer = document.getElementById("formContainer");

    // Function to display a random quote
    function showRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];

        // Using innerHTML to update content
        quoteDisplay.innerHTML = `<strong>${randomQuote.text}</strong> <br> <em>- ${randomQuote.category}</em>`;
    }

    // Function to dynamically create the "Add Quote" form
    function createAddQuoteForm() {
        formContainer.innerHTML = `
            <input id="newQuoteText" type="text" placeholder="Enter a new quote">
            <input id="newQuoteCategory" type="text" placeholder="Enter quote category">
            <button id="addQuoteBtn">Add Quote</button>
        `;

        // Attach event listener to the newly created button
        document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
    }

    // Function to add a new quote
    function addQuote() {
        const newQuoteText = document.getElementById("newQuoteText").value.trim();
        const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

        if (newQuoteText === "" || newQuoteCategory === "") {
            alert("Please enter both a quote and a category.");
            return;
        }

        // Add new quote to the array
        quotes.push({ text: newQuoteText, category: newQuoteCategory });

        // Update the UI with the new quote
        quoteDisplay.innerHTML = `<strong>${newQuoteText}</strong> <br> <em>- ${newQuoteCategory}</em>`;

        // Clear input fields
        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";
    }

    // Event listeners
    newQuoteBtn.addEventListener("click", showRandomQuote);

    // Create the add-quote form when the page loads
    createAddQuoteForm();

    // Display an initial quote
    showRandomQuote();
});
