export const fetchMedia = async (id, options) => {
    try {
        const fetchedData = await fetch(`https://api.themoviedb.org/3/tv/${id}?append_to_response=credits&language=en-US`, options)
        const similarMedia = await fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`, options)       
        const body = await fetchedData.json()
        const media = await similarMedia.json()
        
        if(Object.hasOwn(body, 'success') && !body.success ) return null
        const mediaObj = {
        id: Number(body.id),
        backdropPath : body.backdrop_path,
        creators: body.created_by,
        title: body.name,
        originalTitle: body.original_name,
        posterPath:  body.poster_path,
        overview:  body.overview,
        rating:  body.vote_average,
        seasons: body.number_of_seasons,
        episodes: body.number_of_episodes,
        episodeRunTime: body.episode_run_time,
        releaseDate: body.first_air_date,
        finishedDate: body.last_air_date,
        originCountry: body.origin_country[0],
        cast: body.credits.cast.slice(0, 20).map((p) => ({
            id: p.id,
            name: p.original_name,
            profilePath: p.profile_path,
            order: p.order,
            character: p.character

            })),
        }
        
        const genreMedia = body.genres.map((genre) => ({
            mediaId: mediaObj.id,
            genreId: Number(genre.id)
        }))
        
        const response = await apiFormatedResponse(mediaObj, body.genres, media)
        return {mediaObj, genreMedia, response}
    } catch (error) {
        console.error(error);
        
        return null
    }
}

export const dbFormatedResponse = async (id, options, data) => {
    const similar = await fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`, options)       
    const similarMedia = await similar.json()
    const credits = await fetch(`https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`, options)       
    const {cast} = await credits.json()

    const response = {
        ...data,
        genres: data.mediaGenres.map((g) => g.genre.name),
        cast: cast.map((p) => ({
            id: p.id,
            name: p.original_name,
            profilePath: p.profile_path,
            order: p.order,
            character: p.character

        })),
        similar: similarMedia.results.map((s) => ({
            id: s.id,
            title: s.name,
            posterPath: s.poster_path
        })),
        userInfo :  {
            saved: data.userMedia[0]? true: false,
            userRating : data.userMedia[0]?.userRating,
            userReview : data.userMedia[0]?.userReview,
            status: data.userMedia[0]?.status,
        },
        userMedia: undefined,
        mediaGenres: undefined,
        peopleMedia: undefined,
        characters: undefined
    }
    return response
}

export const apiFormatedResponse = async (data, genres, similarMedia) => {
    const response = {
        ...data,
        genres: genres.map((g) => g.name),
        similar: similarMedia.results.map((s) => ({
            id: s.id,
            title: s.name,
            posterPath: s.poster_path
        })),
        userInfo :  {
            saved: false
        },
        mediaGenres: undefined,
        peopleMedia: undefined,
        characters: undefined
    }
    return response
}

export const searchMedia= async(query, page, options)=> {
    const result = await fetch(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=${page}`, options)
    const data = await result.json()
    const search = {
        data: data.results.map((item)=> ({
                id: item.id,
                name : item.name,
                posterPath : item.poster_path
            })),
        totalPages:data.total_pages
    }
    
    return search
}