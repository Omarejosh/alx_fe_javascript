document.addEventListener("DOMContentLoaded", function () {
    // Select elements
    const quoteDisplay = document.getElementById("quoteDisplay");
    const newQuoteBtn = document.getElementById("newQuote");
    const formContainer = document.getElementById("formContainer");
    const importFileInput = document.getElementById("importFile");
    const exportJsonBtn = document.getElementById("exportJson");

    // Load quotes from local storage or set default quotes
    let quotes = JSON.parse(localStorage.getItem("quotes")) || [
        { text: "The best way to predict the future is to create it.", category: "Motivation" },
        { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Inspiration" },
        { text: "Act as if what you do makes a difference. It does.", category: "Encouragement" }
    ];

    // Function to save quotes to local storage
    function saveQuotes() {
        localStorage.setItem("quotes", JSON.stringify(quotes));
    }

    // Function to display a random quote
    function showRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];

        // Store last viewed quote in session storage
        sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote));

        // Display quote
        quoteDisplay.innerHTML = `<strong>${randomQuote.text}</strong> <br> <em>- ${randomQuote.category}</em>`;
    }

    // Function to display last viewed quote from session storage (if exists)
    function loadLastViewedQuote() {
        const lastQuote = JSON.parse(sessionStorage.getItem("lastViewedQuote"));
        if (lastQuote) {
            quoteDisplay.innerHTML = `<strong>${lastQuote.text}</strong> <br> <em>- ${lastQuote.category}</em>`;
        } else {
            showRandomQuote();
        }
    }

    // Function to create the "Add Quote" form
    function createAddQuoteForm() {
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
        saveQuotes(); // Save to Local Storage

        // Display new quote immediately
        quoteDisplay.innerHTML = `<strong>${newQuoteText}</strong> <br> <em>- ${newQuoteCategory}</em>`;

        // Clear input fields
        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";
    }

    // Function to export quotes as a JSON file
    function exportToJsonFile() {
        const jsonData = JSON.stringify(quotes, null, 2);
        const blob = new Blob([jsonData], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        // Create a temporary link for download
        const a = document.createElement("a");
        a.href = url;
        a.download = "quotes.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Function to import quotes from a JSON file
    function importFromJsonFile(event) {
        const fileReader = new FileReader();
        fileReader.onload = function (e) {
            try {
                const importedQuotes = JSON.parse(e.target.result);
                if (!Array.isArray(importedQuotes)) throw new Error("Invalid JSON format");

                quotes.push(...importedQuotes);
                saveQuotes(); // Save updated quotes to local storage

                alert("Quotes imported successfully!");
                showRandomQuote();
            } catch (error) {
                alert("Error: Invalid JSON file");
            }
        };
        fileReader.readAsText(event.target.files[0]);
    }

    // Attach event listeners
    newQuoteBtn.addEventListener("click", showRandomQuote);
    exportJsonBtn.addEventListener("click", exportToJsonFile);
    importFileInput.addEventListener("change", importFromJsonFile);

    // Create the add-quote form when the page loads
    createAddQuoteForm();

    // Load last viewed quote (or show a random one)
    loadLastViewedQuote();
});
