
export const updatesResponse = async(id, options) => {
    const person = await fetch(`https://api.themoviedb.org/3/person/${id}?language=en-US`, options) 
    const data = await person.json()
    const updates = {
        biography: data.biography,
        alsoKnownAs: data.also_known_as.slice(0, 3),
        birthday: data.birthday,
        birthplace: data.place_of_birth
    } 
    return updates
}

export const responseFormat = async (data, id, options) => {
    const personMedia = await fetch(`https://api.themoviedb.org/3/person/${id}/tv_credits`, options)
    const res = await personMedia.json()
    return {
        ...data,
        media: res.cast,
        createdAt: undefined,
        updatedAt: undefined,
    }
}