const input = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

let debounceTimer;
const API_KEY = "YOUR_API_KEY"; // Replace with your real OMDB key

function fetchMovies(query) {
  fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
    .then(response => response.json())
    .then(data => {
      displayResults(data.Search);
    })
    .catch(err => console.error("Error fetching data:", err));
}

function displayResults(movies) {
  resultsDiv.innerHTML = "";

  if (!movies || movies.length === 0) {
    resultsDiv.innerHTML = "<p>No results found.</p>";
    return;
  }

  movies.forEach(movie => {
    const p = document.createElement("p");
    p.textContent = movie.Title;
    resultsDiv.appendChild(p);
  });
}

input.addEventListener("input", () => {
  clearTimeout(debounceTimer);

  const query = input.value.trim();

  if (query === "") {
    resultsDiv.innerHTML = "";
    return;
  }

  debounceTimer = setTimeout(() => {
    fetchMovies(query);
  }, 500);
});
