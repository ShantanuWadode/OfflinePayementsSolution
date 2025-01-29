const searchform = document.querySelector('form');
const inputBox = document.querySelector('.inputBox');

// Function to fetch movie data from OMDB API
const getMovies = async (movie) => {
    const myapikey = "62c9bdf6"; // Your API key
    const url = `https://www.omdbapi.com/?apikey=${myapikey}&s=${movie}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.Response === 'True') {
            showmovieData(data.Search);
        } else {
            console.log('Error: ' + data.Error);
        }
    } catch (error) {
        console.log('Error fetching data:', error);
    }
};

// Function to display movie data on the page
const showmovieData = (movies) => {
    let output = '';
    
    movies.forEach(movie => {
        // Destructuring to extract data from each movie object
        const { Title, Year, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = movie;

        // Creating movie card for each movie
        output += `
        <div class="col-md-3 mb-4">
            <div class="card" style="width: 18rem;">
                <img src="${Poster}" class="card-img-top" alt="${Title}">
                <div class="card-body">
                    <h5 class="card-title">${Title}</h5>
                    <p class="card-text"><strong>Year:</strong> ${Year}</p>
                    <p class="card-text"><strong>Rating:</strong> ${imdbRating ? imdbRating : 'N/A'}</p>
                    <p class="card-text"><strong>Genre:</strong> ${Genre}</p>
                    <p class="card-text"><strong>Released:</strong> ${Released}</p>
                    <p class="card-text"><strong>Runtime:</strong> ${Runtime}</p>
                    <p class="card-text"><strong>Actors:</strong> ${Actors}</p>
                    <p class="card-text"><strong>Plot:</strong> ${Plot ? Plot : 'No description available.'}</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
        `;
    });

    // Append movie cards to the container
    const movieContainer = document.querySelector('.movies');
    if (movieContainer) {
        movieContainer.innerHTML = `<div class="row">${output}</div>`;
    }
};

// Event listener for form submission
searchform.addEventListener('submit', (e) => {
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if (movieName !== '') {
        getMovies(movieName);
    }
});
