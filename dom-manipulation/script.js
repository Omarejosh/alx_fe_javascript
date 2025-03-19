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
        // Clear existing content in formContainer
        formContainer.innerHTML = "";

        // Create input for quote text
        const inputText = document.createElement("input");
        inputText.setAttribute("id", "newQuoteText");
        inputText.setAttribute("type", "text");
        inputText.setAttribute("placeholder", "Enter a new quote");

        // Create input for category
        const inputCategory = document.createElement("input");
        inputCategory.setAttribute("id", "newQuoteCategory");
        inputCategory.setAttribute("type", "text");
        inputCategory.setAttribute("placeholder", "Enter quote category");

        // Create "Add Quote" button
        const addQuoteBtn = document.createElement("button");
        addQuoteBtn.setAttribute("id", "addQuoteBtn");
        addQuoteBtn.textContent = "Add Quote";

        // Attach event listener to button
        addQuoteBtn.addEventListener("click", addQuote);

        // Append elements to the formContainer
        formContainer.appendChild(inputText);
        formContainer.appendChild(inputCategory);
        formContainer.appendChild(addQuoteBtn);
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

        // Create a new quote display element
        const newQuoteElement = document.createElement("p");
        newQuoteElement.innerHTML = `<strong>${newQuoteText}</strong> <br> <em>- ${newQuoteCategory}</em>`;

        // Clear the current quote and display the new one
        quoteDisplay.innerHTML = "";
        quoteDisplay.appendChild(newQuoteElement);

        // Clear input fields
        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";
    }

    // Event listener for showing a new quote
    newQuoteBtn.addEventListener("click", showRandomQuote);

    // Create the add-quote form when the page loads
    createAddQuoteForm();

    // Display an initial quote
    showRandomQuote();
});
