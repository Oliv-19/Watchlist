import * as schema from '../db/schema'

export const fetchAiringToday = async(options) => {
    const today = await fetch('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1', options)
    const resToday = await today.json() 

    const airingTodayObj = resToday.results.map((item)=> ({
        id: item.id,
        name : item.name,
        backdropPath : item.backdrop_path
    }))
    return airingTodayObj
}

export const fetchOnAir= async(options)=> {
    const onAir = await fetch('https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1', options)
    const data = await onAir.json()

    const onAirObj = data.results.map((item)=> ({
        id: item.id,
        name : item.name,
        posterPath : item.poster_path
    }))
    return onAirObj 
}