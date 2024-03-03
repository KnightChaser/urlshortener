// Validate the long URL before shortening it
function validation(longUrl) {

    // Check if the URL was given
    if (longUrl.length === 0) {
        Toast.fire({
            icon: "error",
            title: "Please enter a URL"
        })
        return false;
    }

    // Check if the URL is valid, using a regular expression
    const urlValidationRegex = new RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi);
    if (!urlValidationRegex.test(longUrl)) {
        Toast.fire({
            icon: "error",
            title: "Please enter a valid URL"
        })
        return false;
    }

    return true;
}