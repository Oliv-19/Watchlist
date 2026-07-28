
export const getPerson = async(id, options) => {
    const person = await fetch(`https://api.themoviedb.org/3/person/${id}?language=en-US&append_to_response=tv_credits`, options) 
    const data = await person.json()
    const updates = {
        id: data.id,
        name: data.name,
        originalName: data.original_name,
        profilePath: data.profile_path,
        knownFor: data.known_for_department,
        biography: data.biography,
        alsoKnownAs: data.also_known_as.slice(0, 3),
        birthday: data.birthday,
        birthplace: data.place_of_birth,
        media: data.tv_credits.cast,
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