export const urlReducer = (state, action) => {
    const query = action.payload.query
    const page = action.payload.page
    const id = action.payload.id
    
    switch (action.type){
        case 'searchAll': 
            return `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=${page}`
        case 'onAir': 
            return `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=${page}`

        case 'media':
            return `https://api.themoviedb.org/3/tv/${id}?append_to_response=credits,recommendations&language=en-US`;
        case 'person':
            return `https://api.themoviedb.org/3/person/${id}?language=en-US&append_to_response=combined_credits`
        default:
            return state
    }
}