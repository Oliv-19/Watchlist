import axios from "axios"

export const updatesResponse = async(id, options) => {
    const person = await axios.get(`https://api.themoviedb.org/3/person/${id}?language=en-US`, options) 
    const updates = {
        biography: person.data.biography,
        alsoKnownAs: person.data.also_known_as.slice(0, 3),
        birthday: person.data.birthday,
        birthplace: person.data.place_of_birth
    } 
    return updates
}

export const responseFormat = async (data, id, options) => {
    const personMedia = await axios.get(`https://api.themoviedb.org/3/person/${id}/tv_credits`, options)
    return {
        ...data,
        media: personMedia.data.cast,
        createdAt: undefined,
        updatedAt: undefined,
    }
}