export const urlReducer = (state, action) => {
    const query = action.payload.query
    const page = action.payload.page
    const id = action.payload.id
    
    switch (action.type){
        case 'searchAll': 
            return `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=${page}`
        case 'popular': 
            return "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc"

        case 'media':
            return `https://api.themoviedb.org/3/tv/${id}?language=en-US`;

        default:
            return state
    }
}