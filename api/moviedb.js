import axios from 'axios'

const baseUrl = `https://api.themoviedb.org/3`
const apiKey = process.env.EXPO_PUBLIC_MOVIEDB_API_KEY

const trendingMovieEndpoint =  `${baseUrl}/trending/all/day?api_key=${apiKey}`
const upcomingMovieEndpoint =  `${baseUrl}/movie/upcoming?api_key=${apiKey}`
const topRatedEndpoint =  `${baseUrl}/movie/top_rated?api_key=${apiKey}`
const searchMoviesEndpoint = `${baseUrl}/search/movie?api_key=${apiKey}`

const movieDetailsEndpoint = id => `${baseUrl}/movie/${id}?api_key=${apiKey}`
const movieCreditsEndpoint = id => `${baseUrl}/movie/${id}/credits?api_key=${apiKey}`
const similarMoviesEndpoint = id =>  `${baseUrl}/movie/${id}/similar?api_key=${apiKey}`

const castDetailsEndpoint = id =>  `${baseUrl}/person/${id}?api_key=${apiKey}`
const castMoviesEndpoint = id =>  `${baseUrl}/person/${id}/movie_credits?api_key=${apiKey}`



const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint, 
        params: params ? params : {} // this is for search movies endpoint purposes 
    }

    try {
        console.log(options.url)
        const response = await axios.request(options);
        return response.data;

    } catch (err) {
        console.log('Error connection to the API: ', err)
        console.log('Error url ---> ' + endpoint)
        return {}
    }
}

export const fetchTrendingMovies = () => {
    return apiCall(trendingMovieEndpoint)
}
export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMovieEndpoint)
}
export const fetchTopRatedMovies = () => {
    return apiCall(topRatedEndpoint)
}
////=======
export const fetchMovieDetails = (id) => {
    return apiCall(movieDetailsEndpoint(id))
}
export const fetchMovieCredit = (id) => {
    return apiCall(movieCreditsEndpoint(id))
}
export const fetchSimilarMovies = (id) => {
    return apiCall(similarMoviesEndpoint(id))
}

export const fetchCastDetails = (id) => {
    return apiCall(castDetailsEndpoint(id))
}

export const fetchCastMovies = (id) => {
    return apiCall(castMoviesEndpoint(id))
}

export const imageFetch500 = path => {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : null
}
export const imageFetch342 = path => {
    return path ? `https://image.tmdb.org/t/p/w342${path}` : null
}
export const imageFetch185 = path => {
    return path ? `https://image.tmdb.org/t/p/w185${path}` : null
}

export const fetchSearchMovies = params => {
    return apiCall(searchMoviesEndpoint, params)
}
