export const fetchMedia = async (id, options) => {
    const fetchedData = await fetch(`https://api.themoviedb.org/3/tv/${id}?append_to_response=credits&language=en-US`, options)
    const similarMedia = await fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`, options)       
    const body = await fetchedData.json()
    const media = await similarMedia.json()
    const cast = []
    const castMedia = []
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
        characters: body.credits.cast.slice(0, 20).map(char=> {
            cast.push ({
                id: char.id,
                name: char.name,
                originalName: char.original_name,
                order: char.order,
                profilePath: char.profile_path,
                knownFor: char.known_for_department,
            })
            castMedia.push({
                mediaId: body.id,
                peopleId: char.id,
            })
            return {
            id: char.id,
            character: char.character}
        }),
    }
    
    const genreMedia = body.genres.map((genre) => ({
        mediaId: mediaObj.id,
        genreId: Number(genre.id)
    }))
    
    const response = await apiFormatedResponse(mediaObj, cast, body.genres, media)
    return {mediaObj, genreMedia, response, cast, castMedia}
}

export const dbFormatedResponse = async (id, options, data) => {
    const similar = await fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`, options)       
    const similarMedia = await similar.json()
    const response = {
        ...data,
        genres: data.mediaGenres.map((g) => g.genre.name),
        cast: data.peopleMedia.map((p) => ({
            id: p.peopleId,
            name: p.people.name,
            profilePath: p.people.profilePath,
            order: p.people.order,
            character: data.characters? data.characters.find(char => char.id == p.peopleId)?.character : null

        })),
        similar: similarMedia.results.map((s) => ({
            id: s.id,
            title: s.name,
            posterPath: s.poster_path
        })),
        userInfo:{
            userRating : data.userMedia[0]?.userRating,
            userReview : data.userMedia[0]?.userReview,

        },
        userMedia: undefined,
        mediaGenres: undefined,
        peopleMedia: undefined,
        characters: undefined
    }
    return response
}

export const apiFormatedResponse = async (data, cast, genres, similarMedia) => {
    const response = {
        ...data,
        genres: genres.map((g) => g.name),
        cast: cast.map(person => ({
            ...person,
            character: data.characters? data.characters.find(char => char.id == person.id)?.character : null
        })),
        similar: similarMedia.results.map((s) => ({
            id: s.id,
            title: s.name,
            posterPath: s.poster_path
        })),
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