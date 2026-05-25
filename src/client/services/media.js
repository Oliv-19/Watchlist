import axios from "axios";
import { addPeople } from "./people";

const key= import.meta.env.VITE_API_KEY
const baseUrl = '/api/media'
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${key}`
      }
  };

export const addMedia = async(id) => {
  try{
    const fetchedData = await axios.get(`https://api.themoviedb.org/3/tv/${id}?append_to_response=credits&language=en-US`, options)
    const body = fetchedData.data
    const cast = []
    const castMedia = []
    const mediaObj = {
        id: body.id,
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
        genreId: genre.id
    }))
    const response = await axios.post(baseUrl, {mediaObj, genreMedia})
    addPeople(cast, castMedia)
    return response.data
  } catch {
    return null
  }
}
export const getMedia = async(id) => {
  try{
    const dbData = await axios.get(`${baseUrl}/${id}`)
    if( dbData.data){
      const fetchedData = await axios.get(`https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`, options)
      const response= {
        ...dbData.data,
        similar: fetchedData.data.results
      }
      return response
    }
  } catch {
    return null
  }
}