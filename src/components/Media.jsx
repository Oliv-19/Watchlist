import { useLocation } from "react-router-dom"

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/"
const POSTER_SIZE = "w342"
const BG_SIZE = "original"

function Media() {
    const location = useLocation()
    const data = location.state
    
    const fullImageUrl = `${IMAGE_BASE_URL}${POSTER_SIZE}${data.poster_path}`
    const fullBGImageUrl = `${IMAGE_BASE_URL}${BG_SIZE}${data.backdrop_path}`
    
    return (
        <>
            {data && (
                <div className="bg-black w-full h-dvh">
                    <img className="w-full absolute z-0 top-6px opacity-20" src={fullBGImageUrl} alt="" />
                    <div className="w-full h-dvh flex items-center justify-evenly relative z-1 text-white">
                        <div className="w-35">
                            <h4 className="text-xl">{data.name}</h4>
                            {data.original_name != data.name && (<h5>{data.original_name}</h5>)  }
                            <p>{data.overview}</p>
                        </div>
                        <img className="Poster" src={fullImageUrl} alt="" />
                        <div className="w-35">
                            <h4 className="">{data.first_air_date}</h4>
                        </div>

                    </div>
                </div>
            )
            }
        </>
        
    )
}

export default Media