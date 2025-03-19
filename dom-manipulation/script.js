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
    const addQuoteBtn = document.getElementById("addQuoteBtn");
    const newQuoteText = document.getElementById("newQuoteText");
    const newQuoteCategory = document.getElementById("newQuoteCategory");

    // Function to display a random quote
    function showRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];

        // Using innerHTML to update content
        quoteDisplay.innerHTML = `<strong>${randomQuote.text}</strong> <br> <em>- ${randomQuote.category}</em>`;
    }

    // Function to add a new quote
    function addQuote() {
        const text = newQuoteText.value.trim();
        const category = newQuoteCategory.value.trim();

        if (text === "" || category === "") {
            alert("Please enter both a quote and a category.");
            return;
        }

        // Add new quote to the array
        quotes.push({ text, category });

        // Update the UI with the new quote
        quoteDisplay.innerHTML = `<strong>${text}</strong> <br> <em>- ${category}</em>`;

        // Clear input fields
        newQuoteText.value = "";
        newQuoteCategory.value = "";
    }

    // Event listeners
    newQuoteBtn.addEventListener("click", showRandomQuote);
    addQuoteBtn.addEventListener("click", addQuote);

    // Display an initial quote
    showRandomQuote();
});
