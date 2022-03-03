
const API_URL = 'https://rickandmortyapi.com/api/character'
const SEARCH_URL = 'https://rickandmortyapi.com/api/character/?name=rick&status=alive'

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.querySelector('#main')

const getMovies = async (url) => {
    try {
        const res = await fetch(url)
        const data = await res.json()
        if (data.results.length === 0) {
            swal.fire({
                title: 'Error!',
                text: 'No se ha encontrado ninguna pelicula',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        } else {
            showMovies(data.results)
        }
    } catch (error) {
        swal.fire({
            title: 'Error!',
            text: error,
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })
    }
}

getMovies (API_URL)

const showMovies = (movies) => {
    main.innerHTML = ''
    movies.forEach(movie => {
        const { name, status, species, type, gender, image, location, origin } = movie
        const movieDiv = document.createElement('div')
        movieDiv.classList.add('movie')
        movieDiv.innerHTML = `
        <img src="${image}" alt="">
        <div class="movie-info">
            <h3>${name}</h3>
            <span class="green">${status}</span>
        </div>
        <div class="overview">
            <h3>Specie: ${species}</h3>
            <h3>Type: ${type}</h3>
            <h3>Gender: ${gender}</h3>
            <h3>Location: ${location.name}</h3>
            <h3>Origin: ${origin.name}</h3>
        </div>
        `
        main.appendChild(movieDiv)
    });


    console.log(movies);
}



form.addEventListener('submit', e => {
    e.preventDefault()

    const searchTerm =  search.value.toLocaleLowerCase()
    
    if (searchTerm  && searchTerm !== '') {
        getMovies(SEARCH_URL + searchTerm)
        search.value = ''
    } else {
        // wondows.location.reload()
        swal.fire({
            title: 'Error!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Cool'
        })
    }

})








