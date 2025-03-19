document.addEventListener("DOMContentLoaded", function () {
    // Select elements
    const quoteDisplay = document.getElementById("quoteDisplay");
    const newQuoteBtn = document.getElementById("newQuote");
    const formContainer = document.getElementById("formContainer");
    const categoryFilter = document.getElementById("categoryFilter");
    const syncStatus = document.getElementById("syncStatus"); // UI for sync notifications

    const SERVER_URL = "https://jsonplaceholder.typicode.com/posts"; // Simulated API

    // Load quotes from local storage or set default quotes
    let quotes = JSON.parse(localStorage.getItem("quotes")) || [];

    // Function to save quotes to local storage
    function saveQuotes() {
        localStorage.setItem("quotes", JSON.stringify(quotes));
    }

    // Function to sync quotes with the server
    async function syncQuotes() {
        try {
            const response = await fetch(SERVER_URL);
            const serverQuotes = await response.json();

            // Convert API data into quote format
            const formattedQuotes = serverQuotes.slice(0, 5).map(post => ({
                text: post.title,
                category: "Server Update"
            }));

            // Merge server and local quotes (Server has priority)
            quotes = mergeQuotes(formattedQuotes, quotes);
            saveQuotes();
            populateCategories();
            syncStatus.innerText = "✔ Quotes synced successfully!";
        } catch (error) {
            syncStatus.innerText = "⚠ Error syncing quotes!";
            console.error("Sync error:", error);
        }
    }

    // Function to send a new quote to the server
    async function sendQuoteToServer(quote) {
        try {
            const response = await fetch(SERVER_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(quote)
            });

            if (response.ok) {
                syncStatus.innerText = "✔ Quote sent to server!";
            } else {
                syncStatus.innerText = "⚠ Failed to send quote!";
            }
        } catch (error) {
            syncStatus.innerText = "⚠ Error sending quote!";
            console.error("Post error:", error);
        }
    }

    // Function to merge server and local quotes
    function mergeQuotes(serverQuotes, localQuotes) {
        return [...serverQuotes, ...localQuotes.filter(local =>
            !serverQuotes.some(server => server.text === local.text)
        )];
    }

    // Function to show a random quote
    function showRandomQuote() {
        const selectedCategory = categoryFilter.value;
        let filteredQuotes = selectedCategory === "all"
            ? quotes
            : quotes.filter(quote => quote.category === selectedCategory);

        if (filteredQuotes.length === 0) {
            quoteDisplay.innerHTML = `<strong>No quotes available for this category.</strong>`;
            return;
        }

        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const randomQuote = filteredQuotes[randomIndex];

        sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote));
        quoteDisplay.innerHTML = `<strong>${randomQuote.text}</strong> <br> <em>- ${randomQuote.category}</em>`;
    }

    // Function to create "Add Quote" form
    function createAddQuoteForm() {
        formContainer.innerHTML = "";

        const inputText = document.createElement("input");
        inputText.setAttribute("id", "newQuoteText");
        inputText.setAttribute("type", "text");
        inputText.setAttribute("placeholder", "Enter a new quote");

        const inputCategory = document.createElement("input");
        inputCategory.setAttribute("id", "newQuoteCategory");
        inputCategory.setAttribute("type", "text");
        inputCategory.setAttribute("placeholder", "Enter quote category");

        const addQuoteBtn = document.createElement("button");
        addQuoteBtn.textContent = "Add Quote";
        addQuoteBtn.addEventListener("click", addQuote);

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

        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);
        saveQuotes();
        populateCategories();
        syncStatus.innerText = "✔ New quote added!";

        // Send new quote to server
        sendQuoteToServer(newQuote);

        quoteDisplay.innerHTML = `<strong>${newQuoteText}</strong> <br> <em>- ${newQuoteCategory}</em>`;
        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";
    }

    // Function to populate categories dynamically
    function populateCategories() {
        const uniqueCategories = [...new Set(quotes.map(q => q.category))];
        localStorage.setItem("categories", JSON.stringify(uniqueCategories));

        const lastSelectedCategory = localStorage.getItem("selectedCategory") || "all";
        categoryFilter.innerHTML = '<option value="all">All Categories</option>';

        uniqueCategories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });

        categoryFilter.value = lastSelectedCategory;
    }

    // Function to filter quotes by category
    function filterQuotes() {
        localStorage.setItem("selectedCategory", categoryFilter.value);
        showRandomQuote();
    }

    // Auto-sync with server every 30 seconds
    setInterval(syncQuotes, 30000);

    // Attach event listeners
    newQuoteBtn.addEventListener("click", showRandomQuote);
    categoryFilter.addEventListener("change", filterQuotes);

    // Initialize form, categories, and fetch initial data
    createAddQuoteForm();
    populateCategories();
    syncQuotes();
});
