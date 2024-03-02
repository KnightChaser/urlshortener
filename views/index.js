function shortenUrl() {
    // Get the original URL from the input field
    var longUrl = document.getElementById('originalUrl').value;

    // Send the original URL to the server
    fetch(`/shorten?longUrl=${longUrl}`)
        .then(response => response.json())
        .then(data => {
            // Display the result on the page
            var resultContainer = document.getElementById('result');
            var shortenedUrlInput = document.getElementById('shortenedUrl');
            shortenedUrlInput.value = data.shortenedUrl;
            resultContainer.classList.remove('hidden');
        });

    // Display the result on the page
    // var resultContainer = document.getElementById('result');
    // var shortenedUrlInput = document.getElementById('shortenedUrl');
    // shortenedUrlInput.value = shortenedUrl;
    // resultContainer.classList.remove('hidden');
}
