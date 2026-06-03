import * as schema from '../db/schema'

export const fetchAiringToday = async(options, db) => {
    const today = await fetch('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1', options)
    const resToday = await today.json() 

    const airingTodayObj = resToday.results.map((item)=> ({
        id: item.id,
        name : item.name,
        backdropPath : item.backdrop_path
    }))

    const result = await db.batch([
        db.delete(schema.airingToday),
        db.insert(schema.airingToday).values(airingTodayObj).returning().onConflictDoNothing()
    ])

    return airingTodayObj
}