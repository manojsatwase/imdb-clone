import { movieFailure, movieRequest, movieSuccess } from "../redux/moviesSlice"
import { METHODS, makeRequest } from "./apiCall"

const BASE_URL = import.meta.env.VITE_REACT_API_URL;

export const getMoviesAPI = (page=1,limit=5,sort={},genres=[],search="") => async (dispatch) => {
    
    const url = new URL(BASE_URL + '/api/v1/movies');

    url.searchParams.set('page', page);
    url.searchParams.set('limit', limit);
    url.searchParams.set('genre', genres.join(','));
    url.searchParams.set('sort', `${sort.sort},${sort.order}`);
    url.searchParams.set('search', search);

    const formattedUrl = url.href;

    await makeRequest(
        dispatch,
        movieRequest,
        movieSuccess,
        movieFailure,
        METHODS.GET,
        formattedUrl
    )
} 





















